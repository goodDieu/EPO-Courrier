// src/components/scc/ModeRemiseBadge.jsx
import { MODES_REMISE } from '../../data/dispatchSCC.js';
import InlineTag from '../ui/InlineTag.jsx';

export default function ModeRemiseBadge({ mode }) {
    const m = MODES_REMISE[mode];
    if (!m) return null;

    return <InlineTag icon={m.icon}>{m.shortLabel}</InlineTag>;
}
