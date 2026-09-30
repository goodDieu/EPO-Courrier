// src/data/aValiderDG.js

/* ============================================================
   TYPES DE DOCUMENTS À VALIDER
   ============================================================ */

export const TYPES_A_VALIDER = {
    'note-orientation': {
        key: 'note-orientation',
        label: "Note d'orientation",
        icon: 'fa-compass',
        color: 'bg-epo-green-50 text-epo-green-700',
    },
    'note-service': {
        key: 'note-service',
        label: 'Note de service',
        icon: 'fa-sticky-note',
        color: 'bg-epo-slate-100 text-epo-slate-700',
    },
    'projet-accord': {
        key: 'projet-accord',
        label: 'Projet d\'accord',
        icon: 'fa-handshake',
        color: 'bg-epo-yellow-50 text-epo-yellow-700',
    },
    'rapport': {
        key: 'rapport',
        label: 'Rapport',
        icon: 'fa-chart-bar',
        color: 'bg-epo-slate-100 text-epo-slate-700',
    },
    'programme': {
        key: 'programme',
        label: 'Programme / Plan',
        icon: 'fa-calendar-check',
        color: 'bg-epo-green-50 text-epo-green-700',
    },
    'arbitrage': {
        key: 'arbitrage',
        label: 'Demande d\'arbitrage',
        icon: 'fa-scale-balanced',
        color: 'bg-epo-red-50 text-epo-red-700',
    },
};

/* ============================================================
   MOTIFS DE REFUS (§8.7)
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

export function computeNiveau(tempsRestantMin) {
    if (tempsRestantMin < 0) return 'depasse';
    if (tempsRestantMin < 12 * 60) return 'jourJ';
    if (tempsRestantMin < 24 * 60) return 'urgent';
    if (tempsRestantMin < 72 * 60) return 'surveiller';
    return 'ok';
}

/* ============================================================
   DOCUMENTS À VALIDER
   ============================================================ */

