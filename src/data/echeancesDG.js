// src/data/echeancesDG.js

/* ============================================================
   TYPES D'ACTIONS ATTENDUES
   ============================================================ */

export const TYPES_ACTIONS = {
    signer: {
        key: 'signer',
        label: 'Signer',
        shortLabel: 'Signer',
        icon: 'fa-pen',
        chip: 'bg-epo-red-50 text-epo-red-700',
        dot: 'bg-epo-red-500',
    },
    valider: {
        key: 'valider',
        label: 'Valider / Avis',
        shortLabel: 'Valider',
        icon: 'fa-check-double',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
        dot: 'bg-epo-yellow-500',
    },
    instruire: {
        key: 'instruire',
        label: 'Instruire',
        shortLabel: 'Instruire',
        icon: 'fa-gavel',
        chip: 'bg-epo-green-50 text-epo-green-700',
        dot: 'bg-epo-green-500',
    },
    confidentiel: {
        key: 'confidentiel',
        label: 'Confidentiel',
        shortLabel: 'Confid.',
        icon: 'fa-lock',
        chip: 'bg-epo-slate-700 text-white',
        dot: 'bg-epo-slate-700',
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
    const j = Math.floor(h / 24);
    const hh = h % 24;
    return hh > 0 ? `${j}j ${hh}h` : `${j}j`;
}

/**
 * Détermine le bloc temporel selon le temps restant (en minutes).
 */
export function computeBloc(tempsRestantMin) {
    if (tempsRestantMin < 24 * 60) return 'aujourdhui';
    if (tempsRestantMin < 72 * 60) return 'semaine';
    return 'avenir';
}

/**
 * Formate le délai restant en langage humain.
 */
export function formatDelai(tempsRestantMin) {
    if (tempsRestantMin < 0) return `Dépassé de ${formatDuree(tempsRestantMin)}`;
    if (tempsRestantMin < 12 * 60) return `Dans ${formatDuree(tempsRestantMin)}`;
    if (tempsRestantMin < 24 * 60) return `Dans ${formatDuree(tempsRestantMin)}`;
    if (tempsRestantMin < 72 * 60) return `Dans ${formatDuree(tempsRestantMin)}`;
    return `Dans ${formatDuree(tempsRestantMin)}`;
}

/* ============================================================
   ÉCHÉANCES DU DG
   ============================================================ */

export const ECHEANCES_DG = [
    /* ============================================
       DÉPASSÉS (priorité absolue)
       ============================================ */
    {
        id: '2026-0398',
        reference: '2026-0398',
        typeAction: 'signer',
        objet: 'Réponse au Ministère -projet SG (à reformuler)',
        source: 'SG',
        expediteur: 'M. OUÉDRAOGO Salif (SG)',
        tempsRestantMin: -240,
        dateEcheance: '2026-09-29T06:00:00',
        dateReception: '2026-09-28T14:00:00',
        documentType: 'courrier',
        etat: 'a-re-signer',
    },
    {
        id: 'CONF-2026-0021',
        reference: 'CONF-2026-0021',
        typeAction: 'confidentiel',
        objet: 'Décision de sanction disciplinaire -Agent X',
        source: 'DRH',
        expediteur: 'M. COMPAORÉ Ali (DRH)',
        tempsRestantMin: -90,
        dateEcheance: '2026-09-29T08:30:00',
        dateReception: '2026-09-29T08:00:00',
        documentType: 'courrier',
        etat: 'chez-dg',
    },

    /* ============================================
       AUJOURD'HUI (< 24h)
       ============================================ */
    {
        id: '2026-0452',
        reference: '2026-0452',
        typeAction: 'signer',
        objet: 'Demande de subvention exceptionnelle -Colloque 2026',
        source: 'SG',
        expediteur: 'M. OUÉDRAOGO Salif (SG)',
        tempsRestantMin: 180,
        dateEcheance: '2026-09-29T12:00:00',
        dateReception: '2026-09-29T08:00:00',
        documentType: 'courrier',
        etat: 'chez-dg',
    },
    {
        id: 'VAL-2026-0042',
        reference: 'VAL-2026-0042',
        typeAction: 'valider',
        objet: 'Arbitrage budgétaire Q4 -DGA-AVE vs DGA-RCP',
        source: 'SG',
        expediteur: 'M. OUÉDRAOGO Salif (SG)',
        tempsRestantMin: 240,
        dateEcheance: '2026-09-29T13:00:00',
        dateReception: '2026-09-29T08:00:00',
        documentType: 'note',
        etat: 'en-attente-validation',
    },
    {
        id: 'CONF-2026-0019',
        reference: 'CONF-2026-0019',
        typeAction: 'confidentiel',
        objet: 'Rapport d\'audit interne -Exercice 2025',
        source: 'SG',
        expediteur: 'M. OUÉDRAOGO Salif (SG)',
        tempsRestantMin: 480,
        dateEcheance: '2026-09-29T16:00:00',
        dateReception: '2026-09-29T07:30:00',
        documentType: 'courrier',
        etat: 'chez-dg',
    },
    {
        id: 'VAL-2026-0040',
        reference: 'VAL-2026-0040',
        typeAction: 'valider',
        objet: 'Note d\'orientation -Politique de partenariats 2027-2030',
        source: 'DCPIP',
        expediteur: 'Mme BOUDA Céline (DCPIP)',
        tempsRestantMin: 660,
        dateEcheance: '2026-09-29T19:00:00',
        dateReception: '2026-09-29T07:30:00',
        documentType: 'note',
        etat: 'en-attente-validation',
    },
    {
        id: '2026-0418',
        reference: '2026-0418',
        typeAction: 'instruire',
        objet: 'Note de service -Organisation des congés annuels',
        source: 'DRH',
        expediteur: 'M. COMPAORÉ Ali (DRH)',
        tempsRestantMin: 1080,
        dateEcheance: '2026-09-30T02:00:00',
        dateReception: '2026-09-29T09:00:00',
        documentType: 'courrier',
        etat: 'rejete',
    },

    /* ============================================
       CETTE SEMAINE (J-1 à J-3)
       ============================================ */
    {
        id: '2026-0448',
        reference: '2026-0448',
        typeAction: 'signer',
        objet: 'Recrutement assistant IGIT -Décision d\'engagement',
        source: 'DRH',
        expediteur: 'M. COMPAORÉ Ali (DRH)',
        tempsRestantMin: 2880,
        dateEcheance: '2026-09-30T16:00:00',
        dateReception: '2026-09-27T14:00:00',
        documentType: 'courrier',
        etat: 'chez-dg',
    },
    {
        id: 'CONF-2026-0017',
        reference: 'CONF-2026-0017',
        typeAction: 'confidentiel',
        objet: 'Convention de partenariat -Université de Lyon',
        source: 'DCPIP',
        expediteur: 'Mme BOUDA Céline (DCPIP)',
        tempsRestantMin: 3600,
        dateEcheance: '2026-10-01T14:00:00',
        dateReception: '2026-09-27T16:00:00',
        documentType: 'courrier',
        etat: 'chez-dg',
    },
    {
        id: 'VAL-2026-0038',
        reference: 'VAL-2026-0038',
        typeAction: 'valider',
        objet: 'Programme annuel des soutenances 2026-2027',
        source: 'DGA-AVE',
        expediteur: 'Pr. TANKOANO Martin (DGA-AVE)',
        tempsRestantMin: 4200,
        dateEcheance: '2026-10-01T20:00:00',
        dateReception: '2026-09-28T14:00:00',
        documentType: 'note',
        etat: 'en-attente-validation',
    },
    {
        id: 'ACT-2026-0443',
        reference: 'ACT-2026-0443',
        typeAction: 'signer',
        objet: 'Certificat de travail -M. SAWADOGO Bakary',
        source: 'DRH',
        expediteur: 'M. COMPAORÉ Ali (DRH)',
        tempsRestantMin: 5760,
        dateEcheance: '2026-10-02T10:00:00',
        dateReception: '2026-09-27T09:00:00',
        documentType: 'acte',
        etat: 'chez-dg',
    },

    /* ============================================
       À VENIR (J-4+)
       ============================================ */
    {
        id: 'VAL-2026-0036',
        reference: 'VAL-2026-0036',
        typeAction: 'valider',
        objet: 'Rapport d\'activité S2 2026 -DRH',
        source: 'DRH',
        expediteur: 'M. COMPAORÉ Ali (DRH)',
        tempsRestantMin: 7200,
        dateEcheance: '2026-10-03T15:00:00',
        dateReception: '2026-09-27T15:00:00',
        documentType: 'rapport',
        etat: 'en-attente-validation',
    },
    {
        id: 'CONF-2026-0015',
        reference: 'CONF-2026-0015',
        typeAction: 'confidentiel',
        objet: 'Recrutement -Poste de DSI',
        source: 'DRH',
        expediteur: 'M. COMPAORÉ Ali (DRH)',
        tempsRestantMin: 8640,
        dateEcheance: '2026-10-04T11:00:00',
        dateReception: '2026-09-26T11:00:00',
        documentType: 'courrier',
        etat: 'chez-dg',
    },
    {
        id: 'VAL-2026-0034',
        reference: 'VAL-2026-0034',
        typeAction: 'valider',
        objet: 'Projet de convention -Université Joseph Ki-Zerbo',
        source: 'DCPIP',
        expediteur: 'Mme BOUDA Céline (DCPIP)',
        tempsRestantMin: 9600,
        dateEcheance: '2026-10-05T10:00:00',
        dateReception: '2026-09-26T10:00:00',
        documentType: 'note',
        etat: 'en-attente-validation',
    },
    {
        id: 'ACT-2026-0438',
        reference: 'ACT-2026-0438',
        typeAction: 'signer',
        objet: 'Bordereau d\'envoi -Ministère de la Fonction Publique',
        source: 'DAF',
        expediteur: 'Mme SANOU Mariam (DAF)',
        tempsRestantMin: 11520,
        dateEcheance: '2026-10-06T14:00:00',
        dateReception: '2026-09-26T14:00:00',
        documentType: 'acte',
        etat: 'chez-dg',
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_TYPE_ACTION = [
    { value: '', label: 'Toutes les actions' },
    { value: 'signer', label: 'Signer' },
    { value: 'valider', label: 'Valider / Avis' },
    { value: 'instruire', label: 'Instruire' },
    { value: 'confidentiel', label: 'Confidentiel' },
];

export const FILTRES_BLOC = [
    { value: '', label: 'Tous les délais' },
    { value: 'aujourdhui', label: "Aujourd'hui" },
    { value: 'semaine', label: 'Cette semaine' },
    { value: 'avenir', label: 'À venir' },
];