// src/data/circuit.js
// Dossiers qui circulent après le Service Courrier : secrétariat du SG, SG,
// secrétariat du DG, DG. Les numéros des courriers sont ceux du registre des
// arrivées du SCC (arriveesSCC.js) ; les actes ont leur propre série (ACT-).
//
// localisation : où se trouve le dossier, avec les mêmes codes que l'état
// d'un courrier dans le registre du SCC.

/* ============================================================
   LOCALISATIONS
   ============================================================ */

export const LOCALISATIONS = {
    'transmis-sp-sg': { label: 'Envoyé au secrétariat du SG', court: 'Envoyé au SP-SG' },
    'chez-sp-sg': { label: 'Au secrétariat du SG', court: 'Chez SP-SG' },
    'chez-sg': { label: 'Chez le SG', court: 'Chez SG' },
    'chez-sp-dg': { label: 'Au secrétariat du DG', court: 'Chez SP-DG' },
    'chez-dg': { label: 'Chez le DG', court: 'Chez DG' },
    'retour-sg': { label: 'Revenu au SG pour imputation', court: 'Retour SG' },
    'chez-scc': { label: 'Au Service Courrier, à remettre', court: 'Chez SCC' },
    'remis-direction': { label: 'Remis à la direction concernée', court: 'Remis à la direction' },
    'objet-satisfait': { label: 'Traité, dossier clos', court: 'Clos' },
};

// Ordre du circuit, pour la frise de suivi
export const ETAPES_CIRCUIT = [
    { key: 'scc', label: 'SCC' },
    { key: 'chez-sp-sg', label: 'SP-SG' },
    { key: 'chez-sg', label: 'SG' },
    { key: 'chez-sp-dg', label: 'SP-DG' },
    { key: 'chez-dg', label: 'DG' },
    { key: 'retour-sg', label: 'Retour SG' },
    { key: 'chez-scc', label: 'Dispatch' },
    { key: 'remis-direction', label: 'Direction' },
];

export const INDEX_ETAPE = {
    'transmis-sp-sg': 0,
    'chez-sp-sg': 1,
    'chez-sg': 2,
    'chez-sp-dg': 3,
    'chez-dg': 4,
    'retour-sg': 5,
    'chez-scc': 6,
    'remis-direction': 7,
    'objet-satisfait': 8,
};

/* ============================================================
   TRI DU SECRÉTARIAT DU SG (importance × urgence)
   ============================================================ */

export const QUADRANTS = {
    'important-urgent': {
        key: 'important-urgent',
        label: 'Important et urgent',
        consigne: 'À introduire au SG en premier',
        tone: 'danger',
        icon: 'fa-circle-exclamation',
        ordre: 0,
    },
    'important-non-urgent': {
        key: 'important-non-urgent',
        label: 'Important, non urgent',
        consigne: 'À introduire dans la journée',
        tone: 'warning',
        icon: 'fa-star',
        ordre: 1,
    },
    'non-important-urgent': {
        key: 'non-important-urgent',
        label: 'Urgent, peu important',
        consigne: 'À introduire rapidement, sans priorité',
        tone: 'strong',
        icon: 'fa-clock',
        ordre: 2,
    },
    'non-important-non-urgent': {
        key: 'non-important-non-urgent',
        label: 'Ordinaire',
        consigne: 'À introduire avec le courrier du jour',
        tone: 'neutral',
        icon: null,
        ordre: 3,
    },
};

// Délai pour introduire un dossier au SG après son tri (minutes)
export const DELAI_INTRODUCTION = {
    'important-urgent': 60,
    'important-non-urgent': 240,
    'non-important-urgent': 120,
    'non-important-non-urgent': 480,
};

export const TYPES_DOSSIER = {
    courrier: { label: 'Courrier', icon: 'fa-envelope' },
    acte: { label: 'Acte', icon: 'fa-file-signature' },
};

/* ============================================================
   INSTRUCTIONS DU SG
   ============================================================ */

export const TYPES_INSTRUCTION = {
    instruction: { label: 'Instruction', icon: 'fa-list-check' },
    imputation: { label: 'Imputation', icon: 'fa-share' },
    avis: { label: 'Avis', icon: 'fa-comment' },
    renvoi: { label: 'Renvoi pour correction', icon: 'fa-rotate-left' },
    ras: { label: 'Rien à signaler', icon: 'fa-check' },
};

