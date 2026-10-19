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
                { icon: 'fa-envelope-open-text', label: 'Courriers à examiner', path: '/sg/courriers-entrants' },
                { icon: 'fa-paper-plane', label: 'Courriers sortants', path: '/sg/courriers-sortants' },
                { icon: 'fa-file-signature', label: 'Actes administratifs', path: '/sg/actes' },
                // { icon: 'fa-exchange-alt', label: 'Transmissions', path: '/sg/transmissions', badge: { count: 3, variant: 'red' } },
                // { icon: 'fa-archive', label: 'Archives', path: '/sg/archives' },
            ],
        },
        {
            label: 'Outils',
            items: [
                { icon: 'fa-search', label: 'Recherche', path: '/sg/recherche-avancee' },
                // { icon: 'fa-chart-bar', label: 'Statistiques', path: '/sg/statistiques' },
                // { icon: 'fa-calendar-alt', label: 'Échéances', path: '/sg/echeances', badge: { count: 6, variant: 'red' } },
            ],
        },
        {
            label: 'Administration',
            items: [
                // { icon: 'fa-users-cog', label: 'Utilisateurs', path: '/sg/utilisateurs' },
                // { icon: 'fa-sitemap', label: 'Structures', path: '/sg/structures' },
                // { icon: 'fa-sliders-h', label: 'Paramétrage', path: '/sg/parametrage' },
            ],
        },
    ],

    dg: [
        {
            label: 'Menu principal',
            items: [
                { icon: 'fa-chart-pie', label: 'Tableau de bord', path: '/dg/dashboard' },
                { icon: 'fa-pen-nib', label: 'À signer', path: '/dg/a-signer' },
                { icon: 'fa-scale-balanced', label: 'Pour décision', path: '/dg/a-valider' },
                // { icon: 'fa-lock', label: 'Confidentiel', path: '/dg/confidentiel' },
                { icon: 'fa-calendar-alt', label: 'Échéances', path: '/dg/echeances' },
                { icon: 'fa-file-signature', label: 'Documents signés', path: '/dg/actes-signes' },
                { icon: 'fa-circle-xmark', label: 'Rejetés', path: '/dg/rejetes' },
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
                { icon: 'fa-chart-pie', label: 'Tableau de bord', path: '/liaison/dashboard' },
                { icon: 'fa-route', label: 'Ma tournée', path: '/liaison/tournees' },
                { icon: 'fa-triangle-exclamation', label: 'Problèmes de remise', path: '/liaison/en-attente' },
                { icon: 'fa-file-signature', label: 'Remises faites', path: '/liaison/remises' },
            ],
        },
    ],

    sp_sg: [
        {
            label: 'Menu principal',
            items: [
                { icon: 'fa-chart-pie', label: 'Tableau de bord', path: '/sp_sg/dashboard' },
                { icon: 'fa-inbox', label: 'Courriers reçus', path: '/sp_sg/courriers-recus', badge: { count: 8, variant: 'red' } },
                { icon: 'fa-th', label: 'Tri & classement', path: '/sp_sg/tri', badge: { count: 5, variant: 'amber' } },
                // { icon: 'fa-camera', label: 'Numérisation', path: '/sp_sg/scan', badge: { count: 3, variant: 'green' } },  // page pas encore réalisée
                { icon: 'fa-user-tie', label: 'Introduction au SG', path: '/sp_sg/introduction', badge: { count: 4, variant: 'red' } },
                { icon: 'fa-stream', label: 'Suivi des dossiers', path: '/sp_sg/suivi' },
            ],
        },
        {
            label: 'Suivi',
            items: [
                { icon: 'fa-comment-dots', label: 'Instructions du SG', path: '/sp_sg/instructions', badge: { count: 5, variant: 'red' } },
                // { icon: 'fa-clock', label: 'Échéances SG', path: '/sp_sg/echeances' },  // page pas encore réalisée
                // { icon: 'fa-history', label: 'Historique', path: '/sp_g/historique' },  // page pas encore réalisée
            ],
        },
    ],

    sp_dg: [
        {
            label: 'Menu principal',
            items: [
                { icon: 'fa-chart-pie', label: 'Tableau de bord', path: '/sp_dg/dashboard' },
                { icon: 'fa-inbox', label: 'Courriers reçus', path: '/sp_dg/courriers-recus' },
                { icon: 'fa-user-tie', label: 'Introduction au DG', path: '/sp_dg/introduction' },
                { icon: 'fa-square-check', label: 'Coche post-visa', path: '/sp_dg/post-visa' },
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