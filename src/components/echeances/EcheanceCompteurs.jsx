// src/components/echeances/EcheanceCompteurs.jsx
import { NIVEAUX } from '../../data/echeances.js';

/**
 * 5 pastilles cliquables, une par niveau.
 * Click → filtre la liste.
 */
export default function EcheanceCompteurs({ counts, actif, onChange }) {
    const ordre = ['depasse', 'jourJ', 'urgent', 'surveiller', 'ok'];

    return (
        <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-3 lg:grid-cols-5">
            {ordre.map((key) => {
                const n = NIVEAUX[key];
                const count = counts?.[key] ?? 0;
                const isActive = actif === n.key;
                const disabled = count === 0;

                return (
                    <button
                        key={key}
                        onClick={() => onChange(isActive ? '' : n.key)}
                        disabled={disabled}
                        className={`
                            relative text-left bg-white border rounded-xl p-4
                            transition
                            ${isActive
                                ? `border-2 ${n.border.replace('border-l-', 'border-')} shadow-card`
                                : 'border-epo-slate-200 shadow-soft hover:shadow-card hover:-translate-y-0.5'}
                            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                    >
                        <div className="flex items-center justify-between mb-1.5">
                            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ${n.bg} ${n.text}`}>
                                <i className={`fas ${n.icon} text-[12px]`} />
                            </span>
                            {isActive && (
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${n.text}`}>
                                    Filtre actif
                                </span>
                            )}
                        </div>

                        <div className="text-[11.5px] font-semibold uppercase tracking-wider text-epo-slate-500">
                            {n.label}
                        </div>
                        <div className={`text-2xl font-bold mt-0.5 tabular-nums ${n.text}`}>
                            {count}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}