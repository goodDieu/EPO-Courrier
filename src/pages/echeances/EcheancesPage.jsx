// src/pages/echeances/EcheancesPage.jsx
import { useMemo, useState } from 'react';
import { Button, SectionTitle } from '../../components/ui';
import EcheanceCompteurs from '../../components/echeances/EcheanceCompteurs';
import EcheanceCalendrier from '../../components/echeances/EcheanceCalendrier';
import EcheanceLigne from '../../components/echeances/EcheanceLigne';
import {
    DOSSIERS_ECHEANCES,
    NIVEAUX,
    FILTRES_NIVEAU,
    FILTRES_CIRCUIT,
    FILTRES_STRUCTURE,
    computeNiveau,
    getEcheancesParJour,
} from '../../data/echeances.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function EcheancesPage() {
    // Filtres
    const [filtreNiveau, setFiltreNiveau] = useState('');
    const [filtreCircuit, setFiltreCircuit] = useState('');
    const [filtreStructure, setFiltreStructure] = useState('');
    const [selectedJour, setSelectedJour] = useState(null);

    // Rôle simulé (démo) - conditionne les actions contextuelles
    const [role, setRole] = useState('sg'); // 'sg' | 'dg' | 'scc'

    // Enrichir chaque dossier avec son niveau calculé
    const dossiers = useMemo(
        () =>
            DOSSIERS_ECHEANCES.map((d) => ({
                ...d,
                _niveau: computeNiveau(d.tempsRestant),
            })),
        []
    );

    // Compteurs par niveau (sur l'ensemble, non filtré)
    const counts = useMemo(() => {
        const c = { depasse: 0, jourJ: 0, urgent: 0, surveiller: 0, ok: 0 };
        dossiers.forEach((d) => {
            c[d._niveau] = (c[d._niveau] || 0) + 1;
        });
        return c;
    }, [dossiers]);

    // Données du calendrier (map 'YYYY-MM-DD' → counts)
    const dataCalendrier = useMemo(() => getEcheancesParJour(), []);

    // Liste filtrée + triée par niveau d'urgence
    const listeFiltree = useMemo(() => {
        let result = dossiers;

        if (filtreNiveau) result = result.filter((d) => d._niveau === filtreNiveau);
        if (filtreCircuit) result = result.filter((d) => d.circuit === filtreCircuit);
        if (filtreStructure) result = result.filter((d) => d.structure === filtreStructure);

        // Note : le filtre `selectedJour` sur les dossiers nécessite
        // que chaque dossier porte une date d'échéance réelle (_echeanceKey).
        // À brancher quand le backend fournira cette donnée.

        return [...result].sort((a, b) => {
            const oa = NIVEAUX[a._niveau].order;
            const ob = NIVEAUX[b._niveau].order;
            if (oa !== ob) return oa - ob;
            return a.tempsRestant - b.tempsRestant;
        });
    }, [dossiers, filtreNiveau, filtreCircuit, filtreStructure]);

    // Regroupement par niveau pour l'affichage en sections
    const groupes = useMemo(() => {
        const g = { depasse: [], jourJ: [], urgent: [], surveiller: [], ok: [] };
        listeFiltree.forEach((d) => g[d._niveau].push(d));
        return g;
    }, [listeFiltree]);

    // Total des urgences prioritaires
    const totalUrgent = counts.depasse + counts.jourJ + counts.urgent;

    // Reset complet des filtres
    const resetFiltres = () => {
        setFiltreNiveau('');
        setFiltreCircuit('');
        setFiltreStructure('');
        setSelectedJour(null);
    };

    const hasFiltreActif =
        filtreNiveau || filtreCircuit || filtreStructure || selectedJour;

    // Date humaine du jour sélectionné
    const selectedJourLabel = selectedJour
        ? new Date(selectedJour).toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
          })
        : null;

    return (
        <div>
            {/* ============================================
                EN-TÊTE
                ============================================ */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Échéances & Délais
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-epo-slate-500">
                        <span>Suivi des délais de référence du Manuel de procédures</span>
                        {totalUrgent > 0 && (
                            <>
                                <span className="text-epo-slate-300">·</span>
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-epo-red-50 text-epo-red-700 text-[11px] font-semibold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-epo-red-500 animate-pulse" />
                                    {totalUrgent} à traiter en priorité
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {/* Sélecteur de rôle (démo) */}
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="
                            px-3 py-2 border border-epo-slate-300 rounded-lg
                            text-[13px] text-epo-slate-800 bg-white
                            focus:outline-none focus:border-epo-green-500
                            focus:ring-2 focus:ring-epo-green-500/10
                        "
                    >
                        <option value="sg">Vue SG</option>
                        <option value="dg">Vue DG</option>
                        <option value="scc">Vue SCC</option>
                    </select>

                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                    <Button variant="primary" icon="fa-bell">
                        Relancer tout
                    </Button>
                </div>
            </div>

            {/* ============================================
                COMPTEURS DE NIVEAU
                ============================================ */}
            <EcheanceCompteurs
                counts={counts}
                actif={filtreNiveau}
                onChange={setFiltreNiveau}
            />

            {/* ============================================
                CALENDRIER MENSUEL
                ============================================ */}
            <SectionTitle
                icon="fa-calendar-alt"
                title="Calendrier des échéances"
                action={
                    selectedJour
                        ? {
                              label: 'Effacer la sélection du jour',
                              onClick: () => setSelectedJour(null),
                          }
                        : undefined
                }
            />

            <EcheanceCalendrier
                dataParJour={dataCalendrier}
                selectedJour={selectedJour}
                onSelectJour={(key) =>
                    setSelectedJour((prev) => (prev === key ? null : key))
                }
            />

            {/* ============================================
                FILTRES RAPIDES
                ============================================ */}
            <div className="flex flex-wrap items-center gap-3 p-4 mb-4 bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                <FilterSelect
                    label="Niveau"
                    value={filtreNiveau}
                    onChange={setFiltreNiveau}
                    options={FILTRES_NIVEAU}
                />
                <FilterSelect
                    label="Circuit"
                    value={filtreCircuit}
                    onChange={setFiltreCircuit}
                    options={FILTRES_CIRCUIT}
                />
                <FilterSelect
                    label="Structure"
                    value={filtreStructure}
                    onChange={setFiltreStructure}
                    options={FILTRES_STRUCTURE}
                />

                {hasFiltreActif && (
                    <button
                        onClick={resetFiltres}
                        className="text-[12.5px] font-medium text-epo-red-600 hover:underline ml-auto"
                    >
                        <i className="mr-1 fas fa-times" />
                        Réinitialiser
                    </button>
                )}
            </div>

            {/* ============================================
                INDICATEUR DE JOUR SÉLECTIONNÉ
                ============================================ */}
            {selectedJour && (
                <div className="flex items-center gap-2 mb-3 text-[12.5px] text-epo-slate-600">
                    <i className="fas fa-calendar-day text-epo-green-500" />
                    Filtre actif sur le{' '}
                    <strong className="text-epo-slate-800">
                        {selectedJourLabel}
                    </strong>
                    <button
                        onClick={() => setSelectedJour(null)}
                        className="ml-1 text-epo-red-600 hover:underline"
                        title="Retirer le filtre jour"
                    >
                        <i className="fas fa-times" />
                    </button>
                </div>
            )}

            {/* ============================================
                LISTE GROUPÉE PAR NIVEAU
                ============================================ */}
            {listeFiltree.length === 0 ? (
                <EmptyState onReset={resetFiltres} />
            ) : (
                <div className="flex flex-col gap-6">
                    {['depasse', 'jourJ', 'urgent', 'surveiller', 'ok'].map((niveau) => {
                        const items = groupes[niveau];
                        if (items.length === 0) return null;
                        const n = NIVEAUX[niveau];

                        return (
                            <div key={niveau}>
                                {/* En-tête du groupe */}
                                <div className="flex items-center gap-2 mb-2.5">
                                    <span
                                        className={`inline-flex items-center justify-center w-6 h-6 rounded-md ${n.bg} ${n.text}`}
                                    >
                                        <i className={`fas ${n.icon} text-[11px]`} />
                                    </span>
                                    <h3 className={`text-[14px] font-bold ${n.text}`}>
                                        {n.label}
                                    </h3>
                                    <span
                                        className={`text-[11.5px] font-semibold px-2 py-0.5 rounded-full ${n.chip}`}
                                    >
                                        {items.length}
                                    </span>
                                </div>

                                {/* Lignes */}
                                <div className="flex flex-col gap-2.5">
                                    {items.map((d) => (
                                        <EcheanceLigne
                                            key={d.id}
                                            dossier={d}
                                            canInterpeller={role === 'sg' || role === 'dg'}
                                            onVoir={() => alert(`Voir ${d.id}`)}
                                            onRelancer={() => alert(`Relancer ${d.id}`)}
                                            onInterpeller={() => alert(`Interpeller ${d.id}`)}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

/* ============================================================
   SOUS-COMPOSANTS
   ============================================================ */

function FilterSelect({ label, value, onChange, options }) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-[12px] font-medium text-epo-slate-500 hidden sm:inline">
                {label}
            </span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="
                    px-3 py-2 border border-epo-slate-300 rounded-lg
                    text-[13px] text-epo-slate-800 bg-white
                    focus:outline-none focus:border-epo-green-500
                    focus:ring-2 focus:ring-epo-green-500/10
                "
            >
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

function EmptyState({ onReset }) {
    return (
        <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-green-50">
                <i className="text-2xl fas fa-check-circle text-epo-green-500" />
            </div>
            <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                Aucune échéance trouvée
            </div>
            <div className="text-[13px] text-epo-slate-500 mb-4">
                Essayez d'élargir les filtres ou de réinitialiser la recherche.
            </div>
            <button
                onClick={onReset}
                className="text-[13px] font-semibold text-epo-green-600 hover:underline"
            >
                <i className="fas fa-redo mr-1.5" />
                Réinitialiser les filtres
            </button>
        </div>
    );
}