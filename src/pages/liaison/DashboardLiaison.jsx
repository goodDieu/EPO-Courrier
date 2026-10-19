// src/pages/liaison/DashboardLiaison.jsx
import { useNavigate } from 'react-router-dom';
import { Button, KpiCard, PageHeader } from '../../components/ui';
import StatutRemiseTag from '../../components/liaison/StatutRemiseTag';
import { formatHeure } from '../../data/liaisonsSCC.js';
import { DEMO_NOW } from '../../data/demoClock.js';
import { useScc } from '../../data/sccContext.js';
import { MON_AGENT_ID, aFaire, problemes, statsLiaison } from '../../data/liaisonStats.js';

const DATE_DU_JOUR = DEMO_NOW.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export default function DashboardLiaison() {
    const navigate = useNavigate();
    const { agents } = useScc();
    const agent = agents.find((a) => a.id === MON_AGENT_ID);
    const s = statsLiaison(agent);
    const prochaines = aFaire(agent);
    const urgences = [...prochaines.filter((r) => r.statut === 'en-retard'), ...problemes(agent)];

    return (
        <div className="w-full min-w-0">
            <PageHeader
                title="Tableau de bord"
                description={`Agent de liaison · ${DATE_DU_JOUR}`}
                actions={
                    <Button icon="fa-route" onClick={() => navigate('/liaison/tournees')}>
                        Ouvrir ma tournée
                    </Button>
                }
            />

            <h2 className="mb-3 text-base font-semibold text-epo-slate-900">Aujourd'hui</h2>
            <div className="grid grid-cols-2 gap-4 mb-8 xl:grid-cols-4">
                <KpiCard label="À remettre" value={s.aRemettre} icon="fa-envelope" onClick={() => navigate('/liaison/tournees')} />
                <KpiCard label="En retard" value={s.enRetard} variant={s.enRetard ? 'urgent' : 'default'} hint="Heure prévue dépassée" icon="fa-clock" onClick={() => navigate('/liaison/tournees')} />
                <KpiCard label="Remis" value={s.faitesAujourdhui} hint={`sur ${s.total} prévus`} icon="fa-check" onClick={() => navigate('/liaison/remises')} />
                <KpiCard label="Problèmes signalés" value={s.problemes} icon="fa-triangle-exclamation" onClick={() => navigate('/liaison/en-attente')} />
            </div>

            <h2 className="mb-3 text-base font-semibold text-epo-slate-900">Ne peut pas attendre</h2>
            <div className="mb-8 overflow-hidden bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                {urgences.length === 0 ? (
                    <p className="px-5 py-6 text-sm text-epo-slate-600">Aucun retard ni problème pour le moment.</p>
                ) : (
                    <ul className="divide-y divide-epo-slate-100">
                        {urgences.map((r) => (
                            <li key={r.id} className="flex items-center gap-4 px-5 py-3.5">
                                <i className="flex-shrink-0 fas fa-circle-exclamation text-epo-red-600" aria-hidden="true" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate text-epo-slate-900">
                                        <span className="tabular-nums">{r.documentNumero}</span> · {r.documentObjet}
                                    </p>
                                    <p className="text-sm text-epo-slate-600">
                                        {r.statut === 'bloque' ? r.motifBlocage : `Prévu à ${formatHeure(r.heurePrevue)} chez ${r.destinataire.personne} (${r.destinataire.structure})`}
                                    </p>
                                </div>
                                <Button size="sm" variant="outline" onClick={() => navigate(r.statut === 'bloque' ? '/liaison/en-attente' : '/liaison/tournees')}>
                                    {r.statut === 'bloque' ? 'Repasser' : 'Remettre'}
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <h2 className="mb-3 text-base font-semibold text-epo-slate-900">Prochaines remises</h2>
            {prochaines.length === 0 ? (
                <p className="p-5 text-sm bg-white border rounded-xl border-epo-slate-200 text-epo-slate-600 shadow-soft">Tout est remis pour aujourd'hui.</p>
            ) : (
                <ul className="overflow-hidden bg-white border divide-y rounded-xl border-epo-slate-200 divide-epo-slate-100 shadow-soft">
                    {prochaines.map((r) => (
                        <li key={r.id}>
                            <button type="button" onClick={() => navigate('/liaison/tournees')} className="flex items-center w-full gap-4 px-5 py-3 text-left transition-colors hover:bg-epo-slate-50">
                                <span className="flex-shrink-0 w-16 text-base font-semibold tabular-nums text-epo-slate-900">{formatHeure(r.heurePrevue)}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate text-epo-slate-900">{r.documentObjet}</p>
                                    <p className="text-xs truncate text-epo-slate-500">
                                        {r.destinataire.personne} · {r.destinataire.structure}
                                    </p>
                                </div>
                                <StatutRemiseTag statut={r.statut} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
