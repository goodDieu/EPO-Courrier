// src/data/scanSCC.js

/* ============================================================
   TYPES DE PIÈCES
   ============================================================ */

export const TYPES_PIECES = {
    'document-principal': {
        key: 'document-principal',
        label: 'Document principal',
        icon: 'fa-file-alt',
        color: 'bg-epo-green-50 text-epo-green-700',
    },
    annexe: {
        key: 'annexe',
        label: 'Annexe',
        icon: 'fa-paperclip',
        color: 'bg-epo-slate-100 text-epo-slate-700',
    },
    planche: {
        key: 'planche',
        label: 'Planche / Image',
        icon: 'fa-image',
        color: 'bg-epo-yellow-50 text-epo-yellow-700',
    },
    tableau: {
        key: 'tableau',
        label: 'Tableau / Excel',
        icon: 'fa-table',
        color: 'bg-epo-green-50 text-epo-green-700',
    },
    justificatif: {
        key: 'justificatif',
        label: 'Justificatif',
        icon: 'fa-file-shield',
        color: 'bg-epo-slate-100 text-epo-slate-700',
    },
};

/* ============================================================
   ÉTATS DE SCAN
   ============================================================ */

export const ETATS_SCAN = {
    'a-scanner': {
        key: 'a-scanner',
        label: 'À scanner',
        variant: 'orange',
        description: 'En attente de numérisation',
        icon: 'fa-clock',
        dot: 'bg-epo-yellow-500',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
    },
    'en-cours': {
        key: 'en-cours',
        label: 'En cours',
        variant: 'blue',
        description: 'Numérisation en cours par le client Tauri',
        icon: 'fa-spinner',
        dot: 'bg-epo-slate-500',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
    },
    'scanne': {
        key: 'scanne',
        label: 'Scanné',
        variant: 'green',
        description: 'Document numérisé et hash vérifié',
        icon: 'fa-check-circle',
        dot: 'bg-epo-green-500',
        chip: 'bg-epo-green-50 text-epo-green-700',
    },
    'erreur': {
        key: 'erreur',
        label: 'Erreur',
        variant: 'red',
        description: 'Échec de la numérisation',
        icon: 'fa-exclamation-triangle',
        dot: 'bg-epo-red-500',
        chip: 'bg-epo-red-50 text-epo-red-700',
    },
};

/* ============================================================
   HELPERS
   ============================================================ */

