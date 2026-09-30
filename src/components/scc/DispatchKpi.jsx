// src/components/scc/DispatchKpi.jsx

export default function DispatchKpi({ dossiers }) {
    const aDispatcher = dossiers.filter((d) => d.etat === 'a-dispatcher').length;
    const enTournee = dossiers.filter((d) => d.etat === 'en-tournee').length;
    const enRetard = dossiers.filter((d) => d.etat === 'en-retard').length;
    const decharges = dossiers.filter((d) => d.etat === 'decharge').length;

    const kpis = [
        {
            id: 'a-dispatcher',
            label: 'À dispatcher',
            value: aDispatcher,
            icon: 'fa-inbox',
            variant: 'warning',
            hint: 'En attente d\'assignation',
        },
        {
            id: 'en-tournee',
            label: 'En tournée',
            value: enTournee,
            icon: 'fa-truck',
            variant: 'default',
            hint: 'Confiés à un agent',
        },
        {
            id: 'en-retard',
            label: 'En retard',
            value: enRetard,
            icon: 'fa-exclamation-triangle',
            variant: 'urgent',
            hint: 'Délai de référence dépassé',
        },
        {
            id: 'decharges',
            label: 'Déchargés',
            value: decharges,
            icon: 'fa-check-circle',
            variant: 'success',
            hint: 'Preuves validées',
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
                    <div className="text-[11px] text-epo-slate-400 mt-1">
                        {k.hint}
                    </div>
                </div>
            ))}
        </div>
    );
}