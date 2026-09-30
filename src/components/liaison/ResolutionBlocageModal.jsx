// src/components/liaison/ResolutionBlocageModal.jsx
import { useState, useEffect } from 'react';
import { Modal, Button } from '../ui';
import {
    MOTIFS_BLOCAGE,
    formatDateHeure,
    formatDuree,
} from '../../data/enAttenteLiaison.js';

export default function ResolutionBlocageModal({ doc, onClose }) {
    const [actionSelectionnee, setActionSelectionnee] = useState('');
    const [commentaire, setCommentaire] = useState('');

    useEffect(() => {
        if (!doc) return;
        setActionSelectionnee(doc.actionRecommandee || '');
        setCommentaire('');
    }, [doc]);

    if (!doc) return null;

    const motif = MOTIFS_BLOCAGE[doc.motifBlocage];
    const actions = motif.actionsResolues;
    const canValider = actionSelectionnee && commentaire.trim().length > 3;

    const handleValider = () => {
        const action = actions.find((a) => a.key === actionSelectionnee);
        alert(
            `Blocage résolu\n\n` +
            `→ Document : ${doc.documentNumero}\n` +
            `→ Action : ${action?.label}\n` +
            `→ Commentaire : ${commentaire}\n\n` +
            `Le document sera retiré de la liste des blocages.`
        );
        onClose();
    };

    return (
        <Modal
            open={!!doc}
            onClose={onClose}
            title={`Résoudre le blocage - ${doc.documentNumero}`}
            titleIcon="fa-tools"
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
                        Confirmer la résolution
                    </Button>
                </>
            }
        >
            {/* Document */}
            <div className="p-3 mb-5 rounded-lg bg-epo-slate-50">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-[12px] font-bold text-epo-slate-800">
                        {doc.documentNumero}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${motif.chip}`}>
                        <i className={`fas ${motif.icon} text-[9.5px]`} />
                        {motif.label}
                    </span>
                </div>
                <div className="text-[13px] text-epo-slate-700">
                    {doc.documentObjet}
                </div>
            </div>

            {/* Motif détaillé */}
            <div className="p-3 mb-5 border rounded-lg bg-epo-yellow-50 border-epo-yellow-200">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-epo-yellow-700 mb-1">
                    Motif du blocage
                </div>
                <div className="text-[12.5px] text-epo-yellow-900 mb-2">
                    {doc.motifDetails}
                </div>
                <div className="text-[11px] text-epo-yellow-800">
                    <i className="fas fa-clock text-[10px] mr-1" />
                    Signalé le {formatDateHeure(doc.dateSignalement)} par {doc.signalePar}
                </div>
                <div className="text-[11px] text-epo-yellow-800 mt-0.5">
                    <i className="fas fa-hourglass-half text-[10px] mr-1" />
                    Durée du blocage : {formatDuree(doc.tempsBlocage)}
                </div>
            </div>

            {/* Historique */}
            {doc.historique && doc.historique.length > 0 && (
                <div className="mb-5">
                    <h4 className="text-[11.5px] font-semibold uppercase tracking-wider text-epo-slate-500 mb-2">
                        Historique du blocage
                    </h4>
                    <div className="flex flex-col gap-2">
                        {doc.historique.map((h, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 p-2.5 bg-white border rounded-lg border-epo-slate-200"
                            >
                                <div className="flex items-center justify-center flex-shrink-0 rounded-lg w-7 h-7 bg-epo-slate-100 text-epo-slate-600">
                                    <i className="fas fa-history text-[10px]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[12px] text-epo-slate-800">
                                        {h.action}
                                    </div>
                                    <div className="text-[10.5px] text-epo-slate-500 mt-0.5">
                                        {h.auteur} · {formatDateHeure(h.date)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Action de résolution */}
            <div className="pt-4 border-t border-epo-slate-100">
                <h4 className="text-[12.5px] font-semibold text-epo-slate-800 mb-3">
                    Action de résolution <span className="text-epo-red-500">*</span>
                </h4>
                <div className="grid grid-cols-1 gap-2 mb-4 sm:grid-cols-2">
                    {actions.map((a) => {
                        const selected = actionSelectionnee === a.key;
                        const isRecommended = doc.actionRecommandee === a.key;
                        return (
                            <button
                                key={a.key}
                                type="button"
                                onClick={() => setActionSelectionnee(a.key)}
                                className={`
                                    flex items-start gap-2.5 p-3 rounded-lg border-2 transition text-left relative
                                    ${selected
                                        ? 'border-epo-green-500 bg-epo-green-50'
                                        : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                                `}
                            >
                                <div className={`
                                    flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg text-[12px]
                                    ${selected ? 'bg-epo-green-500 text-white' : 'bg-epo-slate-100 text-epo-slate-500'}
                                `}>
                                    <i className={`fas ${a.icon}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[12.5px] font-semibold text-epo-slate-800">
                                        {a.label}
                                    </div>
                                    {isRecommended && (
                                        <div className="text-[10px] font-semibold text-epo-green-600 mt-0.5">
                                            <i className="fas fa-star text-[8px] mr-0.5" />
                                            Recommandé
                                        </div>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Commentaire */}
                <label className="block text-[12.5px] font-medium text-epo-slate-700 mb-1.5">
                    Commentaire <span className="text-epo-red-500">*</span>
                </label>
                <textarea
                    rows={3}
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                    placeholder="Précisez les détails de la résolution…"
                    className="w-full px-3 py-2.5 border rounded-lg border-epo-slate-300 text-[13px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10 resize-y"
                />
                <div className="mt-1 text-[11px] text-epo-slate-500">
                    Minimum 3 caractères · Ce commentaire sera enregistré dans l'historique.
                </div>
            </div>
        </Modal>
    );
}