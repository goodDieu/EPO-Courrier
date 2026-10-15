// src/components/liaison/RemiseCarte.jsx
import {
    TYPES_PREUVE,
    formatHeure,
} from '../../data/remisesLiaison.js';

export default function RemiseCarte({ remise, onVoirPreuve }) {
    const r = remise;
    const preuve = TYPES_PREUVE[r.typePreuve];

    return (
        <div className="flex items-start gap-3 p-4 transition bg-white border  border-epo-slate-200 rounded-xl shadow-soft hover:shadow-card">
            {/* Pastille check */}
            <div className="flex items-center justify-center flex-shrink-0 rounded-full w-9 h-9 bg-epo-slate-100 text-epo-slate-600">
                <i className="fas fa-check" />
            </div>

            <div className="flex-1 min-w-0">
                {/* En-tête */}
                <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-epo-slate-700 bg-epo-slate-100 px-2 py-0.5 rounded">
                        {r.documentNumero}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold ${preuve.chip}`}>
                        <i className={`fas ${preuve.icon} text-[8px]`} />
                        {preuve.shortLabel}
                    </span>
                    {r.priorite === 'urgent' && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-epo-slate-50 text-epo-slate-900 text-xs font-bold">
                            URGENT
                        </span>
                    )}
                </div>

                {/* Objet */}
                <div className="text-sm font-semibold text-epo-slate-900 line-clamp-2 mb-1.5">
                    {r.documentObjet}
                </div>

                {/* Destinataire */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-epo-slate-500 mb-2">
                    <span>
                        <i className="fas fa-user text-[10px] text-epo-slate-400 mr-1" />
                        {r.destinataire.personne}
                    </span>
                    <span>
                        <i className="fas fa-building text-[10px] text-epo-slate-400 mr-1" />
                        {r.destinataire.structure}
                    </span>
                    <span>
                        <i className="fas fa-clock text-[10px] text-epo-slate-400 mr-1" />
                        Remis à {formatHeure(r.dateRemise)}
                    </span>
                </div>

                {/* Pied */}
                <div className="flex items-center justify-between pt-2 border-t border-epo-slate-100">
                    <span className="text-xs text-epo-slate-500 font-mono">
                        {r.preuveRef}
                    </span>
                    <button
                        onClick={() => onVoirPreuve(r)}
                        className="
                            inline-flex items-center gap-1.5
                            text-xs font-semibold text-epo-green-600
                            hover:underline transition
                        "
                    >
                        <i className="fas fa-shield-halved text-[10px]" />
                        Voir la preuve
                    </button>
                </div>
            </div>
        </div>
    );
}