// src/pages/sp-dg/IntroductionPage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui';
import IntroductionKpi from '../../components/sp-dg/IntroductionKpi';
import DossierIntroduireCarte from '../../components/sp-dg/DossierIntroduireCarte';
import IntroductionModal from '../../components/sp-dg/IntroductionModal';
import {
    DOSSIERS_A_INTRODUIRE,
    FILTRES_PRIORITE,
    FILTRES_TYPE,
    FILTRES_SOURCE,
    OPTIONS_TRI,
    TYPES_DOSSIERS,
    formatHeure,
    formatDuree,
} from '../../data/introductionSPDG.js';
import { notify } from '../../components/ui/notify.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function IntroductionPage() {
    const [filtrePriorite, setFiltrePriorite] = useState('');
    const [filtreType, setFiltreType] = useState('');
    const [filtreSource, setFiltreSource] = useState('');
    const [recherche, setRecherche] = useState('');
    const [tri, setTri] = useState('urgence');
    const [vue, setVue] = useState('cartes'); // 'cartes' | 'tableau'

    const [dossierAIntroduire, setDossierAIntroduire] = useState(null);

    /* Filtrage + tri */
    const listeFiltree = useMemo(() => {
        let result = DOSSIERS_A_INTRODUIRE;

        if (filtrePriorite) result = result.filter((d) => d.priorite === filtrePriorite);
        if (filtreType) result = result.filter((d) => d.type === filtreType);
        if (filtreSource) result = result.filter((d) => d.source === filtreSource);

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
                    return b.tempsAttente - a.tempsAttente;
                case 'recent':
                    return a.tempsAttente - b.tempsAttente;
                case 'type':
                    return a.type.localeCompare(b.type);
                case 'urgence':
                default: {
                    const ordre = { urgent: 0, confidentiel: 1, normal: 2 };
                    const oa = ordre[a.priorite] ?? 9;
                    const ob = ordre[b.priorite] ?? 9;
                    if (oa !== ob) return oa - ob;
                    return b.tempsAttente - a.tempsAttente;
                }
            }
        });
    }, [filtrePriorite, filtreType, filtreSource, recherche, tri]);

    /* Groupement par priorité */
    const groupes = useMemo(() => {
        const g = { urgent: [], confidentiel: [], normal: [] };
        listeFiltree.forEach((d) => {
            g[d.priorite].push(d);
        });
        return g;
    }, [listeFiltree]);

    const hasFiltreActif = filtrePriorite || filtreType || filtreSource || recherche;

    const resetFiltres = () => {
        setFiltrePriorite('');
        setFiltreType('');
        setFiltreSource('');
        setRecherche('');
    };

    /* Actions */
    const handleIntroduire = (dossier) => setDossierAIntroduire(dossier);
    const handleVoir = (dossier) => notify.info(`Fiche ${dossier.id}`, { message: 'La fiche détaillée sera disponible dans une prochaine version.' });

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-epo-slate-900">
                        Introduction au DG
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Dossiers triés prêts à être remis physiquement au Directeur Général
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-print">
                        Liste d'introduction
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <IntroductionKpi dossiers={DOSSIERS_A_INTRODUIRE} />

            {/* BANDEAU HORAIRES DG */}
            <div className="flex items-start gap-3 p-4 mb-6 text-white border rounded-xl bg-epo-slate-800 border-epo-slate-700">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-epo-slate-700">
                    <i className="fas fa-clock text-[16px]" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">
                        Horaires de réception du DG
                    </div>
                    <div className="text-xs text-epo-slate-300 mt-0.5">
                        Bureau du DG · <strong>Matin : 9h – 12h</strong> · <strong>Après-midi : 14h – 17h</strong>
                        <br />
                        Présentez-vous au bureau du DG avec les dossiers par ordre de priorité.
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
                        className="w-full pl-9 pr-3 py-2 border rounded-lg border-epo-slate-300 text-sm focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>

                <SelectFilter value={filtrePriorite} onChange={setFiltrePriorite} options={FILTRES_PRIORITE} />
                <SelectFilter value={filtreType} onChange={setFiltreType} options={FILTRES_TYPE} />
                <SelectFilter value={filtreSource} onChange={setFiltreSource} options={FILTRES_SOURCE} />

                {hasFiltreActif && (
                    <button
                        onClick={resetFiltres}
                        className="ml-auto text-sm font-medium text-epo-slate-900 hover:underline"
                    >
                        <i className="mr-1 fas fa-times" />
                        Réinitialiser
                    </button>
                )}
            </div>

            {/* BASCULE + TRI */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="text-sm font-semibold text-epo-slate-800 flex items-center gap-2">
                    <i className="fas fa-pen text-epo-green-600" />
                    {listeFiltree.length} dossier{listeFiltree.length > 1 ? 's' : ''}
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-epo-slate-500">
                        Trier par :
                        <select
                            value={tri}
                            onChange={(e) => setTri(e.target.value)}
                            className="px-2.5 py-1.5 border rounded-lg border-epo-slate-300 text-sm text-epo-slate-700 bg-white focus:outline-none focus:border-epo-green-500"
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
                                px-3 py-1.5 rounded-md text-sm font-semibold transition inline-flex items-center gap-1.5
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
                                px-3 py-1.5 rounded-md text-sm font-semibold transition inline-flex items-center gap-1.5
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
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-green-50">
                        <i className="text-2xl fas fa-check-circle text-epo-green-500" />
                    </div>
                    <div className="text-base font-semibold text-epo-slate-800 mb-1">
                        Aucun dossier à introduire
                    </div>
                    <div className="text-sm text-epo-slate-500">
                        Tous les dossiers triés ont été introduits au DG.
                    </div>
                </div>
            ) : vue === 'cartes' ? (
                <div className="flex flex-col gap-7">
                    {/* Bloc Urgents */}
                    {groupes.urgent.length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-exclamation-circle"
                                title="Urgents"
                                count={groupes.urgent.length}
                                variant="urgent"
                                subtitle="À introduire en premier"
                            />
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {groupes.urgent.map((d) => (
                                    <DossierIntroduireCarte
                                        key={d.id}
                                        dossier={d}
                                        onIntroduire={handleIntroduire}
                                        onVoir={handleVoir}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bloc Confidentiels */}
                    {groupes.confidentiel.length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-lock"
                                title="Confidentiels"
                                count={groupes.confidentiel.length}
                                variant="dark"
                                subtitle="Discrétion absolue- remise en main propre"
                            />
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {groupes.confidentiel.map((d) => (
                                    <DossierIntroduireCarte
                                        key={d.id}
                                        dossier={d}
                                        onIntroduire={handleIntroduire}
                                        onVoir={handleVoir}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bloc Normaux */}
                    {groupes.normal.length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-inbox"
                                title="Normaux"
                                count={groupes.normal.length}
                                variant="default"
                                subtitle="Traitement standard"
                            />
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {groupes.normal.map((d) => (
                                    <DossierIntroduireCarte
                                        key={d.id}
                                        dossier={d}
                                        onIntroduire={handleIntroduire}
                                        onVoir={handleVoir}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <TableauIntroduction
                    dossiers={listeFiltree}
                    onIntroduire={handleIntroduire}
                    onVoir={handleVoir}
                />
            )}

            {/* MODALE */}
            <IntroductionModal
                dossier={dossierAIntroduire}
                onClose={() => setDossierAIntroduire(null)}
            />
        </div>
    );
}

/* ============================================================
   SOUS-COMPOSANTS
   ============================================================ */

function TableauIntroduction({ dossiers, onIntroduire, onVoir }) {

    return (
        <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-epo-slate-50">
                            {['N°', 'Type', 'Objet', 'Source', 'Priorité', 'Reçu à', 'Attente', 'Pièces', ''].map((h, i) => (
                                <th
                                    key={i}
                                    className="px-3 py-2.5 text-xs font-semibold tracking-wider text-left uppercase text-epo-slate-500 whitespace-nowrap"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dossiers.map((d) => {
                            const type = TYPES_DOSSIERS[d.type];
                            const isUrgent = d.priorite === 'urgent';
                            const isConfidentiel = d.priorite === 'confidentiel';

                            return (
                                <tr
                                    key={d.id}
                                    className="transition border-t cursor-pointer border-epo-slate-100 hover:bg-epo-slate-50"
                                    onClick={() => onVoir(d)}
                                >
                                    <td className="px-3 py-2.5">
                                        <span className="font-mono text-xs font-semibold text-epo-slate-800">
                                            {d.id}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold ${type.color}`}>
                                            <i className={`fas ${type.icon} text-[9.5px]`} />
                                            {type.label}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <div className="text-sm font-medium text-epo-slate-800 truncate max-w-[280px]">
                                            {d.objet}
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5 text-xs text-epo-slate-600">
                                        {d.source === 'scc' ? 'SCC' : 'SP-SG'}
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <span className={`
                                            inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold
                                            ${isUrgent ? 'bg-epo-slate-50 text-epo-slate-900' :
                                              isConfidentiel ? 'bg-epo-slate-800 text-white' :
                                              'bg-epo-slate-100 text-epo-slate-600'}
                                        `}>
                                            {isUrgent && <i className="fas fa-exclamation-circle text-[9px]" />}
                                            {isConfidentiel && <i className="fas fa-lock text-[9px]" />}
                                            {isUrgent ? 'Urgent' : isConfidentiel ? 'Confid.' : 'Normal'}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5 text-xs tabular-nums text-epo-slate-500">
                                        {formatHeure(d.recuAuSPDG)}
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <span className={`
                                            inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold
                                            ${d.tempsAttente >= 240 ? 'bg-epo-slate-50 text-epo-slate-900' : 'bg-epo-slate-100 text-epo-slate-600'}
                                        `}>
                                            {formatDuree(d.tempsAttente)}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5 text-xs text-center text-epo-slate-600">
                                        {d.pieces}
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onIntroduire(d);
                                            }}
                                            className="text-xs font-semibold text-epo-green-600 hover:underline whitespace-nowrap"
                                        >
                                            <i className="mr-1 fas fa-pen" />
                                            Introduire
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-sm border-t border-epo-slate-200 text-epo-slate-500">
                <span>{dossiers.length} dossier{dossiers.length > 1 ? 's' : ''}</span>
                <span className="text-epo-slate-400">
                    <i className="mr-1 fas fa-info-circle" />
                    Cliquez sur une ligne pour ouvrir le détail
                </span>
            </div>
        </div>
    );
}

function BlocHeader({ icon, title, count, variant = 'default', subtitle }) {
    const variants = {
        urgent: {
            icon: 'text-epo-slate-900',
            bg: 'bg-epo-slate-50',
            text: 'text-epo-slate-900',
            chip: 'bg-epo-slate-50 text-epo-slate-900',
        },
        dark: {
            icon: 'text-white',
            bg: 'bg-epo-slate-800',
            text: 'text-epo-slate-800',
            chip: 'bg-epo-slate-800 text-white',
        },
        default: {
            icon: 'text-epo-slate-500',
            bg: 'bg-epo-slate-100',
            text: 'text-epo-slate-700',
            chip: 'bg-epo-slate-100 text-epo-slate-700',
        },
    };

    const v = variants[variant];

    return (
        <div className="flex items-center gap-2.5 mb-3">
            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${v.bg} ${v.icon}`}>
                <i className={`fas ${icon} text-[13px]`} />
            </span>
            <div>
                <div className="flex items-center gap-2">
                    <h3 className={`text-base font-bold ${v.text}`}>
                        {title}
                    </h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${v.chip}`}>
                        {count}
                    </span>
                </div>
                {subtitle && (
                    <div className="text-xs text-epo-slate-400">
                        {subtitle}
                    </div>
                )}
            </div>
        </div>
    );
}

function SelectFilter({ value, onChange, options }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="px-3 py-2 border rounded-lg border-epo-slate-300 text-sm text-epo-slate-800 bg-white focus:outline-none focus:border-epo-green-500"
        >
            {options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
            ))}
        </select>
    );
}