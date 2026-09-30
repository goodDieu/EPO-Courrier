// src/components/transmissions/TransmissionsTable.jsx
import ModeBadge from './ModeBadge';
import PreuveIndicator from './PreuveIndicator';
import { ETATS_TRANSMISSION, formatDateHeure } from '../../data/transmissions.js';

export default function TransmissionsTable({ transmissions, onVoir }) {
    if (transmissions.length === 0) {
        return (
            <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-slate-100">
                    <i className="text-2xl fas fa-truck text-epo-slate-400" />
                </div>
                <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                    Aucune transmission trouvée
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
                            {['N°', 'Document', 'Destinataire', 'Mode', 'Agent', 'Départ', 'Remise', 'Preuve', 'État', ''].map((h, i) => (
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
                        {transmissions.map((t) => {
                            const etat = ETATS_TRANSMISSION[t.etat] || ETATS_TRANSMISSION['a-remettre'];
                            const agent = t.agentId
                                ? t.agentNom || '-'
                                : '-';

                            return (
                                <tr
                                    key={t.id}
                                    onClick={() => onVoir(t)}
                                    className="transition border-t cursor-pointer border-epo-slate-100 hover:bg-epo-slate-50"
                                >
                                    <td className="px-3 py-2.5">
                                        <span className="font-mono text-[12px] font-semibold text-epo-slate-800">
                                            {t.id}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <div className="min-w-0">
                                            <div className="text-[12.5px] font-semibold text-epo-slate-800">
                                                {t.documentNumero}
                                            </div>
                                            <div className="text-[11px] truncate text-epo-slate-500 max-w-[180px]">
                                                {t.documentObjet}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <div className="min-w-0">
                                            <div className="text-[12.5px] font-semibold text-epo-slate-800">
                                                {t.destinataire.structure}
                                            </div>
                                            <div className="text-[11px] truncate text-epo-slate-500 max-w-[160px]">
                                                {t.destinataire.personne}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <ModeBadge mode={t.mode} size="sm" />
                                    </td>
                                    <td className="px-3 py-2.5 text-[12px] text-epo-slate-600">
                                        {agent}
                                    </td>
                                    <td className="px-3 py-2.5 text-[12px] tabular-nums text-epo-slate-600 whitespace-nowrap">
                                        {formatDateHeure(t.dateDepart)}
                                    </td>
                                    <td className="px-3 py-2.5 text-[12px] tabular-nums whitespace-nowrap">
                                        {t.dateRemise ? (
                                            <span className="text-epo-green-700">
                                                {formatDateHeure(t.dateRemise)}
                                            </span>
                                        ) : (
                                            <span className="text-epo-slate-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <PreuveIndicator preuve={t.preuve} size="sm" />
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${etat.chip}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${etat.dot}`} />
                                            {etat.label}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onVoir(t);
                                            }}
                                            className="text-[12px] font-medium text-epo-green-600 hover:underline"
                                        >
                                            Détail
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-[12.5px] border-t border-epo-slate-200 text-epo-slate-500">
                <span>{transmissions.length} transmission{transmissions.length > 1 ? 's' : ''} affichée{transmissions.length > 1 ? 's' : ''}</span>
                <span className="text-epo-slate-400">
                    <i className="mr-1 fas fa-info-circle" />
                    Cliquez sur une ligne pour ouvrir le détail
                </span>
            </div>
        </div>
    );
}