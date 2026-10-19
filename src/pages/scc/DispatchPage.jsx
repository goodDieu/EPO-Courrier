// src/pages/scc/DispatchPage.jsx
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, KpiCard, PageHeader, FilterBar } from '../../components/ui';
import DispatchTable from '../../components/scc/DispatchTable';
import DispatchModal from '../../components/scc/DispatchModal';
import DispatchDetailModal from '../../components/scc/DispatchDetailModal';
import {
    FILTRES_ETAT,
    FILTRES_CLASSIFICATION,
    FILTRES_MODE,
    FILTRES_STRUCTURE,
} from '../../data/dispatchSCC.js';
import { useScc } from '../../data/sccContext.js';
import { ZONES } from '../../data/liaisonsSCC.js';
import { statsDispatch } from '../../data/sccStats.js';

export default function DispatchPage() {
    const navigate = useNavigate();
    const { dossiers, dispatcher, agents } = useScc();

    // Agents de liaison tels qu'ils sont dans les tournées du jour
    const agentsLiaison = agents.map((a) => ({
        ...a,
        zone: `${ZONES[a.zone]?.label} - ${ZONES[a.zone]?.description}`,
        disponible: a.statut !== 'indisponible',
        chargeJour: a.remises.filter((r) => r.statut !== 'remis').length,
    }));
    const [filtreEtat, setFiltreEtat] = useState('');
    const [filtreClassification, setFiltreClassification] = useState('');
    const [filtreMode, setFiltreMode] = useState('');
    const [filtreStructure, setFiltreStructure] = useState('');
    const [recherche, setRecherche] = useState('');

    const [selectedDossier, setSelectedDossier] = useState(null);
    const [dispatchDossier, setDispatchDossier] = useState(null);

    const stats = statsDispatch(dossiers);

    const listeFiltree = useMemo(() => {
        let result = dossiers;
        if (filtreEtat) result = result.filter((d) => d.etat === filtreEtat);
        if (filtreClassification) result = result.filter((d) => d.classification === filtreClassification);
        if (filtreMode) result = result.filter((d) => d.modePrevu === filtreMode);
        if (filtreStructure) result = result.filter((d) => d.structureDestinataire === filtreStructure);
        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (d) =>
                    d.id.toLowerCase().includes(q) ||
                    d.objet.toLowerCase().includes(q) ||
                    d.expediteur.toLowerCase().includes(q) ||
                    d.destinataire.personne.toLowerCase().includes(q)
            );
        }
        // Retards d'abord, puis priorité, puis temps restant
        return [...result].sort((a, b) => {
            const aLate = a.etat === 'en-retard';
            const bLate = b.etat === 'en-retard';
            if (aLate !== bLate) return aLate ? -1 : 1;
            if (a.prioriteScore !== b.prioriteScore) return b.prioriteScore - a.prioriteScore;
            return a.tempsRestantMin - b.tempsRestantMin;
        });
    }, [dossiers, filtreEtat, filtreClassification, filtreMode, filtreStructure, recherche]);

    const resetFiltres = () => {
        setFiltreEtat('');
        setFiltreClassification('');
        setFiltreMode('');
        setFiltreStructure('');
        setRecherche('');
    };

    const handleDispatcher = (dossier) => {
        setSelectedDossier(null);
        setDispatchDossier(dossier);
    };

    return (
        <div className="w-full min-w-0">
            <PageHeader
                title="À dispatcher"
                description="Courriers imputés à remettre aux structures destinataires."
                actions={
                    <>
                        <Button variant="outline" icon="fa-file-export">
                            Exporter
                        </Button>
                        <Button variant="outline" icon="fa-route" onClick={() => navigate('/scc/liaisons')}>
                            Voir les tournées
                        </Button>
                    </>
                }
            />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard label="À dispatcher" value={stats.aDispatcher} hint="En attente d'un mode de remise" icon="fa-share" onClick={() => setFiltreEtat('a-dispatcher')} />
                <KpiCard
                    label="En retard"
                    value={stats.enRetard}
                    variant={stats.enRetard ? 'urgent' : 'default'}
                    hint="Délai de remise dépassé"
                    icon="fa-clock"
                    onClick={() => setFiltreEtat('en-retard')}
                />
                <KpiCard label="En tournée" value={stats.enTournee} hint="Confiés à un agent de liaison" icon="fa-route" onClick={() => setFiltreEtat('en-tournee')} />
                <KpiCard label="Remis" value={stats.termines} hint="Remis ou déchargés" icon="fa-check" />
            </div>

            <FilterBar
                search={{ value: recherche, onChange: setRecherche, placeholder: 'Rechercher un numéro, un objet, un destinataire…' }}
                filters={[
                    { id: 'etat', label: 'État', value: filtreEtat, onChange: setFiltreEtat, options: FILTRES_ETAT },
                    { id: 'classification', label: 'Classification', value: filtreClassification, onChange: setFiltreClassification, options: FILTRES_CLASSIFICATION },
                    { id: 'mode', label: 'Mode de remise', value: filtreMode, onChange: setFiltreMode, options: FILTRES_MODE },
                    { id: 'structure', label: 'Structure', value: filtreStructure, onChange: setFiltreStructure, options: FILTRES_STRUCTURE },
                ]}
                onReset={resetFiltres}
            />

            <DispatchTable dossiers={listeFiltree} onVoir={setSelectedDossier} onDispatcher={handleDispatcher} />

            <DispatchDetailModal dossier={selectedDossier} onClose={() => setSelectedDossier(null)} onDispatcher={handleDispatcher} />

            <DispatchModal
                key={dispatchDossier?.id ?? 'aucun'}
                dossier={dispatchDossier}
                onClose={() => setDispatchDossier(null)}
                onDispatch={dispatcher}
                agents={agentsLiaison}
            />
        </div>
    );
}
