// src/components/sp-sg/SuiviKanban.jsx
import {
    ETAPES_CIRCUIT,
    CLASSIFICATION,
    formatDuree,
} from '../../data/suiviSPSG.js';

export default function SuiviKanban({ dossiers, onVoir }) {
    // Colonnes principales du circuit (§9.1)
    const colonnes = ['scc', 'sp-sg', 'sg', 'sp-dg', 'dg', 'retour-sg', 'scc-dispatch', 'direction', 'cloture'];

    const dossiersParEtape = colonnes.reduce((acc, key) => {
        acc[key] = dossiers.filter((d) => d.etapeActuelle === key);
        return acc;
    }, {});

    return (
        <div className="pb-4 overflow-x-auto">
            <div className="flex gap-4 min-w-max">
                {colonnes.map((key) => {
                    const etape = ETAPES_CIRCUIT[key];
                    const items = dossiersParEtape[key];

                    return (
                        <div
                            key={key}
                            className="w-[280px] flex-shrink-0 bg-epo-slate-50 border border-epo-slate-200 rounded-xl p-3"
                        >
                            {/* En-tête colonne */}
                            <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b border-epo-slate-200">
                                <div className="flex items-center min-w-0 gap-2">
                                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ${etape.chip}`}>
                                        <i className={`fas ${etape.icon} text-[11px]`} />
                                    </span>
                                    <div className="min-w-0">
                                        <div className="text-[12.5px] font-bold text-epo-slate-800 truncate">
                                            {etape.label}
                                        </div>
                                    </div>
                                </div>
                                <span className={`inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-[10.5px] font-bold ${etape.chip}`}>
                                    {items.length}
                                </span>
                            </div>

                            {/* Cartes */}
                            <div className="flex flex-col gap-2">
                                {items.length === 0 ? (
                                    <div className="py-6 text-center">
                                        <div className="text-[11px] text-epo-slate-400 italic">
                                            Aucun dossier
                                        </div>
                                    </div>
                                ) : (
                                    items.map((d) => (
                                        <CarteKanban
                                            key={d.id}
                                            dossier={d}
                                            onVoir={onVoir}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function CarteKanban({ dossier, onVoir }) {
    const d = dossier;
    const classification = CLASSIFICATION[d.classification];
    const isLate = d.dureeEtapeActuelle && d.dureeEtapeActuelle > 240 && d.statut === 'en-circulation';

    return (
        <button
            onClick={() => onVoir(d)}
            className={`
                w-full text-left bg-white border rounded-lg p-3 shadow-soft
                hover:shadow-card hover:-translate-y-0.5 transition
                ${d.bloquee ? 'border-epo-red-300 border-l-4 border-l-epo-red-500' :
                  isLate ? 'border-epo-yellow-300 border-l-4 border-l-epo-yellow-500' :
                  'border-epo-slate-200 border-l-4 border-l-epo-slate-300'}
            `}
        >
            <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-mono text-[10.5px] font-bold text-epo-slate-700 bg-epo-slate-100 px-1.5 py-0.5 rounded-full">
                    {d.id}
                </span>
                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9.5px] font-semibold ${classification.chip}`}>
                    <span className={`w-1 h-1 rounded-full ${classification.dot}`} />
                    {classification.shortLabel}
                </span>
            </div>

            <div className="text-[12px] font-semibold text-epo-slate-900 leading-snug mb-1.5 line-clamp-2">
                {d.objet}
            </div>

            <div className="text-[10.5px] text-epo-slate-500 truncate mb-2">
                {d.expediteurStructure}
            </div>

            {d.bloquee && (
                <div className="text-[10px] text-epo-red-600 font-medium line-clamp-2">
                    <i className="fas fa-exclamation-circle text-[9px] mr-1" />
                    {d.motifBlocage}
                </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-epo-slate-100 text-[10px] text-epo-slate-500">
                <span>
                    <i className="fas fa-stopwatch text-[9px] mr-1" />
                    {d.dureeEtapeActuelle ? formatDuree(d.dureeEtapeActuelle) : formatDuree(d.tempsCircuit)}
                </span>
                {isLate && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-epo-red-50 text-epo-red-700 font-bold text-[9px]">
                        RETARD
                    </span>
                )}
            </div>
        </button>
    );
}