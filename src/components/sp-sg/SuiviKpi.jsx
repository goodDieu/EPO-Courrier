// src/components/sp-sg/SuiviKpi.jsx

export default function SuiviKpi({ dossiers }) {
    const total = dossiers.length;
    const enCirculation = dossiers.filter((d) => d.statut === 'en-circulation').length;
    const bloques = dossiers.filter((d) => d.bloquee).length;
    const clotures = dossiers.filter((d) => d.statut === 'cloture').length;

    // Calcul de la durée moyenne dans le circuit (hors clôturés)
    const actifs = dossiers.filter((d) => d.statut !== 'cloture');
    const dureeMoyenne = actifs.length > 0
        ? Math.round(actifs.reduce((sum, d) => sum + d.tempsCircuit, 0) / actifs.length)
        : 0;

    const formatDuree = (min) => {
        const abs = Math.abs(min);
        if (abs < 60) return `${abs}min`;
        const h = Math.floor(abs / 60);
        if (h < 24) return `${h}h`;
        return `${Math.floor(h / 24)}j`;
    };

    const kpis = [
        {
            id: 'total',
            label: 'Dossiers suivis',
            value: total,
            icon: 'fa-stream',
            variant: 'default',
            hint: 'Tous états confondus',
        },
        {
            id: 'circulation',
            label: 'En circulation',
            value: enCirculation,
            icon: 'fa-route',
            variant: 'warning',
            hint: 'Actuellement dans le circuit',
        },
        {
            id: 'bloques',
            label: 'Bloqués',
            value: bloques,
            icon: 'fa-exclamation-triangle',
            variant: bloques > 0 ? 'urgent' : 'success',
            hint: 'Nécessitent une action',
        },
        {
            id: 'duree',
            label: 'Durée moyenne',
            value: formatDuree(dureeMoyenne),
            icon: 'fa-stopwatch',
            variant: 'info',
            hint: 'Dans le circuit',
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
                          k.variant === 'info' ? 'text-epo-slate-500' :
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