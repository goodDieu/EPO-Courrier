// src/config/useNavCounts.js
// Compteurs du menu calculés à partir des données (au lieu de nombres figés).
import { useScc } from '../data/sccContext.js';
import { statsArrivees, statsDispatch, statsScan, statsDeparts } from '../data/sccStats.js';

export function useNavCounts(role) {
    const scc = useScc();
    if (role !== 'scc') return null;

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
