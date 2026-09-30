// src/pages/dg/ConfidentielPage.jsx
import { useMemo, useState } from 'react';
import { Button, PriorityTag, StatusBadge } from '../../components/ui';
import ConfidentielBanner from '../../components/dg/ConfidentielBanner';
import ConfidentielKpi from '../../components/dg/ConfidentielKpi';
import GestionAccesModal from '../../components/dg/GestionAccesModal';
import DgSignatureModal from '../../components/dg/DgSignatureModal';
import {
    DOSSIERS_CONFIDENTIELS,
    JOURNAL_ACCES,
    TYPES_CONFIDENTIELS,
    TYPES_ACCES,
    FILTRES_TYPE,
    FILTRES_PRIORITE,
    formatDateHeure,
    formatDuree,
    computeNiveau,
} from '../../data/confidentielDG.js';

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

export default function ConfidentielPage() {
    const [filtreType, setFiltreType] = useState('');
    const [filtrePriorite, setFiltrePriorite] = useState('');
    const [recherche, setRecherche] = useState('');
    const [onglet, setOnglet] = useState('dossiers'); // 'dossiers' | 'journal'

    const [selectedDoc, setSelectedDoc] = useState(null);
    const [docGestionAcces, setDocGestionAcces] = useState(null);

    /* Filtrage */
    const listeFiltree = useMemo(() => {
        let result = DOSSIERS_CONFIDENTIELS;

        if (filtreType) result = result.filter((d) => d.type === filtreType);
        if (filtrePriorite) result = result.filter((d) => d.priorite === filtrePriorite);

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
            const niveauOrdre = { depasse: 0, jourJ: 1, urgent: 2, surveiller: 3, ok: 4 };
            const na = niveauOrdre[computeNiveau(a.tempsRestantMin)];
            const nb = niveauOrdre[computeNiveau(b.tempsRestantMin)];
            if (na !== nb) return na - nb;
            return a.tempsRestantMin - b.tempsRestantMin;
        });
    }, [filtreType, filtrePriorite, recherche]);

    const hasFiltreActif = filtreType || filtrePriorite || recherche;

    const resetFiltres = () => {
        setFiltreType('');
        setFiltrePriorite('');
        setRecherche('');
    };

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Espace confidentiel
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Dossiers sensibles soumis à liste blanche · Accès journalisé
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter le journal
                    </Button>
                </div>
            </div>

            {/* BANDEAU SÉCURITÉ */}
            <ConfidentielBanner />

            {/* KPI */}
            <ConfidentielKpi
                documents={DOSSIERS_CONFIDENTIELS}
                journal={JOURNAL_ACCES}
            />

            {/* ONGLETS */}
            <div className="inline-flex p-1 mb-4 rounded-lg bg-epo-slate-100">
                <button
                    onClick={() => setOnglet('dossiers')}
                    className={`
                        px-4 py-2 rounded-md text-[13px] font-semibold transition inline-flex items-center gap-2
                        ${onglet === 'dossiers'
                            ? 'bg-white text-epo-slate-900 shadow-soft'
                            : 'text-epo-slate-500 hover:text-epo-slate-700'}
                    `}
                >
                    <i className="fas fa-folder-open" />
                    Dossiers ({DOSSIERS_CONFIDENTIELS.length})
                </button>
                <button
                    onClick={() => setOnglet('journal')}
                    className={`
                        px-4 py-2 rounded-md text-[13px] font-semibold transition inline-flex items-center gap-2
                        ${onglet === 'journal'
                            ? 'bg-white text-epo-slate-900 shadow-soft'
                            : 'text-epo-slate-500 hover:text-epo-slate-700'}
                    `}
                >
                    <i className="fas fa-clipboard-list" />
                    Journal d'accès ({JOURNAL_ACCES.length})
                </button>
            </div>

            {/* ============================================
                ONGLET DOSSIERS
                ============================================ */}
            {onglet === 'dossiers' && (
                <>
                    {/* Filtres */}
                    <div className="flex flex-wrap items-center gap-3 p-4 mb-4 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                        <div className="relative flex-1 min-w-[200px]">
                            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-epo-slate-400 text-[12px]" />
                            <input
                                type="text"
                                value={recherche}
                                onChange={(e) => setRecherche(e.target.value)}
                                placeholder="Rechercher un dossier confidentiel…"
                                className="w-full pl-9 pr-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                            />
                        </div>

                        <SelectFilter value={filtreType} onChange={setFiltreType} options={FILTRES_TYPE} />
                        <SelectFilter value={filtrePriorite} onChange={setFiltrePriorite} options={FILTRES_PRIORITE} />

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

                    {/* Tableau des dossiers */}
                    <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-white bg-epo-slate-800">
                                        {['N°', 'Type', 'Objet', 'Provenance', 'Priorité', 'Échéance', 'État', 'Accès', ''].map((h, i) => (
                                            <th
                                                key={i}
                                                className="px-3 py-2.5 text-[11px] font-semibold tracking-wider text-left uppercase whitespace-nowrap"
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {listeFiltree.map((d) => {
                                        const type = TYPES_CONFIDENTIELS[d.type];
                                        const niveau = computeNiveau(d.tempsRestantMin);
                                        const niveauInfo = NIVEAUX_INFO[niveau];

                                        return (
                                            <tr
                                                key={d.id}
                                                className="transition border-t cursor-pointer border-epo-slate-100 hover:bg-epo-slate-50"
                                                onClick={() => setSelectedDoc(d)}
                                            >
                                                <td className="px-3 py-2.5">
                                                    <span className="font-mono text-[12px] font-bold text-epo-slate-800">
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
                                                        <div className="text-[12.5px] font-medium text-epo-slate-800 truncate max-w-[240px]">
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
                                                            setDocGestionAcces(d);
                                                        }}
                                                        className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-epo-slate-600 hover:text-epo-slate-800 hover:underline"
                                                        title="Gérer les accès (RG-11)"
                                                    >
                                                        <i className="fas fa-shield-halved text-[10px]" />
                                                        {d.listeBlanche.length}
                                                    </button>
                                                </td>
                                                <td className="px-3 py-2.5">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedDoc(d);
                                                        }}
                                                        className="text-[12px] font-semibold text-epo-green-600 hover:underline whitespace-nowrap"
                                                    >
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
                            <span>{listeFiltree.length} dossier{listeFiltree.length > 1 ? 's' : ''}</span>
                            <span className="text-epo-slate-400">
                                <i className="mr-1 fas fa-info-circle" />
                                Cliquez sur une ligne pour ouvrir le dossier
                            </span>
                        </div>
                    </div>
                </>
            )}

            {/* ============================================
                ONGLET JOURNAL (RG-13)
                ============================================ */}
            {onglet === 'journal' && (
                <>
                    <div className="flex items-start gap-2 p-3 mb-4 border rounded-lg bg-epo-slate-50 border-epo-slate-200">
                        <i className="fas fa-clipboard-list text-epo-slate-500 mt-0.5" />
                        <div className="text-[12px] text-epo-slate-700">
                            <strong>Journal d'audit (RG-13).</strong> Toute consultation, impression, téléchargement ou tentative d'accès refusée est enregistrée avec l'utilisateur, l'horodatage et l'adresse IP.
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-epo-slate-50">
                                        {['Type', 'Dossier', 'Utilisateur', 'Fonction', 'Date', 'IP'].map((h, i) => (
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
                                    {JOURNAL_ACCES.map((l) => {
                                        const typeAcces = TYPES_ACCES[l.typeAcces];
                                        const isRefus = l.typeAcces === 'refus';

                                        return (
                                            <tr
                                                key={l.id}
                                                className={`
                                                    border-t border-epo-slate-100 transition
                                                    ${isRefus ? 'bg-epo-red-50/40' : 'hover:bg-epo-slate-50'}
                                                `}
                                            >
                                                <td className="px-3 py-2.5">
                                                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${typeAcces.chip}`}>
                                                        <i className={`fas ${typeAcces.icon} text-[9px]`} />
                                                        {typeAcces.label}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2.5">
                                                    <div className="min-w-0">
                                                        <div className="font-mono text-[11.5px] font-semibold text-epo-slate-800">
                                                            {l.documentId}
                                                        </div>
                                                        <div className="text-[11px] text-epo-slate-500 truncate max-w-[220px]">
                                                            {l.documentObjet}
                                                        </div>
                                                        {l.raison && (
                                                            <div className="text-[10.5px] text-epo-red-600 mt-0.5">
                                                                <i className="fas fa-info-circle text-[9px] mr-1" />
                                                                {l.raison}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-3 py-2.5">
                                                    <div className="text-[12.5px] font-medium text-epo-slate-800">
                                                        {l.utilisateur}
                                                    </div>
                                                </td>
                                                <td className="px-3 py-2.5 text-[11.5px] text-epo-slate-600">
                                                    {l.fonction}
                                                </td>
                                                <td className="px-3 py-2.5 text-[11.5px] tabular-nums text-epo-slate-500 whitespace-nowrap">
                                                    {formatDateHeure(l.date)}
                                                </td>
                                                <td className="px-3 py-2.5">
                                                    <span className="font-mono text-[11px] text-epo-slate-500">
                                                        {l.adresseIP}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-[12.5px] border-t border-epo-slate-200 text-epo-slate-500">
                            <span>{JOURNAL_ACCES.length} entrées récentes</span>
                            <span className="text-epo-slate-400">
                                <i className="mr-1 fas fa-info-circle" />
                                Les tentatives refusées sont surlignées en rouge
                            </span>
                        </div>
                    </div>
                </>
            )}

            {/* MODALES */}
            <DgSignatureModal
                document={selectedDoc}
                onClose={() => setSelectedDoc(null)}
            />

            <GestionAccesModal
                document={docGestionAcces}
                onClose={() => setDocGestionAcces(null)}
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