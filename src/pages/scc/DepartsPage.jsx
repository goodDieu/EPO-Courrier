// src/pages/scc/DepartsPage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui/index.js';
import DepartsKpi from '../../components/scc/DepartsKpi.jsx';
import DepartsTable from '../../components/scc/DepartsTable.jsx';
import DepartDetailModal from '../../components/scc/DepartDetailModal.jsx';
import DepartTraitementModal from '../../components/scc/DepartTraitementModal.jsx';
import {
    DEPARTS,
    FILTRES_ETAT,
    FILTRES_MODE,
    FILTRES_NATURE,
    FILTRES_PERIODE,
} from '../../data/departsSCC.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function DepartsPage() {
    const [filtreEtat, setFiltreEtat] = useState('');
    const [filtreMode, setFiltreMode] = useState('');
    const [filtreNature, setFiltreNature] = useState('');
    const [filtrePeriode, setFiltrePeriode] = useState('');
    const [recherche, setRecherche] = useState('');

    const [selectedDepart, setSelectedDepart] = useState(null);
    const [traitementDepart, setTraitementDepart] = useState(null);

    const listeFiltree = useMemo(() => {
        let result = DEPARTS;

        if (filtreEtat) result = result.filter((d) => d.etat === filtreEtat);
        if (filtreMode) result = result.filter((d) => d.mode === filtreMode);
        if (filtreNature) result = result.filter((d) => d.nature === filtreNature);

        if (filtrePeriode) {
            const now = new Date();
            const diffJours = { 'aujourdhui': 0, '7j': 7, '30j': 30, 'annee': 365 }[filtrePeriode] ?? 999;
            result = result.filter((d) => {
                const diff = (now - new Date(d.dateReceptionSCC)) / (1000 * 60 * 60 * 24);
                return diff <= diffJours;
            });
        }

        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (d) =>
                    (d.numeroSortant || '').toLowerCase().includes(q) ||
                    d.objet.toLowerCase().includes(q) ||
                    d.beneficiaire.toLowerCase().includes(q) ||
                    d.documentSource.toLowerCase().includes(q)
            );
        }

        return [...result].sort((a, b) => new Date(b.dateReceptionSCC) - new Date(a.dateReceptionSCC));
    }, [filtreEtat, filtreMode, filtreNature, filtrePeriode, recherche]);

    const hasFiltreActif = filtreEtat || filtreMode || filtreNature || filtrePeriode || recherche;

    const resetFiltres = () => {
        setFiltreEtat('');
        setFiltreMode('');
        setFiltreNature('');
        setFiltrePeriode('');
        setRecherche('');
    };

    /* Actions */
    const handleTraiter = (depart) => {
        setSelectedDepart(null);
        setTraitementDepart(depart);
    };

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Registre des départs
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Numérotation, cachet et expédition des courriers sortants signés
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <DepartsKpi departs={DEPARTS} />

            {/* FILTRES */}
            <div className="flex flex-wrap items-center gap-3 p-4 mb-4 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                <div className="relative flex-1 min-w-[200px]">
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-epo-slate-400 text-[12px]" />
                    <input
                        type="text"
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                        placeholder="Rechercher par numéro, objet, bénéficiaire…"
                        className="w-full pl-9 pr-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>

                <SelectFilter value={filtreEtat} onChange={setFiltreEtat} options={FILTRES_ETAT} />
                <SelectFilter value={filtreMode} onChange={setFiltreMode} options={FILTRES_MODE} />
                <SelectFilter value={filtreNature} onChange={setFiltreNature} options={FILTRES_NATURE} />
                <SelectFilter value={filtrePeriode} onChange={setFiltrePeriode} options={FILTRES_PERIODE} />

                {hasFiltreActif && (
                    <button
                        onClick={resetFiltres}
                        className="ml-auto text-[12.5px] font-medium text-epo-red-600 hover:underline"
                    >
                        <i className="mr-1 fas fa-times" />
                        Réinitialiser
                    </button>
                )}
            </div>

            {/* TABLEAU */}
            <DepartsTable
                departs={listeFiltree}
                onVoir={setSelectedDepart}
                onTraiter={handleTraiter}
            />

            {/* MODALES */}
            <DepartDetailModal
                depart={selectedDepart}
                onClose={() => setSelectedDepart(null)}
                onTraiter={handleTraiter}
            />

            <DepartTraitementModal
                depart={traitementDepart}
                onClose={() => setTraitementDepart(null)}
            />
        </div>
    );
}

function SelectFilter({ value, onChange, options }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="px-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] text-epo-slate-800 bg-white focus:outline-none focus:border-epo-green-500"
        >
            {options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
            ))}
        </select>
    );
}