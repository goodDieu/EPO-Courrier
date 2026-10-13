// src/components/sp-sg/CourrierRecuSgCarte.jsx
import {
    ETATS_COURRIER,
    TYPES_DOSSIERS,
    formatHeure,
    formatDuree,
} from '../../data/courriersRecusSPSG.js';

export default function CourrierRecuSgCarte({ courrier, onConfirmer, onVoir, onTraiter }) {
    const c = courrier;
    const etat = ETATS_COURRIER[c.etat];
    const type = TYPES_DOSSIERS[c.type];
    const isUrgent = c.priorite === 'urgent';
    const isLate = c.tempsAttente > 30 && c.etat === 'nouveau';
    const dechargeAttente = !c.dechargeConfirmee;

    const borderColor = isLate ? 'border-l-epo-red-500'
        : isUrgent ? 'border-l-epo-yellow-500'
        : dechargeAttente ? 'border-l-epo-yellow-400'
        : 'border-l-epo-slate-300';

    return (
        <div className={`
            bg-white border border-epo-slate-200 border-l-4
            ${borderColor} rounded-xl p-4 shadow-soft hover:shadow-card transition
            ${isLate ? 'bg-epo-red-50/30' : ''}
        `}>
            {/* En-tête */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-[11.5px] font-bold text-epo-slate-700 bg-epo-slate-100 px-2 py-0.5 rounded-full">
                    {c.id}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${type.color}`}>
                    <i className={`fas ${type.icon} text-[9px]`} />
                    {type.label}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${etat.chip}`}>
                    <i className={`fas ${etat.icon} text-[9px] ${c.etat === 'en-traitement' ? 'fa-spin' : ''}`} />
                    {etat.label}
                </span>
                {isUrgent && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-epo-red-50 text-epo-red-700 text-[9.5px] font-bold">
                        <i className="fas fa-exclamation-circle text-[8px]" />
                        URGENT
                    </span>
                )}
            </div>

            {/* Objet */}
            <div className="text-[13.5px] font-semibold text-epo-slate-900 leading-snug mb-2">
                {c.objet}
            </div>

            {/* Expéditeur */}
            <div className="flex items-center gap-1.5 mb-2 text-[11.5px] text-epo-slate-500">
                <i className="fas fa-user text-[10px] text-epo-slate-400" />
                <span>{c.expediteurNom}</span>
            </div>

            {/* Infos réception */}
            <div className="grid grid-cols-1 gap-1 mb-3 text-[11.5px] text-epo-slate-500">
                <div className="flex items-center gap-1.5">
                    <i className="fas fa-truck text-[10px] text-epo-slate-400" />
                    <span>Remis par {c.agentLiaison}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <i className="fas fa-clock text-[10px] text-epo-slate-400" />
                    <span>
                        Reçu au SP-SG à {formatHeure(c.recuAuSPSG)}
                        <span className={isLate ? 'text-epo-red-600 font-semibold' : ''}>
                            {' '}· {formatDuree(c.tempsAttente)}
                        </span>
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <i className="fas fa-paperclip text-[10px] text-epo-slate-400" />
                    <span>
                        {c.pieces} pièce{c.pieces > 1 ? 's' : ''}
                        {c.piecesVerifiees && <span className="font-medium text-epo-green-600"> · vérifiées</span>}
                    </span>
                </div>
            </div>

            {/* Alerte décharge à confirmer */}
            {dechargeAttente && (
                <div className="flex items-start gap-2 p-2.5 mb-3 rounded-lg bg-epo-yellow-50 border border-epo-yellow-200">
                    <i className="fas fa-signature text-epo-yellow-600 text-[11px] mt-0.5" />
                    <div className="flex-1 min-w-0">
                        <div className="text-[11.5px] font-semibold text-epo-yellow-900">
                            Décharge de réception à confirmer
                        </div>
                        <div className="text-[10.5px] text-epo-yellow-700 mt-0.5">
                            <i className="fas fa-info-circle text-[9px] mr-1" />
                            RG-25- Preuve de réception requise
                        </div>
                    </div>
                </div>
            )}

            {/* Alerte retard */}
            {isLate && (
                <div className="flex items-start gap-2 p-2.5 mb-3 rounded-lg bg-epo-red-50 border border-epo-red-200">
                    <i className="fas fa-clock text-epo-red-600 text-[11px] mt-0.5" />
                    <div className="flex-1 min-w-0">
                        <div className="text-[11.5px] font-semibold text-epo-red-900">
                            Délai SCC → SP-SG dépassé
                        </div>
                        <div className="text-[10.5px] text-epo-red-700 mt-0.5">
                            <i className="fas fa-info-circle text-[9px] mr-1" />
                            Délai de référence : 30 min (§9.1)
                        </div>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-epo-slate-100">
                {dechargeAttente ? (
                    <>
                        <button
                            onClick={() => onConfirmer(c)}
                            className="
                                flex-1 flex items-center justify-center gap-2
                                py-2.5 px-4 rounded-lg
                                bg-epo-green-500 text-white text-[13px] font-bold
                                hover:bg-epo-green-600 active:scale-[0.98] transition
                            "
                        >
                            <i className="fas fa-signature text-[11px]" />
                            Confirmer la réception
                        </button>
                        <button
                            onClick={() => onVoir(c)}
                            className="
                                flex items-center justify-center gap-2
                                py-2.5 px-4 rounded-lg
                                bg-epo-slate-100 text-epo-slate-700 text-[13px] font-semibold
                                hover:bg-epo-slate-200 transition
                            "
                        >
                            <i className="fas fa-eye text-[11px]" />
                        </button>
                    </>
                ) : c.etat === 'en-traitement' ? (
                    <>
                        <button
                            onClick={() => onTraiter(c)}
                            className="
                                flex-1 flex items-center justify-center gap-2
                                py-2.5 px-4 rounded-lg
                                bg-epo-slate-800 text-white text-[13px] font-bold
                                hover:bg-epo-slate-700 active:scale-[0.98] transition
                            "
                        >
                            <i className={`fas ${c.etapeActuelle === 'scan' ? 'fa-camera' : 'fa-th'} text-[11px]`} />
                            Continuer {c.etapeActuelle === 'scan' ? 'la numérisation' : 'le tri'}
                        </button>
                        <button
                            onClick={() => onVoir(c)}
                            className="
                                flex items-center justify-center gap-2
                                py-2.5 px-4 rounded-lg
                                bg-epo-slate-100 text-epo-slate-700 text-[13px] font-semibold
                                hover:bg-epo-slate-200 transition
                            "
                        >
                            <i className="fas fa-eye text-[11px]" />
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => onVoir(c)}
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