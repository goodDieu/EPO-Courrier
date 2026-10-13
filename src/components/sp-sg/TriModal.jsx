// src/components/sp-sg/TriModal.jsx
import { useState, useEffect } from 'react';
import { Modal, Button } from '../ui';
import {
    QUADRANTS,
    TYPES_DOSSIERS,
    formatHeure,
} from '../../data/triSPSG.js';

export default function TriModal({ dossier, onClose, onClasser }) {
    const [quadrantSelectionne, setQuadrantSelectionne] = useState(null);
    const [commentaire, setCommentaire] = useState('');

    useEffect(() => {
        if (!dossier) return;
        setQuadrantSelectionne(dossier.classification || null);
        setCommentaire('');
    }, [dossier]);

    if (!dossier) return null;

    const d = dossier;
    const type = TYPES_DOSSIERS[d.type];
    const isDejaClasse = !!d.classification;
    const isReclassement = isDejaClasse && quadrantSelectionne !== d.classification;

    const canValider = quadrantSelectionne && (!isReclassement || commentaire.trim().length > 3);

    const handleValider = () => {
        const q = QUADRANTS[quadrantSelectionne];
        alert(
            `✅ Dossier classé\n\n` +
            `→ Dossier : ${d.id}\n` +
            `→ Classification : ${q.label}\n` +
            (isReclassement ? `→ Reclassement : ${QUADRANTS[d.classification].label} → ${q.label}\n` : '') +
            (commentaire ? `→ Motif : ${commentaire}\n` : '') +
            `\n→ Le dossier est prêt pour l'introduction au SG`
        );
        onClose();
    };

    return (
        <Modal
            open={!!d}
            onClose={onClose}
            title={`Classer le dossier- ${d.id}`}
            titleIcon="fa-th"
            size="lg"
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
                        Confirmer le classement
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
                    {isDejaClasse && (
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${QUADRANTS[d.classification].chip}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${QUADRANTS[d.classification].dot}`} />
                            {QUADRANTS[d.classification].label}
                        </span>
                    )}
                </div>
                <div className="text-[13px] text-epo-slate-700">
                    {d.objet}
                </div>
                <div className="mt-2 text-[11.5px] text-epo-slate-500">
                    Reçu au SP-SG à {formatHeure(d.recuAuSPSG)}
                </div>
            </div>

            {/* Info matrice */}
            <div className="flex items-start gap-2.5 p-3 mb-4 rounded-lg bg-epo-slate-50 border border-epo-slate-200">
                <i className="fas fa-info-circle text-epo-slate-500 mt-0.5" />
                <div className="text-[12px] text-epo-slate-700">
                    <strong>Matrice d'Eisenhower (§10.5).</strong> Classez le dossier selon deux axes : <strong>importance</strong> (fond, enjeu) et <strong>urgence</strong> (délai, échéance).
                </div>
            </div>

            {/* Choix du quadrant */}
            <h4 className="text-[12.5px] font-semibold uppercase tracking-wider text-epo-slate-500 mb-3">
                Classification <span className="text-epo-red-500">*</span>
            </h4>

            <div className="grid grid-cols-1 gap-3 mb-4 sm:grid-cols-2">
                {Object.values(QUADRANTS).map((q) => {
                    const selected = quadrantSelectionne === q.key;
                    return (
                        <button
                            key={q.key}
                            type="button"
                            onClick={() => setQuadrantSelectionne(q.key)}
                            className={`
                                text-left p-4 rounded-xl border-2 transition
                                ${selected
                                    ? `border-${q.dot.replace('bg-', '')} ${q.bg}`
                                    : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                            `}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`flex items-center justify-center w-9 h-9 rounded-lg ${q.chip}`}>
                                    <i className={`fas ${q.icon} text-[14px]`} />
                                </div>
                                <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${q.chip}`}>
                                    {q.shortLabel}
                                </span>
                            </div>
                            <div className="text-[13px] font-bold text-epo-slate-800">
                                {q.label}
                            </div>
                            <div className="text-[11px] text-epo-slate-500 mt-0.5">
                                {q.action}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Commentaire (si reclassement) */}
            {isReclassement && (
                <div>
                    <label className="block text-[12.5px] font-medium text-epo-slate-700 mb-1.5">
                        Motif du reclassement <span className="text-epo-red-500">*</span>
                    </label>
                    <textarea
                        rows={2}
                        value={commentaire}
                        onChange={(e) => setCommentaire(e.target.value)}
                        placeholder="Précisez pourquoi vous reclassez ce dossier…"
                        className="w-full px-3 py-2.5 border rounded-lg border-epo-slate-300 text-[13.5px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10 resize-y"
                    />
                    <div className="mt-1.5 text-[11px] text-epo-slate-500">
                        <i className="fas fa-history text-[9.5px] mr-1" />
                        Ce reclassement sera tracé dans l'historique du dossier (RG-03)
                    </div>
                </div>
            )}
        </Modal>
    );
}