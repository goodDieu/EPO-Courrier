// src/pages/dg/RejetesPage.jsx
import { useMemo, useState } from 'react';
import { Button, StatusBadge, PriorityTag } from '../../components/ui';
import RejetesKpi from '../../components/dg/RejetesKpi';
import RejetDetailModal from '../../components/dg/RejetDetailModal';
import DgSignatureModal from '../../components/dg/DgSignatureModal';
import {
    DOCUMENTS_REJETES,
    ETATS_REJET,
    NATURES_MOTIF,
    FILTRES_ETAT,
    FILTRES_MOTIF,
    FILTRES_PROVENANCE,
    OPTIONS_TRI,
    formatDateHeure,
    formatDureeDepuis,
} from '../../data/rejetesDG.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function RejetesPage() {
    const [filtreEtat, setFiltreEtat] = useState('');
    const [filtreMotif, setFiltreMotif] = useState('');
    const [filtreProvenance, setFiltreProvenance] = useState('');
    const [recherche, setRecherche] = useState('');
    const [tri, setTri] = useState('urgence');
    const [vue, setVue] = useState('tableau');

    const [detailDoc, setDetailDoc] = useState(null);
    const [traitementDoc, setTraitementDoc] = useState(null);

    /* Filtrage + tri */
    const listeFiltree = useMemo(() => {
        let result = DOCUMENTS_REJETES;

        if (filtreEtat) result = result.filter((d) => d.etat === filtreEtat);
        if (filtreMotif) result = result.filter((d) => d.natureMotif === filtreMotif);
        if (filtreProvenance) result = result.filter((d) => d.provenence === filtreProvenance);

        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (d) =>
                    d.id.toLowerCase().includes(q) ||
                    d.objet.toLowerCase().includes(q) ||
                    d.expediteur.toLowerCase().includes(q) ||
                    d.motifRejet.toLowerCase().includes(q)
            );
        }

        return [...result].sort((a, b) => {
            switch (tri) {
                case 'recent':
                    return new Date(b.dateRejet) - new Date(a.dateRejet);
                case 'ancien':
                    return new Date(a.dateRejet) - new Date(b.dateRejet);
                case 'id-asc':
                    return a.id.localeCompare(b.id);
                case 'id-desc':
                    return b.id.localeCompare(a.id);
                case 'urgence':
                default: {
                    const etatOrdre = { 're-soumis': 0, 'rejete': 1, 'en-correction': 2 };
                    const oa = etatOrdre[a.etat] ?? 9;
                    const ob = etatOrdre[b.etat] ?? 9;
                    if (oa !== ob) return oa - ob;
                    return new Date(b.dateRejet) - new Date(a.dateRejet);
                }
            }
        });
    }, [filtreEtat, filtreMotif, filtreProvenance, recherche, tri]);

    const hasFiltreActif = filtreEtat || filtreMotif || filtreProvenance || recherche;

    const resetFiltres = () => {
        setFiltreEtat('');
        setFiltreMotif('');
        setFiltreProvenance('');
        setRecherche('');
    };

    /* Actions */
    const handleTraiter = (doc) => {
        setDetailDoc(null);
        setTraitementDoc(doc);
    };

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Documents rejetés
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Suivi des documents rejetés, en correction ou re-soumis
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <RejetesKpi documents={DOCUMENTS_REJETES} />

            {/* BANDEAU INFO workflow */}
            <div className="flex items-start gap-3 p-4 mb-6 border rounded-xl bg-epo-slate-50 border-epo-slate-200">
                <i className="fas fa-info-circle text-epo-slate-500 mt-0.5" />
                <div className="text-[12.5px] text-epo-slate-700">
                    <strong>Workflow de correction.</strong> Un document rejeté est automatiquement notifié au SG (RG-18).
                    Le producteur le corrige, puis le re-soumet à votre signature. Les documents <strong>Re-soumis</strong> apparaissent en haut de la liste.
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
                        placeholder="Rechercher par numéro, objet, motif…"
                        className="w-full pl-9 pr-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>

                <SelectFilter value={filtreEtat} onChange={setFiltreEtat} options={FILTRES_ETAT} />
                <SelectFilter value={filtreMotif} onChange={setFiltreMotif} options={FILTRES_MOTIF} />
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

            {/* BASCULE + TRI */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="text-[14px] font-semibold text-epo-slate-800 flex items-center gap-2">
                    <i className="fas fa-times-circle text-epo-red-500" />
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

            {/* CONTENU */}
            {listeFiltree.length === 0 ? (
                <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-green-50">
                        <i className="text-2xl fas fa-check-circle text-epo-green-500" />
                    </div>
                    <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                        Aucun document rejeté
                    </div>
                    <div className="text-[13px] text-epo-slate-500">
                        Tout est à jour. 🎉
                    </div>
                </div>
            ) : vue === 'tableau' ? (
                <RejetesTable
                    documents={listeFiltree}
                    onVoir={setDetailDoc}
                    onTraiter={handleTraiter}
                />
            ) : (
                <RejetesListe
                    documents={listeFiltree}
                    onVoir={setDetailDoc}
                    onTraiter={handleTraiter}
                />
            )}

            {/* MODALES */}
            <RejetDetailModal
                document={detailDoc}
                onClose={() => setDetailDoc(null)}
            />

            <DgSignatureModal
                document={traitementDoc}
                onClose={() => setTraitementDoc(null)}
            />
        </div>
    );
}

/* ============================================================
   SOUS-COMPOSANTS
   ============================================================ */

