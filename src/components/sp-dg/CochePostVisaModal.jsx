// src/components/sp-dg/CochePostVisaModal.jsx
import { useState, useEffect } from 'react';
import { Modal, Button } from '../ui';
import {
    TYPES_DOSSIERS,
    NATURES_MOTIF_REFUS,
    formatDateHeure,
} from '../../data/postVisaSPDG.js';
import { notify } from '../ui/notify.js';

export default function CochePostVisaModal({ dossier, onClose }) {
    const [etape, setEtape] = useState('decision'); // 'decision' | 'rejet'
    const [typeDecision, setTypeDecision] = useState(null); // 'signe' | 'sg-delegation' | 'rejete'
    const [natureMotif, setNatureMotif] = useState('fond');
    const [motifRejet, setMotifRejet] = useState('');
    const [observation, setObservation] = useState('');

    useEffect(() => {
        if (!dossier) return;
        setEtape('decision');
        setTypeDecision(null);
        setNatureMotif('fond');
        setMotifRejet('');
        setObservation('');
    }, [dossier]);

    if (!dossier) return null;

    const d = dossier;
    const type = TYPES_DOSSIERS[d.type];

    const canValiderSignature = typeDecision === 'signe' || typeDecision === 'sg-delegation';
    const canValiderRejet = typeDecision === 'rejete' && motifRejet.trim().length > 5;

    const handleValider = () => {
        if (typeDecision === 'rejete') {
            if (!canValiderRejet) return;
            const nature = NATURES_MOTIF_REFUS[natureMotif];
            notify.fromText(
                `✅ Coche post-visa enregistrée\n\n` +
                `→ Dossier : ${d.id}\n` +
                `→ Décision : REJETÉ\n` +
                `→ Nature : ${nature.label}\n` +
                `→ Motif : ${motifRejet}\n\n` +
                `🔔 Le SG sera automatiquement notifié\n` +
                `→ Le dossier retournera au SCC pour suite du circuit`
            );
        } else {
            notify.fromText(
                `✅ Coche post-visa enregistrée\n\n` +
                `→ Dossier : ${d.id}\n` +
                `→ Décision : ${typeDecision === 'signe' ? 'SIGNÉ par le DG' : 'SIGNÉ par le SG par délégation'}\n\n` +
                `🔔 Le SG sera automatiquement notifié\n` +
                `→ Le dossier sera transmis au SCC pour traitement final`
            );
        }
        onClose();
    };

    return (
        <Modal
            open={!!d}
            onClose={onClose}
            title={`Coche post-visa- ${d.id}`}
            titleIcon="fa-check-square"
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    {etape === 'decision' && typeDecision && (
                        <Button
                            variant={typeDecision === 'rejete' ? 'redOutline' : 'primary'}
                            icon={typeDecision === 'rejete' ? 'fa-times' : 'fa-check'}
                            onClick={() => {
                                if (typeDecision === 'rejete') {
                                    setEtape('rejet');
                                } else {
                                    handleValider();
                                }
                            }}
                        >
                            {typeDecision === 'rejete' ? 'Continuer vers le motif' : 'Valider la signature'}
                        </Button>
                    )}
                    {etape === 'rejet' && (
                        <>
                            <Button variant="outline" onClick={() => setEtape('decision')}>
                                Retour
                            </Button>
                            <Button
                                variant="redOutline"
                                icon="fa-times"
                                disabled={!canValiderRejet}
                                onClick={handleValider}
                            >
                                Confirmer le rejet
                            </Button>
                        </>
                    )}
                </>
            }
        >
            {/* ============ Bandeau d'alerte black-out ============ */}
            <div className="flex items-start gap-2.5 p-3 mb-5 rounded-lg bg-epo-yellow-50 border border-epo-yellow-200">
                <i className="fas fa-exclamation-triangle text-epo-yellow-600 mt-0.5" />
                <div className="text-xs text-epo-yellow-900">
                    <strong>Mécanisme anti-black-out.</strong> Cette coche notifie automatiquement le SG du résultat de la décision du DG. Sans cette action, le SG reste sans visibilité sur le dossier.
                </div>
            </div>

            {/* ============ En-tête dossier ============ */}
            <div className="p-4 mb-5 rounded-lg bg-epo-slate-50">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-mono text-sm font-bold text-epo-slate-800 bg-white px-2 py-0.5 rounded border border-epo-slate-200">
                        {d.id}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${type.color}`}>
                        <i className={`fas ${type.icon} text-[10px]`} />
                        {type.label}
                    </span>
                    {d.priorite === 'urgent' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-epo-slate-50 text-epo-slate-900 text-xs font-bold">
                            <i className="fas fa-exclamation-circle text-[9px]" />
                            URGENT
                        </span>
                    )}
                    {d.confidence && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-epo-slate-800 text-white text-xs font-bold">
                            <i className="fas fa-lock text-[9px]" />
                            CONFIDENTIEL
                        </span>
                    )}
                </div>

                <div className="text-sm font-semibold text-epo-slate-900 mb-2">
                    {d.objet}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-epo-slate-500">
                    <span>
                        <i className="fas fa-user text-[10px] text-epo-slate-400 mr-1" />
                        Produit par {d.produitPar}
                    </span>
                    <span>
                        <i className="fas fa-clock text-[10px] text-epo-slate-400 mr-1" />
                        Arrivé au DG le {formatDateHeure(d.arriveDG.date)}
                    </span>
                </div>
            </div>

            {/* ============ Rappel du vu bon à signer ============ */}
            <div className="p-3 mb-5 border rounded-lg bg-epo-slate-50 border-epo-slate-200">
                <div className="text-xs font-semibold uppercase tracking-wider text-epo-slate-500 mb-1">
                    Vu bon à signer
                </div>
                <div className="text-sm text-epo-slate-700">
                    <i className="fas fa-check text-epo-green-600 text-[11px] mr-1.5" />
                    Signé par <strong>{d.vuBonASigner.par}</strong> le {formatDateHeure(d.vuBonASigner.date)}
                </div>
            </div>

            {/* ============ Étape 1 : Décision ============ */}
            {etape === 'decision' && (
                <>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-epo-slate-500 mb-3">
                        Quelle est la décision du DG ?
                    </h4>

                    <div className="grid grid-cols-1 gap-3 mb-5 sm:grid-cols-3">
                        <button
                            type="button"
                            onClick={() => setTypeDecision('signe')}
                            className={`
                                text-left p-4 rounded-xl border-2 transition
                                ${typeDecision === 'signe'
                                    ? 'border-epo-green-500 bg-epo-green-50'
                                    : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                            `}
                        >
                            <div className={`
                                flex items-center justify-center w-10 h-10 rounded-lg mb-2
                                ${typeDecision === 'signe' ? 'bg-epo-green-700 text-white' : 'bg-epo-slate-100 text-epo-slate-600'}
                            `}>
                                <i className="fas fa-check-circle text-[16px]" />
                            </div>
                            <div className="text-sm font-bold text-epo-slate-800">
                                Signé par le DG
                            </div>
                            <div className="text-xs text-epo-slate-500 mt-0.5">
                                Le DG a apposé sa signature
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => setTypeDecision('sg-delegation')}
                            className={`
                                text-left p-4 rounded-xl border-2 transition
                                ${typeDecision === 'sg-delegation'
                                    ? 'border-epo-green-500 bg-epo-green-50'
                                    : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                            `}
                        >
                            <div className={`
                                flex items-center justify-center w-10 h-10 rounded-lg mb-2
                                ${typeDecision === 'sg-delegation' ? 'bg-epo-green-700 text-white' : 'bg-epo-slate-100 text-epo-slate-700'}
                            `}>
                                <i className="fas fa-stamp text-[16px]" />
                            </div>
                            <div className="text-sm font-bold text-epo-slate-800">
                                Signé par délégation
                            </div>
                            <div className="text-xs text-epo-slate-500 mt-0.5">
                                Le SG a signé pour le DG
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => setTypeDecision('rejete')}
                            className={`
                                text-left p-4 rounded-xl border-2 transition
                                ${typeDecision === 'rejete'
                                    ? 'border-epo-red-500 bg-epo-slate-50'
                                    : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                            `}
                        >
                            <div className={`
                                flex items-center justify-center w-10 h-10 rounded-lg mb-2
                                ${typeDecision === 'rejete' ? 'bg-epo-red-500 text-white' : 'bg-epo-slate-100 text-epo-slate-600'}
                            `}>
                                <i className="fas fa-times-circle text-[16px]" />
                            </div>
                            <div className="text-sm font-bold text-epo-slate-800">
                                Rejeté par le DG
                            </div>
                            <div className="text-xs text-epo-slate-500 mt-0.5">
                                Motif obligatoire
                            </div>
                        </button>
                    </div>
                </>
            )}

            {/* ============ Étape 2 : Motif de rejet (§8.7) ============ */}
            {etape === 'rejet' && (
                <>
                    <div className="p-4 mb-5 border rounded-lg bg-epo-slate-50 border-epo-slate-200">
                        <div className="flex items-start gap-2">
                            <i className="fas fa-times-circle text-epo-red-600 mt-0.5" />
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-epo-slate-900 mb-0.5">
                                    Décision : Rejet
                                </div>
                                <div className="text-xs text-epo-slate-900">
                                    Le SG sera automatiquement notifié du rejet.
                                </div>
                            </div>
                        </div>
                    </div>

                    <h4 className="text-sm font-semibold uppercase tracking-wider text-epo-slate-500 mb-3">
                        Nature du motif <span className="text-epo-red-500">*</span>
                        <span className="ml-2 font-normal normal-case text-epo-slate-400">
                            (§8.7- distinction fond / forme / pièces)
                        </span>
                    </h4>

                    <div className="grid grid-cols-1 gap-2 mb-5 sm:grid-cols-3">
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
                                            flex items-center justify-center w-6 h-6 rounded text-xs
                                            ${selected ? 'bg-epo-red-500 text-white' : 'bg-epo-slate-100 text-epo-slate-500'}
                                        `}>
                                            <i className={`fas ${n.icon}`} />
                                        </div>
                                        <span className="text-sm font-semibold text-epo-slate-800">
                                            {n.label}
                                        </span>
                                    </div>
                                    <div className="text-xs text-epo-slate-500 leading-tight">
                                        {n.description}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <h4 className="text-sm font-semibold uppercase tracking-wider text-epo-slate-500 mb-2">
                        Motif du rejet <span className="text-epo-red-500">*</span>
                    </h4>
                    <textarea
                        rows={3}
                        value={motifRejet}
                        onChange={(e) => setMotifRejet(e.target.value)}
                        placeholder="Précisez le motif du rejet…"
                        className="w-full px-3 py-2.5 border rounded-lg border-epo-slate-300 text-sm focus:outline-none focus:border-epo-red-500 focus:ring-2 focus:ring-epo-red-500/10 resize-y"
                    />
                    <div className="mt-1.5 text-xs text-epo-slate-500">
                        Minimum 5 caractères · Ce motif sera visible par le SG et dans la timeline du dossier
                    </div>
                </>
            )}

            {/* ============ Observation (optionnel) ============ */}
            {etape === 'decision' && typeDecision && typeDecision !== 'rejete' && (
                <div className="mt-5">
                    <label className="block text-sm font-medium text-epo-slate-700 mb-1.5">
                        Observation (optionnel)
                    </label>
                    <textarea
                        rows={2}
                        value={observation}
                        onChange={(e) => setObservation(e.target.value)}
                        placeholder="Note interne sur la coche…"
                        className="w-full px-3 py-2.5 border rounded-lg border-epo-slate-300 text-sm focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10 resize-y"
                    />
                </div>
            )}
        </Modal>
    );
}