export function formatDateHeure(iso) {
    if (!iso) return '-';
    return new Date(iso).toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatHeure(iso) {
    if (!iso) return '-';
    return new Date(iso).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatTaille(ko) {
    if (ko < 1024) return `${ko} Ko`;
    return `${(ko / 1024).toFixed(1)} Mo`;
}

/**
 * Génère un pseudo-hash d'intégrité pour la démo.
 * En production : SHA-256 calculé côté backend (MinIO).
 */
export function generatePseudoHash() {
    const chars = 'abcdef0123456789';
    let hash = '';
    for (let i = 0; i < 40; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return `sha256:${hash}`;
}

/* ============================================================
   FILE DE SCAN (mock)
   ============================================================ */

export const DOCUMENTS_A_SCANNER = [
    /* ============================================
       À SCANNER - URGENTS
       ============================================ */
    {
        id: 'SCAN-2026-0142',
        documentSource: '2026-0488',
        typeDocument: 'courrier',
        objet: 'Demande de congé - M. TRAORÉ',
        source: 'Arrivée',
        classification: 'ordinaire',
        typePiece: 'document-principal',
        nbPages: 2,
        etat: 'a-scanner',
        priorite: 'normale',
        agentAssigne: null,
        dateArrivee: '2026-09-29T10:45:00',
        dateScan: null,
        hash: null,
        taille: null,
        clientCible: 'tauri',
        erreur: null,
    },
    {
        id: 'SCAN-2026-0143',
        documentSource: '2026-0485',
        typeDocument: 'courrier',
        objet: 'Communiqué officiel - MESRSI',
        source: 'Arrivée',
        classification: 'urgent',
        typePiece: 'document-principal',
        nbPages: 3,
        etat: 'a-scanner',
        priorite: 'urgente',
        agentAssigne: 'Mme ZONGO Aïcha',
        dateArrivee: '2026-09-29T09:15:00',
        dateScan: null,
        hash: null,
        taille: null,
        clientCible: 'tauri',
        erreur: null,
    },
    {
        id: 'SCAN-2026-0144',
        documentSource: '2026-0445',
        typeDocument: 'courrier',
        objet: 'Convention de partenariat - Université de Lyon',
        source: 'Arrivée',
        classification: 'confidentiel',
        typePiece: 'document-principal',
        nbPages: 12,
        etat: 'a-scanner',
        priorite: 'haute',
        agentAssigne: null,
        dateArrivee: '2026-09-28T16:00:00',
        dateScan: null,
        hash: null,
        taille: null,
        clientCible: 'tauri',
        erreur: null,
    },

    /* ============================================
       À SCANNER - NORMAUX
       ============================================ */
    {
        id: 'SCAN-2026-0145',
        documentSource: '2026-0487',
        typeDocument: 'courrier',
        objet: 'Réponse au courrier N°2026-0410',
        source: 'Arrivée',
        classification: 'ordinaire',
        typePiece: 'annexe',
        nbPages: 1,
        etat: 'a-scanner',
        priorite: 'normale',
        agentAssigne: null,
        dateArrivee: '2026-09-29T10:20:00',
        dateScan: null,
        hash: null,
        taille: null,
        clientCible: 'tauri',
        erreur: null,
    },
    {
        id: 'SCAN-2026-0146',
        documentSource: '2026-0486',
        typeDocument: 'courrier',
        objet: 'Facture fournisseur - Eau & Électricité',
        source: 'Arrivée',
        classification: 'ordinaire',
        typePiece: 'justificatif',
        nbPages: 1,
        etat: 'a-scanner',
        priorite: 'normale',
        agentAssigne: null,
        dateArrivee: '2026-09-29T09:50:00',
        dateScan: null,
        hash: null,
        taille: null,
        clientCible: 'tauri',
        erreur: null,
    },
    {
        id: 'SCAN-2026-0147',
        documentSource: 'ACT-2026-0405',
        typeDocument: 'acte',
        objet: 'Décision de congé - M. KABORÉ Issa',
        source: 'Départ',
        classification: 'ordinaire',
        typePiece: 'document-principal',
        nbPages: 1,
        etat: 'a-scanner',
        priorite: 'normale',
        agentAssigne: null,
        dateArrivee: '2026-09-29T08:30:00',
        dateScan: null,
        hash: null,
        taille: null,
        clientCible: 'tauri',
        erreur: null,
    },

    /* ============================================
       EN COURS
       ============================================ */
    {
        id: 'SCAN-2026-0139',
        documentSource: '2026-0484',
        typeDocument: 'courrier',
        objet: 'Dossier de candidature - Stage ingénieur',
        source: 'Arrivée',
        classification: 'ordinaire',
        typePiece: 'document-principal',
        nbPages: 5,
        etat: 'en-cours',
        priorite: 'normale',
        agentAssigne: 'M. OUÉDRAOGO Karim',
        dateArrivee: '2026-09-29T08:30:00',
        dateScanDebut: '2026-09-29T11:15:00',
        dateScan: null,
        hash: null,
        taille: null,
        clientCible: 'tauri',
        erreur: null,
        progression: 45,
    },
    {
        id: 'SCAN-2026-0140',
        documentSource: '2026-0483',
        typeDocument: 'courrier',
        objet: 'Convention de partenariat - Université de Lyon',
        source: 'Arrivée',
        classification: 'confidentiel',
        typePiece: 'annexe',
        nbPages: 8,
        etat: 'en-cours',
        priorite: 'haute',
        agentAssigne: 'M. TRAORÉ Ibrahim',
        dateArrivee: '2026-09-28T16:00:00',
        dateScanDebut: '2026-09-29T11:00:00',
        dateScan: null,
        hash: null,
        taille: null,
        clientCible: 'tauri',
        erreur: null,
        progression: 78,
    },

    /* ============================================
       SCANNÉS (historique récent)
       ============================================ */
    {
        id: 'SCAN-2026-0135',
        documentSource: '2026-0482',
        typeDocument: 'courrier',
        objet: 'Demande de subvention - Colloque international',
        source: 'Arrivée',
        classification: 'urgent',
        typePiece: 'document-principal',
        nbPages: 4,
        etat: 'scanne',
        priorite: 'urgente',
        agentAssigne: 'Mme ZONGO Aïcha',
        dateArrivee: '2026-09-28T14:30:00',
        dateScan: '2026-09-29T08:45:00',
        hash: 'sha256:a3f5e9c1d8b2f4a7e6c3d9b1f8a5e2c7d4b9a6f3e1c8d5b2a9f6e3c1d8b5a2f7',
        taille: 512,
        clientCible: 'tauri',
        erreur: null,
    },
    {
        id: 'SCAN-2026-0136',
        documentSource: '2026-0481',
        typeDocument: 'courrier',
        objet: 'Recrutement assistant IGIT - Dossier',
        source: 'Arrivée',
        classification: 'ordinaire',
        typePiece: 'document-principal',
        nbPages: 6,
        etat: 'scanne',
        priorite: 'normale',
        agentAssigne: 'M. OUÉDRAOGO Karim',
        dateArrivee: '2026-09-28T11:00:00',
        dateScan: '2026-09-29T08:30:00',
        hash: 'sha256:b7d2f4a8e5c1f9b3d6a8c2e5f7b4d1a9c3f6b8e2d5a7c1f4b6e9d3a8c5f2b7d1',
        taille: 1024,
        clientCible: 'tauri',
        erreur: null,
    },
    {
        id: 'SCAN-2026-0137',
        documentSource: '2026-0480',
        typeDocument: 'courrier',
        objet: "Rapport d'activité semestriel",
        source: 'Arrivée',
        classification: 'ordinaire',
        typePiece: 'annexe',
        nbPages: 3,
        etat: 'scanne',
        priorite: 'normale',
        agentAssigne: 'M. OUÉDRAOGO Karim',
        dateArrivee: '2026-09-28T09:00:00',
        dateScan: '2026-09-29T08:15:00',
        hash: 'sha256:c1e8a5b3f9d2e6a4c7b1f5d8e3a9c6b2f4d7e1a8c5b3f9d6e2a7c4b1f8d5e3a9',
        taille: 768,
        clientCible: 'tauri',
        erreur: null,
    },
    {
        id: 'SCAN-2026-0138',
        documentSource: 'ACT-2026-0402',
        typeDocument: 'acte',
        objet: 'Certificat de prise de service - Mme ZONGO Aïcha',
        source: 'Départ',
        classification: 'ordinaire',
        typePiece: 'document-principal',
        nbPages: 1,
        etat: 'scanne',
        priorite: 'normale',
        agentAssigne: 'Mme ZONGO Aïcha',
        dateArrivee: '2026-09-28T14:00:00',
        dateScan: '2026-09-29T08:00:00',
        hash: 'sha256:d9a2c7f1b5e8a3d6c9f2b7a1e5d8c3f6a9b2e7d1c4f8a5b9d3e6c1f4a7b2d9e5',
        taille: 245,
        clientCible: 'tauri',
        erreur: null,
    },

    /* ============================================
       ERREUR
       ============================================ */
    {
        id: 'SCAN-2026-0134',
        documentSource: '2026-0479',
        typeDocument: 'courrier',
        objet: 'Convocation réunion du conseil scientifique',
        source: 'Arrivée',
        classification: 'ordinaire',
        typePiece: 'document-principal',
        nbPages: 2,
        etat: 'erreur',
        priorite: 'normale',
        agentAssigne: 'Mme ZONGO Aïcha',
        dateArrivee: '2026-09-27T15:00:00',
        dateScan: null,
        hash: null,
        taille: null,
        clientCible: 'tauri',
        erreur: 'Scanner hors ligne - vérifier la connexion USB',
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_ETAT = [
    { value: '', label: 'Tous les états' },
    { value: 'a-scanner', label: 'À scanner' },
    { value: 'en-cours', label: 'En cours' },
    { value: 'scanne', label: 'Scanné' },
    { value: 'erreur', label: 'Erreur' },
];

export const FILTRES_TYPE_PIECE = [
    { value: '', label: 'Tous les types' },
    { value: 'document-principal', label: 'Document principal' },
    { value: 'annexe', label: 'Annexe' },
    { value: 'planche', label: 'Planche / Image' },
    { value: 'tableau', label: 'Tableau / Excel' },
    { value: 'justificatif', label: 'Justificatif' },
];

export const FILTRES_SOURCE = [
    { value: '', label: 'Toutes les sources' },
    { value: 'Arrivée', label: 'Courriers entrants' },
    { value: 'Départ', label: 'Courriers sortants' },
];