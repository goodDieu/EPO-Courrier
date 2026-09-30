// src/components/transmissions/RemiseModal.jsx
import { useState } from 'react';
import { Modal, Button } from '../ui';
import ModeBadge from './ModeBadge';
import PreuveIndicator from './PreuveIndicator';
import { ETATS_TRANSMISSION, MODES, formatDateHeure } from '../../data/transmissions.js';

export default function RemiseModal({ transmission, onClose }) {
    const [typePreuve, setTypePreuve] = useState('photo');
    const [preuveChargee, setPreuveChargee] = useState(false);
    const [nomRecepteur, setNomRecepteur] = useState('');
    const [observation, setObservation] = useState('');

    if (!transmission) return null;

    const t = transmission;
    const etat = ETATS_TRANSMISSION[t.etat] || ETATS_TRANSMISSION['a-remettre'];
    const mode = MODES[t.mode];
    const isDejaRemis = t.etat === 'decharge' || t.etat === 'remis';

    // Règle RG-25 : preuve obligatoire
    const canValider = preuveChargee && nomRecepteur.trim().length > 2;

    const handleClose = () => {
        setTypePreuve('photo');
        setPreuveChargee(false);
        setNomRecepteur('');
        setObservation('');
        onClose();
    };

    return (
        <Modal
            open={!!t}
            onClose={handleClose}
            title={`Transmission ${t.id}`}
            titleIcon="fa-truck"
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={handleClose}>
                        Fermer
                    </Button>
                    {!isDejaRemis && (
                        <Button
                            variant="primary"
                            icon="fa-check"
                            disabled={!canValider}
                        >
                            Confirmer la remise
                        </Button>
                    )}
                    {isDejaRemis && (
                        <Button variant="outline" icon="fa-print">
                            Imprimer la décharge
                        </Button>
                    )}
                </>
            }
        >
            {/* ============ État + mode ============ */}
            <div className="flex flex-wrap items-center gap-2 pb-5 mb-5 border-b border-epo-slate-100">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${etat.chip}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${etat.dot}`} />
                    {etat.label}
                </span>
                <ModeBadge mode={t.mode} />
                {t.priorite === 'urgent' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold bg-epo-red-50 text-epo-red-700">
                        <i className="fas fa-exclamation-circle text-[10px]" />
                        Urgent
                    </span>
                )}
            </div>

            {/* ============ Document source ============ */}
            <div className="mb-5">
                <h4 className="text-[11.5px] font-semibold uppercase tracking-wider text-epo-slate-400 mb-2">
                    Document
                </h4>
                <div className="p-3 rounded-lg bg-epo-slate-50">
                    <div className="flex items-center justify-between gap-3 mb-1">
                        <span className="font-mono text-[12.5px] font-bold text-epo-slate-800">
                            {t.documentNumero}
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-epo-slate-500">
                            {t.documentType === 'acte' ? 'Acte' : 'Courrier'}
                        </span>
                    </div>
                    <div className="text-[13px] text-epo-slate-700">
                        {t.documentObjet}
                    </div>
                </div>
            </div>

            {/* ============ Destinataire ============ */}
            <div className="mb-5">
                <h4 className="text-[11.5px] font-semibold uppercase tracking-wider text-epo-slate-400 mb-2">
                    Destinataire
                </h4>
                <div className="flex items-start gap-3 p-3 bg-white border rounded-lg border-epo-slate-200">
                    <div className="flex items-center justify-center flex-shrink-0 text-[11px] font-bold rounded-full w-9 h-9 bg-epo-slate-100 text-epo-slate-700">
                        {t.destinataire.personne.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-epo-slate-800">
                            {t.destinataire.personne}
                        </div>
                        <div className="text-[11.5px] text-epo-slate-500">
                            {t.destinataire.qualite}
                        </div>
                        <div className="text-[11.5px] text-epo-slate-500 mt-0.5">
                            <i className="fas fa-building mr-1 text-[10px] text-epo-slate-400" />
                            {t.destinataire.structure}
                        </div>
                    </div>
                </div>
            </div>

            {/* ============ Horodatages ============ */}
            <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 bg-white border rounded-lg border-epo-slate-200">
                    <div className="text-[10.5px] font-semibold uppercase tracking-wider text-epo-slate-400 mb-1">
                        Départ
                    </div>
                    <div className="text-[13px] font-medium tabular-nums text-epo-slate-800">
                        {formatDateHeure(t.dateDepart)}
                    </div>
                </div>
                <div className="p-3 bg-white border rounded-lg border-epo-slate-200">
                    <div className="text-[10.5px] font-semibold uppercase tracking-wider text-epo-slate-400 mb-1">
                        Remise effective
                    </div>
                    <div className={`text-[13px] font-medium tabular-nums ${t.dateRemise ? 'text-epo-green-700' : 'text-epo-slate-400'}`}>
                        {t.dateRemise ? formatDateHeure(t.dateRemise) : '-'}
                    </div>
                </div>
            </div>

            {/* ============ Preuve de transmission (RG-25) ============ */}
            <div className="mb-5">
                <div className="flex items-center justify-between gap-3 mb-2">
                    <h4 className="text-[11.5px] font-semibold uppercase tracking-wider text-epo-slate-400">
                        Preuve de transmission <span className="text-epo-red-500">*</span>
                    </h4>
                    <PreuveIndicator preuve={t.preuve} size="sm" />
                </div>

                {isDejaRemis && t.preuve ? (
                    <div className="p-3 border rounded-lg bg-epo-green-50 border-epo-green-200">
                        <div className="flex items-center gap-2 text-[13px] font-medium text-epo-green-800">
                            <i className={`fas ${t.preuve.type === 'signature' ? 'fa-signature' : 'fa-camera'}`} />
                            Preuve enregistrée le {formatDateHeure(t.preuve.date)}
                        </div>
                        <div className="mt-2 text-[11.5px] text-epo-green-700">
                            Référence : {t.preuve.url}
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Choix type de preuve */}
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            <button
                                onClick={() => setTypePreuve('photo')}
                                className={`
                                    p-3 rounded-lg border-2 text-left transition
                                    ${typePreuve === 'photo'
                                        ? 'border-epo-green-500 bg-epo-green-50'
                                        : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                                `}
                            >
                                <i className={`fas fa-camera text-[14px] mb-1 block ${typePreuve === 'photo' ? 'text-epo-green-600' : 'text-epo-slate-400'}`} />
                                <div className="text-[12px] font-semibold text-epo-slate-800">
                                    Photo
                                </div>
                                <div className="text-[10.5px] text-epo-slate-500">
                                    Prendre une photo de la remise
                                </div>
                            </button>
                            <button
                                onClick={() => setTypePreuve('signature')}
                                className={`
                                    p-3 rounded-lg border-2 text-left transition
                                    ${typePreuve === 'signature'
                                        ? 'border-epo-green-500 bg-epo-green-50'
                                        : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                                `}
                            >
                                <i className={`fas fa-signature text-[14px] mb-1 block ${typePreuve === 'signature' ? 'text-epo-green-600' : 'text-epo-slate-400'}`} />
                                <div className="text-[12px] font-semibold text-epo-slate-800">
                                    Signature du récepteur
                                </div>
                                <div className="text-[10.5px] text-epo-slate-500">
                                    Faire signer sur écran/tablette
                                </div>
                            </button>
                        </div>

                        {/* Zone d'upload / signature */}
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
                                    <div className="text-[13px] font-semibold text-epo-green-800">
                                        Preuve enregistrée
                                    </div>
                                    <div className="text-[11.5px] text-epo-green-700 mt-1">
                                        Cliquez pour remplacer
                                    </div>
                                </>
                            ) : (
                                <>
                                    <i className={`fas ${typePreuve === 'signature' ? 'fa-signature' : 'fa-cloud-upload-alt'} text-3xl mb-2 text-epo-slate-400`} />
                                    <div className="text-[13px] font-semibold text-epo-slate-700">
                                        {typePreuve === 'signature'
                                            ? 'Cliquez pour ouvrir la zone de signature'
                                            : 'Cliquez pour prendre une photo ou importer'}
                                    </div>
                                    <div className="text-[11px] text-epo-slate-400 mt-1">
                                        JPG, PNG - Max 5 Mo
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* ============ Nom du récepteur (si remise à valider) ============ */}
            {!isDejaRemis && (
                <div className="mb-5">
                    <label className="block mb-1.5 text-[12.5px] font-medium text-epo-slate-700">
                        Nom du récepteur <span className="text-epo-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={nomRecepteur}
                        onChange={(e) => setNomRecepteur(e.target.value)}
                        placeholder="Ex: Mme OUATTARA Rasmata"
                        className="w-full px-3 py-2.5 border border-epo-slate-300 rounded-lg text-[13.5px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>
            )}

            {/* ============ Observation ============ */}
            {!isDejaRemis && (
                <div className="mb-5">
                    <label className="block mb-1.5 text-[12.5px] font-medium text-epo-slate-700">
                        Observation (optionnel)
                    </label>
                    <textarea
                        rows={2}
                        value={observation}
                        onChange={(e) => setObservation(e.target.value)}
                        placeholder="Note sur la remise…"
                        className="w-full px-3 py-2.5 border border-epo-slate-300 rounded-lg text-[13.5px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10 resize-y"
                    />
                </div>
            )}

            {/* ============ Alerte RG-25 ============ */}
            {!isDejaRemis && !canValider && (
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-epo-yellow-50 border border-epo-yellow-200">
                    <i className="fas fa-exclamation-triangle text-epo-yellow-600 mt-0.5" />
                    <div className="text-[12px] text-epo-yellow-800">
                        <strong>RG-25</strong> - Une transmission ne peut être validée sans preuve
                        et sans identification du récepteur.
                    </div>
                </div>
            )}
        </Modal>
    );
}