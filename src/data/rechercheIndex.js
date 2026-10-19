// src/data/rechercheIndex.js
// Met les courriers reçus, les courriers sortants et les actes dans une même
// forme, pour que la recherche avancée puisse les filtrer sur les mêmes critères.
import { ETATS_ENTRANTS, NATURES_ENTRANTS } from './arriveesSCC.js';
import { ETATS_DOCUMENT } from './circuit.js';
import { ETATS_ACTES } from './actes.js';

/* ============================================================
   OPTIONS DES CRITÈRES
   ============================================================ */

export const TYPES_DOCUMENT = [
    { value: '', label: 'Tous les types' },
    { value: 'entrant', label: 'Courrier entrant' },
    { value: 'sortant', label: 'Courrier sortant' },
    { value: 'interne', label: 'Courrier interne' },
    { value: 'acte', label: 'Acte administratif' },
];

export const NATURES = [
    { value: '', label: 'Toutes les natures' },
    ...Object.values(NATURES_ENTRANTS).map((n) => ({ value: n.key, label: n.label })),
    { value: 'certificat', label: 'Certificat' },
    { value: 'autorisation', label: "Autorisation d'absence" },
    { value: 'ordre-mission', label: 'Ordre de mission' },
];

export const STRUCTURES = [
    { value: '', label: 'Toutes les structures' },
    { value: 'SG', label: 'Secrétariat Général' },
    { value: 'DG', label: 'Direction Générale' },
    { value: 'SCC', label: 'Service Central du Courrier' },
    { value: 'DRH', label: 'DRH' },
    { value: 'DAF', label: 'DAF' },
    { value: 'DGA-AVE', label: 'DGA-AVE' },
    { value: 'DGA-RCP', label: 'DGA-RCP' },
];

export const LOCALISATIONS = [
    { value: '', label: 'Toutes les localisations' },
    { value: 'scc', label: 'Service Central du Courrier' },
    { value: 'sp-sg', label: 'Secrétariat du SG' },
    { value: 'sg', label: 'Chez le SG' },
    { value: 'sp-dg', label: 'Secrétariat du DG' },
    { value: 'dg', label: 'Chez le DG' },
    { value: 'direction', label: 'Directions' },
    { value: 'archives', label: 'Archives' },
];

export const CLASSIFICATIONS = [
    { key: 'ordinaire', label: 'Ordinaire' },
    { key: 'urgent', label: 'Urgent' },
    { key: 'confidentiel', label: 'Confidentiel / Réservé' },
];

export const ETATS = [
    { key: 'preparation', label: 'En préparation' },
    { key: 'enregistre', label: 'Enregistré' },
    { key: 'chez-sg', label: 'Chez SG' },
    { key: 'chez-dg', label: 'Chez DG' },
    { key: 'signe', label: 'Signé' },
    { key: 'rejete', label: 'Rejeté' },
    { key: 'clos', label: 'Remis / clos' },
    { key: 'archive', label: 'Archivé' },
];

export const LIBELLES_TYPE = {
    entrant: 'Courrier entrant',
    sortant: 'Courrier sortant',
    interne: 'Courrier interne',
    acte: 'Acte administratif',
};

/* ============================================================
   CORRESPONDANCES
   ============================================================ */

// Code d'état d'un courrier reçu (registre SCC ou localisation dans le circuit)
const ENTRANT = {
    enregistre: ['enregistre', 'scc'],
    'transmis-sp-sg': ['enregistre', 'sp-sg'],
    'chez-sp-sg': ['chez-sg', 'sp-sg'],
    'chez-sg': ['chez-sg', 'sg'],
    'retour-sg': ['chez-sg', 'sg'],
    'chez-sp-dg': ['chez-dg', 'sp-dg'],
    'chez-dg': ['chez-dg', 'dg'],
    'chez-scc': ['clos', 'scc'],
    'remis-direction': ['clos', 'direction'],
    'objet-satisfait': ['clos', 'direction'],
    archive: ['archive', 'archives'],
};

