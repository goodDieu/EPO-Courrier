// src/pages/sp-dg/PostVisaPage.jsx
import { useState } from 'react';
import { KpiCard, PageHeader, TableCard, RowAction, RefCell, TitleCell, EmptyTable, TD, ROW, notify } from '../../components/ui';
import ConfirmationModal from '../../components/circuit/ConfirmationModal';
import DecisionDgTag from '../../components/circuit/DecisionDgTag';
import { formatJourHeure, isSameDay } from '../../data/demoClock.js';
import { useCircuit } from '../../data/circuitContext.js';
import { aCocher } from '../../data/spDgStats.js';

// Ce que devient le document une fois la décision cochée
function suite(x) {
    if (x.sorte === 'courrier') return 'Le courrier retourne au SG pour imputation.';
    if (x.source.etat === 'rejete') return 'Le SG est prévenu du rejet et du motif.';
    return 'Le document part au Service Courrier pour envoi, et le SG est prévenu.';
}

export default function PostVisaPage() {
    const circuit = useCircuit();
    const [aVerifier, setAVerifier] = useState(null);
    const liste = aCocher(circuit);

    const tous = [...circuit.actes, ...circuit.sortants];
    const cochesAujourdhui = tous.filter((d) => d.historique?.some((h) => isSameDay(h.date) && h.action.includes('coché'))).length;

    const handleConfirmer = (item) => {
        circuit.cocherPostVisa(item.sorte, item.source);
        setAVerifier(null);
        notify.success(`Décision du DG cochée pour ${item.id}`, { items: [suite(item)] });
    };

    return (
        <div className="w-full min-w-0">
            <PageHeader
                title="Coche post-visa"
                description="Vérifiez chaque décision du DG puis faites-la suivre. Tant qu'elle n'est pas cochée, le SG n'est pas informé."
            />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard label="À cocher" value={liste.length} variant={liste.length ? 'urgent' : 'default'} hint="Décisions du DG à faire suivre" icon="fa-square-check" />
                <KpiCard label="Signés" value={liste.filter((x) => x.sorte !== 'courrier' && x.source.etat === 'signe').length} hint="À envoyer au Service Courrier" icon="fa-pen-nib" />
                <KpiCard label="Rejetés" value={liste.filter((x) => x.source.etat === 'rejete').length} hint="À signaler au SG" icon="fa-circle-xmark" />
                <KpiCard label="Cochés aujourd'hui" value={cochesAujourdhui} icon="fa-check" />
            </div>

            {liste.length === 0 ? (
                <EmptyTable icon="fa-check" title="Toutes les décisions du DG sont cochées" message="Les prochaines décisions apparaîtront ici." />
            ) : (
                <TableCard columns={[{ label: 'N° · Décidé' }, { label: 'Objet' }, { label: 'Décision du DG' }, { label: '' }]}>
                    {liste.map((x) => (
                        <tr key={x.id} className={ROW}>
                            <td className={TD}>
                                <RefCell sub={formatJourHeure(x.source.decideLe)}>{x.id}</RefCell>
                            </td>
                            <td className={TD}>
                                <TitleCell title={x.objet} sub={x.source.motifRejet || x.source.avisDg || x.quoi} width="max-w-[420px]" />
                            </td>
                            <td className={TD}>
                                <DecisionDgTag item={x} />
                            </td>
                            <td className={`${TD} text-right`}>
                                <RowAction primary icon="fa-square-check" onClick={() => setAVerifier(x)}>
                                    Cocher
                                </RowAction>
                            </td>
                        </tr>
                    ))}
                </TableCard>
            )}

            <ConfirmationModal
                key={aVerifier?.id ?? 'aucun'}
                item={aVerifier}
                titre={`Cocher la décision du DG · ${aVerifier?.id}`}
                caseACocher="J'ai vérifié la décision du DG sur l'original"
                aide={aVerifier && suite(aVerifier)}
                bouton="Cocher et faire suivre"
                icon="fa-square-check"
                onClose={() => setAVerifier(null)}
                onConfirmer={handleConfirmer}
            >
                {aVerifier && (
                    <div className="mb-5">
                        <h3 className="mb-1.5 text-sm font-semibold text-epo-slate-900">Décision du DG</h3>
                        <DecisionDgTag item={aVerifier} />
                        {(aVerifier.source.motifRejet || aVerifier.source.avisDg) && (
                            <blockquote className="pl-4 mt-2 text-base border-l-4 text-epo-slate-900 border-epo-green-600">
                                {aVerifier.source.motifRejet || aVerifier.source.avisDg}
                            </blockquote>
                        )}
                    </div>
                )}
            </ConfirmationModal>
        </div>
    );
}
