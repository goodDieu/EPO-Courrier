// src/data/actesSignesDG.js

/* ============================================================
   NATURES D'ACTES SIGNÉS
   ============================================================ */

export const NATURES_ACTES = {
    bordereau: {
        key: 'bordereau',
        label: "Bordereau d'envoi",
        icon: 'fa-list',
        color: 'bg-epo-slate-100 text-epo-slate-700',
    },
    decision: {
        key: 'decision',
        label: 'Décision',
        icon: 'fa-gavel',
        color: 'bg-epo-green-50 text-epo-green-700',
    },
    certificat: {
        key: 'certificat',
        label: 'Certificat',
        icon: 'fa-certificate',
        color: 'bg-epo-slate-100 text-epo-slate-700',
    },
    attestation: {
        key: 'attestation',
        label: 'Attestation',
        icon: 'fa-file-signature',
        color: 'bg-epo-slate-100 text-epo-slate-700',
    },
    'ordre-mission': {
        key: 'ordre-mission',
        label: 'Ordre de mission',
        icon: 'fa-route',
        color: 'bg-epo-yellow-50 text-epo-yellow-700',
    },
    communique: {
        key: 'communique',
        label: 'Communiqué',
        icon: 'fa-bullhorn',
        color: 'bg-epo-yellow-50 text-epo-yellow-700',
    },
    lettre: {
        key: 'lettre',
        label: 'Lettre de transmission',
        icon: 'fa-envelope',
        color: 'bg-epo-slate-100 text-epo-slate-700',
    },
};

/* ============================================================
   TYPES DE SIGNATAIRE
   ============================================================ */

export const TYPES_SIGNATAIRE = {
    dg: {
        key: 'dg',
        label: 'DG en personne',
        shortLabel: 'DG',
        icon: 'fa-user-tie',
        chip: 'bg-epo-green-50 text-epo-green-700',
    },
    'sg-delegation': {
        key: 'sg-delegation',
        label: 'SG par délégation',
        shortLabel: 'SG délég.',
        icon: 'fa-stamp',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
    },
};

/* ============================================================
   ÉTATS
   ============================================================ */

