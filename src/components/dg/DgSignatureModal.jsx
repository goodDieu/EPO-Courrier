// src/components/dg/DgSignatureModal.jsx
import { useState, useEffect } from 'react';
import { Modal, Button } from '../ui';
import { PRIORITES } from '../../data/dashboardDG.js';

export default function DgSignatureModal({ document, onClose }) {
    const [modeRejet, setModeRejet] = useState(false);
    const [motifRejet, setMotifRejet] = useState('');

    useEffect(() => {
        if (!document) return;
        setModeRejet(false);
        setMotifRejet('');
    }, [document]);

    if (!document) return null;

    const d = document;
    const prio = PRIORITES[d.priorite];
    const canConfirmRejet = motifRejet.trim().length > 5;

    const handleSigner = () => {
        alert(
            `Document signé : ${d.id}\n\n` +
            `→ Signature enregistrée\n` +
            `→ Le SG sera automatiquement notifié (RG-18)\n` +
            `→ Le document sera transmis au SCC pour traitement`
        );
        onClose();
    };

    const handleRejeter = () => {
        if (!canConfirmRejet) return;
        alert(
            `Document rejeté : ${d.id}\n\n` +
            `→ Motif : ${motifRejet}\n` +
            `→ Le SG sera automatiquement notifié (RG-18)\n` +
            `→ Une entrée est ajoutée à la timeline du dossier`
        );
        onClose();
    };

    return (
        <Modal
            open={!!d}
            onClose={onClose}
            title={`Signer -${d.objet}`}
            titleIcon="fa-pen"
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    <Button variant="outline" icon="fa-pen">
                        Annoter
                    </Button>
                    {!modeRejet ? (
                        <>
                            <Button
                                variant="redOutline"
                                icon="fa-times"
                                onClick={() => setModeRejet(true)}
                            >
                                Rejeter
                            </Button>
                            <Button variant="primary" icon="fa-check" onClick={handleSigner}>
                                Signer
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setModeRejet(false);
                                    setMotifRejet('');
                                }}
                            >
                                Annuler le rejet
                            </Button>
                            <Button
                                variant="redOutline"
                                icon="fa-times"
                                disabled={!canConfirmRejet}
                                onClick={handleRejeter}
                            >
                                Confirmer le rejet
                            </Button>
                        </>
                    )}
                </>
            }
        >
            {/* En-tête */}
            <div className="flex flex-wrap items-center gap-2 pb-5 mb-5 border-b border-epo-slate-100">
                <span className="font-mono text-[12.5px] font-bold text-epo-slate-800 bg-epo-slate-100 px-2.5 py-1 rounded-full">
                    {d.id}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${prio.chip}`}>
                    {prio.label}
                </span>
                <span className="text-[12.5px] text-epo-slate-500">
                    Provenance : <strong className="text-epo-slate-700">{d.provenence}</strong>
                </span>
            </div>

            {/* Métadonnées */}
            <div className="space-y-0">
                <DetailRow label="Objet" value={<strong>{d.objet}</strong>} />
                <DetailRow label="Expéditeur" value={d.expediteur} />
                <DetailRow label="Date du document" value={new Date(d.dateDocument).toLocaleDateString('fr-FR')} />
                <DetailRow label="Description" value={d.description} />
                <DetailRow
                    label="Fonds de dossier"
                    value={
                        <div className="flex flex-wrap gap-2">
                            {(d.pieces || []).map((p, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-epo-slate-100 text-[12px] text-epo-slate-700"
                                >
                                    <i className="fas fa-paperclip text-epo-slate-400 text-[10px]" />
                                    {p}
                                </span>
                            ))}
                        </div>
                    }
                    last
                />
            </div>

            {/* Contenu du document */}
            <div className="p-4 my-4 rounded-lg bg-epo-slate-50">
                <strong className="text-[13px] text-epo-slate-500 uppercase tracking-wider block mb-2">
                    Contenu du document
                </strong>
                <p className="text-[14px] text-epo-slate-700 leading-relaxed">
                    {d.contenu}
                </p>
            </div>

            {/* Motif de rejet précédent (si re-signature) */}
            {d.motifRejetPrecedent && (
                <div className="flex items-start gap-2 p-3 mb-4 border rounded-lg bg-epo-red-50 border-epo-red-200">
                    <i className="fas fa-history text-epo-red-600 mt-0.5" />
                    <div className="text-[12px] text-epo-red-800">
                        <strong>Rejet précédent :</strong> {d.motifRejetPrecedent}
                    </div>
                </div>
            )}

            {/* Zone de motif de rejet (RG-19) */}
            {modeRejet && (
                <div className="p-4 mb-4 border rounded-lg border-epo-red-200 bg-epo-red-50/40">
                    <label className="block text-[12.5px] font-semibold text-epo-red-700 mb-2">
                        Motif du rejet <span className="text-epo-red-500">*</span>
                        <span className="ml-2 font-normal text-epo-slate-500">
                            (RG-19 -obligatoire · RG-18 -notifié au SG)
                        </span>
                    </label>
                    <textarea
                        rows={3}
                        value={motifRejet}
                        onChange={(e) => setMotifRejet(e.target.value)}
                        placeholder="Précisez le motif du rejet…"
                        className="w-full px-3 py-2.5 border rounded-lg border-epo-red-200 text-[13.5px] focus:outline-none focus:border-epo-red-500 focus:ring-2 focus:ring-epo-red-500/10 resize-y"
                    />
                    <div className="mt-2 text-[11.5px] text-epo-slate-500">
                        Minimum 5 caractères · Ce motif sera visible par le SG et ajouté à la timeline du dossier.
                    </div>
                </div>
            )}
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