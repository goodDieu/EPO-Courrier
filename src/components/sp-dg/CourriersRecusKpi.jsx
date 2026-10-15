// src/components/sp-dg/CourriersRecusKpi.jsx

export default function CourriersRecusKpi({ courriers }) {
    const aTrier = courriers.filter((c) => c.etat === 'a-trier').length;
    const prets = courriers.filter((c) => c.etat === 'pret-introduire').length;
    const confidentiels = courriers.filter((c) => c.confidence).length;
    const aujourdhui = courriers.filter((c) => {
        const today = new Date();
        const d = new Date(c.dateReception);
        return (
            d.getDate() === today.getDate() &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear()
        );
    }).length;

    const kpis = [
        {
            id: 'a-trier',
            label: 'À trier',
            value: aTrier,
            icon: 'fa-th',
            variant: 'warning',
            hint: 'Récemment reçus',
        },
        {
            id: 'prets',
            label: 'Prêts à introduire',
            value: prets,
            icon: 'fa-check-circle',
            variant: 'success',
            hint: 'Triés et conformes',
        },
        {
            id: 'confidentiels',
            label: 'Confidentiels',
            value: confidentiels,
            icon: 'fa-lock',
            variant: 'dark',
            hint: 'Numérotation SP-DG',
        },
        {
            id: 'jour',
            label: 'Reçus aujourd\'hui',
            value: aujourdhui,
            icon: 'fa-calendar-day',
            variant: 'info',
            hint: 'Depuis minuit',
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((k) => (
                <div
                    key={k.id}
                    className={`
                        relative p-5 border shadow-soft rounded-xl
                        ${k.variant === 'dark' ? 'bg-epo-slate-800 border-epo-slate-700' : 'bg-white border-epo-slate-200'}
                    `}
                >
                    <i className={`
                        fas ${k.icon} absolute top-4 right-5 text-2xl opacity-20
                        ${k.variant === 'warning' ? 'text-epo-slate-400' :
                          k.variant === 'success' ? 'text-epo-slate-400' :
                          k.variant === 'dark' ? 'text-white' :
                          'text-epo-slate-400'}
                    `} />
                    <div className={`text-sm font-medium ${k.variant === 'dark' ? 'text-epo-slate-300' : 'text-epo-slate-500'}`}>
                        {k.label}
                    </div>
                    <div className={`
                        text-3xl font-bold mt-1 tracking-tight tabular-nums
                        ${k.variant === 'warning' ? 'text-epo-slate-900' :
                          k.variant === 'success' ? 'text-epo-slate-900' :
                          k.variant === 'dark' ? 'text-white' :
                          'text-epo-slate-900'}
                    `}>
                        {k.value}
                    </div>
                    <div className={`text-xs mt-1 ${k.variant === 'dark' ? 'text-epo-slate-400' : 'text-epo-slate-400'}`}>
                        {k.hint}
                    </div>
                </div>
            ))}
        </div>
    );
}