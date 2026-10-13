// src/data/courriersRecusSPSG.js

/* ============================================================
   ÉTATS
   ============================================================ */

export const ETATS_COURRIER = {
    'nouveau': {
        key: 'nouveau',
        label: 'Nouveau reçu',
        icon: 'fa-inbox',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
        dot: 'bg-epo-yellow-500',
    },
    'en-traitement': {
        key: 'en-traitement',
        label: 'En cours de traitement',
        icon: 'fa-spinner',
        chip: 'bg-epo-slate-800 text-white',
        dot: 'bg-epo-slate-800',
    },
    'introduit': {
        key: 'introduit',
        label: 'Introduit au SG',
        icon: 'fa-user-tie',
        chip: 'bg-epo-green-50 text-epo-green-700',
        dot: 'bg-epo-green-500',
    },
};

/* ============================================================
   TYPES DE DOSSIERS
   ============================================================ */

export const TYPES_DOSSIERS = {
    courrier: {
        key: 'courrier',
        label: 'Courrier',
        icon: 'fa-envelope',
        color: 'bg-epo-slate-100 text-epo-slate-700',
    },
    acte: {
        key: 'acte',
        label: 'Acte',
        icon: 'fa-file-signature',
        color: 'bg-epo-green-50 text-epo-green-700',
    },
};

/* ============================================================
   HELPERS
   ============================================================ */

