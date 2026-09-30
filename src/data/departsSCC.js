// src/data/departsSCC.js

/* ============================================================
   MODES DE DÉPART
   ============================================================ */

export const MODES_DEPART = {
    interne: {
        key: 'interne',
        label: 'Départ interne',
        shortLabel: 'Interne',
        description: 'Liaison vers une structure EPO',
        icon: 'fa-truck',
        chip: 'bg-epo-green-50 text-epo-green-700',
        dot: 'bg-epo-green-500',
    },
    externe: {
        key: 'externe',
        label: 'Départ externe',
        shortLabel: 'Externe',
        description: 'Expédition postale vers un destinataire hors EPO',
        icon: 'fa-envelope',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
        dot: 'bg-epo-slate-500',
    },
    'main-propre': {
        key: 'main-propre',
        label: 'Remise en main propre',
        shortLabel: 'Main propre',
        description: 'Retrait direct par le destinataire',
        icon: 'fa-handshake',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
        dot: 'bg-epo-yellow-500',
    },
};

/* ============================================================
   ÉTATS DE DÉPART
   ============================================================ */

export const ETATS_DEPART = {
    'a-numeroter': {
        label: 'À numéroter',
        variant: 'orange',
        description: 'Signé par le DG, en attente de numérotation SCC',
    },
    'a-cacheter': {
        label: 'À cacheter',
        variant: 'orange',
        description: 'Numéroté, en attente d\'apposition du cachet',
    },
    'pret-expedition': {
        label: 'Prêt à expédier',
        variant: 'blue',
        description: 'Numéroté et cacheté, en attente d\'expédition',
    },
    'en-cours': {
        label: 'Expédition en cours',
        variant: 'purple',
        description: 'Confié à un agent de liaison ou au service postal',
    },
    'transmis': {
        label: 'Transmis',
        variant: 'green',
        description: 'Effectivement transmis avec preuve',
    },
    'archive': {
        label: 'Archivé',
        variant: 'gray',
        description: 'Clôturé et archivé',
    },
};

/* ============================================================
   NATURES DE SORTANTS (§10.2)
   ============================================================ */

export const NATURES_SORTANTS = {
    lettre: { key: 'lettre', label: 'Lettre', icon: 'fa-envelope' },
    attestation: { key: 'attestation', label: 'Attestation', icon: 'fa-file-signature' },
    certificat: { key: 'certificat', label: 'Certificat', icon: 'fa-certificate' },
    'ordre-mission': { key: 'ordre-mission', label: 'Ordre de mission', icon: 'fa-route' },
    avis: { key: 'avis', label: 'Avis', icon: 'fa-comment-dots' },
    communique: { key: 'communique', label: 'Communiqué', icon: 'fa-bullhorn' },
    decision: { key: 'decision', label: 'Décision', icon: 'fa-gavel' },
    note: { key: 'note', label: 'Note', icon: 'fa-sticky-note' },
    bordereau: { key: 'bordereau', label: 'Bordereau d\'envoi', icon: 'fa-list' },
};

/* ============================================================
   SÉRIE SORTANTE
   ============================================================ */

export const SERIE_SORTANTE = {
    key: 'sortant-ordinaire',
    label: 'Série sortante ordinaire (SCC)',
    prochain: '2026-0312',
    detenteur: 'SCC',
};

/* ============================================================
   HELPERS
   ============================================================ */

