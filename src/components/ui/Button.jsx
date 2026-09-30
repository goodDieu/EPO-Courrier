/**
 * Bouton unifié.
 *
 * Props :
 *   - variant : 'primary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning'
 *   - size    : 'sm' | 'md' | 'lg'
 *   - icon    : string - classe Font Awesome (ex: 'fa-plus')
 *   - iconPosition : 'left' | 'right' (par défaut 'left')
 *   - loading : bool
 *   - fullWidth : bool
 *   - children
 */
const VARIANT_CLASSES = {
    primary:   'bg-epo-slate-700 text-white hover:bg-epo-slate-800 shadow-sm hover:-translate-y-px hover:shadow-md',
    outline:   'bg-transparent border border-epo-slate-300 text-epo-slate-600 hover:bg-epo-slate-100',
    ghost:     'bg-transparent text-epo-slate-600 hover:bg-epo-slate-100',
    danger:    'bg-epo-red-500 text-white hover:bg-epo-red-600 shadow-sm hover:-translate-y-px',
    success:   'bg-epo-green-600 text-white hover:bg-epo-green-700 shadow-sm hover:-translate-y-px',
    warning:   'bg-epo-yellow-500 text-epo-slate-800 hover:bg-epo-yellow-600 shadow-sm hover:-translate-y-px',
    greenOutline: 'bg-transparent border border-epo-green-500 text-epo-green-600 hover:bg-epo-green-50',
    redOutline:   'bg-transparent border border-epo-red-500 text-epo-red-600 hover:bg-epo-red-50',
};

const SIZE_CLASSES = {
    sm: 'text-[12.5px] px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-[15px] px-5 py-3.5 gap-2.5',
};

export default function Button({
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    loading = false,
    fullWidth = false,
    disabled = false,
    type = 'button',
    onClick,
    className = '',
    children,
    ...rest
}) {
    const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;
    const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;
    const isDisabled = disabled || loading;

    const iconElement = icon && !loading ? (
        <i className={`fas ${icon} text-[0.9em]`} />
    ) : null;

    const spinnerElement = loading ? (
        <span className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin" />
    ) : null;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={`
                inline-flex items-center justify-center
                rounded-lg
                font-semibold
                transition-all duration-200
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
                ${variantClass}
                ${sizeClass}
                ${fullWidth ? 'w-full' : ''}
                ${className}
            `}
            {...rest}
        >
            {loading && spinnerElement}
            {!loading && iconPosition === 'left' && iconElement}
            {children}
            {!loading && iconPosition === 'right' && iconElement}
        </button>
    );
}