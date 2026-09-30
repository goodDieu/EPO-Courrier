// src/data/dispatchSCC.js

/* ============================================================
   MODES DE REMISE
   ============================================================ */

export const MODES_REMISE = {
    liaison: {
        key: 'liaison',
        label: 'Liaison interne',
        shortLabel: 'Liaison',
        description: 'Un agent de liaison porte le document',
        icon: 'fa-truck',
        chip: 'bg-epo-green-50 text-epo-green-700',
        dot: 'bg-epo-green-500',
    },
    'main-propre': {
        key: 'main-propre',
        label: 'Remise en main propre',
        shortLabel: 'Main propre',
        description: 'Le destinataire vient retirer le document',
        icon: 'fa-handshake',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
        dot: 'bg-epo-yellow-500',
    },
    sp: {
        key: 'sp',
        label: 'Remise SP',
        shortLabel: 'SP',
        description: 'Entre secrétariats particuliers',
        icon: 'fa-envelope-open-text',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
        dot: 'bg-epo-slate-500',
    },
};

/* ============================================================
   ÉTATS DE DISPATCH (référence labels)
   ============================================================ */

export const ETATS_DISPATCH = {
    'a-dispatcher': {
        label: 'À dispatcher',
        variant: 'orange',
        description: 'En attente d\'assignation',
    },
    'en-tournee': {
        label: 'En tournée',
        variant: 'blue',
        description: 'Confié à un agent de liaison',
    },
    'remis': {
        label: 'Remis',
        variant: 'green',
        description: 'Physiquement remis, preuve en cours',
    },
    'decharge': {
        label: 'Déchargé',
        variant: 'green',
        description: 'Preuve validée et archivée',
    },
    'en-retard': {
        label: 'En retard',
        variant: 'red',
        description: 'Dépasse le délai de référence',
    },
};

/* ============================================================
   NATURES DE DOCUMENTS (référentiel)
   ============================================================ */

export const NATURES_DOCUMENTS = {
    lettre: { key: 'lettre', label: 'Lettre', icon: 'fa-envelope' },
    demande: { key: 'demande', label: 'Demande', icon: 'fa-hand-paper' },
    offre: { key: 'offre', label: 'Offre', icon: 'fa-file-signature' },
    convention: { key: 'convention', label: 'Convention', icon: 'fa-handshake' },
    convocation: { key: 'convocation', label: 'Convocation', icon: 'fa-calendar-check' },
    attestation: { key: 'attestation', label: 'Attestation', icon: 'fa-file-signature' },
    certificat: { key: 'certificat', label: 'Certificat', icon: 'fa-certificate' },
    decision: { key: 'decision', label: 'Décision', icon: 'fa-gavel' },
    note: { key: 'note', label: 'Note', icon: 'fa-sticky-note' },
    bordereau: { key: 'bordereau', label: 'Bordereau', icon: 'fa-list' },
};

/* ============================================================
   AGENTS DE LIAISON
   ============================================================ */

export const AGENTS_LIAISON = [
    {
        id: 'al1',
        nom: 'M. SAWADOGO Bakary',
        matricule: 'EPO-2018-0087',
        zone: 'Zone A - SG / SP / Directions',
        disponible: true,
        chargeJour: 5,
    },
    {
        id: 'al2',
        nom: 'M. OUÉDRAOGO Karim',
        matricule: 'EPO-2021-0305',
        zone: 'Zone B - DGA / Instituts',
        disponible: true,
        chargeJour: 3,
    },
    {
        id: 'al3',
        nom: 'Mme ZONGO Aïcha',
        matricule: 'EPO-2022-0412',
        zone: 'Zone C - DAF / DRH / PRMP',
        disponible: false,
        chargeJour: 8,
        indisponibleMotif: 'En tournée jusqu\'à 14h',
    },
];

/* ============================================================
   HELPERS DE FORMAT
   ============================================================ */

export function formatDuree(min) {
    const abs = Math.abs(min);
    if (abs < 60) return `${abs}min`;
    const h = Math.floor(abs / 60);
    const m = abs % 60;
    if (h < 24) return m > 0 ? `${h}h ${m}min` : `${h}h`;
    const j = Math.floor(h / 24);
    const hh = h % 24;
    return hh > 0 ? `${j}j ${hh}h` : `${j}j`;
}

