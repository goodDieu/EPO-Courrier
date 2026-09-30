/**
 * États du cycle de vie d'un courrier entrant (section 11.1 du CDG).
 * L'ordre est important : il sert à calculer la position courante
 * dans le circuit vertical.
 */
export const ETATS_ENTRANT = [
    'Enregistré',
    'Chez SP-SG',
    'Chez SG',
    'Chez SP-DG',
    'Chez DG',
    'Retour SG (imputation)',
    'Chez SCC (dispatch)',
    'Remis direction',
    'En traitement',
    'Objet satisfait',
    'Archivé',
];

/**
 * Codes d'imputation utilisés par le SG.
 * À déplacer vers /data/referentiels.js plus tard.
 */
export const IMPUTATION_CODES = [
    'D.IGIT', 'D.IGSIT', 'D.CPEI', 'DAA', 'DSFC', 'D.OS',
    'C.E', 'C.SS', 'R.B', 'SS', 'SEE', 'SP',
];

/**
 * Types de traitement associés à une instruction SG.
 */
export const TYPES_TRAITEMENT = [
    'Pour attribution',
    'Pour disposition à prendre',
    'Me voir avec le dossier',
    'Pour nécessaire à faire',
    'Pour étude et avis',
    'Pour participation et CR',
    'Me retourner le dossier',
    'Me représenter',
    'Pour exploitation',
    'Pour suite à donner',
    'Pour projet de réponse',
    'Mettre en instance',
    'Pour diffusion',
    'Pour suivi',
    'Pour classement',
    'Pour information',
    'Photocopie',
    'Pour synthèse',
];

/**
 * KPI affichés en haut de la page.
 */
export const KPIS_ENTRANTS = [
    {
        id: 'kpi-a-examiner',
        label: 'À examiner (chez SG)',
        value: 5,
        variant: 'urgent',
        icon: 'fa-inbox',
    },
    {
        id: 'kpi-chez-dg',
        label: 'Chez DG (décision)',
        value: 3,
        variant: 'warning',
        icon: 'fa-user-tie',
    },
    {
        id: 'kpi-retour-sg',
        label: 'Retour SG - à imputer',
        value: 4,
        variant: 'info',
        icon: 'fa-route',
    },
    {
        id: 'kpi-satisfait',
        label: 'Objet satisfait (ce mois)',
        value: 22,
        variant: 'success',
        icon: 'fa-check-double',
    },
];

/**
 * Registre des arrivées.
 */
export const COURRIERS_ENTRANTS = [
    {
        id: '2026-0452',
        objet: 'Demande de subvention exceptionnelle',
        origine: 'Direction des Finances',
        classification: 'Urgent',
        etat: 'Chez SG',
        echeance: 'J-1',
        echeanceColor: 'red',
        pieces: ['Lettre de demande', 'Budget prévisionnel'],
    },
    {
        id: '2026-0529',
        objet: "Demande de soutien pour l'organisation de la 2e édition du Code Battle",
        origine: "Club Informatique de l'EPO",
        classification: 'Ordinaire',
        etat: 'Chez SG',
        echeance: 'J+3',
        echeanceColor: 'green',
        pieces: ['Lettre timbrée du club'],
    },
    {
        id: '2026-0439',
        objet: 'Rapport de mission - atelier régional PRMP',
        origine: 'PRMP/PRCT',
        classification: 'Ordinaire',
        etat: 'Chez DG',
        echeance: 'J+1',
        echeanceColor: 'amber',
        pieces: ['Rapport de mission'],
    },
    {
        id: '2026-0431',
        objet: 'Convocation - comité de direction',
        origine: 'Ministère de tutelle',
        classification: 'Urgent',
        etat: 'Chez DG',
        echeance: "Aujourd'hui",
        echeanceColor: 'red',
        pieces: [],
    },
    {
        id: '2026-0418',
        objet: 'Facture fournisseur - maintenance groupe électrogène',
        origine: 'SONABEL',
        classification: 'Ordinaire',
        etat: 'Retour SG (imputation)',
        echeance: 'J+2',
        echeanceColor: 'green',
        pieces: ['Facture', 'Bon de commande'],
    },
    {
        id: '2026-0410',
        objet: 'Demande de stage - étudiant IGIT',
        origine: 'Étudiant',
        classification: 'Ordinaire',
        etat: 'Retour SG (imputation)',
        echeance: 'J+4',
        echeanceColor: 'green',
        pieces: ['Lettre de demande', 'CV'],
    },
    {
        id: '2026-0402',
        objet: 'Communiqué officiel - rentrée académique',
        origine: 'MESRSI',
        classification: 'Ordinaire',
        etat: 'Objet satisfait',
        echeance: 'Traité',
        echeanceColor: 'green',
        pieces: [],
    },
    {
        id: '2026-0395',
        objet: 'Dossier disciplinaire',
        origine: 'Direction des affaires juridiques',
        classification: 'Confidentiel / réservé',
        etat: 'Archivé',
        echeance: 'Clos',
        echeanceColor: 'slate',
        pieces: ['Dossier complet'],
        archive: true,
    },
];