// src/pages/sg/DashboardSG.jsx
import { useNavigate } from 'react-router-dom';
import { Button, KpiCard, PageHeader, Echeance } from '../../components/ui';
import QuadrantTag from '../../components/circuit/QuadrantTag';
import NatureBadge from '../../components/actes/NatureBadge';
import { DEMO_NOW, formatJourHeure } from '../../data/demoClock.js';
import { useCircuit } from '../../data/circuitContext.js';
import { QUADRANTS } from '../../data/circuit.js';
import { enRetard } from '../../data/spSgStats.js';
import { aExaminer, aImputer, documentsAViser, rejetsAReprendre, statsSg } from '../../data/sgStats.js';

const DATE_DU_JOUR = DEMO_NOW.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export default function DashboardSG() {
    const navigate = useNavigate();
    const { dossiers, actes, sortants } = useCircuit();
    const s = statsSg({ dossiers, actes, sortants });

    const courriers = [...aExaminer(dossiers), ...aImputer(dossiers)].sort(
        (a, b) => (QUADRANTS[a.quadrant]?.ordre ?? 9) - (QUADRANTS[b.quadrant]?.ordre ?? 9)
    );
    const aViser = [
        ...documentsAViser(sortants).map((d) => ({ ...d, sorte: 'sortant', titre: d.objet, sous: `Courrier pour ${d.destinataire}`, to: '/sg/courriers-sortants' })),
        ...documentsAViser(actes).map((a) => ({ ...a, sorte: 'acte', titre: a.beneficiaireNom, sous: a.objet, to: '/sg/actes' })),
    ].sort((a, b) => new Date(a.echeance) - new Date(b.echeance));

    // Ce qui ne peut pas attendre : délais dépassés, rejets du DG, blocages
    const urgences = [
        ...courriers
            .filter((d) => enRetard(d.echeanceSg))
            .map((d) => ({ id: `c-${d.id}`, ref: d.id, texte: d.objet, detail: <>Courrier à examiner : <Echeance iso={d.echeanceSg} /></>, action: 'Examiner', to: '/sg/courriers-entrants' })),
        ...aViser
            .filter((d) => enRetard(d.echeance))
            .map((d) => ({ id: `v-${d.id}`, ref: d.id, texte: d.sorte === 'acte' ? `${d.objet} - ${d.beneficiaireNom}` : d.objet, detail: <>À viser : <Echeance iso={d.echeance} /></>, action: 'Viser', to: d.to })),
        ...[...rejetsAReprendre(sortants), ...rejetsAReprendre(actes)].map((d) => ({
            id: `r-${d.id}`,
            ref: d.id,
            texte: d.objet,
            detail: `Rejeté par le DG : ${d.motifRejet || 'motif non précisé'}`,
            action: 'Ouvrir',
            to: d.beneficiaireNom ? '/sg/actes' : '/sg/courriers-sortants',
        })),
        ...dossiers
            .filter((d) => d.bloque)
            .map((d) => {
                const reponse = sortants.find((x) => x.reponseA === d.id && x.etat === 'brouillon');
                return {
                    id: `b-${d.id}`,
                    ref: d.id,
                    texte: d.objet,
                    detail: d.bloque,
                    action: reponse ? 'Reprendre la réponse' : 'Voir les courriers sortants',
                    to: reponse ? `/sg/courriers-sortants/${reponse.id}` : '/sg/courriers-sortants',
                };
            }),
    ];

    return (
        <div className="w-full min-w-0">
            <PageHeader
                title="Tableau de bord"
                description={`Secrétaire Général · ${DATE_DU_JOUR}`}
                actions={
                    <Button icon="fa-pen" variant="outline" onClick={() => navigate('/sg/courriers-sortants')}>
                        Rédiger un courrier
                    </Button>
                }
            />

            <h2 className="mb-3 text-base font-semibold text-epo-slate-900">À traiter</h2>
            <div className="grid grid-cols-2 gap-4 mb-8 xl:grid-cols-4">
                <KpiCard
                    label="Courriers à examiner"
                    value={s.aExaminer}
                    variant={s.aExaminerEnRetard ? 'urgent' : 'default'}
                    hint={s.aExaminerEnRetard ? `dont ${s.aExaminerEnRetard} en retard` : 'Introduits par votre secrétariat'}
                    icon="fa-envelope-open-text"
                    onClick={() => navigate('/sg/courriers-entrants')}
                />
                <KpiCard label="Courriers à imputer" value={s.aImputer} hint="Revenus du DG" icon="fa-share" onClick={() => navigate('/sg/courriers-entrants')} />
                <KpiCard
                    label="Documents à viser"
                    value={s.aViser}
                    variant={s.aViserEnRetard ? 'urgent' : 'default'}
                    hint={`${s.sortantsAViser} courrier${s.sortantsAViser > 1 ? 's' : ''} · ${s.actesAViser} acte${s.actesAViser > 1 ? 's' : ''}`}
                    icon="fa-stamp"
                    onClick={() => navigate(s.actesAViser ? '/sg/actes' : '/sg/courriers-sortants')}
                />
                <KpiCard label="Au DG pour signature" value={s.documentsAuDg} hint="Courriers et actes visés" icon="fa-user-tie" />
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

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <section>
                    <div className="flex items-baseline justify-between mb-3">
                        <h2 className="text-base font-semibold text-epo-slate-900">Courriers en attente de votre décision</h2>
                        <button type="button" onClick={() => navigate('/sg/courriers-entrants')} className="text-sm font-medium text-epo-green-700 hover:underline">
                            Voir tout
                        </button>
                    </div>
                    {courriers.length === 0 ? (
                        <p className="p-5 text-sm bg-white border rounded-xl border-epo-slate-200 text-epo-slate-600 shadow-soft">Aucun courrier en attente.</p>
                    ) : (
                        <ul className="overflow-hidden bg-white border divide-y rounded-xl border-epo-slate-200 divide-epo-slate-100 shadow-soft">
                            {courriers.slice(0, 5).map((d) => (
                                <li key={d.id}>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/sg/courriers-entrants')}
                                        className="flex items-center w-full gap-4 px-5 py-3 text-left transition-colors hover:bg-epo-slate-50"
                                    >
                                        <div className="flex-shrink-0 w-24">
                                            <p className="text-sm font-semibold tabular-nums text-epo-slate-900">{d.id}</p>
                                            <p className="text-xs text-epo-slate-500">{d.localisation === 'retour-sg' ? 'Retour du DG' : 'À examiner'}</p>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate text-epo-slate-900">{d.objet}</p>
                                            <p className="text-xs truncate text-epo-slate-500">{d.expediteur}</p>
                                        </div>
                                        <span className="hidden sm:block">
                                            <QuadrantTag quadrant={d.quadrant} />
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section>
                    <div className="flex items-baseline justify-between mb-3">
                        <h2 className="text-base font-semibold text-epo-slate-900">Documents à viser</h2>
                        <button type="button" onClick={() => navigate('/sg/actes')} className="text-sm font-medium text-epo-green-700 hover:underline">
                            Voir les actes
                        </button>
                    </div>
                    {aViser.length === 0 ? (
                        <p className="p-5 text-sm bg-white border rounded-xl border-epo-slate-200 text-epo-slate-600 shadow-soft">Aucun document à viser.</p>
                    ) : (
                        <ul className="overflow-hidden bg-white border divide-y rounded-xl border-epo-slate-200 divide-epo-slate-100 shadow-soft">
                            {aViser.slice(0, 5).map((d) => (
                                <li key={d.id}>
                                    <button type="button" onClick={() => navigate(d.to)} className="flex items-center w-full gap-4 px-5 py-3 text-left transition-colors hover:bg-epo-slate-50">
                                        <div className="flex-shrink-0 w-32">
                                            <p className="text-sm font-semibold tabular-nums text-epo-slate-900">{d.id}</p>
                                            <p className="text-xs text-epo-slate-500">{formatJourHeure(d.creeLe || d.dateCreation)}</p>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate text-epo-slate-900">{d.titre}</p>
                                            <p className="text-xs truncate text-epo-slate-500">{d.sous}</p>
                                        </div>
                                        <span className="flex-col items-end hidden gap-0.5 sm:flex">
                                            {d.sorte === 'acte' ? <NatureBadge nature={d.nature} /> : <span className="text-sm text-epo-slate-700">Courrier</span>}
                                            <Echeance iso={d.echeance} />
                                        </span>
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
