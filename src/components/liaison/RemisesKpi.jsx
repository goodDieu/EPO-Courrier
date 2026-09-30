// src/components/liaison/RemisesKpi.jsx

export default function RemisesKpi({ remises }) {
    const total = remises.length;

    const aujourdhui = remises.filter((r) => {
        const today = new Date();
        const d = new Date(r.dateRemise);
        return (
            d.getDate() === today.getDate() &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear()
        );
    }).length;

    const semaine = remises.filter((r) => {
        const diff = (new Date() - new Date(r.dateRemise)) / (1000 * 60 * 60 * 24);
        return diff <= 7;
    }).length;

    // Délai moyen entre remises (en minutes)
    const delaiMoyen = total > 0
        ? Math.round(remises.reduce((sum, r) => sum + r.duree, 0) / total)
        : 0;

    const kpis = [
        {
            id: 'total',
            label: 'Remises enregistrées',
            value: total,
            icon: 'fa-check-double',
            variant: 'success',
            hint: 'Registre complet',
        },
        {
            id: 'aujourdhui',
            label: "Aujourd'hui",
            value: aujourdhui,
            icon: 'fa-calendar-day',
            variant: 'default',
            hint: 'Depuis minuit',
        },
        {
            id: 'semaine',
            label: 'Cette semaine',
            value: semaine,
            icon: 'fa-calendar-week',
            variant: 'default',
            hint: '7 derniers jours',
        },
        {
            id: 'delai',
            label: 'Délai moyen',
            value: `${delaiMoyen}min`,
            icon: 'fa-stopwatch',
            variant: 'info',
            hint: 'Par remise',
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
                          k.variant === 'info' ? 'text-epo-green-500' :
                          'text-epo-slate-400'}
                    `} />
                    <div className="text-[13px] font-medium text-epo-slate-500">
                        {k.label}
                    </div>
                    <div className={`
                        text-3xl font-bold mt-1 tracking-tight tabular-nums
                        ${k.variant === 'success' ? 'text-epo-green-600' :
                          k.variant === 'info' ? 'text-epo-green-600' :
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