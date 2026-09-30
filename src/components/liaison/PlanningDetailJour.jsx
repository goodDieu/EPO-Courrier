// src/components/liaison/PlanningDetailJour.jsx
import {
    ETATS_TOURNEE,
    formatHeure,
    formatDate,
} from '../../data/planningLiaison.js';

export default function PlanningDetailJour({ date, tournees, onVoir }) {
    if (!date) {
        return (
            <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-slate-100">
                    <i className="text-2xl fas fa-calendar-day text-epo-slate-400" />
                </div>
                <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                    Aucun jour sélectionné
                </div>
                <div className="text-[13px] text-epo-slate-500">
                    Cliquez sur un jour du calendrier pour voir son détail.
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
            {/* En-tête */}
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-epo-slate-100 bg-epo-slate-50">
                <div>
                    <div className="text-[15px] font-bold text-epo-slate-900 capitalize">
                        {formatDate(date)}
                    </div>
                    <div className="text-[12px] text-epo-slate-500 mt-0.5">
                        {tournees.length} tournée{tournees.length > 1 ? 's' : ''}
                    </div>
                </div>
            </div>

            {/* Contenu */}
            {tournees.length === 0 ? (
                <div className="p-10 text-center">
                    <div className="flex items-center justify-center mx-auto mb-3 rounded-full w-14 h-14 bg-epo-slate-100">
                        <i className="text-xl fas fa-coffee text-epo-slate-400" />
                    </div>
                    <div className="text-[14px] font-semibold text-epo-slate-800 mb-1">
                        Aucune tournée ce jour
                    </div>
                    <div className="text-[12.5px] text-epo-slate-500">
                        Journée libre.
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-3 p-5">
                    {tournees.map((t) => {
                        const etat = ETATS_TOURNEE[t.etat];
                        const progression = t.nbEtapes > 0 ? (t.nbFaites / t.nbEtapes) * 100 : 0;

                        return (
                            <button
                                key={t.id}
                                onClick={() => onVoir?.(t)}
                                className={`
                                    block w-full text-left bg-white border border-epo-slate-200 border-l-4 rounded-xl p-4
                                    shadow-soft hover:shadow-card hover:-translate-y-0.5 transition cursor-pointer
                                    ${etat.bar.replace('bg-', 'border-l-')}
                                `}
                            >
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${etat.chip}`}>
                                                <i className={`fas ${etat.icon} text-[9px] ${t.etat === 'en-cours' ? 'fa-spin' : ''}`} />
                                                {etat.label}
                                            </span>
                                            <span className="font-mono text-[10.5px] text-epo-slate-500">
                                                {t.id}
                                            </span>
                                        </div>
                                        <div className="text-[14px] font-bold text-epo-slate-900">
                                            {t.libelle}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11.5px] text-epo-slate-500">
                                            <span>
                                                <i className="fas fa-clock text-[10px] mr-1" />
                                                {formatHeure(t.heureDebut)} → {formatHeure(t.heureFinPrevue)}
                                            </span>
                                            <span>
                                                <i className="fas fa-map-marker-alt text-[10px] mr-1" />
                                                Zone {t.zone}
                                            </span>
                                            <span>
                                                <i className="fas fa-route text-[10px] mr-1" />
                                                {t.distanceEstimee}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Progression */}
                                <div className="flex items-center gap-3 mt-3">
                                    <div className="flex-1 h-1.5 bg-epo-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all ${etat.bar}`}
                                            style={{ width: `${progression}%` }}
                                        />
                                    </div>
                                    <span className="text-[11.5px] font-bold tabular-nums text-epo-slate-700 flex-shrink-0">
                                        {t.nbFaites}/{t.nbEtapes}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}