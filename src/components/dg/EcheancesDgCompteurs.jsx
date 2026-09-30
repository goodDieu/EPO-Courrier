// src/components/dg/EcheancesDgCompteurs.jsx
import { TYPES_ACTIONS } from '../../data/echeancesDG.js';

export default function EcheancesDgCompteurs({ counts, actif, onChange }) {
    const ordre = ['signer', 'valider', 'instruire', 'confidentiel'];

    return (
        <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-4">
            {ordre.map((key) => {
                const t = TYPES_ACTIONS[key];
                const count = counts?.[key] ?? 0;
                const isActive = actif === key;
                const disabled = count === 0;

                return (
                    <button
                        key={key}
                        onClick={() => onChange(isActive ? '' : key)}
                        disabled={disabled}
                        className={`
                            relative text-left bg-white border rounded-xl p-4
                            transition
                            ${isActive
                                ? 'border-2 border-epo-slate-800 shadow-card'
                                : 'border-epo-slate-200 shadow-soft hover:shadow-card hover:-translate-y-0.5'}
                            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                    >
                        <div className="flex items-center justify-between mb-1.5">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${t.chip}`}>
                                <i className={`fas ${t.icon} text-[13px]`} />
                            </span>
                            {isActive && (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-epo-slate-800">
                                    Actif
                                </span>
                            )}
                        </div>

                        <div className="text-[11.5px] font-semibold uppercase tracking-wider text-epo-slate-500">
                            {t.label}
                        </div>
                        <div className="text-2xl font-bold mt-0.5 tabular-nums text-epo-slate-900">
                            {count}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}