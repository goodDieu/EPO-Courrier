// src/data/rejetesDG.js

/* ============================================================
   NATURES DE MOTIF DE REJET (§8.7)
   ============================================================ */

export const NATURES_MOTIF = {
    fond: {
        key: 'fond',
        label: 'Fond',
        icon: 'fa-file-alt',
        chip: 'bg-epo-red-50 text-epo-red-700',
    },
    forme: {
        key: 'forme',
        label: 'Forme',
        icon: 'fa-pen-nib',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
    },
    pieces: {
        key: 'pieces',
        label: 'Pièces',
        icon: 'fa-paperclip',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
    },
};

/* ============================================================
   ÉTATS DE REJET
   ============================================================ */

export const ETATS_REJET = {
    'rejete': {
        label: 'Rejeté',
        variant: 'red',
        description: 'Vient d\'être rejeté, en attente de correction',
        icon: 'fa-times-circle',
        chip: 'bg-epo-red-50 text-epo-red-700',
        dot: 'bg-epo-red-500',
    },
    'en-correction': {
        label: 'En correction',
        variant: 'orange',
        description: 'Le SG/producteur retravaille le document',
        icon: 'fa-pen',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
        dot: 'bg-epo-yellow-500',
    },
    're-soumis': {
        label: 'Re-soumis',
        variant: 'blue',
        description: 'Le document corrigé est revenu au DG',
        icon: 'fa-redo',
        chip: 'bg-epo-green-50 text-epo-green-700',
        dot: 'bg-epo-green-500',
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

export function formatDate(iso) {
    if (!iso) return '-';
    return new Date(iso).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

export function formatDureeDepuis(iso) {
    if (!iso) return '-';
    const diff = (new Date() - new Date(iso)) / (1000 * 60);
    const abs = Math.abs(diff);
    if (abs < 60) return `${Math.round(abs)}min`;
    const h = Math.floor(abs / 60);
    if (h < 24) return `${h}h`;
    return `${Math.floor(h / 24)}j`;
}

/* ============================================================
   DOCUMENTS REJETÉS
   ============================================================ */

export const DOCUMENTS_REJETES = [
    /* ============================================
       RE-SOUMIS (à traiter en priorité)
       ============================================ */
    {
        id: '2026-0398',
        type: 'courrier',
        objet: 'Réponse au Ministère -projet SG (corrigé)',
        provenence: 'SG',
        produitPar: 'SG',
        expediteur: 'M. OUÉDRAOGO Salif (SG)',
        priorite: 'urgent',
        etat: 're-soumis',
        // Historique du rejet
        dateRejet: '2026-09-25T14:00:00',
        natureMotif: 'fond',
        motifRejet: 'Le projet ne tient pas compte des nouvelles directives du Ministère.',
        rejetePar: 'Pr. NIKIÉMA Adama (DG)',
        // Historique de la correction
        correctionPar: 'M. OUÉDRAOGO Salif (SG)',
        dateCorrection: '2026-09-28T10:00:00',
        // Re-soumission
        dateReSoumission: '2026-09-29T08:00:00',
        // Détail
        description: 'Projet de réponse au courrier du Ministère de l\'Enseignement Supérieur.',
        contenu: 'Ce projet a été rejeté sur le fond puis corrigé par le SG selon les nouvelles directives. À signer ou re-rejeter.',
        pieces: ['Courrier Ministère N°2026-0182', 'Projet corrigé', 'Note de correction SG'],
        historiqueCorrections: [
            {
                date: '2026-09-28T10:00:00',
                auteur: 'M. OUÉDRAOGO Salif (SG)',
                description: 'Révision du fond -intégration des directives ministérielles du 20/09/2026',
            },
        ],
    },
    {
        id: '2026-0405',
        type: 'acte',
        objet: 'Décision de nomination -Comité de pilotage (corrigée)',
        provenence: 'DRH',
        produitPar: 'DRH',
        expediteur: 'M. COMPAORÉ Ali (DRH)',
        priorite: 'urgent',
        etat: 're-soumis',
        dateRejet: '2026-09-26T11:30:00',
        natureMotif: 'forme',
        motifRejet: 'Erreur sur la fonction d\'un des membres et fautes de frappe.',
        rejetePar: 'Pr. NIKIÉMA Adama (DG)',
        correctionPar: 'M. COMPAORÉ Ali (DRH)',
        dateCorrection: '2026-09-28T15:00:00',
        dateReSoumission: '2026-09-29T09:00:00',
        description: 'Décision de nomination des membres du comité de pilotage du projet X.',
        contenu: 'Décision corrigée avec les bonnes fonctions et sans fautes. À signer ou re-rejeter.',
        pieces: ['Décision corrigée', 'Ancienne version rejetée', 'Liste des membres'],
        historiqueCorrections: [
            {
                date: '2026-09-28T15:00:00',
                auteur: 'M. COMPAORÉ Ali (DRH)',
                description: 'Correction de la forme -fonctions corrigées et relecture orthographique',
            },
        ],
    },

    /* ============================================
       EN CORRECTION
       ============================================ */
    {
        id: '2026-0412',
        type: 'courrier',
        objet: 'Convention de partenariat -Université de Bordeaux',
        provenence: 'DCPIP',
        produitPar: 'DCPIP',
        expediteur: 'Mme BOUDA Céline (DCPIP)',
        priorite: 'normal',
        etat: 'en-correction',
        dateRejet: '2026-09-27T10:00:00',
        natureMotif: 'pieces',
        motifRejet: 'Manque l\'avis juridique et la traduction certifiée du document.',
        rejetePar: 'Pr. NIKIÉMA Adama (DG)',
        correctionPar: null,
        dateCorrection: null,
        dateReSoumission: null,
        description: 'Convention de partenariat avec l\'Université de Bordeaux.',
        contenu: 'En attente de complétion des pièces manquantes par la DCPIP.',
        pieces: ['Projet de convention', 'Avis DCPIP'],
    },
    {
        id: '2026-0415',
        type: 'acte',
        objet: 'Décision d\'attribution -Marché de fourniture informatique',
        provenence: 'PRMP',
        produitPar: 'PRMP',
        expediteur: 'M. KONATÉ Souleymane (PRMP)',
        priorite: 'normal',
        etat: 'en-correction',
        dateRejet: '2026-09-27T15:30:00',
        natureMotif: 'fond',
        motifRejet: 'Le montant dépasse le seuil autorisé sans visa préalable de la DAF.',
        rejetePar: 'Pr. NIKIÉMA Adama (DG)',
        correctionPar: null,
        dateCorrection: null,
        dateReSoumission: null,
        description: 'Décision d\'attribution pour le marché de fourniture informatique.',
        contenu: 'En attente de visa préalable de la DAF sur le montant.',
        pieces: ['Décision', 'Rapport d\'analyse', 'Offres'],
    },

    /* ============================================
       REJETÉS RÉCENTS (vient d'être rejeté)
       ============================================ */
    {
        id: '2026-0418',
        type: 'courrier',
        objet: 'Note de service -Organisation des congés annuels',
        provenence: 'DRH',
        produitPar: 'DRH',
        expediteur: 'M. COMPAORÉ Ali (DRH)',
        priorite: 'normal',
        etat: 'rejete',
        dateRejet: '2026-09-29T09:00:00',
        natureMotif: 'fond',
        motifRejet: 'Les dates proposées ne tiennent pas compte du calendrier académique des soutenances.',
        rejetePar: 'Pr. NIKIÉMA Adama (DG)',
        correctionPar: null,
        dateCorrection: null,
        dateReSoumission: null,
        description: 'Note de service sur l\'organisation des congés annuels du personnel.',
        contenu: 'En attente de correction par la DRH. Le SG a été notifié (RG-18).',
        pieces: ['Note de service', 'Calendrier proposé'],
    },
    {
        id: '2026-0419',
        type: 'courrier',
        objet: 'Communication officielle -Prix d\'excellence 2026',
        provenence: 'SG',
        produitPar: 'SG',
        expediteur: 'M. OUÉDRAOGO Salif (SG)',
        priorite: 'urgent',
        etat: 'rejete',
        dateRejet: '2026-09-29T08:30:00',
        natureMotif: 'forme',
        motifRejet: 'Le format de communication ne correspond pas aux standards officiels de l\'EPO.',
        rejetePar: 'Pr. NIKIÉMA Adama (DG)',
        correctionPar: null,
        dateCorrection: null,
        dateReSoumission: null,
        description: 'Communiqué officiel pour le Prix d\'excellence 2026.',
        contenu: 'À reformater selon les standards. Le SG a été notifié (RG-18).',
        pieces: ['Projet de communiqué', 'Modèle standard EPO'],
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_ETAT = [
    { value: '', label: 'Tous les états' },
    { value: 'rejete', label: 'Rejeté' },
    { value: 'en-correction', label: 'En correction' },
    { value: 're-soumis', label: 'Re-soumis' },
];

export const FILTRES_MOTIF = [
    { value: '', label: 'Tous les motifs' },
    { value: 'fond', label: 'Fond' },
    { value: 'forme', label: 'Forme' },
    { value: 'pieces', label: 'Pièces' },
];

export const FILTRES_PROVENANCE = [
    { value: '', label: 'Toutes les provenances' },
    { value: 'SG', label: 'Secrétariat Général' },
    { value: 'DRH', label: 'Direction RH' },
    { value: 'DCPIP', label: 'DCPIP' },
    { value: 'DAF', label: 'Direction Finances' },
    { value: 'PRMP', label: 'PRMP' },
];

export const OPTIONS_TRI = [
    { value: 'urgence', label: 'Priorité (re-soumis d\'abord)' },
    { value: 'recent', label: 'Plus récents' },
    { value: 'ancien', label: 'Plus anciens' },
    { value: 'id-asc', label: 'Numéro croissant' },
    { value: 'id-desc', label: 'Numéro décroissant' },
];