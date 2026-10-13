// src/pages/sp-sg/TriPage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui';
import TriKpi from '../../components/sp-sg/TriKpi';
import QuadrantEisenhower from '../../components/sp-sg/QuadrantEisenhower';
import TriModal from '../../components/sp-sg/TriModal';
import {
    DOSSIERS_TRI,
    QUADRANTS,
    TYPES_DOSSIERS,
    FILTRES_PRIORITE,
    FILTRES_AGENT,
    formatHeure,
    formatDuree,
} from '../../data/triSPSG.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function TriPage() {
    const [dossiers, setDossiers] = useState(DOSSIERS_TRI);
    const [filtrePriorite, setFiltrePriorite] = useState('');
    const [filtreAgent, setFiltreAgent] = useState('');
    const [recherche, setRecherche] = useState('');
    const [vue, setVue] = useState('grille'); // 'grille' | 'tableau'

    const [dossierAClasser, setDossierAClasser] = useState(null);

    /* Dossiers filtrés */
    const dossiersFiltres = useMemo(() => {
        let result = dossiers;

        if (filtrePriorite) result = result.filter((d) => d.priorite === filtrePriorite);
        if (filtreAgent) result = result.filter((d) => d.agentLiaison === filtreAgent);

        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (d) =>
                    d.id.toLowerCase().includes(q) ||
                    d.objet.toLowerCase().includes(q) ||
                    d.expediteurNom.toLowerCase().includes(q)
            );
        }

        return result;
    }, [dossiers, filtrePriorite, filtreAgent, recherche]);

    /* Dossiers par quadrant */
    const dossiersParQuadrant = useMemo(() => {
        const g = {
            'important-urgent': [],
            'important-non-urgent': [],
            'non-important-urgent': [],
            'non-important-non-urgent': [],
        };
        dossiersFiltres.forEach((d) => {
            if (d.classification) g[d.classification].push(d);
        });
        return g;
    }, [dossiersFiltres]);

    /* Dossiers non triés */
    const dossiersNonTries = useMemo(() => {
        return dossiersFiltres.filter((d) => !d.classification);
    }, [dossiersFiltres]);

    const hasFiltreActif = filtrePriorite || filtreAgent || recherche;

    const resetFiltres = () => {
        setFiltrePriorite('');
        setFiltreAgent('');
        setRecherche('');
    };

    /* Drag & Drop : recevoir un dossier */
    const handleDrop = (dossierId, quadrantKey) => {
        setDossiers((prev) =>
            prev.map((d) =>
                d.id === dossierId
                    ? {
                          ...d,
                          classification: quadrantKey,
                          classifiePar: 'Mme KABORÉ Fatimata',
                          classifieLe: new Date().toISOString(),
                      }
                    : d
            )
        );
    };

    /* Actions */
    const handleClasser = (dossier) => setDossierAClasser(dossier);
    const handleVoir = (dossier) => alert(`Détail de ${dossier.id}`);

    const handleCliquerClasser = (dossier) => {
        setDossierAClasser(dossier);
    };

    const handleValiderTri = (quadrantKey, motif) => {
        setDossiers((prev) =>
            prev.map((d) =>
                d.id === dossierAClasser.id
                    ? {
                          ...d,
                          classification: quadrantKey,
                          classifiePar: 'Mme KABORÉ Fatimata',
                          classifieLe: new Date().toISOString(),
                      }
                    : d
            )
        );
        setDossierAClasser(null);
    };

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-epo-slate-900">
                        Tri & classement
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Classification selon la matrice d'importance / urgence- §10.5
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <TriKpi dossiers={dossiers} />

            {/* BANDEAU MATRICE */}
            <div className="flex items-start gap-3 p-4 mb-6 border rounded-xl bg-epo-slate-50 border-epo-slate-200">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-lg bg-epo-slate-700">
                    <i className="fas fa-th text-[15px]" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-epo-slate-800">
                        Matrice d'Eisenhower- §10.5
                    </div>
                    <div className="text-[12px] text-epo-slate-600 mt-0.5">
                        Classez chaque dossier selon deux axes : <strong>importance</strong> (fond, enjeu) et <strong>urgence</strong> (délai, échéance). Cette classification détermine l'ordre d'introduction au SG.
                    </div>
                </div>
            </div>

            {/* FILTRES */}
            <div className="flex flex-wrap items-center gap-3 p-4 mb-6 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                <div className="relative flex-1 min-w-[200px]">
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-epo-slate-400 text-[12px]" />
                    <input
                        type="text"
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                        placeholder="Rechercher par N°, objet, expéditeur…"
                        className="w-full pl-9 pr-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>

                <SelectFilter value={filtrePriorite} onChange={setFiltrePriorite} options={FILTRES_PRIORITE} />
                <SelectFilter value={filtreAgent} onChange={setFiltreAgent} options={FILTRES_AGENT} />

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

            {/* SECTION : À TRIER */}
            {dossiersNonTries.length > 0 && (
                <div className="mb-7">
                    <div className="flex items-center gap-2.5 mb-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-epo-yellow-50 text-epo-yellow-700">
                            <i className="fas fa-th text-[13px]" />
                        </span>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-[15px] font-bold text-epo-yellow-700">
                                    À classer
                                </h3>
                                <span className="text-[11.5px] font-semibold px-2 py-0.5 rounded-full bg-epo-yellow-100 text-epo-yellow-800">
                                    {dossiersNonTries.length}
                                </span>
                            </div>
                            <div className="text-[11.5px] text-epo-slate-400">
                                Glissez un dossier dans un quadrant OR cliquez pour classer
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {dossiersNonTries.map((d) => (
                            <CarteNonTrie
                                key={d.id}
                                dossier={d}
                                onClasser={handleCliquerClasser}
                                onVoir={handleVoir}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* GRILLE EISENHOWER */}
            <div className="mb-4">
                <h2 className="text-[16px] font-bold text-epo-slate-800 flex items-center gap-2 mb-3">
                    <i className="fas fa-th-large text-epo-green-600" />
                    Matrice d'importance / urgence
                </h2>
                <div className="text-[12.5px] text-epo-slate-500 mb-4">
                    Cliquez sur un dossier pour le reclasser
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {Object.values(QUADRANTS).map((q) => (
                    <QuadrantEisenhower
                        key={q.key}
                        quadrantKey={q.key}
                        dossiers={dossiersParQuadrant[q.key]}
                        onDrop={handleDrop}
                        onVoir={handleVoir}
                    />
                ))}
            </div>

            {/* MODALE */}
            <TriModal
                dossier={dossierAClasser}
                onClose={() => setDossierAClasser(null)}
                onClasser={handleValiderTri}
            />
        </div>
    );
}

/* ============================================================
   SOUS-COMPOSANTS
   ============================================================ */

function CarteNonTrie({ dossier, onClasser, onVoir }) {
    const d = dossier;
    const type = TYPES_DOSSIERS[d.type];
    const isUrgent = d.priorite === 'urgent';
    const isLate = d.tempsAttente > 30;

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/dossier-id', d.id);
        e.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className={`
                bg-white border border-epo-slate-200 border-l-4 rounded-xl p-4 shadow-soft
                cursor-move hover:shadow-card hover:-translate-y-0.5 transition
                ${isLate ? 'border-l-epo-red-500' : isUrgent ? 'border-l-epo-yellow-500' : 'border-l-epo-slate-300'}
            `}
        >
            {/* En-tête */}
            <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[11.5px] font-bold text-epo-slate-700 bg-epo-slate-100 px-2 py-0.5 rounded-full">
                    {d.id}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${type.color}`}>
                    <i className={`fas ${type.icon} text-[9px]`} />
                    {type.label}
                </span>
            </div>

            {/* Objet */}
            <div className="text-[13px] font-semibold text-epo-slate-900 leading-snug mb-2 line-clamp-2">
                {d.objet}
            </div>

            {/* Expéditeur + méta */}
            <div className="flex flex-col gap-1 mb-3 text-[11px] text-epo-slate-500">
                <span className="truncate">
                    <i className="fas fa-building text-[9.5px] mr-1" />
                    {d.expediteurStructure}
                </span>
                <span className={isLate ? 'text-epo-red-600 font-semibold' : ''}>
                    <i className="fas fa-clock text-[9.5px] mr-1" />
                    {formatDuree(d.tempsAttente)}
                </span>
            </div>

            {/* Boutons */}
            <div className="flex items-center gap-2 pt-2 border-t border-epo-slate-100">
                <button
                    onClick={() => onClasser(d)}
                    className="
                        flex-1 flex items-center justify-center gap-2
                        py-2 px-3 rounded-lg
                        bg-epo-green-500 text-white text-[12.5px] font-bold
                        hover:bg-epo-green-600 active:scale-[0.98] transition
                    "
                >
                    <i className="fas fa-th text-[11px]" />
                    Classer
                </button>
                <button
                    onClick={() => onVoir(d)}
                    className="
                        flex items-center justify-center
                        py-2 px-3 rounded-lg
                        bg-epo-slate-100 text-epo-slate-700 text-[12.5px] font-semibold
                        hover:bg-epo-slate-200 transition
                    "
                >
                    <i className="fas fa-eye text-[11px]" />
                </button>
            </div>
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