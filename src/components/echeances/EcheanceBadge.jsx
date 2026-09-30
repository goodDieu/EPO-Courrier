// src/components/echeances/EcheanceBadge.jsx
import { NIVEAUX } from '../../data/echeances.js';

export default function EcheanceBadge({ niveau, short = false, size = 'md' }) {
    const n = NIVEAUX[niveau] || NIVEAUX.ok;

    const padding = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-[11.5px]';
    const iconSize = size === 'sm' ? 'text-[9px]' : 'text-[10px]';

    return (
        <span
            className={`
                inline-flex items-center gap-1.5 rounded-full font-semibold
                ${padding} ${n.bg} ${n.text}
            `}
        >
            <i className={`fas ${n.icon} ${iconSize}`} />
            {short ? n.shortLabel : n.label}
        </span>
    );
}