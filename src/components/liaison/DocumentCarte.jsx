// src/components/liaison/DocumentCarte.jsx
import { formatDuree } from '../../data/dashboardLiaison.js';

export default function DocumentCarte({ doc, onRemettre }) {
    const isUrgent = doc.priorite === 'urgent';
    const isRetard = doc.etat === 'retard';
    const isConfidentiel = doc.priorite === 'confidentiel';

    const borderColor = isRetard ? 'border-l-epo-red-500'
        : isUrgent ? 'border-l-epo-yellow-500'
        : isConfidentiel ? 'border-l-epo-slate-700'
        : 'border-l-epo-slate-300';

    return (
        <div className={`
            flex items-start gap-3 bg-white border border-epo-slate-200 border-l-4
            ${borderColor} rounded-xl p-4 shadow-soft
        `}>
            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-mono text-[11.5px] font-bold text-epo-slate-700 bg-epo-slate-100 px-2 py-0.5 rounded-full">
                        {doc.documentNumero}
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
                    {isRetard && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-epo-red-100 text-epo-red-800 text-[9.5px] font-bold">
                            <i className="fas fa-clock text-[8px]" />
                            RETARD
                        </span>
                    )}
                </div>

                <div className="text-[13px] font-semibold text-epo-slate-900 line-clamp-2 mb-1.5">
                    {doc.documentObjet}
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-epo-slate-500 mb-2">
                    <span>
                        <i className="fas fa-building text-[10px] text-epo-slate-400 mr-1" />
                        {doc.destinataire.structure}
                    </span>
                    <span>
                        <i className="fas fa-user text-[10px] text-epo-slate-400 mr-1" />
                        {doc.destinataire.personne}
                    </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-epo-slate-100">
                    <span className={`text-[11px] font-medium tabular-nums ${isRetard ? 'text-epo-red-600' : 'text-epo-slate-500'}`}>
                        <i className="fas fa-hourglass-half text-[10px] mr-1" />
                        En attente depuis {formatDuree(doc.tempsAttente)}
                    </span>
                    <button
                        onClick={() => onRemettre(doc)}
                        className="
                            flex items-center gap-1.5
                            px-3 py-1.5 rounded-lg
                            bg-epo-green-500 text-white text-[12px] font-bold
                            hover:bg-epo-green-600 active:scale-[0.98] transition
                        "
                    >
                        <i className="fas fa-check text-[10px]" />
                        Remettre
                    </button>
                </div>
            </div>
        </div>
    );
}