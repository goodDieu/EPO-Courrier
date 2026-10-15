// src/data/planningLiaison.js

/* ============================================================
   AGENT CONNECTÉ
   ============================================================ */

export const AGENT = {
    id: 'al1',
    nom: 'M. SAWADOGO Bakary',
    matricule: 'EPO-2018-0087',
    zone: 'Zone A - SG / SP / Directions',
};

/* ============================================================
   ÉTATS DE TOURNÉE
   ============================================================ */

export const ETATS_TOURNEE = {
    'planifiee': {
        key: 'planifiee',
        label: 'Planifiée',
        icon: 'fa-calendar-alt',
        dot: 'bg-epo-slate-400',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
        bar: 'bg-epo-slate-400',
    },
    'en-cours': {
        key: 'en-cours',
        label: 'En cours',
        icon: 'fa-spinner',
        dot: 'bg-epo-slate-800',
        chip: 'bg-epo-slate-800 text-white',
        bar: 'bg-epo-slate-800',
    },
    'terminee': {
        key: 'terminee',
        label: 'Terminée',
        icon: 'fa-check-circle',
        dot: 'bg-epo-green-500',
        chip: 'bg-epo-green-50 text-epo-green-700',
        bar: 'bg-epo-green-500',
    },
    'partielle': {
        key: 'partielle',
        label: 'Partielle',
        icon: 'fa-exclamation-triangle',
        dot: 'bg-epo-yellow-500',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
        bar: 'bg-epo-yellow-500',
    },
};

/* ============================================================
   HELPERS
   ============================================================ */

const JOURS_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MOIS_FR = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

export { JOURS_FR, MOIS_FR };

export function toKey(date) {
    return date.toISOString().slice(0, 10);
}

