// src/data/SccStore.jsx
// Données du Service Courrier partagées entre le tableau de bord et les pages.
// Une action faite sur une page (transmettre, dispatcher, numériser…) reste
// visible quand on change de page, tant que l'application n'est pas rechargée.
import { useMemo, useState } from 'react';
import { SccContext } from './sccContext.js';
import { ARRIVEES } from './arriveesSCC.js';
import { DOSSIERS_DISPATCH, devineModeRemise } from './dispatchSCC.js';
import { DOCUMENTS_A_SCANNER } from './scanSCC.js';
import { DEPARTS } from './departsSCC.js';
import { AGENTS_LIAISON } from './liaisonsSCC.js';
import { DEMO_NOW } from './demoClock.js';

const majParId = (list, id, fn) => list.map((x) => (x.id === id ? fn(x) : x));

export function SccProvider({ children }) {
    const [arrivees, setArrivees] = useState(ARRIVEES);
    const [dossiers, setDossiers] = useState(DOSSIERS_DISPATCH);
    const [documents, setDocuments] = useState(DOCUMENTS_A_SCANNER);
    const [departs, setDeparts] = useState(DEPARTS);
    const [agents, setAgents] = useState(AGENTS_LIAISON);

    const actions = useMemo(() => {
        const now = () => DEMO_NOW.toISOString();

        return {
            // Registre des arrivées
            ajouterArrivee: (arrivee) => setArrivees((l) => [{ ...arrivee, dateReception: now() }, ...l]),
            modifierArrivee: (id, champs) => setArrivees((l) => majParId(l, id, (a) => ({ ...a, ...champs }))),
            transmettreArrivee: (id) => setArrivees((l) => majParId(l, id, (a) => ({ ...a, etat: 'transmis-sp-sg', tempsRestant: 30 }))),

            // Courrier imputé par le SG : il arrive dans la liste « À dispatcher »
            ajouterADispatcher: ({ dossier, structure, responsable, imputePar }) =>
                setDossiers((l) => [
                    {
                        id: dossier.id,
                        objet: dossier.objet,
                        expediteur: dossier.expediteur,
                        classification: dossier.classificationScc || 'ordinaire',
                        nature: 'lettre',
                        structureDestinataire: structure,
                        destinataire: { structure, personne: responsable.personne, qualite: responsable.qualite },
                        imputePar,
                        dateImputation: now(),
                        dateReceptionSCC: now(),
                        tempsRestantMin: dossier.classificationScc === 'urgent' ? 30 : 240,
                        etat: 'a-dispatcher',
                        modePrevu: devineModeRemise(structure),
                        agentAssigne: null,
                        agentId: null,
                        dateDepart: null,
                        dateRemise: null,
                        dateDecharge: null,
                        preuve: null,
                        pieces: dossier.pieces,
                        prioriteScore: dossier.classificationScc === 'urgent' ? 90 : 40,
                    },
                    ...l.filter((d) => d.id !== dossier.id),
                ]),

            // Document signé, coché par le secrétariat du DG : il arrive « À numéroter »
            ajouterDepart: ({ source, typeDocument, objet, produitPar, signePar, destinataire, interne }) =>
                // Le départ garde le numéro du document (DEP- pour un courrier, ACT- pour un acte)
                setDeparts((l) => {
                    return [
                        {
                            id: source,
                            documentSource: source,
                            typeDocument,
                            nature: typeDocument === 'acte' ? 'decision' : 'lettre',
                            objet,
                            beneficiaire: destinataire.personne,
                            produitPar,
                            signePar,
                            dateSignature: now(),
                            dateReceptionSCC: now(),
                            mode: interne ? 'interne' : 'externe',
                            destinataire,
                            etat: 'a-numeroter',
                            numeroSortant: null,
                            tempsRestant: 240,
                            agentSCC: null,
                            cachet: false,
                            pieces: 1,
                        },
                        ...l.filter((d) => d.id !== source),
                    ];
                }),

            // Dispatch : met à jour le courrier et, en liaison, l'ajoute à la tournée de l'agent
            dispatcher: (dossier, { mode, agent, nomRecepteur }) => {
                if (mode === 'liaison' && agent) {
                    setDossiers((l) =>
                        majParId(l, dossier.id, (d) => ({ ...d, modePrevu: mode, etat: 'en-tournee', agentAssigne: agent.nom, agentId: agent.id, dateDepart: now() }))
                    );
                    setAgents((l) =>
                        l.map((a) => {
                            // Retire le courrier de la tournée d'un éventuel ancien agent
                            const remises = a.remises.filter((r) => r.documentNumero !== dossier.id);
                            if (a.id !== agent.id) return { ...a, remises };
                            return {
                                ...a,
                                remises: [
                                    ...remises,
                                    {
                                        id: `TR-${dossier.id}`,
                                        documentNumero: dossier.id,
                                        documentObjet: dossier.objet,
                                        destinataire: { structure: dossier.destinataire.structure, personne: dossier.destinataire.personne },
                                        priorite: dossier.classification === 'urgent' ? 'urgent' : 'normal',
                                        heurePrevue: new Date(DEMO_NOW.getTime() + 30 * 60000).toISOString(),
                                        heureRemise: null,
                                        statut: 'a-venir',
                                        preuve: null,
                                    },
                                ],
                            };
                        })
                    );
                    return;
                }
                setDossiers((l) =>
                    majParId(l, dossier.id, (d) => ({
                        ...d,
                        modePrevu: mode,
                        etat: 'remis',
                        dateRemise: now(),
                        preuve: mode === 'main-propre' ? { type: 'signature', date: now(), recepteur: nomRecepteur } : null,
                    }))
                );
            },

            // Numérisation
            marquerScanne: (id, { taille, hash }) =>
                setDocuments((l) => majParId(l, id, (d) => ({ ...d, etat: 'scanne', erreur: null, taille, hash, dateScan: now() }))),

            // Départs
            avancerDepart: (id, etape, { numeroAttribue, modeExpedition }) =>
                setDeparts((l) =>
                    majParId(l, id, (d) => {
                        if (etape === 'numeroter') return { ...d, numeroSortant: numeroAttribue, etat: 'a-cacheter' };
                        if (etape === 'cacheter') return { ...d, cachet: true, etat: 'pret-expedition' };
                        if (etape === 'expedier') return { ...d, etat: 'en-cours', modeExpedition };
                        return d;
                    })
                ),

            // Tournées
            demarrerTournee: (id) => setAgents((l) => majParId(l, id, (a) => ({ ...a, statut: 'en-tournee', dateDepart: now() }))),
            cloturerTournee: (id) => setAgents((l) => majParId(l, id, (a) => ({ ...a, statut: 'disponible' }))),
            // L'agent n'a pas pu remettre (destinataire absent, bureau fermé…)
            signalerProbleme: (agentId, remise, motif) =>
                setAgents((l) =>
                    majParId(l, agentId, (a) => ({
                        ...a,
                        remises: a.remises.map((r) => (r.id === remise.id ? { ...r, statut: 'bloque', motifBlocage: motif, signaleLe: now() } : r)),
                    }))
                ),
            reprogrammerRemise: (agentId, remise, heurePrevue) =>
                setAgents((l) =>
                    majParId(l, agentId, (a) => ({
                        ...a,
                        remises: a.remises.map((r) => (r.id === remise.id ? { ...r, statut: 'a-venir', heurePrevue, motifBlocage: null } : r)),
                    }))
                ),
            validerRemise: (agentId, remise, { typePreuve, heureRemise, nomRecepteur }) => {
                setAgents((l) =>
                    majParId(l, agentId, (a) => ({
                        ...a,
                        remises: a.remises.map((r) =>
                            r.id === remise.id ? { ...r, statut: 'remis', heureRemise, preuve: { type: typePreuve, date: heureRemise, recepteur: nomRecepteur } } : r
                        ),
                    }))
                );
                setDossiers((l) =>
                    majParId(l, remise.documentNumero, (d) => ({
                        ...d,
                        etat: 'remis',
                        dateRemise: heureRemise,
                        preuve: { type: typePreuve, date: heureRemise, recepteur: nomRecepteur },
                    }))
                );
            },
        };
    }, []);

    // Prochain numéro de la série ordinaire des arrivées : plus grand numéro + 1
    const prochainNumeroArrivee = useMemo(() => {
        const max = Math.max(...arrivees.filter((a) => /^\d{4}-\d{4}$/.test(a.id)).map((a) => Number(a.id.split('-')[1])));
        return `2026-${String(max + 1).padStart(4, '0')}`;
    }, [arrivees]);

    const value = { arrivees, dossiers, documents, departs, agents, prochainNumeroArrivee, ...actions };
    return <SccContext.Provider value={value}>{children}</SccContext.Provider>;
}
