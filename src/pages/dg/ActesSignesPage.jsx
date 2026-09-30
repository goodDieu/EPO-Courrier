// src/pages/dg/ActesSignesPage.jsx
import { useMemo, useState } from 'react';
import { Button, StatusBadge } from '../../components/ui';
import ActesSignesKpi from '../../components/dg/ActesSignesKpi';
import ActeSigneDetailModal from '../../components/dg/ActeSigneDetailModal';
import {
    ACTES_SIGNES,
    NATURES_ACTES,
    TYPES_SIGNATAIRE,
    FILTRES_NATURE,
    FILTRES_SIGNATAIRE,
    FILTRES_ETAT,
    FILTRES_PERIODE,
    OPTIONS_TRI,
    formatDateHeure,
} from '../../data/actesSignesDG.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function ActesSignesPage() {
    const [filtreNature, setFiltreNature] = useState('');
    const [filtreSignataire, setFiltreSignataire] = useState('');
    const [filtreEtat, setFiltreEtat] = useState('');
    const [filtrePeriode, setFiltrePeriode] = useState('');
    const [recherche, setRecherche] = useState('');
    const [tri, setTri] = useState('recent');
    const [vue, setVue] = useState('tableau');

    const [selectedActe, setSelectedActe] = useState(null);

    /* Filtrage + tri */
    const listeFiltree = useMemo(() => {
        let result = ACTES_SIGNES;

        if (filtreNature) result = result.filter((a) => a.nature === filtreNature);
        if (filtreSignataire) result = result.filter((a) => a.signataire === filtreSignataire);
        if (filtreEtat) result = result.filter((a) => a.etat === filtreEtat);

        if (filtrePeriode) {
            const now = new Date();
            const diffJours = { '7j': 7, '30j': 30, 'trimestre': 90, 'annee': 365 }[filtrePeriode] ?? 9999;
            result = result.filter((a) => {
                const diff = (now - new Date(a.dateSignature)) / (1000 * 60 * 60 * 24);
                return diff <= diffJours;
            });
        }

        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (a) =>
                    a.id.toLowerCase().includes(q) ||
                    a.objet.toLowerCase().includes(q) ||
                    a.beneficiaire.toLowerCase().includes(q) ||
                    a.beneficiaireMatricule.toLowerCase().includes(q) ||
                    a.numeroSortant.toLowerCase().includes(q)
            );
        }

        return [...result].sort((a, b) => {
            switch (tri) {
                case 'ancien':
                    return new Date(a.dateSignature) - new Date(b.dateSignature);
                case 'id-asc':
                    return a.id.localeCompare(b.id);
                case 'id-desc':
                    return b.id.localeCompare(a.id);
                case 'beneficiaire':
                    return a.beneficiaire.localeCompare(b.beneficiaire);
                case 'recent':
                default:
                    return new Date(b.dateSignature) - new Date(a.dateSignature);
            }
        });
    }, [filtreNature, filtreSignataire, filtreEtat, filtrePeriode, recherche, tri]);

    const hasFiltreActif =
        filtreNature || filtreSignataire || filtreEtat || filtrePeriode || recherche;

    const resetFiltres = () => {
        setFiltreNature('');
        setFiltreSignataire('');
        setFiltreEtat('');
        setFiltrePeriode('');
        setRecherche('');
    };

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Actes signés
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Registre probant des actes signés par le DG ou par délégation du SG
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                    <Button variant="outline" icon="fa-archive">
                        Voir les archives
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <ActesSignesKpi actes={ACTES_SIGNES} />

            {/* FILTRES */}
            <div className="flex flex-wrap items-center gap-3 p-4 mb-4 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                <div className="relative flex-1 min-w-[200px]">
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-epo-slate-400 text-[12px]" />
                    <input
                        type="text"
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                        placeholder="Rechercher par numéro, objet, bénéficiaire, matricule…"
                        className="w-full pl-9 pr-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>

                <SelectFilter value={filtreNature} onChange={setFiltreNature} options={FILTRES_NATURE} />
                <SelectFilter value={filtreSignataire} onChange={setFiltreSignataire} options={FILTRES_SIGNATAIRE} />
                <SelectFilter value={filtreEtat} onChange={setFiltreEtat} options={FILTRES_ETAT} />
                <SelectFilter value={filtrePeriode} onChange={setFiltrePeriode} options={FILTRES_PERIODE} />

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

            {/* BASCULE + TRI */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="text-[14px] font-semibold text-epo-slate-800 flex items-center gap-2">
                    <i className="fas fa-file-signature text-epo-green-600" />
                    {listeFiltree.length} acte{listeFiltree.length > 1 ? 's' : ''}
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
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-slate-100">
                        <i className="text-2xl fas fa-file-signature text-epo-slate-400" />
                    </div>
                    <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                        Aucun acte signé trouvé
                    </div>
                    <div className="text-[13px] text-epo-slate-500">
                        Essayez d'élargir vos filtres.
                    </div>
                </div>
            ) : vue === 'tableau' ? (
                <ActesSignesTable actes={listeFiltree} onVoir={setSelectedActe} />
            ) : (
                <ActesSignesListe actes={listeFiltree} onVoir={setSelectedActe} />
            )}

            {/* MODALE */}
            <ActeSigneDetailModal
                acte={selectedActe}
                onClose={() => setSelectedActe(null)}
            />
        </div>
    );
}

