// src/components/scc/AgentCarte.jsx
import StatutAgentBadge from './StatutAgentBadge';
import { formatHeure } from '../../data/liaisonsSCC.js';

const POINT = {
    remis: 'bg-epo-green-600',
    'en-retard': 'bg-epo-red-600',
    'en-cours': 'bg-epo-slate-600',
    'a-venir': 'bg-epo-slate-300',
};

function initiales(nom) {
    return nom.replace(/^(M\.|Mme)\s+/, '').split(' ').map((n) => n[0]).join('').slice(0, 2);
}

export default function AgentCarte({ agent, onVoir, onDemarrer, onCloturer }) {
    const remises = [...agent.remises].sort((a, b) => new Date(a.heurePrevue) - new Date(b.heurePrevue));
    const faites = agent.remises.filter((r) => r.statut === 'remis').length;
    const total = agent.remises.length;
    const enRetard = agent.remises.filter((r) => r.statut === 'en-retard').length;
    const progression = total > 0 ? (faites / total) * 100 : 0;

    return (
        <div className="flex flex-col overflow-hidden bg-white border rounded-xl border-epo-slate-200 shadow-soft">
            {/* Agent */}
            <div className="flex items-start gap-3 p-4">
                <span className="flex items-center justify-center flex-shrink-0 text-sm font-semibold rounded-full w-11 h-11 bg-epo-slate-100 text-epo-slate-700">
                    {initiales(agent.nom)}
                </span>
                <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold truncate text-epo-slate-900">{agent.nom}</p>
                    <p className="text-sm text-epo-slate-600">Zone {agent.zone}</p>
                    <div className="mt-1.5">
                        <StatutAgentBadge statut={agent.statut} />
                    </div>
                </div>
                {agent.statut === 'en-tournee' && agent.dateDepart && (
                    <div className="text-sm text-right text-epo-slate-600">
                        Parti à
                        <div className="text-base font-semibold tabular-nums text-epo-slate-900">{formatHeure(agent.dateDepart)}</div>
                    </div>
                )}
            </div>

            {agent.statut === 'indisponible' && agent.indisponibleMotif && (
                <p className="px-4 pb-3 text-sm text-epo-slate-700">
                    <i className="mr-1.5 fas fa-circle-info text-epo-slate-400" aria-hidden="true" />
                    {agent.indisponibleMotif}
                    {enRetard > 0 && ' · son courrier en attente est à confier à un autre agent depuis « À dispatcher ».'}
                </p>
            )}

            {/* Avancement */}
            <div className="px-4 pb-3">
                <div className="flex items-center justify-between mb-1.5 text-sm">
                    <span className="text-epo-slate-700">
                        {faites} remise{faites > 1 ? 's' : ''} sur {total}
                    </span>
                    {enRetard > 0 && (
                        <span className="inline-flex items-center gap-1.5 font-medium text-epo-slate-900">
                            <span className="w-2 h-2 rounded-full bg-epo-red-600" aria-hidden="true" />
                            {enRetard} en retard
                        </span>
                    )}
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-epo-slate-100" aria-hidden="true">
                    <div className="h-full bg-epo-green-600" style={{ width: `${progression}%` }} />
                </div>
            </div>

            {/* Remises */}
            <ul className="flex-1 px-4 pb-3 space-y-1">
                {remises.map((r) => {
                    const fait = r.statut === 'remis';
                    return (
                        <li key={r.id} className="flex items-center gap-2.5 py-1 text-sm">
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${POINT[r.statut] || POINT['a-venir']}`} aria-hidden="true" />
                            <span className={`flex-1 min-w-0 truncate ${fait ? 'text-epo-slate-500' : 'text-epo-slate-800'}`}>
                                {r.destinataire.structure} · {r.documentNumero}
                            </span>
                            <span className={`tabular-nums ${r.statut === 'en-retard' ? 'text-epo-slate-900 font-semibold' : 'text-epo-slate-600'}`}>
                                {formatHeure(r.heureRemise || r.heurePrevue)}
                            </span>
                        </li>
                    );
                })}
            </ul>

            {/* Actions */}
            <div className="flex gap-2 p-3 border-t border-epo-slate-100">
                <button
                    type="button"
                    onClick={() => onVoir(agent)}
                    className="flex-1 h-9 text-sm font-medium rounded-lg text-epo-slate-700 hover:bg-epo-slate-100"
                >
                    Voir la tournée
                </button>
                {agent.statut === 'disponible' && (
                    <button
                        type="button"
                        onClick={() => onDemarrer(agent)}
                        className="flex-1 h-9 text-sm font-semibold text-white rounded-lg bg-epo-green-700 hover:bg-epo-green-800"
                    >
                        Démarrer la tournée
                    </button>
                )}
                {agent.statut === 'en-tournee' && (
                    <button
                        type="button"
                        onClick={() => onCloturer(agent)}
                        className="flex-1 h-9 text-sm font-semibold border rounded-lg border-epo-slate-300 text-epo-slate-800 hover:bg-epo-slate-50"
                    >
                        Clôturer la tournée
                    </button>
                )}
            </div>
        </div>
    );
}
