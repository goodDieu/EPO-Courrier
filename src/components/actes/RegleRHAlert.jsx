// src/components/actes/RegleRHAlert.jsx

export default function RegleRHAlert({ regle, resultat }) {
    if (!resultat) return null;

    const isBloque = resultat.bloque;
    const bg = isBloque ? 'bg-epo-red-50 border-epo-red-200' : 'bg-epo-green-50 border-epo-green-200';
    const text = isBloque ? 'text-epo-red-800' : 'text-epo-green-800';
    const icon = isBloque ? 'fa-exclamation-triangle' : 'fa-check-circle';
    const iconColor = isBloque ? 'text-epo-red-600' : 'text-epo-green-600';

    return (
        <div className={`flex items-start gap-2.5 p-3 rounded-lg border ${bg}`}>
            <i className={`fas ${icon} ${iconColor} mt-0.5`} />
            <div className="flex-1 min-w-0">
                <div className={`text-[12.5px] font-semibold ${text}`}>
                    {regle.code} - {regle.libelle}
                </div>
                {resultat.message && (
                    <div className={`text-[12px] mt-0.5 ${text} opacity-90`}>
                        {resultat.message}
                    </div>
                )}
            </div>
        </div>
    );
}