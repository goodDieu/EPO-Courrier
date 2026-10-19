// src/components/circuit/ConfirmationModal.jsx
// Remise d'un document d'une main à l'autre : on résume, on fait cocher, on confirme.
import { useState } from 'react';
import { Modal, Button, Echeance } from '../ui';
import ClassificationBadge from '../scc/ClassificationBadge';

/**
 * Props :
 *   - item     : { id, objet, de, quoi, classification, echeance }
 *   - titre, caseACocher, aide, bouton, icon
 *   - children : informations en plus (décision du DG…)
 */
export default function ConfirmationModal({ item, titre, caseACocher, aide, bouton, icon = 'fa-check', onClose, onConfirmer, children }) {
    const [fait, setFait] = useState(false);
    if (!item) return null;

    return (
        <Modal
            open
            onClose={onClose}
            title={titre}
            titleIcon={icon}
            size="md"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button icon={icon} disabled={!fait} onClick={() => onConfirmer(item)}>
                        {bouton}
                    </Button>
                </>
            }
        >
            <div className="p-4 mb-5 border rounded-lg border-epo-slate-200">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-sm font-semibold tabular-nums text-epo-slate-900">{item.id}</span>
                    <span className="text-sm text-epo-slate-600">{item.quoi}</span>
                    {item.classification && item.classification !== 'ordinaire' && <ClassificationBadge classification={item.classification} />}
                </div>
                <p className="mt-1.5 text-base font-semibold text-epo-slate-900">{item.objet}</p>
                <p className="mt-1 text-sm text-epo-slate-600">
                    {item.de}
                    {item.echeance && (
                        <>
                            {' · '}
                            <Echeance iso={item.echeance} />
                        </>
                    )}
                </p>
            </div>

            {children}

            <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer border-epo-slate-200 has-[:checked]:border-epo-green-600 has-[:checked]:bg-epo-green-50">
                <input type="checkbox" checked={fait} onChange={(e) => setFait(e.target.checked)} className="w-5 h-5 mt-0.5 cursor-pointer accent-epo-green-700" />
                <span>
                    <span className="block text-sm font-semibold text-epo-slate-900">{caseACocher}</span>
                    {aide && <span className="block mt-0.5 text-sm text-epo-slate-600">{aide}</span>}
                </span>
            </label>
        </Modal>
    );
}
