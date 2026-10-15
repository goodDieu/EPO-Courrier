// src/components/transmissions/ModeBadge.jsx
import { MODES } from '../../data/transmissions.js';
import InlineTag from '../ui/InlineTag.jsx';

export default function ModeBadge({ mode }) {
    const m = MODES[mode];
    if (!m) return null;

    return <InlineTag icon={m.icon}>{m.label}</InlineTag>;
}
