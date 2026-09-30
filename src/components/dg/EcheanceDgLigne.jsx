// src/components/dg/EcheanceDgLigne.jsx
import { TYPES_ACTIONS, formatDelai } from '../../data/echeancesDG.js';

export default function EcheanceDgLigne({ echeance, onTraiter }) {
    const action = TYPES_ACTIONS[echeance.typeAction];
    const isDepasse = echeance.tempsRestantMin < 0;
    const isJourJ = !isDepasse && echeance.tempsRestantMin < 12 * 60;
    const isUrgent = !isDepasse && echeance.tempsRestantMin < 24 * 60;

    // Couleur de la bordure latérale
    const borderColor = isDepasse ? 'border-l-epo-red-500'
        : isJourJ ? 'border-l-epo-red-400'
        : isUrgent ? 'border-l-epo-yellow-500'
        : 'border-l-epo-slate-300';

    // Couleur du badge de délai
    const delaiChip = isDepasse ? 'bg-epo-red-100 text-epo-red-800'
        : isJourJ ? 'bg-epo-red-50 text-epo-red-700'
        : isUrgent ? 'bg-epo-yellow-50 text-epo-yellow-700'
        : 'bg-epo-slate-100 text-epo-slate-600';

    return (
        <div className={`
            flex items-center gap-3 bg-white border border-epo-slate-200 border-l-4
            ${borderColor} rounded-xl p-3.5 shadow-soft hover:shadow-card transition
        `}>
            {/* Icône type d'action */}
            <div className={`
                flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg
                ${action.chip}
            `}>
                <i className={`fas ${action.icon} text-[14px]`} />
            </div>

            {/* Contenu */}
            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-[11.5px] font-bold text-epo-slate-700 bg-epo-slate-100 px-2 py-0.5 rounded-full">
                        {echeance.reference}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${action.chip}`}>
                        <i className={`fas ${action.icon} text-[9px]`} />
                        {action.shortLabel}
                    </span>
                    {isDepasse && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-epo-red-100 text-epo-red-800 text-[10px] font-bold">
                            <i className="fas fa-exclamation-circle text-[9px]" />
                            DÉPASSÉ
                        </span>
                    )}
                </div>

                <div className="text-[13px] font-semibold text-epo-slate-900 truncate">
                    {echeance.objet}
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11.5px] text-epo-slate-500">
                    <span className="inline-flex items-center gap-1">
                        <i className="fas fa-user text-[9.5px] text-epo-slate-400" />
                        {echeance.expediteur}
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <i className="fas fa-inbox text-[9.5px] text-epo-slate-400" />
                        {echeance.source}
                    </span>
                </div>
            </div>

            {/* Bloc délai + action */}
            <div className="flex-shrink-0 flex flex-col items-end gap-1.5 min-w-[130px]">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold tabular-nums ${delaiChip}`}>
                    <i className="fas fa-clock text-[9.5px]" />
                    {formatDelai(echeance.tempsRestantMin)}
                </span>

                <button
                    onClick={() => onTraiter(echeance)}
                    className="text-[12px] font-semibold text-epo-green-600 hover:underline whitespace-nowrap"
                >
                    {action.key === 'signer' && 'Signer'}
                    {action.key === 'valider' && 'Valider'}
                    {action.key === 'instruire' && 'Instruire'}
                    {action.key === 'confidentiel' && 'Traiter'}
                    <i className="fas fa-arrow-right text-[10px] ml-1" />
                </button>
            </div>
        </div>
    );
}