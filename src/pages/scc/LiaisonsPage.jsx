// src/pages/scc/LiaisonsPage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui';
import LiaisonsKpi from '../../components/scc/LiaisonsKpi';
import AgentCarte from '../../components/scc/AgentCarte';
import TourneeModal from '../../components/scc/TourneeModal';
import {
    AGENTS_LIAISON,
    FILTRES_STATUT,
    FILTRES_ZONE,
} from '../../data/liaisonsSCC.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function LiaisonsPage() {
    const [filtreStatut, setFiltreStatut] = useState('');
    const [filtreZone, setFiltreZone] = useState('');
    const [recherche, setRecherche] = useState('');

    const [agentSelectionne, setAgentSelectionne] = useState(null);

    const listeFiltree = useMemo(() => {
        let result = AGENTS_LIAISON;

        if (filtreStatut) result = result.filter((a) => a.statut === filtreStatut);
        if (filtreZone) result = result.filter((a) => a.zone === filtreZone);

        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (a) =>
                    a.nom.toLowerCase().includes(q) ||
                    a.matricule.toLowerCase().includes(q)
            );
        }

        return result;
    }, [filtreStatut, filtreZone, recherche]);

    const hasFiltreActif = filtreStatut || filtreZone || recherche;

    const resetFiltres = () => {
        setFiltreStatut('');
        setFiltreZone('');
        setRecherche('');
    };

    /* Actions */
    const handleVoir = (agent) => setAgentSelectionne(agent);

    const handleDemarrer = (agent) => {
        alert(
            `Démarrage de la tournée pour ${agent.nom}\n\n` +
            `→ L'agent passera au statut "En tournée"\n` +
            `→ Les remises du jour seront déverrouillées\n` +
            `→ L'heure de départ sera enregistrée`
        );
    };

    const handleCloturer = (agent) => {
        const faites = agent.remises.filter((r) => r.statut === 'remis').length;
        const total = agent.remises.length;
        alert(
            `Clôture de la tournée pour ${agent.nom}\n\n` +
            `→ ${faites} remises effectuées sur ${total}\n` +
            `→ ${total - faites} remise${total - faites > 1 ? 's' : ''} non effectuée${total - faites > 1 ? 's' : ''}\n` +
            `→ Bilan enregistré dans l'historique`
        );
    };

    const handleValiderRemise = (agent, remise, data) => {
        alert(
            `Remise validée\n\n` +
            `→ ${remise.destinataire.structure} - ${remise.documentNumero}\n` +
            `→ Récepteur : ${data.nomRecepteur}\n` +
            `→ Preuve : ${data.typePreuve}\n\n` +
            `La remise passera au statut "Remis"`
        );
    };

    return (
        <div className="w-full min-w-0">
            {/* ============================================
                EN-TÊTE
                ============================================ */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Liaisons & tournées
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Suivi des tournées des agents de liaison et validation des remises
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                    <Button variant="outline" icon="fa-calendar-alt">
                        Planning hebdo
                    </Button>
                </div>
            </div>

            {/* ============================================
                KPI
                ============================================ */}
            <LiaisonsKpi agents={AGENTS_LIAISON} />

            {/* ============================================
                FILTRES
                ============================================ */}
            <div className="flex flex-wrap items-center gap-3 p-4 mb-4 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                <div className="relative flex-1 min-w-[200px]">
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-epo-slate-400 text-[12px]" />
                    <input
                        type="text"
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                        placeholder="Rechercher un agent…"
                        className="w-full pl-9 pr-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>

                <SelectFilter value={filtreStatut} onChange={setFiltreStatut} options={FILTRES_STATUT} />
                <SelectFilter value={filtreZone} onChange={setFiltreZone} options={FILTRES_ZONE} />

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

            {/* ============================================
                GRILLE D'AGENTS
                ============================================ */}
            {listeFiltree.length === 0 ? (
                <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-slate-100">
                        <i className="text-2xl fas fa-truck text-epo-slate-400" />
                    </div>
                    <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                        Aucun agent trouvé
                    </div>
                    <div className="text-[13px] text-epo-slate-500">
                        Essayez d'élargir vos filtres.
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    {listeFiltree.map((agent) => (
                        <AgentCarte
                            key={agent.id}
                            agent={agent}
                            onVoir={handleVoir}
                            onDemarrer={handleDemarrer}
                            onCloturer={handleCloturer}
                        />
                    ))}
                </div>
            )}

            {/* ============================================
                MODALE DE TOURNÉE
                ============================================ */}
            <TourneeModal
                agent={agentSelectionne}
                onClose={() => setAgentSelectionne(null)}
                onValiderRemise={handleValiderRemise}
            />
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