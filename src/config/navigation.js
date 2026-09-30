/**
 * Configuration de la navigation par rôle.
 * Chaque entrée définit une section du sidebar avec ses items.
 *
 * Usage :
 *   const nav = getNavigationForRole('sg');
 *   nav.forEach(section => ...)
 */

export const NAVIGATION = {
    sg: [
        {
            label: 'Menu principal',
            items: [
                { icon: 'fa-chart-pie', label: 'Tableau de bord', path: '/sg/dashboard' },
                { icon: 'fa-inbox', label: 'Entrants', path: '/sg/courriers-entrants', badge: { count: 12, variant: 'red' } },
                { icon: 'fa-paper-plane', label: 'Sortants', path: '/sg/courriers-sortants', badge: { count: 4, variant: 'amber' } },
                { icon: 'fa-file-alt', label: 'Actes administratifs', path: '/sg/actes', badge: { count: 8, variant: 'green' } },
                { icon: 'fa-exchange-alt', label: 'Transmissions', path: '/sg/transmissions', badge: { count: 3, variant: 'red' } },
                { icon: 'fa-archive', label: 'Archives', path: '/sg/archives' },
            ],
        },
        {
            label: 'Outils',
            items: [
                { icon: 'fa-search', label: 'Recherche avancée', path: '/sg/recherche-avancee' },
                { icon: 'fa-chart-bar', label: 'Statistiques', path: '/sg/statistiques' },
                { icon: 'fa-calendar-alt', label: 'Échéances', path: '/sg/echeances', badge: { count: 6, variant: 'red' } },
            ],
        },
        {
            label: 'Administration',
            items: [
                { icon: 'fa-users-cog', label: 'Utilisateurs', path: '/sg/utilisateurs' },
                { icon: 'fa-sitemap', label: 'Structures', path: '/sg/structures' },
                { icon: 'fa-sliders-h', label: 'Paramétrage', path: '/sg/parametrage' },
            ],
        },
    ],

    dg: [
        {
            label: 'Menu principal',
            items: [
                { icon: 'fa-chart-pie', label: 'Tableau de bord', path: '/dg/dashboard' },
                { icon: 'fa-pen', label: 'À signer', path: '/dg/a-signer', badge: { count: 7, variant: 'red' } },
                { icon: 'fa-check-double', label: 'À valider', path: '/dg/a-valider', badge: { count: 4, variant: 'amber' } },
                { icon: 'fa-lock', label: 'Confidentiel', path: '/dg/confidentiel', badge: { count: 2, variant: 'red' } },
                { icon: 'fa-history', label: 'Rejetés', path: '/dg/rejetes', badge: { count: 3, variant: 'red' } },
                { icon: 'fa-file-alt', label: 'Actes signés', path: '/dg/actes-signes' },
                { icon: 'fa-calendar-alt', label: 'Échéances', path: '/dg/echeances', badge: { count: 5, variant: 'red' } },
            ],
        },
    ],

    scc: [
        {
            label: 'Menu principal',
            items: [
                { icon: 'fa-chart-pie', label: 'Tableau de bord', path: '/scc/dashboard' },
                { icon: 'fa-inbox', label: 'Arrivées', path: '/scc/arrivees', badge: { count: 12, variant: 'red' } },
                { icon: 'fa-paper-plane', label: 'Départs', path: '/scc/departs', badge: { count: 4, variant: 'amber' } },
                { icon: 'fa-exchange-alt', label: 'À dispatcher', path: '/scc/dispatch', badge: { count: 6, variant: 'red' } },
                { icon: 'fa-camera', label: 'À scanner', path: '/scc/scan', badge: { count: 3, variant: 'green' } },
                { icon: 'fa-users', label: 'Liaisons', path: '/scc/liaisons' },
            ],
        },
    ],

    liaison: [
        {
            label: 'Menu principal',
            items: [
                { icon: 'fa-chart-pie', label:"Tableau de bord",path:"/liaison/dashboard"},
                { icon: 'fa-route', label: 'Tournées', path: '/liaison/tournees', badge: { count: 2, variant: 'red' } },
                { icon: 'fa-inbox', label: 'À remettre', path: '/liaison/a-remettre', badge: { count: 4, variant: 'amber' } },
                { icon: 'fa-check-double', label: 'Remises effectuées', path: '/liaison/remises', badge: { count: 12, variant: 'green' } },
                { icon: 'fa-clock', label: 'En attente', path: '/liaison/en-attente', badge: { count: 3, variant: 'red' } },
                { icon: 'fa-calendar-alt', label: 'Planning', path: '/liaison/planning' },
                { icon: 'fa-file-signature', label: 'Décharges', path: '/liaison/decharges' },
            ],
        },
    ],

    admin: [
        {
            label: 'Administration',
            items: [
                { icon: 'fa-users', label: 'Utilisateurs', path: '/admin/utilisateurs', badge: { count: 8, variant: 'red' } },
                { icon: 'fa-sitemap', label: 'Structures', path: '/admin/structures' },
                { icon: 'fa-user-tag', label: 'Rôles', path: '/admin/roles' },
                { icon: 'fa-flowchart', label: 'Workflows', path: '/admin/workflows' },
                { icon: 'fa-hashtag', label: 'Séries', path: '/admin/series' },
                { icon: 'fa-clock', label: 'Délais', path: '/admin/delais' },
                { icon: 'fa-file-template', label: 'Gabarits', path: '/admin/gabarits' },
            ],
        },
        {
            label: 'Audit',
            items: [
                { icon: 'fa-clipboard-list', label: "Journal d'audit", path: '/admin/audit' },
                { icon: 'fa-database', label: 'Sauvegardes', path: '/admin/sauvegardes' },
            ],
        },
    ],
};

/**
 * Retourne la configuration de navigation pour un rôle donné.
 */
export function getNavigationForRole(role) {
    return NAVIGATION[role] || NAVIGATION.sg;
}