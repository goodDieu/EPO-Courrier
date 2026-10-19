// src/components/circuit/LocalisationTag.jsx
// Où se trouve un dossier : point de couleur + libellé, comme les statuts.
import { LOCALISATIONS } from '../../data/circuit.js';

const DOTS = {
    'remis-direction': 'bg-epo-green-600',
    'objet-satisfait': 'bg-epo-green-600',
};

export default function LocalisationTag({ dossier, court = false }) {
    const l = LOCALISATIONS[dossier.localisation];
    if (!l) return null;
    const dot = dossier.bloque ? 'bg-epo-red-600' : DOTS[dossier.localisation] || 'bg-epo-slate-400';
    return (
        <span className={`inline-flex items-center gap-2 text-sm whitespace-nowrap text-epo-slate-800 ${dossier.bloque ? 'font-medium' : ''}`}>
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} aria-hidden="true" />
            {court ? l.court : l.label}
            {dossier.bloque && <span className="text-epo-slate-600">· bloqué</span>}
        </span>
    );
}