function RejetesTable({ documents, onVoir, onTraiter }) {
    return (
        <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-epo-slate-50">
                            {['', 'N°', 'Objet', 'Motif', 'Provenance', 'Rejeté le', 'État', ''].map((h, i) => (
                                <th
                                    key={i}
                                    className="px-3 py-2.5 text-[11px] font-semibold tracking-wider text-left uppercase text-epo-slate-500 whitespace-nowrap"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((d) => {
                            const etat = ETATS_REJET[d.etat];
                            const motif = NATURES_MOTIF[d.natureMotif];
                            const canTraiter = d.etat === 're-soumis';
                            const isReSoumis = d.etat === 're-soumis';

                            return (
                                <tr
                                    key={d.id}
                                    className={`
                                        border-t cursor-pointer transition
                                        ${isReSoumis ? 'bg-epo-green-50/40 hover:bg-epo-green-50' : 'border-epo-slate-100 hover:bg-epo-slate-50'}
                                    `}
                                    onClick={() => onVoir(d)}
                                >
                                    {/* Bande latérale */}
                                    <td className="w-1 p-0">
                                        <div className={`w-1 h-full min-h-[52px] ${etat.dot}`} />
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <span className="font-mono text-[12px] font-semibold text-epo-slate-800">
                                            {d.id}
                                        </span>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <div className="min-w-0">
                                            <div className="text-[12.5px] font-medium text-epo-slate-800 truncate max-w-[260px]">
                                                {d.objet}
                                            </div>
                                            <div className="text-[11px] text-epo-slate-500 truncate max-w-[260px] mt-0.5">
                                                <i className="fas fa-user text-[9.5px] text-epo-slate-400 mr-1" />
                                                {d.expediteur}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${motif.chip}`}>
                                            <i className={`fas ${motif.icon} text-[9.5px]`} />
                                            {motif.label}
                                        </span>
                                    </td>

                                    <td className="px-3 py-2.5 text-[12px] text-epo-slate-600">
                                        {d.provenence}
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <div className="text-[11.5px] tabular-nums text-epo-slate-600 whitespace-nowrap">
                                            {formatDateHeure(d.dateRejet)}
                                        </div>
                                        <div className="text-[10.5px] text-epo-slate-400">
                                            il y a {formatDureeDepuis(d.dateRejet)}
                                        </div>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <StatusBadge status={d.etat} />
                                    </td>

                                    <td className="px-3 py-2.5">
                                        {canTraiter ? (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onTraiter(d);
                                                }}
                                                className="text-[12px] font-semibold text-epo-green-600 hover:underline whitespace-nowrap"
                                            >
                                                <i className="mr-1 fas fa-redo" />
                                                Traiter
                                            </button>
                                        ) : (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onVoir(d);
                                                }}
                                                className="text-[12px] font-medium text-epo-slate-600 hover:underline whitespace-nowrap"
                                            >
                                                Voir le motif
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-[12.5px] border-t border-epo-slate-200 text-epo-slate-500">
                <span>{documents.length} document{documents.length > 1 ? 's' : ''}</span>
                <span className="text-epo-slate-400">
                    <i className="mr-1 fas fa-info-circle" />
                    Les documents "Re-soumis" sont en haut de liste
                </span>
            </div>
        </div>
    );
}

function RejetesListe({ documents, onVoir, onTraiter }) {
    return (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {documents.map((d) => {
                const etat = ETATS_REJET[d.etat];
                const motif = NATURES_MOTIF[d.natureMotif];
                const canTraiter = d.etat === 're-soumis';

                return (
                    <button
                        key={d.id}
                        onClick={() => onVoir(d)}
                        className={`
                            block w-full text-left bg-white border border-epo-slate-200 border-l-4 rounded-xl
                            p-4 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition cursor-pointer
                            ${d.etat === 're-soumis' ? 'border-l-epo-green-500' :
                              d.etat === 'rejete' ? 'border-l-epo-red-500' :
                              'border-l-epo-yellow-500'}
                        `}
                    >
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-mono text-[11.5px] font-bold text-epo-slate-700 bg-epo-slate-100 px-2 py-0.5 rounded-full">
                                    {d.id}
                                </span>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${motif.chip}`}>
                                    <i className={`fas ${motif.icon} text-[9px]`} />
                                    {motif.label}
                                </span>
                            </div>
                            <StatusBadge status={d.etat} />
                        </div>

                        <div className="text-[13.5px] font-semibold text-epo-slate-900 mb-2 line-clamp-2">
                            {d.objet}
                        </div>

                        <div className="p-2 mb-3 border rounded-lg bg-epo-red-50/60 border-epo-red-100">
                            <div className="text-[11px] text-epo-red-700 line-clamp-2 leading-relaxed">
                                <i className="fas fa-times-circle text-[9.5px] mr-1" />
                                {d.motifRejet}
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-epo-slate-100 text-[11.5px] text-epo-slate-500">
                            <span>
                                <i className="fas fa-user text-[10px] text-epo-slate-400 mr-1" />
                                {d.provenence}
                            </span>
                            <span className="tabular-nums">
                                Rejeté il y a {formatDureeDepuis(d.dateRejet)}
                            </span>
                        </div>

                        {canTraiter && (
                            <div className="mt-2 pt-2 border-t border-epo-slate-100 text-[11px] text-epo-green-600 font-semibold">
                                <i className="fas fa-redo text-[9.5px] mr-1" />
                                Document corrigé et re-soumis -à traiter
                            </div>
                        )}
                    </button>
                );
            })}
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