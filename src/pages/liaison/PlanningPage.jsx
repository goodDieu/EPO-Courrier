// src/pages/liaison/PlanningPage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui';
import PlanningKpi from '../../components/liaison/PlanningKpi';
import PlanningCalendrier from '../../components/liaison/PlanningCalendrier';
import PlanningDetailJour from '../../components/liaison/PlanningDetailJour';
import {
    buildTournees,
    toKey,
} from '../../data/planningLiaison.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function PlanningPage() {
    const tournees = useMemo(() => buildTournees(), []);

    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    const [vue, setVue] = useState('mois'); // 'mois' | 'semaine'
    const [selectedJour, setSelectedJour] = useState(toKey(today));

    /* Tournées du jour sélectionné */
    const tourneesJour = useMemo(() => {
        if (!selectedJour) return [];
        return tournees.filter((t) => t.date === selectedJour);
    }, [tournees, selectedJour]);

    /* Handler sélection */
    const handleSelectJour = (key) => {
        setSelectedJour((prev) => (prev === key ? null : key));
    };

    /* Handler voir tournée */
    const handleVoir = (tournee) => {
        alert(
            `Détail de la tournée\n\n` +
            `→ ${tournee.libelle}\n` +
            `→ ${tournee.id}\n` +
            `→ ${tournee.nbFaites}/${tournee.nbEtapes} remises effectuées\n\n` +
            `Ouvrez la page Tournées pour voir le détail complet.`
        );
    };

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-epo-slate-900">
                        Mon planning
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Vue d'ensemble de vos tournées - anticipez votre charge
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <PlanningKpi tournees={tournees} />

            {/* LAYOUT : Calendrier + Détail */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Calendrier (2/3) */}
                <div className="lg:col-span-2">
                    <PlanningCalendrier
                        tournees={tournees}
                        vue={vue}
                        selectedJour={selectedJour}
                        onSelectJour={handleSelectJour}
                        onChangeVue={setVue}
                    />
                </div>

                {/* Détail du jour (1/3) */}
                <div className="lg:col-span-1">
                    <PlanningDetailJour
                        date={selectedJour}
                        tournees={tourneesJour}
                        onVoir={handleVoir}
                    />
                </div>
            </div>
        </div>
    );
}