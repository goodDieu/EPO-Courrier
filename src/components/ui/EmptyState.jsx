/**
 * État vide.
 *
 * Props :
 *   - icon    : string - classe Font Awesome (par défaut 'fa-inbox')
 *   - title   : string
 *   - message : string
 *   - action  : { label, onClick } (optionnel)
 */
export default function EmptyState({
    icon = 'fa-inbox',
    title = 'Aucun élément',
    message = "Il n'y a rien à afficher pour le moment.",
    action,
}) {
    return (
        <div className="flex flex-col items-center justify-center px-6 text-center py-14">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-epo-slate-100">
                <i className={`fas ${icon} text-2xl text-epo-slate-400`} />
            </div>
            <h3 className="mb-1 text-base font-semibold text-epo-slate-800">
                {title}
            </h3>
            <p className="max-w-md text-sm text-epo-slate-500">
                {message}
            </p>
            {action && (
                <button
                    type="button"
                    onClick={action.onClick}
                    className="px-4 py-2 mt-5 text-sm font-semibold text-white transition rounded-lg  bg-epo-slate-700 hover:bg-epo-slate-800"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}