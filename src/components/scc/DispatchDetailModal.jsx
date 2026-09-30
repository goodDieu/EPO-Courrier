// src/components/scc/DispatchDetailModal.jsx
import { Modal, Button, StatusBadge, Timeline } from '../ui';
import ModeRemiseBadge from './ModeRemiseBadge';
import ClassificationBadge from './ClassificationBadge';
import {
    formatDateHeure,
    formatHeure,
    formatDuree,
} from '../../data/dispatchSCC.js';

export default function DispatchDetailModal({ dossier, onClose, onDispatcher }) {
    if (!dossier) return null;

    const d = dossier;
    const canDispatch = ['a-dispatcher', 'en-retard'].includes(d.etat);
    const isLate = d.etat === 'en-retard';
    const timeline = buildTimeline(d);

    return (
        <Modal
            open={!!d}
            onClose={onClose}
            title={`Dossier ${d.id}`}
            titleIcon="fa-paper-plane"
            size="xl"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    <Button variant="outline" icon="fa-print">
                        Imprimer la fiche
                    </Button>
                    {canDispatch && (
                        <Button
                            variant="primary"
                            icon="fa-paper-plane"
                            onClick={() => {
                                onClose();
                                onDispatcher?.(d);
                            }}
                        >
                            Dispatcher
                        </Button>
                    )}
                </>
            }
        >
            {/* ============ En-tête ============ */}
            <div className="pb-5 mb-5 border-b border-epo-slate-100">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <ClassificationBadge classification={d.classification} />
                    <ModeRemiseBadge mode={d.modePrevu} />
                    <StatusBadge status={d.etat} />
                    {isLate && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-epo-red-100 text-epo-red-800 text-[11.5px] font-semibold">
                            <i className="fas fa-exclamation-circle text-[10px]" />
                            En retard de {formatDuree(d.tempsRestant)}
                        </span>
                    )}
                </div>

                <h2 className="text-[18px] font-bold tracking-tight text-epo-slate-900">
                    {d.objet}
                </h2>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-2 text-[12.5px] text-epo-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                        <i className="fas fa-user text-[10.5px] text-epo-slate-400" />
                        {d.expediteur}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <i className="fas fa-building text-[10.5px] text-epo-slate-400" />
                        Imputé à {d.structureDestinataire}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <i className="fas fa-clock text-[10.5px] text-epo-slate-400" />
                        Reçu à {formatHeure(d.dateReceptionSCC)}
                    </span>
                </div>
            </div>

            {/* ============ Section 1 - Imputation ============ */}
            <Section icon="fa-share" title="Imputation">
                <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                    <DetailRow label="Imputé par" value={d.imputePar} />
                    <DetailRow label="Date d'imputation" value={formatDateHeure(d.dateImputation)} />
                    <DetailRow label="Structure cible" value={<strong>{d.structureDestinataire}</strong>} />
                    <DetailRow label="Délai de dispatch" value={`${formatDuree(Math.abs(d.tempsRestant))} restant${d.tempsRestant < 0 ? 's (dépassé)' : ''}`} />
                </div>
            </Section>

            {/* ============ Section 2 - Destinataire ============ */}
            <Section icon="fa-user-tie" title="Destinataire">
                <div className="flex items-start gap-3 p-3 bg-white border rounded-lg border-epo-slate-200">
                    <div className="flex items-center justify-center flex-shrink-0 text-[11px] font-bold rounded-full w-9 h-9 bg-epo-slate-100 text-epo-slate-700">
                        {d.destinataire.personne.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-epo-slate-800">
                            {d.destinataire.personne}
                        </div>
                        <div className="text-[11.5px] text-epo-slate-500">
                            {d.destinataire.qualite}
                        </div>
                        <div className="text-[11.5px] text-epo-slate-500 mt-0.5">
                            <i className="fas fa-building mr-1 text-[10px] text-epo-slate-400" />
                            {d.destinataire.structure}
                        </div>
                    </div>
                </div>
            </Section>

            {/* ============ Section 3 - Remise ============ */}
            {(d.agentAssigne || d.preuve) && (
                <Section icon="fa-truck" title="Remise & preuve">
                    <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                        {d.agentAssigne && (
                            <DetailRow label="Agent assigné" value={d.agentAssigne} />
                        )}
                        {d.dateDepart && (
                            <DetailRow label="Départ" value={formatDateHeure(d.dateDepart)} />
                        )}
                        {d.dateRemise && (
                            <DetailRow label="Remise effective" value={formatDateHeure(d.dateRemise)} />
                        )}
                        {d.preuve && (
                            <DetailRow
                                label="Preuve"
                                value={
                                    <span className="inline-flex items-center gap-1.5 text-[13px] text-epo-green-700 font-medium">
                                        <i className={`fas ${d.preuve.type === 'signature' ? 'fa-signature' : 'fa-camera'} text-[11px]`} />
                                        {d.preuve.type === 'signature' ? 'Signature' : 'Photo'} · {d.preuve.recepteur}
                                    </span>
                                }
                            />
                        )}
                        {d.motifRetard && (
                            <DetailRow
                                label="Motif du retard"
                                value={<span className="font-medium text-epo-red-700">{d.motifRetard}</span>}
                            />
                        )}
                    </div>
                </Section>
            )}

            {/* ============ Section 4 - Timeline ============ */}
            <Section icon="fa-stream" title="Historique" last>
                <Timeline items={timeline} />
            </Section>
        </Modal>
    );
}

