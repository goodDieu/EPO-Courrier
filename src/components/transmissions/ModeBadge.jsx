// src/components/transmissions/ModeBadge.jsx
import { MODES } from '../../data/transmissions.js';

export default function ModeBadge({ mode, size = 'md' }) {
    const m = MODES[mode];
    if (!m) return null;

    const padding = size === 'sm' ? 'px-2 py-0.5 text-[10.5px]' : 'px-2.5 py-1 text-[11.5px]';

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${padding} ${m.color}`}>
            <i className={`fas ${m.icon} text-[10px]`} />
            {m.label}
        </span>
    );
}