export const STATUTS_INSTRUCTION = {
    'a-traiter': { label: 'À exécuter' },
    'en-cours': { label: 'En cours' },
    traite: { label: 'Exécutée' },
};

/* ============================================================
   DOSSIERS
   ============================================================ */

const SP_SG = 'Mme KABORÉ Fatimata';
const SG = 'M. OUÉDRAOGO Salif';
const SP_DG = 'Mme OUATTARA Rasmata';
const DG = 'Pr. NIKIÉMA Adama';

export const DOSSIERS_CIRCUIT = [
    /* ---------- Au secrétariat du SG : à trier ---------- */
    {
        id: 'ACT-2026-0418',
        type: 'acte',
        objet: 'Autorisation d\'absence du 05/10 au 06/10/2026 - Mme KABORÉ Aminata',
        expediteur: 'DRH',
        classificationScc: 'ordinaire',
        pieces: 2,
        localisation: 'chez-sp-sg',
        etapeSpSg: 'a-trier',
        recuLe: '2026-09-29T10:15:00',
        historique: [
            { date: '2026-09-29T09:30:00', action: 'Acte préparé par la DRH', par: 'M. COMPAORÉ Ali' },
            { date: '2026-09-29T10:00:00', action: 'Validé par le supérieur hiérarchique', par: 'Mme SANOU Mariam' },
            { date: '2026-09-29T10:15:00', action: 'Reçu au secrétariat du SG', par: SP_SG },
        ],
    },
    {
        id: '2026-0484',
        type: 'courrier',
        objet: 'Dossier de candidature - Stage ingénieur',
        expediteur: 'Université Joseph Ki-Zerbo',
        classificationScc: 'ordinaire',
        pieces: 5,
        localisation: 'chez-sp-sg',
        etapeSpSg: 'a-trier',
        recuLe: '2026-09-29T08:40:00',
        historique: [
            { date: '2026-09-29T08:30:00', action: 'Enregistré au Service Courrier', par: 'M. OUÉDRAOGO Karim' },
            { date: '2026-09-29T08:40:00', action: 'Reçu au secrétariat du SG', par: SP_SG },
        ],
    },

    /* ---------- Au secrétariat du SG : à introduire ---------- */
    {
        id: 'ACT-2026-0417',
        type: 'acte',
        objet: 'Certificat de prise de service du 28/09/2026 - M. SAWADOGO Bakary',
        expediteur: 'DRH',
        classificationScc: 'ordinaire',
        pieces: 1,
        localisation: 'chez-sp-sg',
        etapeSpSg: 'a-introduire',
        quadrant: 'important-urgent',
        recuLe: '2026-09-29T08:20:00',
        trieLe: '2026-09-29T08:30:00',
        echeance: '2026-09-29T09:30:00',
        pointAttention: 'Le salaire de septembre ne peut pas être payé sans ce certificat.',
        historique: [
            { date: '2026-09-28T14:00:00', action: 'Acte préparé par la DRH', par: 'M. COMPAORÉ Ali' },
            { date: '2026-09-29T08:00:00', action: 'Validé par le supérieur hiérarchique', par: 'M. TRAORÉ Ibrahim' },
            { date: '2026-09-29T08:20:00', action: 'Reçu au secrétariat du SG', par: SP_SG },
            { date: '2026-09-29T08:30:00', action: 'Classé « Important et urgent »', par: SP_SG },
        ],
    },

    /* ---------- Plus loin dans le circuit ---------- */
    {
        id: '2026-0482',
        type: 'courrier',
        objet: 'Demande de subvention - Colloque international',
        expediteur: "Ministère de l'Enseignement Supérieur",
        classificationScc: 'urgent',
        pieces: 3,
        localisation: 'chez-sg',
        quadrant: 'important-urgent',
        recuLe: '2026-09-28T14:45:00',
        introduitLe: '2026-09-28T15:20:00',
        echeanceSg: '2026-09-29T10:00:00',
        pointAttention: 'Le Ministère attend la réponse avant le 01/10.',
        historique: [
            { date: '2026-09-28T14:30:00', action: 'Enregistré au Service Courrier', par: 'M. OUÉDRAOGO Karim' },
            { date: '2026-09-28T14:45:00', action: 'Reçu au secrétariat du SG', par: SP_SG },
            { date: '2026-09-28T14:55:00', action: 'Classé « Important et urgent »', par: SP_SG },
            { date: '2026-09-28T15:20:00', action: 'Introduit au SG', par: SP_SG },
        ],
    },
    {
        id: '2026-0481',
        type: 'courrier',
        objet: 'Recrutement assistant IGIT - Dossier',
        expediteur: 'DRH',
        classificationScc: 'ordinaire',
        pieces: 6,
        localisation: 'chez-dg',
        quadrant: 'important-non-urgent',
        recuSpDg: true,
        echeanceDg: '2026-09-30T12:00:00',
        recuLe: '2026-09-28T11:15:00',
        introduitLe: '2026-09-28T13:00:00',
        historique: [
            { date: '2026-09-28T11:00:00', action: 'Enregistré au Service Courrier', par: 'Mme ZONGO Aïcha' },
            { date: '2026-09-28T11:15:00', action: 'Reçu au secrétariat du SG', par: SP_SG },
            { date: '2026-09-28T13:00:00', action: 'Introduit au SG', par: SP_SG },
            { date: '2026-09-28T16:30:00', action: 'Transmis au secrétariat du DG', par: SP_SG },
            { date: '2026-09-29T08:10:00', action: 'Introduit au DG', par: SP_DG },
        ],
    },
    {
        id: '2026-0480',
        type: 'courrier',
        objet: "Rapport d'activité semestriel",
        expediteur: 'DGA-AVE',
        classificationScc: 'ordinaire',
        pieces: 2,
        localisation: 'retour-sg',
        quadrant: 'non-important-non-urgent',
        avisDg: 'Vu. Rapport à exploiter par la DGA-AVE pour le conseil de direction.',
        echeanceSg: '2026-09-29T12:00:00',
        recuLe: '2026-09-28T09:20:00',
        introduitLe: '2026-09-28T10:00:00',
        historique: [
            { date: '2026-09-28T09:00:00', action: 'Enregistré au Service Courrier', par: 'M. OUÉDRAOGO Karim' },
            { date: '2026-09-28T09:20:00', action: 'Reçu au secrétariat du SG', par: SP_SG },
            { date: '2026-09-28T10:00:00', action: 'Introduit au SG', par: SP_SG },
            { date: '2026-09-28T11:30:00', action: 'Introduit au DG', par: SP_DG },
            { date: '2026-09-28T17:00:00', action: 'Revenu au SG pour imputation', par: DG },
        ],
    },
    {
        id: '2026-0479',
        type: 'courrier',
        objet: 'Convocation réunion du conseil scientifique',
        expediteur: 'SG',
        classificationScc: 'ordinaire',
        pieces: 1,
        localisation: 'chez-scc',
        quadrant: 'non-important-urgent',
        recuLe: '2026-09-27T15:10:00',
        introduitLe: '2026-09-27T15:30:00',
        historique: [
            { date: '2026-09-27T15:00:00', action: 'Enregistré au Service Courrier', par: 'Mme ZONGO Aïcha' },
            { date: '2026-09-27T15:10:00', action: 'Reçu au secrétariat du SG', par: SP_SG },
            { date: '2026-09-27T15:30:00', action: 'Introduit au SG', par: SP_SG },
            { date: '2026-09-28T09:00:00', action: 'Imputé à la DGA-AVE', par: SG },
            { date: '2026-09-28T09:20:00', action: 'Remis au Service Courrier pour remise', par: SP_SG },
        ],
    },
    {
        id: '2026-0478',
        type: 'courrier',
        objet: 'Note de service - Organisation des soutenances',
        expediteur: 'DGA-AVE',
        classificationScc: 'ordinaire',
        pieces: 1,
        localisation: 'remis-direction',
        quadrant: 'non-important-non-urgent',
        recuLe: '2026-09-27T10:15:00',
        introduitLe: '2026-09-27T11:00:00',
        historique: [
            { date: '2026-09-27T10:00:00', action: 'Enregistré au Service Courrier', par: 'M. OUÉDRAOGO Karim' },
            { date: '2026-09-27T10:15:00', action: 'Reçu au secrétariat du SG', par: SP_SG },
            { date: '2026-09-27T11:00:00', action: 'Introduit au SG', par: SP_SG },
            { date: '2026-09-27T14:00:00', action: 'Imputé à la DGA-AVE, rien à signaler', par: SG },
            { date: '2026-09-28T10:30:00', action: 'Remis à la DGA-AVE', par: 'M. SAWADOGO Bakary' },
        ],
    },
    {
        id: '2026-0477',
        type: 'courrier',
        objet: 'Bordereau envoi Ministère - Dossiers étudiants',
        expediteur: 'DGA-RCP',
        classificationScc: 'ordinaire',
        pieces: 8,
        localisation: 'objet-satisfait',
        quadrant: 'important-non-urgent',
        recuLe: '2026-09-26T11:20:00',
        introduitLe: '2026-09-26T12:00:00',
        historique: [
            { date: '2026-09-26T11:00:00', action: 'Enregistré au Service Courrier', par: 'Mme ZONGO Aïcha' },
            { date: '2026-09-26T11:20:00', action: 'Reçu au secrétariat du SG', par: SP_SG },
            { date: '2026-09-26T12:00:00', action: 'Introduit au SG', par: SP_SG },
            { date: '2026-09-26T15:00:00', action: 'Imputé à la DGA-RCP', par: SG },
            { date: '2026-09-27T09:00:00', action: 'Remis à la DGA-RCP', par: 'M. OUÉDRAOGO Karim' },
            { date: '2026-09-28T16:00:00', action: 'Dossier clos par la DGA-RCP', par: 'DGA-RCP' },
        ],
    },
    {
        id: '2026-0461',
        type: 'courrier',
        objet: 'Réponse au Ministère - Rentrée académique 2026-2027',
        expediteur: 'SG',
        classificationScc: 'urgent',
        pieces: 2,
        localisation: 'chez-sg',
        quadrant: 'important-urgent',
        recuLe: '2026-09-24T09:30:00',
        introduitLe: '2026-09-24T10:00:00',
        bloque: 'Rejeté par le DG le 25/09 : réponse à reformuler par le SG.',
        historique: [
            { date: '2026-09-24T09:15:00', action: 'Enregistré au Service Courrier', par: 'M. OUÉDRAOGO Karim' },
            { date: '2026-09-24T09:30:00', action: 'Reçu au secrétariat du SG', par: SP_SG },
            { date: '2026-09-24T10:00:00', action: 'Introduit au SG', par: SP_SG },
            { date: '2026-09-24T15:00:00', action: 'Introduit au DG', par: SP_DG },
            { date: '2026-09-25T09:00:00', action: 'Rejeté par le DG, renvoyé au SG', par: DG },
        ],
    },
];

