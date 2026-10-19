/**
 * Criticité temporelle (échéance).
 * Distincte de la priorité (classification) et de l'importance (matrice Eisenhower).
 * Texte + icône, sans pastille : rouge si dépassé ou critique, jaune foncé si
 * l'échéance approche, neutre sinon.
 *
 * Props :
 *   - criticite : 'Critique' | 'Échéance proche' | 'Dans les délais' | 'Dépassé' | 'Traité'
 *   - size      : 'sm' | 'md'
 */
const CRITICITE_MAP = {
    'Critique':        { icon: 'fa-circle-exclamation text-epo-red-600', className: 'text-epo-slate-900 font-semibold' },
    'Dépassé':         { icon: 'fa-circle-xmark text-epo-red-600',       className: 'text-epo-slate-900 font-semibold' },
    'Échéance proche': { icon: 'fa-hourglass-half text-epo-yellow-600',  className: 'text-epo-slate-900 font-medium' },
    'Dans les délais': { icon: 'fa-clock',              className: 'text-epo-slate-600' },
    'Traité':          { icon: 'fa-check',              className: 'text-epo-slate-600' },
};

export default function CriticiteBadge({ criticite, size = 'sm', className = '' }) {
    const label = CRITICITE_MAP[criticite] ? criticite : 'Dans les délais';
    const config = CRITICITE_MAP[label];

    return (
        <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap ${
                size === 'md' ? 'text-base' : 'text-sm'
            } ${config.className} ${className}`}
        >
            <i className={`fas ${config.icon} text-[0.85em]`} aria-hidden="true" />
            {label}
        </span>
    );
}
