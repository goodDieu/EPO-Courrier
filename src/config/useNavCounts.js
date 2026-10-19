// src/config/useNavCounts.js
// Compteurs du menu calculés à partir des données (au lieu de nombres figés).
import { useScc } from '../data/sccContext.js';
import { useCircuit } from '../data/circuitContext.js';
import { statsArrivees, statsDispatch, statsScan, statsDeparts } from '../data/sccStats.js';
import { statsSpSg } from '../data/spSgStats.js';
import { statsSg } from '../data/sgStats.js';
import { statsSpDg } from '../data/spDgStats.js';
import { statsDg } from '../data/dgStats.js';
import { MON_AGENT_ID, statsLiaison } from '../data/liaisonStats.js';

export function useNavCounts(role) {
    const scc = useScc();
    const circuit = useCircuit();

    if (role === 'scc') {
        const a = statsArrivees(scc.arrivees);
        const d = statsDispatch(scc.dossiers);
        const s = statsScan(scc.documents);
        const dep = statsDeparts(scc.departs);
        return {
            '/scc/arrivees': { count: a.aTransmettre },
            '/scc/departs': { count: dep.aNumeroter + dep.aCacheter + dep.pretsExpedition },
            '/scc/dispatch': { count: d.aDispatcher + d.enRetard },
            '/scc/scan': { count: s.aScanner + s.erreurs },
        };
    }

    if (role === 'sp_sg') {
        const s = statsSpSg({ arrivees: scc.arrivees, dossiers: circuit.dossiers, instructions: circuit.instructions });
        return {
            '/sp_sg/courriers-recus': { count: s.aReceptionner },
            '/sp_sg/tri': { count: s.aTrier },
            '/sp_sg/introduction': { count: s.aIntroduire },
            '/sp_sg/instructions': { count: s.instructions },
        };
    }

    if (role === 'sg') {
        const s = statsSg({ dossiers: circuit.dossiers, actes: circuit.actes, sortants: circuit.sortants });
        return {
            '/sg/courriers-entrants': { count: s.aExaminer + s.aImputer },
            '/sg/courriers-sortants': { count: s.sortantsAViser + s.enRedaction },
            '/sg/actes': { count: s.actesAViser },
        };
    }

    if (role === 'sp_dg') {
        const s = statsSpDg(circuit);
        return {
            '/sp_dg/courriers-recus': { count: s.aReceptionner },
            '/sp_dg/introduction': { count: s.aIntroduire },
            '/sp_dg/post-visa': { count: s.aCocher },
        };
    }

    if (role === 'dg') {
        const s = statsDg(circuit);
        return {
            '/dg/a-signer': { count: s.aSigner },
            '/dg/a-valider': { count: s.pourDecision },
            '/dg/echeances': { count: s.enRetard },
        };
    }

    if (role === 'liaison') {
        const s = statsLiaison(scc.agents.find((a) => a.id === MON_AGENT_ID));
        return {
            '/liaison/tournees': { count: s.aRemettre },
            '/liaison/en-attente': { count: s.problemes },
        };
    }

    return null;
}
