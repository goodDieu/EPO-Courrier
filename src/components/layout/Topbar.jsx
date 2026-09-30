import { useState } from 'react';
import logoEpo from '../../assets/logo-epo.jpeg';
import NotificationDropdown from '../ui/NotificationDropdown.jsx';
import SystemStatusBadge from '../ui/SystemStatusBadge.jsx';

/**
 * Barre supérieure avec logo, recherche, badge système, notifications et profil.
 *
 * Props :
 *   - roleLabel : string (ex: "Secrétaire Général")
 *   - roleShort : string (ex: "SG" - utilisé pour l'avatar)
 *   - systemStatus : 'operational' | 'degraded' | 'offline'
 *   - notifications : Array de notifications
 *   - onSearch : fonction callback pour la recherche
 *   - onLogout : fonction callback pour la déconnexion
 */
export default function Topbar({
    roleLabel = 'Secrétaire Général',
    roleShort = 'SG',
    systemStatus = 'operational',
    notifications = [],
    onSearch = () => {},
    onLogout = () => {},
}) {
    const [searchValue, setSearchValue] = useState('');
    const [profileOpen, setProfileOpen] = useState(false);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <header
            className="
                sticky top-0 z-50
                h-16 sm:h-[68px]
                flex items-center justify-between
                px-4 sm:px-8
                bg-white/95 backdrop-blur
                border-b border-epo-slate-200
            "
        >
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-epo-slate-200 flex items-center justify-center p-1.5">
                    <img
                        src={logoEpo}
                        alt="EPO"
                        className="object-contain w-full h-full"
                    />
                </div>
                <div className="items-center hidden gap-2 sm:flex">
                    <span className="font-bold tracking-tight text-epo-slate-800">
                        EPO Courrier
                    </span>
                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-epo-slate-700 text-white uppercase tracking-wide">
                        Bêta
                    </span>
                </div>
            </div>

            {/* Recherche */}
            <div className="flex-1 hidden max-w-xl px-4 md:block">
                <div
                    className="flex items-center gap-2 px-4 py-2 transition border-2 border-transparent rounded-full  bg-epo-slate-100 focus-within:bg-white focus-within:border-epo-green-500 focus-within:shadow-sm"
                >
                    <i className="text-sm fas fa-search text-epo-slate-400" />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder="Rechercher un courrier, un acte, une référence..."
                        className="flex-1 text-sm bg-transparent border-none outline-none  text-epo-slate-800 placeholder:text-epo-slate-400"
                    />
                </div>
            </div>

            {/* Actions à droite */}
            <div className="flex items-center flex-shrink-0 gap-2">
                {/* Statut système */}
                <SystemStatusBadge
                    status={systemStatus}
                    onClick={() => console.log('Ouvrir panneau système')}
                />

                {/* Badge de rôle */}
                <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-epo-slate-100 text-epo-slate-600 text-[11px] font-medium">
                    <i className="fas fa-user-shield" />
                    {roleShort}
                </span>

                {/* Notifications */}
                <NotificationDropdown notifications={notifications} />

                {/* Profil */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setProfileOpen((v) => !v)}
                        className="flex items-center justify-center text-sm font-semibold text-white transition border-2 border-transparent rounded-full  w-9 h-9 bg-epo-slate-700 hover:border-epo-green-500"
                        title={roleLabel}
                    >
                        {roleShort}
                    </button>

                    {profileOpen && (
                        <div
                            className="
                                absolute top-[48px] right-0 z-50
                                w-56
                                bg-white
                                border border-epo-slate-200
                                rounded-xl
                                shadow-elevated
                                py-2
                                animate-fade-in-up
                            "
                        >
                            <div className="px-4 py-2 border-b border-epo-slate-100">
                                <div className="text-sm font-semibold text-epo-slate-800">
                                    {roleLabel}
                                </div>
                                <div className="text-xs text-epo-slate-500">
                                    Connecté
                                </div>
                            </div>
                            <button
                                type="button"
                                className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left transition  text-epo-slate-700 hover:bg-epo-slate-50"
                            >
                                <i className="text-xs fas fa-user text-epo-slate-400" />
                                Mon profil
                            </button>
                            <button
                                type="button"
                                className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left transition  text-epo-slate-700 hover:bg-epo-slate-50"
                            >
                                <i className="text-xs fas fa-cog text-epo-slate-400" />
                                Paramètres
                            </button>
                            <div className="my-1 border-t border-epo-slate-100" />
                            <button
                                type="button"
                                onClick={onLogout}
                                className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left transition  text-epo-red-600 hover:bg-epo-red-50"
                            >
                                <i className="text-xs fas fa-sign-out-alt" />
                                Déconnexion
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}