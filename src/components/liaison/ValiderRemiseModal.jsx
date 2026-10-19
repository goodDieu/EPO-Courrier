// src/components/liaison/ValiderRemiseModal.jsx
// Remise faite : preuve (photo ou signature) et nom de la personne qui a reçu.
import { useState } from 'react';
import { Modal, Button, ChoixCarte } from '../ui';
import { formatHeure } from '../../data/liaisonsSCC.js';

const INPUT_CLASS = 'w-full h-11 px-3 text-sm bg-white border rounded-lg outline-none border-epo-slate-300 text-epo-slate-900 focus:border-epo-green-600 focus:ring-2 focus:ring-epo-green-600/20';

export default function ValiderRemiseModal({ remise, onClose, onValider }) {
    const [type, setType] = useState('signature');
    const [preuve, setPreuve] = useState(false);
    const [recepteur, setRecepteur] = useState(() => remise?.destinataire.personne || '');
    if (!remise) return null;
    const canValider = preuve && recepteur.trim().length > 2;

    return (
        <Modal
            open
            onClose={onClose}
            title={`Remise du ${remise.documentNumero}`}
            titleIcon="fa-hand-holding"
            size="md"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button icon="fa-check" disabled={!canValider} onClick={() => onValider(remise, { typePreuve: type, nomRecepteur: recepteur.trim() })}>
                        Confirmer la remise
                    </Button>
                </>
            }
        >
            <div className="p-4 mb-5 border rounded-lg border-epo-slate-200">
                <p className="text-sm font-semibold tabular-nums text-epo-slate-900">{remise.documentNumero}</p>
                <p className="mt-1 text-base font-semibold text-epo-slate-900">{remise.documentObjet}</p>
                <p className="mt-1 text-sm text-epo-slate-600">
                    Pour {remise.destinataire.personne} · {remise.destinataire.structure} · prévu à {formatHeure(remise.heurePrevue)}
                </p>
            </div>

            <fieldset className="mb-4">
                <legend className="mb-2 text-sm font-semibold text-epo-slate-900">Preuve de remise</legend>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <ChoixCarte selected={type === 'signature'} onClick={() => {
                        setType('signature');
                        setPreuve(false);
                    }} icon="fa-signature" titre="Signature" texte="La personne signe sur la tablette" />
                    <ChoixCarte selected={type === 'photo'} onClick={() => {
                        setType('photo');
                        setPreuve(false);
                    }} icon="fa-camera" titre="Photo" texte="Photo de la décharge signée" />
                </div>
                <button
                    type="button"
                    onClick={() => setPreuve(true)}
                    className={`w-full mt-3 p-5 text-center border-2 border-dashed rounded-lg transition-colors ${preuve ? 'border-epo-green-600 bg-epo-green-50' : 'border-epo-slate-300 hover:border-epo-slate-400 bg-white'}`}
                >
                    <i className={`fas ${preuve ? 'fa-circle-check text-epo-green-700' : type === 'signature' ? 'fa-signature text-epo-slate-400' : 'fa-camera text-epo-slate-400'} text-2xl`} aria-hidden="true" />
                    <span className="block mt-2 text-sm font-semibold text-epo-slate-900">
                        {preuve ? (type === 'signature' ? 'Signature enregistrée' : 'Photo enregistrée') : type === 'signature' ? 'Toucher ici pour faire signer' : 'Toucher ici pour prendre la photo'}
                    </span>
                </button>
            </fieldset>

            <label htmlFor="recepteur" className="block mb-1.5 text-sm font-semibold text-epo-slate-900">
                Nom de la personne qui a reçu
            </label>
            <input id="recepteur" value={recepteur} onChange={(e) => setRecepteur(e.target.value)} className={INPUT_CLASS} />
        </Modal>
    );
}
