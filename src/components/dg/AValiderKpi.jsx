// src/components/dg/AValiderKpi.jsx

export default function AValiderKpi({ documents }) {
    const total = documents.length;
    const urgents = documents.filter((d) => d.priorite === 'urgent').length;
    const enAttente24h = documents.filter(
        (d) => d.tempsRestantMin >= 0 && d.tempsRestantMin < 24 * 60
    ).length;
    const produitsPar = new Set(documents.map((d) => d.provenence)).size;

    const kpis = [
        {
            id: 'total',
            label: 'À valider',
            value: total,
            icon: 'fa-check-double',
            variant: 'warning',
            hint: 'Documents en attente d\'avis',
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
            id: 'echeance',
            label: 'Échéance < 24h',
            value: enAttente24h,
            icon: 'fa-clock',
            variant: 'warning',
            hint: 'Délai critique proche',
        },
        {
            id: 'sources',
            label: 'Provenances',
            value: produitsPar,
            icon: 'fa-sitemap',
            variant: 'default',
            hint: 'Directions émettrices',
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