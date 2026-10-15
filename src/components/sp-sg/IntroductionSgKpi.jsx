// src/components/sp-sg/IntroductionSgKpi.jsx

export default function IntroductionSgKpi({ dossiers }) {
    const total = dossiers.length;
    const urgents = dossiers.filter((d) => d.priorite === 'urgent').length;
    const enRetard = dossiers.filter((d) => d.tempsAttente > 60).length;

    const ageMoyen = total > 0
        ? Math.round(dossiers.reduce((sum, d) => sum + d.tempsAttente, 0) / total)
        : 0;

    const formatAge = (min) => {
        if (min < 60) return `${min}min`;
        const h = Math.floor(min / 60);
        if (h < 24) return `${h}h`;
        return `${Math.floor(h / 24)}j`;
    };

    const kpis = [
        {
            id: 'total',
            label: 'À introduire au SG',
            value: total,
            icon: 'fa-user-tie',
            variant: 'warning',
            hint: 'Triés et prêts',
        },
        {
            id: 'urgents',
            label: 'Urgents',
            value: urgents,
            icon: 'fa-exclamation-circle',
            variant: 'urgent',
            hint: 'Priorité absolue',
        },
        {
            id: 'retard',
            label: 'En retard',
            value: enRetard,
            icon: 'fa-clock',
            variant: enRetard > 0 ? 'urgent' : 'success',
            hint: '> 60 min d\'attente',
        },
        {
            id: 'age',
            label: 'Âge moyen',
            value: formatAge(ageMoyen),
            icon: 'fa-hourglass-half',
            variant: ageMoyen > 120 ? 'urgent' : 'default',
            hint: 'Attente moyenne',
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
                        ${k.variant === 'urgent' ? 'text-epo-slate-400' :
                          k.variant === 'warning' ? 'text-epo-slate-400' :
                          k.variant === 'success' ? 'text-epo-slate-400' :
                          'text-epo-slate-400'}
                    `} />
                    <div className="text-sm font-medium text-epo-slate-500">
                        {k.label}
                    </div>
                    <div className={`
                        text-3xl font-bold mt-1 tracking-tight tabular-nums
                        ${k.variant === 'urgent' ? 'text-epo-slate-900' :
                          k.variant === 'warning' ? 'text-epo-slate-900' :
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