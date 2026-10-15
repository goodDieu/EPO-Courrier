// src/components/sp-dg/IntroductionModal.jsx
import { useState, useEffect } from 'react';
import { Modal, Button } from '../ui';
import {
    TYPES_DOSSIERS,
    formatHeure,
    formatDateHeure,
} from '../../data/introductionSPDG.js';
import { notify } from '../ui/notify.js';

export default function IntroductionModal({ dossier, onClose }) {
    const [commentaire, setCommentaire] = useState('');
    const [confirmePriseEnCharge, setConfirmePriseEnCharge] = useState(false);

    useEffect(() => {
        if (!dossier) return;
        setCommentaire('');
        setConfirmePriseEnCharge(false);
    }, [dossier]);

    if (!dossier) return null;

    const d = dossier;
    const type = TYPES_DOSSIERS[d.type];
    const isConfidentiel = d.priorite === 'confidentiel';

    const canValider = confirmePriseEnCharge && (!isConfidentiel || commentaire.trim().length > 3);

    const handleValider = () => {
        notify.fromText(
            `✅ Introduction enregistrée\n\n` +
            `→ Dossier : ${d.id}\n` +
            `→ Heure d'introduction : ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}\n` +
            (commentaire ? `→ Commentaire : ${commentaire}\n` : '') +
            `\n🔔 Le SG sera automatiquement informé du passage au DG\n` +
            `→ Le dossier passera au statut "Chez le DG"`
        );
        onClose();
    };

    return (
        <Modal
            open={!!d}
            onClose={onClose}
            title="Confirmer l'introduction au DG"
            titleIcon="fa-pen"
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
                        Confirmer l'introduction
                    </Button>
                </>
            }
        >
            {/* Dossier */}
            <div className="p-3 mb-4 rounded-lg bg-epo-slate-50">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-epo-slate-800">
                        {d.id}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${type.color}`}>
                        <i className={`fas ${type.icon} text-[9px]`} />
                        {type.label}
                    </span>
                    {isConfidentiel && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-epo-slate-800 text-white text-xs font-bold">
                            <i className="fas fa-lock text-[8px]" />
                            CONFIDENTIEL
                        </span>
                    )}
                </div>
                <div className="text-sm text-epo-slate-700">
                    {d.objet}
                </div>
                <div className="mt-2 text-xs text-epo-slate-500">
                    Reçu au SP-DG à {formatHeure(d.recuAuSPDG)}
                </div>
            </div>

            {/* Info workflow */}
            <div className="flex items-start gap-2.5 p-3 mb-4 rounded-lg bg-epo-green-50 border border-epo-green-200">
                <i className="fas fa-info-circle text-epo-green-600 mt-0.5" />
                <div className="text-xs text-epo-green-900">
                    En confirmant, vous enregistrez la <strong>remise physique du dossier au DG</strong>. Le SG sera automatiquement notifié et le dossier passera à l'état <strong>« Chez le DG »</strong>.
                </div>
            </div>

            {/* Checkbox de confirmation */}
            <label className="flex items-start gap-3 p-3 mb-4 transition bg-white border-2 rounded-lg cursor-pointer border-epo-slate-200 hover:border-epo-green-400">
                <input
                    type="checkbox"
                    checked={confirmePriseEnCharge}
                    onChange={(e) => setConfirmePriseEnCharge(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-epo-green-500 cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-epo-slate-800">
                        Je confirme avoir remis physiquement ce dossier au DG
                    </div>
                    <div className="text-xs text-epo-slate-500 mt-0.5">
                        {isConfidentiel
                            ? 'Dossier confidentiel- remise en main propre uniquement'
                            : 'Remise standard au bureau du DG'}
                    </div>
                </div>
            </label>

            {/* Commentaire (obligatoire pour confidentiel) */}
            <div>
                <label className="block text-sm font-medium text-epo-slate-700 mb-1.5">
                    Commentaire {isConfidentiel ? <span className="text-epo-red-500">*</span> : <span className="text-epo-slate-400">(optionnel)</span>}
                </label>
                <textarea
                    rows={2}
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                    placeholder={
                        isConfidentiel
                            ? 'Précisez les conditions de remise (ex : remis en main propre, en présence de...)'
                            : 'Note interne sur l\'introduction…'
                    }
                    className="w-full px-3 py-2.5 border rounded-lg border-epo-slate-300 text-sm focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10 resize-y"
                />
                {isConfidentiel && (
                    <div className="mt-1.5 text-xs text-epo-slate-500">
                        <i className="fas fa-lock text-[9.5px] mr-1" />
                        Minimum 3 caractères · Traçabilité renforcée pour les dossiers confidentiels
                    </div>
                )}
            </div>
        </Modal>
    );
}