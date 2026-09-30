// src/components/scc/ScanKpi.jsx

export default function ScanKpi({ documents }) {
    const aScanner = documents.filter((d) => d.etat === 'a-scanner').length;
    const enCours = documents.filter((d) => d.etat === 'en-cours').length;
    const scanneAujourdhui = documents.filter((d) => {
        if (d.etat !== 'scanne' || !d.dateScan) return false;
        const today = new Date();
        const scanDate = new Date(d.dateScan);
        return (
            scanDate.getDate() === today.getDate() &&
            scanDate.getMonth() === today.getMonth() &&
            scanDate.getFullYear() === today.getFullYear()
        );
    }).length;
    const erreurs = documents.filter((d) => d.etat === 'erreur').length;

    const kpis = [
        {
            id: 'a-scanner',
            label: 'À scanner',
            value: aScanner,
            icon: 'fa-clock',
            variant: 'warning',
            hint: 'En attente de numérisation',
        },
        {
            id: 'en-cours',
            label: 'En cours',
            value: enCours,
            icon: 'fa-spinner',
            variant: 'default',
            hint: 'Traitement Tauri en cours',
        },
        {
            id: 'scannes',
            label: "Scannés aujourd'hui",
            value: scanneAujourdhui,
            icon: 'fa-check-circle',
            variant: 'success',
            hint: 'Hash d\'intégrité vérifié',
        },
        {
            id: 'erreurs',
            label: 'Erreurs',
            value: erreurs,
            icon: 'fa-exclamation-triangle',
            variant: 'urgent',
            hint: 'Nécessitent une intervention',
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