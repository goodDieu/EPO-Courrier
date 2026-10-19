// src/data/CircuitStore.jsx
// Dossiers en circulation après le Service Courrier, partagés entre les
// espaces (secrétariat du SG, SG, secrétariat du DG, DG). Quand un courrier
// change de main, son état est aussi mis à jour dans le registre du SCC ;
// quand un acte avance, il avance aussi dans le registre des actes.
import { useMemo, useState } from 'react';
import { CircuitContext } from './circuitContext.js';
import { useScc } from './sccContext.js';
import { DOSSIERS_CIRCUIT, INSTRUCTIONS_SG, SORTANTS, QUADRANTS, DELAI_INTRODUCTION, LOCALISATIONS, RESPONSABLES, SITUATION_SP_DG } from './circuit.js';
import { ACTES } from './actes.js';
import { DOCUMENTS_A_VALIDER } from './aValiderDG.js';
import { DEMO_NOW } from './demoClock.js';

const SP_SG = 'Mme KABORÉ Fatimata';
const SG = 'M. OUÉDRAOGO Salif';
const SP_DG = 'Mme OUATTARA Rasmata';
const DG = 'Pr. NIKIÉMA Adama';
const majParId = (list, id, fn) => list.map((x) => (x.id === id ? fn(x) : x));

// Un acte qui circule avec les courriers change d'état dans le registre des actes
const ETAT_ACTE_PAR_LOCALISATION = { 'chez-sg': 'chez-sg', 'chez-sp-dg': 'vu-bon-a-signer', 'chez-dg': 'chez-dg' };

