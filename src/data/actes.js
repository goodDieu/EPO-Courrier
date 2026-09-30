// src/data/actes.js

/* ============================================================
   NATURES D'ACTES
   ============================================================ */

export const NATURES_ACTES = {
    'certificat-prise': {
        key: 'certificat-prise',
        label: 'Certificat de prise de service',
        shortLabel: 'Prise service',
        icon: 'fa-user-check',
        color: 'bg-epo-slate-100 text-epo-slate-700',
        prefix: 'CPS',
        regles: ['attestation-shi'],
    },
    'certificat-cessation': {
        key: 'certificat-cessation',
        label: 'Certificat de cessation de service',
        shortLabel: 'Cessation service',
        icon: 'fa-user-slash',
        color: 'bg-epo-slate-100 text-epo-slate-700',
        prefix: 'CCS',
        regles: [],
    },
    'certificat-reprise': {
        key: 'certificat-reprise',
        label: 'Certificat de reprise de service',
        shortLabel: 'Reprise service',
        icon: 'fa-user-clock',
        color: 'bg-epo-slate-100 text-epo-slate-700',
        prefix: 'CRS',
        regles: [],
    },
    'certificat-travail': {
        key: 'certificat-travail',
        label: 'Certificat de travail',
        shortLabel: 'Travail',
        icon: 'fa-briefcase',
        color: 'bg-epo-slate-100 text-epo-slate-700',
        prefix: 'CT',
        regles: [],
    },
    'cessation-paiement': {
        key: 'cessation-paiement',
        label: 'Certificat de cessation de paiement',
        shortLabel: 'Cessation paiement',
        icon: 'fa-money-bill-wave',
        color: 'bg-epo-red-50 text-epo-red-700',
        prefix: 'CCP',
        regles: [],
    },
    'autorisation-absence': {
        key: 'autorisation-absence',
        label: "Autorisation d'absence",
        shortLabel: 'Absence',
        icon: 'fa-calendar-minus',
        color: 'bg-epo-green-50 text-epo-green-700',
        prefix: 'AA',
        regles: ['quota-absence', 'incoherence-dates'],
    },
    'decision-conge': {
        key: 'decision-conge',
        label: 'Décision de congé',
        shortLabel: 'Congé',
        icon: 'fa-umbrella-beach',
        color: 'bg-epo-green-50 text-epo-green-700',
        prefix: 'DC',
        regles: ['eligibilite-conge', 'timbre-fiscal', 'incoherence-dates'],
    },
    'bordereau': {
        key: 'bordereau',
        label: "Bordereau d'envoi",
        shortLabel: 'Bordereau',
        icon: 'fa-list',
        color: 'bg-epo-slate-100 text-epo-slate-700',
        prefix: 'BE',
        regles: [],
    },
    'ordre-mission': {
        key: 'ordre-mission',
        label: 'Ordre de mission',
        shortLabel: 'Mission',
        icon: 'fa-route',
        color: 'bg-epo-yellow-50 text-epo-yellow-700',
        prefix: 'OM',
        regles: ['incoherence-dates'],
    },
};

/* ============================================================
   ÉTATS D'ACTES (issus §11.2 du CDC)
   ============================================================ */

export const ETATS_ACTES = {
    'brouillon': { label: 'Brouillon', variant: 'gray' },
    'soumis-shi': { label: 'Soumis SHI', variant: 'blue' },
    'chez-sg': { label: 'Chez SG (amendement)', variant: 'orange' },
    'renvoye-correction': { label: 'Renvoyé pour correction', variant: 'red' },
    'vu-bon-a-signer': { label: 'Vu bon à signer', variant: 'blue' },
    'chez-dg': { label: 'Chez DG', variant: 'orange' },
    'signe': { label: 'Signé', variant: 'green' },
    'rejete': { label: 'Rejeté', variant: 'red' },
    'diffuse': { label: 'Diffusé', variant: 'purple' },
    'archive': { label: 'Archivé', variant: 'gray' },
};

/* ============================================================
   SIGNATURES
   ============================================================ */

export const SIGNATURES = {
    'dg': {
        label: 'Signé par DG',
        icon: 'fa-check-circle',
        color: 'text-epo-green-600',
        detail: 'Pr. NIKIÉMA Adama',
    },
    'sg-delegation': {
        label: 'Signé par SG par délégation',
        icon: 'fa-stamp',
        color: 'text-epo-slate-700',
        detail: 'Pour le DG et par délégation, le SG',
    },
    'attente': {
        label: 'En attente de signature',
        icon: 'fa-hourglass-half',
        color: 'text-epo-yellow-600',
        detail: '-',
    },
    'rejete': {
        label: 'Rejeté',
        icon: 'fa-times-circle',
        color: 'text-epo-red-600',
        detail: 'Motif requis',
    },
};

/* ============================================================
   AGENTS (pour autocomplete)
   ============================================================ */

