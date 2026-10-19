// src/pages/sg/CourriersEntrantsSG.jsx
import { useState } from 'react';
import { KpiCard, PageHeader, FilterBar, TableCard, RowAction, RefCell, TitleCell, EmptyTable, Echeance, TD, ROW_CLICKABLE, notify } from '../../components/ui';
import QuadrantTag from '../../components/circuit/QuadrantTag';
import LocalisationTag from '../../components/circuit/LocalisationTag';
import DossierCircuitModal from '../../components/circuit/DossierCircuitModal';
import FicheAccompagnementModal from '../../components/sg/FicheAccompagnementModal';
import { FILTRES_TYPE, QUADRANTS } from '../../data/circuit.js';
import { formatJourHeure } from '../../data/demoClock.js';
import { useCircuit } from '../../data/circuitContext.js';
import { aExaminer, aImputer, statsSg } from '../../data/sgStats.js';

const contient = (q, ...champs) => champs.some((c) => c?.toLowerCase().includes(q));
const ordre = (d) => QUADRANTS[d.quadrant]?.ordre ?? 9;

const FILTRES_A_FAIRE = [
    { value: '', label: 'Examiner et imputer' },
    { value: 'examiner', label: 'À examiner' },
    { value: 'imputer', label: 'À imputer (retour du DG)' },
];

const CONFIRMATIONS = {
    'transmettre-dg': ['Le secrétariat transmettra le courrier au DG', 'Vous le retrouverez au retour du DG, pour imputation'],
    imputer: ['Le secrétariat remettra le courrier au Service Courrier', 'Le Service Courrier le portera à la structure'],
    classer: ['Le courrier est classé, rien à signaler'],
};

