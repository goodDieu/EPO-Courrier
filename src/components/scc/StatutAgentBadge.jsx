// src/components/scc/StatutAgentBadge.jsx
import { STATUTS_AGENT } from '../../data/liaisonsSCC.js';

export default function StatutAgentBadge({ statut, size = 'md' }) {
    const s = STATUTS_AGENT[statut];
    if (!s) return null;

    const padding = size === 'sm' ? 'px-2 py-0.5 text-[10.5px]' : 'px-2.5 py-1 text-[11.5px]';

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${padding} ${s.chip}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {s.label}
        </span>
    );
}