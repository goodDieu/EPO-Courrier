// src/pages/sp-sg/InstructionsPage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui';
import InstructionsKpi from '../../components/sp-sg/InstructionsKpi';
import InstructionCarte from '../../components/sp-sg/InstructionCarte';
import {
    INSTRUCTIONS_DU_SG,
    TYPES_INSTRUCTIONS,
    FILTRES_TYPE,
    FILTRES_STATUT,
    FILTRES_PRIORITE,
    OPTIONS_TRI,
} from '../../data/instructionsSPSG.js';
import { notify } from '../../components/ui/notify.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function InstructionsPage() {
    const [filtreType, setFiltreType] = useState('');
    const [filtreStatut, setFiltreStatut] = useState('');
    const [filtrePriorite, setFiltrePriorite] = useState('');
    const [recherche, setRecherche] = useState('');
    const [tri, setTri] = useState('recent');

    /* Filtrage + tri */
    const listeFiltree = useMemo(() => {
        let result = INSTRUCTIONS_DU_SG;

        if (filtreType) result = result.filter((i) => i.type === filtreType);
        if (filtreStatut) result = result.filter((i) => i.statut === filtreStatut);
        if (filtrePriorite) result = result.filter((i) => i.prioriteInterne === filtrePriorite);

        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (i) =>
                    i.id.toLowerCase().includes(q) ||
                    i.dossierId.toLowerCase().includes(q) ||
                    i.dossierObjet.toLowerCase().includes(q) ||
                    i.contenu.toLowerCase().includes(q)
            );
        }

        return [...result].sort((a, b) => {
            switch (tri) {
                case 'ancien':
                    return new Date(a.dateEmission) - new Date(b.dateEmission);
                case 'priorite': {
                    const ordre = { urgente: 0, normale: 1 };
                    return (ordre[a.prioriteInterne] ?? 9) - (ordre[b.prioriteInterne] ?? 9);
                }
                case 'statut': {
                    const ordre = { 'a-traiter': 0, 'en-cours': 1, 'traite': 2 };
                    return (ordre[a.statut] ?? 9) - (ordre[b.statut] ?? 9);
                }
                case 'recent':
                default:
                    return new Date(b.dateEmission) - new Date(a.dateEmission);
            }
        });
    }, [filtreType, filtreStatut, filtrePriorite, recherche, tri]);

    /* Groupement par statut */
    const groupes = useMemo(() => {
        const g = { 'a-traiter': [], 'en-cours': [], 'traite': [] };
        listeFiltree.forEach((i) => {
            g[i.statut].push(i);
        });
        return g;
    }, [listeFiltree]);

    const hasFiltreActif = filtreType || filtreStatut || filtrePriorite || recherche;

    const resetFiltres = () => {
        setFiltreType('');
        setFiltreStatut('');
        setFiltrePriorite('');
        setRecherche('');
    };

    /* Actions */
    const handleTraiter = (instruction) => {
        notify.fromText(
            `✅ Instruction marquée comme traitée\n\n` +
            `→ Instruction : ${instruction.id}\n` +
            `→ Dossier : ${instruction.dossierId}\n` +
            `→ Type : ${TYPES_INSTRUCTIONS[instruction.type].label}\n\n` +
            `Une entrée sera ajoutée à la timeline du dossier`
        );
    };

    const handleVoir = (instruction) => {
        notify.fromText(`Détail de l'instruction ${instruction.id}\n\nDossier lié : ${instruction.dossierId}`);
    };

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-epo-slate-900">
                        Instructions du SG
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Avis, instructions, imputations et renvois émis par le Secrétaire Général
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <InstructionsKpi instructions={INSTRUCTIONS_DU_SG} />

            {/* BANDEAU WORKFLOW */}
            <div className="flex items-start gap-3 p-4 mb-6 border rounded-xl bg-epo-slate-50 border-epo-slate-200">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-lg bg-epo-slate-700">
                    <i className="fas fa-comment-dots text-[15px]" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-epo-slate-800">
                        5 types d'instructions (§9.1 étape 4 et 8)
                    </div>
                    <div className="text-xs text-epo-slate-600 mt-1 flex flex-wrap items-center gap-2">
                        {Object.values(TYPES_INSTRUCTIONS).map((t) => (
                            <span key={t.key} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${t.chip}`}>
                                <i className={`fas ${t.icon} text-[9px]`} />
                                {t.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* FILTRES */}
            <div className="flex flex-wrap items-center gap-3 p-4 mb-6 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                <div className="relative flex-1 min-w-[200px]">
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-epo-slate-400 text-[12px]" />
                    <input
                        type="text"
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                        placeholder="Rechercher par instruction, dossier, contenu…"
                        className="w-full pl-9 pr-3 py-2 border rounded-lg border-epo-slate-300 text-sm focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>

                <SelectFilter value={filtreType} onChange={setFiltreType} options={FILTRES_TYPE} />
                <SelectFilter value={filtreStatut} onChange={setFiltreStatut} options={FILTRES_STATUT} />
                <SelectFilter value={filtrePriorite} onChange={setFiltrePriorite} options={FILTRES_PRIORITE} />

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

            {/* TRI */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="text-sm font-semibold text-epo-slate-800 flex items-center gap-2">
                    <i className="fas fa-comment-dots text-epo-green-600" />
                    {listeFiltree.length} instruction{listeFiltree.length > 1 ? 's' : ''}
                </div>

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
            </div>

            {/* CONTENU */}
            {listeFiltree.length === 0 ? (
                <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-green-50">
                        <i className="text-2xl fas fa-check-circle text-epo-green-500" />
                    </div>
                    <div className="text-base font-semibold text-epo-slate-800 mb-1">
                        Aucune instruction trouvée
                    </div>
                    <div className="text-sm text-epo-slate-500">
                        Essayez d'élargir vos filtres.
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-7">
                    {/* Bloc À traiter */}
                    {groupes['a-traiter'].length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-clock"
                                title="À traiter"
                                count={groupes['a-traiter'].length}
                                variant="urgent"
                                subtitle="Instructions du SG en attente d'exécution"
                            />
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {groupes['a-traiter'].map((i) => (
                                    <InstructionCarte
                                        key={i.id}
                                        instruction={i}
                                        onTraiter={handleTraiter}
                                        onVoir={handleVoir}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bloc En cours */}
                    {groupes['en-cours'].length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-spinner"
                                title="En cours d'exécution"
                                count={groupes['en-cours'].length}
                                variant="warning"
                                subtitle="Instructions en cours de traitement"
                            />
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {groupes['en-cours'].map((i) => (
                                    <InstructionCarte
                                        key={i.id}
                                        instruction={i}
                                        onTraiter={handleTraiter}
                                        onVoir={handleVoir}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bloc Traitées */}
                    {groupes['traite'].length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-check-circle"
                                title="Traitées"
                                count={groupes['traite'].length}
                                variant="success"
                                subtitle="Historique des instructions exécutées"
                            />
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {groupes['traite'].map((i) => (
                                    <InstructionCarte
                                        key={i.id}
                                        instruction={i}
                                        onTraiter={handleTraiter}
                                        onVoir={handleVoir}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ============================================================
   SOUS-COMPOSANTS
   ============================================================ */

function BlocHeader({ icon, title, count, variant = 'default', subtitle }) {
    const variants = {
        urgent: {
            icon: 'text-epo-slate-900',
            bg: 'bg-epo-slate-50',
            text: 'text-epo-slate-900',
            chip: 'bg-epo-slate-50 text-epo-slate-900',
        },
        warning: {
            icon: 'text-epo-yellow-600',
            bg: 'bg-epo-yellow-50',
            text: 'text-epo-yellow-700',
            chip: 'bg-epo-yellow-100 text-epo-yellow-800',
        },
        success: {
            icon: 'text-epo-green-600',
            bg: 'bg-epo-green-50',
            text: 'text-epo-green-700',
            chip: 'bg-epo-green-100 text-epo-green-800',
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
                <i className={`fas ${icon} text-[13px] ${variant === 'warning' ? 'fa-spin' : ''}`} />
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