/**
 * Frise du circuit d'un dossier : étapes passées (coche verte), étape
 * actuelle (cercle vert plein, libellé en gras), étapes à venir (cercle vide).
 *
 * Props :
 *   - etapes  : [{ key, label }] dans l'ordre du circuit
 *   - current : index de l'étape actuelle (au-delà de la dernière = tout est fait)
 *   - bloque  : bool - l'étape actuelle est bloquée (icône rouge)
 */
export default function CircuitEtapes({ etapes, current, bloque = false }) {
    return (
        <ol className="flex items-start w-full" aria-label="Circuit du dossier">
            {etapes.map((e, i) => {
                const fait = i < current;
                const actuel = i === current;
                return (
                    <li key={e.key} className="relative flex flex-col items-center flex-1 min-w-0" aria-current={actuel ? 'step' : undefined}>
                        {i > 0 && (
                            <span
                                className={`absolute top-3 right-1/2 w-full h-0.5 -z-0 ${i <= current ? 'bg-epo-green-600' : 'bg-epo-slate-200'}`}
                                aria-hidden="true"
                            />
                        )}
                        <span
                            className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full text-[11px] ${
                                fait
                                    ? 'bg-epo-green-600 text-white'
                                    : actuel
                                      ? bloque
                                          ? 'bg-white border-2 border-epo-red-600 text-epo-red-600'
                                          : 'bg-epo-green-700 text-white ring-4 ring-epo-green-100'
                                      : 'bg-white border-2 border-epo-slate-300'
                            }`}
                            aria-hidden="true"
                        >
                            {fait && <i className="fas fa-check" />}
                            {actuel && <i className={`fas ${bloque ? 'fa-pause' : 'fa-location-dot'}`} />}
                        </span>
                        <span
                            className={`mt-1.5 px-0.5 text-xs text-center leading-tight ${
                                actuel ? 'font-semibold text-epo-slate-900' : fait ? 'text-epo-slate-700' : 'text-epo-slate-500'
                            }`}
                        >
                            {e.label}
                        </span>
                    </li>
                );
            })}
        </ol>
    );
}
