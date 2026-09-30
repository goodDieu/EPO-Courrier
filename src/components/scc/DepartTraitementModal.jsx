// src/components/scc/DepartTraitementModal.jsx
import { useState, useEffect, useMemo } from 'react';
import { Modal, Button } from '../ui';
import ModeDepartBadge from './ModeDepartBadge';
import { SERIE_SORTANTE, formatDateHeure } from '../../data/departsSCC.js';

/* ============================================================
   MODALE
   ============================================================ */

export default function DepartTraitementModal({ depart, onClose }) {
    const [numeroAttribue, setNumeroAttribue] = useState('');
    const [cachetAppose, setCachetAppose] = useState(false);
    const [modeExpedition, setModeExpedition] = useState('liaison');
    const [referencePostale, setReferencePostale] = useState('');
    const [observation, setObservation] = useState('');

    // Sync quand le départ change
    useEffect(() => {
        if (!depart) return;
        setNumeroAttribue(depart.numeroSortant || SERIE_SORTANTE.prochain);
        setCachetAppose(depart.cachet || false);
        setModeExpedition(depart.mode === 'externe' ? 'postal' : 'liaison');
        setReferencePostale('');
        setObservation('');
    }, [depart]);

    // Étape courante selon l'état du départ
    const etapeCourante = useMemo(() => {
        if (!depart) return 'numeroter';
        if (depart.etat === 'a-numeroter') return 'numeroter';
        if (depart.etat === 'a-cacheter') return 'cacheter';
        if (depart.etat === 'pret-expedition') return 'expedier';
        return 'termine';
    }, [depart]);

    if (!depart) return null;

    const d = depart;

    // Validation par étape
    const canValider = () => {
        if (etapeCourante === 'numeroter') return numeroAttribue.trim().length > 3;
        if (etapeCourante === 'cacheter') return cachetAppose;
        if (etapeCourante === 'expedier') {
            if (modeExpedition === 'postal') return referencePostale.trim().length > 3;
            return true;
        }
        return false;
    };

    const handleValider = () => {
        const messages = {
            numeroter: `Numérotation attribuée : ${numeroAttribue}`,
            cacheter: `Cachet apposé sur le document`,
            expedier: `Expédition enregistrée`,
        };
        alert(`${messages[etapeCourante]}\n\n→ Traçabilité ajoutée à la timeline`);
        onClose();
    };

    return (
        <Modal
            open={!!d}
            onClose={onClose}
            title={`Traitement du départ ${d.id}`}
            titleIcon="fa-paper-plane"
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    <Button
                        variant="primary"
                        icon={
                            etapeCourante === 'numeroter' ? 'fa-hashtag' :
                            etapeCourante === 'cacheter' ? 'fa-stamp' : 'fa-paper-plane'
                        }
                        disabled={!canValider()}
                        onClick={handleValider}
                    >
                        {etapeCourante === 'numeroter' && 'Attribuer le numéro'}
                        {etapeCourante === 'cacheter' && 'Confirmer l\'apposition du cachet'}
                        {etapeCourante === 'expedier' && 'Enregistrer l\'expédition'}
                    </Button>
                </>
            }
        >
            {/* Étapes visuelles */}
            <Workflow etapeCourante={etapeCourante} />

            {/* Infos du document */}
            <div className="p-3 mt-5 mb-5 rounded-lg bg-epo-slate-50">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-[12px] font-bold text-epo-slate-800">
                        {d.documentSource}
                    </span>
                    <ModeDepartBadge mode={d.mode} size="sm" />
                </div>
                <div className="text-[13px] font-medium text-epo-slate-800">
                    {d.objet}
                </div>
                <div className="text-[11.5px] text-epo-slate-500 mt-1">
                    Signé par {d.signePar === 'dg' ? 'le DG' : 'le SG par délégation'} le {formatDateHeure(d.dateSignature)}
                </div>
            </div>

            {/* Contenu selon l'étape */}
            <div className="pt-5 border-t border-epo-slate-100">
                {etapeCourante === 'numeroter' && (
                    <EtapeNumeroter
                        numero={numeroAttribue}
                        setNumero={setNumeroAttribue}
                    />
                )}

                {etapeCourante === 'cacheter' && (
                    <EtapeCacheter
                        cachet={cachetAppose}
                        setCachet={setCachetAppose}
                    />
                )}

                {etapeCourante === 'expedier' && (
                    <EtapeExpedier
                        mode={modeExpedition}
                        setMode={setModeExpedition}
                        reference={referencePostale}
                        setReference={setReferencePostale}
                        depart={d}
                    />
                )}
            </div>

            {/* Observation */}
            <div className="mt-5">
                <label className="block text-[12.5px] font-medium text-epo-slate-700 mb-1.5">
                    Observation (optionnel)
                </label>
                <textarea
                    rows={2}
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                    placeholder="Note interne sur le traitement…"
                    className="w-full px-3 py-2.5 border rounded-lg border-epo-slate-300 text-[13.5px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10 resize-y"
                />
            </div>
        </Modal>
    );
}

