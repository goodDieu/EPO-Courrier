// src/data/confidentielDG.js

/* ============================================================
   TYPES DE DOSSIERS CONFIDENTIELS
   ============================================================ */

export const TYPES_CONFIDENTIELS = {
    convention: {
        key: 'convention',
        label: 'Convention confidentielle',
        icon: 'fa-handshake',
        color: 'bg-epo-slate-700 text-white',
    },
    sanction: {
        key: 'sanction',
        label: 'Sanction disciplinaire',
        icon: 'fa-gavel',
        color: 'bg-epo-red-700 text-white',
    },
    recrutement: {
        key: 'recrutement',
        label: 'Recrutement sensible',
        icon: 'fa-user-shield',
        color: 'bg-epo-slate-700 text-white',
    },
    audit: {
        key: 'audit',
        label: 'Audit / Contrôle',
        icon: 'fa-search-dollar',
        color: 'bg-epo-slate-700 text-white',
    },
    financier: {
        key: 'financier',
        label: 'Dossier financier',
        icon: 'fa-coins',
        color: 'bg-epo-slate-700 text-white',
    },
    partenariat: {
        key: 'partenariat',
        label: 'Partenariat stratégique',
        icon: 'fa-globe',
        color: 'bg-epo-slate-700 text-white',
    },
};

/* ============================================================
   TYPES D'ACCÈS (RG-13)
   ============================================================ */

