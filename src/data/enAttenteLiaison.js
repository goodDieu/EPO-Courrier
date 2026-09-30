// src/data/enAttenteLiaison.js

/* ============================================================
   MOTIFS DE BLOCAGE
   ============================================================ */

export const MOTIFS_BLOCAGE = {
    'destinataire-absent': {
        key: 'destinataire-absent',
        label: 'Destinataire absent',
        shortLabel: 'Absent',
        icon: 'fa-user-slash',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
        description: 'Le destinataire était absent lors de la remise',
        actionsResolues: [
            { key: 'reprogrammer', label: 'Reprogrammer', icon: 'fa-redo' },
            { key: 'remettre-tiers', label: 'Remettre à un tiers', icon: 'fa-user-friends' },
        ],
    },
    'adresse-erronee': {
        key: 'adresse-erronee',
        label: 'Adresse / localisation erronée',
        shortLabel: 'Adresse',
        icon: 'fa-map-marked-alt',
        chip: 'bg-epo-red-50 text-epo-red-700',
        description: 'Le bureau indiqué n\'existe pas ou est erroné',
        actionsResolues: [
            { key: 'signaler-scc', label: 'Signaler au SCC', icon: 'fa-exclamation-triangle' },
        ],
    },
    'dossier-incomplet': {
        key: 'dossier-incomplet',
        label: 'Dossier incomplet',
        shortLabel: 'Incomplet',
        icon: 'fa-file-excel',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
        description: 'Pièces manquantes ou incohérentes',
        actionsResolues: [
            { key: 'renvoyer', label: 'Renvoyer au producteur', icon: 'fa-undo' },
        ],
    },
    'acces-restreint': {
        key: 'acces-restreint',
        label: 'Accès restreint',
        shortLabel: 'Accès',
        icon: 'fa-lock',
        chip: 'bg-epo-slate-800 text-white',
        description: 'Document confidentiel - remise à personne habilitée uniquement',
        actionsResolues: [
            { key: 'verifier-habilitation', label: 'Vérifier l\'habilitation', icon: 'fa-shield-halved' },
        ],
    },
    'autre': {
        key: 'autre',
        label: 'Autre',
        shortLabel: 'Autre',
        icon: 'fa-question-circle',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
        description: 'Autre motif à préciser',
        actionsResolues: [
            { key: 'contacter-chef', label: 'Contacter le chef SCC', icon: 'fa-phone' },
        ],
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

export function formatDuree(min) {
    const abs = Math.abs(min);
    if (abs < 60) return `${abs}min`;
    const h = Math.floor(abs / 60);
    const m = abs % 60;
    if (h < 24) return m > 0 ? `${h}h ${m}min` : `${h}h`;
    return `${Math.floor(h / 24)}j ${h % 24}h`;
}

/**
 * Retourne un indicateur d'ancienneté du blocage.
 */
export function getAncienneteBlocage(tempsBlocageMin) {
    if (tempsBlocageMin < 60) return { label: 'Récent', chip: 'bg-epo-green-50 text-epo-green-700' };
    if (tempsBlocageMin < 240) return { label: 'Attention', chip: 'bg-epo-slate-100 text-epo-slate-700' };
    if (tempsBlocageMin < 480) return { label: 'Urgent', chip: 'bg-epo-yellow-50 text-epo-yellow-700' };
    return { label: 'Critique', chip: 'bg-epo-red-50 text-epo-red-700' };
}

/* ============================================================
   DOCUMENTS EN ATTENTE
   ============================================================ */

export const DOCUMENTS_EN_ATTENTE = [
    /* ============================================
       DESTINATAIRE ABSENT
       ============================================ */
    {
        id: 'ATT-2026-0018',
        documentNumero: '2026-0435',
        documentObjet: "Demande d'explication sur les dépenses Q3",
        documentType: 'courrier',
        priorite: 'urgent',
        motifBlocage: 'destinataire-absent',
        motifDetails: 'Bureau fermé. Secrétariat indisponible.',
        tempsBlocage: 180,
        dateSignalement: '2026-09-29T09:30:00',
        signalePar: 'M. SAWADOGO Bakary',
        destinataire: {
            structure: 'DAF',
            personne: 'Mme SANOU Mariam',
            qualite: 'Directrice des Finances',
            localisation: 'Bâtiment A · Bureau 204',
        },
        actionRecommandee: 'reprogrammer',
        historique: [
            {
                date: '2026-09-29T09:30:00',
                auteur: 'M. SAWADOGO Bakary',
                action: 'Blocage signalé - Destinataire absent',
            },
        ],
    },
    {
        id: 'ATT-2026-0017',
        documentNumero: 'ACT-2026-0410',
        documentObjet: 'Ordre de mission - M. COMPAORÉ Ali',
        documentType: 'acte',
        priorite: 'normal',
        motifBlocage: 'destinataire-absent',
        motifDetails: 'En réunion externe toute la matinée.',
        tempsBlocage: 120,
        dateSignalement: '2026-09-29T10:15:00',
        signalePar: 'M. SAWADOGO Bakary',
        destinataire: {
            structure: 'DRH',
            personne: 'M. COMPAORÉ Ali',
            qualite: 'Directeur RH',
            localisation: 'Bâtiment B · Bureau 108',
        },
        actionRecommandee: 'remettre-tiers',
        historique: [
            {
                date: '2026-09-29T10:15:00',
                auteur: 'M. SAWADOGO Bakary',
                action: 'Blocage signalé - Destinataire absent',
            },
        ],
    },

    /* ============================================
       ADRESSE ERRONÉE
       ============================================ */
    {
        id: 'ATT-2026-0016',
        documentNumero: '2026-0438',
        documentObjet: 'Transmission du PV de délibération du personnel',
        documentType: 'courrier',
        priorite: 'normal',
        motifBlocage: 'adresse-erronee',
        motifDetails: 'Le bureau indiqué (Bâtiment B · Bureau 108) est erroné. La DRH est au Bâtiment B · Bureau 112.',
        tempsBlocage: 300,
        dateSignalement: '2026-09-29T08:45:00',
        signalePar: 'M. SAWADOGO Bakary',
        destinataire: {
            structure: 'DRH',
            personne: 'M. COMPAORÉ Ali',
            qualite: 'Directeur RH',
            localisation: 'Bâtiment B · Bureau 108 (à corriger)',
        },
        actionRecommandee: 'signaler-scc',
        historique: [
            {
                date: '2026-09-29T08:45:00',
                auteur: 'M. SAWADOGO Bakary',
                action: 'Blocage signalé - Adresse erronée',
            },
        ],
    },

    /* ============================================
       DOSSIER INCOMPLET
       ============================================ */
    {
        id: 'ATT-2026-0015',
        documentNumero: 'ACT-2026-0405',
        documentObjet: 'Décision de congé - M. KABORÉ Issa',
        documentType: 'acte',
        priorite: 'normal',
        motifBlocage: 'dossier-incomplet',
        motifDetails: 'Le timbre fiscal n\'est pas joint à la décision.',
        tempsBlocage: 480,
        dateSignalement: '2026-09-28T14:00:00',
        signalePar: 'Mme ZONGO Aïcha',
        destinataire: {
            structure: 'DRH',
            personne: 'M. KABORÉ Issa',
            qualite: 'Assistant administratif',
            localisation: 'Bâtiment B · Bureau 108',
        },
        actionRecommandee: 'renvoyer',
        historique: [
            {
                date: '2026-09-28T14:00:00',
                auteur: 'Mme ZONGO Aïcha',
                action: 'Blocage signalé - Dossier incomplet',
            },
            {
                date: '2026-09-28T14:30:00',
                auteur: 'SCC',
                action: 'Retourné au producteur (DRH) pour complément',
            },
        ],
    },

    /* ============================================
       ACCÈS RESTREINT
       ============================================ */
    {
        id: 'ATT-2026-0014',
        documentNumero: 'CONF-2026-0017',
        documentObjet: 'Convention de partenariat - Université de Lyon',
        documentType: 'courrier',
        priorite: 'confidentiel',
        motifBlocage: 'acces-restreint',
        motifDetails: 'Document confidentiel. Le destinataire doit être personnellement habilité (RG-11).',
        tempsBlocage: 240,
        dateSignalement: '2026-09-29T09:00:00',
        signalePar: 'M. TRAORÉ Ibrahim',
        destinataire: {
            structure: 'DCPIP',
            personne: 'Mme BOUDA Céline',
            qualite: 'Directrice DCPIP',
            localisation: 'Bâtiment D · Bureau 401',
        },
        actionRecommandee: 'verifier-habilitation',
        historique: [
            {
                date: '2026-09-29T09:00:00',
                auteur: 'M. TRAORÉ Ibrahim',
                action: 'Blocage signalé - Vérification d\'habilitation nécessaire',
            },
        ],
    },

    /* ============================================
       AUTRE
       ============================================ */
    {
        id: 'ATT-2026-0013',
        documentNumero: '2026-0488',
        documentObjet: 'Demande de congé - M. TRAORÉ',
        documentType: 'courrier',
        priorite: 'normal',
        motifBlocage: 'autre',
        motifDetails: 'Le destinataire a demandé un report de la remise à demain matin.',
        tempsBlocage: 60,
        dateSignalement: '2026-09-29T11:00:00',
        signalePar: 'M. SAWADOGO Bakary',
        destinataire: {
            structure: 'DRH',
            personne: 'M. COMPAORÉ Ali',
            qualite: 'Directeur RH',
            localisation: 'Bâtiment B · Bureau 108',
        },
        actionRecommandee: 'contacter-chef',
        historique: [
            {
                date: '2026-09-29T11:00:00',
                auteur: 'M. SAWADOGO Bakary',
                action: 'Blocage signalé - Report demandé par le destinataire',
            },
        ],
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_MOTIF = [
    { value: '', label: 'Tous les motifs' },
    ...Object.values(MOTIFS_BLOCAGE).map((m) => ({ value: m.key, label: m.label })),
];

export const FILTRES_PRIORITE = [
    { value: '', label: 'Toutes les priorités' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'confidentiel', label: 'Confidentiel' },
    { value: 'normal', label: 'Normal' },
];

export const FILTRES_STRUCTURE = [
    { value: '', label: 'Toutes les structures' },
    { value: 'SG', label: 'Secrétariat Général' },
    { value: 'SCC', label: 'SCC' },
    { value: 'DRH', label: 'DRH' },
    { value: 'DAF', label: 'DAF' },
    { value: 'DCPIP', label: 'DCPIP' },
];

export const OPTIONS_TRI = [
    { value: 'anciennete', label: 'Plus anciens (défaut)' },
    { value: 'recent', label: 'Plus récents' },
    { value: 'priorite', label: 'Par priorité' },
    { value: 'structure', label: 'Par structure' },
];