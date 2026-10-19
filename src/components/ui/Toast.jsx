import { useCallback, useEffect, useRef, useState } from 'react';
import { subscribeToasts } from './notify.js';

/* ============================================================
   ZONE D'AFFICHAGE DES NOTIFICATIONS (montée une fois dans App)
   ============================================================ */

export function ToastViewport() {
    const [toasts, setToasts] = useState([]);

    useEffect(
        () => subscribeToasts((toast) => setToasts((prev) => [...prev.slice(-3), toast])),
        []
    );

    const remove = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <div
            className="fixed z-[2000] flex flex-col gap-3 pointer-events-none top-20 right-4 left-4 sm:left-auto sm:w-[400px]"
            aria-live="polite"
        >
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onRemove={remove} />
            ))}
        </div>
    );
}

/* ============================================================
   NOTIFICATION INDIVIDUELLE
   ============================================================ */

const VARIANTES = {
    success: { icon: 'fa-circle-check', color: 'text-epo-green-700', bar: 'bg-epo-green-600', role: 'status' },
    error:   { icon: 'fa-circle-xmark', color: 'text-epo-red-600', bar: 'bg-epo-red-600', role: 'alert' },
    warning: { icon: 'fa-triangle-exclamation', color: 'text-epo-yellow-700', bar: 'bg-epo-yellow-500', role: 'alert' },
    info:    { icon: 'fa-circle-info', color: 'text-epo-slate-600', bar: 'bg-epo-slate-500', role: 'status' },
};

function Toast({ toast, onRemove }) {
    const [leaving, setLeaving] = useState(false);
    const [paused, setPaused] = useState(false);
    const timerRef = useRef(null);
    const variant = VARIANTES[toast.variant] || VARIANTES.info;
    const duration = toast.duration || 5000;

    const close = useCallback(() => {
        setLeaving(true);
        setTimeout(() => onRemove(toast.id), 200);
    }, [onRemove, toast.id]);

    // Fermeture automatique, suspendue au survol pour laisser le temps de lire
    useEffect(() => {
        if (paused) return;
        timerRef.current = setTimeout(close, duration);
        return () => clearTimeout(timerRef.current);
    }, [paused, close, duration]);

    return (
        <div
            role={variant.role}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className={`
                pointer-events-auto relative overflow-hidden
                bg-white border border-epo-slate-200 rounded-xl shadow-elevated
                transition-all duration-200
                ${leaving ? 'opacity-0 translate-x-4' : 'opacity-100 animate-fade-in-up'}
            `}
        >
            <div className="flex items-start gap-3 p-4">
                <i className={`fas ${variant.icon} text-lg mt-0.5 ${variant.color}`} aria-hidden="true" />

                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-epo-slate-900">{toast.title}</p>
                    {toast.message && (
                        <p className="mt-1 text-sm text-epo-slate-600">{toast.message}</p>
                    )}
                    {toast.items?.length > 0 && (
                        <ul className="mt-2 space-y-1 text-sm text-epo-slate-600">
                            {toast.items.map((item, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="mt-2 w-1 h-1 rounded-full bg-epo-slate-400 flex-shrink-0" aria-hidden="true" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    {toast.action && (
                        <button
                            type="button"
                            onClick={() => {
                                toast.action.onClick?.();
                                close();
                            }}
                            className="mt-2.5 text-sm font-semibold text-epo-green-700 hover:underline"
                        >
                            {toast.action.label}
                        </button>
                    )}
                </div>

                <button
                    type="button"
                    onClick={close}
                    aria-label="Fermer la notification"
                    className="flex items-center justify-center flex-shrink-0 w-8 h-8 -mt-1 -mr-1 transition-colors rounded-lg text-epo-slate-500 hover:bg-epo-slate-100 hover:text-epo-slate-900"
                >
                    <i className="fas fa-xmark" aria-hidden="true" />
                </button>
            </div>

            {/* Temps restant avant fermeture */}
            <div className="h-1 bg-epo-slate-100">
                <div
                    className={`h-full ${variant.bar} animate-shrink`}
                    style={{
                        animationDuration: `${duration}ms`,
                        animationPlayState: paused ? 'paused' : 'running',
                    }}
                />
            </div>
        </div>
    );
}