export function CircuitProvider({ children }) {
    const { modifierArrivee, ajouterADispatcher, ajouterDepart } = useScc();
    const [dossiers, setDossiers] = useState(DOSSIERS_CIRCUIT);
    const [instructions, setInstructions] = useState(INSTRUCTIONS_SG);
    // etatInitial sert à reconstituer l'historique des actes de démonstration
    const [actes, setActes] = useState(() => ACTES.map((a) => ({ ...a, etatInitial: a.etat, ...SITUATION_SP_DG[a.id] })));
    const [sortants, setSortants] = useState(SORTANTS);
    // Documents soumis au DG pour validation (notes, rapports, arbitrages)
    const [validations, setValidations] = useState(() =>
        DOCUMENTS_A_VALIDER.map((v) => ({
            ...v,
            objet: v.objet.replace(/ -(?=\S)/g, ' - '),
            echeance: new Date(DEMO_NOW.getTime() + v.tempsRestantMin * 60000).toISOString(),
        }))
    );

    const actions = useMemo(() => {
        const now = () => DEMO_NOW.toISOString();
        const enPlus = (min) => new Date(DEMO_NOW.getTime() + min * 60000).toISOString();
        const trace = (d, action, par = SP_SG) => [...(d.historique || []), { date: now(), action, par }];

        // Déplace un dossier ; un courrier suit aussi dans le registre du SCC
        const deplacer = (dossier, localisation, action, champs = {}, par = SP_SG) => {
            setDossiers((l) =>
                majParId(l, dossier.id, (d) => ({ ...d, ...champs, localisation, historique: trace(d, action, par) }))
            );
            if (dossier.type === 'courrier') modifierArrivee(dossier.id, { etat: localisation });
            if (dossier.type === 'acte' && ETAT_ACTE_PAR_LOCALISATION[localisation]) {
                setActes((l) => majParId(l, dossier.id, (a) => ({ ...a, etat: ETAT_ACTE_PAR_LOCALISATION[localisation], historique: trace(a, action, par) })));
            }
        };

        const ajouterInstruction = (instruction) =>
            setInstructions((l) => [{ id: `INST-2026-${String(146 + l.length).padStart(4, '0')}`, emiseLe: now(), statut: 'a-traiter', ...instruction }, ...l]);

        // Documents à signer : actes et courriers sortants suivent le même parcours
        const majDocument = (setter) => (id, champs, action, par = SG) =>
            setter((l) => majParId(l, id, (d) => ({ ...d, ...champs, historique: trace(d, action, par) })));
        const majActe = majDocument(setActes);
        const majSortant = majDocument(setSortants);

        return {
            /* ---------- Secrétariat du SG ---------- */

            // Accuse réception d'un courrier envoyé par le SCC
            receptionner: (arrivee, { remarque }) => {
                setDossiers((l) => [
                    {
                        id: arrivee.id,
                        type: 'courrier',
                        objet: arrivee.objet,
                        expediteur: arrivee.expediteur,
                        classificationScc: arrivee.classification,
                        pieces: arrivee.pieces,
                        localisation: 'chez-sp-sg',
                        etapeSpSg: 'a-trier',
                        recuLe: now(),
                        remarqueReception: remarque || null,
                        historique: [
                            { date: arrivee.dateReception, action: 'Enregistré au Service Courrier', par: arrivee.agentSCC },
                            { date: now(), action: remarque ? `Reçu au secrétariat du SG (${remarque})` : 'Reçu au secrétariat du SG', par: SP_SG },
                        ],
                    },
                    ...l.filter((d) => d.id !== arrivee.id),
                ]);
                modifierArrivee(arrivee.id, { etat: 'chez-sp-sg' });
            },

            classer: (dossier, quadrant, motif) =>
                setDossiers((l) =>
                    majParId(l, dossier.id, (d) => ({
                        ...d,
                        quadrant,
                        etapeSpSg: 'a-introduire',
                        trieLe: now(),
                        echeance: enPlus(DELAI_INTRODUCTION[quadrant]),
                        historique: trace(d, `Classé « ${QUADRANTS[quadrant].label} »${motif ? ` : ${motif}` : ''}`),
                    }))
                ),

            introduireAuSg: (dossier, commentaire) =>
                deplacer(dossier, 'chez-sg', commentaire ? `Introduit au SG (${commentaire})` : 'Introduit au SG', {
                    etapeSpSg: null,
                    introduitLe: now(),
                    echeanceSg: enPlus(QUADRANTS[dossier.quadrant]?.ordre === 0 ? 120 : 480),
                }),

            executerInstruction: (instruction, dossier) => {
                setInstructions((l) => majParId(l, instruction.id, (i) => ({ ...i, statut: 'traite', traiteLe: now() })));
                if (!instruction.suite || !dossier) return;
                deplacer(dossier, instruction.suite, `${LOCALISATIONS[instruction.suite].label} (instruction du SG exécutée)`);
                // Une imputation part au Service Courrier, qui la remet à la structure
                if (instruction.suite === 'chez-scc' && dossier.imputations?.length) {
                    const structure = dossier.imputations[0];
                    ajouterADispatcher({
                        dossier,
                        structure,
                        responsable: RESPONSABLES[structure] || { personne: `Secrétariat ${structure}`, qualite: structure },
                        imputePar: `${SG} (SG)`,
                    });
                }
            },

            /* ---------- Secrétaire Général ---------- */

            // Fiche d'accompagnement : le SG décide de la suite à donner
            deciderSg: (dossier, { decision, imputations = [], traitements = [], observations = '' }) => {
                const obs = observations ? ` ${observations}` : '';
                if (decision === 'classer') {
                    deplacer(dossier, 'objet-satisfait', `Classé par le SG, rien à signaler${obs ? ` :${obs}` : ''}`, { decisionSg: decision }, SG);
                    return;
                }
                const versDg = decision === 'transmettre-dg';
                setDossiers((l) =>
                    majParId(l, dossier.id, (d) => ({
                        ...d,
                        decisionSg: decision,
                        imputations,
                        traitements,
                        historique: trace(
                            d,
                            versDg ? 'Examiné par le SG : à transmettre au DG' : `Imputé par le SG à ${imputations.join(', ')}`,
                            SG
                        ),
                    }))
                );
                ajouterInstruction(
                    versDg
                        ? {
                              dossierId: dossier.id,
                              type: 'instruction',
                              contenu: `Transmettre au secrétariat du DG pour décision.${obs}`,
                              echeance: enPlus(60),
                              suite: 'chez-sp-dg',
                              actionLabel: 'Transmettre au SP-DG',
                          }
                        : {
                              dossierId: dossier.id,
                              type: 'imputation',
                              contenu: `Imputer à ${imputations.join(', ')}${traitements.length ? ` · ${traitements.join(', ').toLowerCase()}` : ''}.${obs}`,
                              echeance: enPlus(120),
                              suite: 'chez-scc',
                              actionLabel: 'Remettre au Service Courrier',
                          }
                );
            },

            // Visa du SG : le document part au secrétariat du DG pour signature
            viserActe: (acte, observation) =>
                majActe(acte.id, { etat: 'vu-bon-a-signer', observationSg: observation || null }, 'Vu bon à signer, envoyé au secrétariat du DG'),
            renvoyerActe: (acte, motif) =>
                majActe(acte.id, { etat: 'renvoye-correction', motifRejet: motif }, `Renvoyé pour correction : ${motif}`),
            ajouterActe: (acte) =>
                setActes((l) => [{ ...acte, dateCreation: now(), historique: [{ date: now(), action: 'Acte rédigé et visé par le SG', par: SG }] }, ...l]),

            viserSortant: (sortant, observation) =>
                majSortant(sortant.id, { etat: 'vu-bon-a-signer', observationSg: observation || null }, 'Vu bon à signer, envoyé au secrétariat du DG'),
            renvoyerSortant: (sortant, motif) =>
                majSortant(sortant.id, { etat: 'renvoye-correction', motifRejet: motif }, `Renvoyé pour correction : ${motif}`),
            enregistrerSortant: (sortant, champs) => majSortant(sortant.id, champs, `Version ${champs.version ?? sortant.version} enregistrée`),
            // Le SG rédige lui-même : à l'envoi, son visa est déjà donné
            envoyerSortantAuDg: (sortant, champs = {}) =>
                majSortant(sortant.id, { ...champs, etat: 'vu-bon-a-signer' }, 'Rédigé et visé par le SG, envoyé au secrétariat du DG'),
            /* ---------- Secrétariat du DG ---------- */
            // sorte : 'courrier' (courrier reçu, pour décision), 'acte' ou 'sortant' (à signer)

            receptionnerSpDg: (sorte, item) => {
                const champs = { recuSpDg: true, recuSpDgLe: now() };
                if (sorte === 'courrier') setDossiers((l) => majParId(l, item.id, (d) => ({ ...d, ...champs, historique: trace(d, 'Reçu au secrétariat du DG', SP_DG) })));
                else (sorte === 'acte' ? majActe : majSortant)(item.id, champs, 'Reçu au secrétariat du DG', SP_DG);
            },

            introduireAuDg: (sorte, item) => {
                if (sorte === 'courrier') deplacer(item, 'chez-dg', 'Introduit au DG', { introduitDgLe: now() }, SP_DG);
                else (sorte === 'acte' ? majActe : majSortant)(item.id, { etat: 'chez-dg', introduitDgLe: now() }, 'Introduit au DG pour signature', SP_DG);
            },

            /* ---------- Directeur Général ---------- */

            signer: (sorte, doc, { delegation = false } = {}) => {
                const champs = { etat: 'signe', aCocher: true, decideLe: now(), signature: delegation ? 'sg-delegation' : 'dg' };
                if (sorte === 'acte') majActe(doc.id, { ...champs, dateSignature: now() }, 'Signé par le DG', DG);
                else majSortant(doc.id, { ...champs, signeLe: now(), signePar: 'Le Directeur Général' }, 'Signé par le DG', DG);
            },

            rejeter: (sorte, doc, { motif, type }) =>
                (sorte === 'acte' ? majActe : majSortant)(
                    doc.id,
                    { etat: 'rejete', aCocher: true, decideLe: now(), motifRejet: motif, typeMotif: type, signature: 'rejete' },
                    `Rejeté par le DG : ${motif}`,
                    DG
                ),

            // Décision du DG sur un courrier reçu : avis, puis retour au SG
            deciderDg: (dossier, avis) =>
                setDossiers((l) =>
                    majParId(l, dossier.id, (d) => ({ ...d, avisDg: avis, aCocher: true, decideLe: now(), historique: trace(d, `Avis du DG : ${avis}`, DG) }))
                ),

            validerDocument: (doc, { valide, motif }) =>
                setValidations((l) =>
                    majParId(l, doc.id, (v) => ({
                        ...v,
                        etat: valide ? 'valide' : 'refuse',
                        motifRefus: valide ? null : motif,
                        observationDg: valide ? motif || null : null,
                        decideLe: now(),
                    }))
                ),

            // Coche post-visa : le secrétariat vérifie la décision du DG et la fait suivre
            cocherPostVisa: (sorte, item) => {
                if (sorte === 'courrier') {
                    deplacer(item, 'retour-sg', 'Décision du DG cochée, revenu au SG pour imputation', { aCocher: false, decisionSg: null, echeanceSg: enPlus(240) }, SP_DG);
                    return;
                }
                const maj = sorte === 'acte' ? majActe : majSortant;
                if (item.etat === 'rejete') {
                    maj(item.id, { aCocher: false }, 'Rejet coché, le SG est prévenu', SP_DG);
                    return;
                }
                maj(item.id, { aCocher: false, remisScc: true }, 'Signature cochée, remis au Service Courrier pour envoi', SP_DG);
                ajouterDepart({
                    source: item.id,
                    typeDocument: sorte === 'acte' ? 'acte' : 'courrier',
                    objet: sorte === 'acte' ? `${item.objet} - ${item.beneficiaireNom}` : item.objet,
                    produitPar: sorte === 'acte' ? item.produitPar : item.redacteur,
                    signePar: item.signature === 'sg-delegation' ? 'sg-delegation' : 'dg',
                    destinataire:
                        sorte === 'acte'
                            ? { structure: item.beneficiaireStructure, personne: item.beneficiaireNom, qualite: 'Agent' }
                            : { structure: item.destinataire, personne: item.destinataire, qualite: '' },
                    interne: sorte === 'acte',
                });
            },

            creerSortant: (sortant) =>
                setSortants((l) => [
                    {
                        version: 1,
                        redacteur: SG,
                        etat: 'brouillon',
                        creeLe: now(),
                        corps: '<p>Ouagadougou, le 29 septembre 2026</p><p><br></p><p>Objet : </p><p><br></p>',
                        pieces: [],
                        commentaires: [],
                        historique: [{ date: now(), action: 'Brouillon créé', par: SG }],
                        ...sortant,
                    },
                    ...l,
                ]),
        };
    }, [modifierArrivee, ajouterADispatcher, ajouterDepart]);

    const value = { dossiers, instructions, actes, sortants, validations, ...actions };
    return <CircuitContext.Provider value={value}>{children}</CircuitContext.Provider>;
}
