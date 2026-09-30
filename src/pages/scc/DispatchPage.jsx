// src/pages/scc/DispatchPage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui';
import DispatchKpi from '../../components/scc/DispatchKpi';
import DispatchTable from '../../components/scc/DispatchTable';
import DispatchModal from '../../components/scc/DispatchModal';
import DispatchDetailModal from '../../components/scc/DispatchDetailModal';
import {
    DOSSIERS_DISPATCH,
    FILTRES_ETAT,
    FILTRES_CLASSIFICATION,
    FILTRES_MODE,
    FILTRES_STRUCTURE,
} from '../../data/dispatchSCC.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function DispatchPage() {
    const [filtreEtat, setFiltreEtat] = useState('');
    const [filtreClassification, setFiltreClassification] = useState('');
    const [filtreMode, setFiltreMode] = useState('');
    const [filtreStructure, setFiltreStructure] = useState('');
    const [recherche, setRecherche] = useState('');

    const [selectedDossier, setSelectedDossier] = useState(null);
    const [dispatchDossier, setDispatchDossier] = useState(null);

    const listeFiltree = useMemo(() => {
        let result = DOSSIERS_DISPATCH;

        if (filtreEtat) result = result.filter((d) => d.etat === filtreEtat);
        if (filtreClassification) result = result.filter((d) => d.classification === filtreClassification);
        if (filtreMode) result = result.filter((d) => d.modePrevu === filtreMode);
        if (filtreStructure) result = result.filter((d) => d.structureDestinataire === filtreStructure);

        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (d) =>
                    d.id.toLowerCase().includes(q) ||
                    d.objet.toLowerCase().includes(q) ||
                    d.expediteur.toLowerCase().includes(q) ||
                    d.destinataire.personne.toLowerCase().includes(q)
            );
        }

        // Tri intelligent : retards d'abord, puis par priorité, puis par temps restant
        return [...result].sort((a, b) => {
            const aLate = a.etat === 'en-retard';
            const bLate = b.etat === 'en-retard';
            if (aLate !== bLate) return aLate ? -1 : 1;
            if (a.prioriteScore !== b.prioriteScore) return b.prioriteScore - a.prioriteScore;
            return a.tempsRestant - b.tempsRestant;
        });
    }, [filtreEtat, filtreClassification, filtreMode, filtreStructure, recherche]);

    const hasFiltreActif = filtreEtat || filtreClassification || filtreMode || filtreStructure || recherche;

    const resetFiltres = () => {
        setFiltreEtat('');
        setFiltreClassification('');
        setFiltreMode('');
        setFiltreStructure('');
        setRecherche('');
    };

    const handleDispatcher = (dossier) => {
        setSelectedDossier(null);
        setDispatchDossier(dossier);
    };

    return (
        <div className="w-full min-w-0">
            {/* ============================================
                EN-TÊTE
                ============================================ */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Dossiers à dispatcher
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Répartition des courriers imputés vers les structures destinataires
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                    <Button variant="outline" icon="fa-route">
                        Voir les tournées
                    </Button>
                </div>
            </div>

            {/* ============================================
                KPI
                ============================================ */}
            <DispatchKpi dossiers={DOSSIERS_DISPATCH} />

            {/* ============================================
                FILTRES
                ============================================ */}
            <div className="flex flex-wrap items-center gap-3 p-4 mb-4 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                <div className="relative flex-1 min-w-[200px]">
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-epo-slate-400 text-[12px]" />
                    <input
                        type="text"
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                        placeholder="Rechercher par numéro, objet, destinataire…"
                        className="w-full pl-9 pr-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>

                <SelectFilter value={filtreEtat} onChange={setFiltreEtat} options={FILTRES_ETAT} />
                <SelectFilter value={filtreClassification} onChange={setFiltreClassification} options={FILTRES_CLASSIFICATION} />
                <SelectFilter value={filtreMode} onChange={setFiltreMode} options={FILTRES_MODE} />
                <SelectFilter value={filtreStructure} onChange={setFiltreStructure} options={FILTRES_STRUCTURE} />

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

            {/* ============================================
                TABLEAU
                ============================================ */}
            <DispatchTable
                dossiers={listeFiltree}
                onVoir={setSelectedDossier}
                onDispatcher={handleDispatcher}
            />

            {/* ============================================
                MODALES
                ============================================ */}
            <DispatchDetailModal
                dossier={selectedDossier}
                onClose={() => setSelectedDossier(null)}
                onDispatcher={handleDispatcher}
            />

            <DispatchModal
                dossier={dispatchDossier}
                onClose={() => setDispatchDossier(null)}
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