export const AGENTS = [
    { id: 'a1', nom: 'KABORÉ Issa', matricule: 'EPO-2019-0142', structure: 'DRH', fonction: 'Assistant administratif', dateService: '2019-03-15' },
    { id: 'a2', nom: 'KABORÉ Aminata', matricule: 'EPO-2020-0218', structure: 'DAF', fonction: 'Comptable', dateService: '2020-09-01' },
    { id: 'a3', nom: 'OUÉDRAOGO Karim', matricule: 'EPO-2021-0305', structure: 'SCC', fonction: 'Agent SCC', dateService: '2021-01-10' },
    { id: 'a4', nom: 'ZONGO Aïcha', matricule: 'EPO-2022-0412', structure: 'SCC', fonction: 'Agent numérisation', dateService: '2022-06-20' },
    { id: 'a5', nom: 'SAWADOGO Bakary', matricule: 'EPO-2018-0087', structure: 'SCC', fonction: 'Agent de liaison', dateService: '2018-11-05' },
    { id: 'a6', nom: 'TRAORÉ Ibrahim', matricule: 'EPO-2017-0034', structure: 'SCC', fonction: 'Chef SCC', dateService: '2017-10-02' },
    { id: 'a7', nom: 'COMPAORÉ Ali', matricule: 'EPO-2019-0165', structure: 'DRH', fonction: 'Directeur RH', dateService: '2019-04-12' },
    { id: 'a8', nom: 'SANOU Mariam', matricule: 'EPO-2020-0234', structure: 'DAF', fonction: 'Directrice Finances', dateService: '2020-02-03' },
];

/* ============================================================
   ACTES EXISTANTS (mock)
   ============================================================ */

// export const ACTES = [
//     {
//         id: 'ACT-2026-0405',
//         nature: 'decision-conge',
//         beneficiaireId: 'a1',
//         beneficiaireNom: 'KABORÉ Issa',
//         beneficiaireMatricule: 'EPO-2019-0142',
//         beneficiaireStructure: 'DRH',
//         objet: 'Congé administratif - 30 jours',
//         etat: 'signe',
//         signature: 'dg',
//         dateCreation: '2026-09-24T09:15:00',
//         dateSignature: '2026-09-25T14:30:00',
//         echeance: '2026-09-27T09:15:00',
//         tempsRestant: 2880, // encore OK
//         produitPar: 'DRH',
//     },
//     {
//         id: 'ACT-2026-0402',
//         nature: 'certificat-prise',
//         beneficiaireId: 'a4',
//         beneficiaireNom: 'ZONGO Aïcha',
//         beneficiaireMatricule: 'EPO-2022-0412',
//         beneficiaireStructure: 'SCC',
//         objet: 'Prise de service du 15/09/2026',
//         etat: 'signe',
//         signature: 'sg-delegation',
//         dateCreation: '2026-09-20T10:00:00',
//         dateSignature: '2026-09-21T11:20:00',
//         echeance: '2026-09-23T10:00:00',
//         tempsRestant: 1440,
//         produitPar: 'DRH',
//     },
//     {
//         id: 'ACT-2026-0410',
//         nature: 'ordre-mission',
//         beneficiaireId: 'a7',
//         beneficiaireNom: 'COMPAORÉ Ali',
//         beneficiaireMatricule: 'EPO-2019-0165',
//         beneficiaireStructure: 'DRH',
//         objet: 'Mission Ouagadougou → Bobo-Dioulasso',
//         etat: 'chez-dg',
//         signature: 'attente',
//         dateCreation: '2026-09-26T08:30:00',
//         dateSignature: null,
//         echeance: '2026-09-29T08:30:00',
//         tempsRestant: 180, // Jour J
//         produitPar: 'DRH',
//     },
//     {
//         id: 'ACT-2026-0412',
//         nature: 'autorisation-absence',
//         beneficiaireId: 'a3',
//         beneficiaireNom: 'OUÉDRAOGO Karim',
//         beneficiaireMatricule: 'EPO-2021-0305',
//         beneficiaireStructure: 'SCC',
//         objet: "Absence du 02/10 au 04/10/2026 - Raison familiale",
//         etat: 'vu-bon-a-signer',
//         signature: 'attente',
//         dateCreation: '2026-09-27T14:00:00',
//         dateSignature: null,
//         echeance: '2026-09-30T14:00:00',
//         tempsRestant: 1320, // Urgent
//         produitPar: 'DRH',
//     },
//     {
//         id: 'ACT-2026-0413',
//         nature: 'certificat-travail',
//         beneficiaireId: 'a5',
//         beneficiaireNom: 'SAWADOGO Bakary',
//         beneficiaireMatricule: 'EPO-2018-0087',
//         beneficiaireStructure: 'SCC',
//         objet: 'Certificat de travail - 8 ans de service',
//         etat: 'chez-sg',
//         signature: 'attente',
//         dateCreation: '2026-09-28T11:00:00',
//         dateSignature: null,
//         echeance: '2026-10-01T11:00:00',
//         tempsRestant: 3240, // À surveiller
//         produitPar: 'DRH',
//     },
//     {
//         id: 'ACT-2026-0414',
//         nature: 'decision-conge',
//         beneficiaireId: 'a8',
//         beneficiaireNom: 'SANOU Mariam',
//         beneficiaireMatricule: 'EPO-2020-0234',
//         beneficiaireStructure: 'DAF',
//         objet: 'Congé administratif - 15 jours',
//         etat: 'rejete',
//         signature: 'rejete',
//         dateCreation: '2026-09-22T09:00:00',
//         dateSignature: null,
//         echeance: '2026-09-24T09:00:00',
//         tempsRestant: -1440,
//         produitPar: 'DRH',
//         motifRejet: 'Timbre fiscal 200 FCFA manquant',
//     },
//     {
//         id: 'ACT-2026-0415',
//         nature: 'certificat-cessation',
//         beneficiaireId: 'a2',
//         beneficiaireNom: 'KABORÉ Aminata',
//         beneficiaireMatricule: 'EPO-2020-0218',
//         beneficiaireStructure: 'DAF',
//         objet: 'Cessation de service au 30/09/2026',
//         etat: 'brouillon',
//         signature: 'attente',
//         dateCreation: '2026-09-29T08:00:00',
//         dateSignature: null,
//         echeance: '2026-10-02T08:00:00',
//         tempsRestant: 4320,
//         produitPar: 'DRH',
//     },
//     {
//         id: 'ACT-2026-0400',
//         nature: 'bordereau',
//         beneficiaireId: 'a6',
//         beneficiaireNom: 'TRAORÉ Ibrahim',
//         beneficiaireMatricule: 'EPO-2017-0034',
//         beneficiaireStructure: 'SCC',
//         objet: 'Bordereau envoi Ministère - 4 pièces',
//         etat: 'diffuse',
//         signature: 'sg-delegation',
//         dateCreation: '2026-09-18T09:00:00',
//         dateSignature: '2026-09-19T10:00:00',
//         echeance: '2026-09-21T09:00:00',
//         tempsRestant: 7200,
//         produitPar: 'SCC',
//     },
//     {
//         id: 'ACT-2026-0395',
//         nature: 'certificat-reprise',
//         beneficiaireId: 'a3',
//         beneficiaireNom: 'OUÉDRAOGO Karim',
//         beneficiaireMatricule: 'EPO-2021-0305',
//         beneficiaireStructure: 'SCC',
//         objet: 'Reprise de service après congé maladie',
//         etat: 'archive',
//         signature: 'dg',
//         dateCreation: '2026-09-10T09:00:00',
//         dateSignature: '2026-09-11T15:00:00',
//         echeance: '2026-09-14T09:00:00',
//         tempsRestant: 20000,
//         produitPar: 'DRH',
//     },
// ];

