// src/data/triSPSG.js

/* ============================================================
   CLASSIFICATION EISENHOWER
   ============================================================ */

export const QUADRANTS = {
    'important-urgent': {
        key: 'important-urgent',
        label: 'Important · Urgent',
        subtitle: 'À traiter immédiatement',
        shortLabel: 'I·U',
        icon: 'fa-fire',
        chip: 'bg-epo-slate-100 text-epo-slate-900',
        bg: 'bg-epo-slate-100',
        border: 'border-epo-slate-200',
        dot: 'bg-epo-red-500',
        ordre: 0,
        action: 'Traiter en priorité absolue',
    },
    'important-non-urgent': {
        key: 'important-non-urgent',
        label: 'Important · Non urgent',
        subtitle: 'À planifier',
        shortLabel: 'I·NU',
        icon: 'fa-star',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
        bg: 'bg-epo-yellow-50/40',
        border: 'border-epo-yellow-300',
        dot: 'bg-epo-yellow-500',
        ordre: 1,
        action: 'Planifier dans les 3 jours',
    },
    'non-important-urgent': {
        key: 'non-important-urgent',
        label: 'Non important · Urgent',
        subtitle: 'À déléguer',
        shortLabel: 'NI·U',
        icon: 'fa-forward',
        chip: 'bg-epo-green-50 text-epo-green-700',
        bg: 'bg-epo-green-50/40',
        border: 'border-epo-green-300',
        dot: 'bg-epo-green-500',
        ordre: 2,
        action: 'Déléguer au niveau compétent',
    },
    'non-important-non-urgent': {
        key: 'non-important-non-urgent',
        label: 'Non important · Non urgent',
        subtitle: 'À classer',
        shortLabel: 'NI·NU',
        icon: 'fa-inbox',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
        bg: 'bg-epo-slate-50/60',
        border: 'border-epo-slate-300',
        dot: 'bg-epo-slate-400',
        ordre: 3,
        action: 'Traitement standard',
    },
};

/* ============================================================
   TYPES DE DOSSIERS
   ============================================================ */

