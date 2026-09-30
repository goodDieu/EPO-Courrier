// src/components/liaison/BlocageCarte.jsx
import {
    MOTIFS_BLOCAGE,
    formatDuree,
    getAncienneteBlocage,
} from '../../data/enAttenteLiaison.js';

export default function BlocageCarte({ doc, onResoudre }) {
    const motif = MOTIFS_BLOCAGE[doc.motifBlocage];
    const anciennete = getAncienneteBlocage(doc.tempsBlocage);
    const isConfidentiel = doc.priorite === 'confidentiel';
    const isUrgent = doc.priorite === 'urgent';

    const borderColor = isUrgent ? 'border-l-epo-red-500'
        : isConfidentiel ? 'border-l-epo-slate-800'
        : 'border-l-epo-yellow-500';

    return (
        <div className={`
            bg-white border border-epo-slate-200 border-l-4
            ${borderColor} rounded-xl p-4 shadow-soft
        `}>
            {/* En-tête */}
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className="font-mono text-[11.5px] font-bold text-epo-slate-700 bg-epo-slate-100 px-2 py-0.5 rounded-full">
                    {doc.documentNumero}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${motif.chip}`}>
                    <i className={`fas ${motif.icon} text-[9.5px]`} />
                    {motif.shortLabel}
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
            </div>

            {/* Objet */}
            <div className="text-[13.5px] font-semibold text-epo-slate-900 leading-snug mb-2">
                {doc.documentObjet}
            </div>

            {/* Destinataire */}
            <div className="text-[11.5px] text-epo-slate-500 mb-3">
                <i className="fas fa-user text-[10px] mr-1" />
                {doc.destinataire.personne} · {doc.destinataire.structure}
            </div>

            {/* Motif de blocage */}
            <div className="p-3 mb-3 border rounded-lg bg-epo-yellow-50 border-epo-yellow-200">
                <div className="flex items-start gap-2">
                    <i className="fas fa-info-circle text-epo-yellow-600 text-[11px] mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-epo-yellow-700 mb-0.5">
                            {motif.label}
                        </div>
                        <div className="text-[12px] text-epo-yellow-900 leading-snug">
                            {doc.motifDetails}
                        </div>
                    </div>
                </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px]">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold ${anciennete.chip}`}>
                    <i className="fas fa-hourglass-half text-[9.5px]" />
                    Bloqué depuis {formatDuree(doc.tempsBlocage)}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-epo-slate-100 text-epo-slate-600 font-medium">
                    <i className="fas fa-user-circle text-[9.5px]" />
                    {doc.signalePar}
                </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end pt-2 border-t border-epo-slate-100">
                <button
                    onClick={() => onResoudre(doc)}
                    className="
                        flex items-center gap-1.5 px-4 py-2 rounded-lg
                        bg-epo-green-500 text-white text-[12.5px] font-bold
                        hover:bg-epo-green-600 active:scale-[0.98] transition
                    "
                >
                    <i className="fas fa-tools text-[10.5px]" />
                    Résoudre
                </button>
            </div>
        </div>
    );
}