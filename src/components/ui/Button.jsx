/**
 * Bouton unifié.
 *
 * Props :
 *   - variant : 'primary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning'
 *               | 'greenOutline' | 'redOutline'
 *   - size    : 'sm' | 'md' | 'lg'
 *   - icon    : string - classe Font Awesome (ex: 'fa-plus')
 *   - iconPosition : 'left' | 'right' (par défaut 'left')
 *   - loading : bool
 *   - fullWidth : bool
 *   - children
 */
const VARIANT_CLASSES = {
    primary:      'bg-epo-green-700 text-white hover:bg-epo-green-800 shadow-sm',
    success:      'bg-epo-green-700 text-white hover:bg-epo-green-800 shadow-sm',
    outline:      'bg-white border border-epo-slate-300 text-epo-slate-800 hover:bg-epo-slate-50 hover:border-epo-slate-400',
    ghost:        'bg-transparent text-epo-slate-700 hover:bg-epo-slate-100',
    danger:       'bg-epo-red-600 text-white hover:bg-epo-red-700 shadow-sm',
    warning:      'bg-epo-yellow-500 text-epo-slate-900 hover:bg-epo-yellow-400 shadow-sm',
    greenOutline: 'bg-white border border-epo-green-600 text-epo-green-700 hover:bg-epo-green-50',
    redOutline:   'bg-white border border-epo-red-500 text-epo-red-700 hover:bg-epo-red-50',
};

const SIZE_CLASSES = {
    sm: 'h-9 px-3 text-sm gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-5 text-base gap-2.5',
};

const SPINNER_COLORS = {
    outline: 'border-epo-slate-300 border-t-epo-slate-700',
    ghost: 'border-epo-slate-300 border-t-epo-slate-700',
    greenOutline: 'border-epo-green-200 border-t-epo-green-700',
    redOutline: 'border-epo-red-200 border-t-epo-red-700',
    warning: 'border-epo-slate-900/30 border-t-epo-slate-900',
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
        <i className={`fas ${icon} text-[0.9em]`} aria-hidden="true" />
    ) : null;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            aria-busy={loading || undefined}
            className={`
                inline-flex items-center justify-center flex-shrink-0
                rounded-lg
                font-semibold whitespace-nowrap
                transition-colors duration-150
                disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
                ${variantClass}
                ${sizeClass}
                ${fullWidth ? 'w-full' : ''}
                ${className}
            `}
            {...rest}
        >
            {loading && (
                <span
                    className={`w-4 h-4 border-2 rounded-full animate-spin ${
                        SPINNER_COLORS[variant] || 'border-white/40 border-t-white'
                    }`}
                    aria-hidden="true"
                />
            )}
            {iconPosition === 'left' && iconElement}
            {children}
            {iconPosition === 'right' && iconElement}
        </button>
    );
}
