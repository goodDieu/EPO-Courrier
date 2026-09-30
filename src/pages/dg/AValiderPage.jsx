// src/pages/dg/AValiderPage.jsx
import { useMemo, useState } from 'react';
import { Button, PriorityTag, StatusBadge } from '../../components/ui';
import AValiderKpi from '../../components/dg/AValiderKpi';
import DgValidationModal from '../../components/dg/DgValidationModal';
import {
    DOCUMENTS_A_VALIDER,
    TYPES_A_VALIDER,
    FILTRES_TYPE,
    FILTRES_PRIORITE,
    FILTRES_PROVENANCE,
    OPTIONS_TRI,
    formatDateHeure,
    formatDuree,
    computeNiveau,
} from '../../data/aValiderDG.js';

const NIVEAUX_INFO = {
    depasse: { label: 'Dépassé', icon: 'fa-exclamation-circle', chip: 'bg-epo-red-100 text-epo-red-800' },
    jourJ: { label: 'Jour J', icon: 'fa-clock', chip: 'bg-epo-yellow-100 text-epo-yellow-800' },
    urgent: { label: 'Urgent', icon: 'fa-hourglass-half', chip: 'bg-epo-yellow-50 text-epo-yellow-700' },
    surveiller: { label: 'À surveiller', icon: 'fa-hourglass-start', chip: 'bg-epo-slate-100 text-epo-slate-600' },
    ok: { label: 'OK', icon: 'fa-check-circle', chip: 'bg-epo-green-50 text-epo-green-700' },
};

/* ============================================================
   PAGE
   ============================================================ */

export default function AValiderPage() {
    const [filtreType, setFiltreType] = useState('');
    const [filtrePriorite, setFiltrePriorite] = useState('');
    const [filtreProvenance, setFiltreProvenance] = useState('');
    const [recherche, setRecherche] = useState('');
    const [tri, setTri] = useState('urgence');
    const [vue, setVue] = useState('tableau');

    const [selectedDoc, setSelectedDoc] = useState(null);

    /* Filtrage + tri */
    const listeFiltree = useMemo(() => {
        let result = DOCUMENTS_A_VALIDER;

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

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Documents à valider
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Documents nécessitant votre avis ou validation -notes, rapports, arbitrages
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <AValiderKpi documents={DOCUMENTS_A_VALIDER} />

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

            {/* BASCULE VUE + TRI */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="text-[14px] font-semibold text-epo-slate-800 flex items-center gap-2">
                    <i className="fas fa-check-double text-epo-green-600" />
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
                        Aucun document à valider
                    </div>
                    <div className="text-[13px] text-epo-slate-500">
                        Tous les documents ont été traités. 🎉
                    </div>
                </div>
            ) : vue === 'tableau' ? (
                <AValiderTable documents={listeFiltree} onValider={setSelectedDoc} />
            ) : (
                <AValiderListe documents={listeFiltree} onValider={setSelectedDoc} />
            )}

            {/* MODALE */}
            <DgValidationModal
                document={selectedDoc}
                onClose={() => setSelectedDoc(null)}
            />
        </div>
    );
}

/* ============================================================
   SOUS-COMPOSANTS
   ============================================================ */

