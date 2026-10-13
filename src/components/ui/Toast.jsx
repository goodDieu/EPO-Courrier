// src/components/ui/Toast.jsx
import { useEffect, useState } from 'react';

/* ============================================================
   CONTENEUR DE TOASTS
   ============================================================ */

export function ToastContainer({ toasts, onRemove }) {
    return (
        <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-md w-full pointer-events-none">
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onRemove={onRemove} />
            ))}
        </div>
    );
}

/* ============================================================
   TOAST INDIVIDUEL
   ============================================================ */

const VARIANTES = {
    success: {
        bg: 'bg-white border-epo-green-300',
        iconBg: 'bg-epo-green-500',
        icon: 'fa-check',
        iconColor: 'text-white',
        bar: 'bg-epo-green-500',
    },
    error: {
        bg: 'bg-white border-epo-red-300',
        iconBg: 'bg-epo-red-500',
        icon: 'fa-times',
        iconColor: 'text-white',
        bar: 'bg-epo-red-500',
    },
    warning: {
        bg: 'bg-white border-epo-yellow-300',
        iconBg: 'bg-epo-yellow-500',
        icon: 'fa-exclamation',
        iconColor: 'text-white',
        bar: 'bg-epo-yellow-500',
    },
    info: {
        bg: 'bg-white border-epo-slate-300',
        iconBg: 'bg-epo-slate-700',
        icon: 'fa-info',
        iconColor: 'text-white',
        bar: 'bg-epo-slate-700',
    },
};

function Toast({ toast, onRemove }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    const variant = VARIANTES[toast.variant] || VARIANTES.info;

    useEffect(() => {
        // Animation d'entrée
        requestAnimationFrame(() => setIsVisible(true));

        // Auto-dismiss
        const timer = setTimeout(() => {
            handleClose();
        }, toast.duration || 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsLeaving(true);
        setTimeout(() => onRemove(toast.id), 300);
    };

    return (
        <div
            className={`
                pointer-events-auto relative overflow-hidden
                ${variant.bg} border-2 rounded-xl shadow-elevated
                transition-all duration-300
                ${isVisible && !isLeaving
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-full opacity-0'}
            `}
        >
            {/* Barre de progression */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-epo-slate-100">
                <div
                    className={`h-full ${variant.bar} animate-shrink`}
                    style={{
                        animationDuration: `${toast.duration || 5000}ms`,
                    }}
                />
            </div>

            <div className="flex items-start gap-3 p-4">
                {/* Icône */}
                <div className={`
                    flex items-center justify-center flex-shrink-0
                    w-9 h-9 rounded-full ${variant.iconBg} ${variant.iconColor}
                `}>
                    <i className={`fas ${variant.icon} text-[14px]`} />
                </div>

                {/* Contenu */}
                <div className="flex-1 min-w-0 pt-0.5">
                    <div className="text-[13.5px] font-semibold text-epo-slate-900">
                        {toast.title}
                    </div>
                    {toast.message && (
                        <div className="text-[12.5px] text-epo-slate-600 mt-0.5 leading-snug">
                            {toast.message}
                        </div>
                    )}
                    {toast.details && (
                        <div className="flex flex-col gap-1 pt-2 mt-2 border-t border-epo-slate-100">
                            {Object.entries(toast.details).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between gap-2 text-[11.5px]">
                                    <span className="text-epo-slate-500">{key}</span>
                                    <span className="font-semibold text-epo-slate-800 tabular-nums">
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                    {toast.action && (
                        <button
                            onClick={() => {
                                toast.action.onClick?.();
                                handleClose();
                            }}
                            className="
                                inline-flex items-center gap-1.5 mt-2.5
                                text-[12px] font-semibold text-epo-green-600
                                hover:underline transition
                            "
                        >
                            {toast.action.label}
                            <i className="fas fa-arrow-right text-[9px]" />
                        </button>
                    )}
                </div>

                {/* Bouton fermer */}
                <button
                    onClick={handleClose}
                    className="flex items-center justify-center flex-shrink-0 transition rounded-full w-7 h-7 text-epo-slate-400 hover:bg-epo-slate-100"
                    title="Fermer"
                >
                    <i className="fas fa-times text-[12px]" />
                </button>
            </div>
        </div>
    );
}