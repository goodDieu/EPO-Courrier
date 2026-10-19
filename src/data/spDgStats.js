// src/data/spDgStats.js
// Ce qui passe par le secrétariat du DG, sous une forme commune :
// courriers reçus (pour décision du DG) et documents à signer (actes, courriers sortants).
import { enRetard } from './spSgStats.js';
import { NATURES_ACTES } from './actes.js';

export function normaliser(sorte, x) {
    if (sorte === 'courrier') {
        return {
            sorte,
            id: x.id,
            objet: x.objet,
            de: x.expediteur,
            quoi: 'Courrier, pour décision',
            classification: x.classificationScc || 'ordinaire',
            echeance: x.echeanceDg || null,
            recu: !!x.recuSpDg,
            source: x,
        };
    }
    if (sorte === 'acte') {
        return {
            sorte,
            id: x.id,
            objet: `${x.objet} - ${x.beneficiaireNom}`,
            de: `${x.produitPar}, visé par le SG`,
            quoi: `Acte à signer · ${NATURES_ACTES[x.nature]?.shortLabel || ''}`,
            classification: 'ordinaire',
            echeance: x.echeance,
            recu: !!x.recuSpDg,
            source: x,
        };
    }
    if (sorte === 'validation') {
        return {
            sorte,
            id: x.id,
            objet: x.objet,
            de: x.expediteur,
            quoi: 'Document à valider',
            classification: x.priorite === 'urgent' ? 'urgent' : 'ordinaire',
            echeance: x.echeance,
            recu: true,
            source: x,
        };
    }
    return {
        sorte,
        id: x.id,
        objet: x.objet,
        de: `${x.redacteur}, visé par le SG`,
        quoi: 'Courrier à signer',
        classification: x.classification,
        echeance: x.echeance,
        recu: !!x.recuSpDg,
        source: x,
    };
}

/** Tout ce qui est arrivé au secrétariat du DG et n'a pas encore été introduit. */
export function arrivesSpDg({ dossiers, actes, sortants }) {
    return [
        ...dossiers.filter((d) => d.localisation === 'chez-sp-dg').map((d) => normaliser('courrier', d)),
        ...actes.filter((a) => a.etat === 'vu-bon-a-signer').map((a) => normaliser('acte', a)),
        ...sortants.filter((d) => d.etat === 'vu-bon-a-signer').map((d) => normaliser('sortant', d)),
    ];
}

/** Chez le DG, décision pas encore prise. */
export function chezDg({ dossiers, actes, sortants }) {
    return [
        ...dossiers.filter((d) => d.localisation === 'chez-dg' && !d.aCocher).map((d) => normaliser('courrier', d)),
        ...actes.filter((a) => a.etat === 'chez-dg').map((a) => normaliser('acte', a)),
        ...sortants.filter((d) => d.etat === 'chez-dg').map((d) => normaliser('sortant', d)),
    ];
}

/** Décisions du DG à vérifier et faire suivre (coche post-visa). */
export function aCocher({ dossiers, actes, sortants }) {
    return [
        ...dossiers.filter((d) => d.aCocher).map((d) => normaliser('courrier', d)),
        ...actes.filter((a) => a.aCocher).map((a) => normaliser('acte', a)),
        ...sortants.filter((d) => d.aCocher).map((d) => normaliser('sortant', d)),
    ].sort((a, b) => new Date(a.source.decideLe) - new Date(b.source.decideLe));
}

export function statsSpDg(donnees) {
    const arrives = arrivesSpDg(donnees);
    const introduire = arrives.filter((x) => x.recu);
    return {
        aReceptionner: arrives.filter((x) => !x.recu).length,
        aIntroduire: introduire.length,
        aIntroduireEnRetard: introduire.filter((x) => enRetard(x.echeance)).length,
        chezDg: chezDg(donnees).length,
        aCocher: aCocher(donnees).length,
    };
}
