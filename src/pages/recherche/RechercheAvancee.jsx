// src/pages/recherche/RechercheAvancee.jsx
// Recherche ciblée dans tout ce qui circule : courriers reçus, courriers
// sortants, courriers internes et actes, critère par critère.
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, PageHeader, notify } from '../../components/ui';
import ClassificationBadge from '../../components/scc/ClassificationBadge';
import DossierCircuitModal from '../../components/circuit/DossierCircuitModal';
import DocumentModal from '../../components/circuit/DocumentModal';
import ActeDetailModal from '../../components/actes/ActeDetailModal';
import ArriveeDetailModal from '../../components/scc/ArriveeDetailModal';
import { formatJourHeure } from '../../data/demoClock.js';
import { useCircuit } from '../../data/circuitContext.js';
import { useScc } from '../../data/sccContext.js';
import {
    TYPES_DOCUMENT,
    NATURES,
    STRUCTURES,
    LOCALISATIONS,
    CLASSIFICATIONS,
    ETATS,
    LIBELLES_TYPE,
    TRIS,
    construireIndex,
    filtrer,
    trier,
} from '../../data/rechercheIndex.js';

const PAR_PAGE = 8;

const VIDE = {
    texte: '',
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
};

const ICONES_TYPE = {
    entrant: 'fa-envelope',
    sortant: 'fa-paper-plane',
    interne: 'fa-building',
    acte: 'fa-file-signature',
};

const DOTS_ETAT = {
    signe: 'bg-epo-green-600',
    clos: 'bg-epo-green-600',
    rejete: 'bg-epo-red-600',
    'chez-sg': 'bg-epo-yellow-500',
    'chez-dg': 'bg-epo-yellow-500',
};

/* ============================================================
   PAGE
   ============================================================ */

