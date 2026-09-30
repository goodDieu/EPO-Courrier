// src/components/scc/DepartsTable.jsx
import { StatusBadge } from '../ui';
import ModeDepartBadge from './ModeDepartBadge';
import {
    NATURES_SORTANTS,
    formatDateHeure,
} from '../../data/departsSCC.js';

export default function DepartsTable({ departs, onVoir, onTraiter }) {
    if (departs.length === 0) {
        return (
            <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-slate-100">
                    <i className="text-2xl fas fa-paper-plane text-epo-slate-400" />
                </div>
                <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                    Aucun départ trouvé
                </div>
                <div className="text-[13px] text-epo-slate-500">
                    Essayez d'élargir vos filtres.
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-epo-slate-50">
                            {['N° sortant', 'Document source', 'Objet', 'Bénéficiaire', 'Mode', 'Numéroté', 'Cacheté', 'Reçu le', 'État', ''].map((h, i) => (
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
                        {departs.map((d) => {
                            const nature = NATURES_SORTANTS[d.nature];
                            const canTraiter = ['a-numeroter', 'a-cacheter', 'pret-expedition'].includes(d.etat);

                            return (
                                <tr
                                    key={d.id}
                                    onClick={() => onVoir(d)}
                                    className="transition border-t cursor-pointer border-epo-slate-100 hover:bg-epo-slate-50"
                                >
                                    <td className="px-3 py-2.5">
                                        <div className="min-w-0">
                                            <div className="font-mono text-[11.5px] font-semibold text-epo-slate-800">
                                                {d.numeroSortant || '-'}
                                            </div>
                                            <div className="text-[10.5px] text-epo-slate-500">
                                                Réf. {d.id}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <span className="font-mono text-[11.5px] text-epo-slate-600">
                                            {d.documentSource}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <div className="min-w-0">
                                            <div className="text-[12.5px] font-medium text-epo-slate-800 truncate max-w-[220px]">
                                                {d.objet}
                                            </div>
                                            <div className="flex items-center gap-1 mt-0.5 text-[11px] text-epo-slate-500">
                                                <i className={`fas ${nature?.icon} text-[9.5px] text-epo-slate-400`} />
                                                {nature?.label}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5 text-[12px] text-epo-slate-600 max-w-[160px] truncate">
                                        {d.beneficiaire}
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <ModeDepartBadge mode={d.mode} size="sm" />
                                    </td>
                                    <td className="px-3 py-2.5 text-center">
                                        {d.numeroSortant ? (
                                            <i className="fas fa-check-circle text-epo-green-500" title="Numéroté" />
                                        ) : (
                                            <i className="fas fa-times-circle text-epo-slate-300" title="Non numéroté" />
                                        )}
                                    </td>
                                    <td className="px-3 py-2.5 text-center">
                                        {d.cachet ? (
                                            <i className="fas fa-check-circle text-epo-green-500" title="Cacheté" />
                                        ) : (
                                            <i className="fas fa-times-circle text-epo-slate-300" title="Non cacheté" />
                                        )}
                                    </td>
                                    <td className="px-3 py-2.5 text-[11.5px] tabular-nums text-epo-slate-500 whitespace-nowrap">
                                        {formatDateHeure(d.dateReceptionSCC)}
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <StatusBadge status={d.etat} />
                                    </td>
                                    <td className="px-3 py-2.5">
                                        {canTraiter ? (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onTraiter(d);
                                                }}
                                                className="text-[12px] font-semibold text-epo-green-600 hover:underline whitespace-nowrap"
                                            >
                                                <i className="mr-1 fas fa-cog" />
                                                Traiter
                                            </button>
                                        ) : (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onVoir(d);
                                                }}
                                                className="text-[12px] font-medium text-epo-slate-600 hover:underline whitespace-nowrap"
                                            >
                                                Voir
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-[12.5px] border-t border-epo-slate-200 text-epo-slate-500">
                <span>{departs.length} départ{departs.length > 1 ? 's' : ''} affiché{departs.length > 1 ? 's' : ''}</span>
                <span className="text-epo-slate-400">
                    <i className="mr-1 fas fa-info-circle" />
                    Cliquez sur une ligne pour ouvrir le détail
                </span>
            </div>
        </div>
    );
}