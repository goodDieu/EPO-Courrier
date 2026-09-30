// src/components/scc/ModeRemiseBadge.jsx
import { MODES_REMISE } from '../../data/dispatchSCC.js';

export default function ModeRemiseBadge({ mode, size = 'md' }) {
    const m = MODES_REMISE[mode];
    if (!m) return null;

    const padding = size === 'sm' ? 'px-2 py-0.5 text-[10.5px]' : 'px-2.5 py-1 text-[11.5px]';

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${padding} ${m.chip}`}>
            <i className={`fas ${m.icon} text-[10px]`} />
            {m.shortLabel}
        </span>
    );
}