// src/pages/scc/DashboardRSC.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, KpiCard, PageHeader, StatusBadge, InlineTag } from '../../components/ui';
import ClassificationBadge from '../../components/scc/ClassificationBadge';
import ArriveeFormModal from '../../components/scc/ArriveeFormModal';
import { ETATS_ENTRANTS } from '../../data/arriveesSCC.js';
import { formatDuree } from '../../data/dispatchSCC.js';
import { DEMO_NOW, formatJourHeure } from '../../data/demoClock.js';
import { statsArrivees, statsDispatch, statsScan, statsDeparts, statsLiaisons } from '../../data/sccStats.js';
import { useScc } from '../../data/sccContext.js';

const DATE_DU_JOUR = DEMO_NOW.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export default function DashboardRSC() {
    const navigate = useNavigate();
    const { arrivees, dossiers, documents, departs, agents, ajouterArrivee, prochainNumeroArrivee } = useScc();
    const [modalEnregistrement, setModalEnregistrement] = useState(false);

    const a = statsArrivees(arrivees);
    const d = statsDispatch(dossiers);
    const s = statsScan(documents);
    const dep = statsDeparts(departs);
    const l = statsLiaisons(agents);

    // Ce qui ne peut pas attendre : retards de remise, numérisations en erreur, urgents non transmis
    const urgences = [
        ...dossiers
            .filter((x) => x.etat === 'en-retard')
            .map((x) => ({
                id: `dispatch-${x.id}`,
                ref: x.id,
                texte: x.objet,
                detail: `Remise à ${x.destinataire.structure} en retard de ${formatDuree(x.tempsRestantMin)}${x.agentAssigne ? ` · ${x.agentAssigne}` : ''}`,
                action: x.agentAssigne ? 'Réassigner' : 'Dispatcher',
                to: '/scc/dispatch',
            })),
        ...documents
            .filter((x) => x.etat === 'erreur')
            .map((x) => ({
                id: `scan-${x.id}`,
                ref: x.documentSource,
                texte: x.objet,
                detail: `Numérisation en erreur : ${x.erreur}`,
                action: 'Relancer',
                to: '/scc/scan',
            })),
        ...arrivees
            .filter((x) => x.etat === 'enregistre' && x.classification === 'urgent')
            .map((x) => ({
                id: `arrivee-${x.id}`,
                ref: x.id,
                texte: x.objet,
                detail: `Courrier urgent à transmettre au SP-SG (reste ${formatDuree(x.tempsRestant)})`,
                action: 'Transmettre',
                to: '/scc/arrivees',
            })),
    ];

    const dernieresArrivees = [...arrivees].sort((x, y) => new Date(y.dateReception) - new Date(x.dateReception)).slice(0, 5);
    const tournees = agents.filter((x) => x.statut === 'en-tournee');

    return (
        <div className="w-full min-w-0">
            <PageHeader
                title="Tableau de bord"
                description={`Service Courrier · ${DATE_DU_JOUR}`}
                actions={
                    <Button icon="fa-plus" onClick={() => setModalEnregistrement(true)}>
                        Enregistrer un courrier
                    </Button>
                }
            />

            {/* À traiter */}
            <h2 className="mb-3 text-base font-semibold text-epo-slate-900">À traiter</h2>
            <div className="grid grid-cols-2 gap-4 mb-8 xl:grid-cols-4">
                <KpiCard
                    label="À transmettre au SP-SG"
                    value={a.aTransmettre}
                    hint={a.aTransmettreUrgents ? `dont ${a.aTransmettreUrgents} urgent${a.aTransmettreUrgents > 1 ? 's' : ''}` : 'Aucun urgent'}
                    icon="fa-paper-plane"
                    onClick={() => navigate('/scc/arrivees')}
                />
                <KpiCard
                    label="À dispatcher"
                    value={d.aDispatcher + d.enRetard}
                    variant={d.enRetard ? 'urgent' : 'default'}
                    hint={d.enRetard ? `dont ${d.enRetard} en retard` : 'Aucun retard'}
                    icon="fa-share"
                    onClick={() => navigate('/scc/dispatch')}
                />
                <KpiCard
                    label="À scanner"
                    value={s.aScanner + s.erreurs}
                    hint={s.erreurs ? `dont ${s.erreurs} en erreur` : 'Aucune erreur'}
                    icon="fa-camera"
                    onClick={() => navigate('/scc/scan')}
                />
                <KpiCard
                    label="Départs à préparer"
                    value={dep.aNumeroter + dep.aCacheter + dep.pretsExpedition}
                    hint={`${dep.aNumeroter} à numéroter · ${dep.aCacheter} à cacheter`}
                    icon="fa-paper-plane"
                    onClick={() => navigate('/scc/departs')}
                />
            </div>

            {/* Urgences */}
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
                {/* Dernières arrivées */}
                <section className="xl:col-span-3">
                    <div className="flex items-baseline justify-between mb-3">
                        <h2 className="text-base font-semibold text-epo-slate-900">Dernières arrivées</h2>
                        <button type="button" onClick={() => navigate('/scc/arrivees')} className="text-sm font-medium text-epo-green-700 hover:underline">
                            Voir le registre ({arrivees.length})
                        </button>
                    </div>
                    <ul className="overflow-hidden bg-white border divide-y rounded-xl border-epo-slate-200 divide-epo-slate-100 shadow-soft">
                        {dernieresArrivees.map((x) => (
                            <li key={x.id}>
                                <button
                                    type="button"
                                    onClick={() => navigate('/scc/arrivees')}
                                    className="flex items-center w-full gap-4 px-5 py-3 text-left transition-colors hover:bg-epo-slate-50"
                                >
                                    <div className="w-28 flex-shrink-0">
                                        <p className="text-sm font-semibold tabular-nums text-epo-slate-900">{x.id}</p>
                                        <p className="text-xs text-epo-slate-500">{formatJourHeure(x.dateReception)}</p>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate text-epo-slate-900">{x.objet}</p>
                                        <p className="text-xs truncate text-epo-slate-500">{x.expediteur}</p>
                                    </div>
                                    <span className="items-center hidden gap-4 sm:flex">
                                        {x.classification !== 'ordinaire' && <ClassificationBadge classification={x.classification} />}
                                        <StatusBadge status={x.etat} label={ETATS_ENTRANTS[x.etat]?.label} />
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Tournées */}
                <section className="xl:col-span-2">
                    <div className="flex items-baseline justify-between mb-3">
                        <h2 className="text-base font-semibold text-epo-slate-900">Tournées en cours</h2>
                        <button type="button" onClick={() => navigate('/scc/liaisons')} className="text-sm font-medium text-epo-green-700 hover:underline">
                            Voir les liaisons
                        </button>
                    </div>
                    <div className="p-5 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                        <p className="mb-4 text-sm text-epo-slate-700">
                            <span className="font-semibold text-epo-slate-900">
                                {l.remisesFaites} / {l.remisesTotal}
                            </span>{' '}
                            remises effectuées aujourd'hui · {l.disponibles} agent{l.disponibles > 1 ? 's' : ''} disponible{l.disponibles > 1 ? 's' : ''}
                        </p>
                        {tournees.length === 0 ? (
                            <p className="text-sm text-epo-slate-600">Aucune tournée en cours.</p>
                        ) : (
                            <ul className="space-y-4">
                                {tournees.map((t) => {
                                    const faites = t.remises.filter((r) => r.statut === 'remis').length;
                                    const retard = t.remises.filter((r) => r.statut === 'en-retard').length;
                                    return (
                                        <li key={t.id}>
                                            <div className="flex items-center justify-between mb-1.5 text-sm">
                                                <span className="font-medium text-epo-slate-900">{t.nom}</span>
                                                <span className="tabular-nums text-epo-slate-700">
                                                    {faites} / {t.remises.length}
                                                </span>
                                            </div>
                                            <div className="h-1.5 overflow-hidden rounded-full bg-epo-slate-100" aria-hidden="true">
                                                <div className="h-full bg-epo-green-600" style={{ width: `${t.remises.length ? (faites / t.remises.length) * 100 : 0}%` }} />
                                            </div>
                                            {retard > 0 && (
                                                <div className="mt-1">
                                                    <InlineTag icon="fa-clock" tone="danger">
                                                        {retard} remise{retard > 1 ? 's' : ''} en retard
                                                    </InlineTag>
                                                </div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </section>
            </div>

            <ArriveeFormModal
                open={modalEnregistrement}
                onClose={() => setModalEnregistrement(false)}
                onEnregistre={(arrivee) => {
                    ajouterArrivee(arrivee);
                    navigate('/scc/arrivees');
                }}
                prochainNumero={prochainNumeroArrivee}
            />
        </div>
    );
}
