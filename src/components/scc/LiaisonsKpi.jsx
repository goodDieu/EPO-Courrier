// src/components/scc/LiaisonsKpi.jsx

export default function LiaisonsKpi({ agents }) {
    const actives = agents.filter((a) => a.statut === 'en-tournee').length;
    const disponibles = agents.filter((a) => a.statut === 'disponible').length;

    const totalRemises = agents.reduce((sum, a) => sum + a.remises.length, 0);
    const remisesFaites = agents.reduce(
        (sum, a) => sum + a.remises.filter((r) => r.statut === 'remis').length,
        0
    );
    const retards = agents.reduce(
        (sum, a) => sum + a.remises.filter((r) => r.statut === 'en-retard').length,
        0
    );

    const kpis = [
        {
            id: 'tournees',
            label: 'Tournées actives',
            value: actives,
            icon: 'fa-truck',
            variant: 'default',
            hint: 'Agents en cours de tournée',
        },
        {
            id: 'disponibles',
            label: 'Agents disponibles',
            value: disponibles,
            icon: 'fa-user-check',
            variant: 'success',
            hint: 'Prêts pour affectation',
        },
        {
            id: 'remises',
            label: 'Remises du jour',
            value: `${remisesFaites} / ${totalRemises}`,
            icon: 'fa-check-circle',
            variant: 'info',
            hint: 'Effectuées / total du jour',
        },
        {
            id: 'retards',
            label: 'En retard',
            value: retards,
            icon: 'fa-exclamation-triangle',
            variant: 'urgent',
            hint: 'Remises en dépassement',
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
                          k.variant === 'success' ? 'text-epo-green-500' :
                          k.variant === 'info' ? 'text-epo-slate-500' :
                          'text-epo-slate-400'}
                    `} />
                    <div className="text-[13px] font-medium text-epo-slate-500">
                        {k.label}
                    </div>
                    <div className={`
                        text-3xl font-bold mt-1 tracking-tight tabular-nums
                        ${k.variant === 'urgent' ? 'text-epo-red-600' :
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