// État d'un acte ou d'un courrier sortant
const DOCUMENT = {
    brouillon: ['preparation', 'direction'],
    'soumis-shi': ['preparation', 'direction'],
    'renvoye-correction': ['preparation', 'direction'],
    'chez-sp-sg': ['chez-sg', 'sp-sg'],
    'chez-sg': ['chez-sg', 'sg'],
    'vu-bon-a-signer': ['chez-dg', 'sp-dg'],
    'chez-dg': ['chez-dg', 'dg'],
    signe: ['signe', 'scc'],
    rejete: ['rejete', 'direction'],
    diffuse: ['clos', 'direction'],
    archive: ['archive', 'archives'],
};

function natureActe(nature) {
    if (nature.startsWith('certificat') || nature === 'cessation-paiement') return 'certificat';
    if (nature.startsWith('decision')) return 'decision';
    if (nature === 'autorisation-absence') return 'autorisation';
    return nature; // bordereau, ordre-mission
}

const SIGLES_INTERNES = ['SG', 'DG', 'SCC', 'DRH', 'DAF', 'DGA-AVE', 'DGA-RCP'];
const NOMS_LONGS = { SG: 'secrétariat général', DG: 'direction générale', SCC: 'service central du courrier' };
// Personnes du circuit, rattachées à leur structure
const PERSONNES = { 'OUÉDRAOGO Salif': 'SG', 'NIKIÉMA Adama': 'DG' };

// Sigles des structures citées dans un texte (« DRH », « Secrétariat Général », « M. OUÉDRAOGO Salif »…)
function sigles(...textes) {
    const trouves = new Set();
    for (const t of textes) {
        if (!t) continue;
        const bas = t.toLowerCase();
        for (const s of SIGLES_INTERNES) {
            if (t.trim().toUpperCase() === s || bas.includes(NOMS_LONGS[s] ?? `\u0000`)) trouves.add(s);
        }
        for (const [nom, s] of Object.entries(PERSONNES)) if (t.includes(nom)) trouves.add(s);
    }
    return [...trouves];
}

// Les originaux papier sont rangés dans une boîte par semaine de réception
function boite(iso) {
    const d = new Date(iso);
    const jeudi = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate() + 3 - ((d.getDay() + 6) % 7)));
    const debut = new Date(Date.UTC(jeudi.getUTCFullYear(), 0, 4));
    const semaine = 1 + Math.round(((jeudi - debut) / 86400000 - 3 + ((debut.getUTCDay() + 6) % 7)) / 7);
    return `BOX-${jeudi.getUTCFullYear()}-${String(semaine).padStart(3, '0')}`;
}

/* ============================================================
   INDEX
   ============================================================ */

