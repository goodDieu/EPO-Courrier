// src/data/dashboardSPSG.js

/* ============================================================
   KPI DU SP-SG
   ============================================================ */

export const KPIS_SP_SG = [
    {
        id: 'recus',
        label: 'Courriers reçus',
        value: 12,
        icon: 'fa-inbox',
        variant: 'warning',
        hint: 'En provenance du SCC',
    },
    {
        id: 'a-trier',
        label: 'À trier',
        value: 5,
        icon: 'fa-th',
        variant: 'urgent',
        hint: 'Matrice importance/urgence',
    },
    {
        id: 'a-scanner',
        label: 'À numériser',
        value: 3,
        icon: 'fa-camera',
        variant: 'warning',
        hint: 'Pièces à scanner',
    },
    {
        id: 'introduits',
        label: 'Introduits au SG',
        value: 8,
        icon: 'fa-user-tie',
        variant: 'success',
        hint: 'Aujourd\'hui',
    },
];

/* ============================================================
   COURRIERS À INTRODUIRE AU SG
   ============================================================ */

export const A_INTRODUIRE_AU_SG = [
    {
        id: '2026-0452',
        type: 'courrier',
        objet: 'Demande de subvention exceptionnelle- Colloque 2026',
        expediteurNom: "Ministère de l'Enseignement Supérieur",
        priorite: 'urgent',
        importance: 'importante',
        urgence: 'urgente',
        recuAuSPSG: '2026-09-29T08:00:00',
        tempsAttente: 45,
        pieces: 3,
        scanne: true,
        pointsAttention: ['Dossier urgent- délai 30 min (SCC → SP-SG)'],
    },
    {
        id: '2026-0448',
        type: 'courrier',
        objet: "Recrutement d'un assistant à l'IGIT",
        expediteurNom: 'M. COMPAORÉ Ali (DRH)',
        priorite: 'normal',
        importance: 'importante',
        urgence: 'non-urgente',
        recuAuSPSG: '2026-09-29T09:30:00',
        tempsAttente: 30,
        pieces: 4,
        scanne: true,
        pointsAttention: [],
    },
    {
        id: 'ACT-2026-0443',
        type: 'acte',
        objet: 'Certificat de travail- M. SAWADOGO Bakary',
        expediteurNom: 'M. COMPAORÉ Ali (DRH)',
        priorite: 'normal',
        importance: 'normale',
        urgence: 'non-urgente',
        recuAuSPSG: '2026-09-28T10:00:00',
        tempsAttente: 180,
        pieces: 1,
        scanne: true,
        pointsAttention: [],
    },
];

/* ============================================================
   FILE DE TRI & SCAN
   ============================================================ */

export const FILE_TRAITEMENT = [
    {
        id: '2026-0485',
        type: 'courrier',
        objet: 'Communiqué officiel- MESRSI',
        expediteurNom: "Ministère de l'Enseignement Supérieur",
        priorite: 'urgent',
        actionRequise: 'trier',
        recuAuSPSG: '2026-09-29T09:15:00',
        tempsAttente: 45,
        pieces: 2,
        scanne: true,
    },
    {
        id: '2026-0488',
        type: 'courrier',
        objet: 'Demande de congé- M. TRAORÉ',
        expediteurNom: 'DRH',
        priorite: 'normal',
        actionRequise: 'scanner',
        recuAuSPSG: '2026-09-29T10:45:00',
        tempsAttente: 15,
        pieces: 2,
        scanne: false,
    },
    {
        id: '2026-0486',
        type: 'courrier',
        objet: 'Facture fournisseur- Eau & Électricité',
        expediteurNom: 'SONABEL',
        priorite: 'normal',
        actionRequise: 'scanner',
        recuAuSPSG: '2026-09-29T09:50:00',
        tempsAttente: 30,
        pieces: 1,
        scanne: false,
    },
];

/* ============================================================
   ACTIVITÉ RÉCENTE
   ============================================================ */

export const ACTIVITES_RECENTES_SP_SG = [
    {
        id: 1,
        color: 'green',
        icon: 'fa-user-tie',
        html: '<strong>Vous</strong> avez introduit le dossier <strong>2026-0450</strong> auprès du SG',
        time: 'Il y a 15 min',
    },
    {
        id: 2,
        color: 'blue',
        icon: 'fa-th',
        html: '<strong>Vous</strong> avez classé <strong>2026-0448</strong> comme « Important · Non urgent »',
        time: 'Il y a 45 min',
    },
    {
        id: 3,
        color: 'amber',
        icon: 'fa-camera',
        html: '<strong>Numérisation</strong> terminée pour <strong>2026-0484</strong> · 5 pages · hash vérifié',
        time: 'Il y a 1h',
    },
    {
        id: 4,
        color: 'purple',
        icon: 'fa-check-square',
        html: '<strong>Vous</strong> avez confirmé la réception du lot SCC <strong>LOT-2026-042</strong>',
        time: 'Il y a 2h',
    },
    {
        id: 5,
        color: 'red',
        icon: 'fa-exclamation-circle',
        html: '<strong>Alerte</strong> : le dossier <strong>2026-0485</strong> est en retard de tri',
        time: 'Il y a 2h30',
    },
];

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
   COULEURS ACTIVITÉ
   ============================================================ */

export const ACTIVITE_COLORS = {
    blue: 'bg-epo-green-50 text-epo-green-500',
    red: 'bg-epo-slate-100 text-epo-red-500',
    green: 'bg-epo-green-50 text-epo-green-500',
    amber: 'bg-epo-yellow-50 text-epo-yellow-600',
    purple: 'bg-epo-slate-100 text-epo-slate-600',
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