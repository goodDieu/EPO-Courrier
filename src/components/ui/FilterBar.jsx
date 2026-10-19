/**
 * Barre de recherche et de filtres au-dessus d'une liste.
 *
 * Props :
 *   - search  : { value, onChange, placeholder }
 *   - filters : [{ id, label, value, onChange, options: [{ value, label }] }]
 *   - onReset : function (affiche « Effacer les filtres » si un filtre est actif)
 */
export default function FilterBar({ search, filters = [], onReset }) {
    const active = (search?.value || '').trim() !== '' || filters.some((f) => f.value);

    return (
        <div className="flex flex-wrap items-center gap-3 mb-4">
            {search && (
                <div className="relative flex-1 min-w-[240px]">
                    <i
                        className="absolute text-sm -translate-y-1/2 pointer-events-none fas fa-magnifying-glass left-3.5 top-1/2 text-epo-slate-500"
                        aria-hidden="true"
                    />
                    <input
                        type="search"
                        value={search.value}
                        onChange={(e) => search.onChange(e.target.value)}
                        placeholder={search.placeholder}
                        aria-label={search.placeholder}
                        className="w-full h-10 pl-10 pr-3 text-sm bg-white border rounded-lg outline-none border-epo-slate-300 text-epo-slate-900 placeholder:text-epo-slate-500 focus:border-epo-green-600 focus:ring-2 focus:ring-epo-green-600/20"
                    />
                </div>
            )}

            {filters.map((f) => (
                <select
                    key={f.id}
                    value={f.value}
                    onChange={(e) => f.onChange(e.target.value)}
                    aria-label={f.label}
                    className={`h-10 pl-3 pr-8 text-sm bg-white border rounded-lg outline-none cursor-pointer border-epo-slate-300 focus:border-epo-green-600 focus:ring-2 focus:ring-epo-green-600/20 ${
                        f.value ? 'text-epo-slate-900 font-medium border-epo-slate-400' : 'text-epo-slate-700'
                    }`}
                >
                    {f.options.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            ))}

            {active && onReset && (
                <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex items-center h-10 gap-2 px-3 text-sm font-medium rounded-lg text-epo-slate-700 hover:bg-white"
                >
                    <i className="fas fa-xmark" aria-hidden="true" />
                    Effacer les filtres
                </button>
            )}
        </div>
    );
}
