// src/components/scc/ScanTable.jsx
import { StatusBadge } from '../ui';
import TypePieceBadge from './TypePieceBadge';
import ClassificationBadge from './ClassificationBadge';
import {
    ETATS_SCAN,
    formatDateHeure,
    formatTaille,
} from '../../data/scanSCC.js';

export default function ScanTable({ documents, onVoir, onScanner }) {
    if (documents.length === 0) {
        return (
            <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-green-50">
                    <i className="text-2xl fas fa-check-circle text-epo-green-500" />
                </div>
                <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                    Aucun document dans la file
                </div>
                <div className="text-[13px] text-epo-slate-500">
                    La file d'attente est vide.
                </div>
            </div>
        );
    }

    const totalErreur = documents.filter((d) => d.etat === 'erreur').length;

    return (
        <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
            {/* Bandeau d'alerte si erreurs */}
            {totalErreur > 0 && (
                <div className="flex items-center gap-2.5 px-4 py-2.5 bg-epo-red-50 border-b border-epo-red-200">
                    <i className="fas fa-exclamation-triangle text-epo-red-600" />
                    <div className="text-[12.5px] text-epo-red-800 font-medium">
                        <strong>{totalErreur}</strong> erreur{totalErreur > 1 ? 's' : ''} de numérisation à traiter
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-epo-slate-50">
                            {['', 'N° dossier', 'Objet', 'Type pièce', 'Source', 'Classification', 'Agent', 'Arrivée', 'Pages', 'État', ''].map((h, i) => (
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
                        {documents.map((d) => {
                            const etat = ETATS_SCAN[d.etat];
                            const isErreur = d.etat === 'erreur';
                            const isEnCours = d.etat === 'en-cours';
                            const isScanne = d.etat === 'scanne';
                            const canScanner = d.etat === 'a-scanner';

                            return (
                                <tr
                                    key={d.id}
                                    onClick={() => onVoir(d)}
                                    className={`
                                        border-t cursor-pointer transition
                                        ${isErreur ? 'bg-epo-red-50/40 hover:bg-epo-red-50' : 'border-epo-slate-100 hover:bg-epo-slate-50'}
                                    `}
                                >
                                    {/* Bande latérale */}
                                    <td className="w-1 p-0">
                                        <div className={`w-1 h-full min-h-[52px] ${etat.dot}`} />
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <div className="min-w-0">
                                            <div className="font-mono text-[12px] font-semibold text-epo-slate-800">
                                                {d.documentSource}
                                            </div>
                                            <div className="text-[10.5px] text-epo-slate-500 font-mono">
                                                {d.id}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <div className="min-w-0">
                                            <div className="text-[12.5px] font-medium text-epo-slate-800 truncate max-w-[240px]">
                                                {d.objet}
                                            </div>
                                            {isErreur && (
                                                <div className="text-[11px] text-epo-red-600 mt-0.5 truncate max-w-[240px]">
                                                    <i className="fas fa-exclamation-circle text-[9px] mr-1" />
                                                    {d.erreur}
                                                </div>
                                            )}
                                            {isEnCours && d.progression != null && (
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="flex-1 h-1 bg-epo-slate-200 rounded-full overflow-hidden max-w-[120px]">
                                                        <div
                                                            className="h-full transition-all bg-epo-slate-500"
                                                            style={{ width: `${d.progression}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[10.5px] tabular-nums text-epo-slate-500">
                                                        {d.progression}%
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <TypePieceBadge type={d.typePiece} size="sm" />
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${d.source === 'Arrivée' ? 'bg-epo-green-50 text-epo-green-700' : 'bg-epo-slate-100 text-epo-slate-700'}`}>
                                            <i className={`fas ${d.source === 'Arrivée' ? 'fa-inbox' : 'fa-paper-plane'} text-[9px]`} />
                                            {d.source}
                                        </span>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <ClassificationBadge classification={d.classification} size="sm" />
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
                                            <span className="text-[11px] italic text-epo-slate-400">
                                                Non assigné
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-3 py-2.5 text-[11.5px] tabular-nums text-epo-slate-500 whitespace-nowrap">
                                        {formatDateHeure(d.dateArrivee)}
                                    </td>

                                    <td className="px-3 py-2.5 text-[12px] text-center tabular-nums text-epo-slate-700 font-medium">
                                        {d.nbPages}
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <StatusBadge status={d.etat} />
                                        {isScanne && d.taille && (
                                            <div className="text-[10.5px] text-epo-slate-500 mt-0.5 tabular-nums">
                                                {formatTaille(d.taille)}
                                            </div>
                                        )}
                                    </td>

                                    <td className="px-3 py-2.5">
                                        {canScanner ? (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onScanner(d);
                                                }}
                                                className="text-[12px] font-semibold text-epo-green-600 hover:underline whitespace-nowrap"
                                            >
                                                <i className="mr-1 fas fa-camera" />
                                                Scanner
                                            </button>
                                        ) : isErreur ? (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onScanner(d);
                                                }}
                                                className="text-[12px] font-semibold text-epo-red-600 hover:underline whitespace-nowrap"
                                            >
                                                <i className="mr-1 fas fa-redo" />
                                                Relancer
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
                <span>{documents.length} document{documents.length > 1 ? 's' : ''} dans la file</span>
                <span className="text-epo-slate-400">
                    <i className="mr-1 fas fa-info-circle" />
                    Cliquez sur une ligne pour ouvrir le détail
                </span>
            </div>
        </div>
    );
}