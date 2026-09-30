// src/components/dg/ASignerTable.jsx
import { StatusBadge, PriorityTag } from '../ui';
import {
    TYPES_DOCUMENTS,
    PROVENANCES,
    formatDateHeure,
    formatDuree,
    computeNiveau,
    peutSignerEnMasse,
} from '../../data/aSignerDG.js';

const NIVEAUX_INFO = {
    depasse: { label: 'Dépassé', icon: 'fa-exclamation-circle', chip: 'bg-epo-red-100 text-epo-red-800' },
    jourJ: { label: 'Jour J', icon: 'fa-clock', chip: 'bg-epo-yellow-100 text-epo-yellow-800' },
    urgent: { label: 'Urgent', icon: 'fa-hourglass-half', chip: 'bg-epo-yellow-50 text-epo-yellow-700' },
    surveiller: { label: 'À surveiller', icon: 'fa-hourglass-start', chip: 'bg-epo-slate-100 text-epo-slate-600' },
    ok: { label: 'OK', icon: 'fa-check-circle', chip: 'bg-epo-green-50 text-epo-green-700' },
};

export default function ASignerTable({
    documents,
    selectedIds,
    onToggleSelect,
    onToggleSelectAll,
    onSigner,
}) {
    if (documents.length === 0) {
        return (
            <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-green-50">
                    <i className="text-2xl fas fa-check-circle text-epo-green-500" />
                </div>
                <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                    Aucun document à signer
                </div>
                <div className="text-[13px] text-epo-slate-500">
                    Tous les documents ont été traités. 🎉
                </div>
            </div>
        );
    }

    // Sélection en masse : tous sélectionnables
    const selectableIds = documents.filter(peutSignerEnMasse).map((d) => d.id);
    const allSelected =
        selectableIds.length > 0 &&
        selectableIds.every((id) => selectedIds.includes(id));

    return (
        <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-epo-slate-50">
                            <th className="w-10 px-3 py-2.5 text-left">
                                <input
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={onToggleSelectAll}
                                    disabled={selectableIds.length === 0}
                                    className="w-4 h-4 cursor-pointer accent-epo-green-500"
                                    title="Sélectionner tous les documents signables en masse"
                                />
                            </th>
                            {['N°', 'Type', 'Objet', 'Provenance', 'Priorité', 'Reçu le', 'Échéance', 'État', ''].map((h, i) => (
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
                            const type = TYPES_DOCUMENTS[d.type];
                            const prov = PROVENANCES[d.provenence];
                            const niveau = computeNiveau(d.tempsRestantMin);
                            const niveauInfo = NIVEAUX_INFO[niveau];
                            const isSelected = selectedIds.includes(d.id);
                            const isMasseEligible = peutSignerEnMasse(d);
                            const isConfidentiel = d.priorite === 'confidentiel';

                            return (
                                <tr
                                    key={d.id}
                                    className={`
                                        border-t cursor-pointer transition
                                        ${isSelected ? 'bg-epo-green-50/60' : 'border-epo-slate-100 hover:bg-epo-slate-50'}
                                        ${isConfidentiel ? 'bg-epo-slate-50/40' : ''}
                                    `}
                                    onClick={() => isMasseEligible && onToggleSelect(d.id)}
                                >
                                    <td className="px-3 py-2.5">
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            disabled={!isMasseEligible}
                                            onChange={() => onToggleSelect(d.id)}
                                            onClick={(e) => e.stopPropagation()}
                                            className={`
                                                w-4 h-4 accent-epo-green-500
                                                ${isMasseEligible ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'}
                                            `}
                                            title={
                                                !isMasseEligible
                                                    ? isConfidentiel
                                                        ? 'Les documents confidentiels ne peuvent pas être signés en masse (RG-11)'
                                                        : 'Signable uniquement au cas par cas'
                                                    : 'Sélectionner pour signature en masse'
                                            }
                                        />
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <span className="font-mono text-[12px] font-semibold text-epo-slate-800">
                                            {d.id}
                                        </span>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${type.color}`}>
                                            <i className={`fas ${type.icon} text-[9.5px]`} />
                                            {type.label}
                                        </span>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <div className="min-w-0">
                                            <div className="text-[12.5px] font-medium text-epo-slate-800 truncate max-w-[240px]">
                                                {d.objet}
                                            </div>
                                            <div className="flex items-center gap-1 mt-0.5 text-[11px] text-epo-slate-500">
                                                <i className="fas fa-user text-[9.5px] text-epo-slate-400" />
                                                {d.expediteur}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <span className="inline-flex items-center gap-1.5 text-[12px] text-epo-slate-700">
                                            <i className={`fas ${prov?.icon} text-[10px] text-epo-slate-400`} />
                                            {d.provenence}
                                        </span>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <PriorityTag priority={d.priorite} />
                                    </td>

                                    <td className="px-3 py-2.5 text-[11.5px] tabular-nums text-epo-slate-500 whitespace-nowrap">
                                        {formatDateHeure(d.dateReceptionDG)}
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${niveauInfo.chip}`}>
                                            <i className={`fas ${niveauInfo.icon} text-[9px]`} />
                                            {d.tempsRestantMin < 0
                                                ? `+${formatDuree(d.tempsRestantMin)}`
                                                : formatDuree(d.tempsRestantMin)}
                                        </span>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <StatusBadge status={d.etat} />
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onSigner(d);
                                            }}
                                            className="text-[12px] font-semibold text-epo-green-600 hover:underline whitespace-nowrap"
                                        >
                                            {d.etat === 'a-re-signer' ? 'Revoir' : 'Signer'}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-[12.5px] border-t border-epo-slate-200 text-epo-slate-500">
                <span>{documents.length} document{documents.length > 1 ? 's' : ''} affiché{documents.length > 1 ? 's' : ''}</span>
                <span className="text-epo-slate-400">
                    <i className="mr-1 fas fa-info-circle" />
                    Les documents confidentiels ne sont pas signables en masse (RG-11)
                </span>
            </div>
        </div>
    );
}