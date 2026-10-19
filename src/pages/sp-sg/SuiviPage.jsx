// src/pages/sp-sg/SuiviPage.jsx
import { useState } from 'react';
import { KpiCard, PageHeader, FilterBar, TableCard, RowAction, RefCell, TitleCell, EmptyTable, TD, ROW_CLICKABLE } from '../../components/ui';
import LocalisationTag from '../../components/circuit/LocalisationTag';
import DossierCircuitModal from '../../components/circuit/DossierCircuitModal';
import { FILTRES_TYPE, FILTRES_LOCALISATION, INDEX_ETAPE } from '../../data/circuit.js';
import { formatJourHeure } from '../../data/demoClock.js';
import { useCircuit } from '../../data/circuitContext.js';

const contient = (q, ...champs) => champs.some((c) => c?.toLowerCase().includes(q));
const dernierMouvement = (d) => [...d.historique].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
const termine = (d) => d.localisation === 'remis-direction' || d.localisation === 'objet-satisfait';

const FILTRES_SITUATION = [
    { value: '', label: 'Toutes les situations' },
    { value: 'en-circulation', label: 'En circulation' },
    { value: 'bloque', label: 'Bloqués' },
    { value: 'termine', label: 'Remis ou clos' },
];

export default function SuiviPage() {
    const { dossiers, instructions } = useCircuit();
    const [recherche, setRecherche] = useState('');
    const [filtreLocalisation, setFiltreLocalisation] = useState('');
    const [filtreSituation, setFiltreSituation] = useState('');
    const [filtreType, setFiltreType] = useState('');
    const [ouvertId, setOuvertId] = useState(null);

    const q = recherche.trim().toLowerCase();
    const liste = dossiers
        .filter((d) => !filtreType || d.type === filtreType)
        .filter((d) => !filtreLocalisation || d.localisation === filtreLocalisation)
        .filter((d) => {
            if (filtreSituation === 'bloque') return !!d.bloque;
            if (filtreSituation === 'termine') return termine(d);
            if (filtreSituation === 'en-circulation') return !termine(d) && !d.bloque;
            return true;
        })
        .filter((d) => !q || contient(q, d.id, d.objet, d.expediteur))
        // Bloqués d'abord, puis du moins avancé au plus avancé dans le circuit
        .sort((a, b) => (b.bloque ? 1 : 0) - (a.bloque ? 1 : 0) || INDEX_ETAPE[a.localisation] - INDEX_ETAPE[b.localisation]);

    const enCirculation = dossiers.filter((d) => !termine(d)).length;
    const bloques = dossiers.filter((d) => d.bloque).length;

    return (
        <div className="w-full min-w-0">
            <PageHeader title="Suivi des dossiers" description="Où se trouvent les dossiers passés par le secrétariat du SG." />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard label="En circulation" value={enCirculation} icon="fa-route" onClick={() => setFiltreSituation('en-circulation')} />
                <KpiCard
                    label="Chez le SG"
                    value={dossiers.filter((d) => d.localisation === 'chez-sg' || d.localisation === 'retour-sg').length}
                    hint="Pour avis ou imputation"
                    icon="fa-user-tie"
                />
                <KpiCard
                    label="Bloqués"
                    value={bloques}
                    variant={bloques ? 'urgent' : 'default'}
                    hint={bloques ? 'Rejet ou pièce manquante' : 'Aucun blocage'}
                    icon="fa-pause"
                    onClick={() => setFiltreSituation('bloque')}
                />
                <KpiCard label="Remis ou clos" value={dossiers.filter(termine).length} icon="fa-check" onClick={() => setFiltreSituation('termine')} />
            </div>

            <FilterBar
                search={{ value: recherche, onChange: setRecherche, placeholder: 'Rechercher un numéro, un objet, un expéditeur…' }}
                filters={[
                    { id: 'situation', label: 'Situation', value: filtreSituation, onChange: setFiltreSituation, options: FILTRES_SITUATION },
                    { id: 'localisation', label: 'Où il est', value: filtreLocalisation, onChange: setFiltreLocalisation, options: FILTRES_LOCALISATION },
                    { id: 'type', label: 'Type', value: filtreType, onChange: setFiltreType, options: FILTRES_TYPE },
                ]}
                onReset={() => {
                    setRecherche('');
                    setFiltreLocalisation('');
                    setFiltreSituation('');
                    setFiltreType('');
                }}
            />

            {liste.length === 0 ? (
                <EmptyTable title="Aucun dossier ne correspond" message="Modifiez la recherche ou effacez les filtres." />
            ) : (
                <TableCard
                    columns={[{ label: 'N° · Reçu' }, { label: 'Objet · Expéditeur' }, { label: 'Où il est' }, { label: 'Dernier mouvement' }, { label: '' }]}
                    footer={`${liste.length} dossier${liste.length > 1 ? 's' : ''} · cliquez sur une ligne pour voir le circuit et l'historique`}
                >
                    {liste.map((d) => {
                        const dernier = dernierMouvement(d);
                        return (
                            <tr key={d.id} className={ROW_CLICKABLE} onClick={() => setOuvertId(d.id)}>
                                <td className={TD}>
                                    <RefCell sub={formatJourHeure(d.recuLe)}>{d.id}</RefCell>
                                </td>
                                <td className={TD}>
                                    <TitleCell title={d.objet} sub={d.bloque || d.expediteur} />
                                </td>
                                <td className={TD}>
                                    <LocalisationTag dossier={d} />
                                </td>
                                <td className={TD}>
                                    <TitleCell title={dernier.action} sub={formatJourHeure(dernier.date)} width="max-w-[240px]" />
                                </td>
                                <td className={`${TD} text-right`}>
                                    <RowAction onClick={() => setOuvertId(d.id)}>Ouvrir</RowAction>
                                </td>
                            </tr>
                        );
                    })}
                </TableCard>
            )}

            <DossierCircuitModal dossier={dossiers.find((d) => d.id === ouvertId)} instructions={instructions} onClose={() => setOuvertId(null)} />
        </div>
    );
}
