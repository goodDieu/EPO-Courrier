/**
 * Carte KPI.
 *
 * Props :
 *   - label   : string - libellé de l'indicateur
 *   - value   : number | string - valeur principale
 *   - variant : 'default' | 'urgent' | 'warning' | 'success' | 'info'
 *   - icon    : string - classe Font Awesome
 *   - change  : string - texte de variation (ex: "+3 vs hier")
 *   - trend   : 'up' | 'down' | 'flat' - sens de la variation (flèche)
 *   - tone    : 'good' | 'bad' | 'neutral' - lecture de la variation (couleur).
 *               Par défaut neutre : une hausse n'est pas forcément mauvaise
 *               (plus d'actes signés) ni forcément bonne (plus de retards).
 *   - hint    : string - précision sous le chiffre (ex: "dont 2 urgents")
 *   - onClick : function (optionnel) - rend la carte cliquable
 */
// Chiffres toujours en noir ; un point rouge à côté du libellé signale l'urgence.
const ACCENTS = {
    default: 'text-epo-slate-900',
    urgent:  'text-epo-slate-900',
    warning: 'text-epo-slate-900',
    success: 'text-epo-slate-900',
    info:    'text-epo-slate-900',
};

const TONE_CLASSES = {
    good:    'text-epo-green-700',
    bad:     'text-epo-slate-900',
    neutral: 'text-epo-slate-600',
};

const TREND_ICONS = {
    up: 'fa-arrow-up',
    down: 'fa-arrow-down',
    flat: 'fa-minus',
};

export default function KpiCard({
    label,
    value,
    variant = 'default',
    icon,
    change,
    trend = 'flat',
    tone = 'neutral',
    hint,
    onClick,
}) {
    const valueColor = ACCENTS[variant] || ACCENTS.default;
    const toneClass = TONE_CLASSES[tone] || TONE_CLASSES.neutral;
    const trendIcon = TREND_ICONS[trend] || TREND_ICONS.flat;
    const Tag = onClick ? 'button' : 'div';

    return (
        <Tag
            type={onClick ? 'button' : undefined}
            onClick={onClick}
            className={`
                flex flex-col w-full text-left
                bg-white border border-epo-slate-200 rounded-xl
                p-5 shadow-soft
                ${onClick ? 'transition-colors hover:border-epo-green-600 cursor-pointer group' : ''}
            `}
        >
            <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-epo-slate-700">
                    {variant === 'urgent' && <span className="w-2 h-2 rounded-full bg-epo-red-600" aria-label="Urgent" />}
                    {label}
                </span>
                {icon && (
                    <i className={`fas ${icon} text-epo-slate-400`} aria-hidden="true" />
                )}
            </div>
            <span className={`mt-1 text-3xl font-bold tracking-tight tabular-nums ${valueColor}`}>
                {value}
            </span>
            {hint && <span className="mt-1 text-sm text-epo-slate-600">{hint}</span>}
            {change && (
                <span className={`self-start inline-flex items-center gap-1.5 mt-2 text-sm ${toneClass}`}>
                    <i className={`fas ${trendIcon} text-[10px]`} aria-hidden="true" />
                    {change}
                </span>
            )}
        </Tag>
    );
}
