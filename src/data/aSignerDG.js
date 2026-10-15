// src/data/aSignerDG.js

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
        label: 'Acte administratif',
        icon: 'fa-file-signature',
        color: 'bg-epo-green-50 text-epo-green-700',
    },
};

/* ============================================================
   PROVENANCES
   ============================================================ */

export const PROVENANCES = {
    SG: { key: 'SG', label: 'Secrétariat Général', icon: 'fa-user-tie' },
    DRH: { key: 'DRH', label: 'Direction RH', icon: 'fa-users' },
    DCPIP: { key: 'DCPIP', label: 'DCPIP', icon: 'fa-handshake' },
    DAF: { key: 'DAF', label: 'Direction Finances', icon: 'fa-coins' },
    PRMP: { key: 'PRMP', label: 'PRMP', icon: 'fa-file-contract' },
    SCC: { key: 'SCC', label: 'Service Courrier', icon: 'fa-inbox' },
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

export function formatDate(iso) {
    if (!iso) return '-';
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

export function computeNiveau(tempsRestantMin) {
    if (tempsRestantMin < 0) return 'depasse';
    if (tempsRestantMin < 12 * 60) return 'jourJ';
    if (tempsRestantMin < 24 * 60) return 'urgent';
    if (tempsRestantMin < 72 * 60) return 'surveiller';
    return 'ok';
}

/**
 * Détermine si un document peut être signé en masse (RG-11).
 * Règle : non confidentiel, non urgent, échéance > 24h.
 */
export function peutSignerEnMasse(doc) {
    if (doc.priorite === 'confidentiel') return false;
    if (doc.priorite === 'urgent') return false;
    if (doc.tempsRestantMin < 24 * 60) return false;
    return true;
}

/* ============================================================
   DOCUMENTS À SIGNER
   ============================================================ */

export const DOCUMENTS_A_SIGNER = [
    /* ============================================
       URGENTS / DÉPASSÉS
       ============================================ */
    {
        id: '2026-0452',
        type: 'courrier',
        objet: 'Demande de subvention exceptionnelle -Colloque international 2026',
        provenence: 'SG',
        priorite: 'urgent',
        etat: 'chez-dg',
        tempsRestantMin: 180,
        dateReceptionDG: '2026-09-29T08:00:00',
        dateDocument: '2026-09-28',
        expediteur: 'M. OUÉDRAOGO Salif (SG)',
        produitPar: 'SCC',
        description: "Demande de subvention pour l'organisation du colloque international 2026.",
        contenu: 'Le projet de réponse est ci-joint. Veuillez apposer votre signature ou formuler vos observations.',
        pieces: ['Lettre de demande', 'Budget prévisionnel', 'Avis SG'],
    },
    {
        id: '2026-0398',
        type: 'courrier',
        objet: 'Réponse au Ministère -projet SG (à reformuler)',
        provenence: 'SG',
        priorite: 'urgent',
        etat: 'a-re-signer',
        tempsRestantMin: -240,
        dateReceptionDG: '2026-09-28T14:00:00',
        dateDocument: '2026-09-18',
        expediteur: 'M. OUÉDRAOGO Salif (SG)',
        produitPar: 'SG',
        description: "Projet de réponse au courrier du Ministère de l'Enseignement Supérieur.",
        contenu: 'Ce projet a été rejeté précédemment. Veuillez reformuler selon les directives du Ministère.',
        pieces: ["Courrier d'origine Ministère N°2026-0182", 'Projet de réponse'],
        motifRejetPrecedent: 'À reformuler selon les directives du Ministère',
    },

    /* ============================================
       CONFIDENTIELS
       ============================================ */
    {
        id: '2026-0421',
        type: 'courrier',
        objet: 'Convention de partenariat -Université de Lyon',
        provenence: 'DCPIP',
        priorite: 'confidentiel',
        etat: 'chez-dg',
        tempsRestantMin: 2880,
        dateReceptionDG: '2026-09-27T16:00:00',
        dateDocument: '2026-09-21',
        expediteur: 'Mme BOUDA Céline (DCPIP)',
        produitPar: 'DCPIP',
        description: 'Convention de partenariat pour la mobilité des enseignants et des étudiants.',
        contenu: 'Document confidentiel. Veuillez signer la convention après lecture.',
        pieces: ['Projet de convention', 'Avis DCPIP', "Autorisation d'accès confidentiel"],
    },
    {
        id: '2026-0418',
        type: 'acte',
        objet: 'Décision confidentielle -Sanction disciplinaire',
        provenence: 'DRH',
        priorite: 'confidentiel',
        etat: 'chez-dg',
        tempsRestantMin: 1440,
        dateReceptionDG: '2026-09-28T10:00:00',
        dateDocument: '2026-09-27',
        expediteur: 'M. COMPAORÉ Ali (DRH)',
        produitPar: 'DRH',
        description: 'Décision relative à une sanction disciplinaire de premier degré.',
        contenu: 'Document strictement confidentiel. À traiter hors réunion.',
        pieces: ['Rapport disciplinaire', 'Procès-verbal'],
    },

    /* ============================================
       NORMAUX (signables en masse)
       ============================================ */
    {
        id: '2026-0448',
        type: 'courrier',
        objet: "Recrutement d'un assistant à l'IGIT -Décision d'engagement",
        provenence: 'DRH',
        priorite: 'normal',
        etat: 'chez-dg',
        tempsRestantMin: 4320,
        dateReceptionDG: '2026-09-27T14:00:00',
        dateDocument: '2026-09-26',
        expediteur: 'M. COMPAORÉ Ali (DRH)',
        produitPar: 'DRH',
        description: "Décision d'engagement d'un assistant à l'IGIT.",
        contenu: 'Le dossier de recrutement est complet. Veuillez signer la décision d\'engagement.',
        pieces: ['Dossier de candidature', 'CV', 'Diplômes', 'PV de sélection'],
    },
    {
        id: '2026-0443',
        type: 'acte',
        objet: 'Certificat de travail -M. SAWADOGO Bakary',
        provenence: 'DRH',
        priorite: 'normal',
        etat: 'chez-dg',
        tempsRestantMin: 5760,
        dateReceptionDG: '2026-09-27T09:00:00',
        dateDocument: '2026-09-26',
        expediteur: 'M. COMPAORÉ Ali (DRH)',
        produitPar: 'DRH',
        description: 'Certificat de travail demandé par l\'agent.',
        contenu: 'Certificat conforme aux informations RH. À signer pour remise à l\'agent.',
        pieces: ['Demande agent', 'Fiche RH'],
    },
    {
        id: '2026-0441',
        type: 'acte',
        objet: 'Attestation de prise de service -Mme KABORÉ Aminata',
        provenence: 'DRH',
        priorite: 'normal',
        etat: 'chez-dg',
        tempsRestantMin: 7200,
        dateReceptionDG: '2026-09-27T08:00:00',
        dateDocument: '2026-09-26',
        expediteur: 'M. COMPAORÉ Ali (DRH)',
        produitPar: 'DRH',
        description: 'Attestation de prise de service de Mme KABORÉ Aminata.',
        contenu: 'L\'agent a effectivement pris service. Attestation à signer.',
        pieces: ['Attestation SHI', 'Fiche de poste'],
    },
    {
        id: '2026-0438',
        type: 'acte',
        objet: 'Bordereau d\'envoi -Ministère de la Fonction Publique',
        provenence: 'DAF',
        priorite: 'normal',
        etat: 'chez-dg',
        tempsRestantMin: 8640,
        dateReceptionDG: '2026-09-26T14:00:00',
        dateDocument: '2026-09-25',
        expediteur: 'Mme SANOU Mariam (DAF)',
        produitPar: 'DAF',
        description: 'Bordereau de transmission au Ministère.',
        contenu: 'Bordereau d\'envoi conforme. À signer pour transmission.',
        pieces: ['Bordereau', 'Liste des pièces'],
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_TYPE = [
    { value: '', label: 'Tous les types' },
    { value: 'courrier', label: 'Courriers' },
    { value: 'acte', label: 'Actes administratifs' },
];

export const FILTRES_PRIORITE = [
    { value: '', label: 'Toutes les priorités' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'confidentiel', label: 'Confidentiel' },
    { value: 'normal', label: 'Normal' },
];

export const FILTRES_PROVENANCE = [
    { value: '', label: 'Toutes les provenances' },
    ...Object.values(PROVENANCES).map((p) => ({ value: p.key, label: p.label })),
];

export const OPTIONS_TRI = [
    { value: 'urgence', label: 'Urgence (défaut)' },
    { value: 'recent', label: 'Plus récents' },
    { value: 'ancien', label: 'Plus anciens' },
    { value: 'id-asc', label: 'Numéro croissant' },
    { value: 'id-desc', label: 'Numéro décroissant' },
];