export default function RechercheAvancee() {
    const { arrivees } = useScc();
    const { dossiers, sortants, actes, instructions } = useCircuit();
    const location = useLocation();

    // Le texte tapé dans la barre du haut arrive ici
    const [filters, setFilters] = useState(() => ({ ...VIDE, texte: location.state?.query ?? '' }));
    const [vueLocation, setVueLocation] = useState(location.key);
    if (vueLocation !== location.key) {
        setVueLocation(location.key);
        setFilters((prev) => ({ ...prev, texte: location.state?.query ?? '' }));
    }

    const [tri, setTri] = useState('date-desc');
    const [page, setPage] = useState(1);
    const [ouvert, setOuvert] = useState(null);

    const updateFilter = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setPage(1);
    };

    const toggleArrayFilter = (key, value) => {
        setFilters((prev) => {
            const arr = prev[key];
            return { ...prev, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
        });
        setPage(1);
    };

    const resetFilters = () => {
        setFilters(VIDE);
        setPage(1);
    };

    const index = construireIndex({ arrivees, dossiers, sortants, actes });
    const resultats = trier(filtrer(index, filters), tri);
    const nbPages = Math.max(1, Math.ceil(resultats.length / PAR_PAGE));
    const pageCourante = Math.min(page, nbPages);
    const visibles = resultats.slice((pageCourante - 1) * PAR_PAGE, pageCourante * PAR_PAGE);

    // Fiche à jour (les données peuvent avoir bougé depuis le clic)
    const fiche = ouvert && index.find((r) => r.sorte === ouvert.sorte && r.id === ouvert.id);

    const exporter = () =>
        notify.success('Export prêt', {
            message: `${resultats.length} résultat${resultats.length > 1 ? 's' : ''} exporté${resultats.length > 1 ? 's' : ''} au format Excel.`,
        });

    return (
        <div className="w-full min-w-0">
            <PageHeader
                title="Recherche avancée"
                description="Retrouvez un courrier ou un acte en combinant plusieurs critères."
                actions={
                    <Button variant="outline" icon="fa-file-export" onClick={exporter} disabled={resultats.length === 0}>
                        Exporter les résultats
                    </Button>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">
                {/* ==================== CRITÈRES ==================== */}
                <aside className="p-5 bg-white border border-epo-slate-200 rounded-xl shadow-soft lg:sticky lg:top-24 lg:max-h-[calc(100vh-7.5rem)] lg:overflow-y-auto">
                    <h2 className="text-[15px] font-semibold text-epo-slate-800 mb-4 flex items-center gap-2">
                        <i className="fas fa-filter text-epo-green-600" aria-hidden="true" />
                        Critères de recherche
                    </h2>

                    <FilterGroup label="Numéro" htmlFor="rech-numero">
                        <input
                            id="rech-numero"
                            type="text"
                            placeholder="Ex : 2026-0482"
                            value={filters.numero}
                            onChange={(e) => updateFilter('numero', e.target.value)}
                            className={inputCls}
                        />
                    </FilterGroup>

                    <FilterGroup label="Objet" htmlFor="rech-objet">
                        <input
                            id="rech-objet"
                            type="text"
                            placeholder="Mots de l'objet"
                            value={filters.objet}
                            onChange={(e) => updateFilter('objet', e.target.value)}
                            className={inputCls}
                        />
                    </FilterGroup>

                    <FilterGroup label="Type de document" htmlFor="rech-type">
                        <Select id="rech-type" value={filters.type} onChange={(v) => updateFilter('type', v)} options={TYPES_DOCUMENT} />
                    </FilterGroup>

                    <FilterGroup label="Nature" htmlFor="rech-nature">
                        <Select id="rech-nature" value={filters.nature} onChange={(v) => updateFilter('nature', v)} options={NATURES} />
                    </FilterGroup>

                    <FilterGroup label="Expéditeur" htmlFor="rech-expediteur">
                        <input
                            id="rech-expediteur"
                            type="text"
                            placeholder="Nom ou structure"
                            value={filters.expediteur}
                            onChange={(e) => updateFilter('expediteur', e.target.value)}
                            className={inputCls}
                        />
                    </FilterGroup>

                    <FilterGroup label="Destinataire" htmlFor="rech-destinataire">
                        <input
                            id="rech-destinataire"
                            type="text"
                            placeholder="Nom ou structure"
                            value={filters.destinataire}
                            onChange={(e) => updateFilter('destinataire', e.target.value)}
                            className={inputCls}
                        />
                    </FilterGroup>

                    <FilterGroup label="Structure" htmlFor="rech-structure" aide="Qui envoie ou qui reçoit">
                        <Select id="rech-structure" value={filters.structure} onChange={(v) => updateFilter('structure', v)} options={STRUCTURES} />
                    </FilterGroup>

                    <FilterGroup label="Période" htmlFor="rech-debut">
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                id="rech-debut"
                                type="date"
                                aria-label="Du"
                                value={filters.dateDebut}
                                onChange={(e) => updateFilter('dateDebut', e.target.value)}
                                className={`${inputCls} px-2`}
                            />
                            <input
                                type="date"
                                aria-label="Au"
                                value={filters.dateFin}
                                min={filters.dateDebut || undefined}
                                onChange={(e) => updateFilter('dateFin', e.target.value)}
                                className={`${inputCls} px-2`}
                            />
                        </div>
                    </FilterGroup>

                    <FilterGroup label="Classification">
                        <div className="flex flex-col gap-0.5">
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
                        <div className="flex flex-col gap-0.5">
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

                    <FilterGroup label="Localisation" htmlFor="rech-localisation">
                        <Select id="rech-localisation" value={filters.localisation} onChange={(v) => updateFilter('localisation', v)} options={LOCALISATIONS} />
                    </FilterGroup>

                    <FilterGroup label="Boîte physique" htmlFor="rech-boite" last>
                        <input
                            id="rech-boite"
                            type="text"
                            placeholder="Ex : BOX-2026-040"
                            value={filters.boite}
                            onChange={(e) => updateFilter('boite', e.target.value)}
                            className={inputCls}
                        />
                    </FilterGroup>

                    <div className="pt-4 mt-4 border-t border-epo-slate-100">
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-epo-slate-100 text-epo-slate-700 text-sm font-semibold hover:bg-epo-slate-200 transition-colors"
                        >
                            Effacer tous les critères
                        </button>
                    </div>
                </aside>

                {/* ==================== RÉSULTATS ==================== */}
                <div className="min-w-0">
                    <div className="flex justify-between items-center mb-4 flex-wrap gap-2.5">
                        <div className="text-[15px] font-semibold text-epo-slate-800" aria-live="polite">
                            <span className="text-epo-green-700">{resultats.length}</span> résultat{resultats.length > 1 ? 's' : ''} trouvé
                            {resultats.length > 1 ? 's' : ''}
                        </div>
                        <label className="flex items-center gap-2 text-sm text-epo-slate-600">
                            Trier par :
                            <select
                                value={tri}
                                onChange={(e) => setTri(e.target.value)}
                                className="px-2.5 py-1.5 border border-epo-slate-300 rounded-lg text-sm text-epo-slate-800 bg-white focus:outline-none focus:border-epo-green-600"
                            >
                                {TRIS.map((t) => (
                                    <option key={t.value} value={t.value}>
                                        {t.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    {filters.texte && (
                        <div className="flex items-center gap-2 mb-4 text-sm text-epo-slate-700">
                            Recherche depuis la barre du haut :
                            <span className="inline-flex items-center gap-2 py-1 pl-3 pr-1 font-medium bg-white border rounded-full border-epo-slate-300 text-epo-slate-900">
                                « {filters.texte} »
                                <button
                                    type="button"
                                    onClick={() => updateFilter('texte', '')}
                                    aria-label="Retirer cette recherche"
                                    className="grid w-6 h-6 rounded-full place-items-center text-epo-slate-500 hover:bg-epo-slate-100 hover:text-epo-slate-900"
                                >
                                    <i className="text-xs fas fa-times" aria-hidden="true" />
                                </button>
                            </span>
                        </div>
                    )}

                    {resultats.length === 0 ? (
                        <div className="px-6 py-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                            <i className="mb-3 text-2xl fas fa-magnifying-glass text-epo-slate-400" aria-hidden="true" />
                            <div className="font-semibold text-epo-slate-800">Aucun résultat</div>
                            <p className="mt-1 text-sm text-epo-slate-600">Retirez un critère ou vérifiez l'orthographe.</p>
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="mt-4 text-sm font-semibold text-epo-green-700 hover:underline"
                            >
                                Effacer tous les critères
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {visibles.map((r) => (
                                <ResultCard key={`${r.sorte}-${r.id}`} result={r} onOpen={() => setOuvert(r)} />
                            ))}
                        </div>
                    )}

                    {nbPages > 1 && (
                        <nav className="flex justify-center items-center gap-1.5 mt-6 flex-wrap" aria-label="Pages de résultats">
                            <PageBtn disabled={pageCourante === 1} onClick={() => setPage(pageCourante - 1)} label="Page précédente">
                                <i className="fas fa-chevron-left" aria-hidden="true" />
                            </PageBtn>
                            {Array.from({ length: nbPages }, (_, i) => i + 1).map((n) => (
                                <PageBtn key={n} active={n === pageCourante} onClick={() => setPage(n)} label={`Page ${n}`}>
                                    {n}
                                </PageBtn>
                            ))}
                            <PageBtn disabled={pageCourante === nbPages} onClick={() => setPage(pageCourante + 1)} label="Page suivante">
                                <i className="fas fa-chevron-right" aria-hidden="true" />
                            </PageBtn>
                        </nav>
                    )}
                </div>
            </div>

            {fiche?.dossier && <DossierCircuitModal dossier={fiche.dossier} instructions={instructions} onClose={() => setOuvert(null)} />}
            {fiche && !fiche.dossier && fiche.arrivee && (
                <ArriveeDetailModal arrivee={fiche.arrivee} onClose={() => setOuvert(null)} canTransmettre={false} />
            )}
            {fiche?.document && <DocumentModal document={fiche.document} onClose={() => setOuvert(null)} />}
            {fiche?.acte && <ActeDetailModal acte={fiche.acte} onClose={() => setOuvert(null)} />}
        </div>
    );
}

/* ============================================================
   SOUS-COMPOSANTS
   ============================================================ */

const inputCls =
    'w-full px-3 py-2.5 border border-epo-slate-300 rounded-lg text-sm text-epo-slate-900 bg-white placeholder:text-epo-slate-500 focus:outline-none focus:border-epo-green-600 focus:ring-2 focus:ring-epo-green-600/20 transition-colors';

function FilterGroup({ label, htmlFor, aide, children, last = false }) {
    return (
        <div className={last ? '' : 'pb-4 mb-4 border-b border-epo-slate-100'}>
            <label htmlFor={htmlFor} className="block text-xs font-semibold tracking-wider uppercase text-epo-slate-600 mb-2">
                {label}
                {aide && <span className="ml-1 font-normal normal-case tracking-normal text-epo-slate-500">· {aide}</span>}
            </label>
            {children}
        </div>
    );
}

function Select({ id, value, onChange, options }) {
    return (
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={`${inputCls} cursor-pointer`}>
            {options.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </select>
    );
}

function CheckItem({ label, checked, onChange }) {
    return (
        <label className="flex items-center gap-2.5 text-sm text-epo-slate-800 cursor-pointer py-1.5">
            <input type="checkbox" checked={checked} onChange={onChange} className="w-4 h-4 cursor-pointer accent-epo-green-600" />
            {label}
        </label>
    );
}

function ResultCard({ result: r, onOpen }) {
    const recu = r.sorte === 'entrant' || r.sorte === 'interne';
    return (
        <article
            onClick={onOpen}
            className="px-5 py-4 transition-colors bg-white border cursor-pointer border-epo-slate-200 rounded-xl shadow-soft hover:border-epo-green-600"
        >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <span className="text-[13px] font-bold text-epo-slate-800 bg-epo-slate-100 px-2.5 py-0.5 rounded-full">{r.id}</span>
                <div className="flex flex-wrap items-center gap-3">
                    {r.classification !== 'ordinaire' && <ClassificationBadge classification={r.classification} />}
                    <span className="inline-flex items-center gap-2 text-sm whitespace-nowrap text-epo-slate-800">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${DOTS_ETAT[r.etat] || 'bg-epo-slate-400'}`} aria-hidden="true" />
                        {r.statutLabel}
                    </span>
                </div>
            </div>

            <h3 className="text-[16px] font-semibold text-epo-slate-900 mb-2">{r.objet}</h3>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-epo-slate-600 mb-3">
                <Meta icon="fa-user">
                    {recu ? 'De' : 'Pour'} : {recu ? r.expediteur : r.destinataire}
                </Meta>
                <Meta icon="fa-calendar">{formatJourHeure(r.date)}</Meta>
                {r.structures.length > 0 && <Meta icon="fa-building">{r.structures.join(', ')}</Meta>}
                <Meta icon={ICONES_TYPE[r.sorte]}>{LIBELLES_TYPE[r.sorte]}</Meta>
            </div>

            <div className="flex justify-between items-center pt-2.5 border-t border-epo-slate-100 text-sm flex-wrap gap-2">
                <div className="inline-flex items-center gap-1.5 font-medium text-epo-slate-700">
                    <i className="fas fa-location-dot text-epo-green-600" aria-hidden="true" />
                    {LOCALISATIONS.find((l) => l.value === r.localisation)?.label} · Boîte {r.boite}
                </div>
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpen();
                    }}
                    className="px-2 py-1 text-sm font-semibold rounded-lg text-epo-green-700 hover:bg-epo-green-50 transition-colors"
                >
                    <i className="mr-1 fas fa-eye" aria-hidden="true" /> Consulter
                </button>
            </div>
        </article>
    );
}

function Meta({ icon, children }) {
    return (
        <span className="inline-flex items-center gap-1.5">
            <i className={`fas ${icon} text-xs text-epo-slate-400`} aria-hidden="true" />
            {children}
        </span>
    );
}

function PageBtn({ children, active, disabled, onClick, label }) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
            className={`min-w-[36px] h-9 px-3 rounded-lg border text-sm font-medium transition-colors ${
                active ? 'bg-epo-slate-800 text-white border-epo-slate-800' : 'bg-white text-epo-slate-700 border-epo-slate-200 hover:bg-epo-slate-100'
            } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    );
}
