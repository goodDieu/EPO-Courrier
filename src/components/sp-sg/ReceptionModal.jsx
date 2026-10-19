// src/components/sp-sg/ReceptionModal.jsx
// Accusé de réception d'un courrier envoyé par le Service Courrier.
import { useState } from 'react';
import { Modal, Button, ChoixCarte, TEXTAREA_CLASS } from '../ui';
import DossierResume from '../circuit/DossierResume';
import { formatJourHeure } from '../../data/demoClock.js';

export default function ReceptionModal({ arrivee, onClose, onConfirmer }) {
    // La page remonte la fenêtre pour chaque courrier (prop key) : l'état repart à zéro
    const [conforme, setConforme] = useState(null);
    const [remarque, setRemarque] = useState('');

    if (!arrivee) return null;
    const a = arrivee;
    const canValider = conforme === true || (conforme === false && remarque.trim().length >= 5);

    return (
        <Modal
            open
            onClose={onClose}
            title={`Réceptionner le courrier ${a.id}`}
            titleIcon="fa-inbox"
            size="md"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button
                        icon="fa-check"
                        disabled={!canValider}
                        onClick={() => onConfirmer(a, { remarque: conforme ? null : remarque.trim() })}
                    >
                        Confirmer la réception
                    </Button>
                </>
            }
        >
            <DossierResume
                dossier={{ ...a, type: 'courrier' }}
                lignes={[
                    ['Expéditeur', a.expediteur],
                    ['Enregistré au SCC', formatJourHeure(a.dateReception)],
                    ['Pièces annoncées', `${a.pieces} pièce${a.pieces > 1 ? 's' : ''}`],
                ]}
            />

            <fieldset>
                <legend className="mb-2 text-sm font-semibold text-epo-slate-900">
                    Avez-vous bien reçu les {a.pieces} pièce{a.pieces > 1 ? 's' : ''} annoncée{a.pieces > 1 ? 's' : ''} ?
                </legend>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <ChoixCarte selected={conforme === true} onClick={() => setConforme(true)} icon="fa-check" titre="Oui, tout est là" />
                    <ChoixCarte
                        selected={conforme === false}
                        onClick={() => setConforme(false)}
                        icon="fa-triangle-exclamation"
                        titre="Non, il y a un problème"
                        texte="Pièce manquante ou différente"
                    />
                </div>
            </fieldset>

            {conforme === false && (
                <div className="mt-4">
                    <label htmlFor="remarque-reception" className="block mb-1.5 text-sm font-semibold text-epo-slate-900">
                        Ce qui ne va pas
                    </label>
                    <textarea
                        id="remarque-reception"
                        rows={2}
                        value={remarque}
                        onChange={(e) => setRemarque(e.target.value)}
                        placeholder="Exemple : il manque l'annexe 2"
                        className={TEXTAREA_CLASS}
                    />
                    <p className="mt-1 text-sm text-epo-slate-600">La remarque sera notée dans l'historique du courrier.</p>
                </div>
            )}

            <p className="mt-5 text-sm text-epo-slate-700">
                En confirmant, vous signez la décharge du Service Courrier. Le courrier passe ensuite au tri.
            </p>
        </Modal>
    );
}
