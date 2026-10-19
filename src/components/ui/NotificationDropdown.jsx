import { useState, useRef, useEffect } from 'react';

const ICONS = {
    red: { icon: 'fa-triangle-exclamation', bg: 'bg-epo-slate-50', color: 'text-epo-slate-900' },
    blue: { icon: 'fa-circle-check', bg: 'bg-epo-green-50', color: 'text-epo-green-700' },
    amber: { icon: 'fa-clock', bg: 'bg-epo-yellow-50', color: 'text-epo-yellow-700' },
    green: { icon: 'fa-check-double', bg: 'bg-epo-green-50', color: 'text-epo-green-700' },
    purple: { icon: 'fa-lock', bg: 'bg-epo-slate-100', color: 'text-epo-slate-700' },
};

/**
 * Cloche de notifications : pastille avec le nombre de non-lues et liste déroulante.
 * Se ferme au clic extérieur ou avec Échap.
 */
export default function NotificationDropdown({ notifications = [] }) {
    const [open, setOpen] = useState(false);
    const [allRead, setAllRead] = useState(false);
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

    const unreadCount = allRead ? 0 : notifications.length;

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={unreadCount ? `Notifications, ${unreadCount} non lues` : 'Notifications'}
                aria-expanded={open}
                className="relative flex items-center justify-center w-10 h-10 transition-colors rounded-lg text-epo-slate-600 hover:bg-epo-slate-100 hover:text-epo-slate-900"
            >
                <i className="text-lg fas fa-bell" aria-hidden="true" />
                {unreadCount > 0 && (
                    <span className="absolute flex items-center justify-center h-5 px-1 text-xs font-semibold text-white border-2 border-white rounded-full min-w-[1.25rem] -top-0.5 -right-0.5 bg-epo-red-600">
                        {unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-2 overflow-hidden bg-white border top-full w-[min(24rem,calc(100vw-2rem))] border-epo-slate-200 rounded-xl shadow-elevated animate-fade-in-up">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-epo-slate-200">
                        <span className="text-sm font-semibold text-epo-slate-900">Notifications</span>
                        {unreadCount > 0 && (
                            <button
                                type="button"
                                onClick={() => setAllRead(true)}
                                className="text-sm font-medium text-epo-green-700 hover:underline"
                            >
                                Tout marquer comme lu
                            </button>
                        )}
                    </div>

                    {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-sm text-center text-epo-slate-500">
                            Aucune notification
                        </div>
                    ) : (
                        <ul className="overflow-y-auto max-h-[400px]">
                            {notifications.map((notif) => {
                                const cfg = ICONS[notif.color] || ICONS.blue;
                                return (
                                    <li
                                        key={notif.id}
                                        className={`flex items-start gap-3 px-4 py-3 border-b border-epo-slate-100 last:border-b-0 ${
                                            allRead ? '' : 'bg-epo-green-50/40'
                                        }`}
                                    >
                                        <span className={`flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-full ${cfg.bg} ${cfg.color}`}>
                                            <i className={`fas ${cfg.icon} text-sm`} aria-hidden="true" />
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-epo-slate-900">{notif.title}</p>
                                            <p className="mt-0.5 text-sm text-epo-slate-700">{notif.message}</p>
                                            <p className="mt-1 text-xs text-epo-slate-500">{notif.time}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
