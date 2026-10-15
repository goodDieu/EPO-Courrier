/**
 * Information courte affichée dans une liste ou un tableau : icône + texte,
 * sans pastille. Le texte reste foncé ; seule l'icône prend la couleur
 * (rouge = problème, jaune = à surveiller).
 *
 * Props :
 *   - icon  : classe Font Awesome (optionnelle)
 *   - tone  : 'neutral' | 'strong' | 'warning' | 'danger'
 *   - title : infobulle (optionnelle)
 *   - children
 */
const TONES = {
    neutral: { text: 'text-epo-slate-700', icon: 'text-epo-slate-400' },
    strong:  { text: 'text-epo-slate-900 font-medium', icon: 'text-epo-slate-700' },
    warning: { text: 'text-epo-slate-900 font-medium', icon: 'text-epo-yellow-600' },
    danger:  { text: 'text-epo-slate-900 font-semibold', icon: 'text-epo-red-600' },
};

export default function InlineTag({ icon, tone = 'neutral', title, className = '', children }) {
    const t = TONES[tone] || TONES.neutral;
    return (
        <span title={title} className={`inline-flex items-center gap-1.5 text-sm whitespace-nowrap ${t.text} ${className}`}>
            {icon && <i className={`fas ${icon} text-[0.85em] ${t.icon}`} aria-hidden="true" />}
            {children}
        </span>
    );
}
