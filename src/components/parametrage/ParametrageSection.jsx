// src/components/parametrage/ParametrageSection.jsx
import { useState } from 'react';

/**
 * Section repliable d'accordéon.
 *
 * Props :
 *   - icon, title, description
 *   - badge (texte ou node - ex: "2 actives")
 *   - badgeVariant: 'default' | 'success' | 'warning' | 'danger' | 'info'
 *   - defaultOpen
 *   - children
 */
export default function ParametrageSection({
    icon,
    title,
    description,
    badge,
    badgeVariant = 'default',
    defaultOpen = false,
    children,
}) {
    const [open, setOpen] = useState(defaultOpen);

    const badgeClasses = {
        default: 'bg-epo-slate-100 text-epo-slate-700',
        success: 'bg-epo-green-50 text-epo-green-700',
        warning: 'bg-epo-yellow-50 text-epo-yellow-700',
        danger: 'bg-epo-red-50 text-epo-red-700',
        info: 'bg-epo-slate-700 text-white',
    };

    return (
        <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center w-full gap-3 p-4 text-left transition sm:p-5 hover:bg-epo-slate-50"
            >
                <span className={`
                    flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg
                    ${open ? 'bg-epo-green-50 text-epo-green-600' : 'bg-epo-slate-100 text-epo-slate-500'}
                    transition
                `}>
                    <i className={`fas ${icon}`} />
                </span>

                <div className="flex-1 min-w-0">
                    <div className="text-[14.5px] font-semibold text-epo-slate-800">
                        {title}
                    </div>
                    {description && (
                        <div className="mt-0.5 text-[12.5px] text-epo-slate-500 truncate">
                            {description}
                        </div>
                    )}
                </div>

                {badge && (
                    <span className={`px-2.5 py-1 rounded-full text-[11.5px] font-semibold flex-shrink-0 ${badgeClasses[badgeVariant]}`}>
                        {badge}
                    </span>
                )}

                <i className={`
                    flex-shrink-0 text-epo-slate-400 text-[12px] ml-1
                    fas fa-chevron-${open ? 'up' : 'down'}
                    transition-transform
                `} />
            </button>

            {open && (
                <div className="px-4 pb-4 border-t sm:px-5 sm:pb-5 border-epo-slate-100">
                    <div className="pt-4">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}