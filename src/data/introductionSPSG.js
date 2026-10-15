// src/data/introductionSPSG.js

/* ============================================================
   CLASSIFICATION EISENHOWER
   ============================================================ */

export const CLASSIFICATION_EISENHOWER = {
    'important-urgent': {
        key: 'important-urgent',
        label: 'Important · Urgent',
        shortLabel: 'I·U',
        chip: 'bg-epo-slate-100 text-epo-slate-900',
        dot: 'bg-epo-red-500',
        ordre: 0,
    },
    'important-non-urgent': {
        key: 'important-non-urgent',
        label: 'Important · Non urgent',
        shortLabel: 'I·NU',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
        dot: 'bg-epo-yellow-500',
        ordre: 1,
    },
    'non-important-urgent': {
        key: 'non-important-urgent',
        label: 'Non important · Urgent',
        shortLabel: 'NI·U',
        chip: 'bg-epo-green-50 text-epo-green-700',
        dot: 'bg-epo-green-500',
        ordre: 2,
    },
    'non-important-non-urgent': {
        key: 'non-important-non-urgent',
        label: 'Non important · Non urgent',
        shortLabel: 'NI·NU',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
        dot: 'bg-epo-slate-400',
        ordre: 3,
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
   DOSSIERS À INTRODUIRE AU SG
   ============================================================ */

export const DOSSIERS_A_INTRODUIRE_SG = [
    /* ============================================
       URGENTS (à introduire en premier)
       ============================================ */
    {
        id: '2026-0485',
        type: 'courrier',
        objet: 'Communiqué officiel- MESRSI',
        expediteurNom: "Ministère de l'Enseignement Supérieur",
        expediteurStructure: 'MESRSI',
        priorite: 'urgent',
        classification: 'important-urgent',
        vuSPSG: {
            date: '2026-09-29T09:20:00',
            par: 'Mme KABORÉ Fatimata (SP-SG)',
        },
        recuAuSPSG: '2026-09-29T09:20:00',
        tempsAttente: 45,
        pieces: 2,
        scanne: true,
        pointsAttention: [
            'Dossier en retard- délai 60 min SP-SG → SG dépassé',
            'Communiqué ministériel à fort impact',
        ],
    },
    {
        id: '2026-0452',
        type: 'courrier',
        objet: 'Demande de subvention exceptionnelle- Colloque 2026',
        expediteurNom: "Ministère de l'Enseignement Supérieur",
        expediteurStructure: 'MESRSI',
        priorite: 'urgent',
        classification: 'important-urgent',
        vuSPSG: {
            date: '2026-09-29T08:10:00',
            par: 'Mme KABORÉ Fatimata (SP-SG)',
        },
        recuAuSPSG: '2026-09-29T08:10:00',
        tempsAttente: 120,
        pieces: 3,
        scanne: true,
        pointsAttention: [
            'Retard important- dépassement de 1h',
            'Avis favorable du SG attendu',
        ],
    },

    /* ============================================
       IMPORTANTS NON URGENTS
       ============================================ */
    {
        id: '2026-0448',
        type: 'courrier',
        objet: "Recrutement d'un assistant à l'IGIT",
        expediteurNom: 'M. COMPAORÉ Ali (DRH)',
        expediteurStructure: 'DRH',
        priorite: 'normal',
        classification: 'important-non-urgent',
        vuSPSG: {
            date: '2026-09-29T09:30:00',
            par: 'Mme KABORÉ Fatimata (SP-SG)',
        },
        recuAuSPSG: '2026-09-29T09:30:00',
        tempsAttente: 60,
        pieces: 4,
        scanne: true,
        pointsAttention: [],
    },
    {
        id: 'ACT-2026-0443',
        type: 'acte',
        objet: 'Certificat de travail- M. SAWADOGO Bakary',
        expediteurNom: 'M. COMPAORÉ Ali (DRH)',
        expediteurStructure: 'DRH',
        priorite: 'normal',
        classification: 'important-non-urgent',
        vuSPSG: {
            date: '2026-09-28T10:15:00',
            par: 'Mme KABORÉ Fatimata (SP-SG)',
        },
        recuAuSPSG: '2026-09-28T10:15:00',
        tempsAttente: 480,
        pieces: 1,
        scanne: true,
        pointsAttention: [
            'En attente depuis 8h- à introduire rapidement',
        ],
    },

    /* ============================================
       NORMAUX
       ============================================ */
    {
        id: '2026-0488',
        type: 'courrier',
        objet: 'Demande de congé- M. TRAORÉ',
        expediteurNom: 'DRH',
        expediteurStructure: 'DRH',
        priorite: 'normal',
        classification: 'non-important-non-urgent',
        vuSPSG: {
            date: '2026-09-29T10:50:00',
            par: 'Mme KABORÉ Fatimata (SP-SG)',
        },
        recuAuSPSG: '2026-09-29T10:50:00',
        tempsAttente: 30,
        pieces: 2,
        scanne: true,
        pointsAttention: [],
    },
    {
        id: '2026-0486',
        type: 'courrier',
        objet: 'Facture fournisseur- Eau & Électricité',
        expediteurNom: 'SONABEL',
        expediteurStructure: 'SONABEL',
        priorite: 'normal',
        classification: 'non-important-non-urgent',
        vuSPSG: {
            date: '2026-09-29T09:55:00',
            par: 'Mme KABORÉ Fatimata (SP-SG)',
        },
        recuAuSPSG: '2026-09-29T09:55:00',
        tempsAttente: 45,
        pieces: 1,
        scanne: true,
        pointsAttention: [],
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_PRIORITE = [
    { value: '', label: 'Toutes les priorités' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'normal', label: 'Normal' },
];

export const FILTRES_CLASSIFICATION = [
    { value: '', label: 'Toutes les classifications' },
    { value: 'important-urgent', label: 'Important · Urgent' },
    { value: 'important-non-urgent', label: 'Important · Non urgent' },
    { value: 'non-important-urgent', label: 'Non important · Urgent' },
    { value: 'non-important-non-urgent', label: 'Non important · Non urgent' },
];

export const FILTRES_TYPE = [
    { value: '', label: 'Tous les types' },
    { value: 'courrier', label: 'Courriers' },
    { value: 'acte', label: 'Actes' },
];

export const OPTIONS_TRI = [
    { value: 'classification', label: 'Classification Eisenhower (défaut)' },
    { value: 'anciennete', label: 'Plus anciens d\'abord' },
    { value: 'recent', label: 'Plus récents' },
    { value: 'type', label: 'Par type' },
];