// src/components/echeances/EcheanceLigne.jsx
import { NIVEAUX, CIRCUITS, formatEcheanceTexte } from '../../data/echeances.js';

export default function EcheanceLigne({ dossier, onVoir, onRelancer, onInterpeller, canInterpeller }) {
    const niveau = dossier._niveau;
    const n = NIVEAUX[niveau];
    const circuit = CIRCUITS[dossier.circuit];

    return (
        <div className={`
            flex items-stretch gap-3 bg-white border border-epo-slate-200 border-l-4
            ${n.border}
            rounded-xl p-3.5 shadow-soft hover:shadow-card transition
        `}>
            {/* Pastille de niveau */}
            <div className="flex flex-col items-center justify-center flex-shrink-0 w-10">
                <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${n.bg} ${n.text}`}>
                    <i className={`fas ${n.icon} text-[14px]`} />
                </span>
            </div>

            {/* Contenu principal */}
            <div className="flex-1 min-w-0">
                {/* Ligne 1 : N° + circuit + objet */}
                <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[12.5px] font-bold text-epo-slate-800 bg-epo-slate-100 px-2 py-0.5 rounded-full">
                        {dossier.id}
                    </span>
                    {circuit && (
                        <span className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full ${circuit.color}`}>
                            {dossier.circuit}
                        </span>
                    )}
                    {dossier.classification === 'confidentiel' && (
                        <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-epo-slate-700 text-white inline-flex items-center gap-1">
                            <i className="fas fa-lock text-[9px]" />
                            Confidentiel
                        </span>
                    )}
                </div>

                {/* Objet */}
                <div className="text-[14px] font-semibold text-epo-slate-900 truncate">
                    {dossier.objet}
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-3.5 text-[12px] text-epo-slate-500 mt-1">
                    <span className="inline-flex items-center gap-1.5">
                        <i className="fas fa-user text-[10.5px] text-epo-slate-400" />
                        {dossier.expediteur}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <i className="fas fa-map-marker-alt text-[10.5px] text-epo-slate-400" />
                        {dossier.structure} · {dossier.etapeCourante}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <i className="fas fa-user-circle text-[10.5px] text-epo-slate-400" />
                        {dossier.responsable}
                    </span>
                </div>
            </div>

            {/* Bloc échéance */}
            <div className="flex-shrink-0 flex flex-col items-end justify-center gap-1 min-w-[140px] text-right">
                <div className={`text-[12.5px] font-bold ${n.text} tabular-nums`}>
                    {formatEcheanceTexte(dossier)}
                </div>
                <div className="text-[10.5px] text-epo-slate-400 uppercase tracking-wider font-semibold">
                    {n.label}
                </div>

                {/* Actions */}
                <div className="flex gap-1 mt-1.5">
                    <button
                        onClick={() => onVoir?.(dossier)}
                        className="text-[11.5px] font-medium text-epo-slate-700 hover:bg-epo-slate-100 px-2 py-1 rounded transition"
                        title="Voir le détail"
                    >
                        <i className="fas fa-eye" />
                    </button>
                    <button
                        onClick={() => onRelancer?.(dossier)}
                        className="text-[11.5px] font-medium text-epo-green-600 hover:bg-epo-green-50 px-2 py-1 rounded transition"
                        title="Relancer le responsable"
                    >
                        <i className="fas fa-bell" />
                    </button>
                    {canInterpeller && (
                        <button
                            onClick={() => onInterpeller?.(dossier)}
                            className="text-[11.5px] font-medium text-epo-red-600 hover:bg-epo-red-50 px-2 py-1 rounded transition"
                            title="Interpeller (SG/DG)"
                        >
                            <i className="fas fa-exclamation-triangle" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}