/* ============================================================
   ACTES EXISTANTS (mock - peuplés pour tous les états)
   ============================================================ */

export const ACTES = [
    /* ============================================
       ÉTAT : BROUILLON (2)
       ============================================ */
    {
        id: 'ACT-2026-0415',
        nature: 'certificat-cessation',
        beneficiaireId: 'a2',
        beneficiaireNom: 'KABORÉ Aminata',
        beneficiaireMatricule: 'EPO-2020-0218',
        beneficiaireStructure: 'DAF',
        objet: 'Cessation de service au 30/09/2026',
        etat: 'brouillon',
        signature: 'attente',
        dateCreation: '2026-09-29T08:00:00',
        dateSignature: null,
        echeance: '2026-10-02T08:00:00',
        tempsRestant: 4320,
        produitPar: 'DRH',
    },
    {
        id: 'ACT-2026-0416',
        nature: 'certificat-reprise',
        beneficiaireId: 'a3',
        beneficiaireNom: 'OUÉDRAOGO Karim',
        beneficiaireMatricule: 'EPO-2021-0305',
        beneficiaireStructure: 'SCC',
        objet: 'Reprise de service après congé maladie',
        etat: 'brouillon',
        signature: 'attente',
        dateCreation: '2026-09-29T10:15:00',
        dateSignature: null,
        echeance: '2026-10-03T10:15:00',
        tempsRestant: 5760,
        produitPar: 'DRH',
    },

    /* ============================================
       ÉTAT : SOUMIS SHI (2)
       ============================================ */
    {
        id: 'ACT-2026-0417',
        nature: 'certificat-prise',
        beneficiaireId: 'a5',
        beneficiaireNom: 'SAWADOGO Bakary',
        beneficiaireMatricule: 'EPO-2018-0087',
        beneficiaireStructure: 'SCC',
        objet: 'Prise de service du 28/09/2026',
        etat: 'soumis-shi',
        signature: 'attente',
        dateCreation: '2026-09-28T14:00:00',
        dateSignature: null,
        echeance: '2026-10-01T14:00:00',
        tempsRestant: 2880,
        produitPar: 'DRH',
    },
    {
        id: 'ACT-2026-0418',
        nature: 'autorisation-absence',
        beneficiaireId: 'a2',
        beneficiaireNom: 'KABORÉ Aminata',
        beneficiaireMatricule: 'EPO-2020-0218',
        beneficiaireStructure: 'DAF',
        objet: "Absence du 05/10 au 06/10/2026 - Raison médicale",
        etat: 'soumis-shi',
        signature: 'attente',
        dateCreation: '2026-09-29T09:30:00',
        dateSignature: null,
        echeance: '2026-10-01T09:30:00',
        tempsRestant: 2160,
        produitPar: 'DRH',
    },

    /* ============================================
       ÉTAT : CHEZ SG (amendement) (2)
       ============================================ */
    {
        id: 'ACT-2026-0413',
        nature: 'certificat-travail',
        beneficiaireId: 'a5',
        beneficiaireNom: 'SAWADOGO Bakary',
        beneficiaireMatricule: 'EPO-2018-0087',
        beneficiaireStructure: 'SCC',
        objet: 'Certificat de travail - 8 ans de service',
        etat: 'chez-sg',
        signature: 'attente',
        dateCreation: '2026-09-28T11:00:00',
        dateSignature: null,
        echeance: '2026-10-01T11:00:00',
        tempsRestant: 3240,
        produitPar: 'DRH',
    },
    {
        id: 'ACT-2026-0419',
        nature: 'ordre-mission',
        beneficiaireId: 'a8',
        beneficiaireNom: 'SANOU Mariam',
        beneficiaireMatricule: 'EPO-2020-0234',
        beneficiaireStructure: 'DAF',
        objet: 'Mission Ouagadougou → Koudougou',
        etat: 'chez-sg',
        signature: 'attente',
        dateCreation: '2026-09-28T15:00:00',
        dateSignature: null,
        echeance: '2026-10-02T15:00:00',
        tempsRestant: 4680,
        produitPar: 'DRH',
    },

    /* ============================================
       ÉTAT : RENVOYÉ POUR CORRECTION (2)
       ============================================ */
    {
        id: 'ACT-2026-0420',
        nature: 'decision-conge',
        beneficiaireId: 'a4',
        beneficiaireNom: 'ZONGO Aïcha',
        beneficiaireMatricule: 'EPO-2022-0412',
        beneficiaireStructure: 'SCC',
        objet: 'Congé administratif - 20 jours',
        etat: 'renvoye-correction',
        signature: 'attente',
        dateCreation: '2026-09-26T10:00:00',
        dateSignature: null,
        echeance: '2026-09-28T10:00:00',
        tempsRestant: -720,
        produitPar: 'DRH',
        motifRejet: 'Pièces justificatives incomplètes - attestation SHI manquante',
    },
    {
        id: 'ACT-2026-0421',
        nature: 'autorisation-absence',
        beneficiaireId: 'a6',
        beneficiaireNom: 'TRAORÉ Ibrahim',
        beneficiaireMatricule: 'EPO-2017-0034',
        beneficiaireStructure: 'SCC',
        objet: "Absence du 01/10 au 03/10/2026 - Événement familial",
        etat: 'renvoye-correction',
        signature: 'attente',
        dateCreation: '2026-09-27T08:00:00',
        dateSignature: null,
        echeance: '2026-09-29T08:00:00',
        tempsRestant: -120,
        produitPar: 'DRH',
        motifRejet: 'Dates incohérentes - à corriger',
    },

    /* ============================================
       ÉTAT : VU BON À SIGNER (2)
       ============================================ */
    {
        id: 'ACT-2026-0412',
        nature: 'autorisation-absence',
        beneficiaireId: 'a3',
        beneficiaireNom: 'OUÉDRAOGO Karim',
        beneficiaireMatricule: 'EPO-2021-0305',
        beneficiaireStructure: 'SCC',
        objet: "Absence du 02/10 au 04/10/2026 - Raison familiale",
        etat: 'vu-bon-a-signer',
        signature: 'attente',
        dateCreation: '2026-09-27T14:00:00',
        dateSignature: null,
        echeance: '2026-09-30T14:00:00',
        tempsRestant: 1320,
        produitPar: 'DRH',
    },
    {
        id: 'ACT-2026-0422',
        nature: 'certificat-travail',
        beneficiaireId: 'a7',
        beneficiaireNom: 'COMPAORÉ Ali',
        beneficiaireMatricule: 'EPO-2019-0165',
        beneficiaireStructure: 'DRH',
        objet: 'Certificat de travail - 7 ans de service',
        etat: 'vu-bon-a-signer',
        signature: 'attente',
        dateCreation: '2026-09-28T09:00:00',
        dateSignature: null,
        echeance: '2026-10-01T09:00:00',
        tempsRestant: 2880,
        produitPar: 'DRH',
    },

    /* ============================================
       ÉTAT : CHEZ DG (2)
       ============================================ */
    {
        id: 'ACT-2026-0410',
        nature: 'ordre-mission',
        beneficiaireId: 'a7',
        beneficiaireNom: 'COMPAORÉ Ali',
        beneficiaireMatricule: 'EPO-2019-0165',
        beneficiaireStructure: 'DRH',
        objet: 'Mission Ouagadougou → Bobo-Dioulasso',
        etat: 'chez-dg',
        signature: 'attente',
        dateCreation: '2026-09-26T08:30:00',
        dateSignature: null,
        echeance: '2026-09-29T08:30:00',
        tempsRestant: 180,
        produitPar: 'DRH',
    },
    {
        id: 'ACT-2026-0423',
        nature: 'decision-conge',
        beneficiaireId: 'a3',
        beneficiaireNom: 'OUÉDRAOGO Karim',
        beneficiaireMatricule: 'EPO-2021-0305',
        beneficiaireStructure: 'SCC',
        objet: 'Congé administratif - 10 jours',
        etat: 'chez-dg',
        signature: 'attente',
        dateCreation: '2026-09-27T11:00:00',
        dateSignature: null,
        echeance: '2026-09-30T11:00:00',
        tempsRestant: 1080,
        produitPar: 'DRH',
    },

    /* ============================================
       ÉTAT : SIGNÉ (3)
       ============================================ */
    {
        id: 'ACT-2026-0405',
        nature: 'decision-conge',
        beneficiaireId: 'a1',
        beneficiaireNom: 'KABORÉ Issa',
        beneficiaireMatricule: 'EPO-2019-0142',
        beneficiaireStructure: 'DRH',
        objet: 'Congé administratif - 30 jours',
        etat: 'signe',
        signature: 'dg',
        dateCreation: '2026-09-24T09:15:00',
        dateSignature: '2026-09-25T14:30:00',
        echeance: '2026-09-27T09:15:00',
        tempsRestant: 2880,
        produitPar: 'DRH',
    },
    {
        id: 'ACT-2026-0402',
        nature: 'certificat-prise',
        beneficiaireId: 'a4',
        beneficiaireNom: 'ZONGO Aïcha',
        beneficiaireMatricule: 'EPO-2022-0412',
        beneficiaireStructure: 'SCC',
        objet: 'Prise de service du 15/09/2026',
        etat: 'signe',
        signature: 'sg-delegation',
        dateCreation: '2026-09-20T10:00:00',
        dateSignature: '2026-09-21T11:20:00',
        echeance: '2026-09-23T10:00:00',
        tempsRestant: 1440,
        produitPar: 'DRH',
    },
    {
        id: 'ACT-2026-0424',
        nature: 'ordre-mission',
        beneficiaireId: 'a2',
        beneficiaireNom: 'KABORÉ Aminata',
        beneficiaireMatricule: 'EPO-2020-0218',
        beneficiaireStructure: 'DAF',
        objet: 'Mission Ouagadougou → Banfora',
        etat: 'signe',
        signature: 'dg',
        dateCreation: '2026-09-23T08:00:00',
        dateSignature: '2026-09-24T10:30:00',
        echeance: '2026-09-26T08:00:00',
        tempsRestant: 3600,
        produitPar: 'DRH',
    },

    /* ============================================
       ÉTAT : REJETÉ (2)
       ============================================ */
    {
        id: 'ACT-2026-0414',
        nature: 'decision-conge',
        beneficiaireId: 'a8',
        beneficiaireNom: 'SANOU Mariam',
        beneficiaireMatricule: 'EPO-2020-0234',
        beneficiaireStructure: 'DAF',
        objet: 'Congé administratif - 15 jours',
        etat: 'rejete',
        signature: 'rejete',
        dateCreation: '2026-09-22T09:00:00',
        dateSignature: null,
        echeance: '2026-09-24T09:00:00',
        tempsRestant: -1440,
        produitPar: 'DRH',
        motifRejet: 'Timbre fiscal 200 FCFA manquant',
    },
    {
        id: 'ACT-2026-0425',
        nature: 'autorisation-absence',
        beneficiaireId: 'a1',
        beneficiaireNom: 'KABORÉ Issa',
        beneficiaireMatricule: 'EPO-2019-0142',
        beneficiaireStructure: 'DRH',
        objet: "Absence du 15/10 au 20/10/2026",
        etat: 'rejete',
        signature: 'rejete',
        dateCreation: '2026-09-25T14:00:00',
        dateSignature: null,
        echeance: '2026-09-27T14:00:00',
        tempsRestant: -2000,
        produitPar: 'DRH',
        motifRejet: 'Quota annuel de 10 jours dépassé (RG-28)',
    },

    /* ============================================
       ÉTAT : DIFFUSÉ (2)
       ============================================ */
    {
        id: 'ACT-2026-0400',
        nature: 'bordereau',
        beneficiaireId: 'a6',
        beneficiaireNom: 'TRAORÉ Ibrahim',
        beneficiaireMatricule: 'EPO-2017-0034',
        beneficiaireStructure: 'SCC',
        objet: 'Bordereau envoi Ministère - 4 pièces',
        etat: 'diffuse',
        signature: 'sg-delegation',
        dateCreation: '2026-09-18T09:00:00',
        dateSignature: '2026-09-19T10:00:00',
        echeance: '2026-09-21T09:00:00',
        tempsRestant: 7200,
        produitPar: 'SCC',
    },
    {
        id: 'ACT-2026-0426',
        nature: 'certificat-travail',
        beneficiaireId: 'a4',
        beneficiaireNom: 'ZONGO Aïcha',
        beneficiaireMatricule: 'EPO-2022-0412',
        beneficiaireStructure: 'SCC',
        objet: 'Certificat de travail - 4 ans de service',
        etat: 'diffuse',
        signature: 'dg',
        dateCreation: '2026-09-17T10:00:00',
        dateSignature: '2026-09-18T11:00:00',
        echeance: '2026-09-20T10:00:00',
        tempsRestant: 8640,
        produitPar: 'DRH',
    },

    /* ============================================
       ÉTAT : ARCHIVÉ (2)
       ============================================ */
    {
        id: 'ACT-2026-0395',
        nature: 'certificat-reprise',
        beneficiaireId: 'a3',
        beneficiaireNom: 'OUÉDRAOGO Karim',
        beneficiaireMatricule: 'EPO-2021-0305',
        beneficiaireStructure: 'SCC',
        objet: 'Reprise de service après congé maladie',
        etat: 'archive',
        signature: 'dg',
        dateCreation: '2026-09-10T09:00:00',
        dateSignature: '2026-09-11T15:00:00',
        echeance: '2026-09-14T09:00:00',
        tempsRestant: 20000,
        produitPar: 'DRH',
    },
    {
        id: 'ACT-2026-0390',
        nature: 'certificat-cessation',
        beneficiaireId: 'a6',
        beneficiaireNom: 'TRAORÉ Ibrahim',
        beneficiaireMatricule: 'EPO-2017-0034',
        beneficiaireStructure: 'SCC',
        objet: 'Cessation de service au 31/08/2026',
        etat: 'archive',
        signature: 'sg-delegation',
        dateCreation: '2026-08-28T09:00:00',
        dateSignature: '2026-08-29T10:00:00',
        echeance: '2026-09-01T09:00:00',
        tempsRestant: 40000,
        produitPar: 'DRH',
    },
];