export const DOCUMENTS_A_VALIDER = [
    /* ============================================
       URGENTS
       ============================================ */
    {
        id: 'VAL-2026-0042',
        type: 'arbitrage',
        objet: 'Arbitrage sur la répartition budgétaire Q4 -DGA-AVE vs DGA-RCP',
        provenence: 'SG',
        priorite: 'urgent',
        etat: 'en-attente-validation',
        tempsRestantMin: 240,
        dateReceptionDG: '2026-09-29T08:00:00',
        dateDocument: '2026-09-28',
        expediteur: 'M. OUÉDRAOGO Salif (SG)',
        produitPar: 'SG',
        description: "Demande d'arbitrage sur la répartition des crédits du 4e trimestre entre les deux directions générales adjointes.",
        contenu: 'Les deux DGA ont formulé des demandes incompatibles. Une décision du DG est requise pour arbitrer.',
        pieces: ['Demande DGA-AVE', 'Demande DGA-RCP', 'Avis SG', 'État budgétaire Q4'],
    },
    {
        id: 'VAL-2026-0040',
        type: 'note-orientation',
        objet: "Note d'orientation -Politique de partenariats internationaux 2027-2030",
        provenence: 'DCPIP',
        priorite: 'urgent',
        etat: 'en-attente-validation',
        tempsRestantMin: 480,
        dateReceptionDG: '2026-09-29T07:30:00',
        dateDocument: '2026-09-27',
        expediteur: 'Mme BOUDA Céline (DCPIP)',
        produitPar: 'DCPIP',
        description: "Proposition de cadre stratégique pour les partenariats internationaux sur la période 2027-2030.",
        contenu: "Note d'orientation soumise à validation avant transmission au conseil scientifique.",
        pieces: ['Note d\'orientation complète', 'Cartographie des partenaires', 'Avis DCPIP'],
    },

    /* ============================================
       NORMALES
       ============================================ */
    {
        id: 'VAL-2026-0038',
        type: 'programme',
        objet: 'Programme annuel des soutenances 2026-2027',
        provenence: 'DGA-AVE',
        priorite: 'normal',
        etat: 'en-attente-validation',
        tempsRestantMin: 2880,
        dateReceptionDG: '2026-09-28T14:00:00',
        dateDocument: '2026-09-27',
        expediteur: 'Pr. TANKOANO Martin (DGA-AVE)',
        produitPar: 'DGA-AVE',
        description: "Calendrier prévisionnel des soutenances pour l'année académique 2026-2027.",
        contenu: 'Le programme respecte les contraintes calendaires. À valider avant diffusion aux départements.',
        pieces: ['Programme détaillé', 'Calendrier académique'],
    },
    {
        id: 'VAL-2026-0036',
        type: 'rapport',
        objet: "Rapport d'activité S2 2026 -Direction des Ressources Humaines",
        provenence: 'DRH',
        priorite: 'normal',
        etat: 'en-attente-validation',
        tempsRestantMin: 4320,
        dateReceptionDG: '2026-09-27T15:00:00',
        dateDocument: '2026-09-25',
        expediteur: 'M. COMPAORÉ Ali (DRH)',
        produitPar: 'DRH',
        description: "Rapport semestriel d'activité de la DRH (S2 2026).",
        contenu: 'Rapport complet sur les activités RH : recrutements, actes, formation, effectifs.',
        pieces: ['Rapport complet', 'Annexes statistiques'],
    },
    {
        id: 'VAL-2026-0034',
        type: 'projet-accord',
        objet: 'Projet de convention -Partenariat avec l\'Université de Ouagadougou',
        provenence: 'DCPIP',
        priorite: 'normal',
        etat: 'en-attente-validation',
        tempsRestantMin: 5760,
        dateReceptionDG: '2026-09-26T10:00:00',
        dateDocument: '2026-09-24',
        expediteur: 'Mme BOUDA Céline (DCPIP)',
        produitPar: 'DCPIP',
        description: "Projet de convention-cadre de coopération académique avec l'Université Joseph Ki-Zerbo.",
        contenu: 'Projet de convention validé par la DCPIP et conforme aux usages. À valider avant signature officielle.',
        pieces: ['Projet de convention', 'Avis DCPIP', 'Avis juridique'],
    },
    {
        id: 'VAL-2026-0032',
        type: 'note-service',
        objet: "Note de service -Nouvelles modalités d'archivage numérique",
        provenence: 'SCC',
        priorite: 'normal',
        etat: 'en-attente-validation',
        tempsRestantMin: 7200,
        dateReceptionDG: '2026-09-26T09:00:00',
        dateDocument: '2026-09-25',
        expediteur: 'M. TRAORÉ Ibrahim (SCC)',
        produitPar: 'SCC',
        description: "Proposition de nouvelles modalités d'archivage numérique pour les courriers sortants.",
        contenu: 'La note décrit la mise en place progressive du PDF/A et des boîtes physiques associées.',
        pieces: ['Note de service', 'Procédure d\'archivage'],
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_TYPE = [
    { value: '', label: 'Tous les types' },
    ...Object.values(TYPES_A_VALIDER).map((t) => ({ value: t.key, label: t.label })),
];

export const FILTRES_PRIORITE = [
    { value: '', label: 'Toutes les priorités' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'normal', label: 'Normal' },
];

export const FILTRES_PROVENANCE = [
    { value: '', label: 'Toutes les provenances' },
    { value: 'SG', label: 'Secrétariat Général' },
    { value: 'DRH', label: 'Direction RH' },
    { value: 'DCPIP', label: 'DCPIP' },
    { value: 'DAF', label: 'Direction Finances' },
    { value: 'DGA-AVE', label: 'DGA-AVE' },
    { value: 'DGA-RCP', label: 'DGA-RCP' },
    { value: 'SCC', label: 'Service Courrier' },
];

export const OPTIONS_TRI = [
    { value: 'urgence', label: 'Urgence (défaut)' },
    { value: 'recent', label: 'Plus récents' },
    { value: 'ancien', label: 'Plus anciens' },
    { value: 'id-asc', label: 'Numéro croissant' },
    { value: 'id-desc', label: 'Numéro décroissant' },
];