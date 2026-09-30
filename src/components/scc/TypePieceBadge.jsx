// src/components/scc/TypePieceBadge.jsx
import { TYPES_PIECES } from '../../data/scanSCC.js';

export default function TypePieceBadge({ type, size = 'md' }) {
    const t = TYPES_PIECES[type];
    if (!t) return null;

    const padding = size === 'sm' ? 'px-2 py-0.5 text-[10.5px]' : 'px-2.5 py-1 text-[11.5px]';

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${padding} ${t.color}`}>
            <i className={`fas ${t.icon} text-[10px]`} />
            {t.label}
        </span>
    );
}