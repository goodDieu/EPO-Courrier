// src/components/actes/NatureBadge.jsx
import { NATURES_ACTES } from '../../data/actes.js';

export default function NatureBadge({ nature, size = 'md' }) {
    const n = NATURES_ACTES[nature];
    if (!n) return null;

    const padding = size === 'sm' ? 'px-2 py-0.5 text-[10.5px]' : 'px-2.5 py-1 text-[11.5px]';

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${padding} ${n.color}`}>
            <i className={`fas ${n.icon} text-[10px]`} />
            {n.shortLabel}
        </span>
    );
}