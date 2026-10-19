// src/components/actes/NatureBadge.jsx
import { NATURES_ACTES } from '../../data/actes.js';
import InlineTag from '../ui/InlineTag.jsx';

export default function NatureBadge({ nature }) {
    const n = NATURES_ACTES[nature];
    if (!n) return null;

    return <InlineTag icon={n.icon}>{n.shortLabel}</InlineTag>;
}
