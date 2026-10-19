import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoEpo from '../../assets/logo-epo.jpeg';
import NotificationDropdown from '../ui/NotificationDropdown.jsx';

function getInitials(name = '') {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('');
}

/**
 * Barre supérieure de la zone de travail : menu (mobile), recherche,
 * notifications et compte de l'utilisateur.
 *
 * Props :
 *   - user          : { name, role, email }
 *   - homePath      : tableau de bord du rôle (logo sur mobile)
 *   - notifications : Array de notifications
 *   - onMenuClick   : ouvre le menu latéral (tablette / mobile)
 *   - onLogout      : déconnexion
 */
export default function Topbar({ user, homePath = '/', notifications = [], onMenuClick, onLogout }) {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        const query = searchValue.trim();
        if (!query) return;
        navigate('/sg/recherche-avancee', { state: { query } });
    };

    return (
        <header className="sticky top-0 z-40 flex items-center h-16 gap-3 px-3 bg-ground border-b sm:px-4 lg:px-6 border-ground-line">
            {/* Menu + identité (tablette / mobile, le menu latéral étant masqué) */}
            <button
                type="button"
                onClick={onMenuClick}
                aria-label="Ouvrir le menu"
                className="flex items-center justify-center w-10 h-10 rounded-lg lg:hidden text-epo-slate-700 hover:bg-epo-slate-100"
            >
                <i className="text-lg fas fa-bars" aria-hidden="true" />
            </button>
            <Link to={homePath} className="flex items-center flex-shrink-0 gap-2.5 lg:hidden">
                <img src={logoEpo} alt="École Polytechnique de Ouagadougou" className="object-contain w-auto h-9" />
                <span className="hidden text-sm font-semibold sm:block text-epo-slate-900">Gestion des courriers</span>
            </Link>

            <div className="flex items-center flex-1 min-w-0 gap-2 sm:gap-3">
                {/* Recherche */}
                <form onSubmit={handleSearch} role="search" className="flex-1 hidden max-w-md md:block">
                    <label htmlFor="global-search" className="sr-only">
                        Rechercher un courrier
                    </label>
                    <div className="relative">
                        <i
                            className="absolute text-sm -translate-y-1/2 pointer-events-none fas fa-magnifying-glass left-3.5 top-1/2 text-epo-slate-500"
                            aria-hidden="true"
                        />
                        <input
                            id="global-search"
                            type="search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Rechercher un courrier, un acte…"
                            className="w-full h-10 pl-10 pr-4 text-sm transition-colors border rounded-lg outline-none bg-white border-ground-line text-epo-slate-900 placeholder:text-epo-slate-500 focus:bg-white focus:border-epo-green-600 focus:ring-2 focus:ring-epo-green-600/20"
                        />
                    </div>
                </form>

                <div className="flex items-center flex-shrink-0 gap-1 ml-auto sm:gap-2">
                    <NotificationDropdown notifications={notifications} />
                    <UserMenu user={user} onLogout={onLogout} />
                </div>
            </div>
        </header>
    );
}

/**
 * Compte de l'utilisateur connecté + menu déroulant.
 */
function UserMenu({ user, onLogout }) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
        };
        const handleEscape = (e) => e.key === 'Escape' && setOpen(false);
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [open]);

    return (
        <div ref={wrapperRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
                className="flex items-center gap-2.5 h-11 pl-1 pr-2 rounded-lg hover:bg-epo-slate-100"
            >
                <span className="flex items-center justify-center text-sm font-semibold text-white rounded-full w-9 h-9 bg-shell">
                    {getInitials(user.name)}
                </span>
                <span className="hidden text-left xl:block">
                    <span className="block text-sm font-semibold leading-tight text-epo-slate-900">{user.name}</span>
                    <span className="block text-xs leading-tight text-epo-slate-500">{user.role}</span>
                </span>
                <i className="hidden text-xs fas fa-chevron-down text-epo-slate-500 sm:block" aria-hidden="true" />
            </button>

            {open && (
                <div
                    role="menu"
                    className="absolute right-0 z-50 w-64 py-2 mt-2 bg-white border top-full border-epo-slate-200 rounded-xl shadow-elevated animate-fade-in-up"
                >
                    <div className="px-4 pt-1 pb-3 border-b border-epo-slate-100">
                        <p className="text-sm font-semibold text-epo-slate-900">{user.name}</p>
                        <p className="text-sm text-epo-slate-600">{user.role}</p>
                        <p className="mt-1 text-xs truncate text-epo-slate-500">{user.email}</p>
                    </div>
                    <button
                        type="button"
                        role="menuitem"
                        onClick={onLogout}
                        className="flex items-center w-full gap-3 px-4 py-2.5 mt-1 text-sm font-medium text-left transition-colors text-epo-slate-900 hover:bg-epo-red-50"
                    >
                        <i className="w-4 text-center fas fa-right-from-bracket" aria-hidden="true" />
                        Se déconnecter
                    </button>
                </div>
            )}
        </div>
    );
}
