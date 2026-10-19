// src/pages/liaison/RemisesPage.jsx
import { KpiCard, PageHeader, TableCard, TitleCell, EmptyTable, InlineTag, TD, ROW } from '../../components/ui';
import { formatHeure } from '../../data/liaisonsSCC.js';
import { useScc } from '../../data/sccContext.js';
import { MON_AGENT_ID, faites } from '../../data/liaisonStats.js';

export default function RemisesPage() {
    const { agents } = useScc();
    const agent = agents.find((a) => a.id === MON_AGENT_ID);
    const liste = faites(agent);

    return (
        <div className="w-full min-w-0">
            <PageHeader title="Remises faites" description="Documents remis aujourd'hui, avec la preuve de remise (décharge)." />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard label="Remis" value={liste.length} icon="fa-check" />
                <KpiCard label="Avec signature" value={liste.filter((r) => r.preuve?.type === 'signature').length} icon="fa-signature" />
                <KpiCard label="Avec photo" value={liste.filter((r) => r.preuve?.type === 'photo').length} icon="fa-camera" />
                <KpiCard label="Sans preuve" value={liste.filter((r) => !r.preuve).length} variant={liste.some((r) => !r.preuve) ? 'urgent' : 'default'} icon="fa-circle-question" />
            </div>

            {liste.length === 0 ? (
                <EmptyTable icon="fa-inbox" title="Aucune remise pour le moment" />
            ) : (
                <TableCard columns={[{ label: 'Remis à' }, { label: 'Document' }, { label: 'Destinataire' }, { label: 'Preuve' }]}>
                    {liste.map((r) => (
                        <tr key={r.id} className={ROW}>
                            <td className={`${TD} text-base font-semibold tabular-nums text-epo-slate-900`}>{formatHeure(r.heureRemise)}</td>
                            <td className={TD}>
                                <TitleCell title={r.documentObjet} sub={r.documentNumero} width="max-w-[320px]" />
                            </td>
                            <td className={TD}>
                                <TitleCell title={r.preuve?.recepteur || r.destinataire.personne} sub={r.destinataire.structure} width="max-w-[220px]" />
                            </td>
                            <td className={TD}>
                                {r.preuve ? (
                                    <InlineTag icon={r.preuve.type === 'photo' ? 'fa-camera' : 'fa-signature'}>{r.preuve.type === 'photo' ? 'Photo' : 'Signature'}</InlineTag>
                                ) : (
                                    <InlineTag icon="fa-circle-exclamation" tone="danger">Aucune</InlineTag>
                                )}
                            </td>
                        </tr>
                    ))}
                </TableCard>
            )}
        </div>
    );
}
