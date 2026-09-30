// src/components/scc/TourneeModal.jsx
import { useState, useMemo } from 'react';
import { Modal, Button } from '../ui';
import StatutAgentBadge from './StatutAgentBadge';
import {
    formatHeure,
    formatDateHeure,
} from '../../data/liaisonsSCC.js';

export default function TourneeModal({ agent, onClose, onValiderRemise }) {
    const [selectedRemise, setSelectedRemise] = useState(null);

    const stats = useMemo(() => {
        if (!agent) return null;
        const faites = agent.remises.filter((r) => r.statut === 'remis').length;
        const total = agent.remises.length;
        const restantes = total - faites;
        return { faites, total, restantes };
    }, [agent]);

    if (!agent || !stats) return null;

    const progression = (stats.faites / stats.total) * 100;

    return (
        <Modal
            open={!!agent}
            onClose={onClose}
            title={`Tournée - ${agent.nom}`}
            titleIcon="fa-truck"
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    <Button variant="outline" icon="fa-print">
                        Imprimer la tournée
                    </Button>
                </>
            }
        >
            {/* En-tête */}
            <div className="p-4 mb-5 rounded-lg bg-epo-slate-50">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center min-w-0 gap-3">
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-epo-green-100 text-epo-green-700 text-[14px] font-bold">
                            {agent.nom.replace('M. ', '').replace('Mme ', '').split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                            <div className="text-[14px] font-bold text-epo-slate-900 truncate">
                                {agent.nom}
                            </div>
                            <div className="text-[11.5px] text-epo-slate-500">
                                Zone {agent.zone} · {agent.matricule}
                            </div>
                            <div className="text-[11.5px] text-epo-slate-500 mt-0.5">
                                <i className="fas fa-phone text-[10px] text-epo-slate-400 mr-1" />
                                {agent.telephone}
                            </div>
                        </div>
                    </div>
                    <StatutAgentBadge statut={agent.statut} size="sm" />
                </div>

                {/* Barre de progression */}
                <div className="flex items-center justify-between mb-1.5 text-[11.5px]">
                    <span className="font-medium text-epo-slate-500">
                        Remises effectuées
                    </span>
                    <span className="font-bold tabular-nums text-epo-slate-800">
                        {stats.faites} / {stats.total}
                    </span>
                </div>
                <div className="h-1.5 bg-epo-slate-200 rounded-full overflow-hidden">
                    <div
                        className="h-full transition-all bg-epo-green-500"
                        style={{ width: `${progression}%` }}
                    />
                </div>

                {stats.restantes > 0 && (
                    <div className="text-[11.5px] text-epo-slate-500 mt-2">
                        <i className="fas fa-info-circle text-[10px] mr-1" />
                        {stats.restantes} remise{stats.restantes > 1 ? 's' : ''} restante{stats.restantes > 1 ? 's' : ''} sur cette tournée
                    </div>
                )}
            </div>

            {/* Chronologie */}
            <h4 className="text-[11.5px] font-semibold uppercase tracking-wider text-epo-slate-400 mb-2">
                Chronologie de la tournée
            </h4>

            <div className="flex flex-col">
                {agent.remises.map((r, i) => {
                    const isDone = r.statut === 'remis';
                    const isEnCours = r.statut === 'en-cours';
                    const isLast = i === agent.remises.length - 1;
                    const isOpen = selectedRemise?.id === r.id;

                    return (
                        <div key={r.id} className="relative">
                            {/* Trait vertical */}
                            {!isLast && (
                                <div className={`
                                    absolute left-[18px] top-8 bottom-0 w-px
                                    ${isDone ? 'bg-epo-green-300' : 'bg-epo-slate-200'}
                                `} />
                            )}

                            <div className="relative flex gap-3 py-2">
                                {/* Pastille statut */}
                                <div className={`
                                    flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-full text-[11px] font-bold z-10
                                    ${isDone ? 'bg-epo-green-500 text-white' :
                                      isEnCours ? 'bg-epo-slate-700 text-white' :
                                      'bg-white border-2 border-epo-slate-300 text-epo-slate-400'}
                                `}>
                                    {isDone ? <i className="fas fa-check" /> : i + 1}
                                </div>

                                {/* Contenu */}
                                <div className="flex-1 min-w-0 pt-0.5">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <span className={`
                                            text-[13px] font-semibold
                                            ${isDone ? 'text-epo-slate-400 line-through' : 'text-epo-slate-800'}
                                        `}>
                                            {r.destinataire.structure} - {r.documentNumero}
                                        </span>
                                        {r.priorite === 'urgent' && !isDone && (
                                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-epo-red-50 text-epo-red-700 text-[9.5px] font-bold">
                                                <i className="fas fa-exclamation-circle text-[8px]" />
                                                URGENT
                                            </span>
                                        )}
                                    </div>

                                    <div className="text-[11.5px] text-epo-slate-500 truncate">
                                        {r.documentObjet}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[11px] text-epo-slate-500">
                                        <span>
                                            <i className="fas fa-user text-[9.5px] text-epo-slate-400 mr-1" />
                                            {r.destinataire.personne}
                                        </span>
                                        <span>
                                            <i className="fas fa-clock text-[9.5px] text-epo-slate-400 mr-1" />
                                            Prévue {formatHeure(r.heurePrevue)}
                                        </span>
                                        {isDone && r.heureRemise && (
                                            <span className="font-medium text-epo-green-600">
                                                <i className="fas fa-check text-[9.5px] mr-1" />
                                                Remis à {formatHeure(r.heureRemise)}
                                            </span>
                                        )}
                                    </div>

                                    {/* Preuve enregistrée */}
                                    {isDone && r.preuve && (
                                        <div className="inline-flex items-center gap-1.5 mt-1.5 px-2 py-0.5 rounded-full bg-epo-green-50 text-epo-green-700 text-[10.5px] font-medium">
                                            <i className={`fas ${r.preuve.type === 'signature' ? 'fa-signature' : 'fa-camera'} text-[9px]`} />
                                            Preuve {r.preuve.type}
                                        </div>
                                    )}

                                    {/* Action : marquer remise */}
                                    {!isDone && (
                                        <div className="mt-2">
                                            {!isOpen ? (
                                                <button
                                                    onClick={() => setSelectedRemise(r)}
                                                    className="text-[12px] font-semibold text-epo-green-600 hover:underline inline-flex items-center gap-1"
                                                >
                                                    <i className="fas fa-check-circle" />
                                                    Marquer remise effectuée
                                                </button>
                                            ) : (
                                                <ValidationRemise
                                                    remise={r}
                                                    onCancel={() => setSelectedRemise(null)}
                                                    onValider={(data) => {
                                                        onValiderRemise?.(agent, r, data);
                                                        setSelectedRemise(null);
                                                    }}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Modal>
    );
}

/* ============================================================
   VALIDATION DE REMISE
   ============================================================ */

function ValidationRemise({ remise, onCancel, onValider }) {
    const [typePreuve, setTypePreuve] = useState('photo');
    const [preuveChargee, setPreuveChargee] = useState(false);
    const [nomRecepteur, setNomRecepteur] = useState(remise.destinataire.personne || '');
    const [observation, setObservation] = useState('');

    const canValider =
        preuveChargee && nomRecepteur.trim().length > 2;

    return (
        <div className="p-3 mt-1 border-2 rounded-lg bg-epo-green-50/40 border-epo-green-200">
            <div className="text-[12px] font-semibold mb-2 text-epo-slate-800">
                Confirmer la remise
            </div>

            {/* Type de preuve */}
            <div className="grid grid-cols-2 gap-2 mb-2.5">
                <button
                    type="button"
                    onClick={() => {
                        setTypePreuve('photo');
                        setPreuveChargee(false);
                    }}
                    className={`
                        p-2 rounded-md border text-left transition text-[11px]
                        ${typePreuve === 'photo'
                            ? 'border-epo-green-500 bg-white font-semibold'
                            : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                    `}
                >
                    <i className={`fas fa-camera mr-1.5 ${typePreuve === 'photo' ? 'text-epo-green-600' : 'text-epo-slate-400'}`} />
                    Photo
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setTypePreuve('signature');
                        setPreuveChargee(false);
                    }}
                    className={`
                        p-2 rounded-md border text-left transition text-[11px]
                        ${typePreuve === 'signature'
                            ? 'border-epo-green-500 bg-white font-semibold'
                            : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                    `}
                >
                    <i className={`fas fa-signature mr-1.5 ${typePreuve === 'signature' ? 'text-epo-green-600' : 'text-epo-slate-400'}`} />
                    Signature
                </button>
            </div>

            {/* Zone de preuve */}
            <button
                type="button"
                onClick={() => setPreuveChargee(true)}
                className={`
                    w-full p-3 rounded-md border-2 border-dashed text-center transition mb-2.5
                    ${preuveChargee
                        ? 'border-epo-green-500 bg-white'
                        : 'border-epo-slate-300 bg-white hover:border-epo-green-400'}
                `}
            >
                {preuveChargee ? (
                    <div className="flex items-center justify-center gap-2 text-[12px] font-semibold text-epo-green-700">
                        <i className="fas fa-check-circle" />
                        Preuve enregistrée
                    </div>
                ) : (
                    <div className="text-[12px] text-epo-slate-600">
                        <i className={`fas ${typePreuve === 'signature' ? 'fa-signature' : 'fa-cloud-upload-alt'} mr-1.5 text-epo-slate-400`} />
                        Cliquer pour {typePreuve === 'signature' ? 'signer' : 'prendre une photo'}
                    </div>
                )}
            </button>

            {/* Nom du récepteur */}
            <label className="block text-[11.5px] font-medium text-epo-slate-700 mb-1">
                Nom du récepteur <span className="text-epo-red-500">*</span>
            </label>
            <input
                type="text"
                value={nomRecepteur}
                onChange={(e) => setNomRecepteur(e.target.value)}
                className="w-full px-2.5 py-1.5 border rounded-md border-epo-slate-300 text-[12.5px] mb-2.5 focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
            />

            {/* Observation */}
            <textarea
                rows={2}
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Observation (optionnel)"
                className="w-full px-2.5 py-1.5 border rounded-md border-epo-slate-300 text-[12px] mb-2.5 focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10 resize-y"
            />

            {/* RG-25 */}
            {!canValider && (
                <div className="flex items-start gap-2 p-2 mb-2.5 rounded bg-epo-yellow-50 border border-epo-yellow-200">
                    <i className="fas fa-lock text-epo-yellow-600 text-[10px] mt-0.5" />
                    <span className="text-[10.5px] text-epo-yellow-800">
                        <strong>RG-25</strong> - Preuve et récepteur obligatoires
                    </span>
                </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2">
                <button
                    onClick={onCancel}
                    className="px-3 py-1.5 rounded-md text-[11.5px] font-medium text-epo-slate-600 hover:bg-white transition"
                >
                    Annuler
                </button>
                <button
                    disabled={!canValider}
                    onClick={() =>
                        onValider({
                            typePreuve,
                            nomRecepteur,
                            observation,
                            heureRemise: new Date().toISOString(),
                        })
                    }
                    className={`
                        px-3 py-1.5 rounded-md text-[11.5px] font-semibold transition
                        ${canValider
                            ? 'bg-epo-green-500 text-white hover:bg-epo-green-600'
                            : 'bg-epo-slate-200 text-epo-slate-400 cursor-not-allowed'}
                    `}
                >
                    <i className="mr-1 fas fa-check" />
                    Confirmer
                </button>
            </div>
        </div>
    );
}