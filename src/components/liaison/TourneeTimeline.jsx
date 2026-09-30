// src/components/liaison/TourneeTimeline.jsx
import { ETATS_REMISE, formatHeure } from '../../data/dashboardLiaison.js';

export default function TourneeTimeline({ etapes, onRemettre, onVoir }) {
    return (
        <div className="mb-6 overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
            <div className="flex items-center justify-between px-5 py-4 border-b border-epo-slate-100">
                <h3 className="text-[15px] font-bold text-epo-slate-800 flex items-center gap-2">
                    <i className="fas fa-route text-epo-green-600" />
                    Ma tournée
                </h3>
                <span className="text-[12px] text-epo-slate-500">
                    {etapes.length} remises
                </span>
            </div>

            <div className="p-4 sm:p-5">
                {etapes.map((etape, i) => {
                    const etat = ETATS_REMISE[etape.etat];
                    const isLast = i === etapes.length - 1;
                    const isCurrent = etape.etat === 'en-cours';
                    const isDone = etape.etat === 'faite';
                    const isRetard = etape.etat === 'retard';

                    return (
                        <div key={etape.id} className="relative">
                            {!isLast && (
                                <div className={`
                                    absolute left-[18px] top-12 bottom-0 w-px
                                    ${isDone ? 'bg-epo-green-300' : 'bg-epo-slate-200'}
                                `} />
                            )}

                            <div className="relative flex gap-3 py-2">
                                {/* Pastille numéro */}
                                <div className={`
                                    flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-full text-[12px] font-bold z-10
                                    ${isDone ? 'bg-epo-green-500 text-white' :
                                      isCurrent ? 'bg-epo-slate-800 text-white' :
                                      isRetard ? 'bg-epo-red-500 text-white' :
                                      'bg-white border-2 border-epo-slate-300 text-epo-slate-400'}
                                `}>
                                    {isDone ? <i className="fas fa-check" /> : etape.ordre}
                                </div>

                                {/* Contenu */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <span className={`
                                            text-[13.5px] font-semibold
                                            ${isDone ? 'text-epo-slate-400 line-through' : 'text-epo-slate-800'}
                                        `}>
                                            {etape.destinataire.structure} · {etape.documentNumero}
                                        </span>
                                        {etape.priorite === 'urgent' && !isDone && (
                                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-epo-red-50 text-epo-red-700 text-[9.5px] font-bold">
                                                <i className="fas fa-exclamation-circle text-[8px]" />
                                                URGENT
                                            </span>
                                        )}
                                        {etape.priorite === 'confidentiel' && !isDone && (
                                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-epo-slate-800 text-white text-[9.5px] font-bold">
                                                <i className="fas fa-lock text-[8px]" />
                                                CONFID.
                                            </span>
                                        )}
                                    </div>

                                    <div className="text-[12px] text-epo-slate-500 line-clamp-2 mb-1.5">
                                        {etape.documentObjet}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-epo-slate-500">
                                        <span>
                                            <i className="fas fa-user text-[9.5px] text-epo-slate-400 mr-1" />
                                            {etape.destinataire.personne}
                                        </span>
                                        <span>
                                            <i className="fas fa-clock text-[9.5px] text-epo-slate-400 mr-1" />
                                            {isDone && etape.heureRemise
                                                ? `Remis à ${formatHeure(etape.heureRemise)}`
                                                : `Prévu ${formatHeure(etape.heurePrevue)}`}
                                        </span>
                                    </div>

                                    {/* Bouton tactiles */}
                                    {!isDone && (
                                        <div className="mt-2.5">
                                            {isCurrent ? (
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button
                                                        onClick={() => onRemettre(etape)}
                                                        className="
                                                            flex items-center justify-center gap-2
                                                            py-2.5 px-3 rounded-lg
                                                            bg-epo-green-500 text-white text-[13px] font-bold
                                                            hover:bg-epo-green-600 active:scale-[0.98] transition
                                                        "
                                                    >
                                                        <i className="fas fa-check text-[12px]" />
                                                        Remettre
                                                    </button>
                                                    <button
                                                        onClick={() => onVoir(etape)}
                                                        className="
                                                            flex items-center justify-center gap-2
                                                            py-2.5 px-3 rounded-lg
                                                            bg-epo-slate-100 text-epo-slate-700 text-[13px] font-semibold
                                                            hover:bg-epo-slate-200 transition
                                                        "
                                                    >
                                                        <i className="fas fa-eye text-[11px]" />
                                                        Détail
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => onVoir(etape)}
                                                    className="
                                                        inline-flex items-center gap-1.5
                                                        text-[12px] font-medium text-epo-slate-500
                                                        hover:text-epo-slate-700 transition
                                                    "
                                                >
                                                    <i className="fas fa-eye text-[10px]" />
                                                    Voir le détail
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}