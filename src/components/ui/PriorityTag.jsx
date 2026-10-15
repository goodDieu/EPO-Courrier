/**
 * Priorité / classification d'un courrier.
 * Seul "Urgent" attire l'œil (rouge + icône) ; "Normal" reste un simple texte ;
 * "Confidentiel" et "Réservé" sont signalés par un cadenas.
 *
 * Props :
 *   - priority : 'Urgent' | 'Normal' | 'Confidentiel' | 'Réservé'
 *   - size     : 'sm' | 'md'
 */
const PRIORITY_MAP = {
    Urgent:       { label: 'Urgent', icon: 'fa-circle-exclamation text-epo-red-600', className: 'text-epo-slate-900 font-semibold' },
    Normal:       { label: 'Normal', className: 'text-epo-slate-600' },
    Confidentiel: { label: 'Confidentiel', icon: 'fa-lock', className: 'text-epo-slate-900 font-medium' },
    Réservé:      { label: 'Réservé', icon: 'fa-lock', className: 'text-epo-slate-900 font-medium' },
};

export default function PriorityTag({ priority, size = 'sm', className = '' }) {
    const config = PRIORITY_MAP[priority] || PRIORITY_MAP.Normal;

    return (
        <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap ${
                size === 'md' ? 'text-base' : 'text-sm'
            } ${config.className} ${className}`}
        >
            {config.icon && <i className={`fas ${config.icon} text-[0.85em]`} aria-hidden="true" />}
            {config.label}
        </span>
    );
}
