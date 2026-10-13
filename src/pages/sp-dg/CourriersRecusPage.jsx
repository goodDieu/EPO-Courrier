// src/pages/sp-dg/CourriersRecusPage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui';
import CourriersRecusKpi from '../../components/sp-dg/CourriersRecusKpi';
import CourrierRecuCarte from '../../components/sp-dg/CourrierRecuCarte';
import {
    COURRIERS_RECUS,
    FILTRES_ETAT,
    FILTRES_PRIORITE,
    FILTRES_SOURCE,
    FILTRES_TYPE,
    ETATS_COURRIER,
} from '../../data/courriersRecusSPDG.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function CourriersRecusPage() {
    const [filtreEtat, setFiltreEtat] = useState('');
    const [filtrePriorite, setFiltrePriorite] = useState('');
    const [filtreSource, setFiltreSource] = useState('');
    const [filtreType, setFiltreType] = useState('');
    const [recherche, setRecherche] = useState('');

    /* Filtrage */
    const listeFiltree = useMemo(() => {
        let result = COURRIERS_RECUS;

        if (filtreEtat) result = result.filter((c) => c.etat === filtreEtat);
        if (filtrePriorite) result = result.filter((c) => c.priorite === filtrePriorite);
        if (filtreSource) result = result.filter((c) => c.source === filtreSource);
        if (filtreType) result = result.filter((c) => c.type === filtreType);

        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (c) =>
                    c.id.toLowerCase().includes(q) ||
                    c.objet.toLowerCase().includes(q) ||
                    c.expediteurNom.toLowerCase().includes(q)
            );
        }

        // Tri : à trier → prêts → introduits, puis par urgence
        return [...result].sort((a, b) => {
            const ordreEtat = { 'a-trier': 0, 'pret-introduire': 1, 'introduit': 2 };
            const oa = ordreEtat[a.etat] ?? 9;
            const ob = ordreEtat[b.etat] ?? 9;
            if (oa !== ob) return oa - ob;

            const ordrePrio = { urgent: 0, confidentiel: 1, normal: 2 };
            const pa = ordrePrio[a.priorite] ?? 9;
            const pb = ordrePrio[b.priorite] ?? 9;
            if (pa !== pb) return pa - pb;

            return b.tempsAttente - a.tempsAttente;
        });
    }, [filtreEtat, filtrePriorite, filtreSource, filtreType, recherche]);

    /* Groupement par état */
    const groupes = useMemo(() => {
        const g = { 'a-trier': [], 'pret-introduire': [], 'introduit': [] };
        listeFiltree.forEach((c) => {
            g[c.etat].push(c);
        });
        return g;
    }, [listeFiltree]);

    const hasFiltreActif = filtreEtat || filtrePriorite || filtreSource || filtreType || recherche;

    const resetFiltres = () => {
        setFiltreEtat('');
        setFiltrePriorite('');
        setFiltreSource('');
        setFiltreType('');
        setRecherche('');
    };

    /* Actions */
    const handleVoir = (courrier) => alert(`Détail de ${courrier.id}`);
    const handleIntroduire = (courrier) => alert(`Introduction au DG de ${courrier.id}`);
    const handleNumeroter = (courrier) => alert(`Attribution d'un numéro confidentiel à ${courrier.id} (RG-35)`);

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-epo-slate-900">
                        Courriers reçus
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Dossiers transmis par le SCC et le SP-SG- tri et préparation à l'introduction
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <CourriersRecusKpi courriers={COURRIERS_RECUS} />

            {/* FILTRES */}
            <div className="flex flex-wrap items-center gap-3 p-4 mb-6 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
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

                <SelectFilter value={filtreEtat} onChange={setFiltreEtat} options={FILTRES_ETAT} />
                <SelectFilter value={filtrePriorite} onChange={setFiltrePriorite} options={FILTRES_PRIORITE} />
                <SelectFilter value={filtreSource} onChange={setFiltreSource} options={FILTRES_SOURCE} />
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

            {/* CONTENU */}
            {listeFiltree.length === 0 ? (
                <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-green-50">
                        <i className="text-2xl fas fa-check-circle text-epo-green-500" />
                    </div>
                    <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                        Aucun courrier trouvé
                    </div>
                    <div className="text-[13px] text-epo-slate-500">
                        Essayez d'élargir vos filtres.
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-7">
                    {/* Bloc À trier */}
                    {groupes['a-trier'].length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-th"
                                title="À trier"
                                count={groupes['a-trier'].length}
                                variant="warning"
                                subtitle="Fraîchement reçus- à classer selon importance/urgence"
                            />
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {groupes['a-trier'].map((c) => (
                                    <CourrierRecuCarte
                                        key={c.id}
                                        courrier={c}
                                        onVoir={handleVoir}
                                        onIntroduire={handleIntroduire}
                                        onNumeroter={handleNumeroter}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bloc Prêts à introduire */}
                    {groupes['pret-introduire'].length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-check-circle"
                                title="Prêts à introduire"
                                count={groupes['pret-introduire'].length}
                                variant="success"
                                subtitle="Triés- en attente de présentation au DG"
                            />
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {groupes['pret-introduire'].map((c) => (
                                    <CourrierRecuCarte
                                        key={c.id}
                                        courrier={c}
                                        onVoir={handleVoir}
                                        onIntroduire={handleIntroduire}
                                        onNumeroter={handleNumeroter}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bloc Introduits */}
                    {groupes['introduit'].length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-pen"
                                title="Introduits au DG"
                                count={groupes['introduit'].length}
                                variant="default"
                                subtitle="En cours d'examen par le DG"
                            />
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {groupes['introduit'].map((c) => (
                                    <CourrierRecuCarte
                                        key={c.id}
                                        courrier={c}
                                        onVoir={handleVoir}
                                        onIntroduire={handleIntroduire}
                                        onNumeroter={handleNumeroter}
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