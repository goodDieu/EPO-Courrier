// src/components/liaison/TourneeCarte.jsx
import { ETATS_TOURNEE, formatHeure, formatDateCourt } from '../../data/tourneesLiaison.js';

export default function TourneeCarte({ tournee, onVoir, onDemarrer, onCloturer }) {
    const etat = ETATS_TOURNEE[tournee.etat];
    const progression = tournee.nbEtapes > 0 ? (tournee.nbFaites / tournee.nbEtapes) * 100 : 0;
    const isEnCours = tournee.etat === 'en-cours';
    const isPlanifiee = tournee.etat === 'planifiee';
    const isTerminee = tournee.etat === 'terminee';
    const isPartielle = tournee.etat === 'partielle';
    const isTermineeAny = isTerminee || isPartielle;

    return (
        <div className={`
            bg-white border rounded-xl shadow-soft overflow-hidden transition
            ${isEnCours ? 'border-epo-slate-800 border-2 shadow-card' : 'border-epo-slate-200 hover:shadow-card'}
        `}>
            {/* En-tête */}
            <div className={`
                flex items-start justify-between gap-3 p-4 border-b border-epo-slate-100
                ${isEnCours ? 'bg-epo-slate-800 text-white' : 'bg-epo-slate-50/60'}
            `}>
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${etat.chip}`}>
                            <i className={`fas ${etat.icon} text-[9.5px] ${isEnCours ? 'fa-spin' : ''}`} />
                            {etat.label}
                        </span>
                        <span className={`text-[10.5px] font-mono ${isEnCours ? 'text-epo-slate-400' : 'text-epo-slate-500'}`}>
                            {tournee.id}
                        </span>
                    </div>

                    <div className={`text-[15px] font-bold ${isEnCours ? 'text-white' : 'text-epo-slate-900'}`}>
                        {tournee.libelle}
                    </div>

                    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[12px] ${isEnCours ? 'text-epo-slate-300' : 'text-epo-slate-500'}`}>
                        <span className="inline-flex items-center gap-1.5">
                            <i className="fas fa-calendar text-[10.5px]" />
                            {formatDateCourt(tournee.date)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <i className="fas fa-clock text-[10.5px]" />
                            {formatHeure(tournee.heureDebut)} → {formatHeure(tournee.heureFinPrevue)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <i className="fas fa-map-marker-alt text-[10.5px]" />
                            Zone {tournee.zone}
                        </span>
                    </div>
                </div>

                {/* Indicateur distance */}
                <div className="flex-shrink-0 text-right">
                    <div className={`text-[11px] uppercase tracking-wider font-semibold ${isEnCours ? 'text-epo-slate-400' : 'text-epo-slate-400'}`}>
                        Distance
                    </div>
                    <div className={`text-[13px] font-bold tabular-nums ${isEnCours ? 'text-white' : 'text-epo-slate-700'}`}>
                        {tournee.distanceEstimee}
                    </div>
                </div>
            </div>

            {/* Progression */}
            <div className="px-4 pt-3.5">
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-epo-slate-400">
                        Progression
                    </span>
                    <span className="text-[13px] font-bold tabular-nums text-epo-slate-700">
                        {tournee.nbFaites} / {tournee.nbEtapes}
                    </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-epo-slate-100">
                    <div
                        className={`
                            h-full transition-all duration-500
                            ${isTerminee ? 'bg-epo-green-500' :
                              isPartielle ? 'bg-epo-yellow-500' :
                              'bg-epo-slate-800'}
                        `}
                        style={{ width: `${progression}%` }}
                    />
                </div>
            </div>

            {/* Motif partiel */}
            {isPartielle && tournee.motifPartiel && (
                <div className="flex items-start gap-2 mx-4 mt-3 p-2.5 rounded-lg bg-epo-yellow-50 border border-epo-yellow-200">
                    <i className="fas fa-exclamation-triangle text-epo-yellow-600 text-[11px] mt-0.5" />
                    <span className="text-[11.5px] text-epo-yellow-900">
                        {tournee.motifPartiel}
                    </span>
                </div>
            )}

            {/* Retards */}
            {tournee.nbRetards > 0 && (
                <div className="flex items-start gap-2 mx-4 mt-3 p-2.5 rounded-lg bg-epo-red-50 border border-epo-red-200">
                    <i className="fas fa-clock text-epo-red-600 text-[11px] mt-0.5" />
                    <span className="text-[11.5px] text-epo-red-800">
                        <strong>{tournee.nbRetards}</strong> remise{tournee.nbRetards > 1 ? 's' : ''} en retard
                    </span>
                </div>
            )}

            {/* Actions contextuelles */}
            <div className="flex flex-wrap gap-2 px-4 py-3 mt-3 border-t border-epo-slate-100">
                {isPlanifiee && (
                    <>
                        <button
                            onClick={() => onDemarrer(tournee)}
                            className="
                                flex-1 flex items-center justify-center gap-2
                                py-2.5 px-4 rounded-lg
                                bg-epo-green-500 text-white text-[13px] font-bold
                                hover:bg-epo-green-600 active:scale-[0.98] transition
                            "
                        >
                            <i className="fas fa-play text-[11px]" />
                            Démarrer
                        </button>
                        <button
                            onClick={() => onVoir(tournee)}
                            className="
                                flex items-center justify-center gap-2
                                py-2.5 px-4 rounded-lg
                                bg-epo-slate-100 text-epo-slate-700 text-[13px] font-semibold
                                hover:bg-epo-slate-200 transition
                            "
                        >
                            <i className="fas fa-eye text-[11px]" />
                            Aperçu
                        </button>
                    </>
                )}

                {isEnCours && (
                    <>
                        <button
                            onClick={() => onVoir(tournee)}
                            className="
                                flex-1 flex items-center justify-center gap-2
                                py-2.5 px-4 rounded-lg
                                bg-epo-slate-800 text-white text-[13px] font-bold
                                hover:bg-epo-slate-700 active:scale-[0.98] transition
                            "
                        >
                            <i className="fas fa-arrow-right text-[11px]" />
                            Continuer la tournée
                        </button>
                        <button
                            onClick={() => onCloturer(tournee)}
                            className="
                                flex items-center justify-center gap-2
                                py-2.5 px-4 rounded-lg
                                bg-epo-slate-100 text-epo-slate-700 text-[13px] font-semibold
                                hover:bg-epo-slate-200 transition
                            "
                            title="Clôturer la tournée"
                        >
                            <i className="fas fa-flag-checkered text-[11px]" />
                            Clôturer
                        </button>
                    </>
                )}

                {isTermineeAny && (
                    <button
                        onClick={() => onVoir(tournee)}
                        className="
                            flex-1 flex items-center justify-center gap-2
                            py-2.5 px-4 rounded-lg
                            bg-epo-slate-100 text-epo-slate-700 text-[13px] font-semibold
                            hover:bg-epo-slate-200 transition
                        "
                    >
                        <i className="fas fa-eye text-[11px]" />
                        Consulter le détail
                    </button>
                )}
            </div>
        </div>
    );
}