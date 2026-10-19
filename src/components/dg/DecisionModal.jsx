// src/components/dg/DecisionModal.jsx
// Décision du DG sur un courrier reçu (avis) ou un document à valider.
import { useState } from 'react';
import { Modal, Button, ChoixCarte, TEXTAREA_CLASS } from '../ui';
import ItemResume from './ItemResume';

const AVIS_RAPIDES = ['Vu. Imputer à la structure concernée.', 'Vu. Préparer un projet de réponse.', 'Vu. Me revoir avec le dossier.', 'Vu. Pour information.'];

export default function DecisionModal({ item, onClose, onAvis, onValider }) {
    const courrier = item?.sorte === 'courrier';
    const [choix, setChoix] = useState(courrier ? 'avis' : null);
    const [texte, setTexte] = useState('');
    if (!item) return null;
    const refus = choix === 'refuser';
    const canValider = courrier ? texte.trim().length >= 3 : choix === 'valider' || (refus && texte.trim().length >= 5);

    const confirmer = () => {
        if (courrier) onAvis(item, texte.trim());
        else onValider(item, { valide: !refus, motif: texte.trim() });
    };

    return (
        <Modal
            open
            onClose={onClose}
            title={courrier ? `Donner votre avis · ${item.id}` : `Valider ${item.id}`}
            titleIcon={courrier ? 'fa-comment' : 'fa-check-double'}
            size="md"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button variant={refus ? 'danger' : 'primary'} icon={refus ? 'fa-xmark' : 'fa-check'} disabled={!canValider} onClick={confirmer}>
                        {courrier ? "Enregistrer l'avis" : refus ? 'Refuser' : 'Valider'}
                    </Button>
                </>
            }
        >
            <ItemResume item={item} />

            {!courrier && (
                <fieldset className="mb-4">
                    <legend className="mb-2 text-sm font-semibold text-epo-slate-900">Votre décision</legend>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <ChoixCarte selected={choix === 'valider'} onClick={() => setChoix('valider')} icon="fa-check" titre="Valider" texte="Le document est approuvé" />
                        <ChoixCarte selected={refus} onClick={() => setChoix('refuser')} icon="fa-xmark" titre="Refuser" texte="Il revient à son auteur" />
                    </div>
                </fieldset>
            )}

            {courrier && (
                <div className="flex flex-wrap gap-2 mb-3">
                    {AVIS_RAPIDES.map((a) => (
                        <button
                            key={a}
                            type="button"
                            onClick={() => setTexte(a)}
                            className={`px-3 h-9 text-sm rounded-lg border transition-colors ${texte === a ? 'border-epo-green-600 bg-epo-green-50 font-semibold text-epo-slate-900' : 'border-epo-slate-300 bg-white text-epo-slate-800 hover:border-epo-slate-400'}`}
                        >
                            {a}
                        </button>
                    ))}
                </div>
            )}

            {(courrier || choix) && (
                <div>
                    <label htmlFor="texte-dg" className="block mb-1.5 text-sm font-semibold text-epo-slate-900">
                        {courrier ? 'Votre avis' : refus ? 'Motif du refus' : 'Observation'}
                        {!courrier && !refus && <span className="font-normal text-epo-slate-500"> (facultatif)</span>}
                    </label>
                    <textarea id="texte-dg" rows={3} value={texte} onChange={(e) => setTexte(e.target.value)} className={TEXTAREA_CLASS} placeholder={courrier ? 'Choisissez un avis ci-dessus ou écrivez le vôtre' : ''} />
                    {courrier && <p className="mt-1 text-sm text-epo-slate-600">Le courrier retournera au SG pour imputation, après la coche de votre secrétariat.</p>}
                </div>
            )}
        </Modal>
    );
}
