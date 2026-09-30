// src/components/scc/DepartDetailModal.jsx
import { Modal, Button, StatusBadge, Timeline } from '../ui';
import ModeDepartBadge from './ModeDepartBadge';
import {
    NATURES_SORTANTS,
    formatDate,
    formatDateHeure,
} from '../../data/departsSCC.js';

export default function DepartDetailModal({ depart, onClose, onTraiter }) {
    if (!depart) return null;

    const d = depart;
    const nature = NATURES_SORTANTS[d.nature];
    const canTraiter = ['a-numeroter', 'a-cacheter', 'pret-expedition'].includes(d.etat);
    const timeline = buildTimeline(d);

    return (
        <Modal
            open={!!d}
            onClose={onClose}
            title={`Départ ${d.numeroSortant || d.id} - ${d.objet}`}
            titleIcon="fa-paper-plane"
            size="xl"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    <Button variant="outline" icon="fa-print">
                        Imprimer
                    </Button>
                    {canTraiter && (
                        <Button
                            variant="primary"
                            icon="fa-cog"
                            onClick={() => onTraiter?.(d)}
                        >
                            Traiter
                        </Button>
                    )}
                </>
            }
        >
            {/* ============ En-tête ============ */}
            <div className="pb-5 mb-5 border-b border-epo-slate-100">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <ModeDepartBadge mode={d.mode} />
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold bg-epo-slate-100 text-epo-slate-700">
                        <i className={`fas ${nature?.icon} text-[10px]`} />
                        {nature?.label}
                    </span>
                    <StatusBadge status={d.etat} />
                    {d.cachet && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold bg-epo-green-50 text-epo-green-700">
                            <i className="fas fa-stamp text-[10px]" />
                            Cacheté
                        </span>
                    )}
                </div>

                <h2 className="text-[18px] font-bold tracking-tight text-epo-slate-900">
                    {d.objet}
                </h2>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-2 text-[12.5px] text-epo-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                        <i className="fas fa-user-tie text-[10.5px] text-epo-slate-400" />
                        {d.beneficiaire}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <i className="fas fa-building text-[10.5px] text-epo-slate-400" />
                        {d.destinataire.structure}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <i className="fas fa-calendar text-[10.5px] text-epo-slate-400" />
                        Signé le {formatDate(d.dateSignature)}
                    </span>
                </div>
            </div>

            {/* ============ Section 1 - Traitement SCC ============ */}
            <Section icon="fa-cog" title="Traitement SCC">
                <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                    <DetailRow
                        label="Numéro sortant"
                        value={d.numeroSortant ? <strong className="font-mono">{d.numeroSortant}</strong> : <span className="text-epo-slate-400">Non attribué</span>}
                    />
                    <DetailRow
                        label="Référence interne"
                        value={<span className="font-mono text-[12px]">{d.id}</span>}
                    />
                    <DetailRow
                        label="Document source"
                        value={<span className="font-mono text-[12px]">{d.documentSource}</span>}
                    />
                    <DetailRow label="Produit par" value={d.produitPar} />
                    <DetailRow
                        label="Signature"
                        value={
                            <span className={`inline-flex items-center gap-1.5 text-[13px] font-medium ${d.signePar === 'dg' ? 'text-epo-green-600' : 'text-epo-slate-700'}`}>
                                <i className={`fas ${d.signePar === 'dg' ? 'fa-check-circle' : 'fa-stamp'} text-[11px]`} />
                                {d.signePar === 'dg' ? 'Signé par le DG' : 'Signé par le SG par délégation'}
                            </span>
                        }
                    />
                    <DetailRow
                        label="Reçu au SCC le"
                        value={formatDateHeure(d.dateReceptionSCC)}
                    />
                    <DetailRow
                        label="Cachet"
                        value={
                            d.cachet
                                ? <span className="inline-flex items-center gap-1.5 text-[13px] text-epo-green-700 font-medium"><i className="fas fa-check-circle text-[11px]" />Apposé</span>
                                : <span className="inline-flex items-center gap-1.5 text-[13px] text-epo-yellow-700 font-medium"><i className="fas fa-clock text-[11px]" />En attente</span>
                        }
                    />
                    <DetailRow label="Pièces" value={`${d.pieces} pièce${d.pieces > 1 ? 's' : ''}`} />
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

            {/* ============ Section 3 - Expédition ============ */}
            {(d.expedition || d.transmission || d.preuvePostale) && (
                <Section icon="fa-truck" title="Expédition & preuve">
                    <div className="flex flex-col gap-2">
                        {d.expedition && (
                            <div className="flex items-center gap-3 p-3 bg-white border rounded-lg border-epo-slate-200">
                                <span className="flex items-center justify-center flex-shrink-0 rounded-lg w-9 h-9 bg-epo-slate-100 text-epo-slate-600">
                                    <i className="fas fa-envelope" />
                                </span>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[12.5px] font-semibold text-epo-slate-800">
                                        Envoi postal - {d.expedition.reference}
                                    </div>
                                    <div className="text-[11.5px] text-epo-slate-500">
                                        Expédié le {formatDateHeure(d.expedition.dateEnvoi)}
                                    </div>
                                </div>
                            </div>
                        )}

                        {d.transmission && (
                            <div className="flex items-center gap-3 p-3 bg-white border rounded-lg border-epo-slate-200">
                                <span className="flex items-center justify-center flex-shrink-0 rounded-lg w-9 h-9 bg-epo-green-50 text-epo-green-600">
                                    <i className="fas fa-truck" />
                                </span>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[12.5px] font-semibold text-epo-slate-800">
                                        Liaison - {d.transmission.id}
                                    </div>
                                    <div className="text-[11.5px] text-epo-slate-500">
                                        Remis par {d.transmission.agent} le {formatDateHeure(d.transmission.dateRemise)}
                                    </div>
                                </div>
                                {d.transmission.preuve && (
                                    <span className="flex-shrink-0 inline-flex items-center gap-1 text-[11px] text-epo-green-600 font-medium">
                                        <i className={`fas ${d.transmission.preuve.type === 'signature' ? 'fa-signature' : 'fa-camera'} text-[10px]`} />
                                        Preuve
                                    </span>
                                )}
                            </div>
                        )}

                        {d.preuvePostale && (
                            <div className="flex items-center gap-3 p-3 bg-white border rounded-lg border-epo-slate-200">
                                <span className="flex items-center justify-center flex-shrink-0 rounded-lg w-9 h-9 bg-epo-green-50 text-epo-green-600">
                                    <i className="fas fa-file-invoice" />
                                </span>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[12.5px] font-semibold text-epo-slate-800">
                                        Preuve postale - {d.preuvePostale.reference}
                                    </div>
                                    <div className="text-[11.5px] text-epo-slate-500">
                                        Accusé de réception enregistré
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Section>
            )}

            {/* ============ Section 4 - Timeline ============ */}
            <Section icon="fa-stream" title="Historique du traitement" last>
                <Timeline items={timeline} />
            </Section>
        </Modal>
    );
}

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

