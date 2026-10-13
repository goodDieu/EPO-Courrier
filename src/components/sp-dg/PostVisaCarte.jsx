// src/components/sp-dg/PostVisaCarte.jsx
import {
    TYPES_DOSSIERS,
    formatDateHeure,
    formatDuree,
} from '../../data/postVisaSPDG.js';

export default function PostVisaCarte({ dossier, onCocher, onVoir }) {
    const d = dossier;
    const type = TYPES_DOSSIERS[d.type];
    const isUrgent = d.priorite === 'urgent';
    const isConfidentiel = d.priorite === 'confidentiel';
    const isLate = d.tempsRestantMin < 0 && d.etat === 'a-cocher';
    const isTraite = ['signe', 'sg-delegation', 'rejete'].includes(d.etat);

    const borderColor = isLate ? 'border-l-epo-red-500'
        : isUrgent ? 'border-l-epo-yellow-500'
        : isConfidentiel ? 'border-l-epo-slate-800'
        : isTraite ? 'border-l-epo-green-500'
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
                {isUrgent && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-epo-red-50 text-epo-red-700 text-[9.5px] font-bold">
                        <i className="fas fa-exclamation-circle text-[8px]" />
                        URGENT
                    </span>
                )}
                {isConfidentiel && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-epo-slate-800 text-white text-[9.5px] font-bold">
                        <i className="fas fa-lock text-[8px]" />
                        CONFID.
                    </span>
                )}
                {isLate && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-epo-red-100 text-epo-red-800 text-[9.5px] font-bold">
                        <i className="fas fa-clock text-[8px]" />
                        BLACK-OUT +{formatDuree(d.tempsRestantMin)}
                    </span>
                )}
            </div>

            {/* Objet */}
            <div className="text-[13.5px] font-semibold text-epo-slate-900 leading-snug mb-2">
                {d.objet}
            </div>

            {/* Infos */}
            <div className="grid grid-cols-1 gap-1.5 mb-3 text-[11.5px] text-epo-slate-500">
                <div className="flex items-center gap-1.5">
                    <i className="fas fa-check text-epo-green-600 text-[10px]" />
                    <span>Vu bon à signer par <strong className="text-epo-slate-700">{d.vuBonASigner.par}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                    <i className="fas fa-clock text-[10px] text-epo-slate-400" />
                    <span>Arrivé au DG le {formatDateHeure(d.arriveDG.date)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <i className="fas fa-paperclip text-[10px] text-epo-slate-400" />
                    <span>{d.pieces} pièce{d.pieces > 1 ? 's' : ''} jointe{d.pieces > 1 ? 's' : ''}</span>
                </div>
            </div>

            {/* Décision (si traité) */}
            {d.decisionDG && (
                <div className={`
                    flex items-start gap-2 p-2.5 mb-3 rounded-lg
                    ${d.decisionDG.type === 'rejete'
                        ? 'bg-epo-red-50 border border-epo-red-200'
                        : 'bg-epo-green-50 border border-epo-green-200'}
                `}>
                    <i className={`
                        fas ${d.decisionDG.type === 'rejete' ? 'fa-times-circle text-epo-red-600' : 'fa-check-circle text-epo-green-600'}
                        text-[12px] mt-0.5
                    `} />
                    <div className="flex-1 min-w-0">
                        <div className={`text-[11.5px] font-semibold ${d.decisionDG.type === 'rejete' ? 'text-epo-red-800' : 'text-epo-green-800'}`}>
                            {d.decisionDG.type === 'rejete' ? 'Rejeté' : d.decisionDG.type === 'sg-delegation' ? 'Signé par délégation' : 'Signé'}
                        </div>
                        <div className={`text-[10.5px] ${d.decisionDG.type === 'rejete' ? 'text-epo-red-700' : 'text-epo-green-700'} mt-0.5`}>
                            {d.decisionDG.par} · {formatDateHeure(d.decisionDG.date)}
                        </div>
                        {d.decisionDG.coche && (
                            <div className="text-[10px] text-epo-slate-600 mt-1">
                                <i className="fas fa-check-square text-[9px] mr-1" />
                                Coche effectuée le {formatDateHeure(d.decisionDG.coche.date)}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-epo-slate-100">
                {d.etat === 'a-cocher' ? (
                    <>
                        <button
                            onClick={() => onCocher(d)}
                            className="
                                flex-1 flex items-center justify-center gap-2
                                py-2.5 px-4 rounded-lg
                                bg-epo-green-500 text-white text-[13px] font-bold
                                hover:bg-epo-green-600 active:scale-[0.98] transition
                            "
                        >
                            <i className="fas fa-check-square text-[11px]" />
                            Cocher le résultat
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
                            Détail
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => onVoir(d)}
                        className="
                            flex-1 flex items-center justify-center gap-2
                            py-2.5 px-4 rounded-lg
                            bg-epo-slate-100 text-epo-slate-700 text-[13px] font-semibold
                            hover:bg-epo-slate-200 transition
                        "
                    >
                        <i className="fas fa-eye text-[11px]" />
                        Voir le détail
                    </button>
                )}
            </div>
        </div>
    );
}