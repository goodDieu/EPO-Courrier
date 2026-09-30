// src/components/dg/DgValidationModal.jsx
import { useState, useEffect } from 'react';
import { Modal, Button, PriorityTag } from '../ui';
import {
    TYPES_A_VALIDER,
    NATURES_MOTIF_REFUS,
} from '../../data/aValiderDG.js';

export default function DgValidationModal({ document, onClose }) {
    const [mode, setMode] = useState('lecture'); // 'lecture' | 'valider' | 'annoter' | 'refuser'
    const [avis, setAvis] = useState('');
    const [annotation, setAnnotation] = useState('');
    const [natureMotif, setNatureMotif] = useState('fond');
    const [motifRefus, setMotifRefus] = useState('');

    useEffect(() => {
        if (!document) return;
        setMode('lecture');
        setAvis('');
        setAnnotation('');
        setNatureMotif('fond');
        setMotifRefus('');
    }, [document]);

    if (!document) return null;

    const d = document;
    const type = TYPES_A_VALIDER[d.type];

    /* Validations par mode */
    const canValider = true; // avis optionnel
    const canAnnoter = annotation.trim().length > 5;
    const canRefuser = motifRefus.trim().length > 5;

    /* Handlers */
    const handleValider = () => {
        alert(
            `Document validé : ${d.id}\n\n` +
            (avis ? `→ Avis : ${avis}\n` : '→ Validé sans avis complémentaire\n') +
            `→ Retour au SG pour instruction\n` +
            `→ Le SG sera notifié`
        );
        onClose();
    };

    const handleAnnoter = () => {
        if (!canAnnoter) return;
        alert(
            `Document annoté : ${d.id}\n\n` +
            `→ Annotation : ${annotation}\n` +
            `→ Retour au SG pour transmission de vos annotations\n` +
            `→ Le SG sera notifié`
        );
        onClose();
    };

    const handleRefuser = () => {
        if (!canRefuser) return;
        const nature = NATURES_MOTIF_REFUS[natureMotif];
        alert(
            `Document refusé : ${d.id}\n\n` +
            `→ Nature : ${nature.label}\n` +
            `→ Motif : ${motifRefus}\n` +
            `→ Le SG sera automatiquement notifié (RG-18)\n` +
            `→ Le document retournera au producteur pour correction`
        );
        onClose();
    };

    /* Footer dynamique selon le mode */
    const renderFooter = () => {
        if (mode === 'lecture') {
            return (
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    <Button variant="outline" icon="fa-pen-nib" onClick={() => setMode('annoter')}>
                        Annoter
                    </Button>
                    <Button
                        variant="redOutline"
                        icon="fa-times"
                        onClick={() => setMode('refuser')}
                    >
                        Refuser
                    </Button>
                    <Button variant="primary" icon="fa-check" onClick={() => setMode('valider')}>
                        Valider
                    </Button>
                </>
            );
        }

        if (mode === 'valider') {
            return (
                <>
                    <Button variant="outline" onClick={() => setMode('lecture')}>
                        Retour
                    </Button>
                    <Button variant="primary" icon="fa-check" onClick={handleValider}>
                        Confirmer la validation
                    </Button>
                </>
            );
        }

        if (mode === 'annoter') {
            return (
                <>
                    <Button variant="outline" onClick={() => setMode('lecture')}>
                        Retour
                    </Button>
                    <Button
                        variant="primary"
                        icon="fa-pen-nib"
                        disabled={!canAnnoter}
                        onClick={handleAnnoter}
                    >
                        Envoyer l'annotation
                    </Button>
                </>
            );
        }

        if (mode === 'refuser') {
            return (
                <>
                    <Button variant="outline" onClick={() => setMode('lecture')}>
                        Annuler le refus
                    </Button>
                    <Button
                        variant="redOutline"
                        icon="fa-times"
                        disabled={!canRefuser}
                        onClick={handleRefuser}
                    >
                        Confirmer le refus
                    </Button>
                </>
            );
        }
    };

    return (
        <Modal
            open={!!d}
            onClose={onClose}
            title={
                mode === 'valider' ? `Valider -${d.objet}` :
                mode === 'annoter' ? `Annoter -${d.objet}` :
                mode === 'refuser' ? `Refuser -${d.objet}` :
                `Valider -${d.objet}`
            }
            titleIcon="fa-check-double"
            size="lg"
            footer={renderFooter()}
        >
            {/* En-tête */}
            <div className="flex flex-wrap items-center gap-2 pb-5 mb-5 border-b border-epo-slate-100">
                <span className="font-mono text-[12.5px] font-bold text-epo-slate-800 bg-epo-slate-100 px-2.5 py-1 rounded-full">
                    {d.id}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${type.color}`}>
                    <i className={`fas ${type.icon} text-[10px]`} />
                    {type.label}
                </span>
                <PriorityTag priority={d.priorite} />
                <span className="text-[12.5px] text-epo-slate-500 ml-auto">
                    Provenance : <strong className="text-epo-slate-700">{d.provenence}</strong>
                </span>
            </div>

            {/* Métadonnées */}
            <div className="space-y-0">
                <DetailRow label="Objet" value={<strong>{d.objet}</strong>} />
                <DetailRow label="Expéditeur" value={d.expediteur} />
                <DetailRow
                    label="Date du document"
                    value={new Date(d.dateDocument).toLocaleDateString('fr-FR')}
                />
                <DetailRow label="Description" value={d.description} />
                <DetailRow
                    label="Fonds de dossier"
                    value={
                        <div className="flex flex-wrap gap-2">
                            {(d.pieces || []).map((p, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-epo-slate-100 text-[12px] text-epo-slate-700"
                                >
                                    <i className="fas fa-paperclip text-epo-slate-400 text-[10px]" />
                                    {p}
                                </span>
                            ))}
                        </div>
                    }
                    last
                />
            </div>

            {/* Contenu */}
            <div className="p-4 my-4 rounded-lg bg-epo-slate-50">
                <strong className="text-[13px] text-epo-slate-500 uppercase tracking-wider block mb-2">
                    Contenu du document
                </strong>
                <p className="text-[14px] text-epo-slate-700 leading-relaxed">
                    {d.contenu}
                </p>
            </div>

            {/* Mode VALIDER -Avis optionnel */}
            {mode === 'valider' && (
                <div className="p-4 border rounded-lg border-epo-green-200 bg-epo-green-50/40">
                    <label className="block text-[12.5px] font-semibold text-epo-green-800 mb-2">
                        Avis du DG <span className="font-normal text-epo-slate-500">(optionnel)</span>
                    </label>
                    <textarea
                        rows={3}
                        value={avis}
                        onChange={(e) => setAvis(e.target.value)}
                        placeholder="Formulez un avis, une orientation, une remarque…"
                        className="w-full px-3 py-2.5 border rounded-lg border-epo-green-200 text-[13.5px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10 resize-y"
                    />
                    <div className="mt-2 text-[11.5px] text-epo-slate-500">
                        Cet avis sera transmis au SG avec la validation.
                    </div>
                </div>
            )}

            {/* Mode ANNOTER */}
            {mode === 'annoter' && (
                <div className="p-4 border rounded-lg border-epo-slate-300 bg-epo-slate-50">
                    <label className="block text-[12.5px] font-semibold text-epo-slate-800 mb-2">
                        Annotation <span className="text-epo-red-500">*</span>
                    </label>
                    <textarea
                        rows={4}
                        value={annotation}
                        onChange={(e) => setAnnotation(e.target.value)}
                        placeholder="Précisez les annotations, les modifications attendues…"
                        className="w-full px-3 py-2.5 border rounded-lg border-epo-slate-300 text-[13.5px] focus:outline-none focus:border-epo-slate-500 focus:ring-2 focus:ring-epo-slate-500/10 resize-y"
                    />
                    <div className="mt-2 text-[11.5px] text-epo-slate-500">
                        Minimum 5 caractères · Le document retournera au producteur avec vos annotations.
                    </div>
                </div>
            )}

            {/* Mode REFUSER -§8.7 */}
            {mode === 'refuser' && (
                <div className="p-4 border rounded-lg border-epo-red-200 bg-epo-red-50/40">
                    {/* Nature du motif */}
                    <label className="block text-[12.5px] font-semibold text-epo-red-700 mb-2">
                        Nature du motif <span className="text-epo-red-500">*</span>
                        <span className="ml-2 font-normal text-epo-slate-500">
                            (§8.7 -distinction fond / forme / pièces)
                        </span>
                    </label>
                    <div className="grid grid-cols-1 gap-2 mb-4 sm:grid-cols-3">
                        {Object.values(NATURES_MOTIF_REFUS).map((n) => {
                            const selected = natureMotif === n.key;
                            return (
                                <button
                                    key={n.key}
                                    type="button"
                                    onClick={() => setNatureMotif(n.key)}
                                    className={`
                                        text-left p-3 rounded-lg border-2 transition
                                        ${selected
                                            ? 'border-epo-red-500 bg-white'
                                            : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                                    `}
                                >
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <div className={`
                                            flex items-center justify-center w-6 h-6 rounded text-[10px]
                                            ${selected ? 'bg-epo-red-500 text-white' : 'bg-epo-slate-100 text-epo-slate-500'}
                                        `}>
                                            <i className={`fas ${n.icon}`} />
                                        </div>
                                        <span className="text-[12.5px] font-semibold text-epo-slate-800">
                                            {n.label}
                                        </span>
                                    </div>
                                    <div className="text-[10.5px] text-epo-slate-500 leading-tight">
                                        {n.description}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Motif */}
                    <label className="block text-[12.5px] font-semibold text-epo-red-700 mb-2">
                        Motif du refus <span className="text-epo-red-500">*</span>
                        <span className="ml-2 font-normal text-epo-slate-500">
                            (RG-19 -obligatoire · RG-18 -notifié au SG)
                        </span>
                    </label>
                    <textarea
                        rows={3}
                        value={motifRefus}
                        onChange={(e) => setMotifRefus(e.target.value)}
                        placeholder="Précisez le motif du refus…"
                        className="w-full px-3 py-2.5 border rounded-lg border-epo-red-200 text-[13.5px] focus:outline-none focus:border-epo-red-500 focus:ring-2 focus:ring-epo-red-500/10 resize-y"
                    />
                    <div className="mt-2 text-[11.5px] text-epo-slate-500">
                        Minimum 5 caractères · Le document retournera au producteur pour correction.
                    </div>
                </div>
            )}
        </Modal>
    );
}

/* ============================================================
   HELPERS
   ============================================================ */

function DetailRow({ label, value, last = false }) {
    return (
        <div
            className={`
                flex flex-col sm:flex-row gap-1 sm:gap-4 py-3
                ${!last ? 'border-b border-epo-slate-100' : ''}
            `}
        >
            <div className="w-full sm:w-40 flex-shrink-0 text-[12px] font-semibold uppercase tracking-wider text-epo-slate-500">
                {label}
            </div>
            <div className="flex-1 text-[13.5px] text-epo-slate-800">{value}</div>
        </div>
    );
}