function buildTimeline(d) {
    const items = [];

    items.push({
        date: formatDateHeure(d.dateSignature),
        user: d.signePar === 'dg' ? 'Pr. NIKIÉMA Adama (DG)' : 'M. OUÉDRAOGO Salif (SG)',
        action: d.signePar === 'dg' ? 'Signature du DG' : 'Signature par délégation',
    });

    items.push({
        date: formatDateHeure(d.dateReceptionSCC),
        user: 'SP-DG → SCC',
        action: 'Réception au SCC pour traitement',
    });

    if (d.numeroSortant) {
        items.push({
            date: formatDateHeure(addMinutes(d.dateReceptionSCC, 30)),
            user: d.agentSCC || 'SCC',
            action: `Numérotation - ${d.numeroSortant}`,
        });
    }

    if (d.cachet) {
        items.push({
            date: formatDateHeure(addMinutes(d.dateReceptionSCC, 35)),
            user: d.agentSCC || 'SCC',
            action: 'Apposition du cachet EPO',
        });
    }

    if (d.expedition) {
        items.push({
            date: formatDateHeure(d.expedition.dateEnvoi),
            user: 'SCC',
            action: `Expédition postale - ${d.expedition.reference}`,
        });
    }

    if (d.transmission) {
        items.push({
            date: formatDateHeure(d.transmission.dateRemise),
            user: d.transmission.agent,
            action: 'Remise au destinataire · preuve enregistrée',
        });
    }

    if (d.preuvePostale) {
        items.push({
            date: formatDateHeure(addMinutes(d.expedition?.dateEnvoi || d.dateReceptionSCC, 4320)),
            user: 'Service postal',
            action: `Accusé de réception - ${d.preuvePostale.reference}`,
        });
    }

    if (d.etat === 'archive') {
        items.push({
            date: formatDateHeure(addMinutes(d.dateReceptionSCC, 7200)),
            user: 'SCC',
            action: 'Archivage · copie numérique conservée',
        });
    }

    return items;
}

function addMinutes(iso, min) {
    const dt = new Date(iso);
    dt.setMinutes(dt.getMinutes() + min);
    return dt.toISOString();
}