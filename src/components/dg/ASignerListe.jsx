// src/components/dg/ASignerListe.jsx
import { PriorityTag, StatusBadge } from '../ui';
import {
    TYPES_DOCUMENTS,
    PROVENANCES,
    formatDuree,
    computeNiveau,
    peutSignerEnMasse,
} from '../../data/aSignerDG.js';

const NIVEAUX_INFO = {
    depasse: { label: 'Dépassé', icon: 'fa-exclamation-circle', chip: 'bg-epo-red-50 text-epo-red-700', border: 'border-l-epo-red-500' },
    jourJ: { label: 'Jour J', icon: 'fa-clock', chip: 'bg-epo-yellow-50 text-epo-yellow-800', border: 'border-l-epo-yellow-500' },
    urgent: { label: 'Urgent', icon: 'fa-hourglass-half', chip: 'bg-epo-yellow-50 text-epo-yellow-700', border: 'border-l-epo-yellow-400' },
    surveiller: { label: 'À surveiller', icon: 'fa-hourglass-start', chip: 'bg-epo-slate-50 text-epo-slate-700', border: 'border-l-epo-slate-400' },
    ok: { label: 'OK', icon: 'fa-check-circle', chip: 'bg-epo-green-50 text-epo-green-700', border: 'border-l-epo-green-500' },
};

export default function ASignerListe({ documents, onSigner }) {
    if (documents.length === 0) {
        return (
            <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-green-50">
                    <i className="text-2xl fas fa-check-circle text-epo-green-500" />
                </div>
                <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                    Aucun document à signer
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {documents.map((d) => {
                const type = TYPES_DOCUMENTS[d.type];
                const prov = PROVENANCES[d.provenence];
                const niveau = computeNiveau(d.tempsRestantMin);
                const niveauInfo = NIVEAUX_INFO[niveau];
                const isMasseEligible = peutSignerEnMasse(d);

                return (
                    <button
                        key={d.id}
                        onClick={() => onSigner(d)}
                        className={`
                            block w-full text-left bg-white border border-epo-slate-200 border-l-4
                            ${niveauInfo.border}
                            rounded-xl p-4 shadow-soft hover:shadow-card hover:-translate-y-0.5
                            transition cursor-pointer
                        `}
                    >
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-mono text-[11.5px] font-bold text-epo-slate-700 bg-epo-slate-100 px-2 py-0.5 rounded-full">
                                    {d.id}
                                </span>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${type.color}`}>
                                    <i className={`fas ${type.icon} text-[9px]`} />
                                    {type.label}
                                </span>
                            </div>
                            <PriorityTag priority={d.priorite} />
                        </div>

                        <div className="text-[13.5px] font-semibold text-epo-slate-900 mb-2 line-clamp-2">
                            {d.objet}
                        </div>

                        <div className="flex items-center gap-2 mb-3 text-[11.5px] text-epo-slate-500">
                            <span className="inline-flex items-center gap-1">
                                <i className={`fas ${prov?.icon} text-[10px] text-epo-slate-400`} />
                                {d.provenence}
                            </span>
                            <span className="text-epo-slate-300">·</span>
                            <span className="truncate">{d.expediteur}</span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-epo-slate-100">
                            <StatusBadge status={d.etat} />
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${niveauInfo.chip}`}>
                                <i className={`fas ${niveauInfo.icon} text-[9px]`} />
                                {d.tempsRestantMin < 0
                                    ? `+${formatDuree(d.tempsRestantMin)}`
                                    : formatDuree(d.tempsRestantMin)}
                            </span>
                        </div>

                        {isMasseEligible && (
                            <div className="mt-2 pt-2 border-t border-epo-slate-100 text-[10.5px] text-epo-green-600 font-medium">
                                <i className="fas fa-check-double text-[9px] mr-1" />
                                Signable en masse
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
}