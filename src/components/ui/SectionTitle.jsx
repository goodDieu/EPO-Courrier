/**
 * Titre de section avec icône et lien d'action optionnels.
 *
 * Props :
 *   - icon     : string - classe Font Awesome
 *   - title    : string | node
 *   - action   : { label, onClick } (optionnel)
 */
export default function SectionTitle({ icon, title, action }) {
    return (
        <div className="flex items-center gap-2 mb-3">
            {icon && <i className={`fas ${icon} text-epo-slate-500 text-sm`} aria-hidden="true" />}
            <h2 className="text-base font-semibold text-epo-slate-900">
                {title}
            </h2>
            {action && (
                <button
                    type="button"
                    onClick={action.onClick}
                    className="ml-auto text-sm font-medium text-epo-green-700 hover:underline"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}