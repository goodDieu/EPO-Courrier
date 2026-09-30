// src/components/dg/GestionAccesModal.jsx
import { useState } from 'react';
import { Modal, Button } from '../ui';

const ACCES_DISPONIBLES = [
    { key: 'lecture', label: 'Lecture seule', icon: 'fa-eye', description: 'Consultation uniquement' },
    { key: 'lecture-ecriture', label: 'Lecture + écriture', icon: 'fa-edit', description: 'Peut modifier' },
    { key: 'signature', label: 'Signature', icon: 'fa-signature', description: 'Peut signer' },
];

export default function GestionAccesModal({ document, onClose }) {
    const [liste, setListe] = useState(document?.listeBlanche || []);
    const [showAjout, setShowAjout] = useState(false);
    const [nouveauNom, setNouveauNom] = useState('');
    const [nouvelleFonction, setNouvelleFonction] = useState('');
    const [nouvelAcces, setNouvelAcces] = useState('lecture');
    const [dureeAcces, setDureeAcces] = useState('permanent');
    const [raison, setRaison] = useState('');

    if (!document) return null;

    const d = document;

    const handleRetirer = (id) => {
        setListe((prev) => prev.filter((u) => u.id !== id));
    };

    const handleAjouter = () => {
        if (!nouveauNom.trim() || !nouvelleFonction.trim()) return;
        setListe((prev) => [
            ...prev,
            {
                id: `u-new-${Date.now()}`,
                nom: nouveauNom,
                fonction: nouvelleFonction,
                acces: nouvelAcces,
                duree: dureeAcces,
                raison,
            },
        ]);
        setNouveauNom('');
        setNouvelleFonction('');
        setNouvelAcces('lecture');
        setDureeAcces('permanent');
        setRaison('');
        setShowAjout(false);
    };

    const canAjouter =
        nouveauNom.trim().length > 2 &&
        nouvelleFonction.trim().length > 2 &&
        (dureeAcces === 'permanent' || raison.trim().length > 5);

    return (
        <Modal
            open={!!d}
            onClose={onClose}
            title={`Gérer les accès -${d.id}`}
            titleIcon="fa-shield-halved"
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" icon="fa-save">
                        Enregistrer les accès
                    </Button>
                </>
            }
        >
            {/* Info RG-11 */}
            <div className="flex items-start gap-2 p-3 mb-5 border rounded-lg bg-epo-slate-50 border-epo-slate-200">
                <i className="fas fa-info-circle text-epo-slate-500 mt-0.5" />
                <div className="text-[12px] text-epo-slate-700">
                    <strong>Liste blanche (RG-11).</strong> Seuls les utilisateurs listés ci-dessous peuvent accéder à ce document. Toute modification est journalisée (RG-13).
                </div>
            </div>

            {/* Liste actuelle */}
            <h4 className="text-[11.5px] font-semibold uppercase tracking-wider text-epo-slate-400 mb-2">
                Utilisateurs autorisés ({liste.length})
            </h4>

            <div className="flex flex-col gap-2 mb-5">
                {liste.map((u) => (
                    <div
                        key={u.id}
                        className="flex items-center gap-3 p-3 bg-white border rounded-lg border-epo-slate-200"
                    >
                        <div className="flex items-center justify-center flex-shrink-0 text-[11px] font-bold rounded-full w-9 h-9 bg-epo-slate-100 text-epo-slate-700">
                            {u.nom.replace('M. ', '').replace('Mme ', '').replace('Pr. ', '').split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold text-epo-slate-800">
                                {u.nom}
                            </div>
                            <div className="text-[11.5px] text-epo-slate-500">
                                {u.fonction}
                            </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-epo-slate-100 text-epo-slate-700 text-[11px] font-semibold">
                            <i className={`fas ${ACCES_DISPONIBLES.find((a) => a.key === u.acces)?.icon || 'fa-eye'} text-[10px]`} />
                            {ACCES_DISPONIBLES.find((a) => a.key === u.acces)?.label || u.acces}
                        </span>
                        <button
                            onClick={() => handleRetirer(u.id)}
                            className="flex items-center justify-center flex-shrink-0 transition rounded-full w-7 h-7 text-epo-red-500 hover:bg-epo-red-50"
                            title="Retirer l'accès"
                        >
                            <i className="fas fa-times text-[11px]" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Bouton ajout */}
            {!showAjout ? (
                <button
                    onClick={() => setShowAjout(true)}
                    className="flex items-center justify-center w-full gap-2 py-3 text-[13px] font-semibold transition border-2 border-dashed rounded-lg border-epo-slate-300 text-epo-slate-600 hover:border-epo-green-400 hover:bg-epo-green-50 hover:text-epo-green-700"
                >
                    <i className="fas fa-plus" />
                    Ajouter un accès (RG-12)
                </button>
            ) : (
                <div className="p-4 border-2 rounded-lg bg-epo-green-50/40 border-epo-green-200">
                    <div className="text-[12.5px] font-semibold mb-3 text-epo-slate-800">
                        Nouvel accès ponctuel
                    </div>

                    <div className="grid grid-cols-1 gap-3 mb-3 sm:grid-cols-2">
                        <div>
                            <label className="block text-[11.5px] font-medium text-epo-slate-700 mb-1">
                                Nom <span className="text-epo-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={nouveauNom}
                                onChange={(e) => setNouveauNom(e.target.value)}
                                placeholder="Ex: Mme DUPONT Marie"
                                className="w-full px-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                            />
                        </div>
                        <div>
                            <label className="block text-[11.5px] font-medium text-epo-slate-700 mb-1">
                                Fonction <span className="text-epo-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={nouvelleFonction}
                                onChange={(e) => setNouvelleFonction(e.target.value)}
                                placeholder="Ex: Directrice Juridique"
                                className="w-full px-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                            />
                        </div>
                    </div>

                    <label className="block text-[11.5px] font-medium text-epo-slate-700 mb-1.5">
                        Niveau d'accès
                    </label>
                    <div className="grid grid-cols-1 gap-2 mb-3 sm:grid-cols-3">
                        {ACCES_DISPONIBLES.map((a) => (
                            <button
                                key={a.key}
                                type="button"
                                onClick={() => setNouvelAcces(a.key)}
                                className={`
                                    text-left p-2.5 rounded-lg border transition
                                    ${nouvelAcces === a.key
                                        ? 'border-epo-green-500 bg-white'
                                        : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                                `}
                            >
                                <i className={`fas ${a.icon} text-[11px] mb-1 block ${nouvelAcces === a.key ? 'text-epo-green-600' : 'text-epo-slate-400'}`} />
                                <div className="text-[11.5px] font-semibold text-epo-slate-800">
                                    {a.label}
                                </div>
                            </button>
                        ))}
                    </div>

                    <label className="block text-[11.5px] font-medium text-epo-slate-700 mb-1.5">
                        Durée de l'accès
                    </label>
                    <div className="flex gap-2 mb-3">
                        <button
                            type="button"
                            onClick={() => setDureeAcces('permanent')}
                            className={`
                                flex-1 py-2 rounded-lg border text-[12px] font-medium transition
                                ${dureeAcces === 'permanent'
                                    ? 'border-epo-green-500 bg-white text-epo-green-700'
                                    : 'border-epo-slate-200 bg-white text-epo-slate-600'}
                            `}
                        >
                            Permanent
                        </button>
                        <button
                            type="button"
                            onClick={() => setDureeAcces('ponctuel')}
                            className={`
                                flex-1 py-2 rounded-lg border text-[12px] font-medium transition
                                ${dureeAcces === 'ponctuel'
                                    ? 'border-epo-green-500 bg-white text-epo-green-700'
                                    : 'border-epo-slate-200 bg-white text-epo-slate-600'}
                            `}
                        >
                            Ponctuel
                        </button>
                    </div>

                    {dureeAcces === 'ponctuel' && (
                        <div className="mb-3">
                            <label className="block text-[11.5px] font-medium text-epo-slate-700 mb-1">
                                Raison de l'accès ponctuel <span className="text-epo-red-500">*</span>
                            </label>
                            <textarea
                                rows={2}
                                value={raison}
                                onChange={(e) => setRaison(e.target.value)}
                                placeholder="Justification de l'accès (RG-12)"
                                className="w-full px-3 py-2 border rounded-lg border-epo-slate-300 text-[12.5px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10 resize-y"
                            />
                        </div>
                    )}

                    {!canAjouter && dureeAcces === 'ponctuel' && (
                        <div className="flex items-start gap-2 p-2 mb-3 border rounded bg-epo-yellow-50 border-epo-yellow-200">
                            <i className="fas fa-exclamation-triangle text-epo-yellow-600 text-[10px] mt-0.5" />
                            <span className="text-[10.5px] text-epo-yellow-800">
                                <strong>RG-12</strong> -La raison est obligatoire pour un accès ponctuel
                            </span>
                        </div>
                    )}

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setShowAjout(false)}
                            className="px-3 py-1.5 rounded-md text-[12px] font-medium text-epo-slate-600 hover:bg-white transition"
                        >
                            Annuler
                        </button>
                        <button
                            disabled={!canAjouter}
                            onClick={handleAjouter}
                            className={`
                                px-3 py-1.5 rounded-md text-[12px] font-semibold transition
                                ${canAjouter
                                    ? 'bg-epo-green-500 text-white hover:bg-epo-green-600'
                                    : 'bg-epo-slate-200 text-epo-slate-400 cursor-not-allowed'}
                            `}
                        >
                            <i className="mr-1 fas fa-check" />
                            Ajouter
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
}