/* ============================================================
   SOUS-COMPOSANTS
   ============================================================ */

function ActesSignesTable({ actes, onVoir }) {
    return (
        <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-epo-slate-50">
                            {['N°', 'Nature', 'Objet', 'Bénéficiaire', 'Signataire', 'N° sortant', 'Signé le', 'État', ''].map((h, i) => (
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
                        {actes.map((a) => {
                            const nature = NATURES_ACTES[a.nature];
                            const signataire = TYPES_SIGNATAIRE[a.signataire];

                            return (
                                <tr
                                    key={a.id}
                                    onClick={() => onVoir(a)}
                                    className="transition border-t cursor-pointer border-epo-slate-100 hover:bg-epo-slate-50"
                                >
                                    <td className="px-3 py-2.5">
                                        <span className="font-mono text-[12px] font-semibold text-epo-slate-800">
                                            {a.id}
                                        </span>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${nature.color}`}>
                                            <i className={`fas ${nature.icon} text-[9.5px]`} />
                                            {nature.label}
                                        </span>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <div className="text-[12.5px] font-medium text-epo-slate-800 truncate max-w-[220px]">
                                            {a.objet}
                                        </div>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <div className="min-w-0">
                                            <div className="text-[12.5px] font-medium text-epo-slate-800 truncate max-w-[140px]">
                                                {a.beneficiaire}
                                            </div>
                                            {a.beneficiaireMatricule !== '-' && (
                                                <div className="text-[10.5px] text-epo-slate-500 font-mono">
                                                    {a.beneficiaireMatricule}
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${signataire.chip}`}>
                                            <i className={`fas ${signataire.icon} text-[9.5px]`} />
                                            {signataire.shortLabel}
                                        </span>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <span className="font-mono text-[11.5px] text-epo-slate-700">
                                            {a.numeroSortant}
                                        </span>
                                    </td>

                                    <td className="px-3 py-2.5 text-[11.5px] tabular-nums text-epo-slate-500 whitespace-nowrap">
                                        {formatDateHeure(a.dateSignature)}
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <StatusBadge status={a.etat} />
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onVoir(a);
                                            }}
                                            className="text-[12px] font-medium text-epo-green-600 hover:underline whitespace-nowrap"
                                        >
                                            Consulter
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-[12.5px] border-t border-epo-slate-200 text-epo-slate-500">
                <span>{actes.length} acte{actes.length > 1 ? 's' : ''} signé{actes.length > 1 ? 's' : ''}</span>
                <span className="text-epo-slate-400">
                    <i className="mr-1 fas fa-info-circle" />
                    Cliquez sur une ligne pour ouvrir le détail
                </span>
            </div>
        </div>
    );
}

function ActesSignesListe({ actes, onVoir }) {
    return (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {actes.map((a) => {
                const nature = NATURES_ACTES[a.nature];
                const signataire = TYPES_SIGNATAIRE[a.signataire];
                const isDelegation = a.signataire === 'sg-delegation';

                return (
                    <button
                        key={a.id}
                        onClick={() => onVoir(a)}
                        className={`
                            block w-full text-left bg-white border border-epo-slate-200 border-l-4 rounded-xl
                            p-4 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition cursor-pointer
                            ${isDelegation ? 'border-l-epo-slate-400' : 'border-l-epo-green-500'}
                        `}
                    >
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-mono text-[11.5px] font-bold text-epo-slate-700 bg-epo-slate-100 px-2 py-0.5 rounded-full">
                                    {a.id}
                                </span>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${nature.color}`}>
                                    <i className={`fas ${nature.icon} text-[9px]`} />
                                    {nature.label}
                                </span>
                            </div>
                            <StatusBadge status={a.etat} />
                        </div>

                        <div className="text-[13.5px] font-semibold text-epo-slate-900 mb-2 line-clamp-2">
                            {a.objet}
                        </div>

                        <div className="flex items-center gap-2 mb-3 text-[11.5px] text-epo-slate-500">
                            <i className="fas fa-user text-[10px] text-epo-slate-400" />
                            <span className="truncate">{a.beneficiaire}</span>
                            <span className="text-epo-slate-300">·</span>
                            <span className="font-mono text-[10.5px]">{a.numeroSortant}</span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-epo-slate-100">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${signataire.chip}`}>
                                <i className={`fas ${signataire.icon} text-[9px]`} />
                                {signataire.label}
                            </span>
                            <span className="text-[11px] tabular-nums text-epo-slate-500">
                                {formatDateHeure(a.dateSignature)}
                            </span>
                        </div>

                        {isDelegation && a.mentionDelegation && (
                            <div className="mt-2 pt-2 border-t border-epo-slate-100 text-[10.5px] text-epo-slate-500 italic">
                                <i className="fas fa-stamp text-[9px] mr-1" />
                                Mention §7.1 apposée
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