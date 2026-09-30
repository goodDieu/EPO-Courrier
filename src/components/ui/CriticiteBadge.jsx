import Badge from './Badge.jsx';

const CRITICITE_MAP = {
    'Critique':          { variant: 'red',    icon: 'fa-exclamation-circle', label: 'Critique' },
    'Échéance proche':   { variant: 'yellow', icon: 'fa-hourglass-half',     label: 'Échéance proche' },
    'Dans les délais':   { variant: 'green',  icon: 'fa-clock',              label: 'Dans les délais' },
    'Dépassé':           { variant: 'red',    icon: 'fa-times-circle',       label: 'Dépassé', dark: true },
    'Traité':            { variant: 'green',  icon: 'fa-check-circle',       label: 'Traité' },
};

/**
 * Badge de criticité temporelle.
 * Distinct de la priorité (classification) et de l'importance (matrice Eisenhower).
 *
 * Props :
 *   - criticite : 'Critique' | 'Échéance proche' | 'Dans les délais' | 'Dépassé' | 'Traité'
 *   - size      : 'sm' | 'md'
 */
export default function CriticiteBadge({ criticite, size = 'sm', className = '' }) {
    const config = CRITICITE_MAP[criticite] || CRITICITE_MAP['Dans les délais'];

    // Cas spécial pour "Dépassé" (fond sombre)
    if (config.dark) {
        return (
            <span
                className={`
                    inline-flex items-center gap-1.5
                    rounded-full font-medium
                    bg-epo-red-900 text-epo-red-100
                    ${size === 'md' ? 'text-[13px] px-3 py-1' : 'text-[11.5px] px-2.5 py-0.5'}
                    ${className}
                `}
            >
                <i className={`fas ${config.icon} text-[10px]`} />
                {config.label}
            </span>
        );
    }

    return (
        <Badge
            variant={config.variant}
            size={size}
            icon={config.icon}
            className={className}
        >
            {config.label}
        </Badge>
    );
}