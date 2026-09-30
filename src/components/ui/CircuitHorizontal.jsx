/**
 * Circuit horizontal d'un courrier sortant.
 *
 * Props :
 *   - etapes   : array de strings (liste ordonnée)
 *   - current  : string (état actuel)
 *   - dates    : object { [etape]: 'date' } (optionnel - pour afficher les dates)
 *   - rejected : bool (cas de rejet - affichage spécifique)
 */
export default function CircuitHorizontal({
    etapes = [],
    current,
    dates = {},
    rejected = false,
}) {
    const idx = etapes.indexOf(current);

    return (
        <div className="flex items-center pb-1 overflow-x-auto">
            {etapes.map((label, i) => {
                const isDone = !rejected && i < idx;
                const isCurrent = !rejected && i === idx;
                const isRejected = rejected && i === 0;

                return (
                    <div key={label} className="flex items-center flex-shrink-0">
                        <div className="flex flex-col items-center gap-1.5 min-w-[100px]">
                            <div
                                className={`
                                    w-9 h-9 rounded-full
                                    flex items-center justify-center
                                    text-sm font-semibold
                                    border-2 transition
                                    ${
                                        isDone
                                            ? 'bg-epo-green-500 border-epo-green-500 text-white'
                                            : isCurrent
                                            ? 'bg-blue-500 border-blue-500 text-white ring-4 ring-blue-100'
                                            : isRejected
                                            ? 'bg-epo-red-500 border-epo-red-500 text-white'
                                            : 'bg-white border-epo-slate-300 text-epo-slate-400'
                                    }
                                `}
                            >
                                {isDone ? (
                                    <i className="fas fa-check" />
                                ) : isRejected ? (
                                    <i className="fas fa-times" />
                                ) : isCurrent ? (
                                    <i className="text-xs fas fa-pen" />
                                ) : (
                                    i + 1
                                )}
                            </div>
                            <div
                                className={`
                                    text-[11.5px] text-center whitespace-nowrap
                                    ${
                                        isDone
                                            ? 'text-epo-green-600 font-semibold'
                                            : isCurrent
                                            ? 'text-blue-600 font-semibold'
                                            : isRejected
                                            ? 'text-epo-red-600 font-semibold'
                                            : 'text-epo-slate-500 font-medium'
                                    }
                                `}
                            >
                                {label}
                            </div>
                            {dates[label] && (
                                <div className="text-[10.5px] text-epo-slate-400">
                                    {dates[label]}
                                </div>
                            )}
                        </div>

                        {i < etapes.length - 1 && (
                            <div
                                className={`
                                    w-10 h-0.5 -mx-2 mb-9
                                    ${isDone ? 'bg-epo-green-500' : 'bg-epo-slate-200'}
                                `}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}