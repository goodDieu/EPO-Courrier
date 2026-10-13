// src/data/suiviSPSG.js

/* ============================================================
   ÉTAPES DU CIRCUIT (§9.1)
   ============================================================ */

export const ETAPES_CIRCUIT = {
    'scc': {
        key: 'scc',
        label: 'SCC',
        shortLabel: 'SCC',
        icon: 'fa-inbox',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
        dot: 'bg-epo-slate-500',
        ordre: 0,
    },
    'sp-sg': {
        key: 'sp-sg',
        label: 'Chez SP-SG',
        shortLabel: 'SP-SG',
        icon: 'fa-user-tie',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
        dot: 'bg-epo-yellow-500',
        ordre: 1,
    },
    'sg': {
        key: 'sg',
        label: 'Chez SG',
        shortLabel: 'SG',
        icon: 'fa-user-circle',
        chip: 'bg-epo-green-50 text-epo-green-700',
        dot: 'bg-epo-green-500',
        ordre: 2,
    },
    'sp-dg': {
        key: 'sp-dg',
        label: 'Chez SP-DG',
        shortLabel: 'SP-DG',
        icon: 'fa-user-secret',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
        dot: 'bg-epo-slate-500',
        ordre: 3,
    },
    'dg': {
        key: 'dg',
        label: 'Chez DG',
        shortLabel: 'DG',
        icon: 'fa-user-shield',
        chip: 'bg-epo-red-50 text-epo-red-700',
        dot: 'bg-epo-red-500',
        ordre: 4,
    },
    'retour-sg': {
        key: 'retour-sg',
        label: 'Retour SG (imputation)',
        shortLabel: 'Retour SG',
        icon: 'fa-redo',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
        dot: 'bg-epo-yellow-500',
        ordre: 5,
    },
    'scc-dispatch': {
        key: 'scc-dispatch',
        label: 'Chez SCC (dispatch)',
        shortLabel: 'Dispatch',
        icon: 'fa-paper-plane',
        chip: 'bg-epo-green-50 text-epo-green-700',
        dot: 'bg-epo-green-500',
        ordre: 6,
    },
    'direction': {
        key: 'direction',
        label: 'Chez direction',
        shortLabel: 'Direction',
        icon: 'fa-building',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
        dot: 'bg-epo-slate-500',
        ordre: 7,
    },
    'cloture': {
        key: 'cloture',
        label: 'Objet satisfait',
        shortLabel: 'Clôturé',
        icon: 'fa-check-circle',
        chip: 'bg-epo-green-50 text-epo-green-700',
        dot: 'bg-epo-green-500',
        ordre: 8,
    },
};

/* ============================================================
   CLASSIFICATION
   ============================================================ */

