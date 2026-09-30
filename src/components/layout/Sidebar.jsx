import { NavLink } from 'react-router-dom';
import { getNavigationForRole } from '../../config/navigation.js';

const BADGE_VARIANTS = {
    red: 'bg-epo-red-500 text-white',
    amber: 'bg-epo-yellow-500 text-epo-slate-800',
    green: 'bg-epo-green-500 text-white',
};

/**
 * Menu latéral avec navigation par sections.
 *
 * Props :
 *   - role : 'sg' | 'dg' | 'scc' | 'liaison' | 'admin'
 *   - collapsed : bool (pour un mode compact si besoin plus tard)
 */
export default function Sidebar({ role = 'sg', collapsed = false }) {
    const sections = getNavigationForRole(role);

    return (
        <aside
            className={`
                hidden lg:flex flex-col flex-shrink-0
                sticky top-[68px]
                h-[calc(100vh-68px)]
                bg-white
                border-r border-epo-slate-200
                overflow-y-auto
                transition-all duration-200
                ${collapsed ? 'w-[72px] px-2' : 'w-60 px-4'}
                py-5
            `}
        >
            {sections.map((section, sIndex) => (
                <div key={sIndex} className="mb-2">
                    {!collapsed && (
                        <div className="px-3 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-epo-slate-400">
                            {section.label}
                        </div>
                    )}

                    <div className="flex flex-col gap-0.5">
                        {section.items.map((item, iIndex) => (
                            <SidebarItem
                                key={iIndex}
                                item={item}
                                collapsed={collapsed}
                            />
                        ))}
                    </div>

                    {sIndex < sections.length - 1 && (
                        <div className="my-2 mx-3 h-px bg-epo-slate-200" />
                    )}
                </div>
            ))}

            {/* Footer du sidebar */}
            <div className="mt-auto pt-4 border-t border-epo-slate-200">
                <button
                    type="button"
                    className={`
                        w-full flex items-center gap-3
                        px-3 py-2.5
                        rounded-lg
                        text-sm font-medium text-epo-slate-500
                        transition
                        hover:bg-epo-slate-100 hover:text-epo-slate-800
                        ${collapsed ? 'justify-center' : ''}
                    `}
                >
                    <i className="fas fa-sign-out-alt text-base" />
                    {!collapsed && <span>Déconnexion</span>}
                </button>
            </div>
        </aside>
    );
}

/**
 * Item du sidebar.
 */
function SidebarItem({ item, collapsed }) {
    const badge = item.badge;
    const badgeClass = badge ? BADGE_VARIANTS[badge.variant] || BADGE_VARIANTS.red : '';

    return (
        <NavLink
            to={item.path}
            end
            title={collapsed ? item.label : undefined}
            className={({ isActive }) => `
                flex items-center gap-3
                px-3 py-2.5
                rounded-lg
                text-sm font-medium
                transition
                ${collapsed ? 'justify-center' : ''}
                ${
                    isActive
                        ? 'bg-epo-green-50 text-epo-green-700 font-semibold'
                        : 'text-epo-slate-600 hover:bg-epo-slate-100 hover:text-epo-slate-800'
                }
            `}
        >
            {({ isActive }) => (
                <>
                    <i
                        className={`
                            fas ${item.icon} text-base w-5 text-center
                            ${isActive ? 'text-epo-green-600' : 'text-epo-slate-400'}
                        `}
                    />
                    {!collapsed && (
                        <>
                            <span className="flex-1 truncate">{item.label}</span>
                            {badge && (
                                <span
                                    className={`
                                        text-[10px] font-semibold
                                        px-2 py-0.5
                                        rounded-full
                                        ${badgeClass}
                                    `}
                                >
                                    {badge.count}
                                </span>
                            )}
                        </>
                    )}
                </>
            )}
        </NavLink>
    );
}