// src/pages/liaison/RemisesPage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui';
import RemisesKpi from '../../components/liaison/RemisesKpi';
import RemiseCarte from '../../components/liaison/RemiseCarte';
import PreuveModal from '../../components/liaison/PreuveModal';
import {
    REMISES_EFFECTUEES,
    TYPES_PREUVE,
    FILTRES_PERIODE,
    FILTRES_STRUCTURE,
    FILTRES_PREUVE,
    OPTIONS_TRI,
    formatHeure,
    formatDateJour,
    formatDateHeure,
} from '../../data/remisesLiaison.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function RemisesPage() {
    const [filtrePeriode, setFiltrePeriode] = useState('');
    const [filtreStructure, setFiltreStructure] = useState('');
    const [filtrePreuve, setFiltrePreuve] = useState('');
    const [recherche, setRecherche] = useState('');
    const [tri, setTri] = useState('recent');
    const [vue, setVue] = useState('cartes');

    const [preuveSelectionnee, setPreuveSelectionnee] = useState(null);

    /* Filtrage + tri */
    const listeFiltree = useMemo(() => {
        let result = REMISES_EFFECTUEES;

        if (filtreStructure) result = result.filter((r) => r.destinataire.structure === filtreStructure);
        if (filtrePreuve) result = result.filter((r) => r.typePreuve === filtrePreuve);

        if (filtrePeriode) {
            const now = new Date();
            const diffJours = { aujourdhui: 0, semaine: 7, mois: 30 }[filtrePeriode] ?? 9999;
            result = result.filter((r) => {
                const diff = (now - new Date(r.dateRemise)) / (1000 * 60 * 60 * 24);
                return diff <= diffJours + 1;
            });
        }

        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (r) =>
                    r.documentNumero.toLowerCase().includes(q) ||
                    r.documentObjet.toLowerCase().includes(q) ||
                    r.destinataire.personne.toLowerCase().includes(q) ||
                    r.destinataire.structure.toLowerCase().includes(q) ||
                    r.preuveRef.toLowerCase().includes(q)
            );
        }

        return [...result].sort((a, b) => {
            switch (tri) {
                case 'ancien':
                    return new Date(a.dateRemise) - new Date(b.dateRemise);
                case 'structure':
                    return a.destinataire.structure.localeCompare(b.destinataire.structure);
                case 'destinataire':
                    return a.destinataire.personne.localeCompare(b.destinataire.personne);
                case 'recent':
                default:
                    return new Date(b.dateRemise) - new Date(a.dateRemise);
            }
        });
    }, [filtrePeriode, filtreStructure, filtrePreuve, recherche, tri]);

    /* Groupement par jour */
    const groupes = useMemo(() => {
        const g = {};
        listeFiltree.forEach((r) => {
            const jour = formatDateJour(r.dateRemise);
            if (!g[jour]) g[jour] = [];
            g[jour].push(r);
        });
        return g;
    }, [listeFiltree]);

    const hasFiltreActif = filtrePeriode || filtreStructure || filtrePreuve || recherche;

    const resetFiltres = () => {
        setFiltrePeriode('');
        setFiltreStructure('');
        setFiltrePreuve('');
        setRecherche('');
    };

    const handleVoirPreuve = (remise) => setPreuveSelectionnee(remise);

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-epo-slate-900">
                        Remises effectuées
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Historique de vos remises avec preuves et décharges
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <RemisesKpi remises={REMISES_EFFECTUEES} />

            {/* FILTRES */}
            <div className="flex flex-wrap items-center gap-3 p-4 mb-4 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                <div className="relative flex-1 min-w-[200px]">
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-epo-slate-400 text-[12px]" />
                    <input
                        type="text"
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                        placeholder="Rechercher par N°, objet, destinataire, réf. preuve…"
                        className="w-full pl-9 pr-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>

                <SelectFilter value={filtrePeriode} onChange={setFiltrePeriode} options={FILTRES_PERIODE} />
                <SelectFilter value={filtreStructure} onChange={setFiltreStructure} options={FILTRES_STRUCTURE} />
                <SelectFilter value={filtrePreuve} onChange={setFiltrePreuve} options={FILTRES_PREUVE} />

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
                    <i className="fas fa-check-double text-epo-green-600" />
                    {listeFiltree.length} remise{listeFiltree.length > 1 ? 's' : ''}
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
                            onClick={() => setVue('cartes')}
                            className={`
                                px-3 py-1.5 rounded-md text-[12.5px] font-semibold transition inline-flex items-center gap-1.5
                                ${vue === 'cartes'
                                    ? 'bg-white text-epo-slate-900 shadow-soft'
                                    : 'text-epo-slate-500 hover:text-epo-slate-700'}
                            `}
                        >
                            <i className="fas fa-th-large" />
                            Cartes
                        </button>
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
                    </div>
                </div>
            </div>

            {/* CONTENU */}
            {listeFiltree.length === 0 ? (
                <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-slate-100">
                        <i className="text-2xl fas fa-check-double text-epo-slate-400" />
                    </div>
                    <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                        Aucune remise trouvée
                    </div>
                    <div className="text-[13px] text-epo-slate-500">
                        Essayez d'élargir vos filtres.
                    </div>
                </div>
            ) : vue === 'cartes' ? (
                <div className="flex flex-col gap-7">
                    {Object.entries(groupes).map(([jour, remises]) => (
                        <div key={jour}>
                            <div className="flex items-center gap-2.5 mb-3">
                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-epo-slate-100 text-epo-slate-600">
                                    <i className="fas fa-calendar-day text-[13px]" />
                                </span>
                                <div>
                                    <h3 className="text-[15px] font-bold text-epo-slate-800 capitalize">
                                        {jour}
                                    </h3>
                                    <div className="text-[11.5px] text-epo-slate-400">
                                        {remises.length} remise{remises.length > 1 ? 's' : ''}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {remises.map((r) => (
                                    <RemiseCarte
                                        key={r.id}
                                        remise={r}
                                        onVoirPreuve={handleVoirPreuve}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <RemisesTable
                    remises={listeFiltree}
                    onVoirPreuve={handleVoirPreuve}
                />
            )}

            {/* MODALE PREUVE */}
            <PreuveModal
                remise={preuveSelectionnee}
                onClose={() => setPreuveSelectionnee(null)}
            />
        </div>
    );
}

/* ============================================================
   SOUS-COMPOSANTS
   ============================================================ */

function RemisesTable({ remises, onVoirPreuve }) {
    return (
        <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-epo-slate-50">
                            {['N°', 'Objet', 'Destinataire', 'Structure', 'Preuve', 'Réf.', 'Date de remise', ''].map((h, i) => (
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
                        {remises.map((r) => {
                            const preuve = TYPES_PREUVE[r.typePreuve];

                            return (
                                <tr
                                    key={r.id}
                                    className="transition border-t cursor-pointer border-epo-slate-100 hover:bg-epo-slate-50"
                                    onClick={() => onVoirPreuve(r)}
                                >
                                    <td className="px-3 py-2.5">
                                        <span className="font-mono text-[12px] font-semibold text-epo-slate-800">
                                            {r.documentNumero}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <div className="text-[12.5px] font-medium text-epo-slate-800 truncate max-w-[260px]">
                                            {r.documentObjet}
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <div className="text-[12.5px] font-medium text-epo-slate-800">
                                            {r.destinataire.personne}
                                        </div>
                                        <div className="text-[11px] text-epo-slate-500">
                                            {r.destinataire.qualite}
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5 text-[12px] text-epo-slate-600">
                                        {r.destinataire.structure}
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${preuve.chip}`}>
                                            <i className={`fas ${preuve.icon} text-[9px]`} />
                                            {preuve.label}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5 text-[11px] font-mono text-epo-slate-600">
                                        {r.preuveRef}
                                    </td>
                                    <td className="px-3 py-2.5 text-[11.5px] tabular-nums text-epo-slate-500 whitespace-nowrap">
                                        {formatDateHeure(r.dateRemise)}
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onVoirPreuve(r);
                                            }}
                                            className="text-[12px] font-semibold text-epo-green-600 hover:underline whitespace-nowrap"
                                        >
                                            <i className="mr-1 fas fa-shield-halved" />
                                            Preuve
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-[12.5px] border-t border-epo-slate-200 text-epo-slate-500">
                <span>{remises.length} remise{remises.length > 1 ? 's' : ''} affichée{remises.length > 1 ? 's' : ''}</span>
                <span className="text-epo-slate-400">
                    <i className="mr-1 fas fa-info-circle" />
                    Cliquez sur une ligne pour voir la preuve
                </span>
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