// src/components/sp-sg/CourriersRecusSgKpi.jsx

export default function CourriersRecusSgKpi({ courriers }) {
    const nouveaux = courriers.filter((c) => c.etat === 'nouveau').length;
    const enTraitement = courriers.filter((c) => c.etat === 'en-traitement').length;
    const nonVerifies = courriers.filter((c) => !c.dechargeConfirmee).length;

    const aujourdhui = courriers.filter((c) => {
        const today = new Date();
        const d = new Date(c.recuAuSPSG);
        return (
            d.getDate() === today.getDate() &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear()
        );
    }).length;

    const kpis = [
        {
            id: 'nouveaux',
            label: 'Nouveaux reçus',
            value: nouveaux,
            icon: 'fa-inbox',
            variant: 'warning',
            hint: 'À réceptionner',
        },
        {
            id: 'en-traitement',
            label: 'En traitement',
            value: enTraitement,
            icon: 'fa-spinner',
            variant: 'default',
            hint: 'Tri ou scan en cours',
        },
        {
            id: 'non-verifies',
            label: 'Décharges à confirmer',
            value: nonVerifies,
            icon: 'fa-signature',
            variant: nonVerifies > 0 ? 'urgent' : 'success',
            hint: 'Réceptions non signées',
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
                    className="relative p-5 bg-white border shadow-soft rounded-xl border-epo-slate-200"
                >
                    <i className={`
                        fas ${k.icon} absolute top-4 right-5 text-2xl opacity-20
                        ${k.variant === 'warning' ? 'text-epo-slate-400' :
                          k.variant === 'urgent' ? 'text-epo-slate-400' :
                          k.variant === 'success' ? 'text-epo-slate-400' :
                          'text-epo-slate-400'}
                    `} />
                    <div className="text-sm font-medium text-epo-slate-500">
                        {k.label}
                    </div>
                    <div className={`
                        text-3xl font-bold mt-1 tracking-tight tabular-nums
                        ${k.variant === 'warning' ? 'text-epo-slate-900' :
                          k.variant === 'urgent' ? 'text-epo-slate-900' :
                          k.variant === 'success' ? 'text-epo-slate-900' :
                          'text-epo-slate-900'}
                    `}>
                        {k.value}
                    </div>
                    <div className="text-xs text-epo-slate-400 mt-1">
                        {k.hint}
                    </div>
                </div>
            ))}
        </div>
    );
}