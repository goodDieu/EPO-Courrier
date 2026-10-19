// src/pages/sp-sg/DashboardSPSG.jsx
import { useNavigate } from 'react-router-dom';
import { Button, KpiCard, PageHeader, Echeance } from '../../components/ui';
import QuadrantTag from '../../components/circuit/QuadrantTag';
import { TYPES_INSTRUCTION } from '../../data/circuit.js';
import { DEMO_NOW, formatJourHeure } from '../../data/demoClock.js';
import { useScc } from '../../data/sccContext.js';
import { useCircuit } from '../../data/circuitContext.js';
import { aReceptionner, aIntroduire, enRetard, instructionsOuvertes, statsSpSg } from '../../data/spSgStats.js';

const DATE_DU_JOUR = DEMO_NOW.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export default function DashboardSPSG() {
    const navigate = useNavigate();
    const { arrivees } = useScc();
    const { dossiers, instructions } = useCircuit();
    const s = statsSpSg({ arrivees, dossiers, instructions });

    const dossierDe = (id) => dossiers.find((d) => d.id === id);
    const ouvertes = instructionsOuvertes(instructions);
    const prochains = aIntroduire(dossiers).slice(0, 5);

    // Ce qui ne peut pas attendre : délais dépassés, urgences à réceptionner, blocages
    const urgences = [
        ...aIntroduire(dossiers)
            .filter((d) => enRetard(d.echeance))
            .map((d) => ({ id: `intro-${d.id}`, ref: d.id, texte: d.objet, detail: <>Introduction au SG : <Echeance iso={d.echeance} /></>, action: 'Introduire', to: '/sp_sg/introduction' })),
        ...ouvertes
            .filter((i) => enRetard(i.echeance))
            .map((i) => ({
                id: `inst-${i.id}`,
                ref: i.dossierId,
                texte: dossierDe(i.dossierId)?.objet,
                detail: <>Instruction du SG : <Echeance iso={i.echeance} /></>,
                action: 'Exécuter',
                to: '/sp_sg/instructions',
            })),
        ...aReceptionner(arrivees)
            .filter((a) => a.classification === 'urgent')
            .map((a) => ({ id: `rec-${a.id}`, ref: a.id, texte: a.objet, detail: 'Courrier urgent envoyé par le Service Courrier', action: 'Réceptionner', to: '/sp_sg/courriers-recus' })),
        ...dossiers
            .filter((d) => d.bloque)
            .map((d) => ({ id: `bloc-${d.id}`, ref: d.id, texte: d.objet, detail: d.bloque, action: 'Voir le suivi', to: '/sp_sg/suivi' })),
    ];

    return (
        <div className="w-full min-w-0">
            <PageHeader
                title="Tableau de bord"
                description={`Secrétariat du SG · ${DATE_DU_JOUR}`}
                actions={
                    s.aReceptionner > 0 && (
                        <Button icon="fa-inbox" onClick={() => navigate('/sp_sg/courriers-recus')}>
                            Réceptionner les courriers ({s.aReceptionner})
                        </Button>
                    )
                }
            />

            <h2 className="mb-3 text-base font-semibold text-epo-slate-900">À traiter</h2>
            <div className="grid grid-cols-2 gap-4 mb-8 xl:grid-cols-4">
                <KpiCard
                    label="À réceptionner"
                    value={s.aReceptionner}
                    variant={s.aReceptionnerUrgents ? 'urgent' : 'default'}
                    hint={s.aReceptionnerUrgents ? `dont ${s.aReceptionnerUrgents} urgent${s.aReceptionnerUrgents > 1 ? 's' : ''}` : 'Envoyés par le Service Courrier'}
                    icon="fa-inbox"
                    onClick={() => navigate('/sp_sg/courriers-recus')}
                />
                <KpiCard label="À trier" value={s.aTrier} hint="Importance et urgence" icon="fa-table-cells-large" onClick={() => navigate('/sp_sg/tri')} />
                <KpiCard
                    label="À introduire au SG"
                    value={s.aIntroduire}
                    variant={s.aIntroduireEnRetard ? 'urgent' : 'default'}
                    hint={s.aIntroduireEnRetard ? `dont ${s.aIntroduireEnRetard} en retard` : 'Aucun retard'}
                    icon="fa-user-tie"
                    onClick={() => navigate('/sp_sg/introduction')}
                />
                <KpiCard
                    label="Instructions du SG"
                    value={s.instructions}
                    variant={s.instructionsEnRetard ? 'urgent' : 'default'}
                    hint={s.instructionsEnRetard ? `dont ${s.instructionsEnRetard} en retard` : 'À exécuter'}
                    icon="fa-list-check"
                    onClick={() => navigate('/sp_sg/instructions')}
                />
            </div>

            <h2 className="mb-3 text-base font-semibold text-epo-slate-900">Ne peut pas attendre</h2>
            <div className="mb-8 overflow-hidden bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                {urgences.length === 0 ? (
                    <p className="px-5 py-6 text-sm text-epo-slate-600">Aucun retard ni urgence pour le moment.</p>
                ) : (
                    <ul className="divide-y divide-epo-slate-100">
                        {urgences.map((u) => (
                            <li key={u.id} className="flex items-center gap-4 px-5 py-3.5">
                                <i className="flex-shrink-0 fas fa-circle-exclamation text-epo-red-600" aria-hidden="true" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate text-epo-slate-900">
                                        <span className="tabular-nums">{u.ref}</span> · {u.texte}
                                    </p>
                                    <p className="text-sm text-epo-slate-600">{u.detail}</p>
                                </div>
                                <Button size="sm" variant="outline" onClick={() => navigate(u.to)}>
                                    {u.action}
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
                <section className="xl:col-span-3">
                    <div className="flex items-baseline justify-between mb-3">
                        <h2 className="text-base font-semibold text-epo-slate-900">Prochains dossiers pour le SG</h2>
                        <button type="button" onClick={() => navigate('/sp_sg/introduction')} className="text-sm font-medium text-epo-green-700 hover:underline">
                            Voir tout ({s.aIntroduire})
                        </button>
                    </div>
                    {prochains.length === 0 ? (
                        <p className="p-5 text-sm bg-white border rounded-xl border-epo-slate-200 text-epo-slate-600 shadow-soft">Aucun dossier trié en attente.</p>
                    ) : (
                        <ul className="overflow-hidden bg-white border divide-y rounded-xl border-epo-slate-200 divide-epo-slate-100 shadow-soft">
                            {prochains.map((d) => (
                                <li key={d.id}>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/sp_sg/introduction')}
                                        className="flex items-center w-full gap-4 px-5 py-3 text-left transition-colors hover:bg-epo-slate-50"
                                    >
                                        <div className="flex-shrink-0 w-32">
                                            <p className="text-sm font-semibold tabular-nums text-epo-slate-900">{d.id}</p>
                                            <p className="text-xs text-epo-slate-500">{formatJourHeure(d.recuLe)}</p>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate text-epo-slate-900">{d.objet}</p>
                                            <p className="text-xs truncate text-epo-slate-500">{d.expediteur}</p>
                                        </div>
                                        <span className="flex-col items-end hidden gap-0.5 sm:flex">
                                            <QuadrantTag quadrant={d.quadrant} />
                                            <Echeance iso={d.echeance} />
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section className="xl:col-span-2">
                    <div className="flex items-baseline justify-between mb-3">
                        <h2 className="text-base font-semibold text-epo-slate-900">Instructions du SG</h2>
                        <button type="button" onClick={() => navigate('/sp_sg/instructions')} className="text-sm font-medium text-epo-green-700 hover:underline">
                            Voir tout
                        </button>
                    </div>
                    {ouvertes.length === 0 ? (
                        <p className="p-5 text-sm bg-white border rounded-xl border-epo-slate-200 text-epo-slate-600 shadow-soft">Toutes les instructions sont exécutées.</p>
                    ) : (
                        <ul className="overflow-hidden bg-white border divide-y rounded-xl border-epo-slate-200 divide-epo-slate-100 shadow-soft">
                            {ouvertes.slice(0, 4).map((i) => (
                                <li key={i.id}>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/sp_sg/instructions')}
                                        className="w-full px-5 py-3 text-left transition-colors hover:bg-epo-slate-50"
                                    >
                                        <p className="text-sm text-epo-slate-900 line-clamp-2">{i.contenu}</p>
                                        <p className="mt-1 text-xs text-epo-slate-500">
                                            {TYPES_INSTRUCTION[i.type].label} · Dossier {i.dossierId}
                                            {i.echeance && (
                                                <>
                                                    {' · '}
                                                    <Echeance iso={i.echeance} className="!text-xs" />
                                                </>
                                            )}
                                        </p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </div>
    );
}
