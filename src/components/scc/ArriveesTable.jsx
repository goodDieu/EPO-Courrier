// src/components/scc/ArriveesTable.jsx
import { StatusBadge } from '../ui';
import ClassificationBadge from './ClassificationBadge';
import CriticiteBadge from './CriticiteBadge';
import { formatDateHeure, NATURES_ENTRANTS } from '../../data/arriveesSCC.js';

export default function ArriveesTable({ arrivees, onVoir, onTransmettre }) {
    if (arrivees.length === 0) {
        return (
            <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-slate-100">
                    <i className="text-2xl fas fa-inbox text-epo-slate-400" />
                </div>
                <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                    Aucune arrivée trouvée
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
                            {['N°', 'Objet', 'Expéditeur', 'Classification', 'Criticité', 'Pièces', 'Reçu le', 'État', ''].map((h, i) => (
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
                        {arrivees.map((a) => {
                            const nature = NATURES_ENTRANTS[a.nature];
                            const canTransmettre = a.etat === 'enregistre';

                            return (
                                <tr
                                    key={a.id}
                                    onClick={() => onVoir(a)}
                                    className="transition border-t cursor-pointer border-epo-slate-100 hover:bg-epo-slate-50"
                                >
                                    <td className="px-3 py-2.5">
                                        <span className="font-mono text-[12px] font-semibold text-epo-slate-800">
                                            {a.id}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <div className="min-w-0">
                                            <div className="text-[12.5px] font-medium text-epo-slate-800 truncate max-w-[240px]">
                                                {a.objet}
                                            </div>
                                            <div className="flex items-center gap-1 mt-0.5 text-[11px] text-epo-slate-500">
                                                <i className={`fas ${nature?.icon} text-[9.5px] text-epo-slate-400`} />
                                                {nature?.label}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5 text-[12.5px] text-epo-slate-600 max-w-[180px] truncate">
                                        {a.expediteur}
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <ClassificationBadge classification={a.classification} size="sm" />
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <CriticiteBadge tempsRestant={a.tempsRestant} size="sm" />
                                    </td>
                                    <td className="px-3 py-2.5 text-center">
                                        <div className="inline-flex items-center gap-1.5 text-[12px] text-epo-slate-600">
                                            <i className="fas fa-paperclip text-[11px] text-epo-slate-400" />
                                            <span className="tabular-nums">{a.pieces}</span>
                                            {a.scanne && (
                                                <i className="fas fa-camera text-[10px] text-epo-green-500 ml-0.5" title="Scanné" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5 text-[11.5px] tabular-nums text-epo-slate-500 whitespace-nowrap">
                                        {formatDateHeure(a.dateReception)}
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <StatusBadge status={a.etat} />
                                    </td>
                                    <td className="px-3 py-2.5">
                                        {canTransmettre ? (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onTransmettre(a);
                                                }}
                                                className="text-[12px] font-semibold text-epo-green-600 hover:underline whitespace-nowrap"
                                            >
                                                <i className="mr-1 fas fa-paper-plane" />
                                                Transmettre
                                            </button>
                                        ) : (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onVoir(a);
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
                <span>{arrivees.length} courrier{arrivees.length > 1 ? 's' : ''} affiché{arrivees.length > 1 ? 's' : ''}</span>
                <span className="text-epo-slate-400">
                    <i className="mr-1 fas fa-info-circle" />
                    Cliquez sur une ligne pour ouvrir le détail
                </span>
            </div>
        </div>
    );
}