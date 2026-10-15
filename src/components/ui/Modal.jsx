import { useEffect, useId, useRef } from 'react';

/**
 * Modale générique.
 *
 * Props :
 *   - open     : bool
 *   - onClose  : function
 *   - title    : string | node
 *   - titleIcon: string (classe Font Awesome optionnelle)
 *   - size     : 'sm' | 'md' | 'lg' | 'xl' (par défaut 'md')
 *   - footer   : node (optionnel - sinon pas de footer)
 *   - children : contenu du body
 *   - closeOnOverlay : bool (par défaut true)
 *
 * Accessibilité : rôle "dialog", focus placé dans la modale à l'ouverture,
 * tabulation maintenue à l'intérieur, Échap pour fermer, focus rendu à
 * l'élément d'origine à la fermeture.
 */
const SIZE_CLASSES = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
};

const FOCUSABLE =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Modal({
    open,
    onClose,
    title,
    titleIcon,
    size = 'md',
    footer,
    children,
    closeOnOverlay = true,
}) {
    const dialogRef = useRef(null);
    const onCloseRef = useRef(onClose);
    const titleId = useId();

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        if (!open) return;

        const previouslyFocused = document.activeElement;
        const dialog = dialogRef.current;

        // Focus initial : premier champ de saisie, sinon la modale elle-même
        const firstField = dialog?.querySelector('input:not([disabled]), textarea:not([disabled]), select:not([disabled])');
        (firstField || dialog)?.focus();

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onCloseRef.current?.();
                return;
            }
            if (e.key !== 'Tab' || !dialog) return;
            const focusables = [...dialog.querySelectorAll(FOCUSABLE)];
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
            previouslyFocused?.focus?.();
        };
    }, [open]);

    if (!open) return null;

    const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-epo-slate-900/50 animate-fade-in"
            onMouseDown={closeOnOverlay ? onClose : undefined}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                tabIndex={-1}
                className={`
                    bg-white rounded-xl w-full
                    max-h-[90vh] flex flex-col
                    shadow-elevated
                    animate-fade-in-up
                    outline-none
                    ${sizeClass}
                `}
                onMouseDown={(e) => e.stopPropagation()}
            >
                {(title || onClose) && (
                    <div className="flex items-center justify-between flex-shrink-0 gap-4 px-6 py-4 border-b border-epo-slate-200">
                        <h2 id={titleId} className="flex items-center min-w-0 gap-2.5 text-lg font-semibold text-epo-slate-900">
                            {titleIcon && (
                                <i className={`fas ${titleIcon} text-epo-green-700`} aria-hidden="true" />
                            )}
                            <span className="min-w-0">{title}</span>
                        </h2>
                        {onClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Fermer"
                                title="Fermer"
                                className="flex items-center justify-center flex-shrink-0 w-10 h-10 transition-colors rounded-lg text-epo-slate-500 hover:bg-epo-slate-100 hover:text-epo-slate-900"
                            >
                                <i className="text-lg fas fa-xmark" aria-hidden="true" />
                            </button>
                        )}
                    </div>
                )}

                <div className="flex-1 px-6 py-5 overflow-y-auto">
                    {children}
                </div>

                {footer && (
                    <div className="flex flex-wrap items-center justify-end flex-shrink-0 gap-3 px-6 py-4 border-t border-epo-slate-200 bg-epo-slate-50 rounded-b-xl">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
