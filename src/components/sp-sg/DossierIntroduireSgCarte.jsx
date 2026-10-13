// src/components/sp-sg/DossierIntroduireSgCarte.jsx
import {
    CLASSIFICATION_EISENHOWER,
    TYPES_DOSSIERS,
    formatHeure,
    formatDuree,
} from '../../data/introductionSPSG.js';

export default function DossierIntroduireSgCarte({ dossier, onIntroduire, onVoir }) {
    const d = dossier;
    const type = TYPES_DOSSIERS[d.type];
    const classification = CLASSIFICATION_EISENHOWER[d.classification];
    const isUrgent = d.priorite === 'urgent';
    const isLate = d.tempsAttente > 60;

    const borderColor = isLate ? 'border-l-epo-red-500'
        : isUrgent ? 'border-l-epo-yellow-500'
        : 'border-l-epo-slate-300';

    return (
        <div className={`
            bg-white border border-epo-slate-200 border-l-4
            ${borderColor} rounded-xl p-4 shadow-soft
            ${isLate ? 'bg-epo-red-50/30' : ''}
        `}>
            {/* En-tête */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-[11.5px] font-bold text-epo-slate-700 bg-epo-slate-100 px-2 py-0.5 rounded-full">
                    {d.id}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${type.color}`}>
                    <i className={`fas ${type.icon} text-[9px]`} />
                    {type.label}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${classification.chip}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${classification.dot}`} />
                    {classification.shortLabel}
                </span>
                {isUrgent && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-epo-red-50 text-epo-red-700 text-[9.5px] font-bold">
                        <i className="fas fa-exclamation-circle text-[8px]" />
                        URGENT
                    </span>
                )}
                {isLate && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-epo-red-100 text-epo-red-800 text-[9.5px] font-bold">
                        <i className="fas fa-clock text-[8px]" />
                        RETARD +{formatDuree(d.tempsAttente - 60)}
                    </span>
                )}
            </div>

            {/* Objet */}
            <div className="text-[13.5px] font-semibold text-epo-slate-900 leading-snug mb-2">
                {d.objet}
            </div>

            {/* Expéditeur + structure */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-[11.5px] text-epo-slate-500">
                <span className="inline-flex items-center gap-1.5">
                    <i className="fas fa-user text-[10px] text-epo-slate-400" />
                    {d.expediteurNom}
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <i className="fas fa-building text-[10px] text-epo-slate-400" />
                    {d.expediteurStructure}
                </span>
            </div>

            {/* Métadonnées */}
            <div className="grid grid-cols-2 gap-2 mb-3 text-[11.5px] text-epo-slate-500">
                <div className="flex items-center gap-1.5">
                    <i className="fas fa-clock text-[10px] text-epo-slate-400" />
                    <span>Reçu {formatHeure(d.recuAuSPSG)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <i className="fas fa-paperclip text-[10px] text-epo-slate-400" />
                    <span>
                        {d.pieces} pièce{d.pieces > 1 ? 's' : ''}
                        {d.scanne && <span className="font-medium text-epo-green-600"> · scanné</span>}
                    </span>
                </div>
            </div>

            {/* Classification Eisenhower */}
            <div className="p-2.5 mb-3 rounded-lg bg-epo-slate-50 border border-epo-slate-200">
                <div className="text-[10.5px] font-semibold uppercase tracking-wider text-epo-slate-500 mb-1">
                    Classement Eisenhower
                </div>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${classification.chip}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${classification.dot}`} />
                    {classification.label}
                </div>
            </div>

            {/* Points d'attention */}
            {d.pointsAttention.length > 0 && (
                <div className="p-2.5 mb-3 rounded-lg bg-epo-yellow-50 border border-epo-yellow-200">
                    <div className="text-[10.5px] font-semibold uppercase tracking-wider text-epo-yellow-700 mb-1">
                        Points d'attention
                    </div>
                    <ul className="flex flex-col gap-1">
                        {d.pointsAttention.map((p, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-[11.5px] text-epo-yellow-900">
                                <i className="fas fa-circle text-[5px] mt-1.5 flex-shrink-0" />
                                <span>{p}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-epo-slate-100">
                <button
                    onClick={() => onIntroduire(d)}
                    className="
                        flex-1 flex items-center justify-center gap-2
                        py-2.5 px-4 rounded-lg
                        bg-epo-green-500 text-white text-[13px] font-bold
                        hover:bg-epo-green-600 active:scale-[0.98] transition
                    "
                >
                    <i className="fas fa-user-tie text-[11px]" />
                    Marquer comme introduit
                </button>
                <button
                    onClick={() => onVoir(d)}
                    className="
                        flex items-center justify-center gap-2
                        py-2.5 px-4 rounded-lg
                        bg-epo-slate-100 text-epo-slate-700 text-[13px] font-semibold
                        hover:bg-epo-slate-200 transition
                    "
                >
                    <i className="fas fa-eye text-[11px]" />
                </button>
            </div>
        </div>
    );
}