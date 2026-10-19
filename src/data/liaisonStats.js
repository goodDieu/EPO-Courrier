// src/data/liaisonStats.js
// Tournée de l'agent de liaison connecté : ce sont les remises que le
// Service Courrier lui a confiées (liaisonsSCC.js, via le magasin du SCC).
import { isSameDay } from './demoClock.js';

// Compte de démonstration : M. SAWADOGO Bakary
export const MON_AGENT_ID = 'al1';

export const STATUTS_REMISE = {
    'en-retard': { label: 'En retard', dot: 'bg-epo-red-600', ordre: 0 },
    'en-cours': { label: 'En route', dot: 'bg-epo-slate-600', ordre: 1 },
    'a-venir': { label: 'À remettre', dot: 'bg-epo-yellow-500', ordre: 2 },
    bloque: { label: 'Problème signalé', dot: 'bg-epo-red-600', ordre: 3 },
    remis: { label: 'Remis', dot: 'bg-epo-green-600', ordre: 4 },
};

export const aFaire = (agent) =>
    agent.remises.filter((r) => ['a-venir', 'en-cours', 'en-retard'].includes(r.statut)).sort((a, b) => STATUTS_REMISE[a.statut].ordre - STATUTS_REMISE[b.statut].ordre || new Date(a.heurePrevue) - new Date(b.heurePrevue));
export const problemes = (agent) => agent.remises.filter((r) => r.statut === 'bloque');
export const faites = (agent) => agent.remises.filter((r) => r.statut === 'remis').sort((a, b) => new Date(b.heureRemise) - new Date(a.heureRemise));

export function statsLiaison(agent) {
    return {
        aRemettre: aFaire(agent).length,
        enRetard: agent.remises.filter((r) => r.statut === 'en-retard').length,
        problemes: problemes(agent).length,
        faitesAujourdhui: faites(agent).filter((r) => isSameDay(r.heureRemise)).length,
        total: agent.remises.length,
    };
}