export const ETATS = {
    signe: { label: 'Signé', variant: 'green' },
    diffuse: { label: 'Diffusé', variant: 'purple' },
    archive: { label: 'Archivé', variant: 'gray' },
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

/* ============================================================
   ACTES SIGNÉS
   ============================================================ */

export const ACTES_SIGNES = [
    /* ============================================
       SIGNÉS PAR LE DG EN PERSONNE
       ============================================ */
    {
        id: 'ACT-2026-0405',
        nature: 'decision',
        objet: 'Décision de congé administratif -M. KABORÉ Issa',
        beneficiaire: 'M. KABORÉ Issa',
        beneficiaireMatricule: 'EPO-2019-0142',
        beneficiaireStructure: 'DRH',
        produitPar: 'DRH',
        signataire: 'dg',
        mentionDelegation: null,
        numeroSortant: '2026-0308',
        dateSignature: '2026-09-25T14:30:00',
        dateDiffusion: '2026-09-26T09:00:00',
        dateArchivage: null,
        etat: 'diffuse',
        hash: 'sha256:a3f5e9c1d8b2f4a7e6c3d9b1f8a5e2c7d4b9a6f3e1c8d5b2a9f6e3c1d8b5a2f7',
        boitePhysique: 'BOX-2026-018',
        emplacement: 'SP-SG · Étagère 3',
        pieces: 2,
    },
    {
        id: 'ACT-2026-0402',
        nature: 'certificat',
        objet: 'Certificat de prise de service -Mme ZONGO Aïcha',
        beneficiaire: 'Mme ZONGO Aïcha',
        beneficiaireMatricule: 'EPO-2022-0412',
        beneficiaireStructure: 'SCC',
        produitPar: 'DRH',
        signataire: 'dg',
        mentionDelegation: null,
        numeroSortant: '2026-0305',
        dateSignature: '2026-09-21T11:20:00',
        dateDiffusion: '2026-09-22T10:00:00',
        dateArchivage: '2026-09-27T15:00:00',
        etat: 'archive',
        hash: 'sha256:b7d2f4a8e5c1f9b3d6a8c2e5f7b4d1a9c3f6b8e2d5a7c1f4b6e9d3a8c5f2b7d1',
        boitePhysique: 'BOX-2026-005',
        emplacement: 'Archives · Salle A · Étagère 2',
        pieces: 1,
    },
    {
        id: 'ACT-2026-0398',
        nature: 'decision',
        objet: 'Décision de nomination -Comité de pilotage',
        beneficiaire: 'Comité de pilotage',
        beneficiaireMatricule: '-',
        beneficiaireStructure: 'Multi-directions',
        produitPar: 'DRH',
        signataire: 'dg',
        mentionDelegation: null,
        numeroSortant: '2026-0298',
        dateSignature: '2026-09-15T16:00:00',
        dateDiffusion: '2026-09-16T09:30:00',
        dateArchivage: null,
        etat: 'diffuse',
        hash: 'sha256:c1e8a5b3f9d2e6a4c7b1f5d8e3a9c6b2f4d7e1a8c5b3f9d6e2a7c4b1f8d5e3a9',
        boitePhysique: 'BOX-2026-012',
        emplacement: 'SP-SG · Étagère 1',
        pieces: 3,
    },

    /* ============================================
       SIGNÉS PAR DÉLÉGATION DU SG
       ============================================ */
    {
        id: 'ACT-2026-0412',
        nature: 'attestation',
        objet: 'Attestation d\'absence -M. OUÉDRAOGO Karim',
        beneficiaire: 'M. OUÉDRAOGO Karim',
        beneficiaireMatricule: 'EPO-2021-0305',
        beneficiaireStructure: 'SCC',
        produitPar: 'DRH',
        signataire: 'sg-delegation',
        mentionDelegation: 'Pour le Directeur général et par délégation, le Secrétaire général',
        numeroSortant: '2026-0304',
        dateSignature: '2026-09-27T14:00:00',
        dateDiffusion: '2026-09-28T09:00:00',
        dateArchivage: null,
        etat: 'diffuse',
        hash: 'sha256:d9a2c7f1b5e8a3d6c9f2b7a1e5d8c3f6a9b2e7d1c4f8a5b9d3e6c1f4a7b2d9e5',
        boitePhysique: 'BOX-2026-020',
        emplacement: 'SP-DG · Étagère 2',
        pieces: 1,
    },
    {
        id: 'ACT-2026-0410',
        nature: 'ordre-mission',
        objet: 'Mission Ouagadougou → Banfora -Mme KABORÉ Aminata',
        beneficiaire: 'Mme KABORÉ Aminata',
        beneficiaireMatricule: 'EPO-2020-0218',
        beneficiaireStructure: 'DAF',
        produitPar: 'DRH',
        signataire: 'sg-delegation',
        mentionDelegation: 'Pour le Directeur général et par délégation, le Secrétaire général',
        numeroSortant: '2026-0302',
        dateSignature: '2026-09-24T10:30:00',
        dateDiffusion: '2026-09-25T08:00:00',
        dateArchivage: null,
        etat: 'diffuse',
        hash: 'sha256:e8b5c2d9f6a3b7c1e4d8a2f5b9c3e6a1d4f7b2c5a8e3d9f6b1c4a7e2d5f8b3c6',
        boitePhysique: 'BOX-2026-016',
        emplacement: 'SP-SG · Étagère 3',
        pieces: 2,
    },
    {
        id: 'ACT-2026-0400',
        nature: 'bordereau',
        objet: 'Bordereau envoi Ministère -Dossiers étudiants',
        beneficiaire: 'MESRSI',
        beneficiaireMatricule: '-',
        beneficiaireStructure: 'Ministère',
        produitPar: 'SCC',
        signataire: 'sg-delegation',
        mentionDelegation: 'Pour le Directeur général et par délégation, le Secrétaire général',
        numeroSortant: '2026-0295',
        dateSignature: '2026-09-19T10:00:00',
        dateDiffusion: '2026-09-20T08:30:00',
        dateArchivage: '2026-09-27T16:00:00',
        etat: 'archive',
        hash: 'sha256:f3c8d1b6e9a4d2f7c5b8a1e3d6c9b2f5a8e1d4c7b3f6a9e2d5c8b1f4a7e3d6c9',
        boitePhysique: 'BOX-2026-008',
        emplacement: 'Archives · Salle B · Étagère 1',
        pieces: 8,
    },

    /* ============================================
       CAS PARTICULIERS
       ============================================ */
    {
        id: 'ACT-2026-0395',
        nature: 'decision',
        objet: 'Décision de cessation de paiement -Agent retraité',
        beneficiaire: 'M. SAWADOGO Bakary',
        beneficiaireMatricule: 'EPO-2018-0087',
        beneficiaireStructure: 'SCC',
        produitPar: 'DRH',
        signataire: 'dg',
        mentionDelegation: null,
        numeroSortant: '2026-0290',
        dateSignature: '2026-09-11T15:00:00',
        dateDiffusion: '2026-09-12T10:00:00',
        dateArchivage: '2026-09-20T11:00:00',
        etat: 'archive',
        hash: 'sha256:a5b2d9c7f4e1b8a3d6c9f2b5a8e1d4c7b3f6a9e2d5c8b1f4a7e3d6c9b2f5a8e1',
        boitePhysique: 'BOX-2026-010',
        emplacement: 'Archives · Salle A · Étagère 3',
        pieces: 2,
    },
    {
        id: 'ACT-2026-0390',
        nature: 'communique',
        objet: 'Communiqué officiel -Ouverture des inscriptions 2026-2027',
        beneficiaire: 'Toutes les universités partenaires',
        beneficiaireMatricule: '-',
        beneficiaireStructure: 'Multi-destinataires',
        produitPar: 'SG',
        signataire: 'dg',
        mentionDelegation: null,
        numeroSortant: '2026-0288',
        dateSignature: '2026-09-05T09:00:00',
        dateDiffusion: '2026-09-06T08:00:00',
        dateArchivage: '2026-09-15T14:00:00',
        etat: 'archive',
        hash: 'sha256:b9e6a3f5c8d2e9b7a4d1c7f5b8e3a9d6c2f4b7e1a5d8c3b6f9e2a4d7c1b5f8e3',
        boitePhysique: 'BOX-2026-002',
        emplacement: 'Archives · Salle B · Étagère 2',
        pieces: 1,
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_NATURE = [
    { value: '', label: 'Toutes les natures' },
    ...Object.values(NATURES_ACTES).map((n) => ({ value: n.key, label: n.label })),
];

export const FILTRES_SIGNATAIRE = [
    { value: '', label: 'Tous les signataires' },
    { value: 'dg', label: 'Signé par le DG' },
    { value: 'sg-delegation', label: 'Signé par le SG (délégation)' },
];

export const FILTRES_ETAT = [
    { value: '', label: 'Tous les états' },
    { value: 'signe', label: 'Signé' },
    { value: 'diffuse', label: 'Diffusé' },
    { value: 'archive', label: 'Archivé' },
];

export const FILTRES_PERIODE = [
    { value: '', label: 'Toute la période' },
    { value: '7j', label: '7 derniers jours' },
    { value: '30j', label: '30 derniers jours' },
    { value: 'trimestre', label: 'Trimestre en cours' },
    { value: 'annee', label: 'Année 2026' },
];

export const OPTIONS_TRI = [
    { value: 'recent', label: 'Plus récents (défaut)' },
    { value: 'ancien', label: 'Plus anciens' },
    { value: 'id-asc', label: 'Numéro croissant' },
    { value: 'id-desc', label: 'Numéro décroissant' },
    { value: 'beneficiaire', label: 'Bénéficiaire (A-Z)' },
];