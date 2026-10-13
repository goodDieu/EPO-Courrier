// src/data/postVisaSPDG.js

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
   MOTIFS DE REJET (§8.7)
   ============================================================ */

export const NATURES_MOTIF_REFUS = {
    fond: {
        key: 'fond',
        label: 'Fond',
        description: 'Le contenu ou la substance du document pose problème',
        icon: 'fa-file-alt',
        chip: 'bg-epo-red-50 text-epo-red-700',
    },
    forme: {
        key: 'forme',
        label: 'Forme',
        description: 'La présentation, la rédaction ou la structure est à revoir',
        icon: 'fa-pen-nib',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
    },
    pieces: {
        key: 'pieces',
        label: 'Pièces',
        description: 'Des pièces justificatives sont manquantes ou inadaptées',
        icon: 'fa-paperclip',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
    },
};

/* ============================================================
   DOSSIERS POST-VISA À TRAITER
   ============================================================ */

export const DOSSIERS_POST_VISA = [
    /* ============================================
       URGENTS- en attente de coche
       ============================================ */
    {
        id: '2026-0452',
        type: 'courrier',
        objet: 'Demande de subvention exceptionnelle- Colloque 2026',
        produitPar: 'SG',
        source: 'SCC',
        priorite: 'urgent',
        etat: 'a-cocher',
        vuBonASigner: {
            date: '2026-09-28T15:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        arriveDG: {
            date: '2026-09-29T08:00:00',
        },
        decisionDG: null,
        tempsRestantMin: 120,
        pieces: 3,
        confidence: false,
    },
    {
        id: '2026-0398',
        type: 'courrier',
        objet: 'Réponse au Ministère- projet SG (à reformuler)',
        produitPar: 'SG',
        source: 'SCC',
        priorite: 'urgent',
        etat: 'a-cocher',
        vuBonASigner: {
            date: '2026-09-27T10:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        arriveDG: {
            date: '2026-09-27T11:30:00',
        },
        decisionDG: null,
        tempsRestantMin: -240, // dépassé
        pieces: 2,
        confidence: false,
    },

    /* ============================================
       CONFIDENTIELS
       ============================================ */
    {
        id: 'CONF-2026-0021',
        type: 'courrier',
        objet: 'Décision de sanction disciplinaire- Agent X',
        produitPar: 'DRH',
        source: 'SP-SG',
        priorite: 'confidentiel',
        etat: 'a-cocher',
        vuBonASigner: {
            date: '2026-09-28T17:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        arriveDG: {
            date: '2026-09-29T07:30:00',
        },
        decisionDG: null,
        tempsRestantMin: 60,
        pieces: 3,
        confidence: true,
    },
    {
        id: 'CONF-2026-0019',
        type: 'courrier',
        objet: 'Rapport d\'audit interne- Exercice 2025',
        produitPar: 'Contrôleur Interne',
        source: 'SP-SG',
        priorite: 'confidentiel',
        etat: 'a-cocher',
        vuBonASigner: {
            date: '2026-09-29T06:30:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        arriveDG: {
            date: '2026-09-29T07:00:00',
        },
        decisionDG: null,
        tempsRestantMin: 300,
        pieces: 5,
        confidence: true,
    },

    /* ============================================
       NORMAUX
       ============================================ */
    {
        id: '2026-0448',
        type: 'courrier',
        objet: "Recrutement d'un assistant à l'IGIT",
        produitPar: 'DRH',
        source: 'SP-SG',
        priorite: 'normal',
        etat: 'a-cocher',
        vuBonASigner: {
            date: '2026-09-27T14:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        arriveDG: {
            date: '2026-09-27T15:00:00',
        },
        decisionDG: null,
        tempsRestantMin: 240,
        pieces: 4,
        confidence: false,
    },
    {
        id: 'ACT-2026-0443',
        type: 'acte',
        objet: 'Certificat de travail- M. SAWADOGO Bakary',
        produitPar: 'DRH',
        source: 'SP-SG',
        priorite: 'normal',
        etat: 'a-cocher',
        vuBonASigner: {
            date: '2026-09-27T09:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        arriveDG: {
            date: '2026-09-27T10:00:00',
        },
        decisionDG: null,
        tempsRestantMin: 300,
        pieces: 1,
        confidence: false,
    },
    {
        id: 'ACT-2026-0412',
        type: 'acte',
        objet: 'Attestation d\'absence- M. OUÉDRAOGO Karim',
        produitPar: 'DRH',
        source: 'SP-SG',
        priorite: 'normal',
        etat: 'a-cocher',
        vuBonASigner: {
            date: '2026-09-27T14:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        arriveDG: {
            date: '2026-09-27T14:30:00',
        },
        decisionDG: null,
        tempsRestantMin: 180,
        pieces: 1,
        confidence: false,
    },

    /* ============================================
       DÉJÀ TRAITÉS (historique récent)
       ============================================ */
    {
        id: 'ACT-2026-0405',
        type: 'acte',
        objet: 'Décision de congé administratif- M. KABORÉ Issa',
        produitPar: 'DRH',
        source: 'SP-SG',
        priorite: 'normal',
        etat: 'signe',
        vuBonASigner: {
            date: '2026-09-24T09:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        arriveDG: {
            date: '2026-09-24T10:00:00',
        },
        decisionDG: {
            type: 'signe',
            date: '2026-09-25T14:30:00',
            par: 'Pr. NIKIÉMA Adama (DG)',
            coche: {
                date: '2026-09-25T14:35:00',
                par: 'Mme OUATTARA Rasmata (SP-DG)',
            },
        },
        tempsRestantMin: 9999,
        pieces: 1,
        confidence: false,
    },
    {
        id: 'ACT-2026-0402',
        type: 'acte',
        objet: 'Certificat de prise de service- Mme ZONGO Aïcha',
        produitPar: 'DRH',
        source: 'SP-SG',
        priorite: 'normal',
        etat: 'signe',
        vuBonASigner: {
            date: '2026-09-20T16:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        arriveDG: {
            date: '2026-09-20T17:00:00',
        },
        decisionDG: {
            type: 'sg-delegation',
            date: '2026-09-21T11:20:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
            coche: {
                date: '2026-09-21T11:25:00',
                par: 'Mme OUATTARA Rasmata (SP-DG)',
            },
        },
        tempsRestantMin: 9999,
        pieces: 1,
        confidence: false,
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_ETAT = [
    { value: '', label: 'Tous les états' },
    { value: 'a-cocher', label: 'En attente de coche' },
    { value: 'signe', label: 'Signés' },
    { value: 'sg-delegation', label: 'Signés par délégation' },
    { value: 'rejete', label: 'Rejetés' },
];

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