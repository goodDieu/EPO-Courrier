// src/components/circuit/DecisionDgTag.jsx
// Décision du DG : signé, rejeté ou avis donné.
import InlineTag from '../ui/InlineTag.jsx';

export default function DecisionDgTag({ item }) {
    const s = item.source;
    if (item.sorte === 'courrier') return <InlineTag icon="fa-comment" tone="strong">Avis donné</InlineTag>;
    if (s.etat === 'rejete') return <InlineTag icon="fa-circle-xmark" tone="danger">Rejeté</InlineTag>;
    return (
        <span className="inline-flex items-center gap-1.5 text-sm font-medium whitespace-nowrap text-epo-slate-900">
            <i className="fas fa-circle-check text-[0.85em] text-epo-green-600" aria-hidden="true" />
            {s.signature === 'sg-delegation' ? 'Signé par délégation' : 'Signé'}
        </span>
    );
}
