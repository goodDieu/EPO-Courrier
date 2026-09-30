// src/components/liaison/DechargeModal.jsx
import { Modal, Button } from '../ui';
import {
    TYPES_DECHARGE,
    formatDateHeure,
} from '../../data/dechargesLiaison.js';

export default function DechargeModal({ decharge, onClose }) {
    if (!decharge) return null;

    const d = decharge;
    const type = TYPES_DECHARGE[d.typePreuve];

    const handleImprimer = () => {
        alert(
            `Impression de la décharge ${d.id}\n\n` +
            `→ Format PDF/A\n` +
            `→ Seront inclus : aperçu de la preuve, métadonnées, hash d'intégrité`
        );
    };

    const handleTelecharger = () => {
        alert(
            `Téléchargement de la décharge ${d.id}\n\n` +
            `→ Fichier : ${d.id}.pdf\n` +
            `→ Taille estimée : 245 Ko`
        );
    };

    return (
        <Modal
            open={!!d}
            onClose={onClose}
            title={`Décharge ${d.id}`}
            titleIcon="fa-file-signature"
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    <Button variant="outline" icon="fa-print" onClick={handleImprimer}>
                        Imprimer
                    </Button>
                    <Button variant="primary" icon="fa-download" onClick={handleTelecharger}>
                        Télécharger PDF
                    </Button>
                </>
            }
        >
            {/* ============ Bandeau vert (preuve validée) ============ */}
            <div className="flex items-center gap-3 p-4 mb-5 border rounded-lg bg-epo-green-50 border-epo-green-200">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-full bg-epo-green-500">
                    <i className="fas fa-check" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-semibold text-epo-green-900">
                        Décharge enregistrée et vérifiée
                    </div>
                    <div className="text-[11.5px] text-epo-green-800 mt-0.5">
                        Signature manuscrite conforme (RG-22) · Hash d'intégrité vérifié (§12.4)
                    </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${type.chip}`}>
                    <i className={`fas ${type.icon} text-[10px]`} />
                    {type.label}
                </span>
            </div>

            {/* ============ Zone d'aperçu ============ */}
            <div className="p-8 mb-5 text-center border rounded-lg bg-epo-slate-50 border-epo-slate-200">
                {d.typePreuve === 'signature' ? (
                    <>
                        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-white border rounded-full border-epo-slate-200">
                            <i className="fas fa-signature text-[20px] text-epo-slate-700" />
                        </div>
                        <div className="mx-auto max-w-[260px] pb-3 border-b-2 border-epo-slate-400">
                            <div className="text-[28px] italic font-serif text-epo-slate-800">
                                {d.signataire.nom.replace('M. ', '').replace('Mme ', '').replace('Pr. ', '')}
                            </div>
                        </div>
                        <div className="mt-3 text-[11.5px] text-epo-slate-500">
                            Signature manuscrite apposée sur tablette SCC-042
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center justify-center w-40 mx-auto mb-4 bg-white border rounded-lg h-28 border-epo-slate-300">
                            <i className="text-4xl fas fa-camera text-epo-slate-400" />
                        </div>
                        <div className="text-[11.5px] text-epo-slate-500">
                            Photo prise lors de la remise
                        </div>
                    </>
                )}
            </div>

            {/* ============ Métadonnées détaillées ============ */}
            <h4 className="text-[11.5px] font-semibold uppercase tracking-wider text-epo-slate-500 mb-2">
                Informations de la décharge
            </h4>

            <div className="space-y-0">
                <DetailRow label="Référence" value={<span className="font-mono">{d.id}</span>} />
                <DetailRow label="Document remis" value={
                    <div>
                        <div className="font-mono text-[12.5px] font-medium">{d.documentNumero}</div>
                        <div className="text-[11.5px] text-epo-slate-600 mt-0.5">{d.documentObjet}</div>
                    </div>
                } />
                <DetailRow label="Signataire" value={
                    <div>
                        <div className="font-medium">{d.signataire.nom}</div>
                        <div className="text-[11.5px] text-epo-slate-500">{d.signataire.qualite} · {d.signataire.structure}</div>
                        <div className="text-[10.5px] text-epo-slate-400 font-mono mt-0.5">{d.signataire.matricule}</div>
                    </div>
                } />
                <DetailRow label="Lieu" value={d.lieu} />
                <DetailRow label="Date de signature" value={formatDateHeure(d.dateSignature)} />
                <DetailRow label="Agent de liaison" value={d.agentLiaison} />
                {d.tourneeId && (
                    <DetailRow label="Tournée" value={
                        <span className="font-mono text-[12px]">{d.tourneeId}</span>
                    } />
                )}
                <DetailRow label="Appareil" value={
                    <span className="inline-flex items-center gap-1.5">
                        <i className="fas fa-tablet-alt text-[10px] text-epo-slate-400" />
                        {d.appareil}
                    </span>
                } />
                <DetailRow label="Adresse IP" value={<span className="font-mono text-[12px]">{d.ip}</span>} />
            </div>

            {/* ============ Hash d'intégrité ============ */}
            <div className="p-4 mt-5 border rounded-lg bg-epo-slate-50 border-epo-slate-200">
                <div className="flex items-center gap-2 mb-2">
                    <i className="fas fa-shield-halved text-epo-green-600" />
                    <span className="text-[11.5px] font-semibold uppercase tracking-wider text-epo-slate-500">
                        Hash d'intégrité (SHA-256)
                    </span>
                </div>
                <div className="font-mono text-[10.5px] text-epo-slate-700 break-all leading-relaxed">
                    {d.hash}
                </div>
                <div className="mt-2 text-[11px] text-epo-slate-500">
                    <i className="fas fa-info-circle text-[9.5px] mr-1" />
                    Permet de vérifier que la décharge n'a pas été altérée depuis son enregistrement.
                </div>
            </div>
        </Modal>
    );
}

function DetailRow({ label, value }) {
    return (
        <div className="flex flex-col gap-1 py-3 border-b sm:flex-row sm:gap-4 border-epo-slate-100 last:border-b-0">
            <div className="w-full sm:w-40 flex-shrink-0 text-[11.5px] font-semibold uppercase tracking-wider text-epo-slate-400">
                {label}
            </div>
            <div className="flex-1 text-[13px] text-epo-slate-800">{value}</div>
        </div>
    );
}