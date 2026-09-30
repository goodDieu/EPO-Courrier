// src/components/scc/DepartsKpi.jsx

export default function DepartsKpi({ departs }) {
    const aNumeroter = departs.filter((d) => d.etat === 'a-numeroter').length;
    const aCacheter = departs.filter((d) => d.etat === 'a-cacheter').length;
    const pretExpedier = departs.filter((d) => d.etat === 'pret-expedition').length;
    const transmisSemaine = departs.filter((d) => d.etat === 'transmis').length;

    const kpis = [
        {
            id: 'numeroter',
            label: 'À numéroter',
            value: aNumeroter,
            icon: 'fa-hashtag',
            variant: 'urgent',
        },
        {
            id: 'cacheter',
            label: 'À cacheter',
            value: aCacheter,
            icon: 'fa-stamp',
            variant: 'warning',
        },
        {
            id: 'expedier',
            label: 'Prêts à expédier',
            value: pretExpedier,
            icon: 'fa-paper-plane',
            variant: 'default',
        },
        {
            id: 'transmis',
            label: 'Transmis (semaine)',
            value: transmisSemaine,
            icon: 'fa-check-circle',
            variant: 'success',
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((k) => (
                <div
                    key={k.id}
                    className="relative p-5 bg-white border shadow-soft rounded-xl border-epo-slate-200"
                >
                    <i className={`
                        fas ${k.icon} absolute top-4 right-5 text-2xl opacity-20
                        ${k.variant === 'urgent' ? 'text-epo-red-500' :
                          k.variant === 'warning' ? 'text-epo-yellow-500' :
                          k.variant === 'success' ? 'text-epo-green-500' :
                          'text-epo-slate-400'}
                    `} />
                    <div className="text-[13px] font-medium text-epo-slate-500">
                        {k.label}
                    </div>
                    <div className={`
                        text-3xl font-bold mt-1 tracking-tight tabular-nums
                        ${k.variant === 'urgent' ? 'text-epo-red-600' :
                          k.variant === 'warning' ? 'text-epo-yellow-700' :
                          k.variant === 'success' ? 'text-epo-green-600' :
                          'text-epo-slate-900'}
                    `}>
                        {k.value}
                    </div>
                </div>
            ))}
        </div>
    );
}