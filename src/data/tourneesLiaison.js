// src/data/tourneesLiaison.js

/* ============================================================
   AGENT CONNECTÉ
   ============================================================ */

export const AGENT = {
    id: 'al1',
    nom: 'M. SAWADOGO Bakary',
    matricule: 'EPO-2018-0087',
    zone: 'Zone A — SG / SP / Directions',
    avatar: 'SB',
    telephone: '+226 70 12 34 56',
};

/* ============================================================
   ÉTATS DE TOURNÉE
   ============================================================ */

export const ETATS_TOURNEE = {
    'planifiee': {
        key: 'planifiee',
        label: 'Planifiée',
        icon: 'fa-calendar-alt',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
        dot: 'bg-epo-slate-400',
    },
    'en-cours': {
        key: 'en-cours',
        label: 'En cours',
        icon: 'fa-spinner',
        chip: 'bg-epo-slate-800 text-white',
        dot: 'bg-epo-slate-800',
    },
    'terminee': {
        key: 'terminee',
        label: 'Terminée',
        icon: 'fa-check-circle',
        chip: 'bg-epo-green-50 text-epo-green-700',
        dot: 'bg-epo-green-500',
    },
    'partielle': {
        key: 'partielle',
        label: 'Terminée (partielle)',
        icon: 'fa-exclamation-triangle',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
        dot: 'bg-epo-yellow-500',
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

export function formatDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export function formatDateCourt(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
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
   TOURNÉES
   ============================================================ */

export const TOURNEES = [
    /* ============================================
       TOURNÉE EN COURS (aujourd'hui)
       ============================================ */
    {
        id: 'TRN-2026-0042',
        libelle: 'Tournée du matin',
        date: '2026-09-29',
        heureDebut: '2026-09-29T08:00:00',
        heureFinPrevue: '2026-09-29T12:30:00',
        heureFinReelle: null,
        etat: 'en-cours',
        zone: 'A',
        nbEtapes: 7,
        nbFaites: 2,
        nbRetards: 0,
        distanceEstimee: '1,8 km',
        etapes: [
            {
                id: 'TR-2026-0142',
                ordre: 1,
                etat: 'faite',
                documentNumero: '2026-0450',
                documentObjet: "Rapport d'activité semestriel",
                documentType: 'courrier',
                destinataire: {
                    structure: 'DAF',
                    personne: 'Mme SANOU Mariam',
                    qualite: 'Directrice des Finances',
                    localisation: 'Bâtiment A · Bureau 204',
                },
                priorite: 'normal',
                heurePrevue: '2026-09-29T08:15:00',
                heureRemise: '2026-09-29T08:22:00',
                preuve: { type: 'photo', recepteur: 'Mme SANOU Mariam' },
            },
            {
                id: 'TR-2026-0143',
                ordre: 2,
                etat: 'faite',
                documentNumero: '2026-0448',
                documentObjet: "Recrutement d'un assistant à l'IGIT",
                documentType: 'courrier',
                destinataire: {
                    structure: 'DRH',
                    personne: 'M. COMPAORÉ Ali',
                    qualite: 'Directeur RH',
                    localisation: 'Bâtiment B · Bureau 108',
                },
                priorite: 'normal',
                heurePrevue: '2026-09-29T08:30:00',
                heureRemise: '2026-09-29T08:40:00',
                preuve: { type: 'signature', recepteur: 'M. COMPAORÉ Ali' },
            },
            {
                id: 'TR-2026-0144',
                ordre: 3,
                etat: 'en-cours',
                documentNumero: '2026-0452',
                documentObjet: 'Demande de subvention exceptionnelle — Colloque international 2026',
                documentType: 'courrier',
                destinataire: {
                    structure: 'SG',
                    personne: 'M. OUÉDRAOGO Salif',
                    qualite: 'Secrétaire Général',
                    localisation: 'Bâtiment A · Aile Est · Bureau 302',
                },
                priorite: 'urgent',
                heurePrevue: '2026-09-29T09:00:00',
                heureRemise: null,
                preuve: null,
                distanceEstimee: '120 m · 1 min',
            },
            {
                id: 'TR-2026-0145',
                ordre: 4,
                etat: 'a-venir',
                documentNumero: 'ACT-2026-0412',
                documentObjet: 'Attestation d\'absence — M. OUÉDRAOGO Karim',
                documentType: 'acte',
                destinataire: {
                    structure: 'SCC',
                    personne: 'M. OUÉDRAOGO Karim',
                    qualite: 'Agent SCC',
                    localisation: 'Bâtiment C · Bureau 015',
                },
                priorite: 'normal',
                heurePrevue: '2026-09-29T09:45:00',
                heureRemise: null,
                preuve: null,
            },
            {
                id: 'TR-2026-0146',
                ordre: 5,
                etat: 'a-venir',
                documentNumero: '2026-0421',
                documentObjet: 'Convention de partenariat — Université de Lyon',
                documentType: 'courrier',
                destinataire: {
                    structure: 'DCPIP',
                    personne: 'Mme BOUDA Céline',
                    qualite: 'Directrice DCPIP',
                    localisation: 'Bâtiment D · Bureau 401',
                },
                priorite: 'confidentiel',
                heurePrevue: '2026-09-29T10:30:00',
                heureRemise: null,
                preuve: null,
            },
            {
                id: 'TR-2026-0147',
                ordre: 6,
                etat: 'a-venir',
                documentNumero: '2026-0410',
                documentObjet: "Programme d'échange académique 2027",
                documentType: 'courrier',
                destinataire: {
                    structure: 'DGA-AVE',
                    personne: 'Pr. TANKOANO Martin',
                    qualite: 'DGA-AVE',
                    localisation: 'Bâtiment B · Bureau 210',
                },
                priorite: 'normal',
                heurePrevue: '2026-09-29T11:15:00',
                heureRemise: null,
                preuve: null,
            },
            {
                id: 'TR-2026-0148',
                ordre: 7,
                etat: 'a-venir',
                documentNumero: 'ACT-2026-0405',
                documentObjet: 'Décision de congé — M. KABORÉ Issa',
                documentType: 'acte',
                destinataire: {
                    structure: 'DRH',
                    personne: 'M. COMPAORÉ Ali',
                    qualite: 'Directeur RH',
                    localisation: 'Bâtiment B · Bureau 108',
                },
                priorite: 'normal',
                heurePrevue: '2026-09-29T12:00:00',
                heureRemise: null,
                preuve: null,
            },
        ],
    },

    /* ============================================
       TOURNÉE PLANIFIÉE (demain matin)
       ============================================ */
    {
        id: 'TRN-2026-0043',
        libelle: 'Tournée du matin',
        date: '2026-09-30',
        heureDebut: '2026-09-30T08:00:00',
        heureFinPrevue: '2026-09-30T12:00:00',
        heureFinReelle: null,
        etat: 'planifiee',
        zone: 'A',
        nbEtapes: 5,
        nbFaites: 0,
        nbRetards: 0,
        distanceEstimee: '1,2 km',
        etapes: [
            {
                id: 'TR-2026-0160',
                ordre: 1,
                etat: 'a-venir',
                documentNumero: '2026-0455',
                documentObjet: 'Réponse au courrier N°2026-0410',
                documentType: 'courrier',
                destinataire: {
                    structure: 'SG',
                    personne: 'M. OUÉDRAOGO Salif',
                    qualite: 'Secrétaire Général',
                    localisation: 'Bâtiment A · Aile Est · Bureau 302',
                },
                priorite: 'normal',
                heurePrevue: '2026-09-30T08:15:00',
                heureRemise: null,
                preuve: null,
            },
            {
                id: 'TR-2026-0161',
                ordre: 2,
                etat: 'a-venir',
                documentNumero: 'ACT-2026-0420',
                documentObjet: 'Certificat de travail — Mme KABORÉ Aminata',
                documentType: 'acte',
                destinataire: {
                    structure: 'DAF',
                    personne: 'Mme KABORÉ Aminata',
                    qualite: 'Comptable',
                    localisation: 'Bâtiment A · Bureau 210',
                },
                priorite: 'normal',
                heurePrevue: '2026-09-30T08:45:00',
                heureRemise: null,
                preuve: null,
            },
            {
                id: 'TR-2026-0162',
                ordre: 3,
                etat: 'a-venir',
                documentNumero: '2026-0456',
                documentObjet: 'Note de service — Organisation des congés',
                documentType: 'courrier',
                destinataire: {
                    structure: 'DRH',
                    personne: 'M. COMPAORÉ Ali',
                    qualite: 'Directeur RH',
                    localisation: 'Bâtiment B · Bureau 108',
                },
                priorite: 'normal',
                heurePrevue: '2026-09-30T09:30:00',
                heureRemise: null,
                preuve: null,
            },
            {
                id: 'TR-2026-0163',
                ordre: 4,
                etat: 'a-venir',
                documentNumero: '2026-0457',
                documentObjet: 'Communiqué officiel — Prix d\'excellence 2026',
                documentType: 'courrier',
                destinataire: {
                    structure: 'DGA-AVE',
                    personne: 'Pr. TANKOANO Martin',
                    qualite: 'DGA-AVE',
                    localisation: 'Bâtiment B · Bureau 210',
                },
                priorite: 'normal',
                heurePrevue: '2026-09-30T10:30:00',
                heureRemise: null,
                preuve: null,
            },
            {
                id: 'TR-2026-0164',
                ordre: 5,
                etat: 'a-venir',
                documentNumero: 'ACT-2026-0421',
                documentObjet: 'Bordereau d\'envoi — Ministère',
                documentType: 'acte',
                destinataire: {
                    structure: 'DAF',
                    personne: 'Mme SANOU Mariam',
                    qualite: 'Directrice des Finances',
                    localisation: 'Bâtiment A · Bureau 204',
                },
                priorite: 'normal',
                heurePrevue: '2026-09-30T11:30:00',
                heureRemise: null,
                preuve: null,
            },
        ],
    },

    /* ============================================
       TOURNÉE PLANIFIÉE (après-demain)
       ============================================ */
    {
        id: 'TRN-2026-0044',
        libelle: 'Tournée du matin',
        date: '2026-10-01',
        heureDebut: '2026-10-01T08:00:00',
        heureFinPrevue: '2026-10-01T11:30:00',
        heureFinReelle: null,
        etat: 'planifiee',
        zone: 'A',
        nbEtapes: 4,
        nbFaites: 0,
        nbRetards: 0,
        distanceEstimee: '0,9 km',
        etapes: [
            {
                id: 'TR-2026-0170',
                ordre: 1,
                etat: 'a-venir',
                documentNumero: '2026-0460',
                documentObjet: 'Dossier Ministère — Pièces complémentaires',
                documentType: 'courrier',
                destinataire: {
                    structure: 'SG',
                    personne: 'M. OUÉDRAOGO Salif',
                    qualite: 'Secrétaire Général',
                    localisation: 'Bâtiment A · Aile Est · Bureau 302',
                },
                priorite: 'urgent',
                heurePrevue: '2026-10-01T08:30:00',
                heureRemise: null,
                preuve: null,
            },
            {
                id: 'TR-2026-0171',
                ordre: 2,
                etat: 'a-venir',
                documentNumero: '2026-0461',
                documentObjet: 'Avis juridique — Convention Bordeau',
                documentType: 'courrier',
                destinataire: {
                    structure: 'DCPIP',
                    personne: 'Mme BOUDA Céline',
                    qualite: 'Directrice DCPIP',
                    localisation: 'Bâtiment D · Bureau 401',
                },
                priorite: 'confidentiel',
                heurePrevue: '2026-10-01T09:15:00',
                heureRemise: null,
                preuve: null,
            },
            {
                id: 'TR-2026-0172',
                ordre: 3,
                etat: 'a-venir',
                documentNumero: 'ACT-2026-0425',
                documentObjet: 'Ordre de mission — M. TRAORÉ Ibrahim',
                documentType: 'acte',
                destinataire: {
                    structure: 'SCC',
                    personne: 'M. TRAORÉ Ibrahim',
                    qualite: 'Chef SCC',
                    localisation: 'Bâtiment C · Bureau 012',
                },
                priorite: 'normal',
                heurePrevue: '2026-10-01T10:00:00',
                heureRemise: null,
                preuve: null,
            },
            {
                id: 'TR-2026-0173',
                ordre: 4,
                etat: 'a-venir',
                documentNumero: '2026-0462',
                documentObjet: 'Convocation réunion du conseil scientifique',
                documentType: 'courrier',
                destinataire: {
                    structure: 'DGA-RCP',
                    personne: 'Pr. NIKIÉMA Arsène',
                    qualite: 'DGA-RCP',
                    localisation: 'Bâtiment B · Bureau 220',
                },
                priorite: 'normal',
                heurePrevue: '2026-10-01T11:00:00',
                heureRemise: null,
                preuve: null,
            },
        ],
    },

    /* ============================================
       TOURNÉE TERMINÉE (hier)
       ============================================ */
    {
        id: 'TRN-2026-0041',
        libelle: 'Tournée de l\'après-midi',
        date: '2026-09-28',
        heureDebut: '2026-09-28T14:00:00',
        heureFinPrevue: '2026-09-28T17:30:00',
        heureFinReelle: '2026-09-28T17:15:00',
        etat: 'terminee',
        zone: 'A',
        nbEtapes: 6,
        nbFaites: 6,
        nbRetards: 0,
        distanceEstimee: '1,5 km',
        etapes: [],
    },

    /* ============================================
       TOURNÉE TERMINÉE PARTIELLE
       ============================================ */
    {
        id: 'TRN-2026-0040',
        libelle: 'Tournée du matin',
        date: '2026-09-28',
        heureDebut: '2026-09-28T08:00:00',
        heureFinPrevue: '2026-09-28T12:00:00',
        heureFinReelle: '2026-09-28T12:30:00',
        etat: 'partielle',
        zone: 'A',
        nbEtapes: 5,
        nbFaites: 4,
        nbRetards: 1,
        distanceEstimee: '1,1 km',
        etapes: [],
        motifPartiel: 'Destinataire absent — DRH',
    },

    /* ============================================
       TOURNÉE TERMINÉE (avant-hier)
       ============================================ */
    {
        id: 'TRN-2026-0039',
        libelle: 'Tournée de l\'après-midi',
        date: '2026-09-27',
        heureDebut: '2026-09-27T14:00:00',
        heureFinPrevue: '2026-09-27T17:00:00',
        heureFinReelle: '2026-09-27T16:45:00',
        etat: 'terminee',
        zone: 'A',
        nbEtapes: 4,
        nbFaites: 4,
        nbRetards: 0,
        distanceEstimee: '1,0 km',
        etapes: [],
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_ETAT = [
    { value: '', label: 'Tous les états' },
    { value: 'en-cours', label: 'En cours' },
    { value: 'planifiee', label: 'Planifiée' },
    { value: 'terminee', label: 'Terminée' },
    { value: 'partielle', label: 'Terminée (partielle)' },
];

export const FILTRES_PERIODE = [
    { value: '', label: 'Toute la période' },
    { value: 'aujourdhui', label: "Aujourd'hui" },
    { value: 'semaine', label: 'Cette semaine' },
    { value: 'mois', label: 'Ce mois' },
];