// src/components/dg/RejetesKpi.jsx

export default function RejetesKpi({ documents }) {
    const rejetes = documents.filter((d) => d.etat === 'rejete').length;
    const enCorrection = documents.filter((d) => d.etat === 'en-correction').length;
    const reSoumis = documents.filter((d) => d.etat === 're-soumis').length;

    // Délai moyen de correction (en heures)
    const corriges = documents.filter(
        (d) => d.dateRejet && d.dateReSoumission
    );
    const delaiMoyen =
        corriges.length > 0
            ? Math.round(
                  corriges.reduce(
                      (sum, d) =>
                          sum +
                          (new Date(d.dateReSoumission) - new Date(d.dateRejet)) /
                              (1000 * 60 * 60),
                      0
                  ) / corriges.length
              )
            : 0;

    const kpis = [
        {
            id: 'rejetes',
            label: 'Rejetés',
            value: rejetes,
            icon: 'fa-times-circle',
            variant: 'urgent',
            hint: 'En attente de correction',
        },
        {
            id: 'correction',
            label: 'En correction',
            value: enCorrection,
            icon: 'fa-pen',
            variant: 'warning',
            hint: 'Chez le producteur',
        },
        {
            id: 'resoumis',
            label: 'Re-soumis',
            value: reSoumis,
            icon: 'fa-redo',
            variant: 'success',
            hint: 'À traiter à nouveau',
        },
        {
            id: 'delai',
            label: 'Délai moyen correction',
            value: delaiMoyen ? `${delaiMoyen}h` : '—',
            icon: 'fa-clock',
            variant: 'default',
            hint: 'Rejet → Re-soumission',
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