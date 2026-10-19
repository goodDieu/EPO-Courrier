// src/components/actes/RegleRHAlert.jsx
// Résultat d'une règle RH : texte foncé, icône verte (respectée) ou rouge (bloquante).

export default function RegleRHAlert({ regle, resultat }) {
    if (!resultat) return null;
    const isBloque = resultat.bloque;

    return (
        <div className="flex items-start gap-2.5 p-3 border rounded-lg border-epo-slate-200 bg-white">
            <i className={`fas ${isBloque ? 'fa-circle-exclamation text-epo-red-600' : 'fa-circle-check text-epo-green-600'} mt-0.5`} aria-hidden="true" />
            <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-epo-slate-900">{regle.libelle}</div>
                {resultat.message && <div className="text-sm mt-0.5 text-epo-slate-700">{resultat.message}</div>}
            </div>
        </div>
    );
}
