// src/data/statistiques.js

/* ============================================================
   KPI SYNTHÈSE
   ============================================================ */

export const KPIS_STATS = [
    {
        id: 'total',
        label: 'Courriers traités',
        value: 1284,
        formatted: '1 284',
        change: '+12%',
        trend: 'up',
        goodDirection: 'up',
        icon: 'fa-inbox',
        variant: 'default',
        spark: [42, 48, 55, 51, 60, 68, 72, 65, 78, 82, 74, 88],
    },
    {
        id: 'delai',
        label: 'Délai moyen global',
        value: '1j 4h',
        change: '-8%',
        trend: 'down',
        goodDirection: 'down',
        icon: 'fa-clock',
        variant: 'success',
        spark: [38, 36, 35, 32, 30, 28, 29, 27, 26, 25, 24, 22],
    },
    {
        id: 'respect',
        label: 'Respect des délais',
        value: '78%',
        change: '+5 pts',
        trend: 'up',
        goodDirection: 'up',
        icon: 'fa-check-circle',
        variant: 'success',
        spark: [62, 65, 68, 66, 70, 72, 71, 74, 76, 75, 77, 78],
    },
    {
        id: 'retards',
        label: 'Dossiers en retard',
        value: 7,
        change: '+2',
        trend: 'up',
        goodDirection: 'down',
        icon: 'fa-exclamation-triangle',
        variant: 'urgent',
        spark: [3, 4, 5, 4, 6, 5, 7, 6, 5, 6, 5, 7],
    },
    {
        id: 'retour',
        label: 'Taux de retour notes',
        value: '64%',
        change: '-3 pts',
        trend: 'down',
        goodDirection: 'up',
        icon: 'fa-reply',
        variant: 'warning',
        spark: [72, 70, 71, 68, 67, 66, 68, 65, 63, 65, 64, 64],
    },
];

/* ============================================================
   VOLUMES TEMPORELS
   ============================================================ */

export const VOLUMES_TEMPORELS = [
    { date: '01/09', entrants: 42, sortants: 28, internes: 12, actes: 8 },
    { date: '02/09', entrants: 51, sortants: 34, internes: 15, actes: 10 },
    { date: '03/09', entrants: 48, sortants: 31, internes: 11, actes: 9 },
    { date: '04/09', entrants: 55, sortants: 38, internes: 16, actes: 12 },
    { date: '05/09', entrants: 62, sortants: 40, internes: 18, actes: 14 },
    { date: '06/09', entrants: 38, sortants: 25, internes: 10, actes: 6 },
    { date: '07/09', entrants: 35, sortants: 22, internes: 9, actes: 5 },
    { date: '08/09', entrants: 58, sortants: 36, internes: 17, actes: 13 },
    { date: '09/09', entrants: 64, sortants: 42, internes: 20, actes: 15 },
    { date: '10/09', entrants: 59, sortants: 39, internes: 18, actes: 11 },
    { date: '11/09', entrants: 67, sortants: 45, internes: 21, actes: 16 },
    { date: '12/09', entrants: 71, sortants: 48, internes: 22, actes: 18 },
];

export const REPARTITION_TYPES = [
    { type: 'Entrants', value: 692, color: '#009A44' },
    { type: 'Sortants', value: 428, color: '#FFD100' },
    { type: 'Internes', value: 189, color: '#E30613' },
    { type: 'Actes', value: 137, color: '#3C4653' },
];

/* ============================================================
   DÉLAIS PAR ÉTAPE
   ============================================================ */

export const DELAIS_ETAPES = [
    { etape: 'SCC → SP-SG', reel: 12, cible: 30, unite: 'min', respect: true },
    { etape: 'SP-SG → SG', reel: 28, cible: 60, unite: 'min', respect: true },
    { etape: 'SG → SP-DG → DG', reel: 372, cible: 1440, unite: 'min', respect: true },
    { etape: 'DG → SG (imputation)', reel: 1680, cible: 1440, unite: 'min', respect: false },
    { etape: 'SG → SCC (dispatch)', reel: 45, cible: 30, unite: 'min', respect: false },
    { etape: 'SCC → Direction', reel: 150, cible: 30, unite: 'min', respect: false },
];

export const TAUX_PAR_CIRCUIT = [
    { circuit: 'WF-ORD', taux: 82 },
    { circuit: 'WF-URG', taux: 94 },
    { circuit: 'WF-CONF', taux: 100 },
    { circuit: 'WF-FIN', taux: 65 },
    { circuit: 'WF-RH-A', taux: 88 },
];

/* ============================================================
   ACTIVITÉ PAR STRUCTURE
   ============================================================ */

