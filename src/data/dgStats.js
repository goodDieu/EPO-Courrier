// src/data/dgStats.js
// Ce que le Directeur Général a sur son bureau.
import { normaliser } from './spDgStats.js';
import { enRetard } from './spSgStats.js';
import { DEMO_NOW, isSameDay } from './demoClock.js';

const parDelai = (a, b) => new Date(a.echeance || '2100-01-01') - new Date(b.echeance || '2100-01-01');

/** Parapheur : actes et courriers à signer. */
export const aSigner = ({ actes, sortants }) =>
    [...actes.filter((a) => a.etat === 'chez-dg').map((a) => normaliser('acte', a)), ...sortants.filter((d) => d.etat === 'chez-dg').map((d) => normaliser('sortant', d))].sort(parDelai);

/** Pour décision : courriers reçus (avis du DG) et documents à valider. */
export const pourDecision = ({ dossiers, validations }) =>
    [
        ...dossiers.filter((d) => d.localisation === 'chez-dg' && !d.aCocher).map((d) => normaliser('courrier', d)),
        ...validations.filter((v) => v.etat === 'en-attente-validation').map((v) => normaliser('validation', v)),
    ].sort(parDelai);

export const signes = ({ actes, sortants }) =>
    [...actes.filter((a) => ['signe', 'diffuse', 'archive'].includes(a.etat)).map((a) => normaliser('acte', a)), ...sortants.filter((d) => d.etat === 'signe').map((d) => normaliser('sortant', d))].sort(
        (a, b) => new Date(b.source.dateSignature || b.source.signeLe) - new Date(a.source.dateSignature || a.source.signeLe)
    );

export const rejetes = ({ actes, sortants, validations }) =>
    [
        ...actes.filter((a) => a.etat === 'rejete').map((a) => normaliser('acte', a)),
        ...sortants.filter((d) => d.etat === 'rejete').map((d) => normaliser('sortant', d)),
        ...validations.filter((v) => v.etat === 'refuse').map((v) => normaliser('validation', v)),
    ];

export function statsDg(donnees) {
    const signer = aSigner(donnees);
    const decider = pourDecision(donnees);
    const enCours = [...signer, ...decider];
    return {
        aSigner: signer.length,
        aSignerEnRetard: signer.filter((x) => enRetard(x.echeance)).length,
        pourDecision: decider.length,
        pourDecisionUrgents: decider.filter((x) => x.classification === 'urgent').length,
        enRetard: enCours.filter((x) => enRetard(x.echeance)).length,
        aujourdhui: enCours.filter((x) => x.echeance && !enRetard(x.echeance) && isSameDay(x.echeance, DEMO_NOW)).length,
        signesAujourdhui: signes(donnees).filter((x) => isSameDay(x.source.dateSignature || x.source.signeLe)).length,
        rejetes: rejetes(donnees).length,
    };
}