export function formatHeure(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatDateHeure(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatDuree(min) {
    const abs = Math.abs(min);
    if (abs < 60) return `${abs}min`;
    const h = Math.floor(abs / 60);
    const m = abs % 60;
    if (h < 24) return m > 0 ? `${h}h ${m}min` : `${h}h`;
    return `${Math.floor(h / 24)}j ${h % 24}h`;
}

/* ============================================================
   COURRIERS REÇUS DU SCC
   ============================================================ */

export const COURRIERS_RECUS_SPSG = [
    /* ============================================
       NOUVEAUX REÇUS
       ============================================ */
    {
        id: '2026-0485',
        type: 'courrier',
        objet: 'Communiqué officiel- MESRSI',
        expediteurNom: "Ministère de l'Enseignement Supérieur",
        expediteurStructure: 'MESRSI',
        priorite: 'urgent',
        etat: 'nouveau',
        receptionSCC: '2026-09-29T09:15:00',
        recuAuSPSG: '2026-09-29T09:20:00',
        tempsAttente: 5,
        agentLiaison: 'M. SAWADOGO Bakary',
        transmissionId: 'TR-2026-0148',
        pieces: 2,
        piecesVerifiees: false,
        dechargeConfirmee: false,
        classification: 'urgent',
    },
    {
        id: '2026-0488',
        type: 'courrier',
        objet: 'Demande de congé- M. TRAORÉ',
        expediteurNom: 'DRH',
        expediteurStructure: 'DRH',
        priorite: 'normal',
        etat: 'nouveau',
        receptionSCC: '2026-09-29T10:45:00',
        recuAuSPSG: '2026-09-29T10:50:00',
        tempsAttente: 5,
        agentLiaison: 'M. SAWADOGO Bakary',
        transmissionId: 'TR-2026-0151',
        pieces: 2,
        piecesVerifiees: false,
        dechargeConfirmee: false,
        classification: 'ordinaire',
    },
    {
        id: '2026-0486',
        type: 'courrier',
        objet: 'Facture fournisseur- Eau & Électricité',
        expediteurNom: 'SONABEL',
        expediteurStructure: 'SONABEL',
        priorite: 'normal',
        etat: 'nouveau',
        receptionSCC: '2026-09-29T09:50:00',
        recuAuSPSG: '2026-09-29T09:55:00',
        tempsAttente: 5,
        agentLiaison: 'Mme ZONGO Aïcha',
        transmissionId: 'TR-2026-0150',
        pieces: 1,
        piecesVerifiees: false,
        dechargeConfirmee: false,
        classification: 'ordinaire',
    },

    /* ============================================
       EN COURS DE TRAITEMENT (tri/scan en cours)
       ============================================ */
    {
        id: '2026-0484',
        type: 'courrier',
        objet: 'Dossier de candidature- Stage ingénieur',
        expediteurNom: 'Université Joseph Ki-Zerbo',
        expediteurStructure: 'UJKZ',
        priorite: 'normal',
        etat: 'en-traitement',
        receptionSCC: '2026-09-29T08:30:00',
        recuAuSPSG: '2026-09-29T08:35:00',
        tempsAttente: 85,
        agentLiaison: 'M. OUÉDRAOGO Karim',
        transmissionId: 'TR-2026-0147',
        pieces: 5,
        piecesVerifiees: true,
        dechargeConfirmee: true,
        classification: 'ordinaire',
        etapeActuelle: 'scan',
    },
    {
        id: '2026-0448',
        type: 'courrier',
        objet: "Recrutement d'un assistant à l'IGIT",
        expediteurNom: 'M. COMPAORÉ Ali (DRH)',
        expediteurStructure: 'DRH',
        priorite: 'normal',
        etat: 'en-traitement',
        receptionSCC: '2026-09-28T15:00:00',
        recuAuSPSG: '2026-09-28T15:10:00',
        tempsAttente: 1420,
        agentLiaison: 'M. SAWADOGO Bakary',
        transmissionId: 'TR-2026-0138',
        pieces: 4,
        piecesVerifiees: true,
        dechargeConfirmee: true,
        classification: 'ordinaire',
        etapeActuelle: 'tri',
    },

    /* ============================================
       INTRODUITS AU SG (historique récent)
       ============================================ */
    {
        id: '2026-0450',
        type: 'courrier',
        objet: "Rapport d'activité semestriel",
        expediteurNom: 'DGA-AVE',
        expediteurStructure: 'DGA-AVE',
        priorite: 'normal',
        etat: 'introduit',
        receptionSCC: '2026-09-29T08:00:00',
        recuAuSPSG: '2026-09-29T08:05:00',
        tempsAttente: 25,
        agentLiaison: 'M. SAWADOGO Bakary',
        transmissionId: 'TR-2026-0142',
        pieces: 2,
        piecesVerifiees: true,
        dechargeConfirmee: true,
        classification: 'ordinaire',
        introductionSG: '2026-09-29T08:30:00',
    },
    {
        id: '2026-0452',
        type: 'courrier',
        objet: 'Demande de subvention exceptionnelle- Colloque 2026',
        expediteurNom: "Ministère de l'Enseignement Supérieur",
        expediteurStructure: 'MESRSI',
        priorite: 'urgent',
        etat: 'introduit',
        receptionSCC: '2026-09-29T08:00:00',
        recuAuSPSG: '2026-09-29T08:10:00',
        tempsAttente: 20,
        agentLiaison: 'M. SAWADOGO Bakary',
        transmissionId: 'TR-2026-0144',
        pieces: 3,
        piecesVerifiees: true,
        dechargeConfirmee: true,
        classification: 'urgent',
        introductionSG: '2026-09-29T08:30:00',
    },
    {
        id: 'ACT-2026-0443',
        type: 'acte',
        objet: 'Certificat de travail- M. SAWADOGO Bakary',
        expediteurNom: 'M. COMPAORÉ Ali (DRH)',
        expediteurStructure: 'DRH',
        priorite: 'normal',
        etat: 'introduit',
        receptionSCC: '2026-09-28T10:00:00',
        recuAuSPSG: '2026-09-28T10:15:00',
        tempsAttente: 45,
        agentLiaison: 'Mme ZONGO Aïcha',
        transmissionId: 'TR-2026-0135',
        pieces: 1,
        piecesVerifiees: true,
        dechargeConfirmee: true,
        classification: 'ordinaire',
        introductionSG: '2026-09-28T11:00:00',
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_ETAT = [
    { value: '', label: 'Tous les états' },
    { value: 'nouveau', label: 'Nouveaux reçus' },
    { value: 'en-traitement', label: 'En cours de traitement' },
    { value: 'introduit', label: 'Introduits au SG' },
];

export const FILTRES_PRIORITE = [
    { value: '', label: 'Toutes les priorités' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'normal', label: 'Normal' },
];

export const FILTRES_AGENT = [
    { value: '', label: 'Tous les agents' },
    { value: 'M. SAWADOGO Bakary', label: 'M. SAWADOGO Bakary' },
    { value: 'M. OUÉDRAOGO Karim', label: 'M. OUÉDRAOGO Karim' },
    { value: 'Mme ZONGO Aïcha', label: 'Mme ZONGO Aïcha' },
];

export const FILTRES_TYPE = [
    { value: '', label: 'Tous les types' },
    { value: 'courrier', label: 'Courriers' },
    { value: 'acte', label: 'Actes' },
];