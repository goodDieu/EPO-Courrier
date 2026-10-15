// src/data/instructionsSPSG.js

/* ============================================================
   TYPES D'INSTRUCTIONS
   ============================================================ */

export const TYPES_INSTRUCTIONS = {
    'avis': {
        key: 'avis',
        label: 'Avis du SG',
        shortLabel: 'Avis',
        icon: 'fa-comment-dots',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
        dot: 'bg-epo-slate-500',
        description: 'Opinion du SG sur le dossier- à consulter avant introduction au SP-DG',
    },
    'instruction': {
        key: 'instruction',
        label: 'Instruction',
        shortLabel: 'Instruction',
        icon: 'fa-tasks',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
        dot: 'bg-epo-yellow-500',
        description: 'Directive d\'action donnée par le SG- à exécuter',
    },
    'imputation': {
        key: 'imputation',
        label: 'Imputation',
        shortLabel: 'Imputation',
        icon: 'fa-share',
        chip: 'bg-epo-green-50 text-epo-green-700',
        dot: 'bg-epo-green-500',
        description: 'Désignation d\'un destinataire- à transmettre au SP-DG',
    },
    'ras': {
        key: 'ras',
        label: 'RAS',
        shortLabel: 'RAS',
        icon: 'fa-check-circle',
        chip: 'bg-epo-slate-100 text-epo-slate-600',
        dot: 'bg-epo-slate-400',
        description: 'Rien à signaler- poursuivre le traitement normal',
    },
    'renvoi': {
        key: 'renvoi',
        label: 'Renvoi pour correction',
        shortLabel: 'Renvoi',
        icon: 'fa-undo',
        chip: 'bg-epo-slate-100 text-epo-slate-900',
        dot: 'bg-epo-red-500',
        description: 'Le SG demande une correction- à renvoyer au SCC ou au producteur',
    },
};

/* ============================================================
   STATUTS DE TRAITEMENT
   ============================================================ */