/* ============================================================
   MAQUETTES GÉNÉRIQUES
   ============================================================ */

// export const MAQUETTES = {
//     'decision-conge': {
//         titre: 'DÉCISION DE CONGÉ ADMINISTRATIF',
//         reference: 'Décision N° {{numero}} / EPO / DG / 2026',
//         corps: [
//             'Le Directeur Général de l\'École Polytechnique de Ouagadougou,',
//             'Vu les textes en vigueur ;',
//             'Vu la demande de l\'intéressé(e) ;',
//             '',
//             'DÉCIDE',
//             '',
//             'Article 1er : Un congé administratif de {{duree}} jours est accordé à :',
//             '',
//             '   Nom : {{nom}}',
//             '   Matricule : {{matricule}}',
//             '   Structure : {{structure}}',
//             '   Fonction : {{fonction}}',
//             '',
//             'Article 2 : Ce congé prend effet du {{dateDebut}} au {{dateFin}} inclus.',
//             '',
//             'Article 3 : La présente décision sera enregistrée et notifiée à l\'intéressé(e).',
//         ],
//         signature: 'Le Directeur Général',
//         timbre: true,
//     },
//     'autorisation-absence': {
//         titre: "AUTORISATION D'ABSENCE",
//         reference: 'Autorisation N° {{numero}} / EPO / 2026',
//         corps: [
//             'Le Secrétaire Général de l\'École Polytechnique de Ouagadougou,',
//             '',
//             'AUTORISE',
//             '',
//             'L\'agent dont les informations suivent à s\'absenter :',
//             '',
//             '   Nom : {{nom}}',
//             '   Matricule : {{matricule}}',
//             '   Structure : {{structure}}',
//             '',
//             'Du {{dateDebut}} au {{dateFin}} inclus ({{duree}} jours).',
//             '',
//             'Motif : {{motif}}',
//             '',
//             'Cette autorisation est délivrée pour servir et valoir ce que de droit.',
//         ],
//         signature: 'Le Secrétaire Général',
//         timbre: false,
//     },
//     'certificat-prise': {
//         titre: 'CERTIFICAT DE PRISE DE SERVICE',
//         reference: 'Certificat N° {{numero}} / EPO / 2026',
//         corps: [
//             'Je soussigné(e), autorité compétente de l\'École Polytechnique de Ouagadougou,',
//             '',
//             'CERTIFIE',
//             '',
//             'Que l\'agent dont les informations suivent a effectivement pris service :',
//             '',
//             '   Nom : {{nom}}',
//             '   Matricule : {{matricule}}',
//             '   Structure : {{structure}}',
//             '   Fonction : {{fonction}}',
//             '',
//             'Date de prise de service : {{dateDebut}}',
//             '',
//             'En foi de quoi, le présent certificat est délivré pour servir et valoir ce que de droit.',
//         ],
//         signature: 'Le Secrétaire Général',
//         timbre: false,
//     },
//     'certificat-travail': {
//         titre: 'CERTIFICAT DE TRAVAIL',
//         reference: 'Certificat N° {{numero}} / EPO / 2026',
//         corps: [
//             'Je soussigné(e), autorité compétente de l\'École Polytechnique de Ouagadougou,',
//             '',
//             'CERTIFIE',
//             '',
//             'Que l\'agent dont les informations suivent est employé(e) au sein de notre établissement :',
//             '',
//             '   Nom : {{nom}}',
//             '   Matricule : {{matricule}}',
//             '   Structure : {{structure}}',
//             '   Fonction : {{fonction}}',
//             '   Date de prise de service : {{dateService}}',
//             '',
//             'Le présent certificat est délivré pour servir et valoir ce que de droit.',
//         ],
//         signature: 'Le Directeur Général',
//         timbre: false,
//     },
// };

