// src/components/scc/CriticiteBadge.jsx
import { computeNiveau, formatDuree } from '../../data/arriveesSCC.js';
import InlineTag from '../ui/InlineTag.jsx';

const NIVEAUX = {
    depasse: { label: 'Dépassé', icon: 'fa-circle-exclamation', tone: 'danger' },
    jourJ: { label: 'Jour J', icon: 'fa-clock', tone: 'warning' },
    urgent: { label: 'Urgent', icon: 'fa-hourglass-half', tone: 'warning' },
    surveiller: { label: 'À surveiller', icon: 'fa-hourglass-start', tone: 'neutral' },
    ok: { label: 'OK', icon: 'fa-check', tone: 'neutral' },
};

export default function CriticiteBadge({ tempsRestant }) {
    const niveau = computeNiveau(tempsRestant);
    const n = NIVEAUX[niveau];

    return (
        <InlineTag icon={n.icon} tone={n.tone}>
            {tempsRestant < 0
                ? `Dépassé de ${formatDuree(tempsRestant)}`
                : n.label === 'Jour J' || n.label === 'Urgent'
                    ? `Dans ${formatDuree(tempsRestant)}`
                    : n.label}
        </InlineTag>
    );
}
