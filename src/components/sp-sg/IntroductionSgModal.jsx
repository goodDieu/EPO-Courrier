// src/components/sp-sg/IntroductionSgModal.jsx
import { useState, useEffect } from 'react';
import { Modal, Button } from '../ui';
import {
    CLASSIFICATION_EISENHOWER,
    TYPES_DOSSIERS,
    formatHeure,
} from '../../data/introductionSPSG.js';

export default function IntroductionSgModal({ dossier, onClose }) {
    const [remisEnMain, setRemisEnMain] = useState(false);
    const [commentaire, setCommentaire] = useState('');

    useEffect(() => {
        if (!dossier) return;
        setRemisEnMain(false);
        setCommentaire('');
    }, [dossier]);

    if (!dossier) return null;

    const d = dossier;
    const type = TYPES_DOSSIERS[d.type];
    const classification = CLASSIFICATION_EISENHOWER[d.classification];

    const canValider = remisEnMain;

    const handleValider = () => {
        alert(
            `✅ Introduction au SG enregistrée\n\n` +
            `→ Dossier : ${d.id}\n` +
            `→ Heure d'introduction : ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}\n` +
            (commentaire ? `→ Commentaire : ${commentaire}\n` : '') +
            `\n🔔 Le SG sera automatiquement notifié (RG-18)\n` +
            `→ Le dossier passera au statut "Chez SG"`
        );
        onClose();
    };

    return (
        <Modal
            open={!!d}
            onClose={onClose}
            title="Confirmer l'introduction au SG"
            titleIcon="fa-user-tie"
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
                    <span className="font-mono text-[12px] font-bold text-epo-slate-800">
                        {d.id}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${type.color}`}>
                        <i className={`fas ${type.icon} text-[9px]`} />
                        {type.label}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${classification.chip}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${classification.dot}`} />
                        {classification.label}
                    </span>
                </div>
                <div className="text-[13px] text-epo-slate-700">
                    {d.objet}
                </div>
                <div className="mt-2 text-[11.5px] text-epo-slate-500">
                    Reçu au SP-SG à {formatHeure(d.recuAuSPSG)}
                </div>
            </div>

            {/* Info workflow */}
            <div className="flex items-start gap-2.5 p-3 mb-4 rounded-lg bg-epo-green-50 border border-epo-green-200">
                <i className="fas fa-info-circle text-epo-green-600 mt-0.5" />
                <div className="text-[12px] text-epo-green-900">
                    En confirmant, vous enregistrez la <strong>remise physique du dossier au SG</strong>. Le SG sera automatiquement notifié (RG-18) et le dossier passera à l'état <strong>« Chez SG »</strong> pour avis et instruction.
                </div>
            </div>

            {/* Checkbox de confirmation */}
            <label className="flex items-start gap-3 p-3 mb-4 transition bg-white border-2 rounded-lg cursor-pointer border-epo-slate-200 hover:border-epo-green-400">
                <input
                    type="checkbox"
                    checked={remisEnMain}
                    onChange={(e) => setRemisEnMain(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-epo-green-500 cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-epo-slate-800">
                        Je confirme avoir remis physiquement ce dossier au SG
                    </div>
                    <div className="text-[11.5px] text-epo-slate-500 mt-0.5">
                        Remise au bureau du SG · Bâtiment A · Aile Est
                    </div>
                </div>
            </label>

            {/* Commentaire optionnel */}
            <div>
                <label className="block text-[12.5px] font-medium text-epo-slate-700 mb-1.5">
                    Commentaire <span className="text-epo-slate-400">(optionnel)</span>
                </label>
                <textarea
                    rows={2}
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                    placeholder="Note interne sur l'introduction (ex : remis en réunion, remis en main propre…)"
                    className="w-full px-3 py-2.5 border rounded-lg border-epo-slate-300 text-[13.5px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10 resize-y"
                />
            </div>
        </Modal>
    );
}