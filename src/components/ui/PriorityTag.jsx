import Badge from './Badge.jsx';

const PRIORITY_MAP = {
    Urgent:       { variant: 'red',    label: 'Urgent' },
    Normal:       { variant: 'slate',  label: 'Normal' },
    Confidentiel: { variant: 'purple', label: 'Confidentiel' },
    Réservé:      { variant: 'purple', label: 'Réservé' },
};

/**
 * Tag de priorité / classification.
 *
 * Props :
 *   - priority : 'Urgent' | 'Normal' | 'Confidentiel' | 'Réservé'
 *   - size     : 'sm' | 'md'
 */
export default function PriorityTag({ priority, size = 'sm', className = '' }) {
    const config = PRIORITY_MAP[priority] || PRIORITY_MAP.Normal;

    return (
        <Badge
            variant={config.variant}
            size={size}
            className={`uppercase font-semibold tracking-wide ${className}`}
        >
            {config.label}
        </Badge>
    );
}