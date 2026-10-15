// src/components/sp-sg/InstructionsKpi.jsx

export default function InstructionsKpi({ instructions }) {
    const aTraiter = instructions.filter((i) => i.statut === 'a-traiter').length;
    const enCours = instructions.filter((i) => i.statut === 'en-cours').length;
    const traitees = instructions.filter((i) => i.statut === 'traite').length;
    const urgentes = instructions.filter((i) => i.prioriteInterne === 'urgente' && i.statut !== 'traite').length;

    const kpis = [
        {
            id: 'a-traiter',
            label: 'À traiter',
            value: aTraiter,
            icon: 'fa-clock',
            variant: aTraiter > 0 ? 'urgent' : 'success',
            hint: 'Instructions en attente',
        },
        {
            id: 'en-cours',
            label: 'En cours',
            value: enCours,
            icon: 'fa-spinner',
            variant: 'warning',
            hint: 'En cours d\'exécution',
        },
        {
            id: 'urgentes',
            label: 'Urgentes',
            value: urgentes,
            icon: 'fa-exclamation-circle',
            variant: urgentes > 0 ? 'urgent' : 'default',
            hint: 'Priorité haute',
        },
        {
            id: 'traitees',
            label: 'Traitées',
            value: traitees,
            icon: 'fa-check-circle',
            variant: 'success',
            hint: 'Historique',
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