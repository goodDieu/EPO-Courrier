// src/components/scc/TypePieceBadge.jsx
import { TYPES_PIECES } from '../../data/scanSCC.js';
import InlineTag from '../ui/InlineTag.jsx';

export default function TypePieceBadge({ type }) {
    const t = TYPES_PIECES[type];
    if (!t) return null;

    return <InlineTag icon={t.icon}>{t.label}</InlineTag>;
}
