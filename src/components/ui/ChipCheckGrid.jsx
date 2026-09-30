/**
 * Grille de chips cochables.
 *
 * Props :
 *   - options  : array de strings
 *   - selected : array de strings (contrôlé)
 *   - onChange : function(newSelected)
 *   - columns  : number (défaut 4)
 *   - disabled : bool
 */
export default function ChipCheckGrid({
    options = [],
    selected = [],
    onChange = () => {},
    columns = 4,
    disabled = false,
}) {
    const toggle = (value) => {
        if (disabled) return;
        if (selected.includes(value)) {
            onChange(selected.filter((v) => v !== value));
        } else {
            onChange([...selected, value]);
        }
    };

    return (
        <div
            className="grid gap-x-2.5 gap-y-1.5"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
            {options.map((opt) => {
                const isChecked = selected.includes(opt);
                return (
                    <label
                        key={opt}
                        className={`
                            flex items-center gap-1.5
                            px-2.5 py-1
                            rounded-md
                            border text-[12px]
                            cursor-pointer select-none
                            transition
                            ${
                                isChecked
                                    ? 'bg-blue-100 border-blue-500 font-semibold text-blue-800'
                                    : 'bg-white border-epo-slate-200 text-epo-slate-700 hover:border-blue-300'
                            }
                            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                    >
                        <input
                            type="checkbox"
                            checked={isChecked}
                            disabled={disabled}
                            onChange={() => toggle(opt)}
                            className="accent-blue-500 w-3.5 h-3.5"
                        />
                        <span className="truncate">{opt}</span>
                    </label>
                );
            })}
        </div>
    );
}