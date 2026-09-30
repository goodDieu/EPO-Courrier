import { useEffect } from 'react';
import Button from './Button.jsx';

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
 */
const SIZE_CLASSES = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
};

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
    // Fermeture avec la touche Échap
    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        document.addEventListener('keydown', handler);
        // Bloquer le scroll du body
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handler);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    if (!open) return null;

    const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

    return (
        <div
            className="
                fixed inset-0 z-[1000]
                flex items-center justify-center p-4
                bg-epo-slate-900/60 backdrop-blur-sm
                animate-fade-in
            "
            onClick={closeOnOverlay ? onClose : undefined}
        >
            <div
                className={`
                    bg-white rounded-xl w-full
                    max-h-[90vh] flex flex-col
                    shadow-elevated
                    animate-fade-in-up
                    ${sizeClass}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                {(title || onClose) && (
                    <div className="flex items-center justify-between flex-shrink-0 gap-4 px-6 py-4 border-b border-epo-slate-200">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-epo-slate-900">
                            {titleIcon && (
                                <i className={`fas ${titleIcon} text-epo-green-600`} />
                            )}
                            {title}
                        </h2>
                        {onClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Fermer"
                                className="flex items-center justify-center transition rounded-full  w-9 h-9 bg-epo-slate-100 text-epo-slate-500 hover:bg-epo-slate-200 hover:text-epo-slate-800"
                            >
                                <i className="fas fa-times" />
                            </button>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className="flex-1 px-6 py-5 overflow-y-auto">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="flex items-center justify-end gap-2.5 flex-wrap px-6 py-4 border-t border-epo-slate-200 flex-shrink-0 bg-epo-slate-50/60 rounded-b-xl">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}