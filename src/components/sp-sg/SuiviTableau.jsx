// src/components/sp-sg/SuiviTableau.jsx
import {
    ETAPES_CIRCUIT,
    CLASSIFICATION,
    formatDateHeure,
    formatDuree,
} from '../../data/suiviSPSG.js';

export default function SuiviTableau({ dossiers, onVoir }) {
    return (
        <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-epo-slate-50">
                            {['N°', 'Objet', 'Expéditeur', 'Classification', 'Étape actuelle', 'Durée étape', 'Circuit total', 'Statut', ''].map((h, i) => (
                                <th
                                    key={i}
                                    className="px-3 py-2.5 text-[11px] font-semibold tracking-wider text-left uppercase text-epo-slate-500 whitespace-nowrap"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dossiers.map((d) => {
                            const etape = ETAPES_CIRCUIT[d.etapeActuelle];
                            const classification = CLASSIFICATION[d.classification];
                            const isLate = d.dureeEtapeActuelle && d.dureeEtapeActuelle > 240 && d.statut === 'en-circulation';

                            return (
                                <tr
                                    key={d.id}
                                    onClick={() => onVoir(d)}
                                    className={`
                                        border-t cursor-pointer transition
                                        ${d.bloquee ? 'bg-epo-red-50/40 hover:bg-epo-red-50' :
                                          isLate ? 'bg-epo-yellow-50/30 hover:bg-epo-yellow-50' :
                                          'border-epo-slate-100 hover:bg-epo-slate-50'}
                                    `}
                                >
                                    <td className="px-3 py-2.5">
                                        <span className="font-mono text-[12px] font-semibold text-epo-slate-800">
                                            {d.id}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <div className="text-[12.5px] font-medium text-epo-slate-800 truncate max-w-[280px]">
                                            {d.objet}
                                        </div>
                                        {d.bloquee && d.motifBlocage && (
                                            <div className="text-[10.5px] text-epo-red-600 mt-0.5 truncate max-w-[280px]">
                                                <i className="fas fa-exclamation-circle text-[9px] mr-1" />
                                                {d.motifBlocage}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-3 py-2.5 text-[12px] text-epo-slate-600 max-w-[160px] truncate">
                                        {d.expediteurStructure}
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${classification.chip}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${classification.dot}`} />
                                            {classification.shortLabel}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${etape.chip}`}>
                                            <i className={`fas ${etape.icon} text-[9px]`} />
                                            {etape.shortLabel}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        {d.dureeEtapeActuelle ? (
                                            <span className={`
                                                inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold
                                                ${isLate ? 'bg-epo-red-50 text-epo-red-700' : 'bg-epo-slate-100 text-epo-slate-600'}
                                            `}>
                                                {formatDuree(d.dureeEtapeActuelle)}
                                            </span>
                                        ) : (
                                            <span className="text-[11px] text-epo-slate-400 italic">—</span>
                                        )}
                                    </td>
                                    <td className="px-3 py-2.5 text-[11.5px] tabular-nums text-epo-slate-500">
                                        {formatDuree(d.tempsCircuit)}
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <StatutBadge statut={d.statut} />
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onVoir(d);
                                            }}
                                            className="text-[12px] font-medium text-epo-green-600 hover:underline whitespace-nowrap"
                                        >
                                            <i className="mr-1 fas fa-eye" />
                                            Suivre
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-[12.5px] border-t border-epo-slate-200 text-epo-slate-500">
                <span>{dossiers.length} dossier{dossiers.length > 1 ? 's' : ''} suivi{dossiers.length > 1 ? 's' : ''}</span>
                <span className="text-epo-slate-400">
                    <i className="mr-1 fas fa-info-circle" />
                    Cliquez sur une ligne pour voir le détail du circuit
                </span>
            </div>
        </div>
    );
}

function StatutBadge({ statut }) {
    const config = {
        'en-circulation': { label: 'En circulation', chip: 'bg-epo-green-50 text-epo-green-700' },
        'bloque': { label: 'Bloqué', chip: 'bg-epo-red-50 text-epo-red-700' },
        'cloture': { label: 'Clôturé', chip: 'bg-epo-slate-100 text-epo-slate-600' },
    };
    const c = config[statut] || config['en-circulation'];
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${c.chip}`}>
            {c.label}
        </span>
    );
}