// src/components/sp-sg/ReceptionModal.jsx
import { useState, useEffect } from 'react';
import { Modal, Button } from '../ui';
import {
    TYPES_DOSSIERS,
    formatHeure,
} from '../../data/courriersRecusSPSG.js';

export default function ReceptionModal({ courrier, onClose }) {
    const [piecesVerifiees, setPiecesVerifiees] = useState(false);
    const [etatPieces, setEtatPieces] = useState('conforme'); // 'conforme' | 'manquant' | 'incoherent'
    const [commentaire, setCommentaire] = useState('');

    useEffect(() => {
        if (!courrier) return;
        setPiecesVerifiees(false);
        setEtatPieces('conforme');
        setCommentaire('');
    }, [courrier]);

    if (!courrier) return null;

    const c = courrier;
    const type = TYPES_DOSSIERS[c.type];

    const canValider = piecesVerifiees && (etatPieces === 'conforme' || commentaire.trim().length > 5);

    const handleValider = () => {
        alert(
            `✅ Réception confirmée\n\n` +
            `→ Dossier : ${c.id}\n` +
            `→ Décharge enregistrée\n` +
            (etatPieces !== 'conforme' ? `→ ⚠️ Pièces ${etatPieces}\n→ Motif : ${commentaire}\n` : '→ Pièces conformes\n') +
            `\n→ Le dossier peut passer au tri`
        );
        onClose();
    };

    return (
        <Modal
            open={!!c}
            onClose={onClose}
            title={`Confirmer la réception- ${c.id}`}
            titleIcon="fa-signature"
            size="md"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button
                        variant="primary"
                        icon="fa-check"
                        disabled={!canValider}
                        onClick={handleValider}
                    >
                        Confirmer la réception
                    </Button>
                </>
            }
        >
            {/* Bandeau RG-25 */}
            <div className="flex items-start gap-2.5 p-3 mb-4 rounded-lg bg-epo-yellow-50 border border-epo-yellow-200">
                <i className="fas fa-exclamation-triangle text-epo-yellow-600 mt-0.5" />
                <div className="text-[12px] text-epo-yellow-900">
                    <strong>RG-25</strong>- Une remise exige une preuve de réception. La décharge enregistre officiellement la prise en charge du dossier par le SP-SG.
                </div>
            </div>

            {/* Dossier */}
            <div className="p-3 mb-4 rounded-lg bg-epo-slate-50">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-[12px] font-bold text-epo-slate-800">
                        {c.id}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${type.color}`}>
                        <i className={`fas ${type.icon} text-[9px]`} />
                        {type.label}
                    </span>
                </div>
                <div className="text-[13px] text-epo-slate-700 mb-2">
                    {c.objet}
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-epo-slate-500">
                    <span>
                        <i className="fas fa-truck text-[10px] mr-1" />
                        Remis par {c.agentLiaison}
                    </span>
                    <span>
                        <i className="fas fa-clock text-[10px] mr-1" />
                        {formatHeure(c.recuAuSPSG)}
                    </span>
                    <span>
                        <i className="fas fa-paperclip text-[10px] mr-1" />
                        {c.pieces} pièce{c.pieces > 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {/* Vérification des pièces */}
            <label className="flex items-start gap-3 p-3 mb-4 transition bg-white border-2 rounded-lg cursor-pointer border-epo-slate-200 hover:border-epo-green-400">
                <input
                    type="checkbox"
                    checked={piecesVerifiees}
                    onChange={(e) => setPiecesVerifiees(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-epo-green-500 cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-epo-slate-800">
                        J'ai vérifié les pièces du dossier
                    </div>
                    <div className="text-[11.5px] text-epo-slate-500 mt-0.5">
                        Confrontez les pièces annoncées par le SCC avec celles reçues
                    </div>
                </div>
            </label>

            {/* État des pièces (si vérifiées) */}
            {piecesVerifiees && (
                <>
                    <label className="block text-[12.5px] font-medium text-epo-slate-700 mb-2">
                        État des pièces
                    </label>
                    <div className="grid grid-cols-1 gap-2 mb-4 sm:grid-cols-3">
                        {[
                            { key: 'conforme', label: 'Conforme', icon: 'fa-check-circle', color: 'epo-green' },
                            { key: 'manquant', label: 'Manquant', icon: 'fa-exclamation-circle', color: 'epo-red' },
                            { key: 'incoherent', label: 'Incohérent', icon: 'fa-times-circle', color: 'epo-yellow' },
                        ].map((opt) => {
                            const selected = etatPieces === opt.key;
                            return (
                                <button
                                    key={opt.key}
                                    type="button"
                                    onClick={() => setEtatPieces(opt.key)}
                                    className={`
                                        flex items-center gap-2 p-3 rounded-lg border-2 transition text-left
                                        ${selected
                                            ? `border-${opt.color}-500 bg-${opt.color}-50`
                                            : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                                    `}
                                >
                                    <i className={`fas ${opt.icon} text-[14px] text-${opt.color}-600`} />
                                    <span className="text-[12.5px] font-semibold text-epo-slate-800">
                                        {opt.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Commentaire si non conforme */}
                    {etatPieces !== 'conforme' && (
                        <div className="mb-4">
                            <label className="block text-[12.5px] font-medium text-epo-slate-700 mb-1.5">
                                Motif / Précision <span className="text-epo-red-500">*</span>
                            </label>
                            <textarea
                                rows={2}
                                value={commentaire}
                                onChange={(e) => setCommentaire(e.target.value)}
                                placeholder="Précisez les pièces manquantes ou incohérentes…"
                                className="w-full px-3 py-2.5 border rounded-lg border-epo-slate-300 text-[13.5px] focus:outline-none focus:border-epo-red-500 focus:ring-2 focus:ring-epo-red-500/10 resize-y"
                            />
                            <div className="mt-1.5 text-[11px] text-epo-slate-500">
                                Minimum 5 caractères
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Note workflow */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-epo-slate-50">
                <i className="fas fa-info-circle text-epo-slate-400 mt-0.5" />
                <div className="text-[11.5px] text-epo-slate-600">
                    Après confirmation, le dossier passera à l'état <strong>« En cours de traitement »</strong> et sera disponible pour le tri et la numérisation.
                </div>
            </div>
        </Modal>
    );
}