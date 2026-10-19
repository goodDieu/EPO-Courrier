// src/data/sgStats.js
// Indicateurs du Secrétaire Général, communs au tableau de bord, aux pages et
// aux compteurs du menu.
import { enRetard } from './spSgStats.js';

const AU_DG = ['vu-bon-a-signer', 'chez-dg'];

/** Courriers introduits par le secrétariat, sur lesquels le SG n'a pas encore décidé. */
export const aExaminer = (dossiers) => dossiers.filter((d) => d.localisation === 'chez-sg' && !d.decisionSg && !d.bloque);

/** Courriers revenus du DG, à imputer. */
export const aImputer = (dossiers) => dossiers.filter((d) => d.localisation === 'retour-sg' && !d.decisionSg);

/** Décision prise, le secrétariat ne l'a pas encore exécutée. */
export const decidesEnAttente = (dossiers) =>
    dossiers.filter((d) => d.decisionSg && (d.localisation === 'chez-sg' || d.localisation === 'retour-sg'));

export const documentsAViser = (docs) => docs.filter((d) => d.etat === 'chez-sg');
export const documentsAuDg = (docs) => docs.filter((d) => AU_DG.includes(d.etat));

/** Rejets du DG pas encore repris dans une nouvelle version. */
export const rejetsAReprendre = (docs) => docs.filter((d) => d.etat === 'rejete' && !d.remplacePar && !d.aCocher);

export function statsSg({ dossiers, actes, sortants }) {
    const examiner = aExaminer(dossiers);
    const imputer = aImputer(dossiers);
    const aViser = [...documentsAViser(actes), ...documentsAViser(sortants)];
    return {
        aExaminer: examiner.length,
        aExaminerEnRetard: examiner.filter((d) => enRetard(d.echeanceSg)).length,
        aImputer: imputer.length,
        enAttenteSecretariat: decidesEnAttente(dossiers).length,
        chezDg: dossiers.filter((d) => d.localisation === 'chez-dg' || d.localisation === 'chez-sp-dg').length,
        actesAViser: documentsAViser(actes).length,
        sortantsAViser: documentsAViser(sortants).length,
        aViser: aViser.length,
        aViserEnRetard: aViser.filter((d) => enRetard(d.echeance)).length,
        enRedaction: sortants.filter((d) => d.etat === 'brouillon').length,
        documentsAuDg: documentsAuDg(actes).length + documentsAuDg(sortants).length,
        rejets: rejetsAReprendre(actes).length + rejetsAReprendre(sortants).length,
    };
}
