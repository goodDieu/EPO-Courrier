/**
 * Avatar avec initiales.
 *
 * Props :
 *   - name    : string — utilisé pour extraire les initiales si `initials` non fourni
 *   - initials: string — optionnel (ex: "SG")
 *   - color   : string — couleur de fond (hex ou classe Tailwind)
 *   - size    : 'sm' | 'md' | 'lg'
 */
const SIZE_CLASSES = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
};

function getInitials(name = '') {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() || '')
        .join('');
}

export default function Avatar({
    name = '',
    initials,
    color = '#3C4653',
    size = 'md',
    className = '',
}) {
    const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;
    const label = initials || getInitials(name) || '?';

    const isHex = typeof color === 'string' && color.startsWith('#');
    const styleProps = isHex ? { backgroundColor: color } : {};

    return (
        <div
            style={styleProps}
            className={`
                inline-flex items-center justify-center
                rounded-full
                font-semibold text-white
                flex-shrink-0
                ${!isHex ? color : ''}
                ${sizeClass}
                ${className}
            `}
        >
            {label}
        </div>
    );
}