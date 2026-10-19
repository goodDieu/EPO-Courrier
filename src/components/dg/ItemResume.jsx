// src/components/dg/ItemResume.jsx
// En-tête d'une fenêtre du DG : numéro, type, objet, provenance et délai.
import { Echeance } from '../ui';
import ClassificationBadge from '../scc/ClassificationBadge';

export default function ItemResume({ item }) {
    return (
        <div className="p-4 mb-5 border rounded-lg border-epo-slate-200">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-sm font-semibold tabular-nums text-epo-slate-900">{item.id}</span>
                <span className="text-sm text-epo-slate-600">{item.quoi}</span>
                {item.classification !== 'ordinaire' && <ClassificationBadge classification={item.classification} />}
            </div>
            <p className="mt-1.5 text-base font-semibold text-epo-slate-900">{item.objet}</p>
            <p className="mt-1 text-sm text-epo-slate-600">
                {item.de}
                {item.echeance && (
                    <>
                        {' · '}
                        <Echeance iso={item.echeance} />
                    </>
                )}
            </p>
            {(item.source.observationSg || item.source.description) && (
                <p className="mt-3 text-sm text-epo-slate-800">
                    <span className="font-semibold">{item.source.observationSg ? 'Observation du SG : ' : ''}</span>
                    {item.source.observationSg || item.source.description}
                </p>
            )}
        </div>
    );
}
