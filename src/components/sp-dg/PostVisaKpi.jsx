// src/components/sp-dg/PostVisaKpi.jsx

export default function PostVisaKpi({ dossiers }) {
    const aCocher = dossiers.filter((d) => d.etat === 'a-cocher').length;
    const enRetard = dossiers.filter((d) => d.etat === 'a-cocher' && d.tempsRestantMin < 0).length;
    const signes = dossiers.filter((d) => ['signe', 'sg-delegation'].includes(d.etat)).length;
    const rejetes = dossiers.filter((d) => d.etat === 'rejete').length;

    const kpis = [
        {
            id: 'a-cocher',
            label: 'À cocher',
            value: aCocher,
            icon: 'fa-check-square',
            variant: 'urgent',
            hint: 'En attente de votre action',
        },
        {
            id: 'retard',
            label: 'En retard',
            value: enRetard,
            icon: 'fa-exclamation-circle',
            variant: 'urgent',
            hint: 'Black-out en cours',
        },
        {
            id: 'signes',
            label: 'Signés',
            value: signes,
            icon: 'fa-check-circle',
            variant: 'success',
            hint: 'Coche effectuée',
        },
        {
            id: 'rejetes',
            label: 'Rejetés',
            value: rejetes,
            icon: 'fa-times-circle',
            variant: 'warning',
            hint: 'À retourner au SG',
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
                          k.variant === 'success' ? 'text-epo-slate-400' :
                          k.variant === 'warning' ? 'text-epo-slate-400' :
                          'text-epo-slate-400'}
                    `} />
                    <div className="text-sm font-medium text-epo-slate-500">
                        {k.label}
                    </div>
                    <div className={`
                        text-3xl font-bold mt-1 tracking-tight tabular-nums
                        ${k.variant === 'urgent' ? 'text-epo-slate-900' :
                          k.variant === 'success' ? 'text-epo-slate-900' :
                          k.variant === 'warning' ? 'text-epo-slate-900' :
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