// src/components/liaison/TourneeDetailModal.jsx
import { Modal, Button } from '../ui';
import {
    ETATS_TOURNEE,
    formatDate,
    formatHeure,
    formatDuree,
} from '../../data/tourneesLiaison.js';

const ETATS_REMISE = {
    'faite': { label: 'Remis', icon: 'fa-check', chip: 'bg-epo-green-50 text-epo-green-700' },
    'en-cours': { label: 'En cours', icon: 'fa-spinner', chip: 'bg-epo-slate-800 text-white' },
    'a-venir': { label: 'À remettre', icon: 'fa-clock', chip: 'bg-epo-slate-100 text-epo-slate-700' },
    'retard': { label: 'En retard', icon: 'fa-exclamation-circle', chip: 'bg-epo-red-50 text-epo-red-700' },
};

export default function TourneeDetailModal({ tournee, onClose, onRemettre, onCloturer }) {
    if (!tournee) return null;

    const t = tournee;
    const etat = ETATS_TOURNEE[t.etat];
    const isEnCours = t.etat === 'en-cours';
    const isPlanifiee = t.etat === 'planifiee';
    const isTermineeAny = ['terminee', 'partielle'].includes(t.etat);
    const hasEtapes = t.etapes && t.etapes.length > 0;

    return (
        <Modal
            open={!!t}
            onClose={onClose}
            title={`${t.libelle} - ${formatDate(t.date)}`}
            titleIcon="fa-route"
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    {isPlanifiee && (
                        <Button variant="primary" icon="fa-play">
                            Démarrer la tournée
                        </Button>
                    )}
                    {isEnCours && (
                        <>
                            <Button variant="outline" icon="fa-flag-checkered" onClick={() => onCloturer?.(t)}>
                                Clôturer
                            </Button>
                            <Button variant="primary" icon="fa-arrow-right">
                                Continuer
                            </Button>
                        </>
                    )}
                    {isTermineeAny && (
                        <Button variant="outline" icon="fa-print">
                            Imprimer le bilan
                        </Button>
                    )}
                </>
            }
        >
            {/* ============ En-tête ============ */}
            <div className="pb-5 mb-5 border-b border-epo-slate-100">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${etat.chip}`}>
                        <i className={`fas ${etat.icon} text-[10px]`} />
                        {etat.label}
                    </span>
                    <span className="text-[12px] font-mono text-epo-slate-500">
                        {t.id}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <InfoField label="Date" value={formatDate(t.date)} />
                    <InfoField label="Début" value={formatHeure(t.heureDebut)} />
                    <InfoField label="Fin prévue" value={formatHeure(t.heureFinPrevue)} />
                    <InfoField
                        label="Zone"
                        value={`Zone ${t.zone}`}
                    />
                </div>

                {t.heureFinReelle && (
                    <div className="p-3 mt-3 border rounded-lg bg-epo-green-50 border-epo-green-200">
                        <div className="text-[11.5px] text-epo-green-700">
                            <i className="fas fa-check-circle text-[10px] mr-1" />
                            Tournée clôturée à <strong>{formatHeure(t.heureFinReelle)}</strong>
                        </div>
                    </div>
                )}
            </div>

            {/* ============ Progression ============ */}
            <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[11.5px] font-semibold uppercase tracking-wider text-epo-slate-400">
                        Progression
                    </span>
                    <span className="text-[14px] font-bold tabular-nums text-epo-slate-800">
                        {t.nbFaites} / {t.nbEtapes}
                    </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-epo-slate-100">
                    <div
                        className={`
                            h-full transition-all
                            ${t.etat === 'terminee' ? 'bg-epo-green-500' :
                              t.etat === 'partielle' ? 'bg-epo-yellow-500' :
                              'bg-epo-slate-800'}
                        `}
                        style={{ width: `${(t.nbFaites / t.nbEtapes) * 100}%` }}
                    />
                </div>
                <div className="grid grid-cols-3 gap-3 mt-3">
                    <Stat label="Effectuées" value={t.nbFaites} color="text-epo-green-600" />
                    <Stat label="Restantes" value={t.nbEtapes - t.nbFaites} color="text-epo-slate-700" />
                    <Stat label="Retards" value={t.nbRetards} color={t.nbRetards > 0 ? 'text-epo-red-600' : 'text-epo-slate-400'} />
                </div>
            </div>

            {/* ============ Timeline des étapes ============ */}
            {hasEtapes ? (
                <div>
                    <h4 className="text-[12.5px] font-semibold uppercase tracking-wider text-epo-slate-500 mb-3">
                        Détail des remises
                    </h4>
                    <div className="flex flex-col">
                        {t.etapes.map((etape, i) => {
                            const etatRemise = ETATS_REMISE[etape.etat];
                            const isDone = etape.etat === 'faite';
                            const isCurrent = etape.etat === 'en-cours';
                            const isLast = i === t.etapes.length - 1;

                            return (
                                <div key={etape.id} className="relative">
                                    {!isLast && (
                                        <div className={`
                                            absolute left-[18px] top-12 bottom-0 w-px
                                            ${isDone ? 'bg-epo-green-300' : 'bg-epo-slate-200'}
                                        `} />
                                    )}

                                    <div className="relative flex gap-3 py-2">
                                        <div className={`
                                            flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-full text-[12px] font-bold z-10
                                            ${isDone ? 'bg-epo-green-500 text-white' :
                                              isCurrent ? 'bg-epo-slate-800 text-white' :
                                              'bg-white border-2 border-epo-slate-300 text-epo-slate-400'}
                                        `}>
                                            {isDone ? <i className="fas fa-check" /> : etape.ordre}
                                        </div>

                                        <div className="flex-1 min-w-0 pt-0.5">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <span className={`
                                                    text-[13px] font-semibold
                                                    ${isDone ? 'text-epo-slate-400 line-through' : 'text-epo-slate-800'}
                                                `}>
                                                    {etape.destinataire.structure} · {etape.documentNumero}
                                                </span>
                                                {etape.priorite === 'urgent' && !isDone && (
                                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-epo-red-50 text-epo-red-700 text-[9.5px] font-bold">
                                                        URGENT
                                                    </span>
                                                )}
                                                {etape.priorite === 'confidentiel' && !isDone && (
                                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-epo-slate-800 text-white text-[9.5px] font-bold">
                                                        CONFID.
                                                    </span>
                                                )}
                                            </div>

                                            <div className="text-[11.5px] text-epo-slate-500 line-clamp-2 mb-1">
                                                {etape.documentObjet}
                                            </div>

                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-epo-slate-500">
                                                <span>
                                                    <i className="fas fa-user text-[9.5px] text-epo-slate-400 mr-1" />
                                                    {etape.destinataire.personne}
                                                </span>
                                                <span>
                                                    <i className="fas fa-clock text-[9.5px] text-epo-slate-400 mr-1" />
                                                    {isDone && etape.heureRemise
                                                        ? `Remis à ${formatHeure(etape.heureRemise)}`
                                                        : `Prévu ${formatHeure(etape.heurePrevue)}`}
                                                </span>
                                            </div>

                                            {isDone && etape.preuve && (
                                                <div className="inline-flex items-center gap-1.5 mt-1.5 px-2 py-0.5 rounded-full bg-epo-green-50 text-epo-green-700 text-[10.5px] font-medium">
                                                    <i className={`fas ${etape.preuve.type === 'signature' ? 'fa-signature' : 'fa-camera'} text-[9px]`} />
                                                    Preuve {etape.preuve.type} · {etape.preuve.recepteur}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="p-6 text-center rounded-lg bg-epo-slate-50">
                    <i className="fas fa-info-circle text-epo-slate-400 text-[20px] mb-2 block" />
                    <div className="text-[12.5px] text-epo-slate-600">
                        Le détail des étapes n'est pas disponible pour cette tournée ancienne.
                    </div>
                </div>
            )}
        </Modal>
    );
}

function InfoField({ label, value }) {
    return (
        <div>
            <div className="text-[10.5px] font-semibold uppercase tracking-wider text-epo-slate-400 mb-0.5">
                {label}
            </div>
            <div className="text-[13px] text-epo-slate-800">
                {value}
            </div>
        </div>
    );
}

function Stat({ label, value, color }) {
    return (
        <div className="p-3 text-center bg-white border rounded-lg border-epo-slate-200">
            <div className={`text-2xl font-bold tabular-nums ${color}`}>
                {value}
            </div>
            <div className="text-[10.5px] font-semibold uppercase tracking-wider text-epo-slate-400 mt-0.5">
                {label}
            </div>
        </div>
    );
}