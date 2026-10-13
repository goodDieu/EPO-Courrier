// src/data/courriersRecusSPDG.js

/* ============================================================
   SOURCES DE RÉCEPTION
   ============================================================ */

export const SOURCES = {
    scc: {
        key: 'scc',
        label: 'SCC',
        icon: 'fa-inbox',
        color: 'bg-epo-slate-100 text-epo-slate-700',
    },
    'sp-sg': {
        key: 'sp-sg',
        label: 'SP-SG',
        icon: 'fa-user-tie',
        color: 'bg-epo-green-50 text-epo-green-700',
    },
};

/* ============================================================
   ÉTATS
   ============================================================ */

export const ETATS_COURRIER = {
    'a-trier': {
        key: 'a-trier',
        label: 'À trier',
        icon: 'fa-th',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
        dot: 'bg-epo-yellow-500',
    },
    'pret-introduire': {
        key: 'pret-introduire',
        label: 'Prêt à introduire',
        icon: 'fa-check-circle',
        chip: 'bg-epo-green-50 text-epo-green-700',
        dot: 'bg-epo-green-500',
    },
    'introduit': {
        key: 'introduit',
        label: 'Introduit au DG',
        icon: 'fa-pen',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
        dot: 'bg-epo-slate-400',
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
   COURRIERS REÇUS
   ============================================================ */

export const COURRIERS_RECUS = [
    /* ============================================
       À TRIER- FRAÎCHEMENT REÇUS
       ============================================ */
    {
        id: '2026-0452',
        type: 'courrier',
        objet: 'Demande de subvention exceptionnelle- Colloque international 2026',
        source: 'sp-sg',
        expediteur: 'SG',
        expediteurNom: 'M. OUÉDRAOGO Salif (SG)',
        priorite: 'urgent',
        etat: 'a-trier',
        dateReception: '2026-09-29T08:00:00',
        tempsAttente: 45,
        vuBonASigner: {
            date: '2026-09-28T15:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        pieces: 3,
        confidence: false,
        numeroConfidentiel: null,
    },
    {
        id: '2026-0448',
        type: 'courrier',
        objet: "Recrutement d'un assistant à l'IGIT",
        source: 'sp-sg',
        expediteur: 'DRH',
        expediteurNom: 'M. COMPAORÉ Ali (DRH)',
        priorite: 'normal',
        etat: 'a-trier',
        dateReception: '2026-09-29T09:30:00',
        tempsAttente: 30,
        vuBonASigner: {
            date: '2026-09-27T14:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        pieces: 4,
        confidence: false,
        numeroConfidentiel: null,
    },
    {
        id: 'CONF-2026-0021',
        type: 'courrier',
        objet: 'Décision de sanction disciplinaire- Agent X',
        source: 'sp-sg',
        expediteur: 'DRH',
        expediteurNom: 'M. COMPAORÉ Ali (DRH)',
        priorite: 'confidentiel',
        etat: 'a-trier',
        dateReception: '2026-09-29T07:30:00',
        tempsAttente: 60,
        vuBonASigner: {
            date: '2026-09-28T17:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        pieces: 3,
        confidence: true,
        numeroConfidentiel: null, // À attribuer (RG-35)
    },

    /* ============================================
       PRÊT À INTRODUIRE- TRIÉS
       ============================================ */
    {
        id: 'ACT-2026-0443',
        type: 'acte',
        objet: 'Certificat de travail- M. SAWADOGO Bakary',
        source: 'sp-sg',
        expediteur: 'DRH',
        expediteurNom: 'M. COMPAORÉ Ali (DRH)',
        priorite: 'normal',
        etat: 'pret-introduire',
        dateReception: '2026-09-28T10:00:00',
        dateTri: '2026-09-28T11:00:00',
        tempsAttente: 180,
        vuBonASigner: {
            date: '2026-09-27T09:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        pieces: 1,
        confidence: false,
        numeroConfidentiel: null,
    },
    {
        id: 'CONF-2026-0019',
        type: 'courrier',
        objet: 'Rapport d\'audit interne- Exercice 2025',
        source: 'sp-sg',
        expediteur: 'Contrôleur Interne',
        expediteurNom: 'M. OUÉDRAOGO Karim',
        priorite: 'confidentiel',
        etat: 'pret-introduire',
        dateReception: '2026-09-29T06:30:00',
        dateTri: '2026-09-29T07:00:00',
        tempsAttente: 90,
        vuBonASigner: {
            date: '2026-09-29T06:30:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        pieces: 5,
        confidence: true,
        numeroConfidentiel: 'CONF-2026-0019', // Attribué (RG-35)
    },

    /* ============================================
       INTRODUITS AU DG- EN COURS D'EXAMEN
       ============================================ */
    {
        id: '2026-0398',
        type: 'courrier',
        objet: 'Réponse au Ministère- projet SG (à reformuler)',
        source: 'sp-sg',
        expediteur: 'SG',
        expediteurNom: 'M. OUÉDRAOGO Salif (SG)',
        priorite: 'urgent',
        etat: 'introduit',
        dateReception: '2026-09-27T11:00:00',
        dateTri: '2026-09-27T11:15:00',
        dateIntroduction: '2026-09-27T11:30:00',
        tempsAttente: 240,
        vuBonASigner: {
            date: '2026-09-27T10:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        pieces: 2,
        confidence: false,
        numeroConfidentiel: null,
    },
    {
        id: '2026-0438',
        type: 'courrier',
        objet: 'Transmission du PV de délibération du personnel',
        source: 'scc',
        expediteur: 'DAF',
        expediteurNom: 'Mme SANOU Mariam (DAF)',
        priorite: 'normal',
        etat: 'introduit',
        dateReception: '2026-09-27T09:00:00',
        dateTri: '2026-09-27T09:30:00',
        dateIntroduction: '2026-09-27T10:00:00',
        tempsAttente: 300,
        vuBonASigner: {
            date: '2026-09-26T16:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        pieces: 2,
        confidence: false,
        numeroConfidentiel: null,
    },
    {
        id: '2026-0421',
        type: 'courrier',
        objet: 'Note de service- Organisation des soutenances',
        source: 'scc',
        expediteur: 'DGA-AVE',
        expediteurNom: 'Pr. TANKOANO Martin (DGA-AVE)',
        priorite: 'normal',
        etat: 'introduit',
        dateReception: '2026-09-26T15:00:00',
        dateTri: '2026-09-26T15:30:00',
        dateIntroduction: '2026-09-26T16:00:00',
        tempsAttente: 480,
        vuBonASigner: {
            date: '2026-09-26T14:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        pieces: 1,
        confidence: false,
        numeroConfidentiel: null,
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_ETAT = [
    { value: '', label: 'Tous les états' },
    { value: 'a-trier', label: 'À trier' },
    { value: 'pret-introduire', label: 'Prêt à introduire' },
    { value: 'introduit', label: 'Introduit au DG' },
];

export const FILTRES_PRIORITE = [
    { value: '', label: 'Toutes les priorités' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'confidentiel', label: 'Confidentiel' },
    { value: 'normal', label: 'Normal' },
];

export const FILTRES_SOURCE = [
    { value: '', label: 'Toutes les sources' },
    { value: 'scc', label: 'Provenant du SCC' },
    { value: 'sp-sg', label: 'Provenant du SP-SG' },
];

export const FILTRES_TYPE = [
    { value: '', label: 'Tous les types' },
    { value: 'courrier', label: 'Courriers' },
    { value: 'acte', label: 'Actes' },
];