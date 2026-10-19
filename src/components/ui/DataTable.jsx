/**
 * Tableau de données dans une surface blanche.
 *
 * <TableCard columns={[{ label: 'N°' }, …]} alert={…} footer="12 courriers">
 *     {lignes <tr>}
 * </TableCard>
 *
 * Les cellules utilisent la classe TD ; une ligne cliquable utilise ROW_CLICKABLE.
 */
export const TD = 'px-4 py-3 align-middle';
export const ROW = 'border-t border-epo-slate-100';
export const ROW_CLICKABLE = 'border-t border-epo-slate-100 cursor-pointer transition-colors hover:bg-epo-slate-50';

export function TableCard({ columns, alert, footer, children }) {
    return (
        <div className="overflow-hidden bg-white border rounded-xl border-epo-slate-200 shadow-soft">
            {alert && (
                <div className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium border-b bg-white border-epo-slate-200 text-epo-slate-900" role="status">
                    <i className="fas fa-triangle-exclamation text-epo-red-600" aria-hidden="true" />
                    {alert}
                </div>
            )}
            {/* relative : garde les libellés masqués (sr-only) dans la zone qui défile */}
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-epo-slate-50">
                            {columns.map((c, i) => (
                                <th
                                    key={i}
                                    scope="col"
                                    className={`px-4 py-2.5 text-xs font-semibold text-left text-epo-slate-600 whitespace-nowrap ${c.className || ''}`}
                                >
                                    {c.label ? c.label : <span className="sr-only">Actions</span>}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </table>
            </div>
            {footer && (
                <div className="px-4 py-3 text-sm border-t border-epo-slate-200 text-epo-slate-600">{footer}</div>
            )}
        </div>
    );
}

/**
 * Bouton d'action en fin de ligne. N'ouvre pas le détail de la ligne.
 *   - primary : action principale attendue sur la ligne (vert)
 */
export function RowAction({ onClick, icon, primary = false, children }) {
    return (
        <button
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
            className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-sm whitespace-nowrap transition-colors ${
                primary
                    ? 'font-semibold text-white bg-epo-green-700 hover:bg-epo-green-800'
                    : 'font-medium text-epo-slate-700 hover:bg-epo-slate-100'
            }`}
        >
            {icon && <i className={`fas ${icon} text-xs`} aria-hidden="true" />}
            {children}
        </button>
    );
}

/** Numéro de dossier, toujours sur une ligne. */
export function RefCell({ children, sub }) {
    return (
        <div className="whitespace-nowrap">
            <div className="text-sm font-semibold tabular-nums text-epo-slate-900">{children}</div>
            {sub && <div className="text-xs text-epo-slate-500">{sub}</div>}
        </div>
    );
}

/** Titre principal + ligne secondaire. */
export function TitleCell({ title, sub, width = 'max-w-[300px]' }) {
    return (
        <div className={`min-w-0 ${width}`}>
            <div className="text-sm font-medium truncate text-epo-slate-900" title={title}>
                {title}
            </div>
            {sub && <div className="mt-0.5 text-xs truncate text-epo-slate-500">{sub}</div>}
        </div>
    );
}

/** Message affiché quand la liste est vide. */
export function EmptyTable({ icon = 'fa-inbox', title, message }) {
    return (
        <div className="px-6 py-14 text-center bg-white border rounded-xl border-epo-slate-200">
            <i className={`fas ${icon} text-2xl text-epo-slate-400`} aria-hidden="true" />
            <p className="mt-3 text-base font-semibold text-epo-slate-900">{title}</p>
            {message && <p className="mt-1 text-sm text-epo-slate-600">{message}</p>}
        </div>
    );
}
