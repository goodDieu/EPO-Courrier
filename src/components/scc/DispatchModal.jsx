// src/components/scc/DispatchModal.jsx
import { useState } from 'react';
import { Modal, Button } from '../ui';
import ClassificationBadge from './ClassificationBadge';
import {
    MODES_REMISE,
    AGENTS_LIAISON,
    formatHeure,
    devineModeRemise,
} from '../../data/dispatchSCC.js';
import { notify } from '../ui/notify.js';

/* ============================================================
   MODALE
   ============================================================ */

export default function DispatchModal({ dossier, onClose, onDispatch, agents = AGENTS_LIAISON }) {
    // État initialisé à l'ouverture : la page remonte la modale pour chaque dossier (prop key)
    const [mode, setMode] = useState(() => (dossier ? dossier.modePrevu || devineModeRemise(dossier.structureDestinataire) : 'liaison'));
    const [agentId, setAgentId] = useState('');
    const [typePreuve, setTypePreuve] = useState('photo');
    const [preuveChargee, setPreuveChargee] = useState(false);
    const [nomRecepteur, setNomRecepteur] = useState(() => dossier?.destinataire.personne || '');
    const [observation, setObservation] = useState('');

    if (!dossier) return null;

    const d = dossier;
    const agent = agents.find((a) => a.id === agentId);
    const requiresAgent = mode === 'liaison';

    // La preuve de remise n'est demandée que si la remise a lieu maintenant (au guichet).
    // En liaison, c'est l'agent qui la recueille chez le destinataire ; entre
    // secrétariats, la décharge est gérée par le secrétariat destinataire.
    const requiresPreuve = mode === 'main-propre';
    const canValider =
        (!requiresAgent || agentId) &&
        (!requiresPreuve || (preuveChargee && nomRecepteur.trim().length > 2));

    const handleClose = () => {
        onClose();
    };

    const handleValider = () => {
        onDispatch?.(d, { mode, agent, nomRecepteur: nomRecepteur.trim(), typePreuve, observation });

        if (mode === 'liaison') {
            notify.success(`Courrier ${d.id} confié à ${agent?.nom}`, {
                items: [`À remettre à : ${d.destinataire.structure} (${d.destinataire.personne})`, "L'agent est prévenu de sa nouvelle remise"],
            });
        } else if (mode === 'main-propre') {
            notify.success(`Courrier ${d.id} remis en main propre`, {
                items: [`Reçu par : ${nomRecepteur.trim()}`, 'Preuve de remise enregistrée'],
            });
        } else {
            notify.success(`Courrier ${d.id} remis au secrétariat`, {
                items: ['La décharge est gérée par le secrétariat destinataire'],
            });
        }
        handleClose();
    };

    return (
        <Modal
            open={!!d}
            onClose={handleClose}
            title={`Dispatcher le dossier ${d.id}`}
            titleIcon="fa-paper-plane"
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button
                        variant="primary"
                        icon="fa-check"
                        disabled={!canValider}
                        onClick={handleValider}
                    >
                        Confirmer le dispatch
                    </Button>
                </>
            }
        >
            {/* ============ En-tête dossier ============ */}
            <div className="p-4 mb-5 rounded-lg bg-epo-slate-50">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-sm font-bold text-epo-slate-800">
                        {d.id}
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                        <ClassificationBadge classification={d.classification} size="sm" />
                        {d.tempsRestantMin < 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-epo-slate-50 text-epo-slate-900 text-xs font-semibold">
                                <i className="fas fa-exclamation-circle text-[9px]" />
                                En retard
                            </span>
                        )}
                    </div>
                </div>

                <div className="text-sm font-semibold text-epo-slate-900">
                    {d.objet}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-epo-slate-500">
                    <span>
                        <i className="fas fa-user text-[10.5px] text-epo-slate-400 mr-1" />
                        {d.expediteur}
                    </span>
                    <span>
                        <i className="fas fa-clock text-[10.5px] text-epo-slate-400 mr-1" />
                        Reçu à {formatHeure(d.dateReceptionSCC)}
                    </span>
                </div>
            </div>

            {/* ============ Destinataire ============ */}
            <div className="mb-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-epo-slate-400 mb-2">
                    Destinataire
                </h4>
                <div className="flex items-start gap-3 p-3 bg-white border rounded-lg border-epo-slate-200">
                    <div className="flex items-center justify-center flex-shrink-0 text-xs font-bold rounded-full w-9 h-9 bg-epo-slate-100 text-epo-slate-700">
                        {d.destinataire.personne.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-epo-slate-800">
                            {d.destinataire.personne}
                        </div>
                        <div className="text-xs text-epo-slate-500">
                            {d.destinataire.qualite}
                        </div>
                        <div className="text-xs text-epo-slate-500 mt-0.5">
                            <i className="fas fa-building mr-1 text-[10px] text-epo-slate-400" />
                            {d.destinataire.structure}
                        </div>
                    </div>
                </div>
            </div>

            {/* ============ Choix du mode ============ */}
            <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-epo-slate-400">
                        Mode de remise
                    </h4>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-epo-slate-100 text-epo-slate-700 text-xs font-semibold">
                        <i className="fas fa-magic text-[8px]" />
                        Pré-rempli
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {Object.values(MODES_REMISE).map((m) => {
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
                                <div className={`flex items-center justify-center w-8 h-8 rounded-lg mb-2 ${selected ? 'bg-epo-green-700 text-white' : 'bg-epo-slate-100 text-epo-slate-500'}`}>
                                    <i className={`fas ${m.icon} text-[13px]`} />
                                </div>
                                <div className="text-xs font-semibold text-epo-slate-800">
                                    {m.label}
                                </div>
                                <div className="text-xs text-epo-slate-500 mt-0.5 leading-tight">
                                    {m.description}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ============ Choix de l'agent (si liaison) ============ */}
            {requiresAgent && (
                <div className="mb-5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-epo-slate-400 mb-2">
                        Agent de liaison <span className="text-epo-red-500">*</span>
                    </h4>
                    <div className="flex flex-col gap-2">
                        {agents.map((a) => {
                            const selected = agentId === a.id;
                            const unavailable = !a.disponible;
                            return (
                                <button
                                    key={a.id}
                                    type="button"
                                    onClick={() => !unavailable && setAgentId(a.id)}
                                    disabled={unavailable}
                                    className={`
                                        flex items-center gap-3 p-3 rounded-lg border-2 transition text-left
                                        ${unavailable
                                            ? 'border-epo-slate-200 bg-epo-slate-50 opacity-60 cursor-not-allowed'
                                            : selected
                                                ? 'border-epo-green-500 bg-epo-green-50'
                                                : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                                    `}
                                >
                                    <div className={`flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-full text-xs font-bold ${selected ? 'bg-epo-green-700 text-white' : 'bg-epo-slate-100 text-epo-slate-700'}`}>
                                        {a.nom.replace('M. ', '').replace('Mme ', '').split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-semibold text-epo-slate-800 truncate">
                                            {a.nom}
                                        </div>
                                        <div className="text-xs text-epo-slate-500 truncate">
                                            {a.zone}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end flex-shrink-0 gap-0.5">
                                        <span className="text-xs font-semibold tabular-nums text-epo-slate-500">
                                            {a.chargeJour} remise{a.chargeJour > 1 ? 's' : ''} prévue{a.chargeJour > 1 ? 's' : ''}
                                        </span>
                                        {a.disponible ? (
                                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-epo-slate-100 text-epo-slate-700 text-xs font-semibold">
                                                <span className="w-1.5 h-1.5 rounded-full bg-epo-green-500" />
                                                Disponible
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-epo-slate-50 text-epo-slate-900 text-xs font-semibold">
                                                {a.indisponibleMotif}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ============ Preuve de transmission ============ */}
            {requiresPreuve && (
                <div className="mb-5">
                    <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-epo-slate-400">
                            Preuve de remise <span className="text-epo-red-500">*</span>
                        </h4>
                    </div>

                    {/* Type de preuve */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                        <button
                            type="button"
                            onClick={() => {
                                setTypePreuve('photo');
                                setPreuveChargee(false);
                            }}
                            className={`
                                p-3 rounded-lg border-2 text-left transition
                                ${typePreuve === 'photo'
                                    ? 'border-epo-green-500 bg-epo-green-50'
                                    : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                            `}
                        >
                            <i className={`fas fa-camera text-[14px] mb-1 block ${typePreuve === 'photo' ? 'text-epo-green-600' : 'text-epo-slate-400'}`} />
                            <div className="text-xs font-semibold text-epo-slate-800">
                                Photo
                            </div>
                            <div className="text-xs text-epo-slate-500">
                                Prendre une photo de la remise
                            </div>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setTypePreuve('signature');
                                setPreuveChargee(false);
                            }}
                            className={`
                                p-3 rounded-lg border-2 text-left transition
                                ${typePreuve === 'signature'
                                    ? 'border-epo-green-500 bg-epo-green-50'
                                    : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                            `}
                        >
                            <i className={`fas fa-signature text-[14px] mb-1 block ${typePreuve === 'signature' ? 'text-epo-green-600' : 'text-epo-slate-400'}`} />
                            <div className="text-xs font-semibold text-epo-slate-800">
                                Signature
                            </div>
                            <div className="text-xs text-epo-slate-500">
                                Faire signer le récepteur
                            </div>
                        </button>
                    </div>

                    {/* Zone d'upload */}
                    <div
                        onClick={() => setPreuveChargee(true)}
                        className={`
                            p-6 rounded-lg border-2 border-dashed text-center cursor-pointer transition
                            ${preuveChargee
                                ? 'border-epo-green-500 bg-epo-green-50'
                                : 'border-epo-slate-300 hover:border-epo-green-400 hover:bg-epo-slate-50'}
                        `}
                    >
                        {preuveChargee ? (
                            <>
                                <i className="mb-2 text-3xl fas fa-check-circle text-epo-green-500" />
                                <div className="text-sm font-semibold text-epo-green-800">
                                    Preuve enregistrée
                                </div>
                                <div className="text-xs text-epo-green-700 mt-1">
                                    Cliquez pour remplacer
                                </div>
                            </>
                        ) : (
                            <>
                                <i className={`fas ${typePreuve === 'signature' ? 'fa-signature' : 'fa-cloud-upload-alt'} text-3xl mb-2 text-epo-slate-400`} />
                                <div className="text-sm font-semibold text-epo-slate-700">
                                    {typePreuve === 'signature'
                                        ? 'Cliquez pour ouvrir la zone de signature'
                                        : 'Cliquez pour prendre une photo ou importer'}
                                </div>
                                <div className="text-xs text-epo-slate-400 mt-1">
                                    JPG, PNG - Max 5 Mo
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* ============ Nom du récepteur ============ */}
            {requiresPreuve && (
                <div className="mb-5">
                    <label className="block text-sm font-medium text-epo-slate-700 mb-1.5">
                        Nom du récepteur <span className="text-epo-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={nomRecepteur}
                        onChange={(e) => setNomRecepteur(e.target.value)}
                        placeholder="Ex: Mme OUATTARA Rasmata"
                        className="w-full px-3 py-2.5 border rounded-lg border-epo-slate-300 text-sm focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>
            )}

            {/* ============ Observation ============ */}
            <div className="mb-3">
                <label className="block text-sm font-medium text-epo-slate-700 mb-1.5">
                    Observation (optionnel)
                </label>
                <textarea
                    rows={2}
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                    placeholder="Note sur la remise…"
                    className="w-full px-3 py-2.5 border rounded-lg border-epo-slate-300 text-sm focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10 resize-y"
                />
            </div>

            {/* ============ Alerte RG-25 ============ */}
            {requiresPreuve && !canValider && (
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-epo-yellow-50 border border-epo-yellow-200">
                    <i className="fas fa-exclamation-triangle text-epo-yellow-600 mt-0.5" />
                    <div className="text-xs text-epo-yellow-800">
                        Pour valider la remise, joignez la preuve et indiquez le nom de la personne qui reçoit le courrier.
                    </div>
                </div>
            )}

            {!requiresPreuve && (
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-epo-slate-50 border border-epo-slate-200">
                    <i className="fas fa-info-circle text-epo-slate-400 mt-0.5" />
                    <div className="text-sm text-epo-slate-700">
                        {mode === 'liaison'
                            ? "La preuve de remise sera recueillie par l'agent de liaison chez le destinataire."
                            : 'La décharge est gérée directement par le secrétariat particulier du destinataire.'}
                    </div>
                </div>
            )}
        </Modal>
    );
}