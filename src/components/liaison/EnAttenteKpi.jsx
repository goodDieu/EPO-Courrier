// src/components/liaison/EnAttenteKpi.jsx

export default function EnAttenteKpi({ documents }) {
    const total = documents.length;
    const critiques = documents.filter((d) => d.tempsBlocage >= 480).length;
    const urgents = documents.filter((d) => d.priorite === 'urgent').length;

    // Temps moyen de blocage
    const tempsMoyen = total > 0
        ? Math.round(documents.reduce((sum, d) => sum + d.tempsBlocage, 0) / total)
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
            label: 'En attente',
            value: total,
            icon: 'fa-clock',
            variant: 'warning',
            hint: 'Blocages actifs',
        },
        {
            id: 'critiques',
            label: 'Critiques',
            value: critiques,
            icon: 'fa-exclamation-triangle',
            variant: 'urgent',
            hint: '> 8h de blocage',
        },
        {
            id: 'urgents',
            label: 'Priorité haute',
            value: urgents,
            icon: 'fa-exclamation-circle',
            variant: 'urgent',
            hint: 'À débloquer vite',
        },
        {
            id: 'temps',
            label: 'Temps moyen',
            value: formatAge(tempsMoyen),
            icon: 'fa-hourglass-half',
            variant: 'default',
            hint: 'Durée de blocage',
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
                          'text-epo-slate-400'}
                    `} />
                    <div className="text-[13px] font-medium text-epo-slate-500">
                        {k.label}
                    </div>
                    <div className={`
                        text-3xl font-bold mt-1 tracking-tight tabular-nums
                        ${k.variant === 'urgent' ? 'text-epo-red-600' :
                          k.variant === 'warning' ? 'text-epo-yellow-700' :
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