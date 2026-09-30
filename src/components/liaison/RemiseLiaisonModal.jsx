// src/components/liaison/RemiseLiaisonModal.jsx
import { useState, useEffect } from 'react';
import { Modal, Button } from '../ui';

export default function RemiseLiaisonModal({ remise, onClose }) {
    const [nomRecepteur, setNomRecepteur] = useState('');
    const [typePreuve, setTypePreuve] = useState('signature');
    const [preuveChargee, setPreuveChargee] = useState(false);

    useEffect(() => {
        if (!remise) return;
        setNomRecepteur(remise.destinataire?.personne || '');
        setTypePreuve('signature');
        setPreuveChargee(false);
    }, [remise]);

    if (!remise) return null;

    const canValider = preuveChargee && nomRecepteur.trim().length > 2;

    const handleValider = () => {
        alert(
            `Remise confirmée\n\n` +
            `→ Document : ${remise.documentNumero}\n` +
            `→ Destinataire : ${nomRecepteur}\n` +
            `→ Preuve : ${typePreuve}\n\n` +
            `La remise sera enregistrée dans la tournée.`
        );
        onClose();
    };

    return (
        <Modal
            open={!!remise}
            onClose={onClose}
            title="Confirmer la remise"
            titleIcon="fa-check-circle"
            size="md"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button
                        variant="primary"
                        icon="fa-check"
                        disabled={!canValider}
                        onClick={handleValider}
                    >
                        Confirmer la remise
                    </Button>
                </>
            }
        >
            {/* Document */}
            <div className="p-3 mb-4 rounded-lg bg-epo-slate-50">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-[12px] font-bold text-epo-slate-800">
                        {remise.documentNumero}
                    </span>
                    {remise.priorite === 'urgent' && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-epo-red-50 text-epo-red-700 text-[9.5px] font-bold">
                            <i className="fas fa-exclamation-circle text-[8px]" />
                            URGENT
                        </span>
                    )}
                </div>
                <div className="text-[13px] text-epo-slate-700">
                    {remise.documentObjet}
                </div>
            </div>

            {/* Destinataire */}
            <div className="mb-4">
                <label className="block mb-1.5 text-[12.5px] font-medium text-epo-slate-700">
                    Remis à <span className="text-epo-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={nomRecepteur}
                    onChange={(e) => setNomRecepteur(e.target.value)}
                    placeholder="Nom du destinataire"
                    className="w-full px-3 py-2.5 border rounded-lg border-epo-slate-300 text-[14px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                />
            </div>

            {/* Type de preuve */}
            <div className="mb-4">
                <label className="block mb-1.5 text-[12.5px] font-medium text-epo-slate-700">
                    Preuve <span className="text-epo-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            setTypePreuve('signature');
                            setPreuveChargee(false);
                        }}
                        className={`
                            p-3 rounded-lg border-2 text-left transition
                            ${typePreuve === 'signature'
                                ? 'border-epo-green-500 bg-epo-green-50'
                                : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                        `}
                    >
                        <i className={`fas fa-signature text-[14px] mb-1 block ${typePreuve === 'signature' ? 'text-epo-green-600' : 'text-epo-slate-400'}`} />
                        <div className="text-[12px] font-semibold text-epo-slate-800">
                            Signature
                        </div>
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setTypePreuve('photo');
                            setPreuveChargee(false);
                        }}
                        className={`
                            p-3 rounded-lg border-2 text-left transition
                            ${typePreuve === 'photo'
                                ? 'border-epo-green-500 bg-epo-green-50'
                                : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                        `}
                    >
                        <i className={`fas fa-camera text-[14px] mb-1 block ${typePreuve === 'photo' ? 'text-epo-green-600' : 'text-epo-slate-400'}`} />
                        <div className="text-[12px] font-semibold text-epo-slate-800">
                            Photo
                        </div>
                    </button>
                </div>
            </div>

            {/* Zone de preuve */}
            <button
                type="button"
                onClick={() => setPreuveChargee(true)}
                className={`
                    w-full p-5 rounded-lg border-2 border-dashed text-center transition mb-4
                    ${preuveChargee
                        ? 'border-epo-green-500 bg-epo-green-50'
                        : 'border-epo-slate-300 bg-white hover:border-epo-green-400 hover:bg-epo-slate-50'}
                `}
            >
                {preuveChargee ? (
                    <>
                        <i className="mb-2 text-3xl fas fa-check-circle text-epo-green-500" />
                        <div className="text-[13px] font-semibold text-epo-green-800">
                            Preuve enregistrée
                        </div>
                        <div className="text-[11.5px] text-epo-green-700 mt-1">
                            Cliquez pour remplacer
                        </div>
                    </>
                ) : (
                    <>
                        <i className={`fas ${typePreuve === 'signature' ? 'fa-signature' : 'fa-camera'} text-3xl mb-2 text-epo-slate-400`} />
                        <div className="text-[13px] font-semibold text-epo-slate-700">
                            {typePreuve === 'signature'
                                ? 'Faire signer le récepteur'
                                : 'Prendre une photo'}
                        </div>
                    </>
                )}
            </button>

            {/* RG-25 */}
            {!canValider && (
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-epo-yellow-50 border border-epo-yellow-200">
                    <i className="fas fa-lock text-epo-yellow-600 text-[10px] mt-0.5" />
                    <span className="text-[11px] text-epo-yellow-800">
                        <strong>RG-25</strong> - Preuve et nom du récepteur obligatoires
                    </span>
                </div>
            )}
        </Modal>
    );
}