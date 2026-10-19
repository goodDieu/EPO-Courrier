// src/components/circuit/VisaModal.jsx
// Visa du SG sur un document à signer : bon à signer, ou renvoi pour correction.
import { useState } from 'react';
import { Modal, Button, ChoixCarte, Echeance, TEXTAREA_CLASS } from '../ui';

export default function VisaModal({ document: doc, lignes = [], onClose, onViser, onRenvoyer }) {
    const [choix, setChoix] = useState(null);
    const [texte, setTexte] = useState('');

    if (!doc) return null;
    const renvoi = choix === 'renvoyer';
    const canValider = choix === 'viser' || (renvoi && texte.trim().length >= 5);

    return (
        <Modal
            open
            onClose={onClose}
            title={`Viser le document ${doc.id}`}
            titleIcon="fa-stamp"
            size="md"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button
                        icon={renvoi ? 'fa-rotate-left' : 'fa-stamp'}
                        disabled={!canValider}
                        onClick={() => (renvoi ? onRenvoyer(doc, texte.trim()) : onViser(doc, texte.trim()))}
                    >
                        {renvoi ? 'Renvoyer pour correction' : choix === 'viser' ? 'Viser et envoyer au DG' : 'Valider'}
                    </Button>
                </>
            }
        >
            <div className="p-4 mb-5 border rounded-lg border-epo-slate-200">
                <p className="text-sm font-semibold tabular-nums text-epo-slate-900">{doc.id}</p>
                <p className="mt-1 text-base font-semibold text-epo-slate-900">{doc.objet}</p>
                <dl className="grid grid-cols-1 mt-3 text-sm gap-x-6 gap-y-1.5 sm:grid-cols-2">
                    {lignes.filter(Boolean).map(([terme, valeur]) => (
                        <div key={terme} className="flex gap-2">
                            <dt className="text-epo-slate-500">{terme} :</dt>
                            <dd className="font-medium text-epo-slate-900">{valeur}</dd>
                        </div>
                    ))}
                    {doc.echeance && (
                        <div className="flex gap-2">
                            <dt className="text-epo-slate-500">Délai :</dt>
                            <dd>
                                <Echeance iso={doc.echeance} />
                            </dd>
                        </div>
                    )}
                </dl>
            </div>

            <fieldset>
                <legend className="mb-2 text-sm font-semibold text-epo-slate-900">Votre décision</legend>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <ChoixCarte selected={choix === 'viser'} onClick={() => setChoix('viser')} icon="fa-stamp" titre="Vu, bon à signer" texte="Le document part au secrétariat du DG" />
                    <ChoixCarte selected={renvoi} onClick={() => setChoix('renvoyer')} icon="fa-rotate-left" titre="À corriger" texte="Le document revient au rédacteur" />
                </div>
            </fieldset>

            {choix && (
                <div className="mt-4">
                    <label htmlFor="texte-visa" className="block mb-1.5 text-sm font-semibold text-epo-slate-900">
                        {renvoi ? 'Ce qu\'il faut corriger' : 'Observation pour le DG'}
                        {!renvoi && <span className="font-normal text-epo-slate-500"> (facultatif)</span>}
                    </label>
                    <textarea
                        id="texte-visa"
                        rows={2}
                        value={texte}
                        onChange={(e) => setTexte(e.target.value)}
                        placeholder={renvoi ? 'Exemple : vérifier les dates du congé' : 'Exemple : à signer avant vendredi'}
                        className={TEXTAREA_CLASS}
                    />
                </div>
            )}
        </Modal>
    );
}
