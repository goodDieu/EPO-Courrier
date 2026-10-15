// src/components/sp-sg/TriKpi.jsx

export default function TriKpi({ dossiers }) {
    const aTrier = dossiers.filter((d) => !d.classification).length;
    const tries = dossiers.filter((d) => d.classification).length;
    const urgents = dossiers.filter((d) => d.priorite === 'urgent').length;
    const enRetard = dossiers.filter((d) => !d.classification && d.tempsAttente > 30).length;

    const kpis = [
        {
            id: 'a-trier',
            label: 'Non triés',
            value: aTrier,
            icon: 'fa-th',
            variant: aTrier > 0 ? 'warning' : 'success',
            hint: 'En attente de classification',
        },
        {
            id: 'tries',
            label: 'Triés',
            value: tries,
            icon: 'fa-check-circle',
            variant: 'success',
            hint: 'Prêts pour introduction',
        },
        {
            id: 'urgents',
            label: 'Urgents',
            value: urgents,
            icon: 'fa-exclamation-circle',
            variant: 'urgent',
            hint: 'À classer en priorité',
        },
        {
            id: 'retard',
            label: 'En retard',
            value: enRetard,
            icon: 'fa-clock',
            variant: enRetard > 0 ? 'urgent' : 'default',
            hint: '> 30 min sans classement',
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