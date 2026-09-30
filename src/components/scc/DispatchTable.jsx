// ✅ À CONSERVER
import { StatusBadge } from '../ui';
import ModeRemiseBadge from './ModeRemiseBadge';
import ClassificationBadge from './ClassificationBadge';
import { formatHeure, formatDuree } from '../../data/dispatchSCC.js';
/* ============================================================
   TABLEAU
   ============================================================ */

export default function DispatchTable({ dossiers, onVoir, onDispatcher }) {
    if (dossiers.length === 0) {
        return (
            <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-green-50">
                    <i className="text-2xl fas fa-check-circle text-epo-green-500" />
                </div>
                <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                    Aucun dossier à dispatcher
                </div>
                <div className="text-[13px] text-epo-slate-500">
                    Tous les dossiers imputés ont été traités. 🎉
                </div>
            </div>
        );
    }

    // Compteur pour bandeau d'alerte
    const totalRetard = dossiers.filter((d) => d.etat === 'en-retard').length;

    return (
        <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
            {/* Bandeau d'alerte si retards */}
            {totalRetard > 0 && (
                <div className="flex items-center gap-2.5 px-4 py-2.5 bg-epo-red-50 border-b border-epo-red-200">
                    <i className="fas fa-exclamation-triangle text-epo-red-600" />
                    <div className="text-[12.5px] text-epo-red-800 font-medium">
                        <strong>{totalRetard}</strong> dossier{totalRetard > 1 ? 's' : ''} en retard de dispatch - à traiter en priorité
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-epo-slate-50">
                            {['', 'N°', 'Objet', 'Destinataire', 'Classification', 'Mode prévu', 'Agent', 'Reçu à', 'Délai', 'État', ''].map((h, i) => (
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
                            const isLate = d.etat === 'en-retard';
                            const niveau = isLate ? 'red' : d.tempsRestant < 0 ? 'red' : d.tempsRestant < 60 ? 'yellow' : 'slate';
                            const canDispatch = ['a-dispatcher', 'en-retard'].includes(d.etat);

                            return (
                                <tr
                                    key={d.id}
                                    onClick={() => onVoir(d)}
                                    className={`
                                        border-t cursor-pointer transition
                                        ${isLate ? 'bg-epo-red-50/40 hover:bg-epo-red-50' : 'border-epo-slate-100 hover:bg-epo-slate-50'}
                                    `}
                                >
                                    {/* Bande latérale */}
                                    <td className="w-1 p-0">
                                        <div className={`w-1 h-full min-h-[52px] ${niveau === 'red' ? 'bg-epo-red-500' : niveau === 'yellow' ? 'bg-epo-yellow-500' : 'bg-epo-slate-300'}`} />
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <span className="font-mono text-[12px] font-semibold text-epo-slate-800">
                                            {d.id}
                                        </span>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <div className="min-w-0">
                                            <div className="text-[12.5px] font-medium text-epo-slate-800 truncate max-w-[240px]">
                                                {d.objet}
                                            </div>
                                            <div className="text-[11px] text-epo-slate-500 truncate max-w-[240px] mt-0.5">
                                                <i className="fas fa-user text-[9.5px] text-epo-slate-400 mr-1" />
                                                {d.expediteur}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <div className="min-w-0">
                                            <div className="text-[12.5px] font-semibold text-epo-slate-800">
                                                {d.structureDestinataire}
                                            </div>
                                            <div className="text-[11px] text-epo-slate-500 truncate max-w-[140px]">
                                                {d.destinataire.personne}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <ClassificationBadge classification={d.classification} size="sm" />
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <ModeRemiseBadge mode={d.modePrevu} size="sm" />
                                    </td>

                                    <td className="px-3 py-2.5">
                                        {d.agentAssigne ? (
                                            <div className="flex items-center gap-1.5">
                                                <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-full bg-epo-slate-100 text-epo-slate-600 text-[9px] font-bold">
                                                    {d.agentAssigne.replace('M. ', '').replace('Mme ', '').split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                                </div>
                                                <span className="text-[11.5px] text-epo-slate-600 truncate max-w-[100px]">
                                                    {d.agentAssigne.split(' ').slice(-1)[0]}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-[11px] text-epo-slate-400 italic">
                                                Non assigné
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-3 py-2.5 text-[11.5px] tabular-nums text-epo-slate-500 whitespace-nowrap">
                                        {formatHeure(d.dateReceptionSCC)}
                                    </td>

                                    <td className="px-3 py-2.5">
                                        {d.tempsRestant < 0 ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-epo-red-100 text-epo-red-800">
                                                <i className="fas fa-exclamation-circle text-[9px]" />
                                                +{formatDuree(d.tempsRestant)}
                                            </span>
                                        ) : (
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${d.tempsRestant < 60 ? 'bg-epo-yellow-50 text-epo-yellow-700' : 'bg-epo-slate-100 text-epo-slate-600'}`}>
                                                <i className="fas fa-clock text-[9px]" />
                                                {formatDuree(d.tempsRestant)}
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <StatusBadge status={d.etat} />
                                    </td>

                                    <td className="px-3 py-2.5">
                                        {canDispatch ? (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDispatcher(d);
                                                }}
                                                className="text-[12px] font-semibold text-epo-green-600 hover:underline whitespace-nowrap"
                                            >
                                                <i className="mr-1 fas fa-paper-plane" />
                                                Dispatcher
                                            </button>
                                        ) : (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onVoir(d);
                                                }}
                                                className="text-[12px] font-medium text-epo-slate-600 hover:underline whitespace-nowrap"
                                            >
                                                Détail
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
                <span>{dossiers.length} dossier{dossiers.length > 1 ? 's' : ''} affiché{dossiers.length > 1 ? 's' : ''}</span>
                <span className="text-epo-slate-400">
                    <i className="mr-1 fas fa-info-circle" />
                    Cliquez sur une ligne pour ouvrir le détail
                </span>
            </div>
        </div>
    );
}