// src/components/scc/AgentCarte.jsx
import StatutAgentBadge from './StatutAgentBadge';
import { formatHeure } from '../../data/liaisonsSCC.js';

export default function AgentCarte({ agent, onVoir, onDemarrer, onCloturer }) {
    const remisesFaites = agent.remises.filter((r) => r.statut === 'remis').length;
    const remisesEnCours = agent.remises.filter((r) => r.statut === 'en-cours').length;
    const total = agent.remises.length;
    const progression = total > 0 ? (remisesFaites / total) * 100 : 0;

    const canDemarrer = agent.statut === 'disponible';
    const canCloturer = agent.statut === 'en-tournee';
    const isIndispo = agent.statut === 'indisponible';

    return (
        <div className={`
            bg-white border shadow-soft rounded-xl overflow-hidden transition
            ${isIndispo ? 'border-epo-red-200 opacity-90' : 'border-epo-slate-200 hover:shadow-card'}
        `}>
            {/* En-tête agent */}
            <div className={`
                flex items-start gap-3 p-4 border-b border-epo-slate-100
                ${isIndispo ? 'bg-epo-red-50/40' : 'bg-epo-slate-50/60'}
            `}>
                <div className={`
                    flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-full text-[13px] font-bold
                    ${isIndispo ? 'bg-epo-red-100 text-epo-red-700' : 'bg-epo-green-100 text-epo-green-700'}
                `}>
                    {agent.nom.replace('M. ', '').replace('Mme ', '').split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-bold text-epo-slate-900 truncate">
                        {agent.nom}
                    </div>
                    <div className="text-[11.5px] text-epo-slate-500 mt-0.5">
                        <i className="fas fa-map-marker-alt text-[10px] text-epo-slate-400 mr-1" />
                        Zone {agent.zone}
                    </div>
                    <div className="mt-1.5">
                        <StatutAgentBadge statut={agent.statut} size="sm" />
                    </div>
                </div>

                {agent.statut === 'en-tournee' && agent.dateDepart && (
                    <div className="flex-shrink-0 text-right">
                        <div className="text-[10.5px] uppercase tracking-wider font-semibold text-epo-slate-400">
                            Départ
                        </div>
                        <div className="text-[12.5px] font-bold tabular-nums text-epo-slate-700">
                            {formatHeure(agent.dateDepart)}
                        </div>
                    </div>
                )}
            </div>

            {/* Motif d'indisponibilité */}
            {isIndispo && agent.indisponibleMotif && (
                <div className="flex items-start gap-2 px-4 py-2 border-b bg-epo-red-50 border-epo-red-200">
                    <i className="fas fa-info-circle text-epo-red-600 text-[11px] mt-0.5" />
                    <span className="text-[11.5px] text-epo-red-800">
                        {agent.indisponibleMotif}
                    </span>
                </div>
            )}

            {/* Barre de progression */}
            <div className="px-4 pt-3">
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-epo-slate-400">
                        Progression
                    </span>
                    <span className="text-[12px] font-bold tabular-nums text-epo-slate-700">
                        {remisesFaites} / {total}
                    </span>
                </div>
                <div className="h-1.5 bg-epo-slate-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all ${isIndispo ? 'bg-epo-red-500' : 'bg-epo-green-500'}`}
                        style={{ width: `${progression}%` }}
                    />
                </div>
            </div>

            {/* Prochaines remises */}
            <div className="px-4 pb-3 mt-3">
                <div className="text-[10.5px] font-semibold uppercase tracking-wider text-epo-slate-400 mb-1.5">
                    Remises
                </div>
                <div className="flex flex-col gap-1 max-h-[140px] overflow-y-auto">
                    {agent.remises.map((r) => {
                        const isDone = r.statut === 'remis';
                        const isEnCours = r.statut === 'en-cours';
                        return (
                            <button
                                key={r.id}
                                onClick={() => onVoir(agent, r)}
                                className="flex items-center gap-2 py-1 text-left group"
                            >
                                <span className={`
                                    flex-shrink-0 w-1.5 h-1.5 rounded-full
                                    ${isDone ? 'bg-epo-green-500' : isEnCours ? 'bg-epo-slate-400 animate-pulse' : 'bg-epo-slate-300'}
                                `} />
                                <div className="flex-1 min-w-0">
                                    <div className={`text-[11.5px] truncate ${isDone ? 'text-epo-slate-400 line-through' : 'text-epo-slate-700'}`}>
                                        {r.destinataire.structure} - {r.documentNumero}
                                    </div>
                                </div>
                                <span className={`text-[10.5px] tabular-nums flex-shrink-0 ${isDone ? 'text-epo-slate-400' : 'text-epo-slate-600 font-medium'}`}>
                                    {formatHeure(r.heureRemise || r.heurePrevue)}
                                </span>
                                {r.priorite === 'urgent' && !isDone && (
                                    <i className="fas fa-exclamation-circle text-epo-red-500 text-[9px]" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Actions */}
            <div className="flex border-t border-epo-slate-100">
                {canDemarrer && (
                    <button
                        onClick={() => onDemarrer(agent)}
                        className="flex-1 py-2.5 text-[12px] font-semibold text-epo-green-600 hover:bg-epo-green-50 transition"
                    >
                        <i className="fas fa-play mr-1.5" />
                        Démarrer la tournée
                    </button>
                )}
                {canCloturer && (
                    <>
                        <button
                            onClick={() => onVoir(agent)}
                            className="flex-1 py-2.5 text-[12px] font-semibold text-epo-slate-700 hover:bg-epo-slate-100 transition border-r border-epo-slate-100"
                        >
                            <i className="fas fa-eye mr-1.5" />
                            Détail
                        </button>
                        <button
                            onClick={() => onCloturer(agent)}
                            className="flex-1 py-2.5 text-[12px] font-semibold text-epo-red-600 hover:bg-epo-red-50 transition"
                        >
                            <i className="fas fa-flag-checkered mr-1.5" />
                            Clôturer
                        </button>
                    </>
                )}
                {isIndispo && (
                    <button
                        onClick={() => onVoir(agent)}
                        className="flex-1 py-2.5 text-[12px] font-semibold text-epo-slate-600 hover:bg-epo-slate-100 transition"
                    >
                        <i className="fas fa-eye mr-1.5" />
                        Voir le détail
                    </button>
                )}
            </div>
        </div>
    );
}