// src/data/remisesLiaison.js

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

export function formatDateJour(iso) {
    if (!iso) return '-';
    const date = new Date(iso);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    const diff = (today - d) / (1000 * 60 * 60 * 24);

    if (diff === 0) return "Aujourd'hui";
    if (diff === 1) return 'Hier';
    if (diff === 2) return 'Avant-hier';
    if (diff < 7) {
        return date.toLocaleDateString('fr-FR', { weekday: 'long' });
    }
    return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
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
   TYPES DE PREUVE
   ============================================================ */

export const TYPES_PREUVE = {
    signature: {
        key: 'signature',
        label: 'Signature',
        shortLabel: 'Sign.',
        icon: 'fa-signature',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
    },
    photo: {
        key: 'photo',
        label: 'Photo',
        shortLabel: 'Photo',
        icon: 'fa-camera',
        chip: 'bg-epo-green-50 text-epo-green-700',
    },
};

/* ============================================================
   REMISES EFFECTUÉES
   ============================================================ */

export const REMISES_EFFECTUEES = [
    /* ============================================
       AUJOURD'HUI
       ============================================ */
    {
        id: 'TR-2026-0143',
        documentNumero: '2026-0448',
        documentObjet: "Recrutement d'un assistant à l'IGIT",
        documentType: 'courrier',
        priorite: 'normal',
        destinataire: {
            structure: 'DRH',
            personne: 'M. COMPAORÉ Ali',
            qualite: 'Directeur RH',
            localisation: 'Bâtiment B · Bureau 108',
        },
        dateRemise: '2026-09-29T08:40:00',
        duree: 10,
        typePreuve: 'signature',
        preuveRef: 'PRV-2026-0892',
        hash: 'sha256:a3f5e9c1d8b2f4a7e6c3d9b1f8a5e2c7d4b9a6f3e1c8d5b2a9f6e3c1d8b5a2f7',
        tourneeId: 'TRN-2026-0042',
        tourneeLibelle: 'Tournée du matin',
    },
    {
        id: 'TR-2026-0142',
        documentNumero: '2026-0450',
        documentObjet: "Rapport d'activité semestriel",
        documentType: 'courrier',
        priorite: 'normal',
        destinataire: {
            structure: 'DAF',
            personne: 'Mme SANOU Mariam',
            qualite: 'Directrice des Finances',
            localisation: 'Bâtiment A · Bureau 204',
        },
        dateRemise: '2026-09-29T08:22:00',
        duree: 7,
        typePreuve: 'photo',
        preuveRef: 'PRV-2026-0891',
        hash: 'sha256:b7d2f4a8e5c1f9b3d6a8c2e5f7b4d1a9c3f6b8e2d5a7c1f4b6e9d3a8c5f2b7d1',
        tourneeId: 'TRN-2026-0042',
        tourneeLibelle: 'Tournée du matin',
    },

    /* ============================================
       HIER
       ============================================ */
    {
        id: 'TR-2026-0138',
        documentNumero: '2026-0441',
        documentObjet: 'Convocation réunion du conseil scientifique',
        documentType: 'courrier',
        priorite: 'normal',
        destinataire: {
            structure: 'DRH',
            personne: 'M. COMPAORÉ Ali',
            qualite: 'Directeur RH',
            localisation: 'Bâtiment B · Bureau 108',
        },
        dateRemise: '2026-09-28T15:30:00',
        duree: 12,
        typePreuve: 'signature',
        preuveRef: 'PRV-2026-0885',
        hash: 'sha256:c1e8a5b3f9d2e6a4c7b1f5d8e3a9c6b2f4d7e1a8c5b3f9d6e2a7c4b1f8d5e3a9',
        tourneeId: 'TRN-2026-0041',
        tourneeLibelle: 'Tournée de l\'après-midi',
    },
    {
        id: 'TR-2026-0137',
        documentNumero: 'ACT-2026-0402',
        documentObjet: 'Certificat de prise de service - Mme ZONGO Aïcha',
        documentType: 'acte',
        priorite: 'normal',
        destinataire: {
            structure: 'SCC',
            personne: 'Mme ZONGO Aïcha',
            qualite: 'Agent de numérisation',
            localisation: 'Bâtiment C · Bureau 015',
        },
        dateRemise: '2026-09-28T14:50:00',
        duree: 8,
        typePreuve: 'signature',
        preuveRef: 'PRV-2026-0884',
        hash: 'sha256:d9a2c7f1b5e8a3d6c9f2b7a1e5d8c3f6a9b2e7d1c4f8a5b9d3e6c1f4a7b2d9e5',
        tourneeId: 'TRN-2026-0041',
        tourneeLibelle: 'Tournée de l\'après-midi',
    },
    {
        id: 'TR-2026-0136',
        documentNumero: '2026-0438',
        documentObjet: 'Transmission du PV de délibération du personnel',
        documentType: 'courrier',
        priorite: 'normal',
        destinataire: {
            structure: 'DAF',
            personne: 'Mme SANOU Mariam',
            qualite: 'Directrice des Finances',
            localisation: 'Bâtiment A · Bureau 204',
        },
        dateRemise: '2026-09-28T14:20:00',
        duree: 9,
        typePreuve: 'photo',
        preuveRef: 'PRV-2026-0883',
        hash: 'sha256:e8b5c2d9f6a3b7c1e4d8a2f5b9c3e6a1d4f7b2c5a8e3d9f6b1c4a7e2d5f8b3c6',
        tourneeId: 'TRN-2026-0041',
        tourneeLibelle: 'Tournée de l\'après-midi',
    },
    {
        id: 'TR-2026-0135',
        documentNumero: '2026-0435',
        documentObjet: "Demande d'explication sur les dépenses Q3",
        documentType: 'courrier',
        priorite: 'urgent',
        destinataire: {
            structure: 'DAF',
            personne: 'Mme SANOU Mariam',
            qualite: 'Directrice des Finances',
            localisation: 'Bâtiment A · Bureau 204',
        },
        dateRemise: '2026-09-28T11:15:00',
        duree: 15,
        typePreuve: 'signature',
        preuveRef: 'PRV-2026-0882',
        hash: 'sha256:f3c8d1b6e9a4d2f7c5b8a1e3d6c9b2f5a8e1d4c7b3f6a9e2d5c8b1f4a7e3d6c9',
        tourneeId: 'TRN-2026-0040',
        tourneeLibelle: 'Tournée du matin',
    },
    {
        id: 'TR-2026-0134',
        documentNumero: 'ACT-2026-0398',
        documentObjet: 'Certificat de cessation de paiement',
        documentType: 'acte',
        priorite: 'normal',
        destinataire: {
            structure: 'DAF',
            personne: 'Mme KABORÉ Aminata',
            qualite: 'Comptable',
            localisation: 'Bâtiment A · Bureau 210',
        },
        dateRemise: '2026-09-28T10:30:00',
        duree: 6,
        typePreuve: 'signature',
        preuveRef: 'PRV-2026-0881',
        hash: 'sha256:a5b2d9c7f4e1b8a3d6c9f2b5a8e1d4c7b3f6a9e2d5c8b1f4a7e3d6c9b2f5a8e1',
        tourneeId: 'TRN-2026-0040',
        tourneeLibelle: 'Tournée du matin',
    },

    /* ============================================
       IL Y A 2 JOURS
       ============================================ */
    {
        id: 'TR-2026-0128',
        documentNumero: '2026-0428',
        documentObjet: 'Offre de service - Maintenance informatique',
        documentType: 'courrier',
        priorite: 'normal',
        destinataire: {
            structure: 'PRMP',
            personne: 'M. KONATÉ Souleymane',
            qualite: 'PRMP',
            localisation: 'Bâtiment D · Bureau 205',
        },
        dateRemise: '2026-09-27T15:45:00',
        duree: 11,
        typePreuve: 'signature',
        preuveRef: 'PRV-2026-0875',
        hash: 'sha256:b9e6a3f5c8d2e9b7a4d1c7f5b8e3a9d6c2f4b7e1a5d8c3b6f9e2a4d7c1b5f8e3',
        tourneeId: 'TRN-2026-0039',
        tourneeLibelle: 'Tournée de l\'après-midi',
    },
    {
        id: 'TR-2026-0127',
        documentNumero: '2026-0421',
        documentObjet: 'Note de service - Organisation des soutenances',
        documentType: 'courrier',
        priorite: 'normal',
        destinataire: {
            structure: 'DGA-AVE',
            personne: 'Pr. TANKOANO Martin',
            qualite: 'DGA-AVE',
            localisation: 'Bâtiment B · Bureau 210',
        },
        dateRemise: '2026-09-27T14:30:00',
        duree: 9,
        typePreuve: 'photo',
        preuveRef: 'PRV-2026-0874',
        hash: 'sha256:c3f8a1e5b9d6c2f7a4e8b1d5c9f3a6e2b7d4c8f1a5e9b3d6c2f7a4e8b1d5c9f3',
        tourneeId: 'TRN-2026-0039',
        tourneeLibelle: 'Tournée de l\'après-midi',
    },

    /* ============================================
       SEMAINE PASSÉE
       ============================================ */
    {
        id: 'TR-2026-0120',
        documentNumero: '2026-0410',
        documentObjet: "Programme d'échange académique 2027",
        documentType: 'courrier',
        priorite: 'normal',
        destinataire: {
            structure: 'DCPIP',
            personne: 'Mme BOUDA Céline',
            qualite: 'Directrice DCPIP',
            localisation: 'Bâtiment D · Bureau 401',
        },
        dateRemise: '2026-09-25T10:15:00',
        duree: 8,
        typePreuve: 'photo',
        preuveRef: 'PRV-2026-0867',
        hash: 'sha256:d1a4f7c2b8e5a3d6c9f2b5a8e1d4c7b3f6a9e2d5c8b1f4a7e3d6c9b2f5a8e1d4',
        tourneeId: null,
        tourneeLibelle: null,
    },
    {
        id: 'TR-2026-0121',
        documentNumero: '2026-0405',
        documentObjet: 'Convention de stage étudiant',
        documentType: 'courrier',
        priorite: 'normal',
        destinataire: {
            structure: 'DRH',
            personne: 'M. COMPAORÉ Ali',
            qualite: 'Directeur RH',
            localisation: 'Bâtiment B · Bureau 108',
        },
        dateRemise: '2026-09-25T15:30:00',
        duree: 10,
        typePreuve: 'signature',
        preuveRef: 'PRV-2026-0868',
        hash: 'sha256:e5b8c1d4a7f3e9b6c2d5a8e1d4c7b3f6a9e2d5c8b1f4a7e3d6c9b2f5a8e1d4c7',
        tourneeId: null,
        tourneeLibelle: null,
    },
    {
        id: 'TR-2026-0122',
        documentNumero: 'ACT-2026-0400',
        documentObjet: "Décision d'attribution de bourse",
        documentType: 'acte',
        priorite: 'normal',
        destinataire: {
            structure: 'DGA-AVE',
            personne: 'Pr. TANKOANO Martin',
            qualite: 'DGA-AVE',
            localisation: 'Bâtiment B · Bureau 210',
        },
        dateRemise: '2026-09-24T11:00:00',
        duree: 12,
        typePreuve: 'signature',
        preuveRef: 'PRV-2026-0865',
        hash: 'sha256:f7c2a5b8d1e4a7c3f6b9d2a5e8c1f4b7a3d6c9f2b5a8e1d4c7b3f6a9e2d5c8b1',
        tourneeId: null,
        tourneeLibelle: null,
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_PERIODE = [
    { value: '', label: 'Toute la période' },
    { value: 'aujourdhui', label: "Aujourd'hui" },
    { value: 'semaine', label: 'Cette semaine' },
    { value: 'mois', label: 'Ce mois' },
];

export const FILTRES_STRUCTURE = [
    { value: '', label: 'Toutes les structures' },
    { value: 'SG', label: 'Secrétariat Général' },
    { value: 'SCC', label: 'SCC' },
    { value: 'DRH', label: 'DRH' },
    { value: 'DAF', label: 'DAF' },
    { value: 'DCPIP', label: 'DCPIP' },
    { value: 'DGA-AVE', label: 'DGA-AVE' },
    { value: 'PRMP', label: 'PRMP' },
];

export const FILTRES_PREUVE = [
    { value: '', label: 'Toutes les preuves' },
    { value: 'signature', label: 'Signatures' },
    { value: 'photo', label: 'Photos' },
];

export const OPTIONS_TRI = [
    { value: 'recent', label: 'Plus récentes (défaut)' },
    { value: 'ancien', label: 'Plus anciennes' },
    { value: 'structure', label: 'Par structure' },
    { value: 'destinataire', label: 'Par destinataire' },
];