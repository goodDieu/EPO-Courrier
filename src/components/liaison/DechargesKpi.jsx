// src/components/liaison/DechargesKpi.jsx

export default function DechargesKpi({ decharges }) {
    const total = decharges.length;
    const signatures = decharges.filter((d) => d.typePreuve === 'signature').length;
    const photos = decharges.filter((d) => d.typePreuve === 'photo').length;

    const ceMois = decharges.filter((d) => {
        const now = new Date();
        const date = new Date(d.dateSignature);
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;

    const kpis = [
        {
            id: 'total',
            label: 'Décharges',
            value: total,
            icon: 'fa-file-signature',
            variant: 'success',
            hint: 'Registre complet',
        },
        {
            id: 'signatures',
            label: 'Signatures',
            value: signatures,
            icon: 'fa-signature',
            variant: 'default',
            hint: 'Manuscrites',
        },
        {
            id: 'photos',
            label: 'Photos',
            value: photos,
            icon: 'fa-camera',
            variant: 'success',
            hint: 'Prises lors de la remise',
        },
        {
            id: 'mois',
            label: 'Ce mois',
            value: ceMois,
            icon: 'fa-calendar-check',
            variant: 'info',
            hint: 'Décharges archivées',
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
                          k.variant === 'info' ? 'text-epo-slate-500' :
                          'text-epo-slate-400'}
                    `} />
                    <div className="text-[13px] font-medium text-epo-slate-500">
                        {k.label}
                    </div>
                    <div className={`
                        text-3xl font-bold mt-1 tracking-tight tabular-nums
                        ${k.variant === 'success' ? 'text-epo-green-600' :
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