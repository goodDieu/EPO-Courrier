// src/components/liaison/DechargeLigne.jsx
import {
    TYPES_DECHARGE,
    formatHeure,
} from '../../data/dechargesLiaison.js';

export default function DechargeLigne({ decharge, onOuvrir }) {
    const d = decharge;
    const type = TYPES_DECHARGE[d.typePreuve];

    return (
        <button
            onClick={() => onOuvrir(d)}
            className="
                block w-full text-left bg-white border border-epo-slate-200 border-l-4 border-l-epo-green-500
                rounded-xl p-4 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition
            "
        >
            <div className="flex items-start gap-3">
                {/* Icône type preuve */}
                <div className={`
                    flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-xl
                    ${type.chip}
                `}>
                    <i className={`fas ${type.icon} text-[15px]`} />
                </div>

                <div className="flex-1 min-w-0">
                    {/* Ligne 1 : réf. + type */}
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="font-mono text-[12px] font-bold text-epo-slate-800 bg-epo-slate-100 px-2 py-0.5 rounded-full">
                            {d.id}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${type.chip}`}>
                            <i className={`fas ${type.icon} text-[9.5px]`} />
                            {type.shortLabel}
                        </span>
                    </div>

                    {/* Ligne 2 : objet du document */}
                    <div className="text-[13.5px] font-semibold text-epo-slate-900 truncate">
                        {d.documentObjet}
                    </div>

                    {/* Ligne 3 : doc N° + signataire */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[11.5px] text-epo-slate-500">
                        <span className="font-mono">
                            <i className="fas fa-file-alt text-[10px] text-epo-slate-400 mr-1" />
                            {d.documentNumero}
                        </span>
                        <span>
                            <i className="fas fa-user-check text-[10px] text-epo-slate-400 mr-1" />
                            {d.signataire.nom}
                        </span>
                        <span>
                            <i className="fas fa-building text-[10px] text-epo-slate-400 mr-1" />
                            {d.signataire.structure}
                        </span>
                    </div>

                    {/* Ligne 4 : date + bouton */}
                    <div className="flex items-center justify-between gap-2 mt-2.5 pt-2.5 border-t border-epo-slate-100">
                        <span className="text-[11px] text-epo-slate-500 tabular-nums">
                            <i className="fas fa-clock text-[10px] text-epo-slate-400 mr-1" />
                            Signé le {new Date(d.dateSignature).toLocaleDateString('fr-FR')} à {formatHeure(d.dateSignature)}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-epo-green-600">
                            <i className="fas fa-eye text-[10px]" />
                            Ouvrir
                        </span>
                    </div>
                </div>
            </div>
        </button>
    );
}