/* ============================================================
   SOUS-COMPOSANTS
   ============================================================ */

function Section({ icon, title, children, last = false }) {
    return (
        <div className={!last ? 'mb-5 pb-5 border-b border-epo-slate-100' : ''}>
            <h4 className="text-[13px] font-semibold text-epo-slate-800 mb-2.5 flex items-center gap-2">
                <i className={`fas ${icon} text-epo-green-600`} />
                {title}
            </h4>
            {children}
        </div>
    );
}

function DetailRow({ label, value }) {
    return (
        <div className="flex flex-col gap-1 py-2 border-b border-epo-slate-100 last:border-b-0 sm:flex-row sm:gap-4">
            <div className="flex-shrink-0 w-full text-[11.5px] font-semibold tracking-wider uppercase text-epo-slate-400 sm:w-36">
                {label}
            </div>
            <div className="flex-1 text-[13px] text-epo-slate-800">
                {value}
            </div>
        </div>
    );
}

/* ============================================================
   TIMELINE
   ============================================================ */

function buildTimeline(d) {
    const items = [];

    items.push({
        date: formatDateHeure(d.dateReceptionSCC),
        user: 'SCC',
        action: 'Réception au SCC après retour DG',
    });

    items.push({
        date: formatDateHeure(d.dateImputation),
        user: d.imputePar,
        action: `Imputation à ${d.structureDestinataire}`,
    });

    if (d.agentAssigne) {
        items.push({
            date: formatDateHeure(d.dateDepart || d.dateImputation),
            user: 'SCC',
            action: `Affecté à ${d.agentAssigne} (${d.modePrevu === 'liaison' ? 'liaison' : d.modePrevu === 'sp' ? 'remise SP' : 'main propre'})`,
        });
    }

    if (d.dateRemise) {
        items.push({
            date: formatDateHeure(d.dateRemise),
            user: d.agentAssigne || 'SCC',
            action: 'Remise physique au destinataire',
        });
    }

    if (d.preuve) {
        items.push({
            date: formatDateHeure(d.preuve.date),
            user: d.agentAssigne || 'SCC',
            action: `Preuve enregistrée (${d.preuve.type}) · Récepteur : ${d.preuve.recepteur}`,
        });
    }

    if (d.motifRetard) {
        items.push({
            date: formatDateHeure(d.dateDepart || d.dateImputation),
            user: 'SCC',
            action: `⚠️ Retard signalé - ${d.motifRetard}`,
        });
    }

    return items;
}