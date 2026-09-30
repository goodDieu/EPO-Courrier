// src/data/parametrageSG.js

/* ============================================================
   PROFIL & PRÉFÉRENCES
   ============================================================ */

export const PROFIL_SG = {
    nom: 'M. OUÉDRAOGO Salif',
    fonction: 'Secrétaire Général',
    email: 'sg@epo.bf',
    telephone: '+226 70 00 00 00',
    structure: 'Secrétariat Général',
    roleLabel: 'Secrétaire Général',
    langue: 'fr',
    fuseau: 'Africa/Ouagadougou',
    formatDate: 'DD/MM/YYYY',
    densite: 'confortable',
};

export const LANGUES = [
    { value: 'fr', label: 'Français' },
];

export const FUSEAUX = [
    { value: 'Africa/Ouagadougou', label: 'Ouagadougou (GMT+0)' },
];

export const FORMATS_DATE = [
    { value: 'DD/MM/YYYY', label: 'JJ/MM/AAAA (français)' },
    { value: 'YYYY-MM-DD', label: 'AAAA-MM-JJ (ISO)' },
];

export const DENSITES = [
    { value: 'confortable', label: 'Confortable' },
    { value: 'compact', label: 'Compact' },
];

/* ============================================================
   DÉLÉGATIONS & INTÉRIM (§6.3, RG-21 à RG-24)
   ============================================================ */

export const DELEGATAIRES = [
    {
        id: 'd1',
        nom: 'Mme SAWADOGO Awa',
        fonction: "Chargée d'études",
        matricule: 'EPO-2019-0203',
        avatar: 'SA',
    },
    {
        id: 'd2',
        nom: 'Mme KABORÉ Fatimata',
        fonction: 'Secrétaire Particulière du SG',
        matricule: 'EPO-2020-0145',
        avatar: 'KF',
    },
];

export const PORTEES_DELEGATION = [
    { key: 'visa', label: 'Viser les dossiers' },
    { key: 'imputation', label: 'Imputer les dossiers' },
    { key: 'renvoi', label: 'Renvoyer pour correction' },
    { key: 'signature', label: 'Signer par délégation du DG', disabled: true, note: 'Non autorisé en mode intérim (RG-23)' },
];

export const DELEGATIONS_ACTIVES = [
    {
        id: 'del-2026-001',
        delegataireId: 'd1',
        delegataire: 'Mme SAWADOGO Awa',
        fonction: "Chargée d'études",
        dateDebut: '2026-09-28T00:00:00',
        dateFin: '2026-10-05T23:59:59',
        portees: ['visa', 'imputation', 'renvoi'],
        modeInterim: true,
        creePar: 'M. OUÉDRAOGO Salif',
        creeLe: '2026-09-27T14:30:00',
        motif: "Congé annuel du SG",
    },
];

export const DELEGATIONS_HISTORIQUE = [
    {
        id: 'del-2026-000',
        delegataire: 'Mme SAWADOGO Awa',
        fonction: "Chargée d'études",
        dateDebut: '2026-08-10T00:00:00',
        dateFin: '2026-08-15T23:59:59',
        portees: ['visa', 'imputation', 'renvoi'],
        modeInterim: true,
        motif: 'Mission officielle',
        cloturee: true,
    },
    {
        id: 'del-2025-012',
        delegataire: 'Mme KABORÉ Fatimata',
        fonction: 'SP-SG',
        dateDebut: '2025-12-20T00:00:00',
        dateFin: '2025-12-31T23:59:59',
        portees: ['visa'],
        modeInterim: false,
        motif: 'Congés de fin d\'année',
        cloturee: true,
    },
];

/* ============================================================
   NOTIFICATIONS (§20)
   ============================================================ */