export function formatHeure(iso) {
    if (!iso) return '-';
    return new Date(iso).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatDate(iso) {
    if (!iso) return '-';
    return new Date(iso).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export function formatDateCourt(iso) {
    if (!iso) return '-';
    return new Date(iso).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

export function sameDay(a, b) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

/**
 * Génère les 42 cases (6 semaines × 7 jours) pour un mois donné.
 * Semaine commence lundi.
 */
export function buildMonthGrid(annee, mois) {
    const premierJour = new Date(annee, mois, 1);
    const jourSemaine = (premierJour.getDay() + 6) % 7;

    const start = new Date(premierJour);
    start.setDate(start.getDate() - jourSemaine);

    const cells = [];
    for (let i = 0; i < 42; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        cells.push({
            date: d,
            key: toKey(d),
            inMonth: d.getMonth() === mois,
        });
    }
    return cells;
}

/**
 * Génère les 7 cases d'une semaine (à partir du lundi).
 */
export function buildWeekGrid(dateRef) {
    const d = new Date(dateRef);
    d.setHours(0, 0, 0, 0);
    const jourSemaine = (d.getDay() + 6) % 7;

    const lundi = new Date(d);
    lundi.setDate(d.getDate() - jourSemaine);

    const cells = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(lundi);
        day.setDate(lundi.getDate() + i);
        cells.push({
            date: day,
            key: toKey(day),
            inMonth: true,
        });
    }
    return cells;
}

/* ============================================================
   TOURNÉES (avec dates relatives dynamiques)
   ============================================================ */

/**
 * Génère des tournées mockées autour de la date du jour.
 * Les dates sont calculées relativement à aujourd'hui
 * pour que la démo soit toujours "fraîche".
 */
export function buildTournees() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dayOffset = (offset) => {
        const d = new Date(today);
        d.setDate(d.getDate() + offset);
        return d;
    };

    const toISO = (date, heure, minute = 0) => {
        const d = new Date(date);
        d.setHours(heure, minute, 0, 0);
        return d.toISOString();
    };

    return [
        /* ============================================
           IL Y A 5 JOURS (terminée)
           ============================================ */
        {
            id: 'TRN-2026-0035',
            libelle: 'Tournée du matin',
            date: toKey(dayOffset(-5)),
            heureDebut: toISO(dayOffset(-5), 8, 0),
            heureFinPrevue: toISO(dayOffset(-5), 12, 0),
            heureFinReelle: toISO(dayOffset(-5), 11, 50),
            etat: 'terminee',
            zone: 'A',
            nbEtapes: 6,
            nbFaites: 6,
            nbRetards: 0,
            distanceEstimee: '1,7 km',
        },

        /* ============================================
           IL Y A 4 JOURS (terminée)
           ============================================ */
        {
            id: 'TRN-2026-0036',
            libelle: 'Tournée de l\'après-midi',
            date: toKey(dayOffset(-4)),
            heureDebut: toISO(dayOffset(-4), 14, 0),
            heureFinPrevue: toISO(dayOffset(-4), 17, 0),
            heureFinReelle: toISO(dayOffset(-4), 16, 40),
            etat: 'terminee',
            zone: 'A',
            nbEtapes: 4,
            nbFaites: 4,
            nbRetards: 0,
            distanceEstimee: '1,1 km',
        },

        /* ============================================
           IL Y A 3 JOURS (terminée)
           ============================================ */
        {
            id: 'TRN-2026-0037',
            libelle: 'Tournée du matin',
            date: toKey(dayOffset(-3)),
            heureDebut: toISO(dayOffset(-3), 8, 0),
            heureFinPrevue: toISO(dayOffset(-3), 12, 0),
            heureFinReelle: toISO(dayOffset(-3), 12, 10),
            etat: 'terminee',
            zone: 'A',
            nbEtapes: 5,
            nbFaites: 5,
            nbRetards: 0,
            distanceEstimee: '1,4 km',
        },

        /* ============================================
           IL Y A 2 JOURS (partielle)
           ============================================ */
        {
            id: 'TRN-2026-0038',
            libelle: 'Tournée du matin',
            date: toKey(dayOffset(-2)),
            heureDebut: toISO(dayOffset(-2), 8, 0),
            heureFinPrevue: toISO(dayOffset(-2), 12, 0),
            heureFinReelle: toISO(dayOffset(-2), 12, 30),
            etat: 'partielle',
            zone: 'A',
            nbEtapes: 5,
            nbFaites: 4,
            nbRetards: 1,
            distanceEstimee: '1,1 km',
        },

        /* ============================================
           HIER (terminée)
           ============================================ */
        {
            id: 'TRN-2026-0039',
            libelle: 'Tournée du matin',
            date: toKey(dayOffset(-1)),
            heureDebut: toISO(dayOffset(-1), 8, 0),
            heureFinPrevue: toISO(dayOffset(-1), 12, 0),
            heureFinReelle: toISO(dayOffset(-1), 12, 5),
            etat: 'terminee',
            zone: 'A',
            nbEtapes: 7,
            nbFaites: 7,
            nbRetards: 0,
            distanceEstimee: '2,1 km',
        },
        {
            id: 'TRN-2026-0040',
            libelle: 'Tournée de l\'après-midi',
            date: toKey(dayOffset(-1)),
            heureDebut: toISO(dayOffset(-1), 14, 0),
            heureFinPrevue: toISO(dayOffset(-1), 17, 0),
            heureFinReelle: toISO(dayOffset(-1), 16, 45),
            etat: 'terminee',
            zone: 'A',
            nbEtapes: 4,
            nbFaites: 4,
            nbRetards: 0,
            distanceEstimee: '0,9 km',
        },

        /* ============================================
           AUJOURD'HUI (en cours)
           ============================================ */
        {
            id: 'TRN-2026-0042',
            libelle: 'Tournée du matin',
            date: toKey(dayOffset(0)),
            heureDebut: toISO(dayOffset(0), 8, 0),
            heureFinPrevue: toISO(dayOffset(0), 12, 30),
            heureFinReelle: null,
            etat: 'en-cours',
            zone: 'A',
            nbEtapes: 7,
            nbFaites: 2,
            nbRetards: 0,
            distanceEstimee: '1,8 km',
        },

        /* ============================================
           DEMAIN (planifiée)
           ============================================ */
        {
            id: 'TRN-2026-0043',
            libelle: 'Tournée du matin',
            date: toKey(dayOffset(1)),
            heureDebut: toISO(dayOffset(1), 8, 0),
            heureFinPrevue: toISO(dayOffset(1), 12, 0),
            heureFinReelle: null,
            etat: 'planifiee',
            zone: 'A',
            nbEtapes: 5,
            nbFaites: 0,
            nbRetards: 0,
            distanceEstimee: '1,2 km',
        },

        /* ============================================
           APRÈS-DEMAIN (planifiée)
           ============================================ */
        {
            id: 'TRN-2026-0044',
            libelle: 'Tournée du matin',
            date: toKey(dayOffset(2)),
            heureDebut: toISO(dayOffset(2), 8, 0),
            heureFinPrevue: toISO(dayOffset(2), 11, 30),
            heureFinReelle: null,
            etat: 'planifiee',
            zone: 'A',
            nbEtapes: 4,
            nbFaites: 0,
            nbRetards: 0,
            distanceEstimee: '0,9 km',
        },

        /* ============================================
           J+5 (planifiée)
           ============================================ */
        {
            id: 'TRN-2026-0047',
            libelle: 'Tournée de l\'après-midi',
            date: toKey(dayOffset(5)),
            heureDebut: toISO(dayOffset(5), 14, 0),
            heureFinPrevue: toISO(dayOffset(5), 17, 0),
            heureFinReelle: null,
            etat: 'planifiee',
            zone: 'A',
            nbEtapes: 3,
            nbFaites: 0,
            nbRetards: 0,
            distanceEstimee: '0,8 km',
        },

        /* ============================================
           J+8 (planifiée)
           ============================================ */
        {
            id: 'TRN-2026-0050',
            libelle: 'Tournée du matin',
            date: toKey(dayOffset(8)),
            heureDebut: toISO(dayOffset(8), 8, 0),
            heureFinPrevue: toISO(dayOffset(8), 12, 0),
            heureFinReelle: null,
            etat: 'planifiee',
            zone: 'A',
            nbEtapes: 6,
            nbFaites: 0,
            nbRetards: 0,
            distanceEstimee: '1,5 km',
        },
    ];
}

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_ETAT = [
    { value: '', label: 'Tous les états' },
    { value: 'en-cours', label: 'En cours' },
    { value: 'planifiee', label: 'Planifiée' },
    { value: 'terminee', label: 'Terminée' },
    { value: 'partielle', label: 'Partielle' },
];