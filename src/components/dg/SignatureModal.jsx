// src/components/dg/SignatureModal.jsx
// Signature du DG : signer, ou rejeter avec un motif.
import { useState } from 'react';
import { Modal, Button, ChoixCarte, TEXTAREA_CLASS } from '../ui';
import ItemResume from './ItemResume';
import { TYPES_MOTIF_REJET } from '../../data/circuit.js';

export default function SignatureModal({ item, onClose, onSigner, onRejeter }) {
    const [choix, setChoix] = useState(null);
    const [type, setType] = useState('fond');
    const [motif, setMotif] = useState('');
    if (!item) return null;
    const rejet = choix === 'rejeter';
    const canValider = choix === 'signer' || (rejet && motif.trim().length >= 5);

    return (
        <Modal
            open
            onClose={onClose}
            title={`Signer ${item.id}`}
            titleIcon="fa-pen-nib"
            size="md"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button
                        variant={rejet ? 'danger' : 'primary'}
                        icon={rejet ? 'fa-xmark' : 'fa-pen-nib'}
                        disabled={!canValider}
                        onClick={() => (rejet ? onRejeter(item, { motif: motif.trim(), type }) : onSigner(item))}
                    >
                        {rejet ? 'Rejeter le document' : 'Signer'}
                    </Button>
                </>
            }
        >
            <ItemResume item={item} />

            <fieldset>
                <legend className="mb-2 text-sm font-semibold text-epo-slate-900">Votre décision</legend>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <ChoixCarte selected={choix === 'signer'} onClick={() => setChoix('signer')} icon="fa-pen-nib" titre="Signer" texte="Le document part pour envoi" />
                    <ChoixCarte selected={rejet} onClick={() => setChoix('rejeter')} icon="fa-xmark" titre="Rejeter" texte="Le document revient au SG" />
                </div>
            </fieldset>

            {rejet && (
                <div className="mt-4 space-y-4">
                    <fieldset>
                        <legend className="mb-2 text-sm font-semibold text-epo-slate-900">Le problème porte</legend>
                        <div className="inline-flex flex-wrap p-1 rounded-lg bg-epo-slate-100" role="radiogroup">
                            {Object.entries(TYPES_MOTIF_REJET).map(([k, label]) => (
                                <button
                                    key={k}
                                    type="button"
                                    role="radio"
                                    aria-checked={type === k}
                                    onClick={() => setType(k)}
                                    className={`h-9 px-3 text-sm rounded-md transition-colors ${type === k ? 'bg-white font-semibold text-epo-slate-900 shadow-soft' : 'text-epo-slate-700 hover:text-epo-slate-900'}`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </fieldset>
                    <div>
                        <label htmlFor="motif-rejet" className="block mb-1.5 text-sm font-semibold text-epo-slate-900">
                            Motif du rejet
                        </label>
                        <textarea id="motif-rejet" rows={3} value={motif} onChange={(e) => setMotif(e.target.value)} placeholder="Exemple : préciser les dates du congé" className={TEXTAREA_CLASS} />
                        <p className="mt-1 text-sm text-epo-slate-600">Le SG lira ce motif une fois la décision cochée par votre secrétariat.</p>
                    </div>
                </div>
            )}
        </Modal>
    );
}