/* ============================================================
   MAQUETTES GÉNÉRIQUES (toutes les natures)
   ============================================================ */

export const MAQUETTES = {
    'decision-conge': {
        titre: 'DÉCISION DE CONGÉ ADMINISTRATIF',
        reference: 'Décision N° {{numero}} / EPO / DG / 2026',
        corps: [
            "Le Directeur Général de l'École Polytechnique de Ouagadougou,",
            'Vu les textes en vigueur ;',
            "Vu la demande de l'intéressé(e) ;",
            '',
            'DÉCIDE',
            '',
            'Article 1er : Un congé administratif de {{duree}} jours est accordé à :',
            '',
            '   Nom : {{nom}}',
            '   Matricule : {{matricule}}',
            '   Structure : {{structure}}',
            '   Fonction : {{fonction}}',
            '',
            'Article 2 : Ce congé prend effet du {{dateDebut}} au {{dateFin}} inclus.',
            '',
            "Article 3 : La présente décision sera enregistrée et notifiée à l'intéressé(e).",
        ],
        signature: 'Le Directeur Général',
        timbre: true,
    },
    'autorisation-absence': {
        titre: "AUTORISATION D'ABSENCE",
        reference: 'Autorisation N° {{numero}} / EPO / SG / 2026',
        corps: [
            "Le Secrétaire Général de l'École Polytechnique de Ouagadougou,",
            'Vu les textes en vigueur ;',
            "Vu la demande de l'intéressé(e) ;",
            '',
            'AUTORISE',
            '',
            "L'agent dont les informations suivent à s'absenter :",
            '',
            '   Nom : {{nom}}',
            '   Matricule : {{matricule}}',
            '   Structure : {{structure}}',
            '   Fonction : {{fonction}}',
            '',
            'Du {{dateDebut}} au {{dateFin}} inclus ({{duree}} jours).',
            '',
            'Motif : {{motif}}',
            '',
            'Cette autorisation est délivrée pour servir et valoir ce que de droit.',
        ],
        signature: 'Le Secrétaire Général',
        timbre: false,
    },
    'certificat-prise': {
        titre: 'CERTIFICAT DE PRISE DE SERVICE',
        reference: 'Certificat N° {{numero}} / EPO / 2026',
        corps: [
            "Je soussigné(e), autorité compétente de l'École Polytechnique de Ouagadougou,",
            '',
            'CERTIFIE',
            '',
            "Que l'agent dont les informations suivent a effectivement pris service :",
            '',
            '   Nom : {{nom}}',
            '   Matricule : {{matricule}}',
            '   Structure : {{structure}}',
            '   Fonction : {{fonction}}',
            '',
            'Date de prise de service : {{dateDebut}}',
            '',
            'En foi de quoi, le présent certificat est délivré pour servir et valoir ce que de droit.',
        ],
        signature: 'Le Secrétaire Général',
        timbre: false,
    },
    'certificat-cessation': {
        titre: 'CERTIFICAT DE CESSATION DE SERVICE',
        reference: 'Certificat N° {{numero}} / EPO / 2026',
        corps: [
            "Je soussigné(e), autorité compétente de l'École Polytechnique de Ouagadougou,",
            '',
            'CERTIFIE',
            '',
            "Que l'agent dont les informations suivent a cessé son service :",
            '',
            '   Nom : {{nom}}',
            '   Matricule : {{matricule}}',
            '   Structure : {{structure}}',
            '   Fonction : {{fonction}}',
            '',
            'Date de cessation de service : {{dateDebut}}',
            '',
            'En foi de quoi, le présent certificat est délivré pour servir et valoir ce que de droit.',
        ],
        signature: 'Le Directeur Général',
        timbre: false,
    },
    'certificat-reprise': {
        titre: 'CERTIFICAT DE REPRISE DE SERVICE',
        reference: 'Certificat N° {{numero}} / EPO / 2026',
        corps: [
            "Je soussigné(e), autorité compétente de l'École Polytechnique de Ouagadougou,",
            '',
            'CERTIFIE',
            '',
            "Que l'agent dont les informations suivent a repris son service :",
            '',
            '   Nom : {{nom}}',
            '   Matricule : {{matricule}}',
            '   Structure : {{structure}}',
            '   Fonction : {{fonction}}',
            '',
            'Date de reprise de service : {{dateDebut}}',
            '',
            'En foi de quoi, le présent certificat est délivré pour servir et valoir ce que de droit.',
        ],
        signature: 'Le Secrétaire Général',
        timbre: false,
    },
    'certificat-travail': {
        titre: 'CERTIFICAT DE TRAVAIL',
        reference: 'Certificat N° {{numero}} / EPO / 2026',
        corps: [
            "Je soussigné(e), autorité compétente de l'École Polytechnique de Ouagadougou,",
            '',
            'CERTIFIE',
            '',
            "Que l'agent dont les informations suivent est employé(e) au sein de notre établissement :",
            '',
            '   Nom : {{nom}}',
            '   Matricule : {{matricule}}',
            '   Structure : {{structure}}',
            '   Fonction : {{fonction}}',
            '   Date de prise de service : {{dateService}}',
            '',
            'Le présent certificat est délivré pour servir et valoir ce que de droit.',
        ],
        signature: 'Le Directeur Général',
        timbre: false,
    },
    'cessation-paiement': {
        titre: 'CERTIFICAT DE CESSATION DE PAIEMENT',
        reference: 'Certificat N° {{numero}} / EPO / 2026',
        corps: [
            "Je soussigné(e), autorité compétente de l'École Polytechnique de Ouagadougou,",
            '',
            'CERTIFIE',
            '',
            "Que le paiement du salaire de l'agent dont les informations suivent est interrompu :",
            '',
            '   Nom : {{nom}}',
            '   Matricule : {{matricule}}',
            '   Structure : {{structure}}',
            '   Fonction : {{fonction}}',
            '',
            'Date effective de cessation de paiement : {{dateDebut}}',
            '',
            'Motif : {{motif}}',
            '',
            'En foi de quoi, le présent certificat est délivré pour servir et valoir ce que de droit.',
        ],
        signature: 'Le Directeur Général',
        timbre: false,
    },
    'bordereau': {
        titre: "BORDEREAU D'ENVOI",
        reference: 'Bordereau N° {{numero}} / EPO / 2026',
        corps: [
            'Référence : {{reference}}',
            '',
            "Objet : {{objet}}",
            '',
            "Destinataire : {{destinataire}}",
            '',
            'Désignation des pièces transmises :',
            '',
            '   1. ………………………………………………………………',
            '   2. ………………………………………………………………',
            '   3. ………………………………………………………………',
            '',
            'Nombre total de pièces : {{nombrePieces}}',
            '',
            'Le présent bordereau est établi pour servir et valoir ce que de droit.',
        ],
        signature: 'Le Secrétaire Général',
        timbre: false,
    },
    'ordre-mission': {
        titre: 'ORDRE DE MISSION',
        reference: 'Ordre N° {{numero}} / EPO / 2026',
        corps: [
            "Le Directeur Général de l'École Polytechnique de Ouagadougou,",
            '',
            'AUTORISE',
            '',
            "L'agent dont les informations suivent à effectuer une mission :",
            '',
            '   Nom : {{nom}}',
            '   Matricule : {{matricule}}',
            '   Structure : {{structure}}',
            '   Fonction : {{fonction}}',
            '',
            'Lieu de mission : {{lieuMission}}',
            'Du {{dateDebut}} au {{dateFin}} inclus ({{duree}} jours).',
            '',
            'Objet de la mission : {{motif}}',
            '',
            'Les frais de mission seront pris en charge conformément aux textes en vigueur.',
        ],
        signature: 'Le Directeur Général',
        timbre: false,
    },
};

