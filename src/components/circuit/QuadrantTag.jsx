// src/components/circuit/QuadrantTag.jsx
// Niveau de priorité donné au tri par le secrétariat du SG.
import { InlineTag } from '../ui';
import { QUADRANTS } from '../../data/circuit.js';

export default function QuadrantTag({ quadrant }) {
    const q = QUADRANTS[quadrant];
    if (!q) return <span className="text-sm text-epo-slate-500">Non trié</span>;
    return (
        <InlineTag icon={q.icon} tone={q.tone}>
            {q.label}
        </InlineTag>
    );
}
