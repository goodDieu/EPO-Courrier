// src/components/dg/ActesSignesKpi.jsx

export default function ActesSignesKpi({ actes }) {
    const total = actes.length;
    const signesParDG = actes.filter((a) => a.signataire === 'dg').length;
    const signesParDelegation = actes.filter((a) => a.signataire === 'sg-delegation').length;
    const archives = actes.filter((a) => a.etat === 'archive').length;

    const kpis = [
        {
            id: 'total',
            label: 'Actes signés',
            value: total,
            icon: 'fa-file-signature',
            variant: 'default',
            hint: 'Registre complet',
        },
        {
            id: 'dg',
            label: 'Signés par le DG',
            value: signesParDG,
            icon: 'fa-user-tie',
            variant: 'success',
            hint: 'En personne',
        },
        {
            id: 'delegation',
            label: 'Par délégation',
            value: signesParDelegation,
            icon: 'fa-stamp',
            variant: 'default',
            hint: 'Mention §7.1 apposée',
        },
        {
            id: 'archives',
            label: 'Archivés',
            value: archives,
            icon: 'fa-archive',
            variant: 'default',
            hint: 'Clôturés et archivés',
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
                          'text-epo-slate-400'}
                    `} />
                    <div className="text-[13px] font-medium text-epo-slate-500">
                        {k.label}
                    </div>
                    <div className={`
                        text-3xl font-bold mt-1 tracking-tight tabular-nums
                        ${k.variant === 'success' ? 'text-epo-green-600' : 'text-epo-slate-900'}
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