// src/components/stats/KpiCardSpark.jsx
import Sparkline from './Sparkline';

const VALUE_COLORS = {
    default: 'text-epo-slate-900',
    urgent: 'text-epo-red-600',
    warning: 'text-epo-yellow-700',
    success: 'text-epo-green-600',
    info: 'text-epo-green-600',
};

const ICON_COLORS = {
    default: 'text-epo-slate-300',
    urgent: 'text-epo-red-300',
    warning: 'text-epo-yellow-300',
    success: 'text-epo-green-300',
    info: 'text-epo-green-300',
};

const SPARK_COLORS = {
    default: '#3C4653',
    urgent: '#E30613',
    warning: '#FFD100',
    success: '#009A44',
    info: '#009A44',
};

/**
 * KPI avec sparkline et variation vs période précédente.
 *
 * Props :
 *   - label, value, formatted, change, trend, goodDirection
 *   - icon, variant, spark (array de nombres)
 */
export default function KpiCardSpark({
    label,
    value,
    formatted,
    change,
    trend = 'flat',
    goodDirection = 'up',
    icon,
    variant = 'default',
    spark = [],
}) {
    const valueColor = VALUE_COLORS[variant] || VALUE_COLORS.default;
    const iconColor = ICON_COLORS[variant] || ICON_COLORS.default;
    const sparkColor = SPARK_COLORS[variant] || SPARK_COLORS.default;

    // Déterminer si la variation est bonne ou mauvaise
    const isPositive =
        (trend === 'up' && goodDirection === 'up') ||
        (trend === 'down' && goodDirection === 'down');

    const changeClass = isPositive
        ? 'bg-epo-green-50 text-epo-green-700'
        : 'bg-epo-red-50 text-epo-red-700';

    const trendIcon =
        trend === 'up' ? 'fa-arrow-up' : trend === 'down' ? 'fa-arrow-down' : 'fa-minus';

    return (
        <div className="relative bg-white border border-epo-slate-200 rounded-xl p-5 shadow-soft transition hover:shadow-card hover:-translate-y-0.5">
            {icon && (
                <i className={`fas ${icon} absolute top-4 right-5 text-2xl opacity-30 ${iconColor}`} />
            )}

            <div className="text-[13px] font-medium text-epo-slate-500">
                {label}
            </div>

            <div className="flex items-end justify-between gap-3 mt-1">
                <div className={`text-3xl font-bold tracking-tight tabular-nums ${valueColor}`}>
                    {formatted || value}
                </div>

                {spark.length > 0 && (
                    <div className="pb-1">
                        <Sparkline data={spark} color={sparkColor} width={80} height={28} />
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 mt-2">
                <span className={`inline-flex items-center gap-1 text-[11.5px] font-semibold px-2 py-0.5 rounded-full ${changeClass}`}>
                    <i className={`fas ${trendIcon} text-[9px]`} />
                    {change}
                </span>
                <span className="text-[11px] text-epo-slate-400">
                    vs période précédente
                </span>
            </div>
        </div>
    );
}