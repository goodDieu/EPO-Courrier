// src/pages/liaison/TourneesPage.jsx
import { useState } from 'react';
import { Button, KpiCard, PageHeader, TableCard, RowAction, TitleCell, EmptyTable, TD, ROW, notify } from '../../components/ui';
import StatutRemiseTag from '../../components/liaison/StatutRemiseTag';
import ValiderRemiseModal from '../../components/liaison/ValiderRemiseModal';
import ProblemeModal from '../../components/liaison/ProblemeModal';
import { formatHeure, ZONES } from '../../data/liaisonsSCC.js';
import { DEMO_NOW } from '../../data/demoClock.js';
import { useScc } from '../../data/sccContext.js';
import { MON_AGENT_ID, aFaire, statsLiaison } from '../../data/liaisonStats.js';

export default function TourneesPage() {
    const { agents, validerRemise, signalerProbleme, demarrerTournee, cloturerTournee } = useScc();
    const agent = agents.find((a) => a.id === MON_AGENT_ID);
    const [aValider, setAValider] = useState(null);
    const [probleme, setProbleme] = useState(null);

    const s = statsLiaison(agent);
    const liste = aFaire(agent);
    const enTournee = agent.statut === 'en-tournee';

    const handleValider = (remise, preuve) => {
        validerRemise(agent.id, remise, { ...preuve, heureRemise: DEMO_NOW.toISOString() });
        setAValider(null);
        notify.success(`${remise.documentNumero} remis`, { items: [`Reçu par ${preuve.nomRecepteur}`, 'Le Service Courrier voit la remise et la preuve'] });
    };
    const handleSignaler = (remise, motif) => {
        signalerProbleme(agent.id, remise, motif);
        setProbleme(null);
        notify.success('Service Courrier prévenu', { items: [`${remise.documentNumero} : ${motif}`] });
    };

    return (
        <div className="w-full min-w-0">
            <PageHeader
                title="Ma tournée"
                description={`Zone ${agent.zone} · ${ZONES[agent.zone]?.description || ''}`}
                actions={
                    enTournee ? (
                        <Button
                            variant="outline"
                            icon="fa-flag-checkered"
                            onClick={() => {
                                cloturerTournee(agent.id);
                                notify.success('Tournée clôturée', { items: [`${s.total - s.aRemettre} remise${s.total - s.aRemettre > 1 ? 's' : ''} sur ${s.total}`] });
                            }}
                        >
                            Clôturer la tournée
                        </Button>
                    ) : (
                        <Button
                            icon="fa-route"
                            onClick={() => {
                                demarrerTournee(agent.id);
                                notify.success('Tournée démarrée', { items: [`${s.aRemettre} document${s.aRemettre > 1 ? 's' : ''} à remettre`] });
                            }}
                        >
                            Démarrer la tournée
                        </Button>
                    )
                }
            />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard label="À remettre" value={s.aRemettre} icon="fa-envelope" />
                <KpiCard label="En retard" value={s.enRetard} variant={s.enRetard ? 'urgent' : 'default'} hint="Heure prévue dépassée" icon="fa-clock" />
                <KpiCard label="Remis aujourd'hui" value={s.faitesAujourdhui} hint={`sur ${s.total} prévus`} icon="fa-check" />
                <KpiCard label="Problèmes signalés" value={s.problemes} icon="fa-triangle-exclamation" />
            </div>

            <div className="h-2 mb-6 overflow-hidden rounded-full bg-epo-slate-200" role="progressbar" aria-valuenow={s.faitesAujourdhui} aria-valuemax={s.total} aria-label="Avancement de la tournée">
                <div className="h-full bg-epo-green-600" style={{ width: `${s.total ? (s.faitesAujourdhui / s.total) * 100 : 0}%` }} />
            </div>

            {liste.length === 0 ? (
                <EmptyTable icon="fa-check" title="Tout est remis" message="Pensez à clôturer la tournée." />
            ) : (
                <TableCard columns={[{ label: 'Heure prévue' }, { label: 'Document' }, { label: 'À remettre à' }, { label: 'Statut' }, { label: '' }]} footer="Dans l'ordre de passage">
                    {liste.map((r) => (
                        <tr key={r.id} className={ROW}>
                            <td className={`${TD} text-base font-semibold tabular-nums text-epo-slate-900`}>{formatHeure(r.heurePrevue)}</td>
                            <td className={TD}>
                                <TitleCell title={r.documentObjet} sub={`${r.documentNumero}${r.priorite === 'urgent' ? ' · urgent' : ''}`} width="max-w-[300px]" />
                            </td>
                            <td className={TD}>
                                <TitleCell title={r.destinataire.personne} sub={r.destinataire.structure} width="max-w-[200px]" />
                            </td>
                            <td className={TD}>
                                <StatutRemiseTag statut={r.statut} />
                            </td>
                            <td className={`${TD} text-right whitespace-nowrap`}>
                                <RowAction onClick={() => setProbleme(r)}>Problème</RowAction>
                                <RowAction primary icon="fa-check" onClick={() => setAValider(r)}>
                                    Remis
                                </RowAction>
                            </td>
                        </tr>
                    ))}
                </TableCard>
            )}

            <ValiderRemiseModal key={aValider?.id ?? 'aucune'} remise={aValider} onClose={() => setAValider(null)} onValider={handleValider} />
            <ProblemeModal key={probleme?.id ?? 'aucun'} remise={probleme} onClose={() => setProbleme(null)} onSignaler={handleSignaler} />
        </div>
    );
}
