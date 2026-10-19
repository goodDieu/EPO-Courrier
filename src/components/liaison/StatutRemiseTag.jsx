// src/components/liaison/StatutRemiseTag.jsx
import { STATUTS_REMISE } from '../../data/liaisonStats.js';

export default function StatutRemiseTag({ statut }) {
    const s = STATUTS_REMISE[statut];
    if (!s) return null;
    return (
        <span className={`inline-flex items-center gap-2 text-sm whitespace-nowrap text-epo-slate-800 ${statut === 'en-retard' || statut === 'bloque' ? 'font-medium' : ''}`}>
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} aria-hidden="true" />
            {s.label}
        </span>
    );
}