/* ============================================================
   INSTRUCTIONS DONNÉES PAR LE SG AU SECRÉTARIAT
   suite : localisation du dossier une fois l'instruction exécutée
   ============================================================ */

export const INSTRUCTIONS_SG = [
    {
        id: 'INST-2026-0143',
        dossierId: '2026-0461',
        type: 'renvoi',
        contenu: 'Préparer une nouvelle version de la réponse selon les observations du DG et me la présenter demain matin.',
        emiseLe: '2026-09-29T07:40:00',
        echeance: '2026-09-30T09:00:00',
        statut: 'en-cours',
        actionLabel: 'Marquer comme exécutée',
    },
    {
        id: 'INST-2026-0141',
        dossierId: '2026-0481',
        type: 'avis',
        contenu: "Avis favorable du SG. Me signaler dès le retour du DG s'il y a des réserves.",
        emiseLe: '2026-09-28T15:30:00',
        echeance: null,
        statut: 'en-cours',
        actionLabel: 'Marquer comme exécutée',
    },
    {
        id: 'INST-2026-0140',
        dossierId: '2026-0479',
        type: 'imputation',
        contenu: 'Imputer à la DGA-AVE, ampliation au conseil scientifique.',
        emiseLe: '2026-09-28T09:00:00',
        echeance: '2026-09-28T12:00:00',
        statut: 'traite',
        traiteLe: '2026-09-28T09:20:00',
    },
    {
        id: 'INST-2026-0139',
        dossierId: '2026-0478',
        type: 'ras',
        contenu: 'Rien à signaler. Remettre à la DGA-AVE.',
        emiseLe: '2026-09-27T14:00:00',
        echeance: null,
        statut: 'traite',
        traiteLe: '2026-09-27T14:30:00',
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_TYPE = [
    { value: '', label: 'Courriers et actes' },
    { value: 'courrier', label: 'Courriers' },
    { value: 'acte', label: 'Actes' },
];

export const FILTRES_QUADRANT = [
    { value: '', label: 'Tous les niveaux' },
    ...Object.values(QUADRANTS).map((q) => ({ value: q.key, label: q.label })),
];

export const FILTRES_LOCALISATION = [
    { value: '', label: 'Partout dans le circuit' },
    ...Object.entries(LOCALISATIONS)
        .filter(([k]) => k !== 'transmis-sp-sg')
        .map(([value, l]) => ({ value, label: l.label })),
];

export const FILTRES_STATUT_INSTRUCTION = [
    { value: '', label: 'Tous les statuts' },
    ...Object.entries(STATUTS_INSTRUCTION).map(([value, s]) => ({ value, label: s.label })),
];

export const FILTRES_TYPE_INSTRUCTION = [
    { value: '', label: 'Tous les types' },
    ...Object.entries(TYPES_INSTRUCTION).map(([value, t]) => ({ value, label: t.label })),
];

/* ============================================================
   HELPERS
   ============================================================ */

/** Minutes entre maintenant (heure de démonstration) et une date ; négatif = dépassé. */
export function minutesAvant(iso, now) {
    return Math.round((new Date(iso) - now) / 60000);
}

/* ============================================================
   FICHE D'ACCOMPAGNEMENT DU SG
   ============================================================ */

// Structures à qui le SG peut imputer un courrier (codes de la fiche papier)
export const IMPUTATIONS = [
    'DGA-AVE', 'DGA-RCP', 'DAF', 'DRH',
    'D.IGIT', 'D.IGSIT', 'D.CPEI', 'DAA', 'DSFC', 'D.OS',
    'C.E', 'C.SS', 'R.B', 'SS', 'SEE', 'SP',
];

export const TRAITEMENTS = [
    'Pour attribution', 'Pour disposition à prendre', 'Me voir avec le dossier', 'Pour nécessaire à faire',
    'Pour étude et avis', 'Pour participation et CR', 'Me retourner le dossier', 'Me représenter',
    'Pour exploitation', 'Pour suite à donner', 'Pour projet de réponse', 'Mettre en instance',
    'Pour diffusion', 'Pour suivi', 'Pour classement', 'Pour information', 'Photocopie', 'Pour synthèse',
];

// Responsables des structures, pour la remise par le Service Courrier
export const RESPONSABLES = {
    'DGA-AVE': { personne: 'Pr. TANKOANO Martin', qualite: 'Directeur Général Adjoint (AVE)' },
    'DGA-RCP': { personne: 'Dr. SOME Clément', qualite: 'Directeur Général Adjoint (RCP)' },
    DAF: { personne: 'Mme SANOU Mariam', qualite: 'Directrice des Affaires Financières' },
    DRH: { personne: 'M. COMPAORÉ Ali', qualite: 'Directeur des Ressources Humaines' },
};

/* ============================================================
   DOCUMENTS À SIGNER (courriers sortants et actes)
   Même parcours pour les deux : rédaction → visa du SG → secrétariat
   du DG → signature du DG → Service Courrier (départ).
   ============================================================ */

export const ETATS_DOCUMENT = {
    brouillon: { label: 'En rédaction', dot: 'slate' },
    'soumis-shi': { label: 'Chez le supérieur hiérarchique', dot: 'slate' },
    'chez-sp-sg': { label: 'Au secrétariat du SG', dot: 'slate' },
    'chez-sg': { label: 'À viser par le SG', dot: 'yellow' },
    'renvoye-correction': { label: 'Renvoyé pour correction', dot: 'yellow' },
    'vu-bon-a-signer': { label: 'Au secrétariat du DG', dot: 'slate' },
    'chez-dg': { label: 'Chez le DG, à signer', dot: 'slate' },
    signe: { label: 'Signé', dot: 'green' },
    rejete: { label: 'Rejeté par le DG', dot: 'red' },
    diffuse: { label: 'Diffusé', dot: 'green' },
    archive: { label: 'Archivé', dot: 'slate' },
};

export const FILTRES_ETAT_DOCUMENT = [
    { value: '', label: 'Tous les états' },
    ...Object.entries(ETATS_DOCUMENT).map(([value, e]) => ({ value, label: e.label })),
];

const CORPS_RENTREE = `<p style="text-align:right;margin-bottom:24px;">Ouagadougou, le 29 septembre 2026</p>
<p style="margin-bottom:20px;"><strong>À Monsieur le Ministre</strong><br>Ministère de l'Enseignement Supérieur,<br>de la Recherche et de l'Innovation<br>Ouagadougou</p>
<p style="margin-bottom:16px;"><strong>Objet :</strong> organisation de la rentrée académique 2026-2027.</p>
<p style="margin-bottom:16px;">Monsieur le Ministre,</p>
<p style="margin-bottom:16px;text-align:justify;">Par lettre citée en référence, vous avez bien voulu demander à l'École Polytechnique de Ouagadougou de vous faire connaître ses dispositions pour la rentrée académique 2026-2027.</p>
<p style="margin-bottom:16px;text-align:justify;">J'ai l'honneur de vous informer que les inscriptions administratives se tiendront du 5 au 23 octobre 2026 et que les cours débuteront le 2 novembre 2026 dans l'ensemble des filières.</p>
<p style="margin-bottom:16px;text-align:justify;">Le calendrier détaillé par filière vous sera transmis dès sa validation par le conseil de direction.</p>
<p style="margin-bottom:24px;">Je vous prie d'agréer, Monsieur le Ministre, l'expression de ma haute considération.</p>
<p style="text-align:right;margin-top:40px;"><strong>Le Directeur Général</strong><br><span style="color:#64748b;font-style:italic;">[Signature]</span></p>`;

export const SORTANTS = [
    {
        id: 'DEP-2026-0092',
        objet: 'Réponse au Ministère - Rentrée académique 2026-2027',
        destinataire: "Ministère de l'Enseignement Supérieur",
        redacteur: SG,
        classification: 'urgent',
        etat: 'brouillon',
        reponseA: '2026-0461',
        version: 2,
        creeLe: '2026-09-29T08:00:00',
        echeance: '2026-09-30T09:00:00',
        corps: CORPS_RENTREE,
        pieces: [
            { id: 'f1', type: 'pdf', nom: 'Courrier du Ministère 2026-0461.pdf', meta: '248 Ko · 24/09/2026' },
            { id: 'f2', type: 'word', nom: 'Calendrier de rentrée 2026-2027.docx', meta: '156 Ko · 28/09/2026' },
        ],
        commentaires: [
            { id: 'c1', auteur: DG, role: 'DG', type: 'fond', texte: 'Donner les dates d\'inscription et de début des cours. Le Ministère veut des dates précises.', date: '2026-09-25T09:00:00' },
            { id: 'c2', auteur: SG, role: 'SG', type: 'forme', texte: 'Reprendre la formule de politesse du modèle des correspondances ministérielles.', date: '2026-09-29T08:10:00' },
        ],
        historique: [
            { date: '2026-09-25T09:00:00', action: 'Première version rejetée par le DG', par: DG },
            { date: '2026-09-29T08:00:00', action: 'Nouvelle version commencée', par: SG },
        ],
    },
    {
        id: 'DEP-2026-0091',
        objet: 'Réponse - Demande de subvention, colloque international',
        destinataire: "Ministère de l'Enseignement Supérieur",
        redacteur: 'DAF',
        classification: 'urgent',
        etat: 'chez-sg',
        reponseA: '2026-0482',
        version: 1,
        creeLe: '2026-09-29T07:30:00',
        echeance: '2026-09-29T16:00:00',
        historique: [
            { date: '2026-09-29T07:30:00', action: 'Projet rédigé par la DAF', par: 'Mme SANOU Mariam' },
            { date: '2026-09-29T09:10:00', action: 'Reçu par le SG pour visa', par: SP_SG },
        ],
    },
    {
        id: 'DEP-2026-0093',
        objet: 'Convocation - Conseil scientifique du 08/10/2026',
        destinataire: 'Membres du conseil scientifique',
        redacteur: SG,
        classification: 'ordinaire',
        etat: 'vu-bon-a-signer',
        recuSpDg: false,
        reponseA: '2026-0479',
        version: 1,
        creeLe: '2026-09-28T10:00:00',
        echeance: '2026-09-30T12:00:00',
        historique: [
            { date: '2026-09-28T10:00:00', action: 'Rédigé par le SG', par: SG },
            { date: '2026-09-28T16:00:00', action: 'Vu bon à signer, envoyé au secrétariat du DG', par: SG },
        ],
    },
    {
        id: 'DEP-2026-0094',
        objet: 'Note de service - Campagne de sensibilisation à la sécurité',
        destinataire: 'Toutes les structures',
        redacteur: 'DGA-AVE',
        classification: 'ordinaire',
        etat: 'chez-dg',
        version: 1,
        creeLe: '2026-09-27T09:00:00',
        echeance: '2026-10-01T12:00:00',
        historique: [
            { date: '2026-09-27T09:00:00', action: 'Projet rédigé par la DGA-AVE', par: 'Pr. TANKOANO Martin' },
            { date: '2026-09-27T15:00:00', action: 'Vu bon à signer', par: SG },
            { date: '2026-09-28T09:00:00', action: 'Introduit au DG', par: SP_DG },
        ],
    },
    {
        id: 'DEP-2026-0090',
        objet: 'Transmission du PV de délibération du personnel',
        destinataire: 'Ministère de la Fonction Publique',
        redacteur: 'DAF',
        classification: 'ordinaire',
        etat: 'signe',
        version: 1,
        creeLe: '2026-09-25T10:00:00',
        signeLe: '2026-09-27T10:15:00',
        signePar: 'Le SG, par délégation',
        historique: [
            { date: '2026-09-25T10:00:00', action: 'Projet rédigé par la DAF', par: 'Mme SANOU Mariam' },
            { date: '2026-09-26T11:00:00', action: 'Vu bon à signer', par: SG },
            { date: '2026-09-27T10:15:00', action: 'Signé par délégation', par: SG },
            { date: '2026-09-29T09:30:00', action: 'Remis au Service Courrier pour envoi', par: SP_DG },
        ],
    },
    {
        id: 'DEP-2026-0088',
        objet: 'Réponse au Ministère - Rentrée académique 2026-2027 (1re version)',
        destinataire: "Ministère de l'Enseignement Supérieur",
        redacteur: SG,
        classification: 'urgent',
        etat: 'rejete',
        reponseA: '2026-0461',
        version: 1,
        creeLe: '2026-09-24T11:00:00',
        motifRejet: 'Réponse trop vague : préciser les dates d\'inscription et de début des cours.',
        remplacePar: 'DEP-2026-0092',
        historique: [
            { date: '2026-09-24T11:00:00', action: 'Rédigé par le SG', par: SG },
            { date: '2026-09-24T15:00:00', action: 'Introduit au DG', par: SP_DG },
            { date: '2026-09-25T09:00:00', action: 'Rejeté par le DG', par: DG },
        ],
    },
];

// Parcours d'un document à signer, pour la frise
export const ETAPES_DOCUMENT = [
    { key: 'redaction', label: 'Rédaction' },
    { key: 'visa', label: 'Visa du SG' },
    { key: 'sp-dg', label: 'SP-DG' },
    { key: 'dg', label: 'Signature DG' },
    { key: 'envoi', label: 'Envoi' },
];

export const INDEX_DOCUMENT = {
    brouillon: 0,
    'soumis-shi': 0,
    'chez-sp-sg': 0,
    'renvoye-correction': 0,
    'chez-sg': 1,
    'vu-bon-a-signer': 2,
    'chez-dg': 3,
    rejete: 3,
    signe: 4,
    diffuse: 5,
    archive: 5,
};

/* ============================================================
   SECRÉTARIAT DU DG : situation de départ des actes
   recuSpDg  : le secrétariat a accusé réception du document visé
   aCocher   : décision du DG pas encore vérifiée (coche post-visa) ;
               tant qu'elle ne l'est pas, le SG n'en est pas informé
   ============================================================ */

export const SITUATION_SP_DG = {
    'ACT-2026-0412': { recuSpDg: true },
    'ACT-2026-0422': { recuSpDg: false },
    'ACT-2026-0425': { aCocher: true, decideLe: '2026-09-29T09:50:00' },
};

export const TYPES_MOTIF_REJET = {
    fond: 'Sur le fond',
    forme: 'Sur la forme',
    pieces: 'Pièce manquante',
};
