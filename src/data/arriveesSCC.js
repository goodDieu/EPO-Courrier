// src/data/arriveesSCC.js

/* ============================================================
   CLASSIFICATIONS (§10.5)
   ============================================================ */

export const CLASSIFICATIONS = {
    ordinaire: {
        key: 'ordinaire',
        label: 'Ordinaire',
        shortLabel: 'Ordinaire',
        icon: 'fa-circle',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
        dot: 'bg-epo-slate-400',
    },
    urgent: {
        key: 'urgent',
        label: 'Urgent',
        shortLabel: 'Urgent',
        icon: 'fa-exclamation-circle',
        chip: 'bg-epo-red-50 text-epo-red-700',
        dot: 'bg-epo-red-500',
    },
    confidentiel: {
        key: 'confidentiel',
        label: 'Confidentiel / Réservé',
        shortLabel: 'Confidentiel',
        icon: 'fa-lock',
        chip: 'bg-epo-slate-700 text-white',
        dot: 'bg-epo-slate-700',
    },
};

/* ============================================================
   NATURES DE COURRIERS ENTRANTS (§10.1)
   ============================================================ */

export const NATURES_ENTRANTS = {
    lettre: { key: 'lettre', label: 'Lettre', icon: 'fa-envelope' },
    decision: { key: 'decision', label: 'Décision', icon: 'fa-gavel' },
    circulaire: { key: 'circulaire', label: 'Circulaire', icon: 'fa-bullhorn' },
    facture: { key: 'facture', label: 'Facture', icon: 'fa-file-invoice' },
    demande: { key: 'demande', label: 'Demande', icon: 'fa-hand-paper' },
    offre: { key: 'offre', label: 'Offre', icon: 'fa-file-signature' },
    bordereau: { key: 'bordereau', label: 'Bordereau', icon: 'fa-list' },
    convention: { key: 'convention', label: 'Convention', icon: 'fa-handshake' },
    convocation: { key: 'convocation', label: 'Convocation', icon: 'fa-calendar-check' },
    ministeriel: { key: 'ministeriel', label: 'Dossier ministériel', icon: 'fa-landmark' },
};

/* ============================================================
   ÉTATS DE COURRIER ENTRANT (§11.1)
   ============================================================ */

export const ETATS_ENTRANTS = {
    'enregistre': { label: 'Enregistré', variant: 'blue' },
    'transmis-sp-sg': { label: 'Transmis SP-SG', variant: 'purple' },
    'chez-sp-sg': { label: 'Chez SP-SG', variant: 'orange' },
    'chez-sg': { label: 'Chez SG', variant: 'orange' },
    'chez-sp-dg': { label: 'Chez SP-DG', variant: 'orange' },
    'chez-dg': { label: 'Chez DG', variant: 'orange' },
    'retour-sg': { label: 'Retour SG (imputation)', variant: 'yellow' },
    'chez-scc': { label: 'Chez SCC (dispatch)', variant: 'blue' },
    'remis-direction': { label: 'Remis direction', variant: 'green' },
    'objet-satisfait': { label: 'Objet satisfait', variant: 'green' },
    'archive': { label: 'Archivé', variant: 'gray' },
};

/* ============================================================
   SÉRIES DE NUMÉROTATION (§13.7)
   ============================================================ */

export const SERIES_NUMEROTATION = {
    ordinaire: {
        key: 'ordinaire',
        label: 'Série ordinaire (SCC)',
        prefix: '',
        prochain: '2026-0489',
        detenteur: 'SCC',
    },
    confidentiel: {
        key: 'confidentiel',
        label: 'Série confidentielle (SP-DG)',
        prefix: 'CONF',
        prochain: 'CONF-2026-0021',
        detenteur: 'SP-DG',
    },
    urgent: {
        key: 'urgent',
        label: 'Série urgente',
        prefix: 'URG',
        prochain: 'URG-2026-0034',
        detenteur: 'SCC',
    },
};

/* ============================================================
   DÉLAIS DE RÉFÉRENCE (§11.3, RG-37)
   ============================================================ */

export const DELAIS_REFERENCE = {
    // Premier délai = SCC → SP-SG (30 min)
    scc: 30,
    // Ensuite SP-SG → SG (60 min)
    spsg: 60,
    // SG + DG (1 jour)
    blocSGDG: 1440,
    // Dispatch (½ journée = 240 min)
    dispatch: 240,
};

/* ============================================================
   HELPERS
   ============================================================ */

export function computeNiveau(tempsRestantMin) {
    if (tempsRestantMin < 0) return 'depasse';
    if (tempsRestantMin < 12 * 60) return 'jourJ';
    if (tempsRestantMin < 24 * 60) return 'urgent';
    if (tempsRestantMin < 72 * 60) return 'surveiller';
    return 'ok';
}

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

