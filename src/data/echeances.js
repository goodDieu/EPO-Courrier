// src/data/echeances.js

/* ============================================================
   NIVEAUX D'ÉCHÉANCE
   ============================================================ */

export const NIVEAUX = {
    depasse: {
        key: 'depasse',
        label: 'Dépassé',
        shortLabel: 'Dépassé',
        icon: 'fa-exclamation-circle',
        dot: 'bg-epo-red-500',
        bg: 'bg-epo-red-50',
        text: 'text-epo-red-700',
        border: 'border-l-epo-red-500',
        chip: 'bg-epo-red-500 text-white',
        order: 0,
    },
    jourJ: {
        key: 'jour-j',
        label: 'Jour J',
        shortLabel: 'Jour J',
        icon: 'fa-clock',
        dot: 'bg-epo-yellow-500',
        bg: 'bg-epo-yellow-50',
        text: 'text-epo-yellow-800',
        border: 'border-l-epo-yellow-500',
        chip: 'bg-epo-yellow-500 text-epo-slate-900',
        order: 1,
    },
    urgent: {
        key: 'urgent',
        label: 'Urgent (J-1)',
        shortLabel: 'J-1',
        icon: 'fa-hourglass-half',
        dot: 'bg-epo-yellow-400',
        bg: 'bg-epo-yellow-50',
        text: 'text-epo-yellow-700',
        border: 'border-l-epo-yellow-400',
        chip: 'bg-epo-yellow-400 text-epo-slate-900',
        order: 2,
    },
    surveiller: {
        key: 'surveiller',
        label: 'À surveiller (J-3)',
        shortLabel: 'J-3',
        icon: 'fa-hourglass-start',
        dot: 'bg-epo-slate-400',
        bg: 'bg-epo-slate-50',
        text: 'text-epo-slate-700',
        border: 'border-l-epo-slate-400',
        chip: 'bg-epo-slate-200 text-epo-slate-700',
        order: 3,
    },
    ok: {
        key: 'ok',
        label: 'Dans les temps',
        shortLabel: 'OK',
        icon: 'fa-check-circle',
        dot: 'bg-epo-green-500',
        bg: 'bg-epo-green-50',
        text: 'text-epo-green-700',
        border: 'border-l-epo-green-500',
        chip: 'bg-epo-green-500 text-white',
        order: 4,
    },
};

/* ============================================================
   CIRCUITS
   ============================================================ */

export const CIRCUITS = {
    'WF-ORD': { label: 'Ordinaire', color: 'bg-epo-slate-100 text-epo-slate-700' },
    'WF-URG': { label: 'Urgent', color: 'bg-epo-red-50 text-epo-red-700' },
    'WF-CONF': { label: 'Confidentiel', color: 'bg-epo-slate-700 text-white' },
    'WF-PRMP': { label: 'Marchés', color: 'bg-epo-yellow-50 text-epo-yellow-700' },
    'WF-FIN': { label: 'Finance', color: 'bg-epo-green-50 text-epo-green-700' },
    'WF-RH-A': { label: 'RH allégé', color: 'bg-epo-slate-100 text-epo-slate-700' },
    'WF-INT': { label: 'Interne numérique', color: 'bg-epo-green-50 text-epo-green-700' },
};

/* ============================================================
   HELPERS DE CALCUL
   ============================================================ */

/**
 * Calcule le niveau d'échéance à partir du temps restant (en minutes).
 * Négatif = dépassé.
 */
export function computeNiveau(tempsRestantMin) {
    if (tempsRestantMin < 0) return 'depasse';
    if (tempsRestantMin < 12 * 60) return 'jourJ';
    if (tempsRestantMin < 24 * 60) return 'urgent';
    if (tempsRestantMin < 72 * 60) return 'surveiller';
    return 'ok';
}

/**
 * Formate une durée en minutes vers un texte humain court.
 * Ex : 135 → "2h 15min" · 1680 → "1j 4h"
 */
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
 * Texte d'échéance selon le niveau.
 */
export function formatEcheanceTexte(row) {
    const { tempsRestant, niveau } = row;
    if (niveau === 'depasse') return `Dépassé de ${formatDuree(tempsRestant)}`;
    if (niveau === 'jourJ') return `Dans ${formatDuree(tempsRestant)}`;
    return `Dans ${formatDuree(tempsRestant)}`;
}

/* ============================================================
   DOSSIERS AVEC ÉCHÉANCE (mock complet)
   ============================================================ */

