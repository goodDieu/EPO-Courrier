// src/data/dashboardSPDG.js

/* ============================================================
   KPI DU SP-DG
   ============================================================ */

export const KPIS_SP_DG = [
    {
        id: 'a-introduire',
        label: 'À introduire au DG',
        value: 4,
        icon: 'fa-pen',
        variant: 'urgent',
        hint: 'Dossiers prêts à présenter',
    },
    {
        id: 'chez-dg',
        label: 'Chez le DG',
        value: 7,
        icon: 'fa-hourglass-half',
        variant: 'warning',
        hint: 'En cours d\'examen',
    },
    {
        id: 'a-cocher',
        label: 'Post-visa à cocher',
        value: 7,
        icon: 'fa-check-square',
        variant: 'urgent',
        hint: 'Anti-black-out en cours',
    },
    {
        id: 'traites-jour',
        label: 'Traités ce jour',
        value: 5,
        icon: 'fa-check-circle',
        variant: 'success',
        hint: 'Coches + introductions',
    },
];

/* ============================================================
   DOSSIERS À INTRODUIRE AU DG
   ============================================================ */

export const DOSSIERS_A_INTRODUIRE = [
    {
        id: '2026-0452',
        type: 'courrier',
        objet: 'Demande de subvention exceptionnelle- Colloque 2026',
        produitPar: 'SG',
        priorite: 'urgent',
        vuBonASigner: {
            date: '2026-09-28T15:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        tempsAttente: 45,
        pieces: 3,
    },
    {
        id: 'CONF-2026-0021',
        type: 'courrier',
        objet: 'Décision de sanction disciplinaire- Agent X',
        produitPar: 'DRH',
        priorite: 'confidentiel',
        vuBonASigner: {
            date: '2026-09-28T17:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        tempsAttente: 90,
        pieces: 3,
    },
    {
        id: 'ACT-2026-0443',
        type: 'acte',
        objet: 'Certificat de travail- M. SAWADOGO Bakary',
        produitPar: 'DRH',
        priorite: 'normal',
        vuBonASigner: {
            date: '2026-09-27T09:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        tempsAttente: 180,
        pieces: 1,
    },
    {
        id: '2026-0448',
        type: 'courrier',
        objet: "Recrutement d'un assistant à l'IGIT",
        produitPar: 'DRH',
        priorite: 'normal',
        vuBonASigner: {
            date: '2026-09-27T14:00:00',
            par: 'M. OUÉDRAOGO Salif (SG)',
        },
        tempsAttente: 240,
        pieces: 4,
    },
];

/* ============================================================
   ACTIVITÉ RÉCENTE
   ============================================================ */

export const ACTIVITES_RECENTES_SP_DG = [
    {
        id: 1,
        color: 'green',
        icon: 'fa-check-square',
        html: '<strong>Vous</strong> avez coché la <strong>signature</strong> du dossier <strong>ACT-2026-0405</strong> · SG notifié (RG-18)',
        time: 'Il y a 15 min',
    },
    {
        id: 2,
        color: 'blue',
        icon: 'fa-pen',
        html: '<strong>Vous</strong> avez introduit le dossier <strong>2026-0398</strong> auprès du DG',
        time: 'Il y a 45 min',
    },
    {
        id: 3,
        color: 'red',
        icon: 'fa-times-circle',
        html: '<strong>Vous</strong> avez enregistré un <strong>rejet</strong> sur <strong>2026-0398</strong> · Motif : à reformuler',
        time: 'Il y a 2h',
    },
    {
        id: 4,
        color: 'amber',
        icon: 'fa-hashtag',
        html: '<strong>Numérotation confidentielle</strong> attribuée à <strong>CONF-2026-0021</strong> (RG-35)',
        time: 'Il y a 3h',
    },
    {
        id: 5,
        color: 'purple',
        icon: 'fa-print',
        html: '<strong>Impression</strong> du dossier <strong>2026-0418</strong> pour le DG',
        time: 'Il y a 4h',
    },
];

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
    red: 'bg-epo-red-50 text-epo-red-500',
    green: 'bg-epo-green-50 text-epo-green-500',
    amber: 'bg-epo-yellow-50 text-epo-yellow-600',
    purple: 'bg-epo-slate-100 text-epo-slate-600',
};