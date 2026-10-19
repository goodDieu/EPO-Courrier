// src/components/sp-sg/InstructionModal.jsx
// Instruction donnée par le SG : la lire, puis confirmer qu'elle est exécutée.
import { useState } from 'react';
import { Modal, Button, Echeance } from '../ui';
import DossierResume from '../circuit/DossierResume';
import LocalisationTag from '../circuit/LocalisationTag';
import { TYPES_INSTRUCTION, LOCALISATIONS } from '../../data/circuit.js';
import { formatJourHeure } from '../../data/demoClock.js';

export default function InstructionModal({ instruction, dossier, onClose, onExecuter }) {
    const [fait, setFait] = useState(false);
    if (!instruction) return null;
    const i = instruction;
    const type = TYPES_INSTRUCTION[i.type];
    const ouverte = i.statut !== 'traite';

    return (
        <Modal
            open
            onClose={onClose}
            title={`${type.label} du SG`}
            titleIcon={type.icon}
            size="md"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        {ouverte ? 'Annuler' : 'Fermer'}
                    </Button>
                    {ouverte && (
                        <Button icon="fa-check" disabled={!fait} onClick={() => onExecuter(i, dossier)}>
                            {i.actionLabel || 'Marquer comme exécutée'}
                        </Button>
                    )}
                </>
            }
        >
            <blockquote className="pl-4 mb-2 text-base border-l-4 text-epo-slate-900 border-epo-green-600">{i.contenu}</blockquote>
            <p className="mb-5 text-sm text-epo-slate-600">
                M. OUÉDRAOGO Salif, {formatJourHeure(i.emiseLe)}
                {ouverte && i.echeance && (
                    <>
                        {' · '}
                        <Echeance iso={i.echeance} prefix="À faire avant" />
                    </>
                )}
                {!ouverte && ` · exécutée ${formatJourHeure(i.traiteLe).toLowerCase()}`}
            </p>

            {dossier && <DossierResume dossier={dossier} lignes={[['Expéditeur', dossier.expediteur], ['Où il est', <LocalisationTag key="l" dossier={dossier} />]]} />}

            {ouverte && (
                <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer border-epo-slate-200 has-[:checked]:border-epo-green-600 has-[:checked]:bg-epo-green-50">
                    <input type="checkbox" checked={fait} onChange={(e) => setFait(e.target.checked)} className="w-5 h-5 mt-0.5 cursor-pointer accent-epo-green-700" />
                    <span>
                        <span className="block text-sm font-semibold text-epo-slate-900">J'ai fait ce que le SG demande</span>
                        {i.suite && (
                            <span className="block mt-0.5 text-sm text-epo-slate-600">
                                Le dossier passera « {LOCALISATIONS[i.suite].label} ».
                            </span>
                        )}
                    </span>
                </label>
            )}
        </Modal>
    );
}