export default function CourriersEntrantsSG() {
    const { dossiers, instructions, deciderSg } = useCircuit();
    const [recherche, setRecherche] = useState('');
    const [filtreAFaire, setFiltreAFaire] = useState('');
    const [filtreType, setFiltreType] = useState('');
    const [ficheId, setFicheId] = useState(null);
    const [ouvertId, setOuvertId] = useState(null);

    const s = statsSg({ dossiers, actes: [], sortants: [] });
    const q = recherche.trim().toLowerCase();
    const garder = (d) => (!filtreType || d.type === filtreType) && (!q || contient(q, d.id, d.objet, d.expediteur));

    const aTraiter = [
        ...(filtreAFaire !== 'imputer' ? aExaminer(dossiers) : []),
        ...(filtreAFaire !== 'examiner' ? aImputer(dossiers) : []),
    ]
        .filter(garder)
        .sort((a, b) => ordre(a) - ordre(b) || new Date(a.echeanceSg || 0) - new Date(b.echeanceSg || 0));

    // Courriers déjà vus par le SG, toujours en circulation
    const enAttente = [...aExaminer(dossiers), ...aImputer(dossiers)];
    const suivis = dossiers
        .filter((d) => d.introduitLe && !enAttente.includes(d) && !['remis-direction', 'objet-satisfait'].includes(d.localisation))
        .filter(garder);

    const handleDecider = (dossier, choix) => {
        deciderSg(dossier, choix);
        setFicheId(null);
        notify.success(
            choix.decision === 'imputer' ? `Courrier ${dossier.id} imputé à ${choix.imputations.join(', ')}` : `Décision enregistrée pour le courrier ${dossier.id}`,
            { items: CONFIRMATIONS[choix.decision] }
        );
    };

    return (
        <div className="w-full min-w-0">
            <PageHeader title="Courriers à examiner" description="Courriers introduits par votre secrétariat et courriers revenus du DG." />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard
                    label="À examiner"
                    value={s.aExaminer}
                    variant={s.aExaminerEnRetard ? 'urgent' : 'default'}
                    hint={s.aExaminerEnRetard ? `dont ${s.aExaminerEnRetard} en retard` : 'Aucun retard'}
                    icon="fa-envelope-open-text"
                    onClick={() => setFiltreAFaire('examiner')}
                />
                <KpiCard label="À imputer" value={s.aImputer} hint="Revenus du DG" icon="fa-share" onClick={() => setFiltreAFaire('imputer')} />
                <KpiCard label="Chez votre secrétariat" value={s.enAttenteSecretariat} hint="Décision prise, à exécuter" icon="fa-user-pen" />
                <KpiCard label="Chez le DG" value={s.chezDg} hint="Avec son secrétariat" icon="fa-user-tie" />
            </div>

            <FilterBar
                search={{ value: recherche, onChange: setRecherche, placeholder: 'Rechercher un numéro, un objet, un expéditeur…' }}
                filters={[
                    { id: 'afaire', label: 'À faire', value: filtreAFaire, onChange: setFiltreAFaire, options: FILTRES_A_FAIRE },
                    { id: 'type', label: 'Type', value: filtreType, onChange: setFiltreType, options: FILTRES_TYPE },
                ]}
                onReset={() => {
                    setRecherche('');
                    setFiltreAFaire('');
                    setFiltreType('');
                }}
            />

            <h2 className="mb-3 text-base font-semibold text-epo-slate-900">À traiter</h2>
            <div className="mb-8">
                {aTraiter.length === 0 ? (
                    <EmptyTable icon="fa-check" title="Aucun courrier en attente de votre décision" message="Les courriers introduits par votre secrétariat apparaîtront ici." />
                ) : (
                    <TableCard
                        columns={[{ label: 'N° · Introduit' }, { label: 'Objet · Expéditeur' }, { label: 'Tri du secrétariat' }, { label: 'Délai' }, { label: '' }]}
                        footer="Le plus important en premier · cliquez sur une ligne pour ouvrir la fiche d'accompagnement"
                    >
                        {aTraiter.map((d) => {
                            const retour = d.localisation === 'retour-sg';
                            return (
                                <tr key={d.id} className={ROW_CLICKABLE} onClick={() => setFicheId(d.id)}>
                                    <td className={TD}>
                                        <RefCell sub={formatJourHeure(retour ? d.historique.at(-1)?.date : d.introduitLe)}>{d.id}</RefCell>
                                    </td>
                                    <td className={TD}>
                                        <TitleCell title={d.objet} sub={retour ? `${d.expediteur} · Revenu du DG` : d.expediteur} width="max-w-[340px]" />
                                    </td>
                                    <td className={TD}>
                                        <QuadrantTag quadrant={d.quadrant} />
                                    </td>
                                    <td className={TD}>{d.echeanceSg ? <Echeance iso={d.echeanceSg} /> : <span className="text-sm text-epo-slate-500">Sans délai</span>}</td>
                                    <td className={`${TD} text-right`}>
                                        <RowAction primary icon={retour ? 'fa-share' : 'fa-file-lines'} onClick={() => setFicheId(d.id)}>
                                            {retour ? 'Imputer' : 'Examiner'}
                                        </RowAction>
                                    </td>
                                </tr>
                            );
                        })}
                    </TableCard>
                )}
            </div>

            <h2 className="mb-3 text-base font-semibold text-epo-slate-900">Déjà examinés, en circulation</h2>
            {suivis.length === 0 ? (
                <EmptyTable title="Aucun courrier en circulation" />
            ) : (
                <TableCard columns={[{ label: 'N°' }, { label: 'Objet · Expéditeur' }, { label: 'Où il est' }, { label: '' }]} footer="Cliquez sur une ligne pour voir le circuit et l'historique">
                    {suivis.map((d) => (
                        <tr key={d.id} className={ROW_CLICKABLE} onClick={() => setOuvertId(d.id)}>
                            <td className={TD}>
                                <RefCell>{d.id}</RefCell>
                            </td>
                            <td className={TD}>
                                <TitleCell title={d.objet} sub={d.bloque || d.expediteur} width="max-w-[380px]" />
                            </td>
                            <td className={TD}>
                                <LocalisationTag dossier={d} />
                            </td>
                            <td className={`${TD} text-right`}>
                                <RowAction onClick={() => setOuvertId(d.id)}>Ouvrir</RowAction>
                            </td>
                        </tr>
                    ))}
                </TableCard>
            )}

            <FicheAccompagnementModal key={ficheId ?? 'aucune'} dossier={dossiers.find((d) => d.id === ficheId)} onClose={() => setFicheId(null)} onDecider={handleDecider} />
            <DossierCircuitModal dossier={dossiers.find((d) => d.id === ouvertId)} instructions={instructions} onClose={() => setOuvertId(null)} />
        </div>
    );
}
