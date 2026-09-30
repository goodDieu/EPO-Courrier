// src/components/scc/ArriveesKpi.jsx

export default function ArriveesKpi({ arrivees }) {
    const aTransmettre = arrivees.filter((a) => a.etat === 'enregistre').length;
    const urgents = arrivees.filter((a) => a.classification === 'urgent').length;
    const confidentiels = arrivees.filter((a) => a.classification === 'confidentiel').length;
    const enRetard = arrivees.filter((a) => a.tempsRestant < 0 && a.etat === 'enregistre').length;

    const kpis = [
        {
            id: 'transmettre',
            label: 'À transmettre au SP-SG',
            value: aTransmettre,
            icon: 'fa-paper-plane',
            variant: 'warning',
        },
        {
            id: 'urgents',
            label: 'Urgents en cours',
            value: urgents,
            icon: 'fa-exclamation-circle',
            variant: 'urgent',
        },
        {
            id: 'confidentiels',
            label: 'Confidentiels',
            value: confidentiels,
            icon: 'fa-lock',
            variant: 'default',
        },
        {
            id: 'retard',
            label: 'En retard de transmission',
            value: enRetard,
            icon: 'fa-clock',
            variant: 'urgent',
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