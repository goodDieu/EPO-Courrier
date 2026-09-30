import { useState } from 'react';

const STATUS_CONFIG = {
    operational: {
        label: 'Opérationnel',
        className: 'bg-epo-green-50 text-epo-green-600 border-epo-green-200',
        dotClass: 'bg-epo-green-500 animate-status-pulse',
        icon: 'fa-circle',
        tooltip: "Tous les services sont opérationnels",
    },
    degraded: {
        label: 'Mode dégradé',
        className: 'bg-epo-yellow-50 text-epo-yellow-800 border-epo-yellow-200',
        dotClass: 'bg-epo-yellow-500 animate-status-pulse',
        icon: 'fa-exclamation-triangle',
        tooltip: "Certains services sont indisponibles - fonctionnement papier actif",
    },
    offline: {
        label: 'Hors service',
        className: 'bg-epo-red-50 text-epo-red-600 border-epo-red-200',
        dotClass: 'bg-epo-red-500',
        icon: 'fa-times-circle',
        tooltip: "Plateforme momentanément indisponible",
    },
};

/**
 * Badge d'état du système (RG-44 / 15.5).
 * Peut être cliqué pour ouvrir un panneau explicatif (à brancher plus tard).
 */
export default function SystemStatusBadge({
    status = 'operational',
    onClick,
}) {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.operational;

    return (
        <button
            type="button"
            onClick={onClick}
            title={config.tooltip}
            className={`
                flex items-center gap-2
                px-3 py-1.5
                rounded-full
                border
                text-[11px] font-medium
                transition
                hover:-translate-y-px hover:shadow-sm
                ${config.className}
            `}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
            <span className="hidden sm:inline">{config.label}</span>
        </button>
    );
}