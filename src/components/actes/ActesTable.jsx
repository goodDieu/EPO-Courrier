// src/components/actes/ActesTable.jsx
import { StatusBadge } from '../ui';
import NatureBadge from './NatureBadge';
import { SIGNATURES, formatDate } from '../../data/actes.js';
import { computeNiveau } from '../../data/actesHelpers.js';

export default function ActesTable({ actes, onVoir }) {
    if (actes.length === 0) {
        return (
            <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-slate-100">
                    <i className="text-2xl fas fa-file-signature text-epo-slate-400" />
                </div>
                <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                    Aucun acte trouvé
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
                            {['N°', 'Nature', 'Bénéficiaire', 'Objet', 'État', 'Signature', 'Créé le', 'Échéance', ''].map((h, i) => (
                                <th
                                    key={i}
                                    className="text-left px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-epo-slate-500 whitespace-nowrap"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {actes.map((a) => {
                            const niveau = computeNiveau(a.tempsRestant);
                            const niveauInfo = getNiveauInfo(niveau);
                            const sig = SIGNATURES[a.signature];

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
                                        <NatureBadge nature={a.nature} size="sm" />
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <div className="flex items-center min-w-0 gap-2">
                                            <div className="w-6 h-6 rounded-full bg-epo-slate-100 flex items-center justify-center text-[9px] font-bold text-epo-slate-600 flex-shrink-0">
                                                {a.beneficiaireNom.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-[12.5px] font-semibold text-epo-slate-800 truncate">
                                                    {a.beneficiaireNom}
                                                </div>
                                                <div className="text-[10.5px] text-epo-slate-500 font-mono truncate">
                                                    {a.beneficiaireMatricule}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5 text-epo-slate-700 max-w-[220px] truncate text-[12.5px]">
                                        {a.objet}
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <StatusBadge status={a.etat} />
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <div className={`inline-flex items-center gap-1.5 text-[11.5px] font-medium ${sig.color}`}>
                                            <i className={`fas ${sig.icon} text-[10px]`} />
                                            <span className="truncate max-w-[120px]">{sig.label}</span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5 text-[12px] text-epo-slate-600 tabular-nums whitespace-nowrap">
                                        {formatDate(a.dateCreation)}
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <div className="flex flex-col gap-0.5">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${niveauInfo.bg} ${niveauInfo.text} self-start`}>
                                                <i className={`fas ${niveauInfo.icon} text-[8.5px]`} />
                                                {niveauInfo.label}
                                            </span>
                                            <span className="text-[10.5px] text-epo-slate-400 tabular-nums whitespace-nowrap">
                                                {formatDate(a.echeance)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onVoir(a);
                                            }}
                                            className="text-[12px] font-medium text-epo-green-600 hover:underline"
                                        >
                                            Consulter
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-2.5 border-t border-epo-slate-200 text-[12.5px] text-epo-slate-500">
                <span>{actes.length} acte{actes.length > 1 ? 's' : ''} affiché{actes.length > 1 ? 's' : ''}</span>
                <span className="text-epo-slate-400">
                    <i className="mr-1 fas fa-info-circle" />
                    Cliquez sur une ligne pour ouvrir le détail
                </span>
            </div>
        </div>
    );
}

function getNiveauInfo(niveau) {
    switch (niveau) {
        case 'depasse':
            return { label: 'Dépassé', icon: 'fa-exclamation-circle', bg: 'bg-epo-red-50', text: 'text-epo-red-700' };
        case 'jourJ':
            return { label: 'Jour J', icon: 'fa-clock', bg: 'bg-epo-yellow-50', text: 'text-epo-yellow-800' };
        case 'urgent':
            return { label: 'Urgent', icon: 'fa-hourglass-half', bg: 'bg-epo-yellow-50', text: 'text-epo-yellow-700' };
        case 'surveiller':
            return { label: 'À surveiller', icon: 'fa-hourglass-start', bg: 'bg-epo-slate-50', text: 'text-epo-slate-700' };
        default:
            return { label: 'OK', icon: 'fa-check-circle', bg: 'bg-epo-green-50', text: 'text-epo-green-700' };
    }
}