// src/components/stats/DelaiBar.jsx

/**
 * Barre horizontale délai réel vs cible.
 *
 * Props :
 *   - etape, reel (minutes), cible (minutes), unite
 */
export default function DelaiBar({ etape, reel, cible, unite = 'min', respect }) {
    // Barre plafonnée à 100%, sauf si dépassement → on montre 100% en rouge
    const ratio = Math.min(reel / cible, 1);
    const largeur = ratio * 100;

    // Formatage humain
    const formatDuree = (min) => {
        if (min < 60) return `${min} min`;
        const h = Math.floor(min / 60);
        const m = min % 60;
        if (h < 24) return m > 0 ? `${h}h ${m}min` : `${h}h`;
        const j = Math.floor(h / 24);
        const hh = h % 24;
        return hh > 0 ? `${j}j ${hh}h` : `${j}j`;
    };

    const barColor = respect
        ? 'bg-epo-green-500'
        : reel > cible * 2
        ? 'bg-epo-red-500'
        : 'bg-epo-yellow-500';

    const textColor = respect
        ? 'text-epo-green-700'
        : reel > cible * 2
        ? 'text-epo-red-700'
        : 'text-epo-yellow-700';

    return (
        <div className="flex items-center gap-3 py-2">
            <div className="w-44 flex-shrink-0 text-[13px] font-medium text-epo-slate-700">
                {etape}
            </div>

            <div className="flex-1 relative">
                <div className="h-2.5 bg-epo-slate-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all ${barColor}`}
                        style={{ width: `${largeur}%` }}
                    />
                </div>

                {/* Marqueur de la cible */}
                <div
                    className="absolute top-0 bottom-0 w-px bg-epo-slate-400"
                    style={{ left: '100%' }}
                    title={`Cible : ${formatDuree(cible)}`}
                />
            </div>

            <div className="w-24 flex-shrink-0 text-right">
                <div className={`text-[13px] font-bold tabular-nums ${textColor}`}>
                    {formatDuree(reel)}
                </div>
                <div className="text-[10.5px] text-epo-slate-400">
                    cible {formatDuree(cible)}
                </div>
            </div>

            <div className="w-6 flex-shrink-0 text-center">
                {respect ? (
                    <i className="fas fa-check-circle text-epo-green-500" title="Respecté" />
                ) : (
                    <i className="fas fa-exclamation-triangle text-epo-red-500" title="Dépassement" />
                )}
            </div>
        </div>
    );
}