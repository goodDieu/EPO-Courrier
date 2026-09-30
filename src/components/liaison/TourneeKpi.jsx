// src/components/liaison/TourneeKpi.jsx

export default function TourneeKpi({ tournees }) {
    const enCours = tournees.filter((t) => t.etat === 'en-cours').length;
    const planifiees = tournees.filter((t) => t.etat === 'planifiee').length;
    const terminees = tournees.filter((t) => t.etat === 'terminee').length;
    const partielles = tournees.filter((t) => t.etat === 'partielle').length;

    const totalEtapes = tournees.reduce((sum, t) => sum + t.nbEtapes, 0);
    const totalFaites = tournees.reduce((sum, t) => sum + t.nbFaites, 0);

    const kpis = [
        {
            id: 'en-cours',
            label: 'En cours',
            value: enCours,
            icon: 'fa-spinner',
            variant: 'dark',
            hint: 'Tournée active',
        },
        {
            id: 'planifiees',
            label: 'Planifiées',
            value: planifiees,
            icon: 'fa-calendar-alt',
            variant: 'default',
            hint: 'À venir',
        },
        {
            id: 'terminees',
            label: 'Terminées',
            value: terminees + partielles,
            icon: 'fa-check-circle',
            variant: 'success',
            hint: `${partielles} partielle${partielles > 1 ? 's' : ''}`,
        },
        {
            id: 'progression',
            label: 'Remises effectuées',
            value: `${totalFaites}/${totalEtapes}`,
            icon: 'fa-route',
            variant: 'info',
            hint: 'Sur la période',
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((k) => (
                <div
                    key={k.id}
                    className={`
                        relative p-5 border shadow-soft rounded-xl
                        ${k.variant === 'dark' ? 'bg-epo-slate-800 border-epo-slate-700' : 'bg-white border-epo-slate-200'}
                    `}
                >
                    <i className={`
                        fas ${k.icon} absolute top-4 right-5 text-2xl opacity-20
                        ${k.variant === 'success' ? 'text-epo-green-500' :
                          k.variant === 'dark' ? 'text-white' :
                          k.variant === 'info' ? 'text-epo-green-500' :
                          'text-epo-slate-400'}
                    `} />
                    <div className={`text-[13px] font-medium ${k.variant === 'dark' ? 'text-epo-slate-300' : 'text-epo-slate-500'}`}>
                        {k.label}
                    </div>
                    <div className={`
                        text-3xl font-bold mt-1 tracking-tight tabular-nums
                        ${k.variant === 'success' ? 'text-epo-green-600' :
                          k.variant === 'dark' ? 'text-white' :
                          k.variant === 'info' ? 'text-epo-green-600' :
                          'text-epo-slate-900'}
                    `}>
                        {k.value}
                    </div>
                    <div className={`text-[11px] mt-1 ${k.variant === 'dark' ? 'text-epo-slate-400' : 'text-epo-slate-400'}`}>
                        {k.hint}
                    </div>
                </div>
            ))}
        </div>
    );
}