// src/components/sg/FicheAccompagnementModal.jsx
// Fiche d'accompagnement : le SG lit le courrier et décide de la suite.
import { useState } from 'react';
import { Modal, Button, ChoixCarte, ChipCheckGrid, Echeance, Historique, TEXTAREA_CLASS } from '../ui';
import DossierResume from '../circuit/DossierResume';
import QuadrantTag from '../circuit/QuadrantTag';
import { IMPUTATIONS, TRAITEMENTS } from '../../data/circuit.js';
import { formatJourHeure } from '../../data/demoClock.js';

const BOUTONS = {
    'transmettre-dg': { label: 'Transmettre au DG', icon: 'fa-paper-plane' },
    imputer: { label: 'Imputer', icon: 'fa-share' },
    classer: { label: 'Classer le dossier', icon: 'fa-box-archive' },
};

export default function FicheAccompagnementModal({ dossier, onClose, onDecider }) {
    const retourDg = dossier?.localisation === 'retour-sg';
    // Remontée pour chaque dossier (prop key) : au retour du DG, on impute
    const [decision, setDecision] = useState(retourDg ? 'imputer' : null);
    const [imputations, setImputations] = useState([]);
    const [traitements, setTraitements] = useState([]);
    const [observations, setObservations] = useState('');

    if (!dossier) return null;
    const d = dossier;
    const canValider = decision && (decision !== 'imputer' || imputations.length > 0);
    const bouton = BOUTONS[decision];

    return (
        <Modal
            open
            onClose={onClose}
            title={`Fiche d'accompagnement du courrier ${d.id}`}
            titleIcon="fa-file-lines"
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button
                        icon={bouton?.icon || 'fa-check'}
                        disabled={!canValider}
                        onClick={() => onDecider(d, { decision, imputations, traitements, observations: observations.trim() })}
                    >
                        {bouton?.label || 'Valider la décision'}
                    </Button>
                </>
            }
        >
            <DossierResume
                dossier={d}
                lignes={[
                    ['Expéditeur', d.expediteur],
                    ['Introduit', formatJourHeure(retourDg ? d.historique.at(-1)?.date : d.introduitLe)],
                    ['Tri du secrétariat', <QuadrantTag key="q" quadrant={d.quadrant} />],
                    d.echeanceSg && ['Délai', <Echeance key="e" iso={d.echeanceSg} />],
                ]}
            />

            {d.pointAttention && (
                <p className="flex items-start gap-2 mb-5 text-sm text-epo-slate-800">
                    <i className="fas fa-circle-info mt-0.5 text-epo-yellow-600" aria-hidden="true" />
                    {d.pointAttention}
                </p>
            )}

            {d.avisDg && (
                <div className="mb-5">
                    <h3 className="mb-1.5 text-sm font-semibold text-epo-slate-900">Avis du DG</h3>
                    <blockquote className="pl-4 text-base border-l-4 text-epo-slate-900 border-epo-green-600">{d.avisDg}</blockquote>
                </div>
            )}

            <fieldset className="mb-5">
                <legend className="mb-2 text-sm font-semibold text-epo-slate-900">Suite à donner</legend>
                <div className={`grid grid-cols-1 gap-3 ${retourDg ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
                    {!retourDg && (
                        <ChoixCarte
                            selected={decision === 'transmettre-dg'}
                            onClick={() => setDecision('transmettre-dg')}
                            icon="fa-paper-plane"
                            titre="Transmettre au DG"
                            texte="Pour décision du Directeur Général"
                        />
                    )}
                    <ChoixCarte
                        selected={decision === 'imputer'}
                        onClick={() => setDecision('imputer')}
                        icon="fa-share"
                        titre="Imputer à une structure"
                        texte="Le Service Courrier lui remettra"
                    />
                    <ChoixCarte
                        selected={decision === 'classer'}
                        onClick={() => setDecision('classer')}
                        icon="fa-box-archive"
                        titre="Classer"
                        texte="Rien à signaler"
                    />
                </div>
            </fieldset>

            {decision === 'imputer' && (
                <>
                    <fieldset className="mb-5">
                        <legend className="mb-2 text-sm font-semibold text-epo-slate-900">
                            Imputer à <span className="font-normal text-epo-slate-600">(une ou plusieurs structures)</span>
                        </legend>
                        <ChipCheckGrid options={IMPUTATIONS} selected={imputations} onChange={setImputations} columns={4} />
                    </fieldset>
                    <fieldset className="mb-5">
                        <legend className="mb-2 text-sm font-semibold text-epo-slate-900">
                            Pour <span className="font-normal text-epo-slate-600">(facultatif)</span>
                        </legend>
                        <ChipCheckGrid options={TRAITEMENTS} selected={traitements} onChange={setTraitements} columns={3} />
                    </fieldset>
                </>
            )}

            <div className="mb-6">
                <label htmlFor="observations-sg" className="block mb-1.5 text-sm font-semibold text-epo-slate-900">
                    Observations <span className="font-normal text-epo-slate-500">(facultatif)</span>
                </label>
                <textarea
                    id="observations-sg"
                    rows={2}
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                    placeholder="Exemple : me rendre compte avant vendredi"
                    className={TEXTAREA_CLASS}
                />
            </div>

            <details className="group">
                <summary className="text-sm font-semibold cursor-pointer text-epo-green-700 hover:underline">Voir l'historique du courrier</summary>
                <div className="mt-3">
                    <Historique items={d.historique} />
                </div>
            </details>
        </Modal>
    );
}
