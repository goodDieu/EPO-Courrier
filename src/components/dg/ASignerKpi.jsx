// src/components/dg/ASignerKpi.jsx
import { peutSignerEnMasse } from '../../data/aSignerDG.js';

export default function ASignerKpi({ documents }) {
    const total = documents.length;
    const urgents = documents.filter((d) => d.priorite === 'urgent').length;
    const confidentiels = documents.filter((d) => d.priorite === 'confidentiel').length;
    const enMasse = documents.filter(peutSignerEnMasse).length;

    const kpis = [
        {
            id: 'total',
            label: 'À signer',
            value: total,
            icon: 'fa-pen',
            variant: 'warning',
            hint: 'Documents en attente',
        },
        {
            id: 'urgents',
            label: 'Urgents',
            value: urgents,
            icon: 'fa-exclamation-circle',
            variant: 'urgent',
            hint: 'À traiter aujourd\'hui',
        },
        {
            id: 'confidentiels',
            label: 'Confidentiels',
            value: confidentiels,
            icon: 'fa-lock',
            variant: 'default',
            hint: 'Accès restreint',
        },
        {
            id: 'masse',
            label: 'Signables en masse',
            value: enMasse,
            icon: 'fa-check-double',
            variant: 'success',
            hint: 'Non confidentiels, non urgents',
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