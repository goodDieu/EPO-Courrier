// src/pages/scc/ArriveesPage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui';
import ArriveesKpi from '../../components/scc/ArriveesKpi';
import ArriveesTable from '../../components/scc/ArriveesTable';
import ArriveeFormModal from '../../components/scc/ArriveeFormModal';
import ArriveeDetailModal from '../../components/scc/ArriveeDetailModal';
import ArriveeEditModal from '../../components/scc/ArriveeEditModal';
import {
    ARRIVEES,
    FILTRES_CLASSIFICATION,
    FILTRES_ETAT,
    FILTRES_NATURE,
    FILTRES_PERIODE,
} from '../../data/arriveesSCC.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function ArriveesPage() {
    const [filtreClassification, setFiltreClassification] = useState('');
    const [filtreEtat, setFiltreEtat] = useState('');
    const [filtreNature, setFiltreNature] = useState('');
    const [filtrePeriode, setFiltrePeriode] = useState('');
    const [recherche, setRecherche] = useState('');

    const [modalFormOpen, setModalFormOpen] = useState(false);
    const [selectedArrivee, setSelectedArrivee] = useState(null);
    const [editArrivee, setEditArrivee] = useState(null);

    /* ... (filtrage identique à avant) ... */

    const listeFiltree = useMemo(() => {
        let result = ARRIVEES;

        if (filtreClassification) result = result.filter((a) => a.classification === filtreClassification);
        if (filtreEtat) result = result.filter((a) => a.etat === filtreEtat);
        if (filtreNature) result = result.filter((a) => a.nature === filtreNature);

        if (filtrePeriode) {
            const now = new Date();
            const diffJours = { 'aujourdhui': 0, '7j': 7, '30j': 30, 'annee': 365 }[filtrePeriode] ?? 999;
            result = result.filter((a) => {
                const diff = (now - new Date(a.dateReception)) / (1000 * 60 * 60 * 24);
                return diff <= diffJours;
            });
        }

        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (a) =>
                    a.id.toLowerCase().includes(q) ||
                    a.objet.toLowerCase().includes(q) ||
                    a.expediteur.toLowerCase().includes(q)
            );
        }

        return [...result].sort((a, b) => new Date(b.dateReception) - new Date(a.dateReception));
    }, [filtreClassification, filtreEtat, filtreNature, filtrePeriode, recherche]);

    const hasFiltreActif = filtreClassification || filtreEtat || filtreNature || filtrePeriode || recherche;

    const resetFiltres = () => {
        setFiltreClassification('');
        setFiltreEtat('');
        setFiltreNature('');
        setFiltrePeriode('');
        setRecherche('');
    };

    /* ============================================================
       ACTIONS
       ============================================================ */

    const handleTransmettre = (arrivee) => {
        alert(
            `Transmission du courrier ${arrivee.id} au SP-SG\n\n` +
            `→ Une transmission sera créée automatiquement\n` +
            `→ Le courrier passera à l'état "Transmis SP-SG"\n` +
            `→ Le SP-SG sera notifié`
        );
        setSelectedArrivee(null);
    };

    const handleModifier = (arrivee) => {
        // Ferme la modale de détail et ouvre la modale d'édition
        setSelectedArrivee(null);
        setEditArrivee(arrivee);
    };

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE (identique) */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Registre des arrivées
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Enregistrement, numérotation et classification des courriers entrants
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                    <Button
                        variant="primary"
                        icon="fa-plus"
                        onClick={() => setModalFormOpen(true)}
                    >
                        Enregistrer un courrier
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <ArriveesKpi arrivees={ARRIVEES} />

            {/* FILTRES */}
            <div className="flex flex-wrap items-center gap-3 p-4 mb-4 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                <div className="relative flex-1 min-w-[200px]">
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-epo-slate-400 text-[12px]" />
                    <input
                        type="text"
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                        placeholder="Rechercher par numéro, objet, expéditeur…"
                        className="w-full pl-9 pr-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>

                <SelectFilter value={filtreClassification} onChange={setFiltreClassification} options={FILTRES_CLASSIFICATION} />
                <SelectFilter value={filtreEtat} onChange={setFiltreEtat} options={FILTRES_ETAT} />
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
            <ArriveesTable
                arrivees={listeFiltree}
                onVoir={setSelectedArrivee}
                onTransmettre={handleTransmettre}
            />

            {/* ============================================
                MODALES
                ============================================ */}
            <ArriveeFormModal
                open={modalFormOpen}
                onClose={() => setModalFormOpen(false)}
            />

            <ArriveeDetailModal
                arrivee={selectedArrivee}
                onClose={() => setSelectedArrivee(null)}
                onTransmettre={handleTransmettre}
                onModifier={handleModifier}
                canTransmettre={true}
            />

            <ArriveeEditModal
                arrivee={editArrivee}
                onClose={() => setEditArrivee(null)}
            />
        </div>
    );
}

/* ============================================================
   SOUS-COMPOSANT
   ============================================================ */

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