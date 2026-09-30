/**
 * Carte KPI.
 *
 * Props :
 *   - label        : string - libellé de l'indicateur
 *   - value        : number | string - valeur principale
 *   - variant      : 'default' | 'urgent' | 'warning' | 'success' | 'info'
 *   - icon         : string - classe Font Awesome
 *   - change       : string - texte de variation (ex: "+3 vs hier")
 *   - trend        : 'up' | 'down' | 'flat'
 */
const VALUE_COLORS = {
    default: 'text-epo-slate-900',
    urgent: 'text-epo-red-600',
    warning: 'text-epo-yellow-700',
    success: 'text-epo-green-600',
    info: 'text-blue-600',
};

const ICON_COLORS = {
    default: 'text-epo-slate-300',
    urgent: 'text-epo-red-300',
    warning: 'text-epo-yellow-300',
    success: 'text-epo-green-300',
    info: 'text-blue-300',
};

const TREND_CLASSES = {
    up:   'bg-epo-red-50 text-epo-red-600',
    down: 'bg-epo-green-50 text-epo-green-600',
    flat: 'bg-epo-slate-100 text-epo-slate-500',
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
}) {
    const valueColor = VALUE_COLORS[variant] || VALUE_COLORS.default;
    const iconColor = ICON_COLORS[variant] || ICON_COLORS.default;
    const trendClass = TREND_CLASSES[trend] || TREND_CLASSES.flat;
    const trendIcon = TREND_ICONS[trend] || TREND_ICONS.flat;

    return (
        <div className="
            relative
            bg-white border border-epo-slate-200 rounded-xl
            p-5 shadow-soft
            transition
            hover:shadow-card hover:-translate-y-0.5
        ">
            {icon && (
                <i className={`fas ${icon} absolute top-4 right-5 text-2xl opacity-30 ${iconColor}`} />
            )}
            <div className="text-[13px] font-medium text-epo-slate-500">
                {label}
            </div>
            <div className={`text-3xl font-bold mt-1 tracking-tight ${valueColor}`}>
                {value}
            </div>
            {change && (
                <div className={`inline-flex items-center gap-1.5 text-[12px] font-medium mt-2 px-2 py-0.5 rounded-full ${trendClass}`}>
                    <i className={`fas ${trendIcon} text-[10px]`} />
                    {change}
                </div>
            )}
        </div>
    );
}