// src/pages/sp-sg/SuiviPage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui';
import SuiviKpi from '../../components/sp-sg/SuiviKpi';
import SuiviTableau from '../../components/sp-sg/SuiviTableau';
import SuiviKanban from '../../components/sp-sg/SuiviKanban';
import SuiviModal from '../../components/sp-sg/SuiviModal';
import {
    DOSSIERS_SUIVI,
    CLASSIFICATION,
    FILTRES_ETAPE,
    FILTRES_STATUT,
    FILTRES_CLASSIFICATION,
    FILTRES_STRUCTURE,
    OPTIONS_TRI,
} from '../../data/suiviSPSG.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function SuiviPage() {
    const [filtreEtape, setFiltreEtape] = useState('');
    const [filtreStatut, setFiltreStatut] = useState('');
    const [filtreClassification, setFiltreClassification] = useState('');
    const [filtreStructure, setFiltreStructure] = useState('');
    const [recherche, setRecherche] = useState('');
    const [tri, setTri] = useState('recent-mouvement');
    const [vue, setVue] = useState('tableau'); // 'tableau' | 'kanban'

    const [dossierSelectionne, setDossierSelectionne] = useState(null);

    /* Filtrage + tri */
    const listeFiltree = useMemo(() => {
        let result = DOSSIERS_SUIVI;

        if (filtreEtape) result = result.filter((d) => d.etapeActuelle === filtreEtape);
        if (filtreStatut) result = result.filter((d) => d.statut === filtreStatut);
        if (filtreClassification) result = result.filter((d) => d.classification === filtreClassification);
        if (filtreStructure) result = result.filter((d) => d.expediteurStructure === filtreStructure);

        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (d) =>
                    d.id.toLowerCase().includes(q) ||
                    d.objet.toLowerCase().includes(q) ||
                    d.expediteurNom.toLowerCase().includes(q)
            );
        }

        return [...result].sort((a, b) => {
            switch (tri) {
                case 'anciennete':
                    return new Date(a.dateEntree) - new Date(b.dateEntree);
                case 'circuit':
                    return b.tempsCircuit - a.tempsCircuit;
                case 'classification': {
                    const ordre = { 'important-urgent': 0, 'important-non-urgent': 1, 'non-important-urgent': 2, 'non-important-non-urgent': 3 };
                    return (ordre[a.classification] ?? 9) - (ordre[b.classification] ?? 9);
                }
                case 'recent-mouvement':
                default:
                    return new Date(b.dateDernierMouvement) - new Date(a.dateDernierMouvement);
            }
        });
    }, [filtreEtape, filtreStatut, filtreClassification, filtreStructure, recherche, tri]);

    const hasFiltreActif = filtreEtape || filtreStatut || filtreClassification || filtreStructure || recherche;

    const resetFiltres = () => {
        setFiltreEtape('');
        setFiltreStatut('');
        setFiltreClassification('');
        setFiltreStructure('');
        setRecherche('');
    };

    const handleVoir = (dossier) => setDossierSelectionne(dossier);

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-epo-slate-900">
                        Suivi des dossiers
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Vue transverse du circuit- de la réception à la clôture (§9.1)
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <SuiviKpi dossiers={DOSSIERS_SUIVI} />

            {/* BANDEAU CIRCUIT */}
            <div className="flex items-start gap-3 p-4 mb-6 border rounded-xl bg-epo-slate-50 border-epo-slate-200">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-lg bg-epo-slate-700">
                    <i className="fas fa-route text-[15px]" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-epo-slate-800">
                        Circuit de référence (§9.1)
                    </div>
                    <div className="text-[11.5px] text-epo-slate-600 mt-1 flex flex-wrap items-center gap-1">
                        <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-epo-slate-200">SCC</span>
                        <i className="fas fa-arrow-right text-epo-slate-400 text-[9px]" />
                        <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-epo-slate-200">SP-SG</span>
                        <i className="fas fa-arrow-right text-epo-slate-400 text-[9px]" />
                        <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-epo-slate-200">SG</span>
                        <i className="fas fa-arrow-right text-epo-slate-400 text-[9px]" />
                        <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-epo-slate-200">SP-DG</span>
                        <i className="fas fa-arrow-right text-epo-slate-400 text-[9px]" />
                        <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-epo-slate-200">DG</span>
                        <i className="fas fa-arrow-right text-epo-slate-400 text-[9px]" />
                        <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-epo-slate-200">SG</span>
                        <i className="fas fa-arrow-right text-epo-slate-400 text-[9px]" />
                        <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-epo-slate-200">SCC</span>
                        <i className="fas fa-arrow-right text-epo-slate-400 text-[9px]" />
                        <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-epo-slate-200">Direction</span>
                    </div>
                </div>
            </div>

            {/* FILTRES */}
            <div className="flex flex-wrap items-center gap-3 p-4 mb-4 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
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

                <SelectFilter value={filtreEtape} onChange={setFiltreEtape} options={FILTRES_ETAPE} />
                <SelectFilter value={filtreStatut} onChange={setFiltreStatut} options={FILTRES_STATUT} />
                <SelectFilter value={filtreClassification} onChange={setFiltreClassification} options={FILTRES_CLASSIFICATION} />
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

            {/* BASCULE + TRI */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="text-[14px] font-semibold text-epo-slate-800 flex items-center gap-2">
                    <i className="fas fa-stream text-epo-green-600" />
                    {listeFiltree.length} dossier{listeFiltree.length > 1 ? 's' : ''}
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-[12.5px] text-epo-slate-500">
                        Trier par :
                        <select
                            value={tri}
                            onChange={(e) => setTri(e.target.value)}
                            className="px-2.5 py-1.5 border rounded-lg border-epo-slate-300 text-[12.5px] text-epo-slate-700 bg-white focus:outline-none focus:border-epo-green-500"
                        >
                            {OPTIONS_TRI.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="inline-flex p-1 rounded-lg bg-epo-slate-100">
                        <button
                            onClick={() => setVue('tableau')}
                            className={`
                                px-3 py-1.5 rounded-md text-[12.5px] font-semibold transition inline-flex items-center gap-1.5
                                ${vue === 'tableau'
                                    ? 'bg-white text-epo-slate-900 shadow-soft'
                                    : 'text-epo-slate-500 hover:text-epo-slate-700'}
                            `}
                        >
                            <i className="fas fa-table" />
                            Tableau
                        </button>
                        <button
                            onClick={() => setVue('kanban')}
                            className={`
                                px-3 py-1.5 rounded-md text-[12.5px] font-semibold transition inline-flex items-center gap-1.5
                                ${vue === 'kanban'
                                    ? 'bg-white text-epo-slate-900 shadow-soft'
                                    : 'text-epo-slate-500 hover:text-epo-slate-700'}
                            `}
                        >
                            <i className="fas fa-columns" />
                            Kanban
                        </button>
                    </div>
                </div>
            </div>

            {/* CONTENU */}
            {listeFiltree.length === 0 ? (
                <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-slate-100">
                        <i className="text-2xl fas fa-stream text-epo-slate-400" />
                    </div>
                    <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                        Aucun dossier suivi
                    </div>
                    <div className="text-[13px] text-epo-slate-500">
                        Essayez d'élargir vos filtres.
                    </div>
                </div>
            ) : vue === 'tableau' ? (
                <SuiviTableau dossiers={listeFiltree} onVoir={handleVoir} />
            ) : (
                <SuiviKanban dossiers={listeFiltree} onVoir={handleVoir} />
            )}

            {/* MODALE */}
            <SuiviModal
                dossier={dossierSelectionne}
                onClose={() => setDossierSelectionne(null)}
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