export function formatDateHeure(iso) {
    if (!iso) return '-';
    return new Date(iso).toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatDate(iso) {
    if (!iso) return '-';
    return new Date(iso).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

/* ============================================================
   REGISTRE DES ARRIVÉES (mock)
   ============================================================ */

export const ARRIVEES = [
    {
        id: '2026-0488',
        serie: 'ordinaire',
        objet: 'Demande de congé - M. TRAORÉ',
        expediteur: 'DRH',
        destinataireApparent: 'Secrétariat Général',
        dateDocument: '2026-09-29T08:00:00',
        dateReception: '2026-09-29T10:45:00',
        classification: 'ordinaire',
        nature: 'demande',
        etat: 'enregistre',
        pieces: 2,
        scanne: true,
        tempsRestant: 1200,
        agentSCC: 'M. OUÉDRAOGO Karim',
        hash: 'a3f5e9c1...',
    },
    {
        id: '2026-0487',
        serie: 'ordinaire',
        objet: 'Réponse au courrier N°2026-0410',
        expediteur: 'DAF',
        destinataireApparent: 'Secrétariat Général',
        dateDocument: '2026-09-28T15:00:00',
        dateReception: '2026-09-29T10:20:00',
        classification: 'ordinaire',
        nature: 'lettre',
        etat: 'transmis-sp-sg',
        pieces: 3,
        scanne: true,
        tempsRestant: 1020,
        agentSCC: 'M. OUÉDRAOGO Karim',
        hash: 'b7d2f4a8...',
    },
    {
        id: '2026-0486',
        serie: 'ordinaire',
        objet: 'Facture fournisseur - Eau & Électricité',
        expediteur: 'SONABEL',
        destinataireApparent: 'DAF',
        dateDocument: '2026-09-25T09:00:00',
        dateReception: '2026-09-29T09:50:00',
        classification: 'ordinaire',
        nature: 'facture',
        etat: 'enregistre',
        pieces: 1,
        scanne: true,
        tempsRestant: 900,
        agentSCC: 'Mme ZONGO Aïcha',
        hash: 'c1e8a5b3...',
    },
    {
        id: '2026-0485',
        serie: 'urgent',
        objet: 'Communiqué officiel - MESRSI',
        expediteur: "Ministère de l'Enseignement Supérieur",
        destinataireApparent: 'Direction Générale',
        dateDocument: '2026-09-28T11:00:00',
        dateReception: '2026-09-29T09:15:00',
        classification: 'urgent',
        nature: 'circulaire',
        etat: 'enregistre',
        pieces: 2,
        scanne: true,
        tempsRestant: 45,
        agentSCC: 'Mme ZONGO Aïcha',
        hash: 'd9a2c7f1...',
    },
    {
        id: '2026-0484',
        serie: 'ordinaire',
        objet: 'Dossier de candidature - Stage ingénieur',
        expediteur: 'Université Joseph Ki-Zerbo',
        destinataireApparent: 'DRH',
        dateDocument: '2026-09-27T10:00:00',
        dateReception: '2026-09-29T08:30:00',
        classification: 'ordinaire',
        nature: 'demande',
        etat: 'transmis-sp-sg',
        pieces: 5,
        scanne: true,
        tempsRestant: 60,
        agentSCC: 'M. OUÉDRAOGO Karim',
        hash: 'e4b6d8a2...',
    },
    {
        id: '2026-0483',
        serie: 'ordinaire',
        objet: 'Convention de partenariat - Université de Lyon',
        expediteur: 'Ambassade de France',
        destinataireApparent: 'Direction Générale',
        dateDocument: '2026-09-26T14:00:00',
        dateReception: '2026-09-28T16:00:00',
        classification: 'confidentiel',
        nature: 'convention',
        etat: 'transmis-sp-sg',
        pieces: 4,
        scanne: true,
        tempsRestant: 240,
        agentSCC: 'M. TRAORÉ Ibrahim',
        hash: 'f8c3e1b4...',
    },
    {
        id: '2026-0482',
        serie: 'ordinaire',
        objet: 'Demande de subvention - Colloque international',
        expediteur: "Ministère de l'Enseignement Supérieur",
        destinataireApparent: 'Secrétariat Général',
        dateDocument: '2026-09-26T09:00:00',
        dateReception: '2026-09-28T14:30:00',
        classification: 'urgent',
        nature: 'demande',
        etat: 'chez-sg',
        pieces: 3,
        scanne: true,
        tempsRestant: 180,
        agentSCC: 'M. TRAORÉ Ibrahim',
        hash: 'a5b2d9c7...',
    },
    {
        id: '2026-0481',
        serie: 'ordinaire',
        objet: 'Recrutement assistant IGIT - Dossier',
        expediteur: 'DRH',
        destinataireApparent: 'Direction Générale',
        dateDocument: '2026-09-25T11:00:00',
        dateReception: '2026-09-28T11:00:00',
        classification: 'ordinaire',
        nature: 'demande',
        etat: 'chez-dg',
        pieces: 6,
        scanne: true,
        tempsRestant: 300,
        agentSCC: 'Mme ZONGO Aïcha',
        hash: 'b9e6a3f5...',
    },
    {
        id: '2026-0480',
        serie: 'ordinaire',
        objet: 'Rapport d\'activité semestriel',
        expediteur: 'DGA-AVE',
        destinataireApparent: 'Direction Générale',
        dateDocument: '2026-09-24T10:00:00',
        dateReception: '2026-09-28T09:00:00',
        classification: 'ordinaire',
        nature: 'lettre',
        etat: 'retour-sg',
        pieces: 2,
        scanne: true,
        tempsRestant: 420,
        agentSCC: 'M. OUÉDRAOGO Karim',
        hash: 'c7d1e8b2...',
    },
    {
        id: '2026-0479',
        serie: 'ordinaire',
        objet: 'Convocation réunion du conseil scientifique',
        expediteur: 'SG',
        destinataireApparent: 'DRH',
        dateDocument: '2026-09-23T09:00:00',
        dateReception: '2026-09-27T15:00:00',
        classification: 'ordinaire',
        nature: 'convocation',
        etat: 'chez-scc',
        pieces: 1,
        scanne: true,
        tempsRestant: -180,
        agentSCC: 'M. OUÉDRAOGO Karim',
        hash: 'd2a9c6f4...',
    },
    {
        id: '2026-0478',
        serie: 'ordinaire',
        objet: 'Note de service - Organisation des soutenances',
        expediteur: 'DGA-AVE',
        destinataireApparent: 'Toutes directions',
        dateDocument: '2026-09-22T08:00:00',
        dateReception: '2026-09-27T10:00:00',
        classification: 'ordinaire',
        nature: 'circulaire',
        etat: 'remis-direction',
        pieces: 1,
        scanne: true,
        tempsRestant: 600,
        agentSCC: 'Mme ZONGO Aïcha',
        hash: 'e8b5c2d9...',
    },
    {
        id: '2026-0477',
        serie: 'ordinaire',
        objet: 'Bordereau envoi Ministère - Dossiers étudiants',
        expediteur: 'DGA-RCP',
        destinataireApparent: "Ministère de l'Enseignement Supérieur",
        dateDocument: '2026-09-21T09:00:00',
        dateReception: '2026-09-26T11:00:00',
        classification: 'ordinaire',
        nature: 'bordereau',
        etat: 'objet-satisfait',
        pieces: 8,
        scanne: true,
        tempsRestant: 800,
        agentSCC: 'M. TRAORÉ Ibrahim',
        hash: 'f3c8d1b6...',
    },
    {
        id: '2026-0476',
        serie: 'ordinaire',
        objet: 'Offre de service - Maintenance informatique',
        expediteur: 'SARL InfoTech',
        destinataireApparent: 'PRMP',
        dateDocument: '2026-09-20T10:00:00',
        dateReception: '2026-09-26T09:00:00',
        classification: 'ordinaire',
        nature: 'offre',
        etat: 'archive',
        pieces: 4,
        scanne: true,
        tempsRestant: 9999,
        agentSCC: 'M. TRAORÉ Ibrahim',
        hash: 'a6d3e9c1...',
    },
];

/* ============================================================
   AGENTS SCC
   ============================================================ */

export const AGENTS_SCC = [
    { id: 'scc1', nom: 'M. OUÉDRAOGO Karim', matricule: 'EPO-2021-0305' },
    { id: 'scc2', nom: 'Mme ZONGO Aïcha', matricule: 'EPO-2022-0412' },
    { id: 'scc3', nom: 'M. TRAORÉ Ibrahim', matricule: 'EPO-2017-0034', chef: true },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_CLASSIFICATION = [
    { value: '', label: 'Toutes les classifications' },
    { value: 'ordinaire', label: 'Ordinaire' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'confidentiel', label: 'Confidentiel / Réservé' },
];

export const FILTRES_ETAT = [
    { value: '', label: 'Tous les états' },
    { value: 'enregistre', label: 'Enregistré' },
    { value: 'transmis-sp-sg', label: 'Transmis SP-SG' },
    { value: 'chez-sg', label: 'Chez SG' },
    { value: 'chez-dg', label: 'Chez DG' },
    { value: 'retour-sg', label: 'Retour SG' },
    { value: 'chez-scc', label: 'Chez SCC (dispatch)' },
    { value: 'remis-direction', label: 'Remis direction' },
    { value: 'objet-satisfait', label: 'Objet satisfait' },
    { value: 'archive', label: 'Archivé' },
];

export const FILTRES_NATURE = [
    { value: '', label: 'Toutes les natures' },
    ...Object.values(NATURES_ENTRANTS).map((n) => ({ value: n.key, label: n.label })),
];

export const FILTRES_PERIODE = [
    { value: '', label: 'Toutes les périodes' },
    { value: 'aujourdhui', label: "Aujourd'hui" },
    { value: '7j', label: '7 derniers jours' },
    { value: '30j', label: '30 derniers jours' },
    { value: 'annee', label: 'Année 2026' },
];