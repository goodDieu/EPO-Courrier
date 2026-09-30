// src/components/liaison/SyncStatusBadge.jsx

export default function SyncStatusBadge({ online = true, pendingCount = 0 }) {
    if (online && pendingCount === 0) {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-epo-green-50 text-epo-green-700 text-[11.5px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-epo-green-500 animate-pulse" />
                En ligne
            </span>
        );
    }

    if (!online && pendingCount > 0) {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-epo-red-50 text-epo-red-700 text-[11.5px] font-semibold">
                <i className="fas fa-wifi text-[10px] opacity-50" />
                Hors ligne · {pendingCount} en attente
            </span>
        );
    }

    if (pendingCount > 0) {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-epo-yellow-50 text-epo-yellow-700 text-[11.5px] font-semibold">
                <i className="fas fa-sync fa-spin text-[10px]" />
                {pendingCount} à synchroniser
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-epo-red-50 text-epo-red-700 text-[11.5px] font-semibold">
            <i className="fas fa-wifi text-[10px] opacity-50" />
            Hors ligne
        </span>
    );
}