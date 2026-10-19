// src/data/spSgStats.js
// Indicateurs du secrétariat du SG, communs au tableau de bord, aux pages et
// aux compteurs du menu.
import { DEMO_NOW, isSameDay } from './demoClock.js';
import { QUADRANTS } from './circuit.js';

export const enRetard = (iso) => !!iso && new Date(iso) < DEMO_NOW;

/** Courriers envoyés par le SCC et pas encore réceptionnés. */
export const aReceptionner = (arrivees) => arrivees.filter((a) => a.etat === 'transmis-sp-sg');

export const aTrier = (dossiers) => dossiers.filter((d) => d.localisation === 'chez-sp-sg' && d.etapeSpSg === 'a-trier');

/** Dossiers triés à introduire, du plus prioritaire au moins prioritaire. */
export const aIntroduire = (dossiers) =>
    dossiers
        .filter((d) => d.localisation === 'chez-sp-sg' && d.etapeSpSg === 'a-introduire')
        .sort((a, b) => QUADRANTS[a.quadrant].ordre - QUADRANTS[b.quadrant].ordre || new Date(a.echeance) - new Date(b.echeance));

export const instructionsOuvertes = (instructions) => instructions.filter((i) => i.statut !== 'traite');

export function statsSpSg({ arrivees, dossiers, instructions }) {
    const recevoir = aReceptionner(arrivees);
    const introduire = aIntroduire(dossiers);
    const ouvertes = instructionsOuvertes(instructions);
    return {
        aReceptionner: recevoir.length,
        aReceptionnerUrgents: recevoir.filter((a) => a.classification === 'urgent').length,
        aTrier: aTrier(dossiers).length,
        aIntroduire: introduire.length,
        aIntroduireEnRetard: introduire.filter((d) => enRetard(d.echeance)).length,
        instructions: ouvertes.length,
        instructionsEnRetard: ouvertes.filter((i) => enRetard(i.echeance)).length,
        chezSg: dossiers.filter((d) => d.localisation === 'chez-sg').length,
        bloques: dossiers.filter((d) => d.bloque).length,
        introduitsAujourdhui: dossiers.filter((d) => isSameDay(d.introduitLe)).length,
    };
}
