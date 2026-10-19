// src/components/scc/ModeDepartBadge.jsx
import { MODES_DEPART } from '../../data/departsSCC.js';
import InlineTag from '../ui/InlineTag.jsx';

export default function ModeDepartBadge({ mode }) {
    const m = MODES_DEPART[mode];
    if (!m) return null;

    return <InlineTag icon={m.icon}>{m.shortLabel}</InlineTag>;
}
