// src/components/transmissions/TourneeCarte.jsx
import { ETATS_TRANSMISSION, formatHeure } from '../../data/transmissions.js';

export default function TourneeCarte({ tournee, onVoir }) {
    const { agent, remises } = tournee;
    const total = remises.length;
    const faites = remises.filter((r) => r.etat === 'decharge' || r.etat === 'remis').length;
    const progression = total > 0 ? (faites / total) * 100 : 0;

    return (
        <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
            {/* En-tête agent */}
            <div className="flex items-center gap-3 p-4 border-b border-epo-slate-100">
                <div className="flex items-center justify-center flex-shrink-0 text-[12px] font-bold rounded-full w-11 h-11 bg-epo-green-50 text-epo-green-700">
                    {agent.nom.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-bold text-epo-slate-900 truncate">
                        {agent.nom}
                    </div>
                    <div className="text-[11.5px] text-epo-slate-500 truncate">
                        {agent.zone}
                    </div>
                </div>
                <div className="flex-shrink-0 text-right">
                    <div className="text-[16px] font-bold tabular-nums text-epo-slate-800">
                        {faites} / {total}
                    </div>
                    <div className="text-[10.5px] uppercase tracking-wider text-epo-slate-400 font-semibold">
                        faites
                    </div>
                </div>
            </div>

            {/* Barre de progression */}
            <div className="h-1 bg-epo-slate-100">
                <div
                    className="h-full transition-all bg-epo-green-500"
                    style={{ width: `${progression}%` }}
                />
            </div>

            {/* Liste des remises */}
            <div className="divide-y divide-epo-slate-100">
                {remises.map((r, i) => {
                    const etat = ETATS_TRANSMISSION[r.etat] || ETATS_TRANSMISSION['a-remettre'];
                    const isDone = r.etat === 'decharge' || r.etat === 'remis';

                    return (
                        <button
                            key={r.id}
                            onClick={() => onVoir(r)}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-left transition hover:bg-epo-slate-50"
                        >
                            <span className="text-[10.5px] font-bold tabular-nums text-epo-slate-400 w-5 flex-shrink-0">
                                {i + 1}
                            </span>

                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${etat.dot}`} />

                            <div className="flex-1 min-w-0">
                                <div className={`text-[12.5px] font-medium truncate ${isDone ? 'text-epo-slate-400 line-through' : 'text-epo-slate-800'}`}>
                                    {r.destinataire.structure} - {r.documentNumero}
                                </div>
                                <div className="text-[11px] text-epo-slate-500 truncate">
                                    {r.documentObjet}
                                </div>
                            </div>

                            <div className="flex flex-col items-end flex-shrink-0 gap-0.5">
                                <span className="text-[11px] font-medium tabular-nums text-epo-slate-600">
                                    {isDone ? formatHeure(r.dateRemise) : formatHeure(r.dateDepart)}
                                </span>
                                {r.priorite === 'urgent' && (
                                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-epo-red-600">
                                        Urgent
                                    </span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}