export function formatHeure(iso) {
    if (!iso) return '-';
    return new Date(iso).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

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

export function formatDate(iso) {
    if (!iso) return '-';
    return new Date(iso).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

/* ============================================================
   LOGIQUE MÉTIER
   ============================================================ */

/**
 * Devine le mode de remise selon la nature du destinataire.
 * Règle : structure interne EPO → liaison · sinon → main propre.
 */
export function devineModeRemise(destinataireStructure) {
    const structuresInternes = [
        'SG', 'SP-SG', 'SP-DG', 'DG',
        'DRH', 'DAF', 'PRMP', 'SCC',
        'DGA-AVE', 'DGA-RCP', 'DCPIP',
        'Direction', 'Institut',
    ];
    const interne = structuresInternes.some((s) =>
        destinataireStructure.toLowerCase().includes(s.toLowerCase())
    );
    return interne ? 'liaison' : 'main-propre';
}

/**
 * Détermine l'état de dispatch à partir des données brutes.
 * Utilisé pour la cohérence lors du rendu.
 */
export function computeEtatDispatch(dossier) {
    if (dossier.dateDecharge) return 'decharge';
    if (dossier.dateRemise) return 'remis';
    if (dossier.tempsRestantMin < 0) return 'en-retard';
    if (dossier.dateDepart) return 'en-tournee';
    return 'a-dispatcher';
}

/* ============================================================
   DOSSIERS À DISPATCHER (mock)
   ============================================================ */

export const DOSSIERS_DISPATCH = [
    /* ============================================
       EN RETARD - URGENT + DÉPASSÉ (priorité absolue)
       ============================================ */
    {
        id: '2026-0452',
        objet: 'Demande de subvention exceptionnelle pour le colloque international',
        expediteur: "Ministère de l'Enseignement Supérieur",
        classification: 'urgent',
        nature: 'demande',
        structureDestinataire: 'SG',
        destinataire: {
            structure: 'SG',
            personne: 'M. OUÉDRAOGO Salif',
            qualite: 'Secrétaire Général',
        },
        imputePar: 'M. OUÉDRAOGO Salif (SG)',
        dateImputation: '2026-09-29T07:30:00',
        dateReceptionSCC: '2026-09-29T07:00:00',
        tempsRestantMin: -45,
        etat: 'en-retard',
        motifRetard: 'Urgent non traité dans les 30 min',
        modePrevu: 'liaison',
        agentAssigne: null,
        agentId: null,
        dateDepart: null,
        dateRemise: null,
        dateDecharge: null,
        preuve: null,
        pieces: 3,
        prioriteScore: 100,
    },
    {
        id: '2026-0421',
        objet: 'Note de service - Organisation des soutenances',
        expediteur: 'DGA-AVE',
        classification: 'ordinaire',
        nature: 'note',
        structureDestinataire: 'DGA-AVE',
        destinataire: {
            structure: 'DGA-AVE',
            personne: 'Pr. TANKOANO Martin',
            qualite: 'DGA-AVE',
        },
        imputePar: 'M. OUÉDRAOGO Salif (SG)',
        dateImputation: '2026-09-28T16:00:00',
        dateReceptionSCC: '2026-09-28T15:50:00',
        tempsRestantMin: -300,
        etat: 'en-retard',
        motifRetard: 'Destinataire absent - remise reportée',
        modePrevu: 'liaison',
        agentAssigne: 'M. SAWADOGO Bakary',
        agentId: 'al1',
        dateDepart: '2026-09-28T16:30:00',
        dateRemise: null,
        dateDecharge: null,
        preuve: null,
        pieces: 1,
        prioriteScore: 100,
    },
    {
        id: '2026-0419',
        objet: 'Bordereau envoi Ministère - Dossiers étudiants',
        expediteur: 'DGA-RCP',
        classification: 'ordinaire',
        nature: 'bordereau',
        structureDestinataire: 'DGA-RCP',
        destinataire: {
            structure: 'DGA-RCP',
            personne: 'Pr. NIKIÉMA Arsène',
            qualite: 'DGA-RCP',
        },
        imputePar: 'M. OUÉDRAOGO Salif (SG)',
        dateImputation: '2026-09-28T14:00:00',
        dateReceptionSCC: '2026-09-28T13:45:00',
        tempsRestantMin: -480,
        etat: 'en-retard',
        motifRetard: 'Agent indisponible',
        modePrevu: 'liaison',
        agentAssigne: 'Mme ZONGO Aïcha',
        agentId: 'al3',
        dateDepart: '2026-09-28T14:30:00',
        dateRemise: null,
        dateDecharge: null,
        preuve: null,
        pieces: 8,
        prioriteScore: 100,
    },

    /* ============================================
       CONFIDENTIEL (priorité haute)
       ============================================ */
    {
        id: '2026-0445',
        objet: 'Convention de partenariat - Université de Lyon',
        expediteur: 'Ambassade de France',
        classification: 'confidentiel',
        nature: 'convention',
        structureDestinataire: 'SP-DG',
        destinataire: {
            structure: 'SP-DG',
            personne: 'Mme OUATTARA Rasmata',
            qualite: 'SP-DG',
        },
        imputePar: 'M. OUÉDRAOGO Salif (SG)',
        dateImputation: '2026-09-29T08:15:00',
        dateReceptionSCC: '2026-09-29T08:00:00',
        tempsRestantMin: 90,
        etat: 'a-dispatcher',
        modePrevu: 'sp',
        agentAssigne: null,
        agentId: null,
        dateDepart: null,
        dateRemise: null,
        dateDecharge: null,
        preuve: null,
        pieces: 4,
        prioriteScore: 90,
    },

    /* ============================================
       URGENT (priorité haute)
       ============================================ */
    {
        id: '2026-0450',
        objet: "Rapport d'activité semestriel - DGA-AVE",
        expediteur: 'DGA-AVE',
        classification: 'urgent',
        nature: 'lettre',
        structureDestinataire: 'DRH',
        destinataire: {
            structure: 'DRH',
            personne: 'M. COMPAORÉ Ali',
            qualite: 'Directeur RH',
        },
        imputePar: 'M. OUÉDRAOGO Salif (SG)',
        dateImputation: '2026-09-29T08:40:00',
        dateReceptionSCC: '2026-09-29T08:30:00',
        tempsRestantMin: 60,
        etat: 'a-dispatcher',
        modePrevu: 'liaison',
        agentAssigne: null,
        agentId: null,
        dateDepart: null,
        dateRemise: null,
        dateDecharge: null,
        preuve: null,
        pieces: 2,
        prioriteScore: 80,
    },

    /* ============================================
       NORMAL (priorité standard)
       ============================================ */
    {
        id: '2026-0448',
        objet: "Recrutement d'un assistant à l'IGIT - Dossier",
        expediteur: 'DRH',
        classification: 'ordinaire',
        nature: 'demande',
        structureDestinataire: 'DG',
        destinataire: {
            structure: 'Direction Générale',
            personne: 'Pr. NIKIÉMA Adama',
            qualite: 'Directeur Général',
        },
        imputePar: 'M. OUÉDRAOGO Salif (SG)',
        dateImputation: '2026-09-29T09:15:00',
        dateReceptionSCC: '2026-09-29T09:00:00',
        tempsRestantMin: 180,
        etat: 'a-dispatcher',
        modePrevu: 'sp',
        agentAssigne: null,
        agentId: null,
        dateDepart: null,
        dateRemise: null,
        dateDecharge: null,
        preuve: null,
        pieces: 6,
        prioriteScore: 50,
    },
    {
        id: '2026-0441',
        objet: 'Convocation réunion du conseil scientifique',
        expediteur: 'SG',
        classification: 'ordinaire',
        nature: 'convocation',
        structureDestinataire: 'DRH',
        destinataire: {
            structure: 'DRH',
            personne: 'M. COMPAORÉ Ali',
            qualite: 'Directeur RH',
        },
        imputePar: 'M. OUÉDRAOGO Salif (SG)',
        dateImputation: '2026-09-29T09:30:00',
        dateReceptionSCC: '2026-09-29T09:20:00',
        tempsRestantMin: 200,
        etat: 'a-dispatcher',
        modePrevu: 'liaison',
        agentAssigne: null,
        agentId: null,
        dateDepart: null,
        dateRemise: null,
        dateDecharge: null,
        preuve: null,
        pieces: 1,
        prioriteScore: 40,
    },
    {
        id: '2026-0438',
        objet: 'Transmission du PV de délibération du personnel',
        expediteur: 'DAF',
        classification: 'ordinaire',
        nature: 'lettre',
        structureDestinataire: 'DAF',
        destinataire: {
            structure: 'DAF',
            personne: 'Mme SANOU Mariam',
            qualite: 'Directrice des Finances',
        },
        imputePar: 'M. OUÉDRAOGO Salif (SG)',
        dateImputation: '2026-09-29T09:45:00',
        dateReceptionSCC: '2026-09-29T09:40:00',
        tempsRestantMin: 220,
        etat: 'a-dispatcher',
        modePrevu: 'liaison',
        agentAssigne: null,
        agentId: null,
        dateDepart: null,
        dateRemise: null,
        dateDecharge: null,
        preuve: null,
        pieces: 2,
        prioriteScore: 40,
    },
    {
        id: '2026-0428',
        objet: 'Offre de service - Maintenance informatique',
        expediteur: 'SARL InfoTech',
        classification: 'ordinaire',
        nature: 'offre',
        structureDestinataire: 'PRMP',
        destinataire: {
            structure: 'PRMP',
            personne: 'M. KONATÉ Souleymane',
            qualite: 'PRMP',
        },
        imputePar: 'M. OUÉDRAOGO Salif (SG)',
        dateImputation: '2026-09-29T10:00:00',
        dateReceptionSCC: '2026-09-29T09:55:00',
        tempsRestantMin: 230,
        etat: 'a-dispatcher',
        modePrevu: 'liaison',
        agentAssigne: null,
        agentId: null,
        dateDepart: null,
        dateRemise: null,
        dateDecharge: null,
        preuve: null,
        pieces: 4,
        prioriteScore: 30,
    },

    /* ============================================
       EN TOURNÉE
       ============================================ */
    {
        id: '2026-0435',
        objet: "Demande d'explication sur les dépenses Q3",
        expediteur: 'Contrôleur Interne',
        classification: 'ordinaire',
        nature: 'demande',
        structureDestinataire: 'DAF',
        destinataire: {
            structure: 'DAF',
            personne: 'Mme SANOU Mariam',
            qualite: 'Directrice des Finances',
        },
        imputePar: 'M. OUÉDRAOGO Salif (SG)',
        dateImputation: '2026-09-29T08:00:00',
        dateReceptionSCC: '2026-09-29T07:50:00',
        tempsRestantMin: 100,
        etat: 'en-tournee',
        modePrevu: 'liaison',
        agentAssigne: 'M. SAWADOGO Bakary',
        agentId: 'al1',
        dateDepart: '2026-09-29T09:30:00',
        dateRemise: null,
        dateDecharge: null,
        preuve: null,
        pieces: 3,
        prioriteScore: 60,
    },
    {
        id: '2026-0432',
        objet: 'Attestation de prise de service - M. OUÉDRAOGO Karim',
        expediteur: 'DRH',
        classification: 'ordinaire',
        nature: 'attestation',
        structureDestinataire: 'SP-DG',
        destinataire: {
            structure: 'SP-DG',
            personne: 'Mme OUATTARA Rasmata',
            qualite: 'SP-DG',
        },
        imputePar: 'M. OUÉDRAOGO Salif (SG)',
        dateImputation: '2026-09-29T08:20:00',
        dateReceptionSCC: '2026-09-29T08:15:00',
        tempsRestantMin: 150,
        etat: 'en-tournee',
        modePrevu: 'sp',
        agentAssigne: 'M. OUÉDRAOGO Karim',
        agentId: 'al2',
        dateDepart: '2026-09-29T10:00:00',
        dateRemise: null,
        dateDecharge: null,
        preuve: null,
        pieces: 1,
        prioriteScore: 50,
    },

    /* ============================================
       REMIS - Preuve en attente de validation
       ============================================ */
    {
        id: '2026-0415',
        objet: 'Rapport trimestriel de coopération',
        expediteur: 'DCPIP',
        classification: 'ordinaire',
        nature: 'lettre',
        structureDestinataire: 'DCPIP',
        destinataire: {
            structure: 'DCPIP',
            personne: 'Mme BOUDA Céline',
            qualite: 'Directrice DCPIP',
        },
        imputePar: 'M. OUÉDRAOGO Salif (SG)',
        dateImputation: '2026-09-29T08:00:00',
        dateReceptionSCC: '2026-09-29T07:45:00',
        tempsRestantMin: 200,
        etat: 'remis',
        modePrevu: 'liaison',
        agentAssigne: 'M. SAWADOGO Bakary',
        agentId: 'al1',
        dateDepart: '2026-09-29T08:30:00',
        dateRemise: '2026-09-29T09:15:00',
        dateDecharge: null,
        preuve: {
            type: 'photo',
            url: 'preuves/dispatch-2026-0415.jpg',
            date: '2026-09-29T09:15:00',
            recepteur: 'Mme BOUDA Céline',
        },
        pieces: 3,
        prioriteScore: 30,
    },

    /* ============================================
       DÉCHARGÉ - Preuve validée
       ============================================ */
    {
        id: '2026-0410',
        objet: "Programme d'échange académique 2027",
        expediteur: 'DCPIP',
        classification: 'ordinaire',
        nature: 'lettre',
        structureDestinataire: 'DCPIP',
        destinataire: {
            structure: 'DCPIP',
            personne: 'Mme BOUDA Céline',
            qualite: 'Directrice DCPIP',
        },
        imputePar: 'M. OUÉDRAOGO Salif (SG)',
        dateImputation: '2026-09-27T09:00:00',
        dateReceptionSCC: '2026-09-27T08:50:00',
        tempsRestantMin: 400,
        etat: 'decharge',
        modePrevu: 'liaison',
        agentAssigne: 'M. SAWADOGO Bakary',
        agentId: 'al1',
        dateDepart: '2026-09-27T10:00:00',
        dateRemise: '2026-09-27T10:15:00',
        dateDecharge: '2026-09-27T10:15:00',
        preuve: {
            type: 'signature',
            url: 'preuves/dispatch-2026-0410.png',
            date: '2026-09-27T10:15:00',
            recepteur: 'Mme BOUDA Céline',
        },
        pieces: 2,
        prioriteScore: 20,
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_ETAT = [
    { value: '', label: 'Tous les états' },
    { value: 'a-dispatcher', label: 'À dispatcher' },
    { value: 'en-tournee', label: 'En tournée' },
    { value: 'en-retard', label: 'En retard' },
    { value: 'remis', label: 'Remis' },
    { value: 'decharge', label: 'Déchargé' },
];

export const FILTRES_CLASSIFICATION = [
    { value: '', label: 'Toutes les classifications' },
    { value: 'ordinaire', label: 'Ordinaire' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'confidentiel', label: 'Confidentiel / Réservé' },
];

export const FILTRES_MODE = [
    { value: '', label: 'Tous les modes' },
    { value: 'liaison', label: 'Liaison' },
    { value: 'main-propre', label: 'Main propre' },
    { value: 'sp', label: 'Remise SP' },
];

export const FILTRES_STRUCTURE = [
    { value: '', label: 'Toutes les structures' },
    { value: 'SG', label: 'Secrétariat Général' },
    { value: 'SP-SG', label: 'SP-SG' },
    { value: 'SP-DG', label: 'SP-DG' },
    { value: 'DRH', label: 'DRH' },
    { value: 'DAF', label: 'DAF' },
    { value: 'PRMP', label: 'PRMP' },
    { value: 'DGA-AVE', label: 'DGA-AVE' },
    { value: 'DGA-RCP', label: 'DGA-RCP' },
    { value: 'DCPIP', label: 'DCPIP' },
];