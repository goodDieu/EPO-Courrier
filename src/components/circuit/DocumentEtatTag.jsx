// src/components/circuit/DocumentEtatTag.jsx
// État d'un document à signer (acte ou courrier sortant) : point + libellé.
import { ETATS_DOCUMENT } from '../../data/circuit.js';

const DOTS = {
    green: 'bg-epo-green-600',
    yellow: 'bg-epo-yellow-500',
    red: 'bg-epo-red-600',
    slate: 'bg-epo-slate-400',
};

export default function DocumentEtatTag({ etat }) {
    const e = ETATS_DOCUMENT[etat];
    if (!e) return null;
    return (
        <span className={`inline-flex items-center gap-2 text-sm whitespace-nowrap text-epo-slate-800 ${e.dot === 'red' ? 'font-medium' : ''}`}>
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${DOTS[e.dot]}`} aria-hidden="true" />
            {e.label}
        </span>
    );
}
