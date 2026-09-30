/**
 * Badge générique réutilisable.
 *
 * Props :
 *   - variant : 'red' | 'green' | 'yellow' | 'slate' | 'purple' | 'blue'
 *   - size    : 'sm' | 'md' (par défaut 'sm')
 *   - dot     : bool - affiche un point de couleur à gauche
 *   - icon    : string (classe Font Awesome) - affiche une icône à gauche
 *   - children: contenu du badge
 */

const VARIANT_CLASSES = {
    red:     'bg-epo-red-50 text-epo-red-600 border-epo-red-200',
    green:   'bg-epo-green-50 text-epo-green-700 border-epo-green-200',
    yellow:  'bg-epo-yellow-50 text-epo-yellow-800 border-epo-yellow-200',
    slate:   'bg-epo-slate-100 text-epo-slate-600 border-epo-slate-200',
    purple:  'bg-purple-50 text-purple-700 border-purple-200',
    blue:    'bg-blue-50 text-blue-700 border-blue-200',
};

const DOT_CLASSES = {
    red:    'bg-epo-red-500',
    green:  'bg-epo-green-500',
    yellow: 'bg-epo-yellow-500',
    slate:  'bg-epo-slate-400',
    purple: 'bg-purple-500',
    blue:   'bg-blue-500',
};

const SIZE_CLASSES = {
    sm: 'text-[11.5px] px-2.5 py-0.5 gap-1.5',
    md: 'text-[13px] px-3 py-1 gap-2',
};

export default function Badge({
    variant = 'slate',
    size = 'sm',
    dot = false,
    icon,
    className = '',
    children,
}) {
    const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.slate;
    const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.sm;
    const dotClass = DOT_CLASSES[variant] || DOT_CLASSES.slate;

    return (
        <span
            className={`
                inline-flex items-center
                rounded-full
                font-medium
                border
                whitespace-nowrap
                ${variantClass}
                ${sizeClass}
                ${className}
            `}
        >
            {dot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotClass}`} />}
            {icon && <i className={`fas ${icon} text-[10px]`} />}
            {children}
        </span>
    );
}