// src/components/liaison/DocumentRemettreCarte.jsx
import {
    TYPES_DOCUMENTS,
    formatDuree,
    getAnciennete,
} from '../../data/aRemettreLiaison.js';

export default function DocumentRemettreCarte({ doc, onRemettre, onVoir }) {
    const type = TYPES_DOCUMENTS[doc.documentType];
    const anciennete = getAnciennete(doc.tempsAttente);
    const isUrgent = doc.priorite === 'urgent';
    const isConfidentiel = doc.priorite === 'confidentiel';

    const borderColor = isUrgent ? 'border-l-epo-red-500'
        : isConfidentiel ? 'border-l-epo-slate-800'
        : 'border-l-epo-slate-300';

    return (
        <div className={`
            bg-white border border-epo-slate-200 border-l-4
            ${borderColor} rounded-xl p-4 shadow-soft
            hover:shadow-card transition
        `}>
            {/* En-tête : n° + badges */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-[11.5px] font-bold text-epo-slate-700 bg-epo-slate-100 px-2 py-0.5 rounded-full">
                    {doc.documentNumero}
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
            </div>

            {/* Objet */}
            <div className="text-[13.5px] font-semibold text-epo-slate-900 leading-snug mb-2">
                {doc.documentObjet}
            </div>

            {/* Destinataire */}
            <div className="flex items-start gap-2.5 p-2.5 mb-2.5 rounded-lg bg-epo-slate-50">
                <div className="flex items-center justify-center flex-shrink-0 text-[10px] font-bold rounded-full w-8 h-8 bg-white text-epo-slate-700 border border-epo-slate-200">
                    {doc.destinataire.personne.replace('M. ', '').replace('Mme ', '').replace('Pr. ', '').split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-semibold text-epo-slate-800 truncate">
                        {doc.destinataire.personne}
                    </div>
                    <div className="text-[11px] text-epo-slate-500">
                        {doc.destinataire.structure} · {doc.destinataire.qualite}
                    </div>
                    <div className="text-[10.5px] text-epo-slate-500 mt-0.5">
                        <i className="fas fa-map-marker-alt text-[9.5px] mr-1" />
                        {doc.destinataire.localisation}
                    </div>
                </div>
            </div>

            {/* Meta : âge + tournée */}
            <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px]">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold ${anciennete.chip}`}>
                    <i className="fas fa-hourglass-half text-[9.5px]" />
                    En attente depuis {formatDuree(doc.tempsAttente)}
                </span>
                {doc.dansTournee && doc.tourneeLibelle ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-epo-green-50 text-epo-green-700 font-semibold">
                        <i className="fas fa-route text-[9.5px]" />
                        {doc.tourneeLibelle}
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-epo-slate-100 text-epo-slate-600 font-medium">
                        <i className="fas fa-inbox text-[9.5px]" />
                        Hors tournée
                    </span>
                )}
                {doc.pieces > 1 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-epo-slate-100 text-epo-slate-600 font-medium">
                        <i className="fas fa-paperclip text-[9.5px]" />
                        {doc.pieces} pièces
                    </span>
                )}
            </div>

            {/* Actions tactiles */}
            <div className="grid grid-cols-3 gap-2">
                <button
                    onClick={() => onRemettre(doc)}
                    className="
                        col-span-2 flex items-center justify-center gap-2
                        py-2.5 px-3 rounded-lg
                        bg-epo-green-500 text-white text-[13px] font-bold
                        hover:bg-epo-green-600 active:scale-[0.98] transition
                    "
                >
                    <i className="fas fa-check text-[11px]" />
                    Remettre
                </button>
                <button
                    onClick={() => onVoir(doc)}
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
        </div>
    );
}