export const STATUTS_INSTRUCTION = {
    'a-traiter': {
        key: 'a-traiter',
        label: 'À traiter',
        icon: 'fa-clock',
        chip: 'bg-epo-slate-100 text-epo-slate-900',
    },
    'en-cours': {
        key: 'en-cours',
        label: 'En cours',
        icon: 'fa-spinner',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
    },
    'traite': {
        key: 'traite',
        label: 'Traitée',
        icon: 'fa-check-circle',
        chip: 'bg-epo-green-50 text-epo-green-700',
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
   INSTRUCTIONS REÇUES DU SG
   ============================================================ */

export const INSTRUCTIONS_DU_SG = [
    /* ============================================
       INSTRUCTIONS À TRAITER (priorité)
       ============================================ */
    {
        id: 'INST-2026-0145',
        dossierId: '2026-0452',
        dossierObjet: 'Demande de subvention exceptionnelle- Colloque 2026',
        dossierType: 'courrier',
        type: 'instruction',
        contenu: 'À traiter en priorité absolue. Introduire le dossier auprès du DG aujourd\'hui avant 12h. Vérifier la conformité du budget prévisionnel avec l\'avis DAF.',
        auteur: 'M. OUÉDRAOGO Salif (SG)',
        dateEmission: '2026-09-29T08:35:00',
        prioriteInterne: 'urgente',
        delaiInterne: '2026-09-29T12:00:00',
        statut: 'a-traiter',
        tempsDepuisEmission: 120,
        pieces: 3,
    },
    {
        id: 'INST-2026-0144',
        dossierId: '2026-0410',
        dossierObjet: 'Note urgente- Directives ministérielles',
        dossierType: 'courrier',
        type: 'imputation',
        contenu: 'Imputer au DG via le SP-DG. Introduire aujourd\'hui.',
        auteur: 'M. OUÉDRAOGO Salif (SG)',
        dateEmission: '2026-09-29T08:15:00',
        prioriteInterne: 'urgente',
        delaiInterne: '2026-09-29T10:00:00',
        statut: 'a-traiter',
        tempsDepuisEmission: 145,
        pieces: 1,
    },
    {
        id: 'INST-2026-0143',
        dossierId: '2026-0455',
        dossierObjet: 'Réclamation- Personnel contractuel',
        dossierType: 'courrier',
        type: 'renvoi',
        contenu: 'Renvoyer le dossier au SCC pour transmission à la DRH. Ce dossier ne relève pas du circuit SG/DG.',
        auteur: 'M. OUÉDRAOGO Salif (SG)',
        dateEmission: '2026-09-29T07:30:00',
        prioriteInterne: 'normale',
        delaiInterne: '2026-09-29T14:00:00',
        statut: 'a-traiter',
        tempsDepuisEmission: 180,
        pieces: 3,
    },

    /* ============================================
       INSTRUCTIONS EN COURS
       ============================================ */
    {
        id: 'INST-2026-0142',
        dossierId: '2026-0448',
        dossierObjet: "Recrutement d'un assistant à l'IGIT",
        dossierType: 'courrier',
        type: 'instruction',
        contenu: 'Introduire au DG après vérification des pièces RH. Prévoir l\'avis de la DAF.',
        auteur: 'M. OUÉDRAOGO Salif (SG)',
        dateEmission: '2026-09-28T15:30:00',
        prioriteInterne: 'normale',
        delaiInterne: '2026-09-30T10:00:00',
        statut: 'en-cours',
        tempsDepuisEmission: 900,
        pieces: 4,
    },
    {
        id: 'INST-2026-0141',
        dossierId: '2026-0438',
        dossierObjet: 'Transmission du PV de délibération du personnel',
        dossierType: 'courrier',
        type: 'imputation',
        contenu: 'Imputer à la DAF pour archivage. Introduire après validation.',
        auteur: 'M. OUÉDRAOGO Salif (SG)',
        dateEmission: '2026-09-28T09:00:00',
        prioriteInterne: 'normale',
        delaiInterne: '2026-09-30T17:00:00',
        statut: 'en-cours',
        tempsDepuisEmission: 1500,
        pieces: 2,
    },

    /* ============================================
       INSTRUCTIONS TRAITÉES (historique)
       ============================================ */
    {
        id: 'INST-2026-0140',
        dossierId: '2026-0450',
        dossierObjet: "Rapport d'activité semestriel",
        dossierType: 'courrier',
        type: 'avis',
        contenu: 'Avis favorable. Transmettre à la DGA-AVE pour information.',
        auteur: 'M. OUÉDRAOGO Salif (SG)',
        dateEmission: '2026-09-29T08:30:00',
        prioriteInterne: 'normale',
        delaiInterne: null,
        statut: 'traite',
        traiteLe: '2026-09-29T08:45:00',
        traitePar: 'Mme KABORÉ Fatimata (SP-SG)',
        tempsDepuisEmission: 15,
        pieces: 2,
    },
    {
        id: 'INST-2026-0139',
        dossierId: '2026-0460',
        dossierObjet: 'Bordereau d\'envoi- Ministère',
        dossierType: 'courrier',
        type: 'ras',
        contenu: 'RAS- Poursuivre le traitement normal.',
        auteur: 'M. OUÉDRAOGO Salif (SG)',
        dateEmission: '2026-09-28T16:00:00',
        prioriteInterne: 'normale',
        delaiInterne: null,
        statut: 'traite',
        traiteLe: '2026-09-28T16:15:00',
        traitePar: 'Mme KABORÉ Fatimata (SP-SG)',
        tempsDepuisEmission: 15,
        pieces: 1,
    },
    {
        id: 'INST-2026-0138',
        dossierId: '2026-0441',
        dossierObjet: 'Convocation réunion du conseil scientifique',
        dossierType: 'courrier',
        type: 'instruction',
        contenu: 'Introduire auprès du DG. Prévoir une copie pour la DRH.',
        auteur: 'M. OUÉDRAOGO Salif (SG)',
        dateEmission: '2026-09-28T09:30:00',
        prioriteInterne: 'normale',
        delaiInterne: '2026-09-28T14:00:00',
        statut: 'traite',
        traiteLe: '2026-09-28T10:00:00',
        traitePar: 'Mme KABORÉ Fatimata (SP-SG)',
        tempsDepuisEmission: 30,
        pieces: 1,
    },
    {
        id: 'INST-2026-0137',
        dossierId: '2026-0435',
        dossierObjet: "Demande d'explication sur les dépenses Q3",
        dossierType: 'courrier',
        type: 'instruction',
        contenu: 'Introduire au DG en urgence. La DAF est en attente.',
        auteur: 'M. OUÉDRAOGO Salif (SG)',
        dateEmission: '2026-09-28T08:00:00',
        prioriteInterne: 'urgente',
        delaiInterne: '2026-09-28T10:00:00',
        statut: 'traite',
        traiteLe: '2026-09-28T08:30:00',
        traitePar: 'Mme KABORÉ Fatimata (SP-SG)',
        tempsDepuisEmission: 30,
        pieces: 3,
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_TYPE = [
    { value: '', label: 'Tous les types' },
    ...Object.values(TYPES_INSTRUCTIONS).map((t) => ({ value: t.key, label: t.label })),
];

export const FILTRES_STATUT = [
    { value: '', label: 'Tous les statuts' },
    { value: 'a-traiter', label: 'À traiter' },
    { value: 'en-cours', label: 'En cours' },
    { value: 'traite', label: 'Traitées' },
];

export const FILTRES_PRIORITE = [
    { value: '', label: 'Toutes les priorités' },
    { value: 'urgente', label: 'Urgente' },
    { value: 'normale', label: 'Normale' },
];

export const OPTIONS_TRI = [
    { value: 'recent', label: 'Plus récentes (défaut)' },
    { value: 'ancien', label: 'Plus anciennes' },
    { value: 'priorite', label: 'Par priorité interne' },
    { value: 'statut', label: 'Par statut' },
];