/* ============================================================
   WORKFLOW (3 étapes)
   ============================================================ */

function Workflow({ etapeCourante }) {
    const etapes = [
        { key: 'numeroter', label: 'Numéroter', icon: 'fa-hashtag' },
        { key: 'cacheter', label: 'Cacheter', icon: 'fa-stamp' },
        { key: 'expedier', label: 'Expédier', icon: 'fa-paper-plane' },
    ];

    const indexCourant = etapes.findIndex((e) => e.key === etapeCourante);

    return (
        <div className="flex items-center gap-2">
            {etapes.map((e, i) => {
                const isActive = i === indexCourant;
                const isDone = i < indexCourant;
                return (
                    <div key={e.key} className="flex items-center flex-1 gap-2">
                        <div
                            className={`
                                flex items-center gap-2 px-3 py-2 rounded-lg
                                text-[12.5px] font-semibold transition
                                ${isActive ? 'bg-epo-green-500 text-white' :
                                  isDone ? 'bg-epo-green-50 text-epo-green-700' :
                                  'bg-epo-slate-100 text-epo-slate-400'}
                            `}
                        >
                            <span className={`
                                inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold
                                ${isActive ? 'bg-white/25' : isDone ? 'bg-epo-green-500 text-white' : 'bg-epo-slate-200 text-epo-slate-500'}
                            `}>
                                {isDone ? <i className="fas fa-check" /> : i + 1}
                            </span>
                            <span className="hidden sm:inline">{e.label}</span>
                        </div>
                        {i < etapes.length - 1 && (
                            <div className={`flex-1 h-0.5 ${i < indexCourant ? 'bg-epo-green-500' : 'bg-epo-slate-200'}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

/* ============================================================
   ÉTAPE NUMÉROTER
   ============================================================ */

function EtapeNumeroter({ numero, setNumero }) {
    return (
        <div>
            <h3 className="text-[14px] font-semibold mb-3 text-epo-slate-800">
                Attribution du numéro d'ordre sortant
            </h3>

            <div className="flex items-start gap-2 p-3 mb-4 border rounded-lg bg-epo-green-50 border-epo-green-200">
                <i className="fas fa-hashtag text-epo-green-600 mt-0.5" />
                <div className="text-[12px] text-epo-green-900">
                    <strong>{SERIE_SORTANTE.label}</strong>
                    <div className="mt-0.5 opacity-90">
                        Série indépendante · Reprise à 001 chaque 1er janvier (RG-02, RG-34 à 36)
                    </div>
                </div>
            </div>

            <label className="block text-[12.5px] font-medium text-epo-slate-700 mb-1.5">
                Numéro attribué <span className="text-epo-red-500">*</span>
            </label>
            <input
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="w-full px-3 py-3 border rounded-lg border-epo-slate-300 text-[16px] font-mono font-bold text-epo-slate-800 focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
            />

            <div className="mt-3 text-[11.5px] text-epo-slate-500">
                Le numéro est proposé automatiquement mais reste modifiable si besoin.
            </div>
        </div>
    );
}

/* ============================================================
   ÉTAPE CACHETER
   ============================================================ */

function EtapeCacheter({ cachet, setCachet }) {
    return (
        <div>
            <h3 className="text-[14px] font-semibold mb-3 text-epo-slate-800">
                Apposition du cachet EPO
            </h3>

            <button
                type="button"
                onClick={() => setCachet(!cachet)}
                className={`
                    flex items-center gap-3 w-full p-4 rounded-lg border-2 transition text-left
                    ${cachet
                        ? 'border-epo-green-500 bg-epo-green-50'
                        : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                `}
            >
                <div className={`
                    flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full
                    ${cachet ? 'bg-epo-green-500 text-white' : 'bg-epo-slate-100 text-epo-slate-400'}
                `}>
                    <i className={`fas ${cachet ? 'fa-check' : 'fa-stamp'} text-[16px]`} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-epo-slate-800">
                        {cachet ? 'Cachet apposé' : 'Confirmer l\'apposition du cachet'}
                    </div>
                    <div className="text-[11.5px] text-epo-slate-500 mt-0.5">
                        {cachet
                            ? 'Le cachet officiel de l\'EPO a été apposé sur le document'
                            : 'Cliquez pour confirmer après avoir apposé le cachet'}
                    </div>
                </div>
            </button>

            <div className="flex items-start gap-2 p-3 mt-3 rounded-lg bg-epo-slate-50">
                <i className="fas fa-info-circle text-epo-slate-400 mt-0.5" />
                <div className="text-[12px] text-epo-slate-600">
                    Le cachet atteste de l'authenticité du document. Il doit être apposé avant toute expédition.
                </div>
            </div>
        </div>
    );
}

/* ============================================================
   ÉTAPE EXPÉDIER
   ============================================================ */

function EtapeExpedier({ mode, setMode, reference, setReference, depart }) {
    const modesDisponibles = [
        { key: 'liaison', label: 'Via agent de liaison', icon: 'fa-truck', description: 'Remise par tournée' },
        { key: 'postal', label: 'Envoi postal', icon: 'fa-envelope', description: 'Expédition par courrier postal' },
        { key: 'main-propre', label: 'Remise en main propre', icon: 'fa-handshake', description: 'Retrait direct par le bénéficiaire' },
    ];

    return (
        <div>
            <h3 className="text-[14px] font-semibold mb-3 text-epo-slate-800">
                Mode d'expédition
            </h3>

            <div className="grid grid-cols-1 gap-2 mb-4 sm:grid-cols-3">
                {modesDisponibles.map((m) => {
                    const selected = mode === m.key;
                    return (
                        <button
                            key={m.key}
                            type="button"
                            onClick={() => setMode(m.key)}
                            className={`
                                text-left p-3 rounded-lg border-2 transition
                                ${selected
                                    ? 'border-epo-green-500 bg-epo-green-50'
                                    : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                            `}
                        >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${selected ? 'bg-epo-green-500 text-white' : 'bg-epo-slate-100 text-epo-slate-500'}`}>
                                <i className={`fas ${m.icon} text-[13px]`} />
                            </div>
                            <div className="text-[12px] font-semibold text-epo-slate-800">
                                {m.label}
                            </div>
                            <div className="text-[10.5px] text-epo-slate-500 mt-0.5">
                                {m.description}
                            </div>
                        </button>
                    );
                })}
            </div>

            {mode === 'postal' && (
                <div>
                    <label className="block text-[12.5px] font-medium text-epo-slate-700 mb-1.5">
                        Référence d'envoi postal <span className="text-epo-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        placeholder="Ex: LP-2026-0456"
                        className="w-full px-3 py-2.5 border rounded-lg border-epo-slate-300 text-[13.5px] font-mono focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                    <div className="mt-1 text-[11px] text-epo-slate-500">
                        La preuve d'envoi (récépissé, AR) sera à joindre après expédition (RG-25).
                    </div>
                </div>
            )}

            {mode === 'liaison' && (
                <div className="flex items-start gap-2 p-3 border rounded-lg bg-epo-green-50 border-epo-green-200">
                    <i className="fas fa-truck text-epo-green-600 mt-0.5" />
                    <div className="text-[12px] text-epo-green-900">
                        Le document sera <strong>automatiquement ajouté à une tournée</strong> de l'agent de liaison en fonction de la zone de destination.
                    </div>
                </div>
            )}

            {mode === 'main-propre' && (
                <div className="flex items-start gap-2 p-3 border rounded-lg bg-epo-yellow-50 border-epo-yellow-200">
                    <i className="fas fa-handshake text-epo-yellow-600 mt-0.5" />
                    <div className="text-[12px] text-epo-yellow-900">
                        Le bénéficiaire <strong>{depart.beneficiaire}</strong> devra venir retirer le document et signer la décharge.
                    </div>
                </div>
            )}
        </div>
    );
}