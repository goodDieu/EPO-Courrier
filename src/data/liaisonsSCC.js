// src/data/liaisonsSCC.js

/* ============================================================
   STATUTS D'AGENT
   ============================================================ */

export const STATUTS_AGENT = {
    disponible: {
        key: 'disponible',
        label: 'Disponible',
        icon: 'fa-check-circle',
        dot: 'bg-epo-green-500',
        chip: 'bg-epo-green-50 text-epo-green-700',
    },
    'en-tournee': {
        key: 'en-tournee',
        label: 'En tournée',
        icon: 'fa-truck',
        dot: 'bg-epo-slate-500',
        chip: 'bg-epo-slate-100 text-epo-slate-700',
    },
    indisponible: {
        key: 'indisponible',
        label: 'Indisponible',
        icon: 'fa-pause-circle',
        dot: 'bg-epo-red-500',
        chip: 'bg-epo-red-50 text-epo-red-700',
    },
};

/* ============================================================
   ZONES
   ============================================================ */

export const ZONES = {
    A: { key: 'A', label: 'Zone A', description: 'SG / SP / Directions' },
    B: { key: 'B', label: 'Zone B', description: 'DGA / Instituts' },
    C: { key: 'C', label: 'Zone C', description: 'DAF / DRH / PRMP' },
};

/* ============================================================
   HELPERS
   ============================================================ */

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
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatDuree(min) {
    const abs = Math.abs(min);
    if (abs < 60) return `${abs}min`;
    const h = Math.floor(abs / 60);
    const m = abs % 60;
    if (h < 24) return m > 0 ? `${h}h ${m}min` : `${h}h`;
    return `${Math.floor(h / 24)}j ${h % 24}h`;
}

/* ============================================================
   AGENTS AVEC TOURNÉE
   ============================================================ */

