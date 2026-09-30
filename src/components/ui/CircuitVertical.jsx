/**
 * Circuit vertical d'un courrier entrant (11 états).
 *
 * Props :
 *   - etats   : array de strings (liste ordonnée des états)
 *   - current : string (état actuel du dossier)
 */
export default function CircuitVertical({ etats = [], current }) {
    const idx = etats.indexOf(current);

    return (
        <div className="max-h-[340px] overflow-y-auto pr-1">
            {etats.map((label, i) => {
                const isDone = i < idx;
                const isCurrent = i === idx;

                return (
                    <div
                        key={label}
                        className="flex gap-2.5 relative pb-4 last:pb-0"
                    >
                        {/* Ligne verticale */}
                        {i < etats.length - 1 && (
                            <span className="absolute left-[7px] top-4 bottom-[-2px] w-0.5 bg-epo-slate-200" />
                        )}

                        {/* Point */}
                        <div
                            className={`
                                w-4 h-4 rounded-full flex items-center justify-center
                                flex-shrink-0 text-white text-[8px] z-10
                                ${
                                    isDone
                                        ? 'bg-epo-green-500'
                                        : isCurrent
                                        ? 'bg-blue-500 ring-4 ring-blue-100'
                                        : 'bg-epo-slate-200'
                                }
                            `}
                        >
                            {isDone && <i className="fas fa-check" />}
                        </div>

                        {/* Label */}
                        <div
                            className={`
                                text-[11.5px] pt-px
                                ${
                                    isDone || isCurrent
                                        ? 'text-epo-slate-800 font-semibold'
                                        : 'text-epo-slate-400 font-medium'
                                }
                            `}
                        >
                            {label}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}