export const TYPES_DOSSIERS = {
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
    if (!iso) return '—';
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
   DOSSIERS À TRIER / TRIÉS
   ============================================================ */

export const DOSSIERS_TRI = [
    /* ============================================
       NON TRIÉS (dans la file d'attente)
       ============================================ */
    {
        id: '2026-0485',
        type: 'courrier',
        objet: 'Communiqué officiel- MESRSI',
        expediteurNom: "Ministère de l'Enseignement Supérieur",
        expediteurStructure: 'MESRSI',
        priorite: 'urgent',
        classification: null, // pas encore classé
        recuAuSPSG: '2026-09-29T09:20:00',
        tempsAttente: 45,
        pieces: 2,
        scanne: true,
        agentLiaison: 'M. SAWADOGO Bakary',
    },
    {
        id: '2026-0488',
        type: 'courrier',
        objet: 'Demande de congé- M. TRAORÉ',
        expediteurNom: 'DRH',
        expediteurStructure: 'DRH',
        priorite: 'normal',
        classification: null,
        recuAuSPSG: '2026-09-29T10:50:00',
        tempsAttente: 15,
        pieces: 2,
        scanne: true,
        agentLiaison: 'M. SAWADOGO Bakary',
    },
    {
        id: '2026-0486',
        type: 'courrier',
        objet: 'Facture fournisseur- Eau & Électricité',
        expediteurNom: 'SONABEL',
        expediteurStructure: 'SONABEL',
        priorite: 'normal',
        classification: null,
        recuAuSPSG: '2026-09-29T09:55:00',
        tempsAttente: 30,
        pieces: 1,
        scanne: true,
        agentLiaison: 'Mme ZONGO Aïcha',
    },

    /* ============================================
       DÉJÀ TRIÉS- I·U (Important · Urgent)
       ============================================ */
    {
        id: '2026-0452',
        type: 'courrier',
        objet: 'Demande de subvention exceptionnelle- Colloque 2026',
        expediteurNom: "Ministère de l'Enseignement Supérieur",
        expediteurStructure: 'MESRSI',
        priorite: 'urgent',
        classification: 'important-urgent',
        classifiePar: 'Mme KABORÉ Fatimata',
        classifieLe: '2026-09-29T08:15:00',
        recuAuSPSG: '2026-09-29T08:10:00',
        tempsAttente: 120,
        pieces: 3,
        scanne: true,
        agentLiaison: 'M. SAWADOGO Bakary',
    },
    {
        id: '2026-0410',
        type: 'courrier',
        objet: 'Note urgente- Directives ministérielles',
        expediteurNom: "Ministère de l'Enseignement Supérieur",
        expediteurStructure: 'MESRSI',
        priorite: 'urgent',
        classification: 'important-urgent',
        classifiePar: 'Mme KABORÉ Fatimata',
        classifieLe: '2026-09-29T07:45:00',
        recuAuSPSG: '2026-09-29T07:30:00',
        tempsAttente: 90,
        pieces: 1,
        scanne: true,
        agentLiaison: 'M. OUÉDRAOGO Karim',
    },
    {
        id: 'ACT-2026-0405',
        type: 'acte',
        objet: 'Décision de congé administrative- M. KABORÉ',
        expediteurNom: 'M. COMPAORÉ Ali (DRH)',
        expediteurStructure: 'DRH',
        priorite: 'urgent',
        classification: 'important-urgent',
        classifiePar: 'Mme KABORÉ Fatimata',
        classifieLe: '2026-09-29T07:30:00',
        recuAuSPSG: '2026-09-29T07:15:00',
        tempsAttente: 75,
        pieces: 2,
        scanne: true,
        agentLiaison: 'M. SAWADOGO Bakary',
    },
    {
        id: '2026-0455',
        type: 'courrier',
        objet: 'Réclamation- Personnel contractuel',
        expediteurNom: 'Syndicat du personnel',
        expediteurStructure: 'SYNDICAT',
        priorite: 'urgent',
        classification: 'important-urgent',
        classifiePar: 'Mme KABORÉ Fatimata',
        classifieLe: '2026-09-29T07:00:00',
        recuAuSPSG: '2026-09-29T06:45:00',
        tempsAttente: 60,
        pieces: 3,
        scanne: true,
        agentLiaison: 'M. OUÉDRAOGO Karim',
    },

    /* ============================================
       DÉJÀ TRIÉS- I·NU (Important · Non urgent)
       ============================================ */
    {
        id: '2026-0448',
        type: 'courrier',
        objet: "Recrutement d'un assistant à l'IGIT",
        expediteurNom: 'M. COMPAORÉ Ali (DRH)',
        expediteurStructure: 'DRH',
        priorite: 'normal',
        classification: 'important-non-urgent',
        classifiePar: 'Mme KABORÉ Fatimata',
        classifieLe: '2026-09-29T09:35:00',
        recuAuSPSG: '2026-09-29T09:30:00',
        tempsAttente: 60,
        pieces: 4,
        scanne: true,
        agentLiaison: 'M. SAWADOGO Bakary',
    },
    {
        id: 'ACT-2026-0443',
        type: 'acte',
        objet: 'Certificat de travail- M. SAWADOGO Bakary',
        expediteurNom: 'M. COMPAORÉ Ali (DRH)',
        expediteurStructure: 'DRH',
        priorite: 'normal',
        classification: 'important-non-urgent',
        classifiePar: 'Mme KABORÉ Fatimata',
        classifieLe: '2026-09-28T10:30:00',
        recuAuSPSG: '2026-09-28T10:15:00',
        tempsAttente: 480,
        pieces: 1,
        scanne: true,
        agentLiaison: 'M. SAWADOGO Bakary',
    },
    {
        id: '2026-0438',
        type: 'courrier',
        objet: 'Transmission du PV de délibération du personnel',
        expediteurNom: 'Mme SANOU Mariam (DAF)',
        expediteurStructure: 'DAF',
        priorite: 'normal',
        classification: 'important-non-urgent',
        classifiePar: 'Mme KABORÉ Fatimata',
        classifieLe: '2026-09-28T09:45:00',
        recuAuSPSG: '2026-09-28T09:30:00',
        tempsAttente: 300,
        pieces: 2,
        scanne: true,
        agentLiaison: 'M. OUÉDRAOGO Karim',
    },

    /* ============================================
       DÉJÀ TRIÉS- NI·U (Non important · Urgent)
       ============================================ */
    {
        id: '2026-0487',
        type: 'courrier',
        objet: 'Réponse au courrier N°2026-0410',
        expediteurNom: 'DAF',
        expediteurStructure: 'DAF',
        priorite: 'urgent',
        classification: 'non-important-urgent',
        classifiePar: 'Mme KABORÉ Fatimata',
        classifieLe: '2026-09-29T10:25:00',
        recuAuSPSG: '2026-09-29T10:20:00',
        tempsAttente: 30,
        pieces: 3,
        scanne: true,
        agentLiaison: 'M. SAWADOGO Bakary',
    },
    {
        id: '2026-0482',
        type: 'courrier',
        objet: 'Convocation réunion inter-directions',
        expediteurNom: 'SG',
        expediteurStructure: 'SG',
        priorite: 'urgent',
        classification: 'non-important-urgent',
        classifiePar: 'Mme KABORÉ Fatimata',
        classifieLe: '2026-09-29T08:30:00',
        recuAuSPSG: '2026-09-29T08:15:00',
        tempsAttente: 45,
        pieces: 1,
        scanne: true,
        agentLiaison: 'M. OUÉDRAOGO Karim',
    },

    /* ============================================
       DÉJÀ TRIÉS- NI·NU (Non important · Non urgent)
       ============================================ */
    {
        id: '2026-0480',
        type: 'courrier',
        objet: 'Invitation- Cérémonie de fin d\'année',
        expediteurNom: 'Association des étudiants',
        expediteurStructure: 'ASSOC',
        priorite: 'normal',
        classification: 'non-important-non-urgent',
        classifiePar: 'Mme KABORÉ Fatimata',
        classifieLe: '2026-09-29T09:00:00',
        recuAuSPSG: '2026-09-29T08:45:00',
        tempsAttente: 30,
        pieces: 1,
        scanne: true,
        agentLiaison: 'Mme ZONGO Aïcha',
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_PRIORITE = [
    { value: '', label: 'Toutes les priorités' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'normal', label: 'Normal' },
];

export const FILTRES_ETAT = [
    { value: '', label: 'Tous les états' },
    { value: 'a-trier', label: 'Non triés' },
    { value: 'trie', label: 'Triés' },
];

export const FILTRES_AGENT = [
    { value: '', label: 'Tous les agents' },
    { value: 'M. SAWADOGO Bakary', label: 'M. SAWADOGO Bakary' },
    { value: 'M. OUÉDRAOGO Karim', label: 'M. OUÉDRAOGO Karim' },
    { value: 'Mme ZONGO Aïcha', label: 'Mme ZONGO Aïcha' },
];