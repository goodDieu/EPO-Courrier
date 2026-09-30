// src/pages/recherche/RechercheAvancee.jsx
import { useState } from 'react';
import {
    StatusBadge,
    PriorityTag,
    SectionTitle,
    Button,
} from '../../components/ui';
import { RESULTATS_RECHERCHE } from '../../data/recherche.js';

/* ============================================================
   OPTIONS DES FILTRES
   ============================================================ */

const TYPES_DOCUMENT = [
    { value: '', label: 'Tous les types' },
    { value: 'entrant', label: 'Courrier entrant' },
    { value: 'sortant', label: 'Courrier sortant' },
    { value: 'interne', label: 'Courrier interne' },
    { value: 'acte', label: 'Acte administratif' },
];

const NATURES = [
    { value: '', label: 'Toutes les natures' },
    { value: 'lettre', label: 'Lettre' },
    { value: 'decision', label: 'Décision' },
    { value: 'circulaire', label: 'Circulaire' },
    { value: 'facture', label: 'Facture' },
    { value: 'certificat', label: 'Certificat' },
    { value: 'attestation', label: 'Attestation' },
    { value: 'ordre-mission', label: 'Ordre de mission' },
    { value: 'pv', label: 'PV de délibération' },
];

const STRUCTURES = [
    { value: '', label: 'Toutes les structures' },
    { value: 'sg', label: 'Secrétariat Général' },
    { value: 'dg', label: 'Direction Générale' },
    { value: 'scc', label: 'SCC' },
    { value: 'drh', label: 'DRH' },
    { value: 'daf', label: 'DAF' },
    { value: 'dga-ave', label: 'DGA-AVE' },
    { value: 'dga-rcp', label: 'DGA-RCP' },
];

const LOCALISATIONS = [
    { value: '', label: 'Toutes les localisations' },
    { value: 'scc', label: 'Service Central du Courrier' },
    { value: 'sp-sg', label: 'SP-SG' },
    { value: 'sp-dg', label: 'SP-DG' },
    { value: 'direction', label: 'Directions' },
    { value: 'archives', label: 'Archives' },
];

const CLASSIFICATIONS = [
    { key: 'ordinaire', label: 'Ordinaire' },
    { key: 'urgent', label: 'Urgent' },
    { key: 'confidentiel', label: 'Confidentiel / Réservé' },
];

const ETATS = [
    { key: 'enregistre', label: 'Enregistré' },
    { key: 'chez-sg', label: 'Chez SG' },
    { key: 'chez-dg', label: 'Chez DG' },
    { key: 'signe', label: 'Signé' },
    { key: 'rejete', label: 'Rejeté' },
    { key: 'archive', label: 'Archivé' },
];

/* ============================================================
   PAGE
   ============================================================ */

