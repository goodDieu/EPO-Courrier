// src/data/transmissions.js

/* ============================================================
   MODES DE TRANSMISSION
   ============================================================ */

export const MODES = {
    liaison: {
        key: 'liaison',
        label: 'Liaison',
        icon: 'fa-truck',
        color: 'bg-epo-green-50 text-epo-green-700',
        delaiReference: 240, // 4h en minutes
    },
    retrait: {
        key: 'retrait',
        label: 'Retrait direct',
        icon: 'fa-walking',
        color: 'bg-epo-slate-100 text-epo-slate-700',
        delaiReference: 1440, // 1 jour
    },
    sp: {
        key: 'sp',
        label: 'Remise SP',
        icon: 'fa-envelope-open-text',
        color: 'bg-epo-yellow-50 text-epo-yellow-700',
        delaiReference: 60, // 1h
    },
};

/* ============================================================
   ÉTATS DE TRANSMISSION
   ============================================================ */

export const ETATS_TRANSMISSION = {
    'a-remettre': {
        key: 'a-remettre',
        label: 'À remettre',
        variant: 'gray',
        dot: 'bg-epo-slate-400',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
        order: 0,
    },
    'en-tournee': {
        key: 'en-tournee',
        label: 'En tournée',
        variant: 'blue',
        dot: 'bg-epo-yellow-500',
        chip: 'bg-epo-yellow-50 text-epo-yellow-700',
        order: 1,
    },
    'remis': {
        key: 'remis',
        label: 'Remis',
        variant: 'green',
        dot: 'bg-epo-green-500',
        chip: 'bg-epo-green-50 text-epo-green-700',
        order: 2,
    },
    'decharge': {
        key: 'decharge',
        label: 'Déchargé',
        variant: 'green',
        dot: 'bg-epo-green-600',
        chip: 'bg-epo-green-50 text-epo-green-800',
        order: 3,
    },
    'en-retard': {
        key: 'en-retard',
        label: 'En retard',
        variant: 'red',
        dot: 'bg-epo-red-500',
        chip: 'bg-epo-red-50 text-epo-red-700',
        order: -1, // prioritaire
    },
};

/* ============================================================
   AGENTS DE LIAISON
   ============================================================ */

export const AGENTS_LIAISON = [
    {
        id: 'al1',
        nom: 'SAWADOGO Bakary',
        matricule: 'EPO-2018-0087',
        telephone: '+226 70 12 34 56',
        zone: 'Zone A - SG / SP / Directions',
    },
    {
        id: 'al2',
        nom: 'OUÉDRAOGO Karim',
        matricule: 'EPO-2021-0305',
        telephone: '+226 70 98 76 54',
        zone: 'Zone B - DGA / Instituts',
    },
    {
        id: 'al3',
        nom: 'ZONGO Aïcha',
        matricule: 'EPO-2022-0412',
        telephone: '+226 74 55 22 11',
        zone: 'Zone C - DAF / DRH / PRMP',
    },
];

/* ============================================================
   TRANSMISSIONS (mock)
   ============================================================ */