export const ACTIVITE_STRUCTURES = [
    { id: 'sg', nom: 'Secrétariat Général', sigle: 'SG', traites: 245, enCours: 12, retards: 3, delaiMoyen: '1j 4h', tauxRespect: 82 },
    { id: 'scc', nom: 'Service Central du Courrier', sigle: 'SCC', traites: 412, enCours: 6, retards: 1, delaiMoyen: '1h 20min', tauxRespect: 91 },
    { id: 'drh', nom: 'Direction des Ressources Humaines', sigle: 'DRH', traites: 189, enCours: 8, retards: 7, delaiMoyen: '2j 6h', tauxRespect: 64 },
    { id: 'daf', nom: "Direction de l'Administration et des Finances", sigle: 'DAF', traites: 156, enCours: 5, retards: 2, delaiMoyen: '1j 18h', tauxRespect: 78 },
    { id: 'dga-ave', nom: 'DGA - Affaires de la Vie Étudiante', sigle: 'DGA-AVE', traites: 98, enCours: 4, retards: 1, delaiMoyen: '1j 2h', tauxRespect: 85 },
    { id: 'prmp', nom: 'Personne Responsable des Marchés Publics', sigle: 'PRMP', traites: 74, enCours: 3, retards: 0, delaiMoyen: '2j 10h', tauxRespect: 72 },
    { id: 'dcpip', nom: 'Direction de la Coopération et des Partenariats', sigle: 'DCPIP', traites: 62, enCours: 2, retards: 0, delaiMoyen: '1j 8h', tauxRespect: 89 },
    { id: 'dga-rcp', nom: 'DGA - Recherche, Coopération et Partenariats', sigle: 'DGA-RCP', traites: 48, enCours: 1, retards: 0, delaiMoyen: '1j 12h', tauxRespect: 92 },
];

/* ============================================================
   HEATMAP STRUCTURES × SEMAINES
   ============================================================ */

export const HEATMAP_DATA = {
    semaines: ['S36', 'S37', 'S38', 'S39', 'S40', 'S41'],
    structures: [
        { sigle: 'SG', valeurs: [42, 51, 48, 55, 62, 45] },
        { sigle: 'SCC', valeurs: [78, 82, 91, 88, 95, 87] },
        { sigle: 'DRH', valeurs: [35, 42, 38, 45, 40, 38] },
        { sigle: 'DAF', valeurs: [28, 32, 30, 35, 33, 30] },
        { sigle: 'DGA-AVE', valeurs: [18, 22, 20, 24, 21, 19] },
        { sigle: 'PRMP', valeurs: [12, 15, 14, 16, 13, 12] },
    ],
};

/* ============================================================
   ALERTES
   ============================================================ */

export const ALERTES_STATS = [
    {
        id: 'retards',
        niveau: 'rouge',
        icon: 'fa-clock',
        titre: '7 dossiers en dépassement de délai',
        description: 'Dont 3 à la DRH et 2 à la DAF. Action recommandée avant fin de semaine.',
        action: { label: 'Voir les dossiers', to: '/sg/echeances' },
    },
    {
        id: 'notes',
        niveau: 'jaune',
        icon: 'fa-reply',
        titre: '5 notes internes sans retour depuis > 3 jours',
        description: 'Taux de retour à 64%, en baisse de 3 points sur la période.',
        action: { label: 'Relancer', to: '/sg/courriers-internes' },
    },
    {
        id: 'confidentiels',
        niveau: 'rouge',
        icon: 'fa-lock',
        titre: '2 dossiers confidentiels en attente DG > 24h',
        description: 'Accès restreint. Délai cible dépassé pour 1 des 2 dossiers.',
        action: { label: 'Consulter', to: '/dg/confidentiel' },
    },
    {
        id: 'drh',
        niveau: 'jaune',
        icon: 'fa-building',
        titre: 'DRH en retard sur 7 dossiers',
        description: 'Taux de respect à 64%, le plus bas de la période.',
        action: { label: 'Interpeller', to: '/sg/structures/drh' },
    },
    {
        id: 'scc',
        niveau: 'vert',
        icon: 'fa-arrow-trend-up',
        titre: 'Délai moyen SCC amélioré de 18%',
        description: 'Passage de 1h 38min à 1h 20min. Félicitations à l\u2019équipe.',
        action: { label: 'Détail', to: '/scc/statistiques' },
    },
];

/* ============================================================
   OPTIONS DES FILTRES
   ============================================================ */

export const PERIODES = [
    { value: 'jour', label: "Aujourd'hui" },
    { value: '7j', label: '7 derniers jours' },
    { value: '30j', label: '30 derniers jours' },
    { value: 'trimestre', label: 'Trimestre en cours' },
    { value: 'annee', label: 'Année 2026' },
];

export const GRANULARITES = [
    { value: 'jour', label: 'Jour' },
    { value: 'semaine', label: 'Semaine' },
    { value: 'mois', label: 'Mois' },
];

export const STRUCTURES = [
    { value: '', label: 'Toutes les structures' },
    { value: 'sg', label: 'Secrétariat Général' },
    { value: 'scc', label: 'SCC' },
    { value: 'drh', label: 'DRH' },
    { value: 'daf', label: 'DAF' },
    { value: 'dga-ave', label: 'DGA-AVE' },
    { value: 'prmp', label: 'PRMP' },
];

export const TYPES = [
    { value: '', label: 'Tous les types' },
    { value: 'entrants', label: 'Courriers entrants' },
    { value: 'sortants', label: 'Courriers sortants' },
    { value: 'internes', label: 'Courriers internes' },
    { value: 'actes', label: 'Actes administratifs' },
];