function AValiderTable({ documents, onValider }) {
    return (
        <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-epo-slate-50">
                            {['N°', 'Type', 'Objet', 'Provenance', 'Priorité', 'Reçu le', 'Échéance', 'État', ''].map((h, i) => (
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
                            const type = TYPES_A_VALIDER[d.type];
                            const niveau = computeNiveau(d.tempsRestantMin);
                            const niveauInfo = NIVEAUX_INFO[niveau];

                            return (
                                <tr
                                    key={d.id}
                                    onClick={() => onValider(d)}
                                    className="transition border-t cursor-pointer border-epo-slate-100 hover:bg-epo-slate-50"
                                >
                                    <td className="px-3 py-2.5">
                                        <span className="font-mono text-[12px] font-semibold text-epo-slate-800">
                                            {d.id}
                                        </span>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${type.color}`}>
                                            <i className={`fas ${type.icon} text-[9.5px]`} />
                                            {type.label}
                                        </span>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <div className="min-w-0">
                                            <div className="text-[12.5px] font-medium text-epo-slate-800 truncate max-w-[280px]">
                                                {d.objet}
                                            </div>
                                            <div className="flex items-center gap-1 mt-0.5 text-[11px] text-epo-slate-500">
                                                <i className="fas fa-user text-[9.5px] text-epo-slate-400" />
                                                {d.expediteur}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-3 py-2.5 text-[12px] text-epo-slate-600">
                                        {d.provenence}
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <PriorityTag priority={d.priorite} />
                                    </td>

                                    <td className="px-3 py-2.5 text-[11.5px] tabular-nums text-epo-slate-500 whitespace-nowrap">
                                        {formatDateHeure(d.dateReceptionDG)}
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${niveauInfo.chip}`}>
                                            <i className={`fas ${niveauInfo.icon} text-[9px]`} />
                                            {d.tempsRestantMin < 0
                                                ? `+${formatDuree(d.tempsRestantMin)}`
                                                : formatDuree(d.tempsRestantMin)}
                                        </span>
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <StatusBadge status={d.etat} />
                                    </td>

                                    <td className="px-3 py-2.5">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onValider(d);
                                            }}
                                            className="text-[12px] font-semibold text-epo-green-600 hover:underline whitespace-nowrap"
                                        >
                                            <i className="mr-1 fas fa-check-double" />
                                            Traiter
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-[12.5px] border-t border-epo-slate-200 text-epo-slate-500">
                <span>{documents.length} document{documents.length > 1 ? 's' : ''} affiché{documents.length > 1 ? 's' : ''}</span>
                <span className="text-epo-slate-400">
                    <i className="mr-1 fas fa-info-circle" />
                    Cliquez sur une ligne pour ouvrir la modale de validation
                </span>
            </div>
        </div>
    );
}

function AValiderListe({ documents, onValider }) {
    return (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {documents.map((d) => {
                const type = TYPES_A_VALIDER[d.type];
                const niveau = computeNiveau(d.tempsRestantMin);
                const niveauInfo = NIVEAUX_INFO[niveau];
                const borderColor =
                    niveau === 'depasse' ? 'border-l-epo-red-500' :
                    niveau === 'jourJ' ? 'border-l-epo-yellow-500' :
                    niveau === 'urgent' ? 'border-l-epo-yellow-400' :
                    niveau === 'surveiller' ? 'border-l-epo-slate-400' :
                    'border-l-epo-green-500';

                return (
                    <button
                        key={d.id}
                        onClick={() => onValider(d)}
                        className={`
                            block w-full text-left bg-white border border-epo-slate-200 border-l-4
                            ${borderColor}
                            rounded-xl p-4 shadow-soft hover:shadow-card hover:-translate-y-0.5
                            transition cursor-pointer
                        `}
                    >
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-mono text-[11.5px] font-bold text-epo-slate-700 bg-epo-slate-100 px-2 py-0.5 rounded-full">
                                    {d.id}
                                </span>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${type.color}`}>
                                    <i className={`fas ${type.icon} text-[9px]`} />
                                    {type.label}
                                </span>
                            </div>
                            <PriorityTag priority={d.priorite} />
                        </div>

                        <div className="text-[13.5px] font-semibold text-epo-slate-900 mb-2 line-clamp-2">
                            {d.objet}
                        </div>

                        <div className="text-[11.5px] text-epo-slate-500 mb-3 truncate">
                            <i className="fas fa-user text-[10px] text-epo-slate-400 mr-1" />
                            {d.expediteur}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-epo-slate-100">
                            <StatusBadge status={d.etat} />
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${niveauInfo.chip}`}>
                                <i className={`fas ${niveauInfo.icon} text-[9px]`} />
                                {d.tempsRestantMin < 0
                                    ? `+${formatDuree(d.tempsRestantMin)}`
                                    : formatDuree(d.tempsRestantMin)}
                            </span>
                        </div>
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