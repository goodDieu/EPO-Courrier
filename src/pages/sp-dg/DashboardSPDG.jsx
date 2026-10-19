// src/pages/sp-dg/DashboardSPDG.jsx
import { useNavigate } from 'react-router-dom';
import { Button, KpiCard, PageHeader, Echeance } from '../../components/ui';
import DecisionDgTag from '../../components/circuit/DecisionDgTag';
import { DEMO_NOW, formatJourHeure } from '../../data/demoClock.js';
import { useCircuit } from '../../data/circuitContext.js';
import { enRetard } from '../../data/spSgStats.js';
import { arrivesSpDg, chezDg, aCocher, statsSpDg } from '../../data/spDgStats.js';

const DATE_DU_JOUR = DEMO_NOW.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export default function DashboardSPDG() {
    const navigate = useNavigate();
    const circuit = useCircuit();
    const s = statsSpDg(circuit);
    const cocher = aCocher(circuit);
    const auDg = chezDg(circuit).sort((a, b) => new Date(a.echeance || '2100-01-01') - new Date(b.echeance || '2100-01-01'));

    // Ce qui ne peut pas attendre : délais dépassés avant ou chez le DG, rejets à signaler
    const urgences = [
        ...arrivesSpDg(circuit)
            .filter((x) => enRetard(x.echeance))
            .map((x) => ({ ...x, detail: <>{x.recu ? 'À introduire' : 'À réceptionner'} : <Echeance iso={x.echeance} /></>, action: x.recu ? 'Introduire' : 'Réceptionner', to: x.recu ? '/sp_dg/introduction' : '/sp_dg/courriers-recus' })),
        ...auDg.filter((x) => enRetard(x.echeance)).map((x) => ({ ...x, detail: <>Chez le DG : <Echeance iso={x.echeance} /></>, action: 'Voir', to: '/sp_dg/introduction' })),
        ...cocher
            .filter((x) => x.source.etat === 'rejete')
            .map((x) => ({ ...x, detail: `Rejeté par le DG : ${x.source.motifRejet}. Le SG n'est pas encore prévenu.`, action: 'Cocher', to: '/sp_dg/post-visa' })),
    ];

    return (
        <div className="w-full min-w-0">
            <PageHeader
                title="Tableau de bord"
                description={`Secrétariat du DG · ${DATE_DU_JOUR}`}
                actions={
                    s.aCocher > 0 && (
                        <Button icon="fa-square-check" onClick={() => navigate('/sp_dg/post-visa')}>
                            Cocher les décisions ({s.aCocher})
                        </Button>
                    )
                }
            />

            <h2 className="mb-3 text-base font-semibold text-epo-slate-900">À traiter</h2>
            <div className="grid grid-cols-2 gap-4 mb-8 xl:grid-cols-4">
                <KpiCard label="À réceptionner" value={s.aReceptionner} hint="Envoyés par le secrétariat du SG" icon="fa-inbox" onClick={() => navigate('/sp_dg/courriers-recus')} />
                <KpiCard
                    label="À introduire au DG"
                    value={s.aIntroduire}
                    variant={s.aIntroduireEnRetard ? 'urgent' : 'default'}
                    hint={s.aIntroduireEnRetard ? `dont ${s.aIntroduireEnRetard} en retard` : 'Aucun retard'}
                    icon="fa-user-tie"
                    onClick={() => navigate('/sp_dg/introduction')}
                />
                <KpiCard label="Chez le DG" value={s.chezDg} hint="En attente de sa décision" icon="fa-hourglass-half" />
                <KpiCard label="Décisions à cocher" value={s.aCocher} variant={s.aCocher ? 'urgent' : 'default'} hint="Le SG attend" icon="fa-square-check" onClick={() => navigate('/sp_dg/post-visa')} />
            </div>

            <h2 className="mb-3 text-base font-semibold text-epo-slate-900">Ne peut pas attendre</h2>
            <div className="mb-8 overflow-hidden bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                {urgences.length === 0 ? (
                    <p className="px-5 py-6 text-sm text-epo-slate-600">Aucun retard ni urgence pour le moment.</p>
                ) : (
                    <ul className="divide-y divide-epo-slate-100">
                        {urgences.map((u) => (
                            <li key={`${u.to}-${u.id}`} className="flex items-center gap-4 px-5 py-3.5">
                                <i className="flex-shrink-0 fas fa-circle-exclamation text-epo-red-600" aria-hidden="true" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate text-epo-slate-900">
                                        <span className="tabular-nums">{u.id}</span> · {u.objet}
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

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <Liste navigate={navigate} titre="Dans le parapheur du DG" vide="Rien chez le DG pour le moment." lien={['Voir tout', '/sp_dg/introduction']} items={auDg} droite={(x) => (x.echeance ? <Echeance iso={x.echeance} /> : null)} />
                <Liste
                    navigate={navigate}
                    titre="Décisions du DG à cocher"
                    vide="Toutes les décisions sont cochées."
                    lien={['Voir tout', '/sp_dg/post-visa']}
                    items={cocher}
                    sous={(x) => formatJourHeure(x.source.decideLe)}
                    droite={(x) => <DecisionDgTag item={x} />}
                />
            </div>
        </div>
    );
}

function Liste({ titre, vide, lien, items, sous, droite, navigate }) {
    return (
        <section>
            <div className="flex items-baseline justify-between mb-3">
                <h2 className="text-base font-semibold text-epo-slate-900">{titre}</h2>
                <button type="button" onClick={() => navigate(lien[1])} className="text-sm font-medium text-epo-green-700 hover:underline">
                    {lien[0]}
                </button>
            </div>
            {items.length === 0 ? (
                <p className="p-5 text-sm bg-white border rounded-xl border-epo-slate-200 text-epo-slate-600 shadow-soft">{vide}</p>
            ) : (
                <ul className="overflow-hidden bg-white border divide-y rounded-xl border-epo-slate-200 divide-epo-slate-100 shadow-soft">
                    {items.slice(0, 5).map((x) => (
                        <li key={x.id}>
                            <button type="button" onClick={() => navigate(lien[1])} className="flex items-center w-full gap-4 px-5 py-3 text-left transition-colors hover:bg-epo-slate-50">
                                <div className="flex-shrink-0 w-32">
                                    <p className="text-sm font-semibold tabular-nums text-epo-slate-900">{x.id}</p>
                                    <p className="text-xs text-epo-slate-500">{sous ? sous(x) : x.quoi}</p>
                                </div>
                                <p className="flex-1 min-w-0 text-sm font-medium truncate text-epo-slate-900">{x.objet}</p>
                                <span className="hidden sm:block">{droite(x)}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
