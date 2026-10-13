// src/data/introductionSPDG.js

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
   SOURCES
   ============================================================ */

export const SOURCES = {
    scc: {
        key: 'scc',
        label: 'SCC',
        icon: 'fa-inbox',
    },
    'sp-sg': {
        key: 'sp-sg',
        label: 'SP-SG',
        icon: 'fa-user-tie',
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
   DOSSIERS À INTRODUIRE AU DG
   ============================================================ */

export const DOSSIERS_A_INTRODUIRE = [
    /* ============================================
       URGENTS (à introduire en priorité)
       ============================================ */
    {
        id: '2026-0452',
        type: 'courrier',
        objet: 'Demande de subvention exceptionnelle- Colloque 2026',
        source: 'sp-sg',
        expediteurNom: 'M. OUÉDRAOGO Salif (SG)',
        priorite: 'urgent',
        vuBonASigner: {
            date: '2026-09-28T15:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        recuAuSPDG: '2026-09-29T08:00:00',
        tempsAttente: 45,
        pieces: 3,
        pointsAttention: [
            'Dossier en retard- dépassement de 45 min',
            'Avis SG favorable',
        ],
        confidence: false,
    },
    {
        id: '2026-0398',
        type: 'courrier',
        objet: 'Réponse au Ministère- projet SG (à reformuler)',
        source: 'sp-sg',
        expediteurNom: 'M. OUÉDRAOGO Salif (SG)',
        priorite: 'urgent',
        vuBonASigner: {
            date: '2026-09-27T10:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        recuAuSPDG: '2026-09-27T11:00:00',
        tempsAttente: 240,
        pieces: 2,
        pointsAttention: [
            'Dossier en retard critique- dépassement de 4h',
            'Note du SG : à reformuler selon directives du Ministère',
        ],
        confidence: false,
    },

    /* ============================================
       CONFIDENTIELS (discrétion absolue)
       ============================================ */
    {
        id: 'CONF-2026-0021',
        type: 'courrier',
        objet: 'Décision de sanction disciplinaire- Agent X',
        source: 'sp-sg',
        expediteurNom: 'M. COMPAORÉ Ali (DRH)',
        priorite: 'confidentiel',
        vuBonASigner: {
            date: '2026-09-28T17:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        recuAuSPDG: '2026-09-29T07:30:00',
        tempsAttente: 60,
        pieces: 3,
        pointsAttention: [
            'À remettre en main propre au DG',
            'Discrétion absolue- pas de copie',
            'Document soumis à liste blanche (RG-11)',
        ],
        confidence: true,
    },
    {
        id: 'CONF-2026-0019',
        type: 'courrier',
        objet: 'Rapport d\'audit interne- Exercice 2025',
        source: 'sp-sg',
        expediteurNom: 'M. OUÉDRAOGO Salif (SG)',
        priorite: 'confidentiel',
        vuBonASigner: {
            date: '2026-09-29T06:30:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        recuAuSPDG: '2026-09-29T06:30:00',
        tempsAttente: 90,
        pieces: 5,
        pointsAttention: [
            'Rapport sensible- diffusion restreinte',
            'Ne pas laisser sur le bureau du DG',
        ],
        confidence: true,
    },

    /* ============================================
       NORMAUX
       ============================================ */
    {
        id: '2026-0448',
        type: 'courrier',
        objet: "Recrutement d'un assistant à l'IGIT",
        source: 'sp-sg',
        expediteurNom: 'M. COMPAORÉ Ali (DRH)',
        priorite: 'normal',
        vuBonASigner: {
            date: '2026-09-27T14:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        recuAuSPDG: '2026-09-27T15:00:00',
        tempsAttente: 120,
        pieces: 4,
        pointsAttention: [],
        confidence: false,
    },
    {
        id: 'ACT-2026-0443',
        type: 'acte',
        objet: 'Certificat de travail- M. SAWADOGO Bakary',
        source: 'sp-sg',
        expediteurNom: 'M. COMPAORÉ Ali (DRH)',
        priorite: 'normal',
        vuBonASigner: {
            date: '2026-09-27T09:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        recuAuSPDG: '2026-09-27T10:00:00',
        tempsAttente: 180,
        pieces: 1,
        pointsAttention: [],
        confidence: false,
    },
    {
        id: 'ACT-2026-0412',
        type: 'acte',
        objet: 'Attestation d\'absence- M. OUÉDRAOGO Karim',
        source: 'sp-sg',
        expediteurNom: 'M. COMPAORÉ Ali (DRH)',
        priorite: 'normal',
        vuBonASigner: {
            date: '2026-09-27T14:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        recuAuSPDG: '2026-09-27T14:30:00',
        tempsAttente: 150,
        pieces: 1,
        pointsAttention: [],
        confidence: false,
    },
    {
        id: '2026-0438',
        type: 'courrier',
        objet: 'Transmission du PV de délibération du personnel',
        source: 'scc',
        expediteurNom: 'Mme SANOU Mariam (DAF)',
        priorite: 'normal',
        vuBonASigner: {
            date: '2026-09-26T16:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        recuAuSPDG: '2026-09-27T09:00:00',
        tempsAttente: 200,
        pieces: 2,
        pointsAttention: [],
        confidence: false,
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_PRIORITE = [
    { value: '', label: 'Toutes les priorités' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'confidentiel', label: 'Confidentiel' },
    { value: 'normal', label: 'Normal' },
];

export const FILTRES_TYPE = [
    { value: '', label: 'Tous les types' },
    { value: 'courrier', label: 'Courriers' },
    { value: 'acte', label: 'Actes' },
];

export const FILTRES_SOURCE = [
    { value: '', label: 'Toutes les sources' },
    { value: 'scc', label: 'Provenant du SCC' },
    { value: 'sp-sg', label: 'Provenant du SP-SG' },
];

export const OPTIONS_TRI = [
    { value: 'urgence', label: 'Priorité (défaut)' },
    { value: 'anciennete', label: 'Plus anciens d\'abord' },
    { value: 'recent', label: 'Plus récents' },
    { value: 'type', label: 'Par type' },
];