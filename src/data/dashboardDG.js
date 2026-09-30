// src/data/dashboardDG.js

/* ============================================================
   KPI DU DG
   ============================================================ */

export const KPIS_DG = [
    {
        id: 'a-signer',
        label: 'À signer',
        value: 7,
        icon: 'fa-pen',
        variant: 'urgent',
    },
    {
        id: 'a-valider',
        label: 'À valider',
        value: 4,
        icon: 'fa-check-double',
        variant: 'warning',
    },
    {
        id: 'confidentiels',
        label: 'Confidentiels',
        value: 2,
        icon: 'fa-lock',
        variant: 'default',
    },
    {
        id: 'signes',
        label: 'Signés ce jour',
        value: 6,
        icon: 'fa-check-circle',
        variant: 'success',
    },
];

/* ============================================================
   DOCUMENTS À SIGNER
   ============================================================ */

export const DOCUMENTS_A_SIGNER = [
    {
        id: '2026-0452',
        objet: 'Demande de subvention exceptionnelle',
        provenence: 'SG',
        priorite: 'urgent',
        etat: 'chez-dg',
        echeanceLabel: "Aujourd'hui",
        echeanceColor: 'red',
        description: "Demande de subvention pour l'organisation du colloque international 2026.",
        contenu: 'Le projet de réponse est ci-joint. Veuillez apposer votre signature ou formuler vos observations.',
        expediteur: 'Secrétaire Général',
        dateDocument: '2026-09-28',
        pieces: ['Lettre de demande', 'Budget prévisionnel', 'Avis SG'],
        fondsDeDossier: '2026-0452',
    },
    {
        id: '2026-0448',
        objet: "Recrutement d'un assistant IGIT",
        provenence: 'DRH',
        priorite: 'normal',
        etat: 'chez-dg',
        echeanceLabel: 'J+2',
        echeanceColor: 'amber',
        description: "Dossier de recrutement pour un poste d'assistant à l'IGIT.",
        contenu: 'Le dossier de recrutement est complet. Veuillez signer la décision d\'engagement.',
        expediteur: 'DRH',
        dateDocument: '2026-09-27',
        pieces: ['Dossier de candidature', 'CV', 'Diplômes', 'PV de sélection'],
    },
    {
        id: '2026-0421',
        objet: 'Convention Université de Lyon',
        provenence: 'DCPIP',
        priorite: 'confidentiel',
        etat: 'chez-dg',
        echeanceLabel: 'J-2',
        echeanceColor: 'red',
        description: 'Convention de partenariat pour la mobilité des enseignants et des étudiants.',
        contenu: 'Document confidentiel. Veuillez signer la convention après lecture.',
        expediteur: 'DCPIP',
        dateDocument: '2026-09-21',
        pieces: ['Projet de convention', 'Avis DCPIP', "Autorisation d'accès confidentiel"],
    },
    {
        id: '2026-0398',
        objet: 'Réponse au Ministère -projet SG',
        provenence: 'SG',
        priorite: 'urgent',
        etat: 'a-re-signer',
        echeanceLabel: 'Dépassé',
        echeanceColor: 'red',
        description: "Projet de réponse au courrier du Ministère de l'Enseignement Supérieur.",
        contenu: 'Ce projet a été rejeté précédemment. Veuillez reformuler selon les directives du Ministère.',
        expediteur: 'SG',
        dateDocument: '2026-09-18',
        pieces: ["Courrier d'origine Ministère N°2026-0182", 'Projet de réponse'],
        motifRejetPrecedent: 'À reformuler selon les directives du Ministère',
    },
];

/* ============================================================
   ACTIVITÉ RÉCENTE
   ============================================================ */

export const ACTIVITES_RECENTES_DG = [
    {
        id: 1,
        color: 'green',
        icon: 'fa-check-circle',
        html: '<strong>Vous</strong> avez signé la décision de congé <strong>N°2026-0405</strong>',
        time: 'Il y a 15 min',
    },
    {
        id: 2,
        color: 'blue',
        icon: 'fa-file-signature',
        html: '<strong>SG</strong> a soumis un projet à signature · <strong>N°2026-0452</strong>',
        time: 'Il y a 45 min',
    },
    {
        id: 3,
        color: 'red',
        icon: 'fa-times-circle',
        html: '<strong>Vous</strong> avez rejeté le projet <strong>N°2026-0398</strong> · Motif : "À reformuler"',
        time: 'Il y a 2h',
    },
    {
        id: 4,
        color: 'amber',
        icon: 'fa-clock',
        html: '<strong>Notification</strong> : Le courrier <strong>N°2026-0410</strong> arrive à échéance dans 24h',
        time: 'Il y a 3h',
    },
];

/* ============================================================
   HELPERS
   ============================================================ */

export const PRIORITES = {
    urgent: { label: 'Urgent', chip: 'bg-epo-red-50 text-epo-red-700' },
    normal: { label: 'Normal', chip: 'bg-epo-slate-100 text-epo-slate-600' },
    confidentiel: { label: 'Confidentiel', chip: 'bg-epo-slate-700 text-white' },
};

export const ECHEANCE_COLORS = {
    red: 'text-epo-red-600',
    amber: 'text-epo-yellow-700',
    green: 'text-epo-green-600',
};