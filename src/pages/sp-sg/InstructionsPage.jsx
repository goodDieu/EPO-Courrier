// src/pages/sp-sg/InstructionsPage.jsx
import { useState } from 'react';
import { KpiCard, PageHeader, FilterBar, TableCard, RowAction, TitleCell, EmptyTable, Echeance, StatusBadge, InlineTag, TD, ROW_CLICKABLE, notify } from '../../components/ui';
import InstructionModal from '../../components/sp-sg/InstructionModal';
import { TYPES_INSTRUCTION, STATUTS_INSTRUCTION, LOCALISATIONS, FILTRES_STATUT_INSTRUCTION, FILTRES_TYPE_INSTRUCTION } from '../../data/circuit.js';
import { formatJourHeure } from '../../data/demoClock.js';
import { useCircuit } from '../../data/circuitContext.js';
import { enRetard } from '../../data/spSgStats.js';

const ORDRE_STATUT = { 'a-traiter': 0, 'en-cours': 1, traite: 2 };
const STATUT_BADGE = { 'a-traiter': 'a-traiter', 'en-cours': 'en-cours', traite: 'traite' };

export default function InstructionsPage() {
    const { dossiers, instructions, executerInstruction } = useCircuit();
    const [recherche, setRecherche] = useState('');
    const [filtreStatut, setFiltreStatut] = useState('');
    const [filtreType, setFiltreType] = useState('');
    const [ouverteId, setOuverteId] = useState(null);

    const dossierDe = (i) => dossiers.find((d) => d.id === i.dossierId);
    const q = recherche.trim().toLowerCase();
    const liste = instructions
        .filter((i) => (!filtreStatut || i.statut === filtreStatut) && (!filtreType || i.type === filtreType))
        .filter((i) => !q || [i.contenu, i.dossierId, dossierDe(i)?.objet].some((c) => c?.toLowerCase().includes(q)))
        .sort(
            (a, b) =>
                ORDRE_STATUT[a.statut] - ORDRE_STATUT[b.statut] ||
                (a.echeance ? new Date(a.echeance) : Infinity) - (b.echeance ? new Date(b.echeance) : Infinity) ||
                new Date(b.emiseLe) - new Date(a.emiseLe)
        );

    const ouvertes = instructions.filter((i) => i.statut !== 'traite');
    const retards = ouvertes.filter((i) => enRetard(i.echeance)).length;
    const ouverte = instructions.find((i) => i.id === ouverteId);

    const handleExecuter = (instruction, dossier) => {
        executerInstruction(instruction, dossier);
        setOuverteId(null);
        notify.success('Instruction exécutée', {
            items: [`Dossier ${instruction.dossierId}`, instruction.suite ? `Le dossier est maintenant « ${LOCALISATIONS[instruction.suite].label} »` : 'Le SG voit que c\'est fait'],
        });
    };

    return (
        <div className="w-full min-w-0">
            <PageHeader title="Instructions du SG" description="Ce que le Secrétaire Général vous demande de faire sur ses dossiers." />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard label="À exécuter" value={instructions.filter((i) => i.statut === 'a-traiter').length} icon="fa-list-check" onClick={() => setFiltreStatut('a-traiter')} />
                <KpiCard
                    label="En retard"
                    value={retards}
                    variant={retards ? 'urgent' : 'default'}
                    hint={retards ? 'Délai demandé par le SG dépassé' : 'Aucun retard'}
                    icon="fa-clock"
                />
                <KpiCard label="En cours" value={instructions.filter((i) => i.statut === 'en-cours').length} icon="fa-hourglass-half" onClick={() => setFiltreStatut('en-cours')} />
                <KpiCard label="Exécutées" value={instructions.filter((i) => i.statut === 'traite').length} icon="fa-check" onClick={() => setFiltreStatut('traite')} />
            </div>

            <FilterBar
                search={{ value: recherche, onChange: setRecherche, placeholder: 'Rechercher dans les instructions ou un numéro de dossier…' }}
                filters={[
                    { id: 'statut', label: 'Statut', value: filtreStatut, onChange: setFiltreStatut, options: FILTRES_STATUT_INSTRUCTION },
                    { id: 'type', label: 'Type', value: filtreType, onChange: setFiltreType, options: FILTRES_TYPE_INSTRUCTION },
                ]}
                onReset={() => {
                    setRecherche('');
                    setFiltreStatut('');
                    setFiltreType('');
                }}
            />

            {liste.length === 0 ? (
                <EmptyTable icon="fa-check" title="Aucune instruction ne correspond" message="Modifiez la recherche ou effacez les filtres." />
            ) : (
                <TableCard
                    columns={[{ label: 'Instruction' }, { label: 'Dossier' }, { label: 'Délai' }, { label: 'Statut' }, { label: '' }]}
                    alert={retards ? `${retards} instruction${retards > 1 ? 's' : ''} en retard sur le délai demandé par le SG` : null}
                    footer={`${liste.length} instruction${liste.length > 1 ? 's' : ''} · cliquez sur une ligne pour la lire en entier`}
                >
                    {liste.map((i) => {
                        const d = dossierDe(i);
                        const type = TYPES_INSTRUCTION[i.type];
                        const ouverteLigne = i.statut !== 'traite';
                        return (
                            <tr key={i.id} className={ROW_CLICKABLE} onClick={() => setOuverteId(i.id)}>
                                <td className={TD}>
                                    <TitleCell title={i.contenu} sub={`${type.label} · ${formatJourHeure(i.emiseLe)}`} width="max-w-[380px]" />
                                </td>
                                <td className={TD}>
                                    <TitleCell title={i.dossierId} sub={d?.objet} width="max-w-[240px]" />
                                </td>
                                <td className={TD}>
                                    {ouverteLigne && i.echeance ? <Echeance iso={i.echeance} /> : <InlineTag>{ouverteLigne ? 'Sans délai' : '-'}</InlineTag>}
                                </td>
                                <td className={TD}>
                                    <StatusBadge status={STATUT_BADGE[i.statut]} label={STATUTS_INSTRUCTION[i.statut].label} />
                                </td>
                                <td className={`${TD} text-right`}>
                                    {ouverteLigne ? (
                                        <RowAction primary icon="fa-check" onClick={() => setOuverteId(i.id)}>
                                            Exécuter
                                        </RowAction>
                                    ) : (
                                        <RowAction onClick={() => setOuverteId(i.id)}>Ouvrir</RowAction>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </TableCard>
            )}

            <InstructionModal
                key={ouverteId ?? 'aucune'}
                instruction={ouverte}
                dossier={ouverte ? dossierDe(ouverte) : null}
                onClose={() => setOuverteId(null)}
                onExecuter={handleExecuter}
            />
        </div>
    );
}