export function construireIndex({ arrivees, dossiers, sortants, actes }) {
    const enCircuit = new Map(dossiers.filter((d) => d.type === 'courrier').map((d) => [d.id, d]));

    // Le registre du SCC, complété par l'avancement dans le circuit
    const recus = arrivees.map((a) => ({ arrivee: a, dossier: enCircuit.get(a.id) }));
    for (const d of enCircuit.values()) if (!arrivees.some((a) => a.id === d.id)) recus.push({ arrivee: null, dossier: d });

    const entrants = recus.map(({ arrivee: a, dossier: d }) => {
        const code = d?.localisation ?? a.etat;
        const [etat, localisation] = ENTRANT[code] ?? ['enregistre', 'scc'];
        const expediteur = d?.expediteur ?? a.expediteur;
        const destinataire = a?.destinataireApparent ?? 'Secrétariat Général';
        const date = a?.dateReception ?? d.recuLe;
        return {
            sorte: sigles(expediteur).length ? 'interne' : 'entrant',
            id: a?.id ?? d.id,
            objet: d?.objet ?? a.objet,
            expediteur,
            destinataire,
            structures: sigles(expediteur, destinataire),
            date,
            classification: d?.classificationScc ?? a.classification,
            nature: a?.nature ?? 'lettre',
            etat,
            localisation,
            boite: boite(date),
            statutLabel: ETATS_ENTRANTS[code]?.label ?? code,
            dossier: d,
            arrivee: a,
        };
    });

    const docsSortants = sortants.map((s) => {
        const [etat, localisation] = DOCUMENT[s.etat] ?? ['preparation', 'direction'];
        return {
            sorte: 'sortant',
            id: s.id,
            objet: s.objet,
            expediteur: s.redacteur,
            destinataire: s.destinataire,
            structures: sigles(s.redacteur, s.destinataire),
            date: s.creeLe,
            classification: s.classification ?? 'ordinaire',
            nature: 'lettre',
            etat,
            localisation,
            boite: boite(s.creeLe),
            statutLabel: ETATS_DOCUMENT[s.etat]?.label ?? s.etat,
            document: s,
        };
    });

    const docsActes = actes.map((a) => {
        const [etat, localisation] = DOCUMENT[a.etat] ?? ['preparation', 'direction'];
        return {
            sorte: 'acte',
            id: a.id,
            objet: a.objet,
            expediteur: a.produitPar,
            destinataire: `${a.beneficiaireNom} (${a.beneficiaireStructure})`,
            structures: sigles(a.produitPar, a.beneficiaireStructure),
            date: a.dateCreation,
            classification: 'ordinaire',
            nature: natureActe(a.nature),
            etat,
            localisation,
            boite: boite(a.dateCreation),
            statutLabel: ETATS_ACTES[a.etat]?.label ?? a.etat,
            acte: a,
        };
    });

    return [...entrants, ...docsSortants, ...docsActes];
}

/* ============================================================
   FILTRES ET TRI
   ============================================================ */

const contient = (texte, q) => !q || (texte ?? '').toLowerCase().includes(q.trim().toLowerCase());

export function filtrer(index, f) {
    const debut = f.dateDebut ? new Date(`${f.dateDebut}T00:00:00`) : null;
    const fin = f.dateFin ? new Date(`${f.dateFin}T23:59:59`) : null;

    return index.filter(
        (r) =>
            contient([r.id, r.objet, r.expediteur, r.destinataire].join(' '), f.texte) &&
            contient(r.id, f.numero) &&
            contient(r.objet, f.objet) &&
            (!f.type || r.sorte === f.type) &&
            (!f.nature || r.nature === f.nature) &&
            contient(r.expediteur, f.expediteur) &&
            contient(r.destinataire, f.destinataire) &&
            (!f.structure || r.structures.includes(f.structure)) &&
            (!debut || new Date(r.date) >= debut) &&
            (!fin || new Date(r.date) <= fin) &&
            (f.classification.length === 0 || f.classification.includes(r.classification)) &&
            (f.etat.length === 0 || f.etat.includes(r.etat)) &&
            (!f.localisation || r.localisation === f.localisation) &&
            contient(r.boite, f.boite),
    );
}

export const TRIS = [
    { value: 'date-desc', label: 'Date (plus récent)' },
    { value: 'date-asc', label: 'Date (plus ancien)' },
    { value: 'num-desc', label: 'Numéro (décroissant)' },
    { value: 'num-asc', label: 'Numéro (croissant)' },
    { value: 'objet', label: 'Objet (A-Z)' },
];

export function trier(liste, tri) {
    const parDate = (a, b) => new Date(a.date) - new Date(b.date);
    const parNumero = (a, b) => a.id.localeCompare(b.id, 'fr', { numeric: true });
    const comparer = {
        'date-desc': (a, b) => parDate(b, a),
        'date-asc': parDate,
        'num-desc': (a, b) => parNumero(b, a),
        'num-asc': parNumero,
        objet: (a, b) => a.objet.localeCompare(b.objet, 'fr'),
    }[tri];
    return [...liste].sort(comparer);
}
