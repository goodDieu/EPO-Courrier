// src/data/sccStats.js
// Indicateurs du Service Courrier calculés à partir des données du SCC.
// Le tableau de bord et les pages utilisent ces mêmes fonctions : les chiffres
// affichés sont donc identiques partout.
import { DEMO_NOW, isSameDay } from './demoClock.js';

// États d'un courrier entrant pour lesquels le délai de traitement compte encore
const ETATS_ENTRANTS_ACTIFS = ['enregistre', 'transmis-sp-sg', 'chez-sp-sg', 'chez-sg', 'chez-sp-dg', 'chez-dg', 'retour-sg', 'chez-scc'];

export function isEntrantActif(arrivee) {
    return ETATS_ENTRANTS_ACTIFS.includes(arrivee.etat);
}

export function statsArrivees(arrivees) {
    return {
        aTransmettre: arrivees.filter((a) => a.etat === 'enregistre').length,
        aTransmettreUrgents: arrivees.filter((a) => a.etat === 'enregistre' && a.classification === 'urgent').length,
        enRetard: arrivees.filter((a) => isEntrantActif(a) && a.tempsRestant < 0).length,
        recusAujourdhui: arrivees.filter((a) => isSameDay(a.dateReception, DEMO_NOW)).length,
        urgentsEnCours: arrivees.filter((a) => isEntrantActif(a) && a.classification === 'urgent').length,
        confidentiels: arrivees.filter((a) => isEntrantActif(a) && a.classification === 'confidentiel').length,
    };
}

export function statsDispatch(dossiers) {
    return {
        aDispatcher: dossiers.filter((d) => d.etat === 'a-dispatcher').length,
        enRetard: dossiers.filter((d) => d.etat === 'en-retard').length,
        enTournee: dossiers.filter((d) => d.etat === 'en-tournee').length,
        termines: dossiers.filter((d) => d.etat === 'remis' || d.etat === 'decharge').length,
    };
}

export function statsScan(documents) {
    return {
        aScanner: documents.filter((d) => d.etat === 'a-scanner').length,
        enCours: documents.filter((d) => d.etat === 'en-cours').length,
        erreurs: documents.filter((d) => d.etat === 'erreur').length,
        scannesAujourdhui: documents.filter((d) => d.etat === 'scanne' && isSameDay(d.dateScan, DEMO_NOW)).length,
        scannes: documents.filter((d) => d.etat === 'scanne').length,
    };
}

export function statsDeparts(departs) {
    return {
        aNumeroter: departs.filter((d) => d.etat === 'a-numeroter').length,
        aCacheter: departs.filter((d) => d.etat === 'a-cacheter').length,
        pretsExpedition: departs.filter((d) => d.etat === 'pret-expedition').length,
        enCours: departs.filter((d) => d.etat === 'en-cours').length,
        transmis: departs.filter((d) => d.etat === 'transmis').length,
    };
}

export function statsLiaisons(agents) {
    const remises = agents.flatMap((a) => a.remises);
    return {
        tourneesActives: agents.filter((a) => a.statut === 'en-tournee').length,
        disponibles: agents.filter((a) => a.statut === 'disponible').length,
        indisponibles: agents.filter((a) => a.statut === 'indisponible').length,
        remisesTotal: remises.length,
        remisesFaites: remises.filter((r) => r.statut === 'remis').length,
        remisesEnRetard: remises.filter((r) => r.statut === 'en-retard').length,
    };
}