export const EVENEMENTS_NOTIFICATION = [
    {
        key: 'arrivee-urgente',
        label: 'Arrivée d\'un courrier urgent',
        description: 'Un courrier classé urgent est enregistré au SCC',
        inapp: true,
        email: true,
    },
    {
        key: 'post-visa',
        label: 'Dossier post-visa (retour DG)',
        description: 'Un courrier sortant revient du DG après signature ou rejet',
        inapp: true,
        email: true,
    },
    {
        key: 'rejet-dg',
        label: 'Rejet DG sur un sortant',
        description: 'Le DG a rejeté un courrier sortant (RG-18)',
        inapp: true,
        email: true,
    },
    {
        key: 'echeance-j1',
        label: 'Échéance J-1',
        description: 'Un dossier que vous devez examiner arrive à échéance demain',
        inapp: true,
        email: false,
    },
    {
        key: 'sans-retour',
        label: 'Absence de retour sur une note',
        description: 'Une note interne n\'a pas reçu de retour dans le délai',
        inapp: true,
        email: false,
    },
    {
        key: 'acces-confidentiel',
        label: 'Accès à un dossier confidentiel',
        description: 'Un dossier confidentiel a été consulté par un tiers (RG-13)',
        inapp: true,
        email: true,
    },
    {
        key: 'demande-visa',
        label: 'Nouvelle demande de visa',
        description: 'Un dossier vous est soumis pour visa',
        inapp: true,
        email: true,
    },
    {
        key: 'demande-signature',
        label: 'Nouvelle demande de signature',
        description: 'Un acte vous est soumis pour signature par délégation',
        inapp: true,
        email: true,
    },
    {
        key: 'retard-transmission',
        label: 'Retard de transmission',
        description: 'Une transmission a dépassé le délai de référence (RG-25)',
        inapp: true,
        email: false,
    },
];

/* ============================================================
   VUES SAUVEGARDÉES
   ============================================================ */

export const VUES_SAUVEGARDEES = [
    {
        id: 'vue-1',
        nom: 'Dossiers à examiner aujourd\'hui',
        icone: 'fa-inbox',
        cible: 'Courriers entrants',
        filtres: 'État : Chez SG · Trié par échéance croissante',
        path: '/sg/courriers-entrants?vue=examen',
        couleur: 'bg-epo-red-50 text-epo-red-700',
    },
    {
        id: 'vue-2',
        nom: 'Post-visa en attente',
        icone: 'fa-undo',
        cible: 'Courriers sortants',
        filtres: 'État : Chez SP-DG · Sans retour',
        path: '/sg/courriers-sortants?vue=post-visa',
        couleur: 'bg-epo-yellow-50 text-epo-yellow-700',
    },
    {
        id: 'vue-3',
        nom: 'Échéances < 24h',
        icone: 'fa-clock',
        cible: 'Échéances',
        filtres: 'Niveau : Jour J + Urgent',
        path: '/sg/echeances?vue=24h',
        couleur: 'bg-epo-red-50 text-epo-red-700',
    },
    {
        id: 'vue-4',
        nom: 'Confidentiels en cours',
        icone: 'fa-lock',
        cible: 'Courriers',
        filtres: 'Classification : Confidentiel · État : En cours',
        path: '/sg/courriers-entrants?vue=confidentiels',
        couleur: 'bg-epo-slate-700 text-white',
    },
    {
        id: 'vue-5',
        nom: 'Rejets à traiter',
        icone: 'fa-times-circle',
        cible: 'Courriers sortants',
        filtres: 'État : Rejeté DG · Action requise',
        path: '/sg/courriers-sortants?vue=rejets',
        couleur: 'bg-epo-red-50 text-epo-red-700',
    },
    {
        id: 'vue-6',
        nom: 'Actes en attente de visa',
        icone: 'fa-file-signature',
        cible: 'Actes',
        filtres: 'État : Chez SG (amendement)',
        path: '/sg/actes?vue=visa',
        couleur: 'bg-epo-green-50 text-epo-green-700',
    },
    {
        id: 'vue-7',
        nom: 'Notes sans retour',
        icone: 'fa-reply',
        cible: 'Courriers internes',
        filtres: 'Type : Note interne · Sans retour > 3j',
        path: '/sg/courriers-internes?vue=sans-retour',
        couleur: 'bg-epo-yellow-50 text-epo-yellow-700',
    },
    {
        id: 'vue-8',
        nom: 'Tournées en retard',
        icone: 'fa-truck',
        cible: 'Transmissions',
        filtres: 'État : En retard',
        path: '/sg/transmissions?vue=retard',
        couleur: 'bg-epo-red-50 text-epo-red-700',
    },
];

/* ============================================================
   LISTES DE DIFFUSION (§8.5)
   ============================================================ */

