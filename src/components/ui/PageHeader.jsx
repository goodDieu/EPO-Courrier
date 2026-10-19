/**
 * En-tête de page standard : titre, description courte et actions.
 *
 * Props :
 *   - title       : string
 *   - description : string | node (optionnel)
 *   - actions     : node (optionnel) - boutons alignés à droite
 *   - children    : node (optionnel) - contenu sous la description (badges…)
 */
export default function PageHeader({ title, description, actions, children }) {
    return (
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
                <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">{title}</h1>
                {description && (
                    <p className="max-w-3xl mt-1 text-sm text-epo-slate-600">{description}</p>
                )}
                {children && <div className="mt-2">{children}</div>}
            </div>
            {actions && <div className="flex flex-wrap flex-shrink-0 gap-2">{actions}</div>}
        </div>
    );
}
