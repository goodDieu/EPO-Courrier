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
                                    className="px-3 py-2.5 text-xs font-semibold tracking-wider text-left uppercase text-epo-slate-500 whitespace-nowrap"
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
                                        ${d.bloquee ? 'border-epo-slate-100 hover:bg-epo-slate-50' :
                                          isLate ? 'bg-epo-yellow-50/30 hover:bg-epo-yellow-50' :
                                          'border-epo-slate-100 hover:bg-epo-slate-50'}
                                    `}
                                >
                                    <td className="px-3 py-2.5">
                                        <span className="font-mono text-xs font-semibold text-epo-slate-800">
                                            {d.id}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <div className="text-sm font-medium text-epo-slate-800 truncate max-w-[280px]">
                                            {d.objet}
                                        </div>
                                        {d.bloquee && d.motifBlocage && (
                                            <div className="text-xs text-epo-slate-900 mt-0.5 truncate max-w-[280px]">
                                                <i className="fas fa-exclamation-circle text-[9px] mr-1" />
                                                {d.motifBlocage}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-3 py-2.5 text-xs text-epo-slate-600 max-w-[160px] truncate">
                                        {d.expediteurStructure}
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${classification.chip}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${classification.dot}`} />
                                            {classification.shortLabel}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${etape.chip}`}>
                                            <i className={`fas ${etape.icon} text-[9px]`} />
                                            {etape.shortLabel}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        {d.dureeEtapeActuelle ? (
                                            <span className={`
                                                inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold
                                                ${isLate ? 'bg-epo-slate-50 text-epo-slate-900' : 'bg-epo-slate-100 text-epo-slate-600'}
                                            `}>
                                                {formatDuree(d.dureeEtapeActuelle)}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-epo-slate-400 italic">—</span>
                                        )}
                                    </td>
                                    <td className="px-3 py-2.5 text-xs tabular-nums text-epo-slate-500">
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
                                            className="text-xs font-medium text-epo-green-600 hover:underline whitespace-nowrap"
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
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-sm border-t border-epo-slate-200 text-epo-slate-500">
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
        'en-circulation': { label: 'En circulation', chip: 'bg-epo-slate-100 text-epo-slate-600' },
        'bloque': { label: 'Bloqué', chip: 'bg-epo-slate-50 text-epo-slate-900' },
        'cloture': { label: 'Clôturé', chip: 'bg-epo-slate-100 text-epo-slate-600' },
    };
    const c = config[statut] || config['en-circulation'];
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${c.chip}`}>
            {c.label}
        </span>
    );
}