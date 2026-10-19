import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logoEpo from '../../assets/logo-epo.jpeg';
import { getNavigationForRole } from '../../config/navigation.js';
import { useNavCounts } from '../../config/useNavCounts.js';

/**
 * Menu latéral vert sapin : identité de la plateforme, files de travail du rôle,
 * déconnexion.
 *   - Grand écran (≥ 1024 px) : colonne fixe sur toute la hauteur.
 *   - Tablette / mobile : tiroir ouvert par le bouton "Menu" de la barre du haut.
 *
 * Props :
 *   - role     : 'sg' | 'dg' | 'scc' | 'liaison' | 'admin' | 'sp_sg' | 'sp_dg'
 *   - homePath : tableau de bord du rôle (clic sur le logo)
 *   - open     : bool - tiroir ouvert (mobile)
 *   - onClose  : function - ferme le tiroir
 *   - onLogout : function
 */
export default function Sidebar({ role = 'sg', homePath = '/', open = false, onClose, onLogout }) {
    // Les sections vides (entrées commentées dans la configuration) ne s'affichent pas
    const sections = getNavigationForRole(role).filter((s) => s.items.length > 0);
    const showSectionLabels = sections.length > 1;
    const counts = useNavCounts(role);

    // Échap ferme le tiroir
    useEffect(() => {
        if (!open) return;
        const handler = (e) => e.key === 'Escape' && onClose?.();
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [open, onClose]);

    const brand = (
        <NavLink
            to={homePath}
            onClick={onClose}
            className="flex items-center h-16 gap-3 pl-4 pr-12 lg:pr-4 focus-visible:outline-white focus-visible:-outline-offset-4"
        >
            <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 p-1 bg-white rounded-lg">
                <img src={logoEpo} alt="" className="object-contain w-full h-full" />
            </span>
            <span className="min-w-0">
                <span className="block text-sm font-semibold leading-tight text-white">
                    Gestion des courriers
                </span>
                <span className="block text-xs leading-tight text-shell-muted" title="École Polytechnique de Ouagadougou">
                    EPO · Ouagadougou
                </span>
            </span>
        </NavLink>
    );

    const navigation = (
        <nav className="flex-1 px-3 py-4 overflow-y-auto" aria-label="Menu principal">
            {sections.map((section, sIndex) => (
                <div key={section.label} className={sIndex > 0 ? 'mt-6' : ''}>
                    {showSectionLabels && (
                        <div className="px-3 pb-2 text-xs font-semibold tracking-wide uppercase text-shell-muted">
                            {section.label}
                        </div>
                    )}
                    <ul className="flex flex-col gap-1">
                        {section.items.map((item) => (
                            <li key={item.path}>
                                <SidebarItem item={item} badge={counts?.[item.path] ?? item.badge} onNavigate={onClose} />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </nav>
    );

    const footer = (
        <div className="px-3 py-3">
            <button
                type="button"
                onClick={onLogout}
                className="flex items-center w-full h-10 gap-3 px-3 text-sm font-medium transition-colors rounded-lg text-shell-muted hover:text-white focus-visible:outline-white"
            >
                <i className="w-5 text-base text-center fas fa-right-from-bracket text-shell-muted" aria-hidden="true" />
                Se déconnecter
            </button>
        </div>
    );

    return (
        <>
            {/* Grand écran */}
            <aside className="sticky top-0 flex-col flex-shrink-0 hidden w-64 h-screen lg:flex bg-shell">
                {brand}
                {navigation}
                {footer}
            </aside>

            {/* Tablette / mobile : tiroir */}
            {open && (
                <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
                    <div className="absolute inset-0 bg-epo-slate-900/50 animate-fade-in" onClick={onClose} />
                    <aside className="absolute inset-y-0 left-0 flex flex-col w-72 max-w-[85vw] bg-shell shadow-elevated animate-fade-in">
                        <div className="relative">
                            {brand}
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Fermer le menu"
                                className="absolute flex items-center justify-center w-10 h-10 -translate-y-1/2 rounded-lg top-1/2 right-2 text-shell-text hover:text-white focus-visible:outline-white"
                            >
                                <i className="text-lg fas fa-xmark" aria-hidden="true" />
                            </button>
                        </div>
                        {navigation}
                        {footer}
                    </aside>
                </div>
            )}
        </>
    );
}

/**
 * Entrée du menu. Aucun fond : le menu garde une seule couleur.
 * L'entrée active est signalée par un texte blanc en gras et un trait blanc à gauche.
 */
function SidebarItem({ item, badge, onNavigate }) {
    return (
        <NavLink
            to={item.path}
            end
            onClick={onNavigate}
            className={({ isActive }) => `
                relative flex items-center gap-3
                h-10 pl-4 pr-3
                rounded-lg
                text-sm
                transition-colors
                focus-visible:outline-white
                ${isActive ? 'text-white font-semibold' : 'text-shell-muted font-medium hover:text-white'}
            `}
        >
            {({ isActive }) => (
                <>
                    {isActive && <span className="absolute left-0 w-1 h-6 -translate-y-1/2 bg-white rounded-full top-1/2" aria-hidden="true" />}
                    <i className={`fas ${item.icon} w-5 text-center text-base`} aria-hidden="true" />
                    <span className="flex-1 min-w-0 truncate" title={item.label}>
                        {item.label}
                    </span>
                    {badge && badge.count > 0 && (
                        <span className="text-sm font-semibold tabular-nums" aria-label={`${badge.count} en attente`}>
                            {badge.count}
                        </span>
                    )}
                </>
            )}
        </NavLink>
    );
}
