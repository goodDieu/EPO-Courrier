// src/pages/dg/ASignerPage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui';
import ASignerKpi from '../../components/dg/ASignerKpi';
import ASignerTable from '../../components/dg/ASignerTable';
import ASignerListe from '../../components/dg/ASignerListe';
import DgSignatureModal from '../../components/dg/DgSignatureModal';
import {
    DOCUMENTS_A_SIGNER,
    FILTRES_TYPE,
    FILTRES_PRIORITE,
    FILTRES_PROVENANCE,
    OPTIONS_TRI,
    computeNiveau,
    peutSignerEnMasse,
} from '../../data/aSignerDG.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function ASignerPage() {
    const [filtreType, setFiltreType] = useState('');
    const [filtrePriorite, setFiltrePriorite] = useState('');
    const [filtreProvenance, setFiltreProvenance] = useState('');
    const [recherche, setRecherche] = useState('');
    const [tri, setTri] = useState('urgence');
    const [vue, setVue] = useState('tableau'); // 'tableau' | 'liste'

    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(null);

    /* Filtrage + tri */
    const listeFiltree = useMemo(() => {
        let result = DOCUMENTS_A_SIGNER;

        if (filtreType) result = result.filter((d) => d.type === filtreType);
        if (filtrePriorite) result = result.filter((d) => d.priorite === filtrePriorite);
        if (filtreProvenance) result = result.filter((d) => d.provenence === filtreProvenance);

        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (d) =>
                    d.id.toLowerCase().includes(q) ||
                    d.objet.toLowerCase().includes(q) ||
                    d.expediteur.toLowerCase().includes(q)
            );
        }

        return [...result].sort((a, b) => {
            switch (tri) {
                case 'recent':
                    return new Date(b.dateReceptionDG) - new Date(a.dateReceptionDG);
                case 'ancien':
                    return new Date(a.dateReceptionDG) - new Date(b.dateReceptionDG);
                case 'id-asc':
                    return a.id.localeCompare(b.id);
                case 'id-desc':
                    return b.id.localeCompare(a.id);
                case 'urgence':
                default: {
                    const niveauOrdre = { depasse: 0, jourJ: 1, urgent: 2, surveiller: 3, ok: 4 };
                    const na = niveauOrdre[computeNiveau(a.tempsRestantMin)];
                    const nb = niveauOrdre[computeNiveau(b.tempsRestantMin)];
                    if (na !== nb) return na - nb;
                    return a.tempsRestantMin - b.tempsRestantMin;
                }
            }
        });
    }, [filtreType, filtrePriorite, filtreProvenance, recherche, tri]);

    const hasFiltreActif = filtreType || filtrePriorite || filtreProvenance || recherche;

    const resetFiltres = () => {
        setFiltreType('');
        setFiltrePriorite('');
        setFiltreProvenance('');
        setRecherche('');
    };

    /* Sélection en masse */
    const handleToggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleToggleSelectAll = () => {
        const eligible = listeFiltree.filter(peutSignerEnMasse).map((d) => d.id);
        const allSelected = eligible.every((id) => selectedIds.includes(id));
        if (allSelected) {
            setSelectedIds([]);
        } else {
            setSelectedIds(eligible);
        }
    };

    /* Actions */
    const handleSigner = (doc) => setSelectedDoc(doc);

    const handleSignerEnMasse = () => {
        if (selectedIds.length === 0) return;
        alert(
            `Signature en masse\n\n` +
            `→ ${selectedIds.length} document${selectedIds.length > 1 ? 's' : ''} signé${selectedIds.length > 1 ? 's' : ''}\n` +
            `→ Le SG sera automatiquement notifié (RG-18)\n` +
            `→ Transmission au SCC pour traitement\n\n` +
            `Documents :\n${selectedIds.map((id) => `• ${id}`).join('\n')}`
        );
        setSelectedIds([]);
    };

    return (
        <div className="w-full min-w-0">
            {/* ============================================
                EN-TÊTE
                ============================================ */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Documents à signer
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Documents en attente de votre signature -courriers et actes administratifs
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                </div>
            </div>

            {/* ============================================
                KPI
                ============================================ */}
            <ASignerKpi documents={DOCUMENTS_A_SIGNER} />

            {/* ============================================
                BARRE DE SÉLECTION EN MASSE
                ============================================ */}
            {selectedIds.length > 0 && (
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 mb-4 border rounded-xl bg-epo-green-50 border-epo-green-200 shadow-soft">
                    <div className="flex items-center gap-2 text-[13px] font-semibold text-epo-green-900">
                        <i className="fas fa-check-double" />
                        {selectedIds.length} document{selectedIds.length > 1 ? 's' : ''} sélectionné{selectedIds.length > 1 ? 's' : ''}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSelectedIds([])}
                            className="text-[12.5px] font-medium text-epo-slate-600 hover:underline px-3 py-1.5"
                        >
                            Annuler la sélection
                        </button>
                        <Button
                            variant="primary"
                            icon="fa-signature"
                            onClick={handleSignerEnMasse}
                        >
                            Signer en masse
                        </Button>
                    </div>
                </div>
            )}

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
                        placeholder="Rechercher par numéro, objet, expéditeur…"
                        className="w-full pl-9 pr-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>

                <SelectFilter value={filtreType} onChange={setFiltreType} options={FILTRES_TYPE} />
                <SelectFilter value={filtrePriorite} onChange={setFiltrePriorite} options={FILTRES_PRIORITE} />
                <SelectFilter value={filtreProvenance} onChange={setFiltreProvenance} options={FILTRES_PROVENANCE} />

                {hasFiltreActif && (
                    <button
                        onClick={resetFiltres}
                        className="text-[12.5px] font-medium text-epo-red-600 hover:underline"
                    >
                        <i className="mr-1 fas fa-times" />
                        Réinitialiser
                    </button>
                )}
            </div>

            {/* ============================================
                BASCULE VUE + TRI
                ============================================ */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="text-[14px] font-semibold text-epo-slate-800 flex items-center gap-2">
                    <i className="fas fa-pen text-epo-green-600" />
                    {listeFiltree.length} document{listeFiltree.length > 1 ? 's' : ''}
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
                            onClick={() => setVue('liste')}
                            className={`
                                px-3 py-1.5 rounded-md text-[12.5px] font-semibold transition inline-flex items-center gap-1.5
                                ${vue === 'liste'
                                    ? 'bg-white text-epo-slate-900 shadow-soft'
                                    : 'text-epo-slate-500 hover:text-epo-slate-700'}
                            `}
                        >
                            <i className="fas fa-th-large" />
                            Liste
                        </button>
                    </div>
                </div>
            </div>

            {/* ============================================
                CONTENU
                ============================================ */}
            {vue === 'tableau' ? (
                <ASignerTable
                    documents={listeFiltree}
                    selectedIds={selectedIds}
                    onToggleSelect={handleToggleSelect}
                    onToggleSelectAll={handleToggleSelectAll}
                    onSigner={handleSigner}
                />
            ) : (
                <ASignerListe
                    documents={listeFiltree}
                    onSigner={handleSigner}
                />
            )}

            {/* ============================================
                MODALE DE SIGNATURE
                ============================================ */}
            <DgSignatureModal
                document={selectedDoc}
                onClose={() => setSelectedDoc(null)}
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