/* ============================================================
   RÈGLES MÉTIER RH (issues §13.6 du CDC)
   ============================================================ */

export const REGLES_RH = {
    'quota-absence': {
        code: 'RG-28',
        libelle: "Quota d'autorisation d'absence : 10 jours par année civile",
        verifier: (data) => {
            const duree = data.duree || 0;
            const consomme = data.consomme || 0; // jours déjà consommés cette année
            const total = consomme + duree;
            if (total > 10) {
                return {
                    bloque: true,
                    message: `Le quota annuel de 10 jours serait dépassé (${total} jours au total). Imputation congé applicable au-delà.`,
                };
            }
            return { bloque: false };
        },
    },
    'eligibilite-conge': {
        code: 'RG-30',
        libelle: 'Éligibilité au congé administratif : 11 mois de service effectif',
        verifier: (data) => {
            if (!data.dateService) {
                return { bloque: true, message: 'Date de prise de service requise.' };
            }
            const debut = new Date(data.dateService);
            const now = new Date();
            const mois = (now.getFullYear() - debut.getFullYear()) * 12 + (now.getMonth() - debut.getMonth());
            if (mois < 11) {
                return {
                    bloque: true,
                    message: `L'agent totalise ${mois} mois de service. Minimum requis : 11 mois (RG-30).`,
                };
            }
            return { bloque: false };
        },
    },
    'timbre-fiscal': {
        code: 'RG-31',
        libelle: 'Timbre fiscal de 200 FCFA requis pour décision de congé',
        verifier: (data) => {
            if (!data.timbreFiscal) {
                return {
                    bloque: true,
                    message: 'Le timbre fiscal de 200 FCFA doit être joint à la demande (RG-31).',
                };
            }
            return { bloque: false };
        },
    },
    'attestation-shi': {
        code: 'RG-32',
        libelle: 'Certificat de prise de service lié à l\'attestation SHI',
        verifier: (data) => {
            if (!data.attestationSHI) {
                return {
                    bloque: true,
                    message: "L'attestation du Supérieur Hiérarchique Immédiat (SHI) est requise (RG-32).",
                };
            }
            return { bloque: false };
        },
    },
    'incoherence-dates': {
        code: 'RG-33',
        libelle: 'Cohérence des dates (début ≤ fin)',
        verifier: (data) => {
            if (data.dateDebut && data.dateFin) {
                if (new Date(data.dateDebut) > new Date(data.dateFin)) {
                    return {
                        bloque: true,
                        message: 'La date de début ne peut pas être postérieure à la date de fin (RG-33).',
                    };
                }
            }
            return { bloque: false };
        },
    },
};

/* ============================================================
   HELPERS
   ============================================================ */

export function computeDureeJours(dateDebut, dateFin) {
    if (!dateDebut || !dateFin) return 0;
    const d1 = new Date(dateDebut);
    const d2 = new Date(dateFin);
    const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
}

export function formatDate(iso) {
    if (!iso) return '-';
    return new Date(iso).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

export function formatDateTime(iso) {
    if (!iso) return '-';
    return new Date(iso).toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_NATURE = [
    { value: '', label: 'Toutes les natures' },
    ...Object.values(NATURES_ACTES).map((n) => ({ value: n.key, label: n.label })),
];

export const FILTRES_ETAT = [
    { value: '', label: 'Tous les états' },
    ...Object.entries(ETATS_ACTES).map(([k, v]) => ({ value: k, label: v.label })),
];

export const FILTRES_PERIODE = [
    { value: '', label: 'Toutes les périodes' },
    { value: '7j', label: '7 derniers jours' },
    { value: '30j', label: '30 derniers jours' },
    { value: 'trimestre', label: 'Trimestre en cours' },
    { value: 'annee', label: 'Année 2026' },
];