export function formatDate(iso) {
    if (!iso) return '-';
    return new Date(iso).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
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

export function computeNiveau(tempsRestantMin) {
    if (tempsRestantMin < 0) return 'depasse';
    if (tempsRestantMin < 12 * 60) return 'jourJ';
    if (tempsRestantMin < 24 * 60) return 'urgent';
    if (tempsRestantMin < 72 * 60) return 'surveiller';
    return 'ok';
}

/* ============================================================
   DÉPARTS (mock)
   ============================================================ */

export const DEPARTS = [
    /* ============================================
       À NUMÉROTER (arrivés du DG signés)
       ============================================ */
    {
        id: 'DEP-2026-0089',
        documentSource: 'ACT-2026-0405',
        typeDocument: 'acte',
        nature: 'decision',
        objet: 'Décision de congé administratif - M. KABORÉ Issa',
        beneficiaire: 'M. KABORÉ Issa',
        produitPar: 'DRH',
        signePar: 'dg',
        dateSignature: '2026-09-25T14:30:00',
        dateReceptionSCC: '2026-09-29T08:00:00',
        mode: 'interne',
        destinataire: {
            structure: 'DRH',
            personne: 'M. COMPAORÉ Ali',
            qualite: 'Directeur RH',
        },
        etat: 'a-numeroter',
        numeroSortant: null,
        tempsRestant: 120, // 2h
        agentSCC: null,
        cachet: false,
        pieces: 1,
    },
    {
        id: 'DEP-2026-0090',
        documentSource: '2026-0438',
        typeDocument: 'courrier',
        nature: 'lettre',
        objet: 'Transmission du PV de délibération du personnel',
        beneficiaire: 'Ministère de la Fonction Publique',
        produitPar: 'DAF',
        signePar: 'sg-delegation',
        dateSignature: '2026-09-27T10:15:00',
        dateReceptionSCC: '2026-09-29T09:30:00',
        mode: 'externe',
        destinataire: {
            structure: 'Ministère de la Fonction Publique',
            personne: 'M. le Ministre',
            qualite: 'Ministre',
        },
        etat: 'a-numeroter',
        numeroSortant: null,
        tempsRestant: 240,
        agentSCC: null,
        cachet: false,
        pieces: 3,
    },

    /* ============================================
       À CACHETER (numérotés)
       ============================================ */
    {
        id: 'DEP-2026-0087',
        documentSource: 'ACT-2026-0402',
        typeDocument: 'acte',
        nature: 'certificat',
        objet: 'Certificat de prise de service - Mme ZONGO Aïcha',
        beneficiaire: 'Mme ZONGO Aïcha',
        produitPar: 'DRH',
        signePar: 'sg-delegation',
        dateSignature: '2026-09-21T11:20:00',
        dateReceptionSCC: '2026-09-28T14:00:00',
        mode: 'main-propre',
        destinataire: {
            structure: 'SCC',
            personne: 'Mme ZONGO Aïcha',
            qualite: 'Agent de numérisation',
        },
        etat: 'a-cacheter',
        numeroSortant: '2026-0308',
        tempsRestant: 180,
        agentSCC: 'M. OUÉDRAOGO Karim',
        cachet: false,
        pieces: 1,
    },
    {
        id: 'DEP-2026-0086',
        documentSource: '2026-0424',
        typeDocument: 'courrier',
        nature: 'ordre-mission',
        objet: 'Mission Ouagadougou → Banfora - Mme KABORÉ Aminata',
        beneficiaire: 'Mme KABORÉ Aminata',
        produitPar: 'DRH',
        signePar: 'dg',
        dateSignature: '2026-09-24T10:30:00',
        dateReceptionSCC: '2026-09-28T11:00:00',
        mode: 'main-propre',
        destinataire: {
            structure: 'DAF',
            personne: 'Mme KABORÉ Aminata',
            qualite: 'Comptable',
        },
        etat: 'a-cacheter',
        numeroSortant: '2026-0307',
        tempsRestant: 240,
        agentSCC: 'M. OUÉDRAOGO Karim',
        cachet: false,
        pieces: 2,
    },

    /* ============================================
       PRÊTS À EXPÉDIER (numérotés + cachetés)
       ============================================ */
    {
        id: 'DEP-2026-0085',
        documentSource: '2026-0428',
        typeDocument: 'courrier',
        nature: 'lettre',
        objet: 'Réponse à la demande d\'information du MESRSI',
        beneficiaire: 'MESRSI',
        produitPar: 'SG',
        signePar: 'dg',
        dateSignature: '2026-09-26T15:00:00',
        dateReceptionSCC: '2026-09-27T09:00:00',
        mode: 'externe',
        destinataire: {
            structure: 'MESRSI',
            personne: 'M. le Secrétaire Général',
            qualite: 'Secrétaire Général',
        },
        etat: 'pret-expedition',
        numeroSortant: '2026-0305',
        tempsRestant: 360,
        agentSCC: 'M. OUÉDRAOGO Karim',
        cachet: true,
        pieces: 4,
    },
    {
        id: 'DEP-2026-0084',
        documentSource: 'ACT-2026-0412',
        typeDocument: 'acte',
        nature: 'attestation',
        objet: 'Attestation d\'absence - M. OUÉDRAOGO Karim',
        beneficiaire: 'M. OUÉDRAOGO Karim',
        produitPar: 'DRH',
        signePar: 'sg-delegation',
        dateSignature: '2026-09-27T14:00:00',
        dateReceptionSCC: '2026-09-27T16:00:00',
        mode: 'interne',
        destinataire: {
            structure: 'SCC',
            personne: 'M. OUÉDRAOGO Karim',
            qualite: 'Agent SCC',
        },
        etat: 'pret-expedition',
        numeroSortant: '2026-0304',
        tempsRestant: 480,
        agentSCC: 'Mme ZONGO Aïcha',
        cachet: true,
        pieces: 1,
    },

    /* ============================================
       EN COURS D'EXPÉDITION
       ============================================ */
    {
        id: 'DEP-2026-0083',
        documentSource: '2026-0405',
        typeDocument: 'courrier',
        nature: 'communique',
        objet: 'Communiqué officiel - Ouverture des inscriptions 2026-2027',
        beneficiaire: 'Toutes les universités',
        produitPar: 'SG',
        signePar: 'dg',
        dateSignature: '2026-09-20T09:00:00',
        dateReceptionSCC: '2026-09-21T08:00:00',
        mode: 'externe',
        destinataire: {
            structure: 'Universités partenaires',
            personne: 'Multi-destinataires',
            qualite: '-',
        },
        etat: 'en-cours',
        numeroSortant: '2026-0300',
        tempsRestant: 600,
        agentSCC: 'M. TRAORÉ Ibrahim',
        cachet: true,
        pieces: 1,
        expedition: {
            mode: 'postal',
            reference: 'LP-2026-0456',
            dateEnvoi: '2026-09-27T10:00:00',
        },
    },

    /* ============================================
       TRANSMIS (avec preuve)
       ============================================ */
    {
        id: 'DEP-2026-0080',
        documentSource: 'ACT-2026-0400',
        typeDocument: 'acte',
        nature: 'decision',
        objet: 'Décision d\'attribution de bourse',
        beneficiaire: 'M. SAWADOGO Bakary',
        produitPar: 'DGA-AVE',
        signePar: 'dg',
        dateSignature: '2026-09-15T11:00:00',
        dateReceptionSCC: '2026-09-16T08:00:00',
        mode: 'interne',
        destinataire: {
            structure: 'DGA-AVE',
            personne: 'Pr. TANKOANO Martin',
            qualite: 'DGA-AVE',
        },
        etat: 'transmis',
        numeroSortant: '2026-0295',
        tempsRestant: 9999,
        agentSCC: 'Mme ZONGO Aïcha',
        cachet: true,
        pieces: 2,
        transmission: {
            id: 'TR-2026-0120',
            agent: 'M. SAWADOGO Bakary',
            dateRemise: '2026-09-16T10:15:00',
            preuve: { type: 'photo' },
        },
    },
    {
        id: 'DEP-2026-0079',
        documentSource: '2026-0398',
        typeDocument: 'courrier',
        nature: 'bordereau',
        objet: 'Bordereau envoi Ministère - Dossiers étudiants',
        beneficiaire: 'MESRSI',
        produitPar: 'SCC',
        signePar: 'sg-delegation',
        dateSignature: '2026-09-12T14:00:00',
        dateReceptionSCC: '2026-09-13T08:00:00',
        mode: 'externe',
        destinataire: {
            structure: 'MESRSI',
            personne: 'Service Courrier',
            qualite: '-',
        },
        etat: 'transmis',
        numeroSortant: '2026-0290',
        tempsRestant: 9999,
        agentSCC: 'M. TRAORÉ Ibrahim',
        cachet: true,
        pieces: 8,
        expedition: {
            mode: 'postal',
            reference: 'LP-2026-0401',
            dateEnvoi: '2026-09-15T09:00:00',
        },
        preuvePostale: {
            type: 'recu',
            reference: 'AR-2026-0401',
        },
    },

    /* ============================================
       ARCHIVÉS
       ============================================ */
    {
        id: 'DEP-2026-0070',
        documentSource: '2026-0388',
        typeDocument: 'courrier',
        nature: 'lettre',
        objet: 'Convention de partenariat - Université de Lyon',
        beneficiaire: 'Université de Lyon',
        produitPar: 'DCPIP',
        signePar: 'dg',
        dateSignature: '2026-08-28T10:00:00',
        dateReceptionSCC: '2026-08-29T09:00:00',
        mode: 'externe',
        destinataire: {
            structure: 'Université de Lyon',
            personne: 'M. le Président',
            qualite: 'Président',
        },
        etat: 'archive',
        numeroSortant: '2026-0278',
        tempsRestant: 99999,
        agentSCC: 'M. TRAORÉ Ibrahim',
        cachet: true,
        pieces: 4,
        expedition: {
            mode: 'postal',
            reference: 'LP-2026-0388',
            dateEnvoi: '2026-08-30T10:00:00',
        },
        preuvePostale: {
            type: 'recu',
            reference: 'AR-2026-0388',
        },
    },
];

/* ============================================================
   AGENTS SCC
   ============================================================ */

export const AGENTS_SCC = [
    { id: 'scc1', nom: 'M. OUÉDRAOGO Karim', matricule: 'EPO-2021-0305' },
    { id: 'scc2', nom: 'Mme ZONGO Aïcha', matricule: 'EPO-2022-0412' },
    { id: 'scc3', nom: 'M. TRAORÉ Ibrahim', matricule: 'EPO-2017-0034', chef: true },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_ETAT = [
    { value: '', label: 'Tous les états' },
    { value: 'a-numeroter', label: 'À numéroter' },
    { value: 'a-cacheter', label: 'À cacheter' },
    { value: 'pret-expedition', label: 'Prêt à expédier' },
    { value: 'en-cours', label: 'Expédition en cours' },
    { value: 'transmis', label: 'Transmis' },
    { value: 'archive', label: 'Archivé' },
];

export const FILTRES_MODE = [
    { value: '', label: 'Tous les modes' },
    { value: 'interne', label: 'Départ interne' },
    { value: 'externe', label: 'Départ externe' },
    { value: 'main-propre', label: 'Main propre' },
];

export const FILTRES_NATURE = [
    { value: '', label: 'Toutes les natures' },
    ...Object.values(NATURES_SORTANTS).map((n) => ({ value: n.key, label: n.label })),
];

export const FILTRES_PERIODE = [
    { value: '', label: 'Toutes les périodes' },
    { value: 'aujourdhui', label: "Aujourd'hui" },
    { value: '7j', label: '7 derniers jours' },
    { value: '30j', label: '30 derniers jours' },
    { value: 'annee', label: 'Année 2026' },
];