export const TRANSMISSIONS = [
    /* ============================================
       TOURNÉE DU JOUR - AGENT SAWADOGO (5 remises)
       ============================================ */
    {
        id: 'TR-2026-0142',
        documentId: '2026-0452',
        documentType: 'courrier',
        documentNumero: '2026-0452',
        documentObjet: 'Demande de subvention exceptionnelle pour le colloque',
        destinataire: {
            structure: 'SG',
            personne: 'M. OUÉDRAOGO Salif',
            qualite: 'Secrétaire Général',
        },
        mode: 'liaison',
        agentId: 'al1',
        priorite: 'urgent',
        dateDepart: '2026-09-29T08:00:00',
        dateRemise: '2026-09-29T08:15:00',
        dateDecharge: '2026-09-29T08:15:00',
        tempsRestant: 240,
        etat: 'decharge',
        preuve: {
            type: 'photo',
            url: 'preuves/TR-2026-0142.jpg',
            date: '2026-09-29T08:15:00',
        },
        motifRejet: null,
    },
    {
        id: 'TR-2026-0143',
        documentId: '2026-0450',
        documentType: 'courrier',
        documentNumero: '2026-0450',
        documentObjet: "Rapport d'activité semestriel",
        destinataire: {
            structure: 'DAF',
            personne: 'Mme SANOU Mariam',
            qualite: 'Directrice des Finances',
        },
        mode: 'liaison',
        agentId: 'al1',
        priorite: 'normal',
        dateDepart: '2026-09-29T08:20:00',
        dateRemise: '2026-09-29T09:00:00',
        dateDecharge: '2026-09-29T09:00:00',
        tempsRestant: 240,
        etat: 'decharge',
        preuve: {
            type: 'signature',
            url: 'preuves/TR-2026-0143.png',
            date: '2026-09-29T09:00:00',
        },
        motifRejet: null,
    },
    {
        id: 'TR-2026-0144',
        documentId: 'ACT-2026-0412',
        documentType: 'acte',
        documentNumero: 'ACT-2026-0412',
        documentObjet: "Absence du 02/10 au 04/10 - OUÉDRAOGO Karim",
        destinataire: {
            structure: 'DRH',
            personne: 'M. COMPAORÉ Ali',
            qualite: 'Directeur RH',
        },
        mode: 'liaison',
        agentId: 'al1',
        priorite: 'normal',
        dateDepart: '2026-09-29T09:30:00',
        dateRemise: null,
        dateDecharge: null,
        tempsRestant: 120,
        etat: 'en-tournee',
        preuve: null,
        motifRejet: null,
    },
    {
        id: 'TR-2026-0145',
        documentId: '2026-0448',
        documentType: 'courrier',
        documentNumero: '2026-0448',
        documentObjet: "Recrutement d'un assistant à l'IGIT",
        destinataire: {
            structure: 'PRMP',
            personne: 'M. KONATÉ Souleymane',
            qualite: 'PRMP',
        },
        mode: 'liaison',
        agentId: 'al1',
        priorite: 'normal',
        dateDepart: '2026-09-29T10:30:00',
        dateRemise: null,
        dateDecharge: null,
        tempsRestant: 240,
        etat: 'a-remettre',
        preuve: null,
        motifRejet: null,
    },
    {
        id: 'TR-2026-0146',
        documentId: 'ACT-2026-0410',
        documentType: 'acte',
        documentNumero: 'ACT-2026-0410',
        documentObjet: 'Mission Ouagadougou → Bobo-Dioulasso',
        destinataire: {
            structure: 'DGA-AVE',
            personne: 'Pr. TANKOANO Martin',
            qualite: 'DGA-AVE',
        },
        mode: 'liaison',
        agentId: 'al1',
        priorite: 'urgent',
        dateDepart: '2026-09-29T11:15:00',
        dateRemise: null,
        dateDecharge: null,
        tempsRestant: 240,
        etat: 'a-remettre',
        preuve: null,
        motifRejet: null,
    },

    /* ============================================
       TOURNÉE DU JOUR - AGENT OUÉDRAOGO (3 remises)
       ============================================ */
    {
        id: 'TR-2026-0147',
        documentId: '2026-0445',
        documentType: 'courrier',
        documentNumero: '2026-0445',
        documentObjet: 'Convention de partenariat - Université de Lyon',
        destinataire: {
            structure: 'SP-DG',
            personne: 'Mme OUATTARA Rasmata',
            qualite: 'SP-DG',
        },
        mode: 'sp',
        agentId: 'al2',
        priorite: 'urgent',
        dateDepart: '2026-09-29T08:30:00',
        dateRemise: '2026-09-29T08:50:00',
        dateDecharge: '2026-09-29T08:50:00',
        tempsRestant: 60,
        etat: 'decharge',
        preuve: {
            type: 'photo',
            url: 'preuves/TR-2026-0147.jpg',
            date: '2026-09-29T08:50:00',
        },
        motifRejet: null,
    },
    {
        id: 'TR-2026-0148',
        documentId: 'ACT-2026-0423',
        documentType: 'acte',
        documentNumero: 'ACT-2026-0423',
        documentObjet: 'Congé administratif - 10 jours',
        destinataire: {
            structure: 'SP-DG',
            personne: 'Mme OUATTARA Rasmata',
            qualite: 'SP-DG',
        },
        mode: 'sp',
        agentId: 'al2',
        priorite: 'normal',
        dateDepart: '2026-09-29T09:00:00',
        dateRemise: null,
        dateDecharge: null,
        tempsRestant: 45,
        etat: 'en-tournee',
        preuve: null,
        motifRejet: null,
    },
    {
        id: 'TR-2026-0149',
        documentId: '2026-0421',
        documentType: 'courrier',
        documentNumero: '2026-0421',
        documentObjet: 'Note de service - Organisation des soutenances',
        destinataire: {
            structure: 'DGA-RCP',
            personne: 'Pr. NIKIÉMA Arsène',
            qualite: 'DGA-RCP',
        },
        mode: 'liaison',
        agentId: 'al2',
        priorite: 'normal',
        dateDepart: '2026-09-29T10:00:00',
        dateRemise: null,
        dateDecharge: null,
        tempsRestant: 240,
        etat: 'a-remettre',
        preuve: null,
        motifRejet: null,
    },

    /* ============================================
       TOURNÉE DU JOUR - AGENT ZONGO (4 remises)
       ============================================ */
    {
        id: 'TR-2026-0150',
        documentId: '2026-0435',
        documentType: 'courrier',
        documentNumero: '2026-0435',
        documentObjet: "Demande d'explication sur les dépenses Q3",
        destinataire: {
            structure: 'DAF',
            personne: 'Mme SANOU Mariam',
            qualite: 'Directrice des Finances',
        },
        mode: 'liaison',
        agentId: 'al3',
        priorite: 'urgent',
        dateDepart: '2026-09-29T08:00:00',
        dateRemise: '2026-09-29T08:20:00',
        dateDecharge: '2026-09-29T08:20:00',
        tempsRestant: 240,
        etat: 'decharge',
        preuve: {
            type: 'signature',
            url: 'preuves/TR-2026-0150.png',
            date: '2026-09-29T08:20:00',
        },
        motifRejet: null,
    },
    {
        id: 'TR-2026-0151',
        documentId: '2026-0432',
        documentType: 'courrier',
        documentNumero: '2026-0432',
        documentObjet: 'Attestation de prise de service - OUÉDRAOGO Karim',
        destinataire: {
            structure: 'DRH',
            personne: 'M. COMPAORÉ Ali',
            qualite: 'Directeur RH',
        },
        mode: 'liaison',
        agentId: 'al3',
        priorite: 'normal',
        dateDepart: '2026-09-29T08:45:00',
        dateRemise: null,
        dateDecharge: null,
        tempsRestant: 200,
        etat: 'en-tournee',
        preuve: null,
        motifRejet: null,
    },
    {
        id: 'TR-2026-0152',
        documentId: 'ACT-2026-0419',
        documentType: 'acte',
        documentNumero: 'ACT-2026-0419',
        documentObjet: 'Mission Ouagadougou → Koudougou',
        destinataire: {
            structure: 'DAF',
            personne: 'Mme SANOU Mariam',
            qualite: 'Directrice des Finances',
        },
        mode: 'liaison',
        agentId: 'al3',
        priorite: 'normal',
        dateDepart: '2026-09-29T09:30:00',
        dateRemise: null,
        dateDecharge: null,
        tempsRestant: 240,
        etat: 'a-remettre',
        preuve: null,
        motifRejet: null,
    },
    {
        id: 'TR-2026-0153',
        documentId: '2026-0428',
        documentType: 'courrier',
        documentNumero: '2026-0428',
        documentObjet: 'Offre de service - Maintenance informatique',
        destinataire: {
            structure: 'PRMP',
            personne: 'M. KONATÉ Souleymane',
            qualite: 'PRMP',
        },
        mode: 'retrait',
        agentId: null,
        priorite: 'normal',
        dateDepart: '2026-09-29T10:00:00',
        dateRemise: null,
        dateDecharge: null,
        tempsRestant: 1440,
        etat: 'a-remettre',
        preuve: null,
        motifRejet: null,
    },

    /* ============================================
       RETARDS ET CAS SPÉCIAUX
       ============================================ */
    {
        id: 'TR-2026-0138',
        documentId: '2026-0441',
        documentType: 'courrier',
        documentNumero: '2026-0441',
        documentObjet: 'Convocation réunion du conseil scientifique',
        destinataire: {
            structure: 'DRH',
            personne: 'M. COMPAORÉ Ali',
            qualite: 'Directeur RH',
        },
        mode: 'liaison',
        agentId: 'al1',
        priorite: 'urgent',
        dateDepart: '2026-09-28T10:00:00',
        dateRemise: null,
        dateDecharge: null,
        tempsRestant: -300, // en retard de 5h
        etat: 'en-retard',
        preuve: null,
        motifRejet: 'Destinataire absent - remise reportée',
    },
    {
        id: 'TR-2026-0136',
        documentId: 'ACT-2026-0413',
        documentType: 'acte',
        documentNumero: 'ACT-2026-0413',
        documentObjet: 'Certificat de travail - SAWADOGO Bakary',
        destinataire: {
            structure: 'SG',
            personne: 'M. OUÉDRAOGO Salif',
            qualite: 'Secrétaire Général',
        },
        mode: 'sp',
        agentId: 'al2',
        priorite: 'normal',
        dateDepart: '2026-09-28T14:00:00',
        dateRemise: null,
        dateDecharge: null,
        tempsRestant: -1200, // en retard de 20h
        etat: 'en-retard',
        preuve: null,
        motifRejet: null,
    },

    /* ============================================
       HISTORIQUE - SEMAINE PASSÉE (déchargées)
       ============================================ */
    {
        id: 'TR-2026-0120',
        documentId: '2026-0410',
        documentType: 'courrier',
        documentNumero: '2026-0410',
        documentObjet: "Programme d'échange académique 2027",
        destinataire: {
            structure: 'DCPIP',
            personne: 'Mme BOUDA Céline',
            qualite: 'Directrice DCPIP',
        },
        mode: 'liaison',
        agentId: 'al1',
        priorite: 'normal',
        dateDepart: '2026-09-25T09:00:00',
        dateRemise: '2026-09-25T10:15:00',
        dateDecharge: '2026-09-25T10:15:00',
        tempsRestant: 240,
        etat: 'decharge',
        preuve: { type: 'photo', url: 'preuves/TR-2026-0120.jpg', date: '2026-09-25T10:15:00' },
        motifRejet: null,
    },
    {
        id: 'TR-2026-0122',
        documentId: '2026-0405',
        documentType: 'courrier',
        documentNumero: '2026-0405',
        documentObjet: 'Convention de stage étudiant',
        destinataire: {
            structure: 'DRH',
            personne: 'M. COMPAORÉ Ali',
            qualite: 'Directeur RH',
        },
        mode: 'liaison',
        agentId: 'al3',
        priorite: 'normal',
        dateDepart: '2026-09-25T14:00:00',
        dateRemise: '2026-09-25T15:30:00',
        dateDecharge: '2026-09-25T15:30:00',
        tempsRestant: 240,
        etat: 'decharge',
        preuve: { type: 'signature', url: 'preuves/TR-2026-0122.png', date: '2026-09-25T15:30:00' },
        motifRejet: null,
    },
    {
        id: 'TR-2026-0124',
        documentId: 'ACT-2026-0405',
        documentType: 'acte',
        documentNumero: 'ACT-2026-0405',
        documentObjet: 'Congé administratif - KABORÉ Issa',
        destinataire: {
            structure: 'DRH',
            personne: 'M. COMPAORÉ Ali',
            qualite: 'Directeur RH',
        },
        mode: 'liaison',
        agentId: 'al2',
        priorite: 'normal',
        dateDepart: '2026-09-26T08:30:00',
        dateRemise: '2026-09-26T09:45:00',
        dateDecharge: '2026-09-26T09:45:00',
        tempsRestant: 240,
        etat: 'decharge',
        preuve: { type: 'photo', url: 'preuves/TR-2026-0124.jpg', date: '2026-09-26T09:45:00' },
        motifRejet: null,
    },
    {
        id: 'TR-2026-0126',
        documentId: '2026-0421',
        documentType: 'courrier',
        documentNumero: '2026-0421',
        documentObjet: 'Note de service - Organisation des soutenances',
        destinataire: {
            structure: 'DGA-AVE',
            personne: 'Pr. TANKOANO Martin',
            qualite: 'DGA-AVE',
        },
        mode: 'liaison',
        agentId: 'al1',
        priorite: 'normal',
        dateDepart: '2026-09-26T10:00:00',
        dateRemise: '2026-09-26T11:20:00',
        dateDecharge: '2026-09-26T11:20:00',
        tempsRestant: 240,
        etat: 'decharge',
        preuve: { type: 'photo', url: 'preuves/TR-2026-0126.jpg', date: '2026-09-26T11:20:00' },
        motifRejet: null,
    },
];

