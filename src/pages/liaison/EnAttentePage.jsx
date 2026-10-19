// src/pages/liaison/EnAttentePage.jsx
import { KpiCard, PageHeader, TableCard, RowAction, TitleCell, EmptyTable, TD, ROW, notify } from '../../components/ui';
import { formatJourHeure, DEMO_NOW } from '../../data/demoClock.js';
import { useScc } from '../../data/sccContext.js';
import { MON_AGENT_ID, problemes } from '../../data/liaisonStats.js';

export default function EnAttentePage() {
    const { agents, reprogrammerRemise } = useScc();
    const agent = agents.find((a) => a.id === MON_AGENT_ID);
    const liste = problemes(agent);

    const reessayer = (r) => {
        const heure = new Date(DEMO_NOW.getTime() + 60 * 60000).toISOString();
        reprogrammerRemise(agent.id, r, heure);
        notify.success(`${r.documentNumero} remis dans la tournée`, { items: ['Nouveau passage prévu dans une heure'] });
    };

    return (
        <div className="w-full min-w-0">
            <PageHeader title="Problèmes de remise" description="Documents que vous n'avez pas pu remettre. Le Service Courrier en est informé." />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard label="Problèmes en cours" value={liste.length} variant={liste.length ? 'urgent' : 'default'} icon="fa-triangle-exclamation" />
            </div>

            {liste.length === 0 ? (
                <EmptyTable icon="fa-check" title="Aucun problème de remise" message="Si un destinataire est absent, signalez-le depuis « Ma tournée »." />
            ) : (
                <TableCard columns={[{ label: 'Document' }, { label: 'À remettre à' }, { label: 'Problème' }, { label: '' }]}>
                    {liste.map((r) => (
                        <tr key={r.id} className={ROW}>
                            <td className={TD}>
                                <TitleCell title={r.documentObjet} sub={r.documentNumero} width="max-w-[300px]" />
                            </td>
                            <td className={TD}>
                                <TitleCell title={r.destinataire.personne} sub={r.destinataire.structure} width="max-w-[200px]" />
                            </td>
                            <td className={TD}>
                                <TitleCell title={r.motifBlocage} sub={r.signaleLe ? `Signalé ${formatJourHeure(r.signaleLe).toLowerCase()}` : null} width="max-w-[260px]" />
                            </td>
                            <td className={`${TD} text-right`}>
                                <RowAction primary icon="fa-rotate-right" onClick={() => reessayer(r)}>
                                    Repasser
                                </RowAction>
                            </td>
                        </tr>
                    ))}
                </TableCard>
            )}
        </div>
    );
}