export const LISTES_DIFFUSION = [
    {
        id: 'liste-directeurs',
        nom: 'Tous les directeurs',
        destinataires: 12,
        description: 'Ensemble des directeurs et chefs de service de l\'EPO',
        icone: 'fa-users',
    },
    {
        id: 'liste-conseil',
        nom: 'Conseil scientifique',
        destinataires: 8,
        description: 'Membres du conseil scientifique',
        icone: 'fa-flask',
    },
    {
        id: 'liste-sp',
        nom: 'SP-SG + SP-DG',
        destinataires: 2,
        description: 'Secrétariats particuliers',
        icone: 'fa-user-tie',
    },
    {
        id: 'liste-dga',
        nom: 'DGA-AVE + DGA-RCP',
        destinataires: 2,
        description: 'Directions générales adjointes',
        icone: 'fa-layer-group',
    },
    {
        id: 'liste-drh-daf',
        nom: 'DRH + DAF',
        destinataires: 6,
        description: 'Directions support (RH et finances)',
        icone: 'fa-briefcase',
    },
    {
        id: 'liste-chefs-dept',
        nom: 'Chefs de département',
        destinataires: 15,
        description: 'Chefs de département pédagogiques',
        icone: 'fa-graduation-cap',
    },
];

/* ============================================================
   DESTINATAIRES FAVORIS
   ============================================================ */

export const DESTINATAIRES_FAVORIS = [
    { id: 'fav-1', nom: 'Pr. NIKIÉMA Adama', fonction: 'Directeur Général', structure: 'DG' },
    { id: 'fav-2', nom: 'Mme OUATTARA Rasmata', fonction: 'SP-DG', structure: 'SP-DG' },
    { id: 'fav-3', nom: 'M. COMPAORÉ Ali', fonction: 'Directeur RH', structure: 'DRH' },
    { id: 'fav-4', nom: 'Mme SANOU Mariam', fonction: 'Directrice Finances', structure: 'DAF' },
    { id: 'fav-5', nom: 'M. TRAORÉ Ibrahim', fonction: 'Chef SCC', structure: 'SCC' },
    { id: 'fav-6', nom: 'M. KONATÉ Souleymane', fonction: 'PRMP', structure: 'PRMP' },
];

/* ============================================================
   AGENDA & INDISPONIBILITÉS
   ============================================================ */

export const INDISPONIBILITES = [
    {
        id: 'ind-1',
        type: 'conge',
        label: 'Congé annuel',
        dateDebut: '2026-09-28T00:00:00',
        dateFin: '2026-10-05T23:59:59',
        delegataire: 'Mme SAWADOGO Awa',
        active: true,
    },
    {
        id: 'ind-2',
        type: 'mission',
        label: 'Mission officielle à Paris',
        dateDebut: '2026-10-15T00:00:00',
        dateFin: '2026-10-20T23:59:59',
        delegataire: 'Mme SAWADOGO Awa',
        active: false,
    },
];

export const TYPES_INDISPONIBILITE = [
    { value: 'conge', label: 'Congé' },
    { value: 'mission', label: 'Mission' },
    { value: 'absence', label: 'Absence' },
    { value: 'formation', label: 'Formation' },
];

/* ============================================================
   MAQUETTES FAVORITES
   ============================================================ */

export const MAQUETTES_FAVORITES = [
    { id: 'mq-1', nom: 'Bordereau d\'envoi', prefix: 'BE', nature: 'bordereau' },
    { id: 'mq-2', nom: 'Lettre de transmission', prefix: 'LT', nature: 'lettre' },
    { id: 'mq-3', nom: 'Certificat de prise de service', prefix: 'CPS', nature: 'certificat-prise' },
    { id: 'mq-4', nom: 'Autorisation d\'absence', prefix: 'AA', nature: 'autorisation-absence' },
];

/* ============================================================
   SIGNATURE PAR DÉLÉGATION (§7.1, RG-22)
   ============================================================ */

export const SIGNATURE_DELEGATION = {
    mention: 'Pour le Directeur général et par délégation, le Secrétaire général',
    prenomNom: 'Salif OUÉDRAOGO',
    fonction: 'Secrétaire Général',
    signataireDepuis: '2026-01-15',
};