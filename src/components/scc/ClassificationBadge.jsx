// src/components/scc/ClassificationBadge.jsx
import { CLASSIFICATIONS } from '../../data/arriveesSCC.js';
import InlineTag from '../ui/InlineTag.jsx';

const TONES = { urgent: 'danger', confidentiel: 'strong' };

export default function ClassificationBadge({ classification }) {
    const c = CLASSIFICATIONS[classification];
    if (!c) return null;

    return (
        <InlineTag icon={classification === 'ordinaire' ? null : c.icon} tone={TONES[classification] || 'neutral'}>
            {c.shortLabel}
        </InlineTag>
    );
}
