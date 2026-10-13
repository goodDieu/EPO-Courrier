// src/components/sp-sg/SuiviModal.jsx
import { Modal, Button } from '../ui';
import {
    ETAPES_CIRCUIT,
    CLASSIFICATION,
    formatDateHeure,
    formatDuree,
} from '../../data/suiviSPSG.js';

export default function SuiviModal({ dossier, onClose }) {
    if (!dossier) return null;

    const d = dossier;
    const etape = ETAPES_CIRCUIT[d.etapeActuelle];
    const classification = CLASSIFICATION[d.classification];

    return (
        <Modal
            open={!!d}
            onClose={onClose}
            title={`Suivi du dossier ${d.id}`}
            titleIcon="fa-stream"
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    <Button variant="outline" icon="fa-print">
                        Imprimer la fiche
                    </Button>
                </>
            }
        >
            {/* En-tête */}
            <div className="pb-5 mb-5 border-b border-epo-slate-100">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-mono text-[12.5px] font-bold text-epo-slate-800 bg-epo-slate-100 px-2.5 py-1 rounded-full">
                        {d.id}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${etape.chip}`}>
                        <i className={`fas ${etape.icon} text-[10px]`} />
                        {etape.label}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${classification.chip}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${classification.dot}`} />
                        {classification.shortLabel}
                    </span>
                    {d.bloquee && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold bg-epo-red-50 text-epo-red-700">
                            <i className="fas fa-exclamation-triangle text-[10px]" />
                            Bloqué
                        </span>
                    )}
                </div>

                <h2 className="text-[16px] font-bold tracking-tight text-epo-slate-900">
                    {d.objet}
                </h2>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-2 text-[12px] text-epo-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                        <i className="fas fa-building text-[10.5px] text-epo-slate-400" />
                        {d.expediteurStructure}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <i className="fas fa-user text-[10.5px] text-epo-slate-400" />
                        {d.expediteurNom}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <i className="fas fa-clock text-[10.5px] text-epo-slate-400" />
                        Entrée {formatDateHeure(d.dateEntree)}
                    </span>
                </div>
            </div>

            {/* Alerte blocage */}
            {d.bloquee && d.motifBlocage && (
                <div className="flex items-start gap-3 p-4 mb-5 border rounded-lg bg-epo-red-50 border-epo-red-200">
                    <i className="fas fa-exclamation-triangle text-epo-red-600 mt-0.5" />
                    <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-semibold uppercase tracking-wider text-epo-red-700 mb-1">
                            Dossier bloqué
                        </div>
                        <div className="text-[13px] text-epo-red-900">
                            {d.motifBlocage}
                        </div>
                    </div>
                </div>
            )}

            {/* Métriques */}
            <div className="grid grid-cols-1 gap-3 mb-5 sm:grid-cols-3">
                <MetricCard
                    label="Circuit total"
                    value={formatDuree(d.tempsCircuit)}
                    icon="fa-route"
                />
                <MetricCard
                    label="Durée étape actuelle"
                    value={d.dureeEtapeActuelle ? formatDuree(d.dureeEtapeActuelle) : '—'}
                    icon="fa-stopwatch"
                    variant={d.dureeEtapeActuelle && d.dureeEtapeActuelle > 240 ? 'urgent' : 'default'}
                />
                <MetricCard
                    label="Étapes franchies"
                    value={`${d.timeline.length} / ${Object.keys(ETAPES_CIRCUIT).length}`}
                    icon="fa-check-circle"
                />
            </div>

            {/* Timeline du circuit */}
            <div>
                <h4 className="text-[12.5px] font-semibold uppercase tracking-wider text-epo-slate-500 mb-3">
                    Timeline du circuit (§9.1)
                </h4>
                <div className="flex flex-col">
                    {d.timeline.map((t, i) => {
                        const et = ETAPES_CIRCUIT[t.etape];
                        const isLast = i === d.timeline.length - 1;
                        return (
                            <div key={i} className="relative">
                                {!isLast && (
                                    <div className="absolute left-[18px] top-12 bottom-0 w-px bg-epo-green-300" />
                                )}
                                <div className="relative flex gap-3 py-2">
                                    <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-full text-[12px] font-bold z-10 bg-epo-green-500 text-white">
                                        <i className="fas fa-check" />
                                    </div>
                                    <div className="flex-1 min-w-0 pt-1">
                                        <div className="text-[13px] font-semibold text-epo-slate-800">
                                            {et.label}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5 text-[11px] text-epo-slate-500">
                                            <span>
                                                <i className="fas fa-clock text-[9.5px] mr-1" />
                                                {formatDateHeure(t.date)}
                                            </span>
                                            <span>
                                                <i className="fas fa-user text-[9.5px] mr-1" />
                                                {t.par}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Étape suivante (à venir) */}
                    {d.prochaineEtape && (
                        <div className="relative flex gap-3 py-2">
                            <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-full text-[12px] font-bold z-10 bg-white border-2 border-dashed border-epo-slate-300 text-epo-slate-400">
                                <i className="fas fa-hourglass-half" />
                            </div>
                            <div className="flex-1 min-w-0 pt-1">
                                <div className="text-[13px] font-semibold text-epo-slate-500">
                                    En attente : {ETAPES_CIRCUIT[d.prochaineEtape].label}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Étape finale atteinte (si clôturé) */}
                    {d.etapeActuelle === 'cloture' && (
                        <div className="relative flex gap-3 py-2">
                            <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-full text-[12px] font-bold z-10 bg-epo-green-600 text-white">
                                <i className="fas fa-flag-checkered" />
                            </div>
                            <div className="flex-1 min-w-0 pt-1">
                                <div className="text-[13px] font-semibold text-epo-green-700">
                                    Circuit terminé
                                </div>
                                <div className="text-[11px] text-epo-slate-500 mt-0.5">
                                    Objet satisfait · dossier clôturé
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}

function MetricCard({ label, value, icon, variant = 'default' }) {
    return (
        <div className={`
            p-4 rounded-xl border
            ${variant === 'urgent' ? 'bg-epo-red-50 border-epo-red-200' : 'bg-white border-epo-slate-200'}
        `}>
            <div className="flex items-center gap-2 mb-1">
                <i className={`fas ${icon} text-[12px] ${variant === 'urgent' ? 'text-epo-red-600' : 'text-epo-slate-400'}`} />
                <span className={`text-[10.5px] font-semibold uppercase tracking-wider ${variant === 'urgent' ? 'text-epo-red-700' : 'text-epo-slate-500'}`}>
                    {label}
                </span>
            </div>
            <div className={`text-[18px] font-bold tabular-nums ${variant === 'urgent' ? 'text-epo-red-700' : 'text-epo-slate-900'}`}>
                {value}
            </div>
        </div>
    );
}