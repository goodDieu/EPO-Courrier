// src/components/sp-dg/CourrierRecuCarte.jsx
import {
    SOURCES,
    ETATS_COURRIER,
    TYPES_DOSSIERS,
    formatHeure,
    formatDuree,
} from '../../data/courriersRecusSPDG.js';

export default function CourrierRecuCarte({ courrier, onVoir, onIntroduire, onNumeroter }) {
    const c = courrier;
    const source = SOURCES[c.source];
    const type = TYPES_DOSSIERS[c.type];
    const etat = ETATS_COURRIER[c.etat];

    const isUrgent = c.priorite === 'urgent';
    const isConfidentiel = c.priorite === 'confidentiel';
    const needsNumerotation = isConfidentiel && !c.numeroConfidentiel;

    const borderColor = isUrgent ? ''
        : isConfidentiel ? ''
        : '';

    return (
        <div className={`
            bg-white border border-epo-slate-200
            ${borderColor} rounded-xl p-4 shadow-soft hover:shadow-card transition
        `}>
            {/* En-tête */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-epo-slate-700 bg-epo-slate-100 px-2 py-0.5 rounded">
                    {c.id}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${type.color}`}>
                    <i className={`fas ${type.icon} text-[9px]`} />
                    {type.label}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${source.color}`}>
                    <i className={`fas ${source.icon} text-[9px]`} />
                    {source.label}
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
                <span className={`ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${etat.chip}`}>
                    <i className={`fas ${etat.icon} text-[9px]`} />
                    {etat.label}
                </span>
            </div>

            {/* Objet */}
            <div className="text-sm font-semibold text-epo-slate-900 leading-snug mb-2">
                {c.objet}
            </div>

            {/* Numéro confidentiel */}
            {isConfidentiel && (
                <div className={`
                    flex items-center gap-2 p-2.5 mb-2 rounded-lg
                    ${needsNumerotation
                        ? 'bg-epo-yellow-50 border border-epo-yellow-200'
                        : 'bg-epo-slate-50 border border-epo-slate-200'}
                `}>
                    <i className={`fas ${needsNumerotation ? 'fa-exclamation-triangle text-epo-yellow-600' : 'fa-hashtag text-epo-slate-600'} text-[11px]`} />
                    <div className="flex-1 min-w-0">
                        {needsNumerotation ? (
                            <div className="text-xs font-semibold text-epo-yellow-800">
                                Numéro confidentiel à attribuer
                            </div>
                        ) : (
                            <div className="text-xs font-semibold text-epo-slate-700">
                                Numéro : <span className="font-mono">{c.numeroConfidentiel}</span>
                            </div>
                        )}
                    </div>
                    {needsNumerotation && (
                        <button
                            onClick={() => onNumeroter(c)}
                            className="
                                px-2.5 py-1 rounded-md
                                bg-epo-yellow-500 text-white text-xs font-bold
                                hover:bg-epo-yellow-600 transition
                            "
                        >
                            Attribuer
                        </button>
                    )}
                </div>
            )}

            {/* Infos */}
            <div className="flex flex-col gap-1 mb-3 text-xs text-epo-slate-500">
                <div className="flex items-center gap-1.5">
                    <i className="fas fa-user text-[10px] text-epo-slate-400" />
                    <span>{c.expediteurNom}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <i className="fas fa-clock text-[10px] text-epo-slate-400" />
                    <span>
                        Reçu à {formatHeure(c.dateReception)}
                        {c.tempsAttente && <> · en attente depuis {formatDuree(c.tempsAttente)}</>}
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <i className="fas fa-paperclip text-[10px] text-epo-slate-400" />
                    <span>{c.pieces} pièce{c.pieces > 1 ? 's' : ''} jointe{c.pieces > 1 ? 's' : ''}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-epo-slate-100">
                {c.etat === 'a-trier' && (
                    <>
                        <button
                            onClick={() => onVoir(c)}
                            className="
                                flex-1 flex items-center justify-center gap-2
                                py-2.5 px-4 rounded-lg
                                bg-epo-green-700 text-white text-sm font-bold
                                hover:bg-epo-green-800 active:scale-[0.98] transition
                            "
                        >
                            <i className="fas fa-check text-[11px]" />
                            Trier
                        </button>
                        <button
                            onClick={() => onVoir(c)}
                            className="
                                flex items-center justify-center gap-2
                                py-2.5 px-4 rounded-lg
                                bg-epo-slate-100 text-epo-slate-700 text-sm font-semibold
                                hover:bg-epo-slate-200 transition
                            "
                        >
                            <i className="fas fa-eye text-[11px]" />
                            Détail
                        </button>
                    </>
                )}

                {c.etat === 'pret-introduire' && (
                    <>
                        <button
                            onClick={() => onIntroduire(c)}
                            className="
                                flex-1 flex items-center justify-center gap-2
                                py-2.5 px-4 rounded-lg
                                bg-epo-green-700 text-white text-sm font-bold
                                hover:bg-epo-green-800 active:scale-[0.98] transition
                            "
                        >
                            <i className="fas fa-pen text-[11px]" />
                            Introduire au DG
                        </button>
                        <button
                            onClick={() => onVoir(c)}
                            className="
                                flex items-center justify-center gap-2
                                py-2.5 px-4 rounded-lg
                                bg-epo-slate-100 text-epo-slate-700 text-sm font-semibold
                                hover:bg-epo-slate-200 transition
                            "
                        >
                            <i className="fas fa-eye text-[11px]" />
                        </button>
                    </>
                )}

                {c.etat === 'introduit' && (
                    <button
                        onClick={() => onVoir(c)}
                        className="
                            flex-1 flex items-center justify-center gap-2
                            py-2.5 px-4 rounded-lg
                            bg-epo-slate-100 text-epo-slate-700 text-sm font-semibold
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