// src/components/liaison/ARemettreKpi.jsx

export default function ARemettreKpi({ documents }) {
    const total = documents.length;
    const urgents = documents.filter((d) => d.priorite === 'urgent').length;
    const confidentiels = documents.filter((d) => d.priorite === 'confidentiel').length;

    // Âge moyen des documents en attente (en minutes)
    const ageMoyen =
        total > 0
            ? Math.round(documents.reduce((sum, d) => sum + d.tempsAttente, 0) / total)
            : 0;

    // Formater l'âge
    const formatAge = (min) => {
        if (min < 60) return `${min}min`;
        const h = Math.floor(min / 60);
        if (h < 24) return `${h}h`;
        return `${Math.floor(h / 24)}j`;
    };

    const kpis = [
        {
            id: 'total',
            label: 'À remettre',
            value: total,
            icon: 'fa-inbox',
            variant: 'warning',
            hint: 'En attente',
        },
        {
            id: 'urgents',
            label: 'Urgents',
            value: urgents,
            icon: 'fa-exclamation-circle',
            variant: 'urgent',
            hint: 'À traiter en priorité',
        },
        {
            id: 'confidentiels',
            label: 'Confidentiels',
            value: confidentiels,
            icon: 'fa-lock',
            variant: 'dark',
            hint: 'Accès restreint',
        },
        {
            id: 'age',
            label: 'Âge moyen',
            value: formatAge(ageMoyen),
            icon: 'fa-hourglass-half',
            variant: ageMoyen > 240 ? 'urgent' : 'default',
            hint: 'Ancienneté moyenne',
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
                        ${k.variant === 'urgent' ? 'text-epo-red-500' :
                          k.variant === 'warning' ? 'text-epo-yellow-500' :
                          k.variant === 'dark' ? 'text-white' :
                          'text-epo-slate-400'}
                    `} />
                    <div className={`text-[13px] font-medium ${k.variant === 'dark' ? 'text-epo-slate-300' : 'text-epo-slate-500'}`}>
                        {k.label}
                    </div>
                    <div className={`
                        text-3xl font-bold mt-1 tracking-tight tabular-nums
                        ${k.variant === 'urgent' ? 'text-epo-red-600' :
                          k.variant === 'warning' ? 'text-epo-yellow-700' :
                          k.variant === 'dark' ? 'text-white' :
                          'text-epo-slate-900'}
                    `}>
                        {k.value}
                    </div>
                    <div className={`text-[11px] mt-1 ${k.variant === 'dark' ? 'text-epo-slate-400' : 'text-epo-slate-400'}`}>
                        {k.hint}
                    </div>
                </div>
            ))}
        </div>
    );
}