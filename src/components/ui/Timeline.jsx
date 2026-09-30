/**
 * Timeline verticale.
 *
 * Props :
 *   - items : array de { date, action, user, color }
 *       - color : 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'slate'
 */
const DOT_COLORS = {
    blue:   'bg-blue-500',
    green:  'bg-epo-green-500',
    yellow: 'bg-epo-yellow-500',
    amber:  'bg-epo-yellow-500',
    red:    'bg-epo-red-500',
    purple: 'bg-purple-500',
    slate:  'bg-epo-slate-400',
    gray:   'bg-epo-slate-400',
};

export default function Timeline({ items = [] }) {
    if (!items.length) {
        return (
            <div className="text-center text-sm text-epo-slate-400 italic py-6">
                Aucun historique disponible.
            </div>
        );
    }

    return (
        <div className="relative pl-7">
            {/* Ligne verticale */}
            <div className="absolute left-1.5 top-1 bottom-1 w-0.5 bg-epo-slate-200" />

            {items.map((item, i) => {
                const dotClass = DOT_COLORS[item.color] || DOT_COLORS.slate;
                return (
                    <div key={i} className="relative pb-4 pl-4 last:pb-0">
                        <span
                            className={`
                                absolute -left-[22px] top-1
                                w-3 h-3 rounded-full
                                border-2 border-white
                                shadow-sm
                                ${dotClass}
                            `}
                        />
                        <div className="text-[12px] font-medium text-epo-slate-400">
                            {item.date}
                        </div>
                        <div className="text-sm text-epo-slate-700">
                            <strong className="text-epo-slate-900">{item.action}</strong>
                            {item.user && (
                                <>
                                    {' '}
                                    <span className="text-epo-slate-400">par</span>{' '}
                                    <span className="font-medium text-epo-green-600">{item.user}</span>
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}