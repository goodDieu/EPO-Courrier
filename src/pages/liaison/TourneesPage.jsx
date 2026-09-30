// src/pages/liaison/TourneesPage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui';
import TourneeKpi from '../../components/liaison/TourneeKpi';
import TourneeCarte from '../../components/liaison/TourneeCarte';
import TourneeDetailModal from '../../components/liaison/TourneeDetailModal';
import {
    TOURNEES,
    FILTRES_ETAT,
    FILTRES_PERIODE,
    formatDate,
} from '../../data/tourneesLiaison.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function TourneesPage() {
    const [filtreEtat, setFiltreEtat] = useState('');
    const [filtrePeriode, setFiltrePeriode] = useState('');

    const [detailTournee, setDetailTournee] = useState(null);

    /* Filtrage + tri */
    const listeFiltree = useMemo(() => {
        let result = TOURNEES;

        if (filtreEtat) result = result.filter((t) => t.etat === filtreEtat);

        if (filtrePeriode) {
            const now = new Date();
            const diffJours = { aujourdhui: 0, semaine: 7, mois: 30 }[filtrePeriode] ?? 9999;
            result = result.filter((t) => {
                const diff = Math.abs((now - new Date(t.date)) / (1000 * 60 * 60 * 24));
                return diff <= diffJours + 1;
            });
        }

        // Tri : en-cours d'abord, puis planifiées (futur proche), puis terminées (récent)
        return [...result].sort((a, b) => {
            const ordre = { 'en-cours': 0, 'planifiee': 1, 'partielle': 2, 'terminee': 3 };
            const oa = ordre[a.etat] ?? 9;
            const ob = ordre[b.etat] ?? 9;
            if (oa !== ob) return oa - ob;
            return new Date(a.date) - new Date(b.date);
        });
    }, [filtreEtat, filtrePeriode]);

    /* Groupement par statut */
    const groupes = useMemo(() => {
        const g = { 'en-cours': [], 'planifiee': [], 'historique': [] };
        listeFiltree.forEach((t) => {
            if (t.etat === 'en-cours') g['en-cours'].push(t);
            else if (t.etat === 'planifiee') g['planifiee'].push(t);
            else g['historique'].push(t);
        });
        return g;
    }, [listeFiltree]);

    const hasFiltreActif = filtreEtat || filtrePeriode;

    const resetFiltres = () => {
        setFiltreEtat('');
        setFiltrePeriode('');
    };

    /* Actions */
    const handleVoir = (tournee) => setDetailTournee(tournee);

    const handleDemarrer = (tournee) => {
        alert(
            `Démarrage de la tournée\n\n` +
            `→ ${tournee.libelle} du ${formatDate(tournee.date)}\n` +
            `→ ${tournee.nbEtapes} remises prévues\n` +
            `→ Distance estimée : ${tournee.distanceEstimee}\n\n` +
            `La tournée passera en statut "En cours"`
        );
    };

    const handleCloturer = (tournee) => {
        const restantes = tournee.nbEtapes - tournee.nbFaites;
        alert(
            `Clôture de la tournée\n\n` +
            `→ ${tournee.nbFaites} remises effectuées sur ${tournee.nbEtapes}\n` +
            (restantes > 0
                ? `→ ${restantes} remise${restantes > 1 ? 's' : ''} non effectuée${restantes > 1 ? 's' : ''}\n→ La tournée sera marquée "Partielle"`
                : `→ Toutes les remises sont effectuées ✅`
            )
        );
        setDetailTournee(null);
    };

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-epo-slate-900">
                        Mes tournées
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Tournées en cours, planifiées et historique
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-calendar-alt">
                        Voir le planning
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <TourneeKpi tournees={TOURNEES} />

            {/* FILTRES */}
            <div className="flex flex-wrap items-center gap-3 p-4 mb-6 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                <select
                    value={filtreEtat}
                    onChange={(e) => setFiltreEtat(e.target.value)}
                    className="px-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] text-epo-slate-800 bg-white focus:outline-none focus:border-epo-green-500"
                >
                    {FILTRES_ETAT.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>

                <select
                    value={filtrePeriode}
                    onChange={(e) => setFiltrePeriode(e.target.value)}
                    className="px-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] text-epo-slate-800 bg-white focus:outline-none focus:border-epo-green-500"
                >
                    {FILTRES_PERIODE.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>

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

            {/* CONTENU */}
            {listeFiltree.length === 0 ? (
                <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-slate-100">
                        <i className="text-2xl fas fa-route text-epo-slate-400" />
                    </div>
                    <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                        Aucune tournée trouvée
                    </div>
                    <div className="text-[13px] text-epo-slate-500">
                        Essayez d'élargir vos filtres.
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-7">
                    {/* Bloc : En cours */}
                    {groupes['en-cours'].length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-spinner"
                                title="En cours"
                                count={groupes['en-cours'].length}
                                variant="dark"
                                subtitle="Tournée active en ce moment"
                            />
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                {groupes['en-cours'].map((t) => (
                                    <TourneeCarte
                                        key={t.id}
                                        tournee={t}
                                        onVoir={handleVoir}
                                        onDemarrer={handleDemarrer}
                                        onCloturer={handleCloturer}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bloc : Planifiées */}
                    {groupes['planifiee'].length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-calendar-alt"
                                title="Planifiées"
                                count={groupes['planifiee'].length}
                                variant="default"
                                subtitle="Tournées à venir"
                            />
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                {groupes['planifiee'].map((t) => (
                                    <TourneeCarte
                                        key={t.id}
                                        tournee={t}
                                        onVoir={handleVoir}
                                        onDemarrer={handleDemarrer}
                                        onCloturer={handleCloturer}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bloc : Historique */}
                    {groupes['historique'].length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-history"
                                title="Historique"
                                count={groupes['historique'].length}
                                variant="default"
                                subtitle="Tournées terminées"
                            />
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                {groupes['historique'].map((t) => (
                                    <TourneeCarte
                                        key={t.id}
                                        tournee={t}
                                        onVoir={handleVoir}
                                        onDemarrer={handleDemarrer}
                                        onCloturer={handleCloturer}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* MODALE DE DÉTAIL */}
            <TourneeDetailModal
                tournee={detailTournee}
                onClose={() => setDetailTournee(null)}
                onCloturer={handleCloturer}
            />
        </div>
    );
}

/* ============================================================
   SOUS-COMPOSANT
   ============================================================ */

function BlocHeader({ icon, title, count, variant = 'default', subtitle }) {
    const variants = {
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