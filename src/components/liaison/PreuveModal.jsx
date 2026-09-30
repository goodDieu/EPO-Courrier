// src/components/liaison/PreuveModal.jsx
import { Modal, Button } from '../ui';
import {
    TYPES_PREUVE,
    formatDateHeure,
} from '../../data/remisesLiaison.js';

export default function PreuveModal({ remise, onClose }) {
    if (!remise) return null;

    const r = remise;
    const preuve = TYPES_PREUVE[r.typePreuve];

    return (
        <Modal
            open={!!r}
            onClose={onClose}
            title={`Preuve ${r.documentNumero}`}
            titleIcon="fa-shield-halved"
            size="md"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    <Button variant="outline" icon="fa-download">
                        Télécharger
                    </Button>
                </>
            }
        >
            {/* En-tête */}
            <div className="flex flex-wrap items-center gap-2 pb-5 mb-5 border-b border-epo-slate-100">
                <span className="font-mono text-[12.5px] font-bold text-epo-slate-800 bg-epo-slate-100 px-2.5 py-1 rounded-full">
                    {r.documentNumero}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${preuve.chip}`}>
                    <i className={`fas ${preuve.icon} text-[10px]`} />
                    Preuve {preuve.label}
                </span>
            </div>

            {/* Zone d'aperçu (mock) */}
            <div className="p-8 mb-5 text-center border rounded-lg bg-epo-slate-50 border-epo-slate-200">
                {r.typePreuve === 'signature' ? (
                    <>
                        <i className="mb-4 text-5xl fas fa-signature text-epo-slate-700" />
                        <div className="p-4 border-b-2 border-epo-slate-300 max-w-[200px] mx-auto">
                            <div className="text-[26px] font-serif italic text-epo-slate-700">
                                {r.destinataire.personne.replace('M. ', '').replace('Mme ', '').replace('Pr. ', '')}
                            </div>
                        </div>
                        <div className="text-[11.5px] text-epo-slate-500 mt-3">
                            Signature manuscrite enregistrée sur tablette
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center justify-center w-32 h-24 mx-auto mb-4 bg-white border rounded-lg border-epo-slate-300">
                            <i className="text-3xl fas fa-camera text-epo-slate-400" />
                        </div>
                        <div className="text-[11.5px] text-epo-slate-500">
                            Photo prise lors de la remise
                        </div>
                    </>
                )}
            </div>

            {/* Métadonnées */}
            <div className="space-y-0">
                <DetailRow label="Destinataire" value={
                    <div>
                        <div className="font-medium">{r.destinataire.personne}</div>
                        <div className="text-[11.5px] text-epo-slate-500">{r.destinataire.qualite}</div>
                    </div>
                } />
                <DetailRow label="Structure" value={r.destinataire.structure} />
                <DetailRow label="Date de remise" value={formatDateHeure(r.dateRemise)} />
                <DetailRow label="Durée" value={`${r.duree} min`} />
                <DetailRow label="Référence preuve" value={<span className="font-mono text-[12px]">{r.preuveRef}</span>} />
                <DetailRow
                    label="Hash d'intégrité"
                    value={
                        <div className="font-mono text-[10.5px] text-epo-slate-700 break-all leading-relaxed bg-epo-slate-50 p-2 rounded border border-epo-slate-200">
                            {r.hash}
                        </div>
                    }
                    last
                />
            </div>
        </Modal>
    );
}

function DetailRow({ label, value, last = false }) {
    return (
        <div
            className={`
                flex flex-col sm:flex-row gap-1 sm:gap-4 py-3
                ${!last ? 'border-b border-epo-slate-100' : ''}
            `}
        >
            <div className="w-full sm:w-40 flex-shrink-0 text-[12px] font-semibold uppercase tracking-wider text-epo-slate-500">
                {label}
            </div>
            <div className="flex-1 text-[13.5px] text-epo-slate-800">{value}</div>
        </div>
    );
}