export default function RechercheAvancee() {
    const [filters, setFilters] = useState({
        numero: '',
        objet: '',
        type: '',
        nature: '',
        expediteur: '',
        destinataire: '',
        structure: '',
        dateDebut: '',
        dateFin: '',
        classification: ['ordinaire'],
        etat: ['enregistre', 'chez-sg', 'chez-dg', 'signe'],
        localisation: '',
        boite: '',
    });

    const [tri, setTri] = useState('date-desc');
    const [selectedResult, setSelectedResult] = useState(null);

    const updateFilter = (key, value) =>
        setFilters((prev) => ({ ...prev, [key]: value }));

    const toggleArrayFilter = (key, value) =>
        setFilters((prev) => {
            const arr = prev[key];
            return {
                ...prev,
                [key]: arr.includes(value)
                    ? arr.filter((v) => v !== value)
                    : [...arr, value],
            };
        });

    const resetFilters = () =>
        setFilters({
            numero: '',
            objet: '',
            type: '',
            nature: '',
            expediteur: '',
            destinataire: '',
            structure: '',
            dateDebut: '',
            dateFin: '',
            classification: [],
            etat: [],
            localisation: '',
            boite: '',
        });

    return (
        <div>
            {/* ============================================
                EN-TÊTE DE PAGE
                ============================================ */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Recherche avancée
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Retrouvez un courrier ou un acte en quelques secondes
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" icon="fa-bookmark">
                        Recherches sauvegardées
                    </Button>
                    <Button variant="outline" icon="fa-file-export">
                        Exporter les résultats
                    </Button>
                </div>
            </div>

            {/* ============================================
                LAYOUT : FILTRES + RÉSULTATS
                ============================================ */}
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">
                {/* ==================== FILTRES ==================== */}
                <aside className="p-5 bg-white border border-epo-slate-200 rounded-xl shadow-soft lg:sticky lg:top-24">
                    <h3 className="text-[15px] font-semibold text-epo-slate-800 mb-4 flex items-center gap-2">
                        <i className="fas fa-filter text-epo-green-500" />
                        Filtres de recherche
                    </h3>

                    <FilterGroup label="Numéro de dossier">
                        <input
                            type="text"
                            placeholder="Ex: 2026-0452"
                            value={filters.numero}
                            onChange={(e) => updateFilter('numero', e.target.value)}
                            className={inputCls}
                        />
                    </FilterGroup>

                    <FilterGroup label="Objet">
                        <input
                            type="text"
                            placeholder="Mots-clés de l'objet"
                            value={filters.objet}
                            onChange={(e) => updateFilter('objet', e.target.value)}
                            className={inputCls}
                        />
                    </FilterGroup>

                    <FilterGroup label="Type de document">
                        <select
                            value={filters.type}
                            onChange={(e) => updateFilter('type', e.target.value)}
                            className={inputCls}
                        >
                            {TYPES_DOCUMENT.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </FilterGroup>

                    <FilterGroup label="Nature">
                        <select
                            value={filters.nature}
                            onChange={(e) => updateFilter('nature', e.target.value)}
                            className={inputCls}
                        >
                            {NATURES.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </FilterGroup>

                    <FilterGroup label="Expéditeur">
                        <input
                            type="text"
                            placeholder="Nom ou structure"
                            value={filters.expediteur}
                            onChange={(e) => updateFilter('expediteur', e.target.value)}
                            className={inputCls}
                        />
                    </FilterGroup>

                    <FilterGroup label="Destinataire">
                        <input
                            type="text"
                            placeholder="Nom ou structure"
                            value={filters.destinataire}
                            onChange={(e) => updateFilter('destinataire', e.target.value)}
                            className={inputCls}
                        />
                    </FilterGroup>

                    <FilterGroup label="Structure">
                        <select
                            value={filters.structure}
                            onChange={(e) => updateFilter('structure', e.target.value)}
                            className={inputCls}
                        >
                            {STRUCTURES.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </FilterGroup>

                    <FilterGroup label="Période">
                        <div className="flex items-center gap-2">
                            <input
                                type="date"
                                value={filters.dateDebut}
                                onChange={(e) => updateFilter('dateDebut', e.target.value)}
                                className={inputCls}
                                style={{ width: 'calc(50% - 2px)' }}
                            />
                            <span className="text-epo-slate-400 text-[12px]">-</span>
                            <input
                                type="date"
                                value={filters.dateFin}
                                onChange={(e) => updateFilter('dateFin', e.target.value)}
                                className={inputCls}
                                style={{ width: 'calc(49% - 2px)' }}
                            />
                        </div>
                    </FilterGroup>

                    <FilterGroup label="Classification">
                        <div className="flex flex-col gap-1.5">
                            {CLASSIFICATIONS.map((c) => (
                                <CheckItem
                                    key={c.key}
                                    label={c.label}
                                    checked={filters.classification.includes(c.key)}
                                    onChange={() => toggleArrayFilter('classification', c.key)}
                                />
                            ))}
                        </div>
                    </FilterGroup>

                    <FilterGroup label="État">
                        <div className="flex flex-col gap-1.5">
                            {ETATS.map((e) => (
                                <CheckItem
                                    key={e.key}
                                    label={e.label}
                                    checked={filters.etat.includes(e.key)}
                                    onChange={() => toggleArrayFilter('etat', e.key)}
                                />
                            ))}
                        </div>
                    </FilterGroup>

                    <FilterGroup label="Localisation">
                        <select
                            value={filters.localisation}
                            onChange={(e) => updateFilter('localisation', e.target.value)}
                            className={inputCls}
                        >
                            {LOCALISATIONS.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </FilterGroup>

                    <FilterGroup label="Boîte physique" last>
                        <input
                            type="text"
                            placeholder="Ex: BOX-2026-012"
                            value={filters.boite}
                            onChange={(e) => updateFilter('boite', e.target.value)}
                            className={inputCls}
                        />
                    </FilterGroup>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 mt-4 border-t border-epo-slate-100">
                        <button
                            onClick={resetFilters}
                            className="flex-1 px-3.5 py-2.5 rounded-lg bg-epo-slate-100 text-epo-slate-600 text-[13px] font-semibold hover:bg-epo-slate-200 transition"
                        >
                            Réinitialiser
                        </button>
                        <button
                            onClick={() => {}}
                            className="flex-1 px-3.5 py-2.5 rounded-lg bg-epo-slate-800 text-white text-[13px] font-semibold hover:bg-epo-slate-700 transition inline-flex items-center justify-center gap-2"
                        >
                            <i className="fas fa-search" />
                            Rechercher
                        </button>
                    </div>
                </aside>

                {/* ==================== RÉSULTATS ==================== */}
                <div className="min-w-0">
                    <div className="flex justify-between items-center mb-4 flex-wrap gap-2.5">
                        <div className="text-[15px] font-semibold text-epo-slate-800">
                            <span className="text-epo-green-600">
                                {RESULTATS_RECHERCHE.length}
                            </span>{' '}
                            résultats trouvés
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-epo-slate-500">
                            Trier par :
                            <select
                                value={tri}
                                onChange={(e) => setTri(e.target.value)}
                                className="px-2.5 py-1.5 border border-epo-slate-300 rounded-lg text-[13px] text-epo-slate-700 bg-white focus:outline-none focus:border-epo-green-500"
                            >
                                <option value="date-desc">Date (plus récent)</option>
                                <option value="date-asc">Date (plus ancien)</option>
                                <option value="num-desc">Numéro (décroissant)</option>
                                <option value="num-asc">Numéro (croissant)</option>
                                <option value="objet">Objet (A-Z)</option>
                            </select>
                        </div>
                    </div>

                    {/* Cartes de résultats */}
                    <div className="flex flex-col gap-3">
                        {RESULTATS_RECHERCHE.map((r) => (
                            <ResultCard
                                key={r.id}
                                result={r}
                                onOpen={() => setSelectedResult(r)}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-1.5 mt-6 flex-wrap">
                        <PageBtn disabled>
                            <i className="fas fa-chevron-left" />
                        </PageBtn>
                        <PageBtn active>1</PageBtn>
                        <PageBtn>2</PageBtn>
                        <PageBtn>3</PageBtn>
                        <PageBtn>4</PageBtn>
                        <PageBtn>5</PageBtn>
                        <span className="px-2 text-epo-slate-400">...</span>
                        <PageBtn>10</PageBtn>
                        <PageBtn>
                            <i className="fas fa-chevron-right" />
                        </PageBtn>
                    </div>
                </div>
            </div>

            {/* Détail (à brancher sur une Modal si tu veux) */}
            {selectedResult && (
                <div className="p-5 mt-6 bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                    <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-epo-slate-800">
                            Détail - {selectedResult.id}
                        </div>
                        <button
                            onClick={() => setSelectedResult(null)}
                            className="text-epo-slate-500 hover:text-epo-slate-800"
                        >
                            <i className="fas fa-times" />
                        </button>
                    </div>
                    <div className="text-sm text-epo-slate-600">
                        {selectedResult.objet} - {selectedResult.expediteur}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ============================================================
   SOUS-COMPOSANTS
   ============================================================ */

const inputCls = `
    w-full px-3 py-2.5 border border-epo-slate-300 rounded-lg
    text-[13.5px] text-epo-slate-800 bg-white
    focus:outline-none focus:border-epo-green-500
    focus:ring-2 focus:ring-epo-green-500/10 transition
`;

function FilterGroup({ label, children, last = false }) {
    return (
        <div
            className={`
                pb-4 mb-4 border-b border-epo-slate-100
                ${last ? 'border-b-0 pb-0 mb-0' : ''}
            `}
        >
            <label className="block text-[12px] font-semibold text-epo-slate-500 uppercase tracking-wider mb-2">
                {label}
            </label>
            {children}
        </div>
    );
}

function CheckItem({ label, checked, onChange }) {
    return (
        <label className="flex items-center gap-2 text-[13.5px] text-epo-slate-700 cursor-pointer py-1">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 cursor-pointer accent-epo-green-500"
            />
            {label}
        </label>
    );
}

function ResultCard({ result, onOpen }) {
    const r = result;

    return (
        <div
            onClick={onOpen}
            className="
                bg-white border border-epo-slate-200 rounded-xl
                px-5 py-4 shadow-soft cursor-pointer
                transition hover:shadow-card hover:-translate-y-0.5
                hover:border-epo-green-300
            "
        >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <span className="text-[13px] font-bold text-epo-slate-800 bg-epo-slate-100 px-2.5 py-0.5 rounded-full">
                    {r.id}
                </span>
                <div className="flex gap-1.5 flex-wrap">
                    {r.priorite && <PriorityTag priority={r.priorite} />}
                    <StatusBadge status={r.statut} />
                </div>
            </div>

            <div className="text-[16px] font-semibold text-epo-slate-900 mb-2">
                {r.objet}
            </div>

            <div className="flex flex-wrap gap-4 text-[13px] text-epo-slate-500 mb-3">
                <span className="inline-flex items-center gap-1.5">
                    <i className="fas fa-user text-[12px] text-epo-slate-400" />
                    {r.expediteur}
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <i className="fas fa-calendar text-[12px] text-epo-slate-400" />
                    {r.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <i className="fas fa-building text-[12px] text-epo-slate-400" />
                    {r.structure}
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <i className={`fas ${r.iconType || 'fa-file'} text-[12px] text-epo-slate-400`} />
                    {r.type}
                </span>
            </div>

            <div className="flex justify-between items-center pt-2.5 border-t border-epo-slate-100 text-[13px] flex-wrap gap-2">
                <div className="inline-flex items-center gap-1.5 text-epo-teal-500 font-medium">
                    <i className="fas fa-map-marker-alt text-[13px]" />
                    {r.localisation}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="text-epo-green-600 text-[13px] font-medium px-2 py-1 rounded-lg hover:bg-epo-green-50 transition"
                    >
                        <i className="fas fa-eye" /> Consulter
                    </button>
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="text-epo-green-600 text-[13px] font-medium px-2 py-1 rounded-lg hover:bg-epo-green-50 transition"
                    >
                        <i className="fas fa-download" /> Télécharger
                    </button>
                </div>
            </div>
        </div>
    );
}

function PageBtn({ children, active, disabled, onClick }) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`
                min-w-[36px] h-9 px-3 rounded-lg border text-[13px] font-medium transition
                ${
                    active
                        ? 'bg-epo-slate-800 text-white border-epo-slate-800'
                        : 'bg-white text-epo-slate-600 border-epo-slate-200 hover:bg-epo-slate-100'
                }
                ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
            `}
        >
            {children}
        </button>
    );
}