import { useState, useRef, useEffect } from 'react';

const ICONS = {
    red: { icon: 'fa-exclamation-triangle', bg: 'bg-epo-red-50', color: 'text-epo-red-500' },
    blue: { icon: 'fa-check-circle', bg: 'bg-epo-green-50', color: 'text-epo-green-500' },
    amber: { icon: 'fa-clock', bg: 'bg-epo-yellow-50', color: 'text-epo-yellow-600' },
    green: { icon: 'fa-check-double', bg: 'bg-epo-green-50', color: 'text-epo-green-500' },
    purple: { icon: 'fa-lock', bg: 'bg-purple-50', color: 'text-purple-500' },
};

/**
 * Dropdown de notifications avec badge et liste.
 * Se ferme automatiquement au clic extérieur.
 */
export default function NotificationDropdown({ notifications = [] }) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const hasUnread = notifications.length > 0;

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label="Notifications"
                className="
                    relative w-10 h-10 rounded-full
                    flex items-center justify-center
                    text-epo-slate-500
                    transition
                    hover:bg-epo-slate-100 hover:text-epo-slate-800
                "
            >
                <i className="fas fa-bell text-lg" />
                {hasUnread && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-epo-red-500 border-2 border-white" />
                )}
            </button>

            {open && (
                <div
                    className="
                        absolute top-[52px] right-0 z-50
                        w-80 sm:w-96
                        max-h-[400px] overflow-y-auto
                        bg-white
                        border border-epo-slate-200
                        rounded-xl
                        shadow-elevated
                        animate-fade-in-up
                    "
                >
                    {/* En-tête */}
                    <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-4 py-3 border-b border-epo-slate-200">
                        <span className="text-sm font-semibold text-epo-slate-800">
                            Notifications
                        </span>
                        <button
                            type="button"
                            className="text-xs font-medium text-epo-green-600 hover:underline"
                        >
                            Marquer tout comme lu
                        </button>
                    </div>

                    {/* Liste */}
                    {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-sm text-epo-slate-400 italic">
                            Aucune notification
                        </div>
                    ) : (
                        <div>
                            {notifications.map((notif) => {
                                const cfg = ICONS[notif.color] || ICONS.blue;
                                return (
                                    <div
                                        key={notif.id}
                                        className="
                                            flex items-start gap-3
                                            px-4 py-3
                                            border-b border-epo-slate-100
                                            last:border-b-0
                                            transition
                                            hover:bg-epo-slate-50
                                            cursor-pointer
                                        "
                                    >
                                        <div
                                            className={`
                                                w-8 h-8 rounded-full
                                                flex items-center justify-center
                                                flex-shrink-0
                                                ${cfg.bg} ${cfg.color}
                                            `}
                                        >
                                            <i className={`fas ${cfg.icon} text-sm`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[13px] font-medium text-epo-slate-800">
                                                {notif.title}
                                            </div>
                                            <div className="text-[13px] text-epo-slate-600 mt-0.5">
                                                {notif.message}
                                            </div>
                                            <div className="text-[11px] text-epo-slate-400 mt-1">
                                                {notif.time}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}