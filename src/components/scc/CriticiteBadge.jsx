// src/components/scc/CriticiteBadge.jsx
import { computeNiveau, formatDuree } from '../../data/arriveesSCC.js';

const NIVEAUX = {
    depasse: { label: 'Dépassé', icon: 'fa-exclamation-circle', bg: 'bg-epo-red-50', text: 'text-epo-red-700' },
    jourJ: { label: 'Jour J', icon: 'fa-clock', bg: 'bg-epo-yellow-50', text: 'text-epo-yellow-800' },
    urgent: { label: 'Urgent', icon: 'fa-hourglass-half', bg: 'bg-epo-yellow-50', text: 'text-epo-yellow-700' },
    surveiller: { label: 'À surveiller', icon: 'fa-hourglass-start', bg: 'bg-epo-slate-50', text: 'text-epo-slate-700' },
    ok: { label: 'OK', icon: 'fa-check-circle', bg: 'bg-epo-green-50', text: 'text-epo-green-700' },
};

export default function CriticiteBadge({ tempsRestant, size = 'md' }) {
    const niveau = computeNiveau(tempsRestant);
    const n = NIVEAUX[niveau];
    const padding = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2 py-0.5 text-[11px]';

    return (
        <span className={`inline-flex items-center gap-1 rounded-full font-semibold ${padding} ${n.bg} ${n.text}`}>
            <i className={`fas ${n.icon} text-[9px]`} />
            {tempsRestant < 0
                ? `Dépassé de ${formatDuree(tempsRestant)}`
                : n.label === 'Jour J' || n.label === 'Urgent'
                    ? `Dans ${formatDuree(tempsRestant)}`
                    : n.label}
        </span>
    );
}