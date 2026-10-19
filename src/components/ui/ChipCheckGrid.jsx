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
// Moins de colonnes sur petit écran pour garder des cases lisibles
const COLONNES = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
};

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
        <div className={`grid gap-2 ${COLONNES[columns] || COLONNES[4]}`}>
            {options.map((opt) => {
                const isChecked = selected.includes(opt);
                return (
                    <label
                        key={opt}
                        className={`
                            flex items-center gap-2
                            px-3 py-2
                            rounded-lg
                            border text-sm
                            cursor-pointer select-none
                            transition
                            ${
                                isChecked
                                    ? 'bg-epo-green-50 border-epo-green-600 font-semibold text-epo-slate-900'
                                    : 'bg-white border-epo-slate-300 text-epo-slate-800 hover:border-epo-slate-400'
                            }
                            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                    >
                        <input
                            type="checkbox"
                            checked={isChecked}
                            disabled={disabled}
                            onChange={() => toggle(opt)}
                            className="flex-shrink-0 w-4 h-4 accent-epo-green-700"
                        />
                        <span className="truncate">{opt}</span>
                    </label>
                );
            })}
        </div>
    );
}