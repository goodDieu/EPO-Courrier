// src/data/aRemettreLiaison.js

/* ============================================================
   TYPES DE DOCUMENTS
   ============================================================ */

export const TYPES_DOCUMENTS = {
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

/**
 * Retourne un indicateur d'ancienneté.
 */
export function getAnciennete(tempsAttenteMin) {
    if (tempsAttenteMin < 60) return { label: 'Récent', chip: 'bg-epo-green-50 text-epo-green-700' };
    if (tempsAttenteMin < 240) return { label: 'Moyen', chip: 'bg-epo-slate-100 text-epo-slate-700' };
    if (tempsAttenteMin < 480) return { label: 'Ancien', chip: 'bg-epo-yellow-50 text-epo-yellow-700' };
    return { label: 'Très ancien', chip: 'bg-epo-red-50 text-epo-red-700' };
}

/* ============================================================
   DOCUMENTS À REMETTRE
   ============================================================ */

export const DOCUMENTS_A_REMETTRE = [
    /* ============================================
       URGENTS
       ============================================ */
    {
        id: 'TR-2026-0144',
        documentNumero: '2026-0452',
        documentObjet: 'Demande de subvention exceptionnelle - Colloque international 2026',
        documentType: 'courrier',
        priorite: 'urgent',
        tempsAttente: 45,
        dansTournee: true,
        tourneeId: 'TRN-2026-0042',
        tourneeLibelle: 'Tournée du matin (en cours)',
        destinataire: {
            structure: 'SG',
            personne: 'M. OUÉDRAOGO Salif',
            qualite: 'Secrétaire Général',
            localisation: 'Bâtiment A · Aile Est · Bureau 302',
        },
        dateReception: '2026-09-29T08:00:00',
        pieces: 3,
    },
    {
        id: 'TR-2026-0152',
        documentNumero: '2026-0485',
        documentObjet: 'Communiqué officiel - MESRSI',
        documentType: 'courrier',
        priorite: 'urgent',
        tempsAttente: 180,
        dansTournee: false,
        tourneeId: null,
        tourneeLibelle: null,
        destinataire: {
            structure: 'SG',
            personne: 'M. OUÉDRAOGO Salif',
            qualite: 'Secrétaire Général',
            localisation: 'Bâtiment A · Aile Est · Bureau 302',
        },
        dateReception: '2026-09-29T09:15:00',
        pieces: 2,
    },

    /* ============================================
       CONFIDENTIELS
       ============================================ */
    {
        id: 'TR-2026-0146',
        documentNumero: '2026-0421',
        documentObjet: 'Convention de partenariat - Université de Lyon',
        documentType: 'courrier',
        priorite: 'confidentiel',
        tempsAttente: 90,
        dansTournee: true,
        tourneeId: 'TRN-2026-0042',
        tourneeLibelle: 'Tournée du matin (en cours)',
        destinataire: {
            structure: 'DCPIP',
            personne: 'Mme BOUDA Céline',
            qualite: 'Directrice DCPIP',
            localisation: 'Bâtiment D · Bureau 401',
        },
        dateReception: '2026-09-28T16:00:00',
        pieces: 4,
    },

    /* ============================================
       NORMAUX
       ============================================ */
    {
        id: 'TR-2026-0145',
        documentNumero: 'ACT-2026-0412',
        documentObjet: 'Attestation d\'absence - M. OUÉDRAOGO Karim',
        documentType: 'acte',
        priorite: 'normal',
        tempsAttente: 30,
        dansTournee: true,
        tourneeId: 'TRN-2026-0042',
        tourneeLibelle: 'Tournée du matin (en cours)',
        destinataire: {
            structure: 'SCC',
            personne: 'M. OUÉDRAOGO Karim',
            qualite: 'Agent SCC',
            localisation: 'Bâtiment C · Bureau 015',
        },
        dateReception: '2026-09-29T08:30:00',
        pieces: 1,
    },
    {
        id: 'TR-2026-0147',
        documentNumero: '2026-0410',
        documentObjet: "Programme d'échange académique 2027",
        documentType: 'courrier',
        priorite: 'normal',
        tempsAttente: 120,
        dansTournee: true,
        tourneeId: 'TRN-2026-0042',
        tourneeLibelle: 'Tournée du matin (en cours)',
        destinataire: {
            structure: 'DGA-AVE',
            personne: 'Pr. TANKOANO Martin',
            qualite: 'DGA-AVE',
            localisation: 'Bâtiment B · Bureau 210',
        },
        dateReception: '2026-09-27T09:00:00',
        pieces: 2,
    },
    {
        id: 'TR-2026-0148',
        documentNumero: 'ACT-2026-0405',
        documentObjet: 'Décision de congé - M. KABORÉ Issa',
        documentType: 'acte',
        priorite: 'normal',
        tempsAttente: 200,
        dansTournee: true,
        tourneeId: 'TRN-2026-0042',
        tourneeLibelle: 'Tournée du matin (en cours)',
        destinataire: {
            structure: 'DRH',
            personne: 'M. COMPAORÉ Ali',
            qualite: 'Directeur RH',
            localisation: 'Bâtiment B · Bureau 108',
        },
        dateReception: '2026-09-24T09:15:00',
        pieces: 1,
    },
    {
        id: 'TR-2026-0150',
        documentNumero: '2026-0488',
        documentObjet: 'Demande de congé - M. TRAORÉ',
        documentType: 'courrier',
        priorite: 'normal',
        tempsAttente: 45,
        dansTournee: false,
        tourneeId: null,
        tourneeLibelle: null,
        destinataire: {
            structure: 'DRH',
            personne: 'M. COMPAORÉ Ali',
            qualite: 'Directeur RH',
            localisation: 'Bâtiment B · Bureau 108',
        },
        dateReception: '2026-09-29T10:45:00',
        pieces: 2,
    },
    {
        id: 'TR-2026-0151',
        documentNumero: '2026-0486',
        documentObjet: 'Facture fournisseur - Eau & Électricité',
        documentType: 'courrier',
        priorite: 'normal',
        tempsAttente: 30,
        dansTournee: false,
        tourneeId: null,
        tourneeLibelle: null,
        destinataire: {
            structure: 'DAF',
            personne: 'Mme SANOU Mariam',
            qualite: 'Directrice des Finances',
            localisation: 'Bâtiment A · Bureau 204',
        },
        dateReception: '2026-09-29T09:50:00',
        pieces: 1,
    },
    {
        id: 'TR-2026-0153',
        documentNumero: 'ACT-2026-0420',
        documentObjet: 'Certificat de travail - Mme KABORÉ Aminata',
        documentType: 'acte',
        priorite: 'normal',
        tempsAttente: 480,
        dansTournee: false,
        tourneeId: null,
        tourneeLibelle: null,
        destinataire: {
            structure: 'DAF',
            personne: 'Mme KABORÉ Aminata',
            qualite: 'Comptable',
            localisation: 'Bâtiment A · Bureau 210',
        },
        dateReception: '2026-09-28T10:00:00',
        pieces: 1,
    },
    {
        id: 'TR-2026-0154',
        documentNumero: '2026-0460',
        documentObjet: 'Dossier Ministère - Pièces complémentaires',
        documentType: 'courrier',
        priorite: 'normal',
        tempsAttente: 600,
        dansTournee: false,
        tourneeId: null,
        tourneeLibelle: null,
        destinataire: {
            structure: 'SG',
            personne: 'M. OUÉDRAOGO Salif',
            qualite: 'Secrétaire Général',
            localisation: 'Bâtiment A · Aile Est · Bureau 302',
        },
        dateReception: '2026-09-27T14:00:00',
        pieces: 6,
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_TYPE = [
    { value: '', label: 'Tous les types' },
    { value: 'courrier', label: 'Courriers' },
    { value: 'acte', label: 'Actes' },
];

export const FILTRES_PRIORITE = [
    { value: '', label: 'Toutes les priorités' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'confidentiel', label: 'Confidentiel' },
    { value: 'normal', label: 'Normal' },
];

export const FILTRES_TOURNEE = [
    { value: '', label: 'Toutes les affectations' },
    { value: 'tournee', label: 'Dans la tournée active' },
    { value: 'hors-tournee', label: 'Hors tournée' },
];

export const FILTRES_STRUCTURE = [
    { value: '', label: 'Toutes les structures' },
    { value: 'SG', label: 'Secrétariat Général' },
    { value: 'SCC', label: 'SCC' },
    { value: 'DRH', label: 'DRH' },
    { value: 'DAF', label: 'DAF' },
    { value: 'DCPIP', label: 'DCPIP' },
    { value: 'DGA-AVE', label: 'DGA-AVE' },
];

export const OPTIONS_TRI = [
    { value: 'urgence', label: 'Priorité (défaut)' },
    { value: 'anciennete', label: 'Plus anciens d\'abord' },
    { value: 'recent', label: 'Plus récents' },
    { value: 'structure', label: 'Par structure' },
];