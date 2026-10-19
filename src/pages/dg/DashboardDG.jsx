// src/pages/dg/DashboardDG.jsx
import { useNavigate } from 'react-router-dom';
import { Button, KpiCard, PageHeader, Echeance } from '../../components/ui';
import { DEMO_NOW } from '../../data/demoClock.js';
import { useCircuit } from '../../data/circuitContext.js';
import { enRetard } from '../../data/spSgStats.js';
import { aSigner, pourDecision, statsDg } from '../../data/dgStats.js';

const DATE_DU_JOUR = DEMO_NOW.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export default function DashboardDG() {
    const navigate = useNavigate();
    const circuit = useCircuit();
    const s = statsDg(circuit);
    const signer = aSigner(circuit);
    const decider = pourDecision(circuit);
    const urgences = [...signer, ...decider].filter((x) => enRetard(x.echeance) || x.classification === 'urgent');

    return (
        <div className="w-full min-w-0">
            <PageHeader
                title="Tableau de bord"
                description={`Directeur Général · ${DATE_DU_JOUR}`}
                actions={
                    s.aSigner > 0 && (
                        <Button icon="fa-pen-nib" onClick={() => navigate('/dg/a-signer')}>
                            Ouvrir le parapheur ({s.aSigner})
                        </Button>
                    )
                }
            />

            <h2 className="mb-3 text-base font-semibold text-epo-slate-900">À traiter</h2>
            <div className="grid grid-cols-2 gap-4 mb-8 xl:grid-cols-4">
                <KpiCard
                    label="À signer"
                    value={s.aSigner}
                    variant={s.aSignerEnRetard ? 'urgent' : 'default'}
                    hint={s.aSignerEnRetard ? `dont ${s.aSignerEnRetard} en retard` : 'Actes et courriers'}
                    icon="fa-pen-nib"
                    onClick={() => navigate('/dg/a-signer')}
                />
                <KpiCard
                    label="Pour décision"
                    value={s.pourDecision}
                    variant={s.pourDecisionUrgents ? 'urgent' : 'default'}
                    hint={s.pourDecisionUrgents ? `dont ${s.pourDecisionUrgents} urgent${s.pourDecisionUrgents > 1 ? 's' : ''}` : 'Avis et validations'}
                    icon="fa-scale-balanced"
                    onClick={() => navigate('/dg/a-valider')}
                />
                <KpiCard label="À faire aujourd'hui" value={s.aujourdhui} hint={s.enRetard ? `et ${s.enRetard} en retard` : 'Aucun retard'} icon="fa-calendar-day" onClick={() => navigate('/dg/echeances')} />
                <KpiCard label="Signés aujourd'hui" value={s.signesAujourdhui} icon="fa-check" onClick={() => navigate('/dg/actes-signes')} />
            </div>

            <h2 className="mb-3 text-base font-semibold text-epo-slate-900">Ne peut pas attendre</h2>
            <div className="mb-8 overflow-hidden bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                {urgences.length === 0 ? (
                    <p className="px-5 py-6 text-sm text-epo-slate-600">Aucun retard ni urgence pour le moment.</p>
                ) : (
                    <ul className="divide-y divide-epo-slate-100">
                        {urgences.map((x) => {
                            const signature = x.sorte === 'acte' || x.sorte === 'sortant';
                            return (
                                <li key={`${x.sorte}-${x.id}`} className="flex items-center gap-4 px-5 py-3.5">
                                    <i className="flex-shrink-0 fas fa-circle-exclamation text-epo-red-600" aria-hidden="true" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate text-epo-slate-900">
                                            <span className="tabular-nums">{x.id}</span> · {x.objet}
                                        </p>
                                        <p className="text-sm text-epo-slate-600">
                                            {x.quoi}
                                            {x.echeance && (
                                                <>
                                                    {' · '}
                                                    <Echeance iso={x.echeance} />
                                                </>
                                            )}
                                        </p>
                                    </div>
                                    <Button size="sm" variant="outline" onClick={() => navigate(signature ? '/dg/a-signer' : '/dg/a-valider')}>
                                        {signature ? 'Signer' : 'Décider'}
                                    </Button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <Liste titre="Parapheur" items={signer} lien="/dg/a-signer" navigate={navigate} />
                <Liste titre="Pour décision" items={decider} lien="/dg/a-valider" navigate={navigate} />
            </div>
        </div>
    );
}

function Liste({ titre, items, lien, navigate }) {
    return (
        <section>
            <div className="flex items-baseline justify-between mb-3">
                <h2 className="text-base font-semibold text-epo-slate-900">{titre}</h2>
                <button type="button" onClick={() => navigate(lien)} className="text-sm font-medium text-epo-green-700 hover:underline">
                    Voir tout ({items.length})
                </button>
            </div>
            {items.length === 0 ? (
                <p className="p-5 text-sm bg-white border rounded-xl border-epo-slate-200 text-epo-slate-600 shadow-soft">Rien en attente.</p>
            ) : (
                <ul className="overflow-hidden bg-white border divide-y rounded-xl border-epo-slate-200 divide-epo-slate-100 shadow-soft">
                    {items.slice(0, 5).map((x) => (
                        <li key={x.id}>
                            <button type="button" onClick={() => navigate(lien)} className="flex items-center w-full gap-4 px-5 py-3 text-left transition-colors hover:bg-epo-slate-50">
                                <div className="flex-shrink-0 w-32">
                                    <p className="text-sm font-semibold tabular-nums text-epo-slate-900">{x.id}</p>
                                    <p className="text-xs truncate text-epo-slate-500">{x.quoi}</p>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate text-epo-slate-900">{x.objet}</p>
                                    <p className="text-xs truncate text-epo-slate-500">{x.de}</p>
                                </div>
                                <span className="hidden sm:block">{x.echeance ? <Echeance iso={x.echeance} /> : null}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