/* ============================================================
   HELPERS
   ============================================================ */

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

export function formatHeure(iso) {
    if (!iso) return '-';
    return new Date(iso).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatDateHeure(iso) {
    if (!iso) return '-';
    return new Date(iso).toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function computeEtatTransmission(tr) {
    if (tr.etat === 'decharge' || tr.etat === 'remis') return tr.etat;
    if (tr.tempsRestant < 0) return 'en-retard';
    return tr.etat;
}

/**
 * Regroupe les transmissions par agent + jour → forme les tournées.
 */
export function buildTournees(transmissions) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tournees = {};

    transmissions.forEach((tr) => {
        if (!tr.agentId) return; // retrait direct = pas de tournée
        const date = new Date(tr.dateDepart);
        date.setHours(0, 0, 0, 0);
        if (date.getTime() !== today.getTime()) return; // uniquement aujourd'hui

        const key = `${tr.agentId}-${date.toISOString().slice(0, 10)}`;
        if (!tournees[key]) {
            const agent = AGENTS_LIAISON.find((a) => a.id === tr.agentId);
            tournees[key] = {
                id: key,
                agentId: tr.agentId,
                agent,
                date,
                remises: [],
            };
        }
        tournees[key].remises.push(tr);
    });

    // Tri chronologique
    Object.values(tournees).forEach((t) => {
        t.remises.sort((a, b) => new Date(a.dateDepart) - new Date(b.dateDepart));
    });

    return Object.values(tournees);
}

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_ETAT = [
    { value: '', label: 'Tous les états' },
    { value: 'a-remettre', label: 'À remettre' },
    { value: 'en-tournee', label: 'En tournée' },
    { value: 'remis', label: 'Remis' },
    { value: 'decharge', label: 'Déchargé' },
    { value: 'en-retard', label: 'En retard' },
];

export const FILTRES_MODE = [
    { value: '', label: 'Tous les modes' },
    { value: 'liaison', label: 'Liaison' },
    { value: 'retrait', label: 'Retrait direct' },
    { value: 'sp', label: 'Remise SP' },
];

export const FILTRES_AGENT = [
    { value: '', label: 'Tous les agents' },
    ...AGENTS_LIAISON.map((a) => ({ value: a.id, label: a.nom })),
];