// src/components/scc/ClassificationBadge.jsx
import { CLASSIFICATIONS } from '../../data/arriveesSCC.js';

export default function ClassificationBadge({ classification, size = 'md' }) {
    const c = CLASSIFICATIONS[classification];
    if (!c) return null;

    const padding = size === 'sm' ? 'px-2 py-0.5 text-[10.5px]' : 'px-2.5 py-1 text-[11.5px]';

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${padding} ${c.chip}`}>
            <i className={`fas ${c.icon} text-[10px]`} />
            {c.shortLabel}
        </span>
    );
}