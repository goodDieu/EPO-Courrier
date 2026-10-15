// src/components/sp-dg/DossierIntroduireCarte.jsx
import {
    TYPES_DOSSIERS,
    formatHeure,
    formatDuree,
} from '../../data/introductionSPDG.js';

export default function DossierIntroduireCarte({ dossier, onIntroduire, onVoir }) {
    const d = dossier;
    const type = TYPES_DOSSIERS[d.type];
    const isUrgent = d.priorite === 'urgent';
    const isConfidentiel = d.priorite === 'confidentiel';
    const isLate = d.tempsAttente >= 240;

    const borderColor = isLate ? ''
        : isUrgent ? ''
        : isConfidentiel ? ''
        : '';

    return (
        <div className={`
            bg-white border border-epo-slate-200
            ${borderColor} rounded-xl p-4 shadow-soft
            ${isLate ? 'bg-epo-slate-50' : ''}
        `}>
            {/* En-tête */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-epo-slate-700 bg-epo-slate-100 px-2 py-0.5 rounded">
                    {d.id}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${type.color}`}>
                    <i className={`fas ${type.icon} text-[9px]`} />
                    {type.label}
                </span>
                {isUrgent && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-epo-slate-50 text-epo-slate-900 text-xs font-bold">
                        <i className="fas fa-exclamation-circle text-[8px]" />
                        URGENT
                    </span>
                )}
                {isConfidentiel && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-epo-slate-800 text-white text-xs font-bold">
                        <i className="fas fa-lock text-[8px]" />
                        CONFID.
                    </span>
                )}
                {isLate && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-epo-slate-50 text-epo-slate-900 text-xs font-bold">
                        <i className="fas fa-clock text-[8px]" />
                        RETARD +{formatDuree(d.tempsAttente - 240)}
                    </span>
                )}
            </div>

            {/* Objet */}
            <div className="text-sm font-semibold text-epo-slate-900 leading-snug mb-2">
                {d.objet}
            </div>

            {/* Infos */}
            <div className="flex flex-col gap-1 mb-3 text-xs text-epo-slate-500">
                <div className="flex items-center gap-1.5">
                    <i className="fas fa-user text-[10px] text-epo-slate-400" />
                    <span>{d.expediteurNom}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <i className="fas fa-check text-epo-green-600 text-[10px]" />
                    <span>Vu bon à signer par <strong className="text-epo-slate-700">{d.vuBonASigner.par}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                    <i className="fas fa-clock text-[10px] text-epo-slate-400" />
                    <span>Reçu au SP-DG à {formatHeure(d.recuAuSPDG)} · en attente depuis {formatDuree(d.tempsAttente)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <i className="fas fa-paperclip text-[10px] text-epo-slate-400" />
                    <span>{d.pieces} pièce{d.pieces > 1 ? 's' : ''} jointe{d.pieces > 1 ? 's' : ''}</span>
                </div>
            </div>

            {/* Points d'attention */}
            {d.pointsAttention.length > 0 && (
                <div className="p-3 mb-3 border rounded-lg bg-epo-yellow-50 border-epo-yellow-200">
                    <div className="text-xs font-semibold uppercase tracking-wider text-epo-yellow-700 mb-1">
                        Points d'attention
                    </div>
                    <ul className="flex flex-col gap-1">
                        {d.pointsAttention.map((p, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs text-epo-yellow-900">
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
                        bg-epo-green-700 text-white text-sm font-bold
                        hover:bg-epo-green-800 active:scale-[0.98] transition
                    "
                >
                    <i className="fas fa-pen text-[11px]" />
                    Marquer comme introduit
                </button>
                <button
                    onClick={() => onVoir(d)}
                    className="
                        flex items-center justify-center gap-2
                        py-2.5 px-4 rounded-lg
                        bg-epo-slate-100 text-epo-slate-700 text-sm font-semibold
                        hover:bg-epo-slate-200 transition
                    "
                >
                    <i className="fas fa-eye text-[11px]" />
                </button>
            </div>
        </div>
    );
}