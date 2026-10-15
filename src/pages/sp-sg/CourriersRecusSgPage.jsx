// src/pages/sp-sg/CourriersRecusSgPage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui';
import CourriersRecusSgKpi from '../../components/sp-sg/CourriersRecusSgKpi';
import CourrierRecuSgCarte from '../../components/sp-sg/CourrierRecuSgCarte';
import ReceptionModal from '../../components/sp-sg/ReceptionModal';
import {
    COURRIERS_RECUS_SPSG,
    FILTRES_ETAT,
    FILTRES_PRIORITE,
    FILTRES_AGENT,
    FILTRES_TYPE,
} from '../../data/courriersRecusSPSG.js';
import { notify } from '../../components/ui/notify.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function CourriersRecusSgPage() {
    const [filtreEtat, setFiltreEtat] = useState('');
    const [filtrePriorite, setFiltrePriorite] = useState('');
    const [filtreAgent, setFiltreAgent] = useState('');
    const [filtreType, setFiltreType] = useState('');
    const [recherche, setRecherche] = useState('');

    const [courrierAConfirmer, setCourrierAConfirmer] = useState(null);

    /* Filtrage */
    const listeFiltree = useMemo(() => {
        let result = COURRIERS_RECUS_SPSG;

        if (filtreEtat) result = result.filter((c) => c.etat === filtreEtat);
        if (filtrePriorite) result = result.filter((c) => c.priorite === filtrePriorite);
        if (filtreAgent) result = result.filter((c) => c.agentLiaison === filtreAgent);
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

        // Tri : nouveaux → en-traitement → introduits, puis urgents
        return [...result].sort((a, b) => {
            const ordreEtat = { 'nouveau': 0, 'en-traitement': 1, 'introduit': 2 };
            const oa = ordreEtat[a.etat] ?? 9;
            const ob = ordreEtat[b.etat] ?? 9;
            if (oa !== ob) return oa - ob;

            const ordrePrio = { urgent: 0, normal: 1 };
            const pa = ordrePrio[a.priorite] ?? 9;
            const pb = ordrePrio[b.priorite] ?? 9;
            if (pa !== pb) return pa - pb;

            return b.tempsAttente - a.tempsAttente;
        });
    }, [filtreEtat, filtrePriorite, filtreAgent, filtreType, recherche]);

    /* Groupement par état */
    const groupes = useMemo(() => {
        const g = { 'nouveau': [], 'en-traitement': [], 'introduit': [] };
        listeFiltree.forEach((c) => {
            g[c.etat].push(c);
        });
        return g;
    }, [listeFiltree]);

    const hasFiltreActif = filtreEtat || filtrePriorite || filtreAgent || filtreType || recherche;

    const resetFiltres = () => {
        setFiltreEtat('');
        setFiltrePriorite('');
        setFiltreAgent('');
        setFiltreType('');
        setRecherche('');
    };

    /* Actions */
    const handleConfirmer = (courrier) => setCourrierAConfirmer(courrier);
    const handleVoir = (courrier) => notify.info(`Fiche ${courrier.id}`, { message: 'La fiche détaillée sera disponible dans une prochaine version.' });
    const handleTraiter = (courrier) => notify.info(`Continuer le traitement de ${courrier.id}`, { message: 'Action disponible dans une prochaine version.' });

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-epo-slate-900">
                        Courriers reçus
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Dossiers remis par les agents de liaison du SCC- réception et vérification
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <CourriersRecusSgKpi courriers={COURRIERS_RECUS_SPSG} />

            {/* BANDEAU DÉLAI */}
            <div className="flex items-start gap-3 p-4 mb-6 border rounded-xl bg-epo-slate-50 border-epo-slate-200">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-lg bg-epo-slate-700">
                    <i className="fas fa-clock text-[15px]" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-epo-slate-800">
                        Délai de référence SCC → SP-SG : 30 minutes
                    </div>
                    <div className="text-xs text-epo-slate-600 mt-0.5">
                        Conformément au §9.1 du Manuel de procédures, le courrier doit être réceptionné et traité dans les 30 min suivant sa remise par l'agent de liaison.
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
                        placeholder="Rechercher par N°, objet, expéditeur…"
                        className="w-full pl-9 pr-3 py-2 border rounded-lg border-epo-slate-300 text-sm focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>

                <SelectFilter value={filtreEtat} onChange={setFiltreEtat} options={FILTRES_ETAT} />
                <SelectFilter value={filtrePriorite} onChange={setFiltrePriorite} options={FILTRES_PRIORITE} />
                <SelectFilter value={filtreAgent} onChange={setFiltreAgent} options={FILTRES_AGENT} />
                <SelectFilter value={filtreType} onChange={setFiltreType} options={FILTRES_TYPE} />

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

            {/* CONTENU */}
            {listeFiltree.length === 0 ? (
                <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-green-50">
                        <i className="text-2xl fas fa-check-circle text-epo-green-500" />
                    </div>
                    <div className="text-base font-semibold text-epo-slate-800 mb-1">
                        Aucun courrier trouvé
                    </div>
                    <div className="text-sm text-epo-slate-500">
                        Essayez d'élargir vos filtres.
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-7">
                    {/* Bloc Nouveaux reçus */}
                    {groupes['nouveau'].length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-inbox"
                                title="Nouveaux reçus"
                                count={groupes['nouveau'].length}
                                variant="warning"
                                subtitle="À réceptionner- décharge à confirmer"
                            />
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {groupes['nouveau'].map((c) => (
                                    <CourrierRecuSgCarte
                                        key={c.id}
                                        courrier={c}
                                        onConfirmer={handleConfirmer}
                                        onVoir={handleVoir}
                                        onTraiter={handleTraiter}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bloc En traitement */}
                    {groupes['en-traitement'].length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-spinner"
                                title="En cours de traitement"
                                count={groupes['en-traitement'].length}
                                variant="dark"
                                subtitle="Tri ou numérisation en cours"
                            />
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {groupes['en-traitement'].map((c) => (
                                    <CourrierRecuSgCarte
                                        key={c.id}
                                        courrier={c}
                                        onConfirmer={handleConfirmer}
                                        onVoir={handleVoir}
                                        onTraiter={handleTraiter}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bloc Introduits */}
                    {groupes['introduit'].length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-user-tie"
                                title="Introduits au SG"
                                count={groupes['introduit'].length}
                                variant="success"
                                subtitle="Transmis au SG pour avis et instruction"
                            />
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {groupes['introduit'].map((c) => (
                                    <CourrierRecuSgCarte
                                        key={c.id}
                                        courrier={c}
                                        onConfirmer={handleConfirmer}
                                        onVoir={handleVoir}
                                        onTraiter={handleTraiter}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* MODALE */}
            <ReceptionModal
                courrier={courrierAConfirmer}
                onClose={() => setCourrierAConfirmer(null)}
            />
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
                <i className={`fas ${icon} text-[13px] ${variant === 'dark' ? 'fa-spin' : ''}`} />
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