export const AGENTS_LIAISON = [
    {
        id: 'al1',
        nom: 'M. SAWADOGO Bakary',
        matricule: 'EPO-2018-0087',
        telephone: '+226 70 12 34 56',
        zone: 'A',
        statut: 'en-tournee',
        dateDepart: '2026-09-29T08:00:00',
        remises: [
            {
                id: 'TR-2026-0142',
                documentNumero: '2026-0452',
                documentObjet: 'Demande de subvention exceptionnelle',
                destinataire: { structure: 'SG', personne: 'M. OUÉDRAOGO Salif' },
                priorite: 'urgent',
                heurePrevue: '2026-09-29T08:15:00',
                heureRemise: '2026-09-29T08:15:00',
                statut: 'remis',
                preuve: { type: 'photo', date: '2026-09-29T08:15:00' },
            },
            {
                id: 'TR-2026-0143',
                documentNumero: '2026-0450',
                documentObjet: "Rapport d'activité semestriel",
                destinataire: { structure: 'DAF', personne: 'Mme SANOU Mariam' },
                priorite: 'normal',
                heurePrevue: '2026-09-29T08:30:00',
                heureRemise: '2026-09-29T09:00:00',
                statut: 'remis',
                preuve: { type: 'signature', date: '2026-09-29T09:00:00' },
            },
            {
                id: 'TR-2026-0144',
                documentNumero: 'ACT-2026-0412',
                documentObjet: 'Absence du 02/10 au 04/10 - OUÉDRAOGO Karim',
                destinataire: { structure: 'DRH', personne: 'M. COMPAORÉ Ali' },
                priorite: 'normal',
                heurePrevue: '2026-09-29T09:30:00',
                heureRemise: null,
                statut: 'en-cours',
                preuve: null,
            },
            {
                id: 'TR-2026-0145',
                documentNumero: '2026-0448',
                documentObjet: "Recrutement d'un assistant à l'IGIT",
                destinataire: { structure: 'PRMP', personne: 'M. KONATÉ Souleymane' },
                priorite: 'normal',
                heurePrevue: '2026-09-29T10:30:00',
                heureRemise: null,
                statut: 'a-venir',
                preuve: null,
            },
            {
                id: 'TR-2026-0146',
                documentNumero: 'ACT-2026-0410',
                documentObjet: 'Mission Ouagadougou → Bobo-Dioulasso',
                destinataire: { structure: 'DGA-AVE', personne: 'Pr. TANKOANO Martin' },
                priorite: 'urgent',
                heurePrevue: '2026-09-29T11:15:00',
                heureRemise: null,
                statut: 'a-venir',
                preuve: null,
            },
        ],
    },
    {
        id: 'al2',
        nom: 'M. OUÉDRAOGO Karim',
        matricule: 'EPO-2021-0305',
        telephone: '+226 70 98 76 54',
        zone: 'B',
        statut: 'en-tournee',
        dateDepart: '2026-09-29T08:30:00',
        remises: [
            {
                id: 'TR-2026-0147',
                documentNumero: '2026-0445',
                documentObjet: 'Convention de partenariat - Université de Lyon',
                destinataire: { structure: 'SP-DG', personne: 'Mme OUATTARA Rasmata' },
                priorite: 'urgent',
                heurePrevue: '2026-09-29T08:45:00',
                heureRemise: '2026-09-29T08:50:00',
                statut: 'remis',
                preuve: { type: 'photo', date: '2026-09-29T08:50:00' },
            },
            {
                id: 'TR-2026-0148',
                documentNumero: 'ACT-2026-0423',
                documentObjet: 'Congé administratif - 10 jours',
                destinataire: { structure: 'SP-DG', personne: 'Mme OUATTARA Rasmata' },
                priorite: 'normal',
                heurePrevue: '2026-09-29T09:30:00',
                heureRemise: null,
                statut: 'en-cours',
                preuve: null,
            },
            {
                id: 'TR-2026-0149',
                documentNumero: '2026-0421',
                documentObjet: 'Note de service - Organisation des soutenances',
                destinataire: { structure: 'DGA-RCP', personne: 'Pr. NIKIÉMA Arsène' },
                priorite: 'normal',
                heurePrevue: '2026-09-29T10:00:00',
                heureRemise: null,
                statut: 'a-venir',
                preuve: null,
            },
        ],
    },
    {
        id: 'al3',
        nom: 'Mme ZONGO Aïcha',
        matricule: 'EPO-2022-0412',
        telephone: '+226 74 55 22 11',
        zone: 'C',
        statut: 'indisponible',
        indisponibleMotif: 'En tournée jusqu\'à 14h',
        dateDepart: null,
        remises: [
            {
                id: 'TR-2026-0150',
                documentNumero: '2026-0435',
                documentObjet: "Demande d'explication sur les dépenses Q3",
                destinataire: { structure: 'DAF', personne: 'Mme SANOU Mariam' },
                priorite: 'urgent',
                heurePrevue: '2026-09-29T08:15:00',
                heureRemise: '2026-09-29T08:20:00',
                statut: 'remis',
                preuve: { type: 'signature', date: '2026-09-29T08:20:00' },
            },
            {
                id: 'TR-2026-0151',
                documentNumero: '2026-0432',
                documentObjet: 'Attestation de prise de service - OUÉDRAOGO Karim',
                destinataire: { structure: 'DRH', personne: 'M. COMPAORÉ Ali' },
                priorite: 'normal',
                heurePrevue: '2026-09-29T09:00:00',
                heureRemise: null,
                statut: 'en-cours',
                preuve: null,
            },
            {
                id: 'TR-2026-0152',
                documentNumero: 'ACT-2026-0419',
                documentObjet: 'Mission Ouagadougou → Koudougou',
                destinataire: { structure: 'DAF', personne: 'Mme SANOU Mariam' },
                priorite: 'normal',
                heurePrevue: '2026-09-29T09:45:00',
                heureRemise: null,
                statut: 'a-venir',
                preuve: null,
            },
            {
                id: 'TR-2026-0153',
                documentNumero: '2026-0428',
                documentObjet: 'Offre de service - Maintenance informatique',
                destinataire: { structure: 'PRMP', personne: 'M. KONATÉ Souleymane' },
                priorite: 'normal',
                heurePrevue: '2026-09-29T10:00:00',
                heureRemise: null,
                statut: 'a-venir',
                preuve: null,
            },
        ],
    },
];

/* ============================================================
   FILTRES
   ============================================================ */

export const FILTRES_STATUT = [
    { value: '', label: 'Tous les statuts' },
    { value: 'disponible', label: 'Disponible' },
    { value: 'en-tournee', label: 'En tournée' },
    { value: 'indisponible', label: 'Indisponible' },
];

export const FILTRES_ZONE = [
    { value: '', label: 'Toutes les zones' },
    { value: 'A', label: 'Zone A - SG / SP / Directions' },
    { value: 'B', label: 'Zone B - DGA / Instituts' },
    { value: 'C', label: 'Zone C - DAF / DRH / PRMP' },
];