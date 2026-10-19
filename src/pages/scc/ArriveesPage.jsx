// src/pages/scc/ArriveesPage.jsx
import { useMemo, useState } from 'react';
import { Button, KpiCard, PageHeader, FilterBar, notify } from '../../components/ui';
import ArriveesTable from '../../components/scc/ArriveesTable';
import ArriveeFormModal from '../../components/scc/ArriveeFormModal';
import ArriveeDetailModal from '../../components/scc/ArriveeDetailModal';
import ArriveeEditModal from '../../components/scc/ArriveeEditModal';
import {
    FILTRES_CLASSIFICATION,
    FILTRES_ETAT,
    FILTRES_NATURE,
    FILTRES_PERIODE,
} from '../../data/arriveesSCC.js';
import { daysSince, isSameDay } from '../../data/demoClock.js';
import { useScc } from '../../data/sccContext.js';
import { statsArrivees } from '../../data/sccStats.js';

const PERIODES = { '7j': 7, '30j': 30, annee: 365 };

function dansPeriode(iso, periode) {
    if (periode === 'aujourdhui') return isSameDay(iso);
    return daysSince(iso) < (PERIODES[periode] ?? 9999);
}

export default function ArriveesPage() {
    const { arrivees, ajouterArrivee, transmettreArrivee, modifierArrivee, prochainNumeroArrivee } = useScc();
    const [filtreClassification, setFiltreClassification] = useState('');
    const [filtreEtat, setFiltreEtat] = useState('');
    const [filtreNature, setFiltreNature] = useState('');
    const [filtrePeriode, setFiltrePeriode] = useState('');
    const [recherche, setRecherche] = useState('');

    const [modalFormOpen, setModalFormOpen] = useState(false);
    const [selectedArrivee, setSelectedArrivee] = useState(null);
    const [editArrivee, setEditArrivee] = useState(null);

    const stats = statsArrivees(arrivees);


    const listeFiltree = useMemo(() => {
        let result = arrivees;
        if (filtreClassification) result = result.filter((a) => a.classification === filtreClassification);
        if (filtreEtat) result = result.filter((a) => a.etat === filtreEtat);
        if (filtreNature) result = result.filter((a) => a.nature === filtreNature);
        if (filtrePeriode) result = result.filter((a) => dansPeriode(a.dateReception, filtrePeriode));
        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (a) => a.id.toLowerCase().includes(q) || a.objet.toLowerCase().includes(q) || a.expediteur.toLowerCase().includes(q)
            );
        }
        return [...result].sort((a, b) => new Date(b.dateReception) - new Date(a.dateReception));
    }, [arrivees, filtreClassification, filtreEtat, filtreNature, filtrePeriode, recherche]);

    const resetFiltres = () => {
        setFiltreClassification('');
        setFiltreEtat('');
        setFiltreNature('');
        setFiltrePeriode('');
        setRecherche('');
    };

    const handleTransmettre = (arrivee) => {
        transmettreArrivee(arrivee.id);
        setSelectedArrivee(null);
        notify.success(`Courrier ${arrivee.id} transmis au SP-SG`, {
            items: ["Fiche d'accompagnement prête à imprimer", 'Le secrétariat du SG est prévenu', 'Délai de remise : 30 minutes'],
        });
    };

    const handleModifier = (arrivee) => {
        setSelectedArrivee(null);
        setEditArrivee(arrivee);
    };

    return (
        <div className="w-full min-w-0">
            <PageHeader
                title="Registre des arrivées"
                description="Enregistrement, numérotation et transmission des courriers reçus."
                actions={
                    <>
                        <Button variant="outline" icon="fa-file-export">
                            Exporter
                        </Button>
                        <Button icon="fa-plus" onClick={() => setModalFormOpen(true)}>
                            Enregistrer un courrier
                        </Button>
                    </>
                }
            />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard
                    label="À transmettre au SP-SG"
                    value={stats.aTransmettre}
                    hint={stats.aTransmettreUrgents ? `dont ${stats.aTransmettreUrgents} urgent${stats.aTransmettreUrgents > 1 ? 's' : ''}` : 'Aucun urgent'}
                    icon="fa-paper-plane"
                    onClick={() => setFiltreEtat('enregistre')}
                />
                <KpiCard
                    label="En retard"
                    value={stats.enRetard}
                    variant={stats.enRetard ? 'urgent' : 'default'}
                    hint="Délai de traitement dépassé"
                    icon="fa-clock"
                />
                <KpiCard label="Reçus aujourd'hui" value={stats.recusAujourdhui} icon="fa-inbox" onClick={() => setFiltrePeriode('aujourdhui')} />
                <KpiCard
                    label="Confidentiels en cours"
                    value={stats.confidentiels}
                    icon="fa-lock"
                    onClick={() => setFiltreClassification('confidentiel')}
                />
            </div>

            <FilterBar
                search={{ value: recherche, onChange: setRecherche, placeholder: 'Rechercher un numéro, un objet, un expéditeur…' }}
                filters={[
                    { id: 'etat', label: 'État', value: filtreEtat, onChange: setFiltreEtat, options: FILTRES_ETAT },
                    { id: 'classification', label: 'Classification', value: filtreClassification, onChange: setFiltreClassification, options: FILTRES_CLASSIFICATION },
                    { id: 'nature', label: 'Nature', value: filtreNature, onChange: setFiltreNature, options: FILTRES_NATURE },
                    { id: 'periode', label: 'Période', value: filtrePeriode, onChange: setFiltrePeriode, options: FILTRES_PERIODE },
                ]}
                onReset={resetFiltres}
            />

            <ArriveesTable arrivees={listeFiltree} onVoir={setSelectedArrivee} onTransmettre={handleTransmettre} />

            <ArriveeFormModal
                open={modalFormOpen}
                onClose={() => setModalFormOpen(false)}
                onEnregistre={ajouterArrivee}
                prochainNumero={prochainNumeroArrivee}
            />

            <ArriveeDetailModal
                arrivee={selectedArrivee}
                onClose={() => setSelectedArrivee(null)}
                onTransmettre={handleTransmettre}
                onModifier={handleModifier}
                canTransmettre={selectedArrivee?.etat === 'enregistre'}
            />

            <ArriveeEditModal key={editArrivee?.id ?? 'aucun'} arrivee={editArrivee} onClose={() => setEditArrivee(null)} onSave={modifierArrivee} />
        </div>
    );
}