export const TYPES_ACCES = {
    consultation: {
        key: 'consultation',
        label: 'Consultation',
        icon: 'fa-eye',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
    },
    impression: {
        key: 'impression',
        label: 'Impression',
        icon: 'fa-print',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
    },
    telechargement: {
        key: 'telechargement',
        label: 'Téléchargement',
        icon: 'fa-download',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
    },
    refus: {
        key: 'refus',
        label: 'Tentative refusée',
        icon: 'fa-ban',
        chip: 'bg-epo-red-50 text-epo-red-700',
    },
    autorisation: {
        key: 'autorisation',
        label: 'Autorisation accordée',
        icon: 'fa-key',
        chip: 'bg-epo-green-50 text-epo-green-700',
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
   DOCUMENTS CONFIDENTIELS
   ============================================================ */

export const DOSSIERS_CONFIDENTIELS = [
    /* ============================================
       URGENTS
       ============================================ */
    {
        id: 'CONF-2026-0021',
        type: 'sanction',
        objet: 'Décision de sanction disciplinaire -Agent X',
        provenence: 'DRH',
        priorite: 'urgent',
        etat: 'chez-dg',
        tempsRestantMin: 240,
        dateReceptionDG: '2026-09-29T08:00:00',
        dateDocument: '2026-09-28',
        expediteur: 'M. COMPAORÉ Ali (DRH)',
        produitPar: 'DRH',
        description: 'Décision relative à une sanction disciplinaire de premier degré.',
        contenu: 'Document strictement confidentiel. À traiter hors réunion, hors présence de tiers.',
        pieces: ['Rapport disciplinaire', 'Procès-verbal d\'audition', 'Avis commission'],
        listeBlanche: [
            { id: 'u1', nom: 'M. OUÉDRAOGO Salif', fonction: 'Secrétaire Général', acces: 'lecture' },
            { id: 'u2', nom: 'M. COMPAORÉ Ali', fonction: 'Directeur RH', acces: 'lecture-ecriture' },
            { id: 'u3', nom: 'Pr. NIKIÉMA Adama', fonction: 'Directeur Général', acces: 'signature' },
        ],
        nbConsultations: 8,
        dernierAcces: '2026-09-29T08:45:00',
    },
    {
        id: 'CONF-2026-0019',
        type: 'audit',
        objet: 'Rapport d\'audit interne -Exercice 2025',
        provenence: 'SG',
        priorite: 'urgent',
        etat: 'chez-dg',
        tempsRestantMin: 480,
        dateReceptionDG: '2026-09-29T07:30:00',
        dateDocument: '2026-09-26',
        expediteur: 'M. OUÉDRAOGO Salif (SG)',
        produitPar: 'Contrôleur Interne',
        description: 'Rapport annuel d\'audit interne sur l\'exercice 2025.',
        contenu: 'Analyse des anomalies comptables et recommandations. Diffusion restreinte au DG et SG.',
        pieces: ['Rapport complet', 'Annexes financières', 'Recommandations'],
        listeBlanche: [
            { id: 'u1', nom: 'M. OUÉDRAOGO Salif', fonction: 'Secrétaire Général', acces: 'lecture' },
            { id: 'u3', nom: 'Pr. NIKIÉMA Adama', fonction: 'Directeur Général', acces: 'signature' },
        ],
        nbConsultations: 3,
        dernierAcces: '2026-09-29T08:15:00',
    },

    /* ============================================
       NORMALES
       ============================================ */
    {
        id: 'CONF-2026-0017',
        type: 'convention',
        objet: 'Convention de partenariat -Université de Lyon',
        provenence: 'DCPIP',
        priorite: 'normal',
        etat: 'chez-dg',
        tempsRestantMin: 2880,
        dateReceptionDG: '2026-09-27T16:00:00',
        dateDocument: '2026-09-21',
        expediteur: 'Mme BOUDA Céline (DCPIP)',
        produitPar: 'DCPIP',
        description: 'Convention de partenariat pour la mobilité des enseignants et des étudiants.',
        contenu: 'Document confidentiel. Veuillez signer la convention après lecture.',
        pieces: ['Projet de convention', 'Avis DCPIP', 'Autorisation d\'accès confidentiel'],
        listeBlanche: [
            { id: 'u1', nom: 'M. OUÉDRAOGO Salif', fonction: 'Secrétaire Général', acces: 'lecture' },
            { id: 'u4', nom: 'Mme BOUDA Céline', fonction: 'Directrice DCPIP', acces: 'lecture-ecriture' },
            { id: 'u3', nom: 'Pr. NIKIÉMA Adama', fonction: 'Directeur Général', acces: 'signature' },
        ],
        nbConsultations: 12,
        dernierAcces: '2026-09-28T14:30:00',
    },
    {
        id: 'CONF-2026-0015',
        type: 'recrutement',
        objet: 'Recrutement -Poste de Directeur des Systèmes d\'Information',
        provenence: 'DRH',
        priorite: 'normal',
        etat: 'chez-dg',
        tempsRestantMin: 4320,
        dateReceptionDG: '2026-09-26T11:00:00',
        dateDocument: '2026-09-24',
        expediteur: 'M. COMPAORÉ Ali (DRH)',
        produitPar: 'DRH',
        description: 'Dossier de recrutement pour un poste de DSI.',
        contenu: 'Dossier sensible compte tenu du poste. Accès restreint à la commission.',
        pieces: ['Fiche de poste', 'Liste des candidats', 'Grille d\'évaluation'],
        listeBlanche: [
            { id: 'u1', nom: 'M. OUÉDRAOGO Salif', fonction: 'Secrétaire Général', acces: 'lecture' },
            { id: 'u2', nom: 'M. COMPAORÉ Ali', fonction: 'Directeur RH', acces: 'lecture-ecriture' },
            { id: 'u3', nom: 'Pr. NIKIÉMA Adama', fonction: 'Directeur Général', acces: 'signature' },
        ],
        nbConsultations: 5,
        dernierAcces: '2026-09-27T09:00:00',
    },
    {
        id: 'CONF-2026-0012',
        type: 'financier',
        objet: 'Dossier financier -Négociation avec bailleur international',
        provenence: 'DAF',
        priorite: 'normal',
        etat: 'chez-dg',
        tempsRestantMin: 5760,
        dateReceptionDG: '2026-09-25T10:00:00',
        dateDocument: '2026-09-23',
        expediteur: 'Mme SANOU Mariam (DAF)',
        produitPar: 'DAF',
        description: 'Dossier de négociation avec un bailleur international.',
        contenu: 'Éléments financiers confidentiels concernant la négociation en cours.',
        pieces: ['Termes de référence', 'Offre financière', 'Analyse DAF'],
        listeBlanche: [
            { id: 'u1', nom: 'M. OUÉDRAOGO Salif', fonction: 'Secrétaire Général', acces: 'lecture' },
            { id: 'u5', nom: 'Mme SANOU Mariam', fonction: 'Directrice Finances', acces: 'lecture-ecriture' },
            { id: 'u3', nom: 'Pr. NIKIÉMA Adama', fonction: 'Directeur Général', acces: 'signature' },
        ],
        nbConsultations: 7,
        dernierAcces: '2026-09-26T15:20:00',
    },
];

/* ============================================================
   JOURNAL D'ACCÈS (RG-13)
   ============================================================ */

export const JOURNAL_ACCES = [
    {
        id: 'LOG-2026-0451',
        documentId: 'CONF-2026-0021',
        documentObjet: 'Décision de sanction disciplinaire -Agent X',
        utilisateur: 'M. OUÉDRAOGO Salif',
        fonction: 'Secrétaire Général',
        typeAcces: 'consultation',
        date: '2026-09-29T08:45:00',
        adresseIP: '10.0.0.42',
    },
    {
        id: 'LOG-2026-0450',
        documentId: 'CONF-2026-0019',
        documentObjet: 'Rapport d\'audit interne -Exercice 2025',
        utilisateur: 'Pr. NIKIÉMA Adama',
        fonction: 'Directeur Général',
        typeAcces: 'consultation',
        date: '2026-09-29T08:15:00',
        adresseIP: '10.0.0.10',
    },
    {
        id: 'LOG-2026-0449',
        documentId: 'CONF-2026-0017',
        documentObjet: 'Convention de partenariat -Université de Lyon',
        utilisateur: 'Mme BOUDA Céline',
        fonction: 'Directrice DCPIP',
        typeAcces: 'telechargement',
        date: '2026-09-28T14:30:00',
        adresseIP: '10.0.0.88',
    },
    {
        id: 'LOG-2026-0448',
        documentId: 'CONF-2026-0021',
        documentObjet: 'Décision de sanction disciplinaire -Agent X',
        utilisateur: 'Utilisateur inconnu',
        fonction: 'SCC',
        typeAcces: 'refus',
        date: '2026-09-28T11:15:00',
        adresseIP: '10.0.0.55',
        raison: 'Non présent dans la liste blanche (RG-11)',
    },
    {
        id: 'LOG-2026-0447',
        documentId: 'CONF-2026-0015',
        documentObjet: 'Recrutement -Poste de DSI',
        utilisateur: 'M. COMPAORÉ Ali',
        fonction: 'Directeur RH',
        typeAcces: 'impression',
        date: '2026-09-27T09:00:00',
        adresseIP: '10.0.0.33',
    },
    {
        id: 'LOG-2026-0446',
        documentId: 'CONF-2026-0012',
        documentObjet: 'Dossier financier -Bailleur international',
        utilisateur: 'Mme SANOU Mariam',
        fonction: 'Directrice Finances',
        typeAcces: 'consultation',
        date: '2026-09-26T15:20:00',
        adresseIP: '10.0.0.27',
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_TYPE = [
    { value: '', label: 'Tous les types' },
    ...Object.values(TYPES_CONFIDENTIELS).map((t) => ({ value: t.key, label: t.label })),
];

export const FILTRES_PRIORITE = [
    { value: '', label: 'Toutes les priorités' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'normal', label: 'Normal' },
];