// src/components/sp-sg/TriModal.jsx
// Tri d'un dossier selon son importance et son urgence.
import { useState } from 'react';
import { Modal, Button, ChoixCarte, TEXTAREA_CLASS } from '../ui';
import DossierResume from '../circuit/DossierResume';
import { QUADRANTS } from '../../data/circuit.js';
import { formatJourHeure } from '../../data/demoClock.js';

// Disposition de la grille : importance en lignes, urgence en colonnes
const GRILLE = ['important-urgent', 'important-non-urgent', 'non-important-urgent', 'non-important-non-urgent'];

export default function TriModal({ dossier, onClose, onClasser }) {
    // Remontée pour chaque dossier (prop key) : l'état part du classement actuel
    const [quadrant, setQuadrant] = useState(() => dossier?.quadrant || (dossier?.classificationScc === 'urgent' ? 'important-urgent' : null));
    const [motif, setMotif] = useState('');

    if (!dossier) return null;
    const d = dossier;
    const reclassement = !!d.quadrant && quadrant !== d.quadrant;
    const canValider = !!quadrant && (!reclassement || motif.trim().length >= 4);

    return (
        <Modal
            open
            onClose={onClose}
            title={d.quadrant ? `Changer le tri du dossier ${d.id}` : `Trier le dossier ${d.id}`}
            titleIcon="fa-table-cells-large"
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button icon="fa-check" disabled={!canValider} onClick={() => onClasser(d, quadrant, reclassement ? motif.trim() : '')}>
                        Enregistrer le tri
                    </Button>
                </>
            }
        >
            <DossierResume
                dossier={d}
                lignes={[
                    ['Expéditeur', d.expediteur],
                    ['Reçu', formatJourHeure(d.recuLe)],
                ]}
            />

            <fieldset>
                <legend className="mb-1 text-sm font-semibold text-epo-slate-900">Ce dossier est…</legend>
                <p className="mb-3 text-sm text-epo-slate-600">Le choix fixe l'ordre de passage chez le SG et le délai pour l'introduire.</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {GRILLE.map((key) => {
                        const q = QUADRANTS[key];
                        return (
                            <ChoixCarte
                                key={key}
                                selected={quadrant === key}
                                onClick={() => setQuadrant(key)}
                                icon={q.icon || 'fa-inbox'}
                                titre={q.label}
                                texte={q.consigne}
                            />
                        );
                    })}
                </div>
            </fieldset>

            {d.classificationScc === 'urgent' && !d.quadrant && (
                <p className="mt-3 text-sm text-epo-slate-700">
                    <i className="mr-1.5 fas fa-circle-exclamation text-epo-red-600" aria-hidden="true" />
                    Le Service Courrier a marqué ce courrier comme urgent.
                </p>
            )}

            {reclassement && (
                <div className="mt-4">
                    <label htmlFor="motif-tri" className="block mb-1.5 text-sm font-semibold text-epo-slate-900">
                        Pourquoi changer le tri ?
                    </label>
                    <textarea
                        id="motif-tri"
                        rows={2}
                        value={motif}
                        onChange={(e) => setMotif(e.target.value)}
                        placeholder="Exemple : le SG l'a demandé pour aujourd'hui"
                        className={TEXTAREA_CLASS}
                    />
                </div>
            )}
        </Modal>
    );
}
