// src/components/circuit/DossierResume.jsx
// En-tête des fenêtres : numéro, objet et informations utiles du dossier.
import ClassificationBadge from '../scc/ClassificationBadge';
import { TYPES_DOSSIER } from '../../data/circuit.js';

export default function DossierResume({ dossier, lignes = [] }) {
    const type = TYPES_DOSSIER[dossier.type] || TYPES_DOSSIER.courrier;
    const classification = dossier.classification ?? dossier.classificationScc;
    return (
        <div className="p-4 mb-5 border rounded-lg border-epo-slate-200">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-sm font-semibold tabular-nums text-epo-slate-900">{dossier.id}</span>
                <span className="text-sm text-epo-slate-600">
                    <i className={`fas ${type.icon} mr-1.5 text-epo-slate-400`} aria-hidden="true" />
                    {type.label}
                </span>
                {classification && classification !== 'ordinaire' && <ClassificationBadge classification={classification} />}
            </div>
            <p className="mt-1.5 text-base font-semibold text-epo-slate-900">{dossier.objet}</p>
            {lignes.filter(Boolean).length > 0 && (
                <dl className="grid grid-cols-1 mt-3 text-sm gap-x-6 gap-y-1.5 sm:grid-cols-2">
                    {lignes.filter(Boolean).map(([terme, valeur]) => (
                        <div key={terme} className="flex gap-2">
                            <dt className="text-epo-slate-500">{terme} :</dt>
                            <dd className="font-medium text-epo-slate-900">{valeur}</dd>
                        </div>
                    ))}
                </dl>
            )}
        </div>
    );
}
