// src/components/liaison/PlanningKpi.jsx

export default function PlanningKpi({ tournees }) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thisWeek = tournees.filter((t) => {
        const d = new Date(t.date);
        const diff = (d - today) / (1000 * 60 * 60 * 24);
        return diff >= -7 && diff <= 7;
    });

    const joursActifs = new Set(thisWeek.map((t) => t.date)).size;
    const remisesPrevues = thisWeek.reduce((sum, t) => sum + t.nbEtapes, 0);
    const planifiees = tournees.filter((t) => t.etat === 'planifiee').length;

    const kpis = [
        {
            id: 'planifiees',
            label: 'À venir',
            value: planifiees,
            icon: 'fa-calendar-alt',
            variant: 'default',
            hint: 'Tournées planifiées',
        },
        {
            id: 'jours',
            label: 'Jours actifs',
            value: joursActifs,
            icon: 'fa-calendar-check',
            variant: 'info',
            hint: 'Cette semaine',
        },
        {
            id: 'remises',
            label: 'Remises prévues',
            value: remisesPrevues,
            icon: 'fa-inbox',
            variant: 'success',
            hint: 'Cette semaine',
        },
        {
            id: 'moyenne',
            label: 'Moyenne / jour',
            value: joursActifs > 0 ? Math.round(remisesPrevues / joursActifs) : 0,
            icon: 'fa-chart-simple',
            variant: 'default',
            hint: 'Charge moyenne',
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
                        ${k.variant === 'success' ? 'text-epo-green-500' :
                          k.variant === 'info' ? 'text-epo-slate-500' :
                          'text-epo-slate-400'}
                    `} />
                    <div className="text-[13px] font-medium text-epo-slate-500">
                        {k.label}
                    </div>
                    <div className={`
                        text-3xl font-bold mt-1 tracking-tight tabular-nums
                        ${k.variant === 'success' ? 'text-epo-green-600' :
                          'text-epo-slate-900'}
                    `}>
                        {k.value}
                    </div>
                    <div className="text-[11px] text-epo-slate-400 mt-1">
                        {k.hint}
                    </div>
                </div>
            ))}
        </div>
    );
}