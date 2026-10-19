/**
 * Étiquette courte (type, nature, compteur). Rectangle discret, sans contour.
 *
 * Props :
 *   - variant : 'red' | 'green' | 'yellow' | 'slate' | 'purple' | 'blue'
 *               (alias acceptés : 'orange' / 'amber' → yellow, 'gray' → slate)
 *   - size    : 'sm' | 'md' (par défaut 'sm')
 *   - dot     : bool - affiche un point de couleur à gauche
 *   - icon    : string (classe Font Awesome) - affiche une icône à gauche
 *   - children: contenu du badge
 */

// Couleur réservée à ce qui demande l'attention (rouge, jaune).
// Le reste reste neutre : pas d'arc-en-ciel d'étiquettes.
const VARIANT_CLASSES = {
    red:     'bg-epo-red-50 text-epo-red-700',
    yellow:  'bg-epo-slate-100 text-epo-slate-600',
    green:   'bg-epo-slate-100 text-epo-slate-700',
    slate:   'bg-epo-slate-100 text-epo-slate-700',
    purple:  'bg-epo-slate-100 text-epo-slate-700',
    blue:    'bg-epo-slate-100 text-epo-slate-700',
};

const DOT_CLASSES = {
    red:    'bg-epo-red-600',
    green:  'bg-epo-green-600',
    yellow: 'bg-epo-yellow-500',
    slate:  'bg-epo-slate-400',
    purple: 'bg-epo-slate-400',
    blue:   'bg-epo-slate-400',
};

const ALIASES = {
    orange: 'yellow',
    amber: 'yellow',
    gray: 'slate',
    grey: 'slate',
};

const SIZE_CLASSES = {
    sm: 'text-xs px-1.5 py-0.5 gap-1.5',
    md: 'text-sm px-2 py-0.5 gap-2',
};

export default function Badge({
    variant = 'slate',
    size = 'sm',
    dot = false,
    icon,
    className = '',
    children,
}) {
    const key = ALIASES[variant] || variant;
    const variantClass = VARIANT_CLASSES[key] || VARIANT_CLASSES.slate;
    const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.sm;
    const dotClass = DOT_CLASSES[key] || DOT_CLASSES.slate;

    return (
        <span
            className={`
                inline-flex items-center
                rounded
                font-medium
                whitespace-nowrap
                ${variantClass}
                ${sizeClass}
                ${className}
            `}
        >
            {dot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotClass}`} aria-hidden="true" />}
            {icon && <i className={`fas ${icon} text-[0.85em]`} aria-hidden="true" />}
            {children}
        </span>
    );
}
