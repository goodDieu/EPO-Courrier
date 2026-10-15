// src/data/SccStore.jsx
// Données du Service Courrier partagées entre le tableau de bord et les pages.
// Une action faite sur une page (transmettre, dispatcher, numériser…) reste
// visible quand on change de page, tant que l'application n'est pas rechargée.
import { useMemo, useState } from 'react';
import { SccContext } from './sccContext.js';
import { ARRIVEES } from './arriveesSCC.js';
import { DOSSIERS_DISPATCH } from './dispatchSCC.js';
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
            validerRemise: (agentId, remise, { typePreuve, heureRemise, nomRecepteur }) => {
                setAgents((l) =>
                    majParId(l, agentId, (a) => ({
                        ...a,
                        remises: a.remises.map((r) =>
                            r.id === remise.id ? { ...r, statut: 'remis', heureRemise, preuve: { type: typePreuve, date: heureRemise } } : r
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
