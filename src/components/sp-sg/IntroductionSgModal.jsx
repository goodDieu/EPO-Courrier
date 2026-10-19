// src/components/sp-sg/IntroductionSgModal.jsx
// Remise d'un dossier au SG, avec confirmation de la remise en main propre.
import { useState } from 'react';
import { Modal, Button, Echeance, TEXTAREA_CLASS } from '../ui';
import DossierResume from '../circuit/DossierResume';
import QuadrantTag from '../circuit/QuadrantTag';
import { formatJourHeure } from '../../data/demoClock.js';

export default function IntroductionSgModal({ dossier, onClose, onIntroduire }) {
    const [remis, setRemis] = useState(false);
    const [commentaire, setCommentaire] = useState('');

    if (!dossier) return null;
    const d = dossier;

    return (
        <Modal
            open
            onClose={onClose}
            title={`Introduire le dossier ${d.id} au SG`}
            titleIcon="fa-user-tie"
            size="md"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button icon="fa-check" disabled={!remis} onClick={() => onIntroduire(d, commentaire.trim())}>
                        Confirmer l'introduction
                    </Button>
                </>
            }
        >
            <DossierResume
                dossier={d}
                lignes={[
                    ['Expéditeur', d.expediteur],
                    ['Reçu', formatJourHeure(d.recuLe)],
                    ['Tri', <QuadrantTag key="q" quadrant={d.quadrant} />],
                    ['Délai', <Echeance key="e" iso={d.echeance} />],
                ]}
            />

            {d.pointAttention && (
                <p className="flex items-start gap-2 mb-5 text-sm text-epo-slate-800">
                    <i className="fas fa-circle-info mt-0.5 text-epo-yellow-600" aria-hidden="true" />
                    {d.pointAttention}
                </p>
            )}

            <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer border-epo-slate-200 has-[:checked]:border-epo-green-600 has-[:checked]:bg-epo-green-50">
                <input
                    type="checkbox"
                    checked={remis}
                    onChange={(e) => setRemis(e.target.checked)}
                    className="w-5 h-5 mt-0.5 cursor-pointer accent-epo-green-700"
                />
                <span>
                    <span className="block text-sm font-semibold text-epo-slate-900">J'ai remis ce dossier au SG en main propre</span>
                    <span className="block mt-0.5 text-sm text-epo-slate-600">Le SG est prévenu et le dossier passe « Chez le SG ».</span>
                </span>
            </label>

            <div className="mt-4">
                <label htmlFor="commentaire-intro" className="block mb-1.5 text-sm font-semibold text-epo-slate-900">
                    Commentaire <span className="font-normal text-epo-slate-500">(facultatif)</span>
                </label>
                <textarea
                    id="commentaire-intro"
                    rows={2}
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                    placeholder="Exemple : remis pendant la réunion de direction"
                    className={TEXTAREA_CLASS}
                />
            </div>
        </Modal>
    );
}
