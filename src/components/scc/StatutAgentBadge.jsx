// src/components/scc/StatutAgentBadge.jsx
import { STATUTS_AGENT } from '../../data/liaisonsSCC.js';

export default function StatutAgentBadge({ statut }) {
    const s = STATUTS_AGENT[statut];
    if (!s) return null;

    return (
        <span className="inline-flex items-center gap-2 text-sm whitespace-nowrap text-epo-slate-800">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} aria-hidden="true" />
            {s.label}
        </span>
    );
}
