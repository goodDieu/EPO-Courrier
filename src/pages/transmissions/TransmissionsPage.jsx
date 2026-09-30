// src/pages/transmissions/TransmissionsPage.jsx
import { useMemo, useState } from 'react';
import { Button, SectionTitle } from '../../components/ui';
import TransmissionsKpi from '../../components/transmissions/TransmissionsKpi';
import TourneesDuJour from '../../components/transmissions/TourneesDuJour';
import TransmissionsTable from '../../components/transmissions/TransmissionsTable';
import RemiseModal from '../../components/transmissions/RemiseModal';
import {
    TRANSMISSIONS,
    AGENTS_LIAISON,
    FILTRES_ETAT,
    FILTRES_MODE,
    FILTRES_AGENT,
    buildTournees,
} from '../../data/transmissions.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function TransmissionsPage() {
    const [vue, setVue] = useState('tournees'); // 'tournees' | 'tableau'
    const [filtreEtat, setFiltreEtat] = useState('');
    const [filtreMode, setFiltreMode] = useState('');
    const [filtreAgent, setFiltreAgent] = useState('');
    const [recherche, setRecherche] = useState('');
    const [selectedTransmission, setSelectedTransmission] = useState(null);

    // Enrichir avec le nom de l'agent
    const transmissionsEnrichies = useMemo(
        () =>
            TRANSMISSIONS.map((t) => ({
                ...t,
                agentNom: t.agentId
                    ? AGENTS_LIAISON.find((a) => a.id === t.agentId)?.nom
                    : null,
            })),
        []
    );

    // Tournées du jour
    const tournees = useMemo(
        () => buildTournees(transmissionsEnrichies),
        [transmissionsEnrichies]
    );

    // Liste filtrée (pour la vue tableau)
    const listeFiltree = useMemo(() => {
        let result = transmissionsEnrichies;

        if (filtreEtat) result = result.filter((t) => t.etat === filtreEtat);
        if (filtreMode) result = result.filter((t) => t.mode === filtreMode);
        if (filtreAgent) result = result.filter((t) => t.agentId === filtreAgent);

        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (t) =>
                    t.id.toLowerCase().includes(q) ||
                    t.documentNumero.toLowerCase().includes(q) ||
                    t.documentObjet.toLowerCase().includes(q) ||
                    t.destinataire.structure.toLowerCase().includes(q) ||
                    t.destinataire.personne.toLowerCase().includes(q)
            );
        }

        // Tri : en retard d'abord, puis par date de départ
        return [...result].sort((a, b) => {
            if (a.etat === 'en-retard' && b.etat !== 'en-retard') return -1;
            if (b.etat === 'en-retard' && a.etat !== 'en-retard') return 1;
            return new Date(b.dateDepart) - new Date(a.dateDepart);
        });
    }, [transmissionsEnrichies, filtreEtat, filtreMode, filtreAgent, recherche]);

    const hasFiltreActif = filtreEtat || filtreMode || filtreAgent || recherche;

    const resetFiltres = () => {
        setFiltreEtat('');
        setFiltreMode('');
        setFiltreAgent('');
        setRecherche('');
    };

    return (
        <div className="w-full min-w-0">
            {/* ============================================
                EN-TÊTE
                ============================================ */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Transmissions
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Tournées des agents de liaison · Remises directes · Preuves et décharges
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                    <Button variant="primary" icon="fa-plus">
                        Nouvelle transmission
                    </Button>
                </div>
            </div>

            {/* ============================================
                KPI
                ============================================ */}
            <TransmissionsKpi transmissions={transmissionsEnrichies} />

            {/* ============================================
                BASCULE + FILTRES
                ============================================ */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="inline-flex p-1 rounded-lg bg-epo-slate-100">
                    <button
                        onClick={() => setVue('tournees')}
                        className={`
                            px-3 py-1.5 rounded-md text-[12.5px] font-semibold transition inline-flex items-center gap-1.5
                            ${vue === 'tournees'
                                ? 'bg-white text-epo-slate-900 shadow-soft'
                                : 'text-epo-slate-500 hover:text-epo-slate-700'}
                        `}
                    >
                        <i className="fas fa-truck" />
                        Tournées du jour
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
                        Toutes les transmissions
                    </button>
                </div>
            </div>

            {/* ============================================
                CONTENU SELON VUE
                ============================================ */}
            {vue === 'tournees' && (
                <>
                    <SectionTitle
                        icon="fa-route"
                        title={`Tournées du jour (${tournees.length} agent${tournees.length > 1 ? 's' : ''})`}
                    />
                    <TourneesDuJour
                        tournees={tournees}
                        onVoir={setSelectedTransmission}
                    />

                    {/* Bandeau retards */}
                    {transmissionsEnrichies.filter((t) => t.etat === 'en-retard').length > 0 && (
                        <div className="p-4 mt-6 border bg-epo-red-50 border-epo-red-200 rounded-xl">
                            <div className="flex items-start gap-2.5">
                                <i className="fas fa-exclamation-triangle text-epo-red-600 mt-0.5" />
                                <div>
                                    <div className="text-[13.5px] font-semibold text-epo-red-800">
                                        {transmissionsEnrichies.filter((t) => t.etat === 'en-retard').length} transmission(s) en retard
                                    </div>
                                    <div className="text-[12.5px] text-epo-red-700 mt-0.5">
                                        Passez en vue "Toutes les transmissions" pour les traiter.
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {vue === 'tableau' && (
                <>
                    {/* Filtres */}
                    <div className="flex flex-wrap items-center gap-3 p-4 mb-4 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                        <div className="relative flex-1 min-w-[200px]">
                            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-epo-slate-400 text-[12px]" />
                            <input
                                type="text"
                                value={recherche}
                                onChange={(e) => setRecherche(e.target.value)}
                                placeholder="Rechercher une transmission…"
                                className="w-full pl-9 pr-3 py-2 border border-epo-slate-300 rounded-lg text-[13px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                            />
                        </div>

                        <SelectFilter value={filtreEtat} onChange={setFiltreEtat} options={FILTRES_ETAT} />
                        <SelectFilter value={filtreMode} onChange={setFiltreMode} options={FILTRES_MODE} />
                        <SelectFilter value={filtreAgent} onChange={setFiltreAgent} options={FILTRES_AGENT} />

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

                    <SectionTitle
                        icon="fa-list"
                        title={`Transmissions (${listeFiltree.length})`}
                    />
                    <TransmissionsTable
                        transmissions={listeFiltree}
                        onVoir={setSelectedTransmission}
                    />
                </>
            )}

            {/* ============================================
                MODALE DE REMISE
                ============================================ */}
            <RemiseModal
                transmission={selectedTransmission}
                onClose={() => setSelectedTransmission(null)}
            />
        </div>
    );
}

function SelectFilter({ value, onChange, options }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="px-3 py-2 border border-epo-slate-300 rounded-lg text-[13px] text-epo-slate-800 bg-white focus:outline-none focus:border-epo-green-500"
        >
            {options.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </select>
    );
}