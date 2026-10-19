// src/pages/sp-sg/CourriersRecusSgPage.jsx
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KpiCard, PageHeader, FilterBar, TableCard, RowAction, RefCell, TitleCell, EmptyTable, TD, ROW, ROW_CLICKABLE, notify } from '../../components/ui';
import ClassificationBadge from '../../components/scc/ClassificationBadge';
import ReceptionModal from '../../components/sp-sg/ReceptionModal';
import DossierCircuitModal from '../../components/circuit/DossierCircuitModal';
import LocalisationTag from '../../components/circuit/LocalisationTag';
import QuadrantTag from '../../components/circuit/QuadrantTag';
import { FILTRES_TYPE } from '../../data/circuit.js';
import { formatJourHeure, isSameDay } from '../../data/demoClock.js';
import { useScc } from '../../data/sccContext.js';
import { useCircuit } from '../../data/circuitContext.js';
import { aReceptionner, aTrier, statsSpSg } from '../../data/spSgStats.js';

const contient = (q, ...champs) => champs.some((c) => c?.toLowerCase().includes(q));

export default function CourriersRecusSgPage() {
    const navigate = useNavigate();
    const { arrivees } = useScc();
    const { dossiers, instructions, receptionner } = useCircuit();
    const [recherche, setRecherche] = useState('');
    const [filtreType, setFiltreType] = useState('');
    const [aRecevoir, setARecevoir] = useState(null);
    const [ouvert, setOuvert] = useState(null);

    const stats = statsSpSg({ arrivees, dossiers, instructions });
    const q = recherche.trim().toLowerCase();

    const envoyes = useMemo(
        () =>
            aReceptionner(arrivees)
                .filter((a) => !q || contient(q, a.id, a.objet, a.expediteur))
                .filter(() => filtreType !== 'acte')
                .sort((a, b) => (a.classification === 'urgent' ? -1 : 0) - (b.classification === 'urgent' ? -1 : 0) || new Date(a.dateReception) - new Date(b.dateReception)),
        [arrivees, q, filtreType]
    );

    const recus = useMemo(
        () =>
            dossiers
                .filter((d) => !filtreType || d.type === filtreType)
                .filter((d) => !q || contient(q, d.id, d.objet, d.expediteur))
                .sort((a, b) => new Date(b.recuLe) - new Date(a.recuLe))
                .slice(0, 6),
        [dossiers, q, filtreType]
    );

    const avecRemarque = dossiers.filter((d) => d.remarqueReception).length;

    const handleConfirmer = (arrivee, { remarque }) => {
        receptionner(arrivee, { remarque });
        setARecevoir(null);
        notify.success(`Courrier ${arrivee.id} réceptionné`, {
            items: ['Décharge signée pour le Service Courrier', remarque ? `Remarque notée : ${remarque}` : 'Pièces conformes', 'Le courrier est maintenant à trier'],
        });
    };

    return (
        <div className="w-full min-w-0">
            <PageHeader title="Courriers reçus" description="Courriers envoyés par le Service Courrier, à réceptionner." />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard
                    label="À réceptionner"
                    value={stats.aReceptionner}
                    variant={stats.aReceptionnerUrgents ? 'urgent' : 'default'}
                    hint={stats.aReceptionnerUrgents ? `dont ${stats.aReceptionnerUrgents} urgent${stats.aReceptionnerUrgents > 1 ? 's' : ''}` : 'Aucun urgent'}
                    icon="fa-inbox"
                />
                <KpiCard label="Reçus aujourd'hui" value={dossiers.filter((d) => isSameDay(d.recuLe)).length} icon="fa-calendar-day" />
                <KpiCard label="À trier" value={aTrier(dossiers).length} hint="Voir le tri" icon="fa-table-cells-large" onClick={() => navigate('/sp_sg/tri')} />
                <KpiCard label="Reçus avec une remarque" value={avecRemarque} hint="Pièce manquante ou différente" icon="fa-triangle-exclamation" />
            </div>

            <FilterBar
                search={{ value: recherche, onChange: setRecherche, placeholder: 'Rechercher un numéro, un objet, un expéditeur…' }}
                filters={[{ id: 'type', label: 'Type', value: filtreType, onChange: setFiltreType, options: FILTRES_TYPE }]}
                onReset={() => {
                    setRecherche('');
                    setFiltreType('');
                }}
            />

            <h2 className="mb-3 text-base font-semibold text-epo-slate-900">À réceptionner</h2>
            <div className="mb-8">
                {envoyes.length === 0 ? (
                    <EmptyTable icon="fa-check" title="Aucun courrier à réceptionner" message="Les courriers envoyés par le Service Courrier apparaîtront ici." />
                ) : (
                    <TableCard columns={[{ label: 'N° · Enregistré' }, { label: 'Objet · Expéditeur' }, { label: 'Classification' }, { label: 'Pièces' }, { label: '' }]}>
                        {envoyes.map((a) => (
                            <tr key={a.id} className={ROW}>
                                <td className={TD}>
                                    <RefCell sub={formatJourHeure(a.dateReception)}>{a.id}</RefCell>
                                </td>
                                <td className={TD}>
                                    <TitleCell title={a.objet} sub={a.expediteur} />
                                </td>
                                <td className={TD}>
                                    <ClassificationBadge classification={a.classification} />
                                </td>
                                <td className={`${TD} tabular-nums text-epo-slate-800`}>{a.pieces}</td>
                                <td className={`${TD} text-right`}>
                                    <RowAction primary icon="fa-check" onClick={() => setARecevoir(a)}>
                                        Réceptionner
                                    </RowAction>
                                </td>
                            </tr>
                        ))}
                    </TableCard>
                )}
            </div>

            <h2 className="mb-3 text-base font-semibold text-epo-slate-900">Derniers reçus</h2>
            {recus.length === 0 ? (
                <EmptyTable title="Aucun dossier ne correspond" message="Modifiez la recherche ou effacez les filtres." />
            ) : (
                <TableCard
                    columns={[{ label: 'N° · Reçu' }, { label: 'Objet · Expéditeur' }, { label: 'Tri' }, { label: 'Où il est' }, { label: '' }]}
                    footer="Les dossiers plus anciens sont dans « Suivi des dossiers »"
                >
                    {recus.map((d) => (
                        <tr key={d.id} className={ROW_CLICKABLE} onClick={() => setOuvert(d.id)}>
                            <td className={TD}>
                                <RefCell sub={formatJourHeure(d.recuLe)}>{d.id}</RefCell>
                            </td>
                            <td className={TD}>
                                <TitleCell title={d.objet} sub={d.remarqueReception ? `${d.expediteur} · Remarque : ${d.remarqueReception}` : d.expediteur} />
                            </td>
                            <td className={TD}>
                                <QuadrantTag quadrant={d.quadrant} />
                            </td>
                            <td className={TD}>
                                <LocalisationTag dossier={d} court />
                            </td>
                            <td className={`${TD} text-right`}>
                                <RowAction onClick={() => setOuvert(d.id)}>Ouvrir</RowAction>
                            </td>
                        </tr>
                    ))}
                </TableCard>
            )}

            <ReceptionModal key={aRecevoir?.id ?? 'aucun'} arrivee={aRecevoir} onClose={() => setARecevoir(null)} onConfirmer={handleConfirmer} />
            <DossierCircuitModal dossier={dossiers.find((d) => d.id === ouvert)} instructions={instructions} onClose={() => setOuvert(null)} />
        </div>
    );
}
