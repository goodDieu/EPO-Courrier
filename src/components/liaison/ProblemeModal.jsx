// src/components/liaison/ProblemeModal.jsx
// Remise impossible : l'agent dit pourquoi, le Service Courrier est prévenu.
import { useState } from 'react';
import { Modal, Button, ChoixCarte, TEXTAREA_CLASS } from '../ui';

const MOTIFS = ['Destinataire absent', 'Bureau fermé', 'Refus de signer la décharge', 'Autre raison'];

export default function ProblemeModal({ remise, onClose, onSignaler }) {
    const [motif, setMotif] = useState(null);
    const [precision, setPrecision] = useState('');
    if (!remise) return null;
    const autre = motif === 'Autre raison';
    const canValider = motif && (!autre || precision.trim().length >= 5);
    const texte = autre ? precision.trim() : precision.trim() ? `${motif} : ${precision.trim()}` : motif;

    return (
        <Modal
            open
            onClose={onClose}
            title={`Remise impossible · ${remise.documentNumero}`}
            titleIcon="fa-triangle-exclamation"
            size="md"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button icon="fa-paper-plane" disabled={!canValider} onClick={() => onSignaler(remise, texte)}>
                        Prévenir le Service Courrier
                    </Button>
                </>
            }
        >
            <p className="mb-4 text-sm text-epo-slate-800">
                {remise.documentObjet} · pour {remise.destinataire.personne} ({remise.destinataire.structure})
            </p>
            <fieldset className="mb-4">
                <legend className="mb-2 text-sm font-semibold text-epo-slate-900">Que s'est-il passé ?</legend>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {MOTIFS.map((m) => (
                        <ChoixCarte key={m} selected={motif === m} onClick={() => setMotif(m)} titre={m} />
                    ))}
                </div>
            </fieldset>
            <label htmlFor="precision" className="block mb-1.5 text-sm font-semibold text-epo-slate-900">
                Précision {!autre && <span className="font-normal text-epo-slate-500">(facultatif)</span>}
            </label>
            <textarea id="precision" rows={2} value={precision} onChange={(e) => setPrecision(e.target.value)} placeholder="Exemple : en mission jusqu'à jeudi" className={TEXTAREA_CLASS} />
        </Modal>
    );
}
