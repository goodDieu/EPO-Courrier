// src/pages/sp-sg/IntroductionSgPage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui';
import IntroductionSgKpi from '../../components/sp-sg/IntroductionSgKpi';
import DossierIntroduireSgCarte from '../../components/sp-sg/DossierIntroduireSgCarte';
import IntroductionSgModal from '../../components/sp-sg/IntroductionSgModal';
import {
    DOSSIERS_A_INTRODUIRE_SG,
    CLASSIFICATION_EISENHOWER,
    TYPES_DOSSIERS,
    FILTRES_PRIORITE,
    FILTRES_CLASSIFICATION,
    FILTRES_TYPE,
    OPTIONS_TRI,
    formatHeure,
    formatDuree,
} from '../../data/introductionSPSG.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function IntroductionSgPage() {
    const [filtrePriorite, setFiltrePriorite] = useState('');
    const [filtreClassification, setFiltreClassification] = useState('');
    const [filtreType, setFiltreType] = useState('');
    const [recherche, setRecherche] = useState('');
    const [tri, setTri] = useState('classification');
    const [vue, setVue] = useState('cartes');

    const [dossierAIntroduire, setDossierAIntroduire] = useState(null);

    /* Filtrage + tri */
    const listeFiltree = useMemo(() => {
        let result = DOSSIERS_A_INTRODUIRE_SG;

        if (filtrePriorite) result = result.filter((d) => d.priorite === filtrePriorite);
        if (filtreClassification) result = result.filter((d) => d.classification === filtreClassification);
        if (filtreType) result = result.filter((d) => d.type === filtreType);

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
                case 'classification':
                default: {
                    const ordreA = CLASSIFICATION_EISENHOWER[a.classification]?.ordre ?? 9;
                    const ordreB = CLASSIFICATION_EISENHOWER[b.classification]?.ordre ?? 9;
                    if (ordreA !== ordreB) return ordreA - ordreB;
                    return b.tempsAttente - a.tempsAttente;
                }
            }
        });
    }, [filtrePriorite, filtreClassification, filtreType, recherche, tri]);

    /* Groupement par classification */
    const groupes = useMemo(() => {
        const g = {};
        listeFiltree.forEach((d) => {
            if (!g[d.classification]) g[d.classification] = [];
            g[d.classification].push(d);
        });
        return g;
    }, [listeFiltree]);

    const hasFiltreActif = filtrePriorite || filtreClassification || filtreType || recherche;

    const resetFiltres = () => {
        setFiltrePriorite('');
        setFiltreClassification('');
        setFiltreType('');
        setRecherche('');
    };

    const handleIntroduire = (dossier) => setDossierAIntroduire(dossier);
    const handleVoir = (dossier) => alert(`Détail de ${dossier.id}`);

    /* Ordre d'affichage des groupes */
    const ordreGroupes = [
        'important-urgent',
        'important-non-urgent',
        'non-important-urgent',
        'non-important-non-urgent',
    ];

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-epo-slate-900">
                        Introduction au SG
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Dossiers triés prêts à être remis au Secrétaire Général pour avis et instruction
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-print">
                        Liste d'introduction
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <IntroductionSgKpi dossiers={DOSSIERS_A_INTRODUIRE_SG} />

            {/* BANDEAU WORKFLOW */}
            <div className="flex items-start gap-3 p-4 mb-6 text-white border rounded-xl bg-epo-slate-800 border-epo-slate-700">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-epo-slate-700">
                    <i className="fas fa-clock text-[16px]" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-semibold">
                        Délai de référence SP-SG → SG : 60 minutes
                    </div>
                    <div className="text-[12px] text-epo-slate-300 mt-0.5">
                        Bureau du SG · Bâtiment A · Aile Est · Bureau 302 · Présentez-vous avec les dossiers par ordre de classification Eisenhower.
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
                        className="w-full pl-9 pr-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>

                <SelectFilter value={filtrePriorite} onChange={setFiltrePriorite} options={FILTRES_PRIORITE} />
                <SelectFilter value={filtreClassification} onChange={setFiltreClassification} options={FILTRES_CLASSIFICATION} />
                <SelectFilter value={filtreType} onChange={setFiltreType} options={FILTRES_TYPE} />

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
                    <i className="fas fa-user-tie text-epo-green-600" />
                    {listeFiltree.length} dossier{listeFiltree.length > 1 ? 's' : ''}
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
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-green-50">
                        <i className="text-2xl fas fa-check-circle text-epo-green-500" />
                    </div>
                    <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                        Aucun dossier à introduire
                    </div>
                    <div className="text-[13px] text-epo-slate-500">
                        Tous les dossiers triés ont été introduits au SG. 🎉
                    </div>
                </div>
            ) : vue === 'cartes' ? (
                <div className="flex flex-col gap-7">
                    {ordreGroupes.map((key) => {
                        const docs = groupes[key];
                        if (!docs || docs.length === 0) return null;
                        const classification = CLASSIFICATION_EISENHOWER[key];

                        return (
                            <div key={key}>
                                <BlocHeader
                                    icon={
                                        key === 'important-urgent' ? 'fa-exclamation-circle'
                                        : key === 'important-non-urgent' ? 'fa-star'
                                        : key === 'non-important-urgent' ? 'fa-hourglass-half'
                                        : 'fa-inbox'
                                    }
                                    title={classification.label}
                                    count={docs.length}
                                    variant={
                                        key === 'important-urgent' ? 'urgent'
                                        : key === 'important-non-urgent' ? 'warning'
                                        : 'default'
                                    }
                                    subtitle={
                                        key === 'important-urgent' ? 'À traiter en priorité absolue'
                                        : key === 'important-non-urgent' ? 'À planifier'
                                        : key === 'non-important-urgent' ? 'À déléguer si possible'
                                        : 'Traitement standard'
                                    }
                                />
                                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                    {docs.map((d) => (
                                        <DossierIntroduireSgCarte
                                            key={d.id}
                                            dossier={d}
                                            onIntroduire={handleIntroduire}
                                            onVoir={handleVoir}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <TableauIntroduction
                    dossiers={listeFiltree}
                    onIntroduire={handleIntroduire}
                    onVoir={handleVoir}
                />
            )}

            {/* MODALE */}
            <IntroductionSgModal
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
                            {['N°', 'Type', 'Objet', 'Expéditeur', 'Classification', 'Reçu à', 'Attente', ''].map((h, i) => (
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
                        {dossiers.map((d) => {
                            const type = TYPES_DOSSIERS[d.type];
                            const classification = CLASSIFICATION_EISENHOWER[d.classification];
                            const isLate = d.tempsAttente > 60;

                            return (
                                <tr
                                    key={d.id}
                                    className="transition border-t cursor-pointer border-epo-slate-100 hover:bg-epo-slate-50"
                                    onClick={() => onVoir(d)}
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
                                        <div className="text-[12.5px] font-medium text-epo-slate-800 truncate max-w-[280px]">
                                            {d.objet}
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5 text-[12px] text-epo-slate-600 max-w-[180px] truncate">
                                        {d.expediteurNom}
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${classification.chip}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${classification.dot}`} />
                                            {classification.shortLabel}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5 text-[11.5px] tabular-nums text-epo-slate-500 whitespace-nowrap">
                                        {formatHeure(d.recuAuSPSG)}
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <span className={`
                                            inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold
                                            ${isLate ? 'bg-epo-red-50 text-epo-red-700' : 'bg-epo-slate-100 text-epo-slate-600'}
                                        `}>
                                            {formatDuree(d.tempsAttente)}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onIntroduire(d);
                                            }}
                                            className="text-[12px] font-semibold text-epo-green-600 hover:underline whitespace-nowrap"
                                        >
                                            <i className="mr-1 fas fa-user-tie" />
                                            Introduire
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-[12.5px] border-t border-epo-slate-200 text-epo-slate-500">
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
            icon: 'text-epo-red-600',
            bg: 'bg-epo-red-50',
            text: 'text-epo-red-700',
            chip: 'bg-epo-red-100 text-epo-red-800',
        },
        warning: {
            icon: 'text-epo-yellow-600',
            bg: 'bg-epo-yellow-50',
            text: 'text-epo-yellow-700',
            chip: 'bg-epo-yellow-100 text-epo-yellow-800',
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
                    <h3 className={`text-[15px] font-bold ${v.text}`}>
                        {title}
                    </h3>
                    <span className={`text-[11.5px] font-semibold px-2 py-0.5 rounded-full ${v.chip}`}>
                        {count}
                    </span>
                </div>
                {subtitle && (
                    <div className="text-[11.5px] text-epo-slate-400">
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
            className="px-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] text-epo-slate-800 bg-white focus:outline-none focus:border-epo-green-500"
        >
            {options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
            ))}
        </select>
    );
}