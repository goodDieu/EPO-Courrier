// src/components/dg/ConfidentielKpi.jsx

export default function ConfidentielKpi({ documents, journal }) {
    const total = documents.length;
    const urgents = documents.filter((d) => d.priorite === 'urgent').length;
    const tentativesRefusees = journal.filter((l) => l.typeAcces === 'refus').length;
    const acces24h = journal.filter((l) => {
        const diff = (new Date() - new Date(l.date)) / (1000 * 60 * 60);
        return diff <= 24;
    }).length;

    const kpis = [
        {
            id: 'total',
            label: 'Dossiers confidentiels',
            value: total,
            icon: 'fa-lock',
            variant: 'dark',
            hint: 'Accès liste blanche',
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
            id: 'refus',
            label: 'Tentatives refusées',
            value: tentativesRefusees,
            icon: 'fa-ban',
            variant: 'urgent',
            hint: 'Accès hors liste blanche',
        },
        {
            id: 'acces',
            label: 'Accès (24h)',
            value: acces24h,
            icon: 'fa-eye',
            variant: 'default',
            hint: 'Consultations journalisées',
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
                          k.variant === 'dark' ? 'text-white' :
                          'text-epo-slate-400'}
                    `} />
                    <div className={`text-[13px] font-medium ${k.variant === 'dark' ? 'text-epo-slate-300' : 'text-epo-slate-500'}`}>
                        {k.label}
                    </div>
                    <div className={`
                        text-3xl font-bold mt-1 tracking-tight tabular-nums
                        ${k.variant === 'urgent' ? 'text-epo-red-600' :
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