export const CLASSIFICATION = {
    'important-urgent': {
        key: 'important-urgent',
        label: 'Important · Urgent',
        shortLabel: 'I·U',
        chip: 'bg-epo-red-50 text-epo-red-700',
        dot: 'bg-epo-red-500',
    },
    'important-non-urgent': {
        key: 'important-non-urgent',
        label: 'Important · Non urgent',
        shortLabel: 'I·NU',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
        dot: 'bg-epo-yellow-500',
    },
    'non-important-urgent': {
        key: 'non-important-urgent',
        label: 'Non important · Urgent',
        shortLabel: 'NI·U',
        chip: 'bg-epo-green-50 text-epo-green-700',
        dot: 'bg-epo-green-500',
    },
    'non-important-non-urgent': {
        key: 'non-important-non-urgent',
        label: 'Non important · Non urgent',
        shortLabel: 'NI·NU',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
        dot: 'bg-epo-slate-400',
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

export function formatDateHeure(iso) {
    if (!iso) return '—';
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
    return `${Math.floor(h / 24)}j ${h % 24}h`;
}

/* ============================================================
   DOSSIERS EN SUIVI
   ============================================================ */

export const DOSSIERS_SUIVI = [
    /* ============================================
       EN CIRCULATION
       ============================================ */
    {
        id: '2026-0452',
        objet: 'Demande de subvention exceptionnelle- Colloque 2026',
        expediteurNom: "Ministère de l'Enseignement Supérieur",
        expediteurStructure: 'MESRSI',
        type: 'courrier',
        priorite: 'urgent',
        classification: 'important-urgent',
        etapeActuelle: 'sg',
        tempsCircuit: 320, // minutes totales depuis réception
        dateEntree: '2026-09-29T08:00:00',
        dateDernierMouvement: '2026-09-29T08:30:00',
        statut: 'en-circulation',
        bloquee: false,
        timeline: [
            { etape: 'scc', date: '2026-09-29T08:00:00', par: 'SCC' },
            { etape: 'sp-sg', date: '2026-09-29T08:10:00', par: 'SP-SG' },
            { etape: 'sg', date: '2026-09-29T08:30:00', par: 'SP-SG' },
        ],
        prochaineEtape: 'sp-dg',
        dureeEtapeActuelle: 240,
    },
    {
        id: '2026-0448',
        objet: "Recrutement d'un assistant à l'IGIT",
        expediteurNom: 'M. COMPAORÉ Ali (DRH)',
        expediteurStructure: 'DRH',
        type: 'courrier',
        priorite: 'normal',
        classification: 'important-non-urgent',
        etapeActuelle: 'sp-dg',
        tempsCircuit: 2400,
        dateEntree: '2026-09-28T14:00:00',
        dateDernierMouvement: '2026-09-29T09:00:00',
        statut: 'en-circulation',
        bloquee: false,
        timeline: [
            { etape: 'scc', date: '2026-09-28T14:00:00', par: 'SCC' },
            { etape: 'sp-sg', date: '2026-09-28T14:15:00', par: 'SP-SG' },
            { etape: 'sg', date: '2026-09-28T15:00:00', par: 'SP-SG' },
            { etape: 'sp-dg', date: '2026-09-29T09:00:00', par: 'SP-SG' },
        ],
        prochaineEtape: 'dg',
        dureeEtapeActuelle: 1800,
    },
    {
        id: '2026-0410',
        objet: 'Note urgente- Directives ministérielles',
        expediteurNom: "Ministère de l'Enseignement Supérieur",
        expediteurStructure: 'MESRSI',
        type: 'courrier',
        priorite: 'urgent',
        classification: 'important-urgent',
        etapeActuelle: 'dg',
        tempsCircuit: 1800,
        dateEntree: '2026-09-29T07:30:00',
        dateDernierMouvement: '2026-09-29T08:00:00',
        statut: 'en-circulation',
        bloquee: false,
        timeline: [
            { etape: 'scc', date: '2026-09-29T07:30:00', par: 'SCC' },
            { etape: 'sp-sg', date: '2026-09-29T07:45:00', par: 'SP-SG' },
            { etape: 'sg', date: '2026-09-29T08:00:00', par: 'SP-SG' },
            { etape: 'sp-dg', date: '2026-09-29T08:00:00', par: 'SP-DG' },
            { etape: 'dg', date: '2026-09-29T08:00:00', par: 'SP-DG' },
        ],
        prochaineEtape: 'retour-sg',
        dureeEtapeActuelle: 1800,
    },
    {
        id: '2026-0438',
        objet: 'Transmission du PV de délibération du personnel',
        expediteurNom: 'Mme SANOU Mariam (DAF)',
        expediteurStructure: 'DAF',
        type: 'courrier',
        priorite: 'normal',
        classification: 'important-non-urgent',
        etapeActuelle: 'retour-sg',
        tempsCircuit: 2880,
        dateEntree: '2026-09-27T09:00:00',
        dateDernierMouvement: '2026-09-29T07:00:00',
        statut: 'en-circulation',
        bloquee: false,
        timeline: [
            { etape: 'scc', date: '2026-09-27T09:00:00', par: 'SCC' },
            { etape: 'sp-sg', date: '2026-09-27T09:15:00', par: 'SP-SG' },
            { etape: 'sg', date: '2026-09-27T10:00:00', par: 'SP-SG' },
            { etape: 'sp-dg', date: '2026-09-28T09:00:00', par: 'SP-SG' },
            { etape: 'dg', date: '2026-09-28T10:00:00', par: 'SP-DG' },
            { etape: 'retour-sg', date: '2026-09-29T07:00:00', par: 'SP-DG' },
        ],
        prochaineEtape: 'scc-dispatch',
        dureeEtapeActuelle: 480,
    },
    {
        id: '2026-0421',
        objet: 'Note de service- Organisation des soutenances',
        expediteurNom: 'Pr. TANKOANO Martin (DGA-AVE)',
        expediteurStructure: 'DGA-AVE',
        type: 'courrier',
        priorite: 'normal',
        classification: 'non-important-non-urgent',
        etapeActuelle: 'scc-dispatch',
        tempsCircuit: 3600,
        dateEntree: '2026-09-26T15:00:00',
        dateDernierMouvement: '2026-09-29T06:00:00',
        statut: 'en-circulation',
        bloquee: false,
        timeline: [
            { etape: 'scc', date: '2026-09-26T15:00:00', par: 'SCC' },
            { etape: 'sp-sg', date: '2026-09-26T15:30:00', par: 'SP-SG' },
            { etape: 'sg', date: '2026-09-26T16:00:00', par: 'SP-SG' },
            { etape: 'sp-dg', date: '2026-09-27T09:00:00', par: 'SP-SG' },
            { etape: 'dg', date: '2026-09-27T10:00:00', par: 'SP-DG' },
            { etape: 'retour-sg', date: '2026-09-28T08:00:00', par: 'SP-DG' },
            { etape: 'scc-dispatch', date: '2026-09-29T06:00:00', par: 'SG' },
        ],
        prochaineEtape: 'direction',
        dureeEtapeActuelle: 300,
    },

    /* ============================================
       BLOQUÉS / EN RETARD
       ============================================ */
    {
        id: '2026-0398',
        objet: 'Réponse au Ministère- projet SG (à reformuler)',
        expediteurNom: 'M. OUÉDRAOGO Salif (SG)',
        expediteurStructure: 'SG',
        type: 'courrier',
        priorite: 'urgent',
        classification: 'important-urgent',
        etapeActuelle: 'sg',
        tempsCircuit: 4320,
        dateEntree: '2026-09-27T10:00:00',
        dateDernierMouvement: '2026-09-27T11:00:00',
        statut: 'bloque',
        bloquee: true,
        motifBlocage: 'Rejeté par le DG- en attente de reformulation',
        timeline: [
            { etape: 'scc', date: '2026-09-27T10:00:00', par: 'SCC' },
            { etape: 'sp-sg', date: '2026-09-27T10:15:00', par: 'SP-SG' },
            { etape: 'sg', date: '2026-09-27T11:00:00', par: 'SP-SG' },
        ],
        prochaineEtape: null,
        dureeEtapeActuelle: 4320,
    },
    {
        id: '2026-0385',
        objet: 'Convention de partenariat- Université de Lyon',
        expediteurNom: 'Ambassade de France',
        expediteurStructure: 'AMBASSADE',
        type: 'courrier',
        priorite: 'normal',
        classification: 'important-non-urgent',
        etapeActuelle: 'sp-dg',
        tempsCircuit: 10080, // 7 jours
        dateEntree: '2026-09-22T09:00:00',
        dateDernierMouvement: '2026-09-25T14:00:00',
        statut: 'bloque',
        bloquee: true,
        motifBlocage: 'Pièces manquantes- avis juridique en attente',
        timeline: [
            { etape: 'scc', date: '2026-09-22T09:00:00', par: 'SCC' },
            { etape: 'sp-sg', date: '2026-09-22T09:30:00', par: 'SP-SG' },
            { etape: 'sg', date: '2026-09-22T10:00:00', par: 'SP-SG' },
            { etape: 'sp-dg', date: '2026-09-25T14:00:00', par: 'SP-SG' },
        ],
        prochaineEtape: null,
        dureeEtapeActuelle: 10080,
    },

    /* ============================================
       CLÔTURÉS RÉCENTS
       ============================================ */
    {
        id: '2026-0350',
        objet: 'Certificat de travail- Mme KABORÉ Aminata',
        expediteurNom: 'M. COMPAORÉ Ali (DRH)',
        expediteurStructure: 'DRH',
        type: 'acte',
        priorite: 'normal',
        classification: 'important-non-urgent',
        etapeActuelle: 'cloture',
        tempsCircuit: 3600,
        dateEntree: '2026-09-20T09:00:00',
        dateDernierMouvement: '2026-09-22T11:00:00',
        statut: 'cloture',
        bloquee: false,
        timeline: [
            { etape: 'scc', date: '2026-09-20T09:00:00', par: 'SCC' },
            { etape: 'sp-sg', date: '2026-09-20T09:30:00', par: 'SP-SG' },
            { etape: 'sg', date: '2026-09-20T10:00:00', par: 'SP-SG' },
            { etape: 'sp-dg', date: '2026-09-21T09:00:00', par: 'SP-SG' },
            { etape: 'dg', date: '2026-09-21T10:00:00', par: 'SP-DG' },
            { etape: 'retour-sg', date: '2026-09-22T08:00:00', par: 'SP-DG' },
            { etape: 'scc-dispatch', date: '2026-09-22T09:00:00', par: 'SG' },
            { etape: 'direction', date: '2026-09-22T10:00:00', par: 'SCC' },
            { etape: 'cloture', date: '2026-09-22T11:00:00', par: 'DRH' },
        ],
        prochaineEtape: null,
        dureeEtapeActuelle: null,
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_ETAPE = [
    { value: '', label: 'Toutes les étapes' },
    ...Object.values(ETAPES_CIRCUIT).map((e) => ({ value: e.key, label: e.label })),
];

export const FILTRES_STATUT = [
    { value: '', label: 'Tous les statuts' },
    { value: 'en-circulation', label: 'En circulation' },
    { value: 'bloque', label: 'Bloqué' },
    { value: 'cloture', label: 'Clôturé' },
];

export const FILTRES_CLASSIFICATION = [
    { value: '', label: 'Toutes les classifications' },
    ...Object.values(CLASSIFICATION).map((c) => ({ value: c.key, label: c.label })),
];

export const FILTRES_STRUCTURE = [
    { value: '', label: 'Toutes les structures' },
    { value: 'MESRSI', label: 'MESRSI' },
    { value: 'DRH', label: 'DRH' },
    { value: 'DAF', label: 'DAF' },
    { value: 'DGA-AVE', label: 'DGA-AVE' },
    { value: 'SG', label: 'SG' },
];

export const OPTIONS_TRI = [
    { value: 'recent-mouvement', label: 'Dernier mouvement (défaut)' },
    { value: 'anciennete', label: 'Plus anciens' },
    { value: 'circuit', label: 'Durée dans le circuit' },
    { value: 'classification', label: 'Classification Eisenhower' },
];