// src/data/dashboardLiaison.js

/* ============================================================
   ÉTATS DE TOURNÉE
   ============================================================ */

export const ETATS_TOURNEE = {
    'a-demarrer': {
        key: 'a-demarrer',
        label: 'À démarrer',
        icon: 'fa-play-circle',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
    },
    'en-cours': {
        key: 'en-cours',
        label: 'En cours',
        icon: 'fa-spinner',
        chip: 'bg-epo-slate-700 text-white',
    },
    'terminee': {
        key: 'terminee',
        label: 'Terminée',
        icon: 'fa-check-circle',
        chip: 'bg-epo-green-50 text-epo-green-700',
    },
};

/* ============================================================
   ÉTATS DE REMISE
   ============================================================ */

export const ETATS_REMISE = {
    'faite': {
        key: 'faite',
        label: 'Remis',
        icon: 'fa-check',
        chip: 'bg-epo-green-50 text-epo-green-700',
        dot: 'bg-epo-green-500',
    },
    'en-cours': {
        key: 'en-cours',
        label: 'En cours',
        icon: 'fa-spinner',
        chip: 'bg-epo-slate-700 text-white',
        dot: 'bg-epo-slate-700',
    },
    'a-venir': {
        key: 'a-venir',
        label: 'À remettre',
        icon: 'fa-clock',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
        dot: 'bg-epo-slate-400',
    },
    'retard': {
        key: 'retard',
        label: 'En retard',
        icon: 'fa-exclamation-circle',
        chip: 'bg-epo-red-50 text-epo-red-700',
        dot: 'bg-epo-red-500',
    },
};

/* ============================================================
   HELPERS
   ============================================================ */

export function formatHeure(iso) {
    if (!iso) return '-';
    return new Date(iso).toLocaleTimeString('fr-FR', {
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
   AGENT CONNECTÉ
   ============================================================ */

export const AGENT = {
    id: 'al1',
    nom: 'M. SAWADOGO Bakary',
    matricule: 'EPO-2018-0087',
    zone: 'Zone A - SG / SP / Directions',
    avatar: 'SB',
    telephone: '+226 70 12 34 56',
};

/* ============================================================
   TOURNÉE DU JOUR
   ============================================================ */

export const TOURNEE_DU_JOUR = {
    id: 'TRN-2026-0042',
    libelle: 'Tournée du matin',
    date: '2026-09-29',
    heureDebut: '2026-09-29T08:00:00',
    heureFinPrevue: '2026-09-29T12:30:00',
    heureFinReelle: null,
    etat: 'en-cours',
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
            documentObjet: 'Demande de subvention exceptionnelle - Colloque international 2026',
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
            documentObjet: 'Attestation d\'absence - M. OUÉDRAOGO Karim',
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
            documentObjet: 'Convention de partenariat - Université de Lyon',
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
            documentObjet: 'Décision de congé - M. KABORÉ Issa',
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
};

/* ============================================================
   DOCUMENTS HORS TOURNÉE
   ============================================================ */

export const DOCUMENTS_HORS_TOURNEE = [
    {
        id: 'TR-2026-0150',
        documentNumero: '2026-0488',
        documentObjet: 'Demande de congé - M. TRAORÉ',
        documentType: 'courrier',
        destinataire: {
            structure: 'DRH',
            personne: 'M. COMPAORÉ Ali',
            qualite: 'Directeur RH',
            localisation: 'Bâtiment B · Bureau 108',
        },
        priorite: 'normal',
        etat: 'a-venir',
        tempsAttente: 45, // minutes
    },
    {
        id: 'TR-2026-0151',
        documentNumero: '2026-0486',
        documentObjet: 'Facture fournisseur - Eau & Électricité',
        documentType: 'courrier',
        destinataire: {
            structure: 'DAF',
            personne: 'Mme SANOU Mariam',
            qualite: 'Directrice des Finances',
            localisation: 'Bâtiment A · Bureau 204',
        },
        priorite: 'normal',
        etat: 'a-venir',
        tempsAttente: 30,
    },
    {
        id: 'TR-2026-0152',
        documentNumero: '2026-0485',
        documentObjet: 'Communiqué officiel - MESRSI',
        documentType: 'courrier',
        destinataire: {
            structure: 'SG',
            personne: 'M. OUÉDRAOGO Salif',
            qualite: 'Secrétaire Général',
            localisation: 'Bâtiment A · Aile Est · Bureau 302',
        },
        priorite: 'urgent',
        etat: 'retard',
        tempsAttente: 180,
    },
];