export const DOSSIERS_ECHEANCES = [
    {
        id: '2026-0452',
        objet: 'Demande de subvention exceptionnelle pour le colloque international',
        expediteur: "Ministère de l'Enseignement Supérieur",
        structure: 'SG',
        etapeCourante: 'SG → SP-DG',
        circuit: 'WF-URG',
        classification: 'urgent',
        responsable: 'M. OUÉDRAOGO Salif',
        tempsRestant: -135, // -2h 15min
    },
    {
        id: '2026-0447',
        objet: 'Réponse à la note de service N°2026-0388',
        expediteur: 'DRH',
        structure: 'SG',
        etapeCourante: 'Chez SG',
        circuit: 'WF-ORD',
        classification: 'ordinaire',
        responsable: 'M. OUÉDRAOGO Salif',
        tempsRestant: -45, // -45min
    },
    {
        id: 'ACT-2026-0405',
        objet: 'Décision de congé administratif - M. KABORÉ Issa',
        expediteur: 'DRH',
        structure: 'SP-DG',
        etapeCourante: 'Chez DG',
        circuit: 'WF-RH-A',
        classification: 'ordinaire',
        responsable: 'Pr. NIKIÉMA Adama',
        tempsRestant: -2880, // -2j
    },
    {
        id: '2026-0450',
        objet: "Rapport d'activité semestriel",
        expediteur: 'DGA-AVE',
        structure: 'SCC',
        etapeCourante: 'SCC → Direction',
        circuit: 'WF-ORD',
        classification: 'ordinaire',
        responsable: 'M. TRAORÉ Ibrahim',
        tempsRestant: -420, // -7h
    },

    // Jour J
    {
        id: '2026-0445',
        objet: 'Convention de partenariat - Université de Lyon',
        expediteur: 'DCPIP',
        structure: 'SP-DG',
        etapeCourante: 'Chez SP-DG',
        circuit: 'WF-CONF',
        classification: 'confidentiel',
        responsable: 'Mme OUATTARA Rasmata',
        tempsRestant: 180, // 3h
    },
    {
        id: '2026-0441',
        objet: 'Convocation réunion du conseil scientifique',
        expediteur: 'SG',
        structure: 'DRH',
        etapeCourante: 'Chez DRH',
        circuit: 'WF-ORD',
        classification: 'ordinaire',
        responsable: 'M. COMPAORÉ Ali',
        tempsRestant: 540, // 9h
    },
    {
        id: '2026-0438',
        objet: 'Transmission du PV de délibération du personnel',
        expediteur: 'DAF',
        structure: 'SG',
        etapeCourante: 'Chez SG',
        circuit: 'WF-FIN',
        classification: 'ordinaire',
        responsable: 'M. OUÉDRAOGO Salif',
        tempsRestant: 660, // 11h
    },

    // Urgent (J-1)
    {
        id: '2026-0435',
        objet: "Demande d'explication sur les dépenses Q3",
        expediteur: 'Contrôleur Interne',
        structure: 'DAF',
        etapeCourante: 'Chez DAF',
        circuit: 'WF-FIN',
        classification: 'ordinaire',
        responsable: 'Mme SANOU Mariam',
        tempsRestant: 1080, // 18h
    },
    {
        id: '2026-0432',
        objet: 'Attestation de prise de service - M. OUÉDRAOGO Karim',
        expediteur: 'DRH',
        structure: 'SP-DG',
        etapeCourante: 'Chez SP-DG',
        circuit: 'WF-RH-A',
        classification: 'ordinaire',
        responsable: 'Mme OUATTARA Rasmata',
        tempsRestant: 1260, // 21h
    },
    {
        id: 'ACT-2026-0398',
        objet: 'Certificat de cessation de paiement',
        expediteur: 'DRH',
        structure: 'SG',
        etapeCourante: 'Chez SG',
        circuit: 'WF-RH-A',
        classification: 'ordinaire',
        responsable: 'M. OUÉDRAOGO Salif',
        tempsRestant: 1320, // 22h
    },

    // À surveiller (J-3)
    {
        id: '2026-0428',
        objet: 'Offre de service - Maintenance informatique',
        expediteur: 'PRMP',
        structure: 'PRMP',
        etapeCourante: 'Chez PRMP',
        circuit: 'WF-PRMP',
        classification: 'ordinaire',
        responsable: 'M. KONATÉ Souleymane',
        tempsRestant: 2160, // 1j 12h
    },
    {
        id: '2026-0421',
        objet: 'Note de service - Organisation des soutenances',
        expediteur: 'DGA-AVE',
        structure: 'SG',
        etapeCourante: 'Chez SG',
        circuit: 'WF-ORD',
        classification: 'ordinaire',
        responsable: 'M. OUÉDRAOGO Salif',
        tempsRestant: 3600, // 2j 12h
    },
    {
        id: '2026-0419',
        objet: 'Bordereau d\'envoi - Dossiers étudiants',
        expediteur: 'DGA-RCP',
        structure: 'SCC',
        etapeCourante: 'À dispatcher',
        circuit: 'WF-ORD',
        classification: 'ordinaire',
        responsable: 'M. TRAORÉ Ibrahim',
        tempsRestant: 3960, // 2j 18h
    },
    {
        id: '2026-0415',
        objet: 'Rapport trimestriel de coopération',
        expediteur: 'DCPIP',
        structure: 'SG',
        etapeCourante: 'Chez SG',
        circuit: 'WF-ORD',
        classification: 'ordinaire',
        responsable: 'M. OUÉDRAOGO Salif',
        tempsRestant: 4200, // 2j 22h
    },

    // OK (dans les temps)
    {
        id: '2026-0410',
        objet: "Programme d'échange académique 2027",
        expediteur: 'DCPIP',
        structure: 'SP-DG',
        etapeCourante: 'Chez SP-DG',
        circuit: 'WF-ORD',
        classification: 'ordinaire',
        responsable: 'Mme OUATTARA Rasmata',
        tempsRestant: 7200, // 5j
    },
    {
        id: '2026-0405',
        objet: 'Convention de stage étudiant',
        expediteur: 'DRH',
        structure: 'SG',
        etapeCourante: 'Chez SG',
        circuit: 'WF-ORD',
        classification: 'ordinaire',
        responsable: 'M. OUÉDRAOGO Salif',
        tempsRestant: 8640, // 6j
    },
];

/* ============================================================
   DONNÉES CALENDRIER (échéances par jour sur 7 jours)
   ============================================================ */

// export const CALENDRIER_SEMAINE = [
//     { jour: 'Aujourd\'hui', date: '29/09', depasse: 4, jourJ: 3, urgent: 3, surveiller: 2, total: 12 },
//     { jour: 'Demain', date: '30/09', depasse: 0, jourJ: 0, urgent: 4, surveiller: 3, total: 7 },
//     { jour: 'Mercredi', date: '01/10', depasse: 0, jourJ: 0, urgent: 2, surveiller: 4, total: 6 },
//     { jour: 'Jeudi', date: '02/10', depasse: 0, jourJ: 0, urgent: 1, surveiller: 3, total: 4 },
//     { jour: 'Vendredi', date: '03/10', depasse: 0, jourJ: 0, urgent: 2, surveiller: 2, total: 4 },
//     { jour: 'Samedi', date: '04/10', depasse: 0, jourJ: 0, urgent: 0, surveiller: 1, total: 1 },
//     { jour: 'Dimanche', date: '05/10', depasse: 0, jourJ: 0, urgent: 0, surveiller: 0, total: 0 },
// ];

/* ============================================================
   DONNÉES CALENDRIER - grille mensuelle
   ============================================================ */

/**
 * Génère les dossiers avec leur date d'échéance réelle,
 * pour alimenter le calendrier mensuel.
 * (Dans le vrai backend, ce sera calculé côté serveur.)
 */
export function getEcheancesParJour() {
    // Map : 'YYYY-MM-DD' → { total, depasse, jourJ, urgent, surveiller, ok, dossiers }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const map = {};

    const add = (offsetJours, niveau, count = 1) => {
        const d = new Date(today);
        d.setDate(d.getDate() + offsetJours);
        const key = d.toISOString().slice(0, 10);
        if (!map[key]) {
            map[key] = { total: 0, depasse: 0, jourJ: 0, urgent: 0, surveiller: 0, ok: 0 };
        }
        map[key][niveau] += count;
        map[key].total += count;
    };

    // Échéances dépassées (jours passés)
    add(-1, 'depasse', 2);
    add(-2, 'depasse', 1);

    // Aujourd'hui - échéances dépassées + jour J
    add(0, 'depasse', 2);
    add(0, 'jourJ', 3);

    // À venir
    add(1, 'urgent', 4);
    add(1, 'surveiller', 1);
    add(2, 'urgent', 2);
    add(2, 'surveiller', 3);
    add(3, 'surveiller', 2);
    add(4, 'urgent', 1);
    add(4, 'surveiller', 1);
    add(5, 'ok', 2);
    add(7, 'surveiller', 2);
    add(8, 'ok', 1);
    add(10, 'urgent', 1);
    add(10, 'surveiller', 1);
    add(12, 'ok', 3);
    add(15, 'surveiller', 2);
    add(20, 'ok', 4);

    return map;
}

/* ============================================================
   OPTIONS DE FILTRES
   ============================================================ */

export const FILTRES_NIVEAU = [
    { value: '', label: 'Tous les niveaux' },
    { value: 'depasse', label: 'Dépassé' },
    { value: 'jour-j', label: 'Jour J' },
    { value: 'urgent', label: 'Urgent (J-1)' },
    { value: 'surveiller', label: 'À surveiller (J-3)' },
    { value: 'ok', label: 'Dans les temps' },
];

export const FILTRES_CIRCUIT = [
    { value: '', label: 'Tous les circuits' },
    { value: 'WF-ORD', label: 'Ordinaire' },
    { value: 'WF-URG', label: 'Urgent' },
    { value: 'WF-CONF', label: 'Confidentiel' },
    { value: 'WF-PRMP', label: 'Marchés' },
    { value: 'WF-FIN', label: 'Finance' },
    { value: 'WF-RH-A', label: 'RH allégé' },
];

export const FILTRES_STRUCTURE = [
    { value: '', label: 'Toutes les structures' },
    { value: 'SG', label: 'Secrétariat Général' },
    { value: 'SCC', label: 'SCC' },
    { value: 'SP-DG', label: 'SP-DG' },
    { value: 'DRH', label: 'DRH' },
    { value: 'DAF', label: 'DAF' },
    { value: 'PRMP', label: 'PRMP' },
];