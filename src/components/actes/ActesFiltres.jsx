// src/components/actes/ActesFiltres.jsx
import {
    FILTRES_NATURE,
    FILTRES_ETAT,
    FILTRES_PERIODE,
} from '../../data/actes.js';

export default function ActesFiltres({
    nature,
    setNature,
    etat,
    setEtat,
    periode,
    setPeriode,
    recherche,
    setRecherche,
    onReset,
    hasFiltreActif,
}) {
    return (
        <div className="flex flex-wrap items-center gap-3 p-4 mb-4 bg-white border border-epo-slate-200 rounded-xl shadow-soft">
            {/* Recherche */}
            <div className="relative flex-1 min-w-[200px]">
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-epo-slate-400 text-[12px]" />
                <input
                    type="text"
                    value={recherche}
                    onChange={(e) => setRecherche(e.target.value)}
                    placeholder="Rechercher par bénéficiaire, matricule, objet…"
                    className="
                        w-full pl-9 pr-3 py-2 border border-epo-slate-300 rounded-lg
                        text-[13px] text-epo-slate-800 bg-white
                        focus:outline-none focus:border-epo-green-500
                        focus:ring-2 focus:ring-epo-green-500/10
                    "
                />
            </div>

            <SelectFilter label="Nature" value={nature} onChange={setNature} options={FILTRES_NATURE} />
            <SelectFilter label="État" value={etat} onChange={setEtat} options={FILTRES_ETAT} />
            <SelectFilter label="Période" value={periode} onChange={setPeriode} options={FILTRES_PERIODE} />

            {hasFiltreActif && (
                <button
                    onClick={onReset}
                    className="text-[12.5px] font-medium text-epo-red-600 hover:underline ml-auto"
                >
                    <i className="mr-1 fas fa-times" />
                    Réinitialiser
                </button>
            )}
        </div>
    );
}

function SelectFilter({ label, value, onChange, options }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="
                px-3 py-2 border border-epo-slate-300 rounded-lg
                text-[13px] text-epo-slate-800 bg-white
                focus:outline-none focus:border-epo-green-500
                focus:ring-2 focus:ring-epo-green-500/10
            "
            title={label}
        >
            {options.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </select>
    );
}