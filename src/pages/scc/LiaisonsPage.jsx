// src/pages/scc/LiaisonsPage.jsx
import { useMemo, useState } from 'react';
import { Button, KpiCard, PageHeader, FilterBar, EmptyTable, notify } from '../../components/ui';
import AgentCarte from '../../components/scc/AgentCarte';
import TourneeModal from '../../components/scc/TourneeModal';
import { FILTRES_STATUT, FILTRES_ZONE } from '../../data/liaisonsSCC.js';
import { useScc } from '../../data/sccContext.js';
import { statsLiaisons } from '../../data/sccStats.js';

export default function LiaisonsPage() {
    const { agents, demarrerTournee, cloturerTournee, validerRemise } = useScc();
    const [filtreStatut, setFiltreStatut] = useState('');
    const [filtreZone, setFiltreZone] = useState('');
    const [recherche, setRecherche] = useState('');
    const [agentId, setAgentId] = useState(null);

    const stats = statsLiaisons(agents);
    const agentSelectionne = agents.find((a) => a.id === agentId) || null;

    const listeFiltree = useMemo(() => {
        let result = agents;
        if (filtreStatut) result = result.filter((a) => a.statut === filtreStatut);
        if (filtreZone) result = result.filter((a) => a.zone === filtreZone);
        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter((a) => a.nom.toLowerCase().includes(q) || a.matricule.toLowerCase().includes(q));
        }
        return result;
    }, [agents, filtreStatut, filtreZone, recherche]);

    const resetFiltres = () => {
        setFiltreStatut('');
        setFiltreZone('');
        setRecherche('');
    };

    const handleDemarrer = (agent) => {
        demarrerTournee(agent.id);
        notify.success(`Tournée de ${agent.nom} démarrée`, {
            items: [`${agent.remises.length} remise${agent.remises.length > 1 ? 's' : ''} prévue${agent.remises.length > 1 ? 's' : ''}`],
        });
    };

    const handleCloturer = (agent) => {
        const faites = agent.remises.filter((r) => r.statut === 'remis').length;
        const restantes = agent.remises.length - faites;
        cloturerTournee(agent.id);
        notify.success(`Tournée de ${agent.nom} clôturée`, {
            items: [
                `${faites} remise${faites > 1 ? 's' : ''} effectuée${faites > 1 ? 's' : ''}`,
                restantes ? `${restantes} courrier${restantes > 1 ? 's' : ''} non remis, à reprogrammer` : 'Toutes les remises sont faites',
            ],
        });
    };

    const handleValiderRemise = (agent, remise, data) => {
        validerRemise(agent.id, remise, data);
        notify.success(`Courrier ${remise.documentNumero} remis`, {
            items: [`Reçu par ${data.nomRecepteur} (${remise.destinataire.structure})`, 'Preuve de remise enregistrée'],
        });
    };

    return (
        <div className="w-full min-w-0">
            <PageHeader
                title="Liaisons et tournées"
                description="Suivi des agents de liaison et des remises du jour."
                actions={
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                }
            />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard label="Tournées en cours" value={stats.tourneesActives} icon="fa-route" onClick={() => setFiltreStatut('en-tournee')} />
                <KpiCard label="Agents disponibles" value={stats.disponibles} icon="fa-user-check" onClick={() => setFiltreStatut('disponible')} />
                <KpiCard label="Remises du jour" value={`${stats.remisesFaites} / ${stats.remisesTotal}`} hint="Effectuées / prévues" icon="fa-check" />
                <KpiCard label="Remises en retard" value={stats.remisesEnRetard} variant={stats.remisesEnRetard ? 'urgent' : 'default'} icon="fa-clock" />
            </div>

            <FilterBar
                search={{ value: recherche, onChange: setRecherche, placeholder: 'Rechercher un agent…' }}
                filters={[
                    { id: 'statut', label: 'Statut', value: filtreStatut, onChange: setFiltreStatut, options: FILTRES_STATUT },
                    { id: 'zone', label: 'Zone', value: filtreZone, onChange: setFiltreZone, options: FILTRES_ZONE },
                ]}
                onReset={resetFiltres}
            />

            {listeFiltree.length === 0 ? (
                <EmptyTable icon="fa-user" title="Aucun agent ne correspond" message="Modifiez la recherche ou effacez les filtres." />
            ) : (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
                    {listeFiltree.map((agent) => (
                        <AgentCarte
                            key={agent.id}
                            agent={agent}
                            onVoir={(a) => setAgentId(a.id)}
                            onDemarrer={handleDemarrer}
                            onCloturer={handleCloturer}
                        />
                    ))}
                </div>
            )}

            <TourneeModal agent={agentSelectionne} onClose={() => setAgentId(null)} onValiderRemise={handleValiderRemise} />
        </div>
    );
}
