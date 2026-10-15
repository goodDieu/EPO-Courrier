// src/components/sp-sg/InstructionCarte.jsx
import {
    TYPES_INSTRUCTIONS,
    STATUTS_INSTRUCTION,
    formatHeure,
    formatDateHeure,
    formatDuree,
} from '../../data/instructionsSPSG.js';

export default function InstructionCarte({ instruction, onTraiter, onVoir }) {
    const i = instruction;
    const type = TYPES_INSTRUCTIONS[i.type];
    const statut = STATUTS_INSTRUCTION[i.statut];

    const isUrgente = i.prioriteInterne === 'urgente';
    const isTraitee = i.statut === 'traite';
    const isAfficheBouton = !isTraitee;

    const borderColor = isTraitee ? ''
        : isUrgente ? ''
        : '';

    return (
        <div className={`
            bg-white border border-epo-slate-200
            ${borderColor} rounded-xl p-4 shadow-soft hover:shadow-card transition
            ${isTraitee ? 'opacity-80' : ''}
        `}>
            {/* En-tête */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-epo-slate-700 bg-epo-slate-100 px-2 py-0.5 rounded">
                    {i.id}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${type.chip}`}>
                    <i className={`fas ${type.icon} text-[9px]`} />
                    {type.label}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${statut.chip}`}>
                    <i className={`fas ${statut.icon} text-[9px] ${i.statut === 'en-cours' ? 'fa-spin' : ''}`} />
                    {statut.label}
                </span>
                {isUrgente && !isTraitee && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-epo-slate-50 text-epo-slate-900 text-xs font-bold">
                        <i className="fas fa-exclamation-circle text-[8px]" />
                        URGENTE
                    </span>
                )}
            </div>

            {/* Dossier lié */}
            <div className="p-2.5 mb-2 rounded-lg bg-epo-slate-50 border border-epo-slate-200">
                <div className="flex items-center gap-2 mb-1">
                    <i className="fas fa-link text-[10px] text-epo-slate-400" />
                    <span className="font-mono text-xs font-bold text-epo-slate-700">
                        {i.dossierId}
                    </span>
                </div>
                <div className="text-xs text-epo-slate-700 truncate">
                    {i.dossierObjet}
                </div>
            </div>

            {/* Contenu de l'instruction */}
            <div className="p-3 mb-3 bg-white border rounded-lg border-epo-slate-200">
                <div className="text-xs font-semibold uppercase tracking-wider text-epo-slate-400 mb-1">
                    {type.label}
                </div>
                <div className="text-sm text-epo-slate-800 italic leading-relaxed">
                    « {i.contenu} »
                </div>
            </div>

            {/* Métadonnées */}
            <div className="flex flex-col gap-1 mb-3 text-xs text-epo-slate-500">
                <div className="flex items-center gap-1.5">
                    <i className="fas fa-user-tie text-[10px] text-epo-slate-400" />
                    <span>Émise par <strong className="text-epo-slate-700">{i.auteur}</strong> le {formatDateHeure(i.dateEmission)}</span>
                </div>
                {i.delaiInterne && !isTraitee && (
                    <div className={`flex items-center gap-1.5 ${i.tempsDepuisEmission > 120 ? 'text-epo-slate-900 font-semibold' : ''}`}>
                        <i className="fas fa-clock text-[10px]" />
                        <span>Délai interne : {formatDateHeure(i.delaiInterne)}</span>
                    </div>
                )}
                {i.traiteLe && (
                    <div className="flex items-center gap-1.5 text-epo-green-600 font-medium">
                        <i className="fas fa-check-circle text-[10px]" />
                        <span>Traitée le {formatDateHeure(i.traiteLe)} par {i.traitePar}</span>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-epo-slate-100">
                {isAfficheBouton ? (
                    <>
                        <button
                            onClick={() => onTraiter(i)}
                            className="
                                flex-1 flex items-center justify-center gap-2
                                py-2.5 px-4 rounded-lg
                                bg-epo-green-700 text-white text-sm font-bold
                                hover:bg-epo-green-800 active:scale-[0.98] transition
                            "
                        >
                            <i className="fas fa-check text-[11px]" />
                            Marquer comme traitée
                        </button>
                        <button
                            onClick={() => onVoir(i)}
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
                ) : (
                    <button
                        onClick={() => onVoir(i)}
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