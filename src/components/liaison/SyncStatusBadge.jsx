// src/components/liaison/SyncStatusBadge.jsx
import InlineTag from '../ui/InlineTag.jsx';

export default function SyncStatusBadge({ online = true, pendingCount = 0 }) {
    if (online && pendingCount === 0) {
        return (
            <span className="inline-flex items-center gap-2 text-sm text-epo-slate-800">
                <span className="w-2 h-2 rounded-full bg-epo-green-600" aria-hidden="true" />
                En ligne
            </span>
        );
    }

    if (pendingCount > 0) {
        return (
            <InlineTag icon={online ? 'fa-rotate' : 'fa-wifi'} tone={online ? 'warning' : 'danger'}>
                {online ? `${pendingCount} à synchroniser` : `Hors ligne · ${pendingCount} en attente`}
            </InlineTag>
        );
    }

    return (
        <InlineTag icon="fa-wifi" tone="danger">
            Hors ligne
        </InlineTag>
    );
}
