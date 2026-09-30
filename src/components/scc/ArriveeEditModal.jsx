// src/components/scc/ArriveeEditModal.jsx
import { useState, useEffect, useMemo } from 'react';
import { Modal, Button } from '../ui';
import ClassificationBadge from './ClassificationBadge';
import PieceUploader from './PieceUploader';
import {
    CLASSIFICATIONS,
    NATURES_ENTRANTS,
    formatDate,
    formatDateHeure,
} from '../../data/arriveesSCC.js';

/* ============================================================
   ÉTAPES
   ============================================================ */

const ETAPES = [
    { key: 'infos', label: 'Informations', icon: 'fa-edit' },
    { key: 'pieces', label: 'Pièces', icon: 'fa-paperclip' },
    { key: 'validation', label: 'Validation', icon: 'fa-check-circle' },
];

/* ============================================================
   MODALE
   ============================================================ */

export default function ArriveeEditModal({ arrivee, onClose }) {
    /* ----------------------------------------------------------
       ⚠️ RÈGLE DES HOOKS : tous les hooks sont appelés ICI,
       avant tout return conditionnel.
       ---------------------------------------------------------- */

    // États du formulaire
    const [etape, setEtape] = useState(0);
    const [objet, setObjet] = useState('');
    const [expediteur, setExpediteur] = useState('');
    const [destinataireApparent, setDestinataireApparent] = useState('');
    const [dateDocument, setDateDocument] = useState('');
    const [classification, setClassification] = useState('ordinaire');
    const [nature, setNature] = useState('lettre');
    const [pieces, setPieces] = useState([]);
    const [raison, setRaison] = useState('');

    // Synchronise le formulaire quand `arrivee` change
    useEffect(() => {
        if (!arrivee) return;

        setEtape(0);
        setObjet(arrivee.objet || '');
        setExpediteur(arrivee.expediteur || '');
        setDestinataireApparent(arrivee.destinataireApparent || '');
        setDateDocument(arrivee.dateDocument ? arrivee.dateDocument.slice(0, 10) : '');
        setClassification(arrivee.classification || 'ordinaire');
        setNature(arrivee.nature || 'lettre');
        setRaison('');

        // Reconstruit les pièces existantes (mock - à brancher sur le backend)
        const mockPieces = Array.from({ length: arrivee.pieces || 0 }).map((_, i) => ({
            id: `${arrivee.id}-p${i + 1}`,
            nom: i === 0
                ? `${arrivee.id}_document_principal.pdf`
                : `${arrivee.id}_annexe_${i}.pdf`,
            taille: i === 0 ? '284 Ko' : `${120 + i * 40} Ko`,
            type: 'pdf',
            existante: true,
        }));
        setPieces(mockPieces);
    }, [arrivee]);

    // Détection des changements - null-safe car `arrivee` peut être null
    const changements = useMemo(() => {
        if (!arrivee) return [];

        const a = arrivee;
        const champs = [];
        if (objet !== a.objet)
            champs.push({ label: 'Objet', avant: a.objet, apres: objet });
        if (expediteur !== a.expediteur)
            champs.push({ label: 'Expéditeur', avant: a.expediteur, apres: expediteur });
        if (destinataireApparent !== a.destinataireApparent)
            champs.push({ label: 'Destinataire apparent', avant: a.destinataireApparent, apres: destinataireApparent });
        if (dateDocument !== (a.dateDocument || '').slice(0, 10))
            champs.push({ label: 'Date du document', avant: formatDate(a.dateDocument), apres: formatDate(dateDocument) });
        if (classification !== a.classification)
            champs.push({ label: 'Classification', avant: a.classification, apres: classification });
        if (nature !== a.nature)
            champs.push({ label: 'Nature', avant: a.nature, apres: nature });

        return champs;
    }, [arrivee, objet, expediteur, destinataireApparent, dateDocument, classification, nature]);

    // ✅ Tous les hooks sont appelés - on peut maintenant early-return
    if (!arrivee) return null;

    const a = arrivee;

    // Validation de l'étape
    const canNext = () => {
        if (etape === 0) return objet.trim().length > 3 && expediteur.trim().length > 2;
        if (etape === 1) return pieces.length > 0;
        return true;
    };

    const canSave = changements.length > 0 && raison.trim().length > 5;

    const handleClose = () => {
        setEtape(0);
        setRaison('');
        onClose();
    };

    const handleSave = () => {
        // À brancher sur l'API PATCH /arrivees/:id
        alert(
            `Modifications enregistrées sur ${a.id}\n\n` +
            `→ ${changements.length} champ(s) modifié(s)\n` +
            `→ Raison : ${raison}\n` +
            `→ Une entrée sera ajoutée à la timeline (RG-03)`
        );
        handleClose();
    };

    return (
        <Modal
            open={!!a}
            onClose={handleClose}
            title={`Modifier le courrier ${a.id}`}
            titleIcon="fa-edit"
            size="lg"
            footer={
                <>
                    {etape > 0 && (
                        <Button variant="outline" onClick={() => setEtape(etape - 1)}>
                            <i className="fas fa-arrow-left mr-1.5" />
                            Précédent
                        </Button>
                    )}
                    <Button variant="outline" onClick={handleClose}>
                        Annuler
                    </Button>
                    {etape < 2 ? (
                        <Button
                            variant="primary"
                            onClick={() => canNext() && setEtape(etape + 1)}
                            disabled={!canNext()}
                        >
                            Suivant
                            <i className="fas fa-arrow-right ml-1.5" />
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            icon="fa-save"
                            disabled={!canSave}
                            onClick={handleSave}
                        >
                            Enregistrer les modifications
                        </Button>
                    )}
                </>
            }
        >
            {/* ============ Bandeau d'avertissement ============ */}
            <div className="flex items-start gap-2.5 p-3 mb-5 rounded-lg bg-epo-yellow-50 border border-epo-yellow-200">
                <i className="fas fa-exclamation-triangle text-epo-yellow-600 mt-0.5" />
                <div className="text-[12.5px] text-epo-yellow-900">
                    <strong>Vous modifiez un courrier déjà enregistré.</strong>
                    <div className="mt-0.5 text-[12px] opacity-90">
                        Toute modification doit être justifiée et sera <strong>tracée dans l'historique</strong> (RG-03).
                    </div>
                </div>
            </div>

            <Stepper etape={etape} setEtape={setEtape} />

            <div className="mt-6">
                {etape === 0 && (
                    <EtapeInfos
                        objet={objet} setObjet={setObjet}
                        expediteur={expediteur} setExpediteur={setExpediteur}
                        destinataireApparent={destinataireApparent} setDestinataireApparent={setDestinataireApparent}
                        dateDocument={dateDocument} setDateDocument={setDateDocument}
                        classification={classification} setClassification={setClassification}
                        nature={nature} setNature={setNature}
                        original={a}
                    />
                )}

                {etape === 1 && (
                    <EtapePieces pieces={pieces} setPieces={setPieces} classification={classification} />
                )}

                {etape === 2 && (
                    <EtapeValidation
                        changements={changements}
                        raison={raison}
                        setRaison={setRaison}
                        numero={a.id}
                    />
                )}
            </div>
        </Modal>
    );
}

/* ============================================================
   STEPPER
   ============================================================ */

function Stepper({ etape, setEtape }) {
    return (
        <div className="flex items-center gap-2">
            {ETAPES.map((e, i) => {
                const isActive = i === etape;
                const isDone = i < etape;
                return (
                    <div key={e.key} className="flex items-center flex-1 gap-2">
                        <button
                            onClick={() => i < etape && setEtape(i)}
                            disabled={i > etape}
                            className={`
                                flex items-center gap-2 px-3 py-2 rounded-lg
                                text-[12.5px] font-semibold transition
                                ${isActive ? 'bg-epo-green-500 text-white' :
                                  isDone ? 'bg-epo-green-50 text-epo-green-700 hover:bg-epo-green-100 cursor-pointer' :
                                  'bg-epo-slate-100 text-epo-slate-400 cursor-not-allowed'}
                            `}
                        >
                            <span className={`
                                inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold
                                ${isActive ? 'bg-white/25' : isDone ? 'bg-epo-green-500 text-white' : 'bg-epo-slate-200 text-epo-slate-500'}
                            `}>
                                {isDone ? <i className="fas fa-check" /> : i + 1}
                            </span>
                            <span className="hidden sm:inline">{e.label}</span>
                        </button>
                        {i < ETAPES.length - 1 && (
                            <div className={`flex-1 h-0.5 ${i < etape ? 'bg-epo-green-500' : 'bg-epo-slate-200'}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

/* ============================================================
   ÉTAPE 1 - INFORMATIONS
   ============================================================ */

function EtapeInfos({
    objet, setObjet,
    expediteur, setExpediteur,
    destinataireApparent, setDestinataireApparent,
    dateDocument, setDateDocument,
    classification, setClassification,
    nature, setNature,
    original,
}) {
    const champModifie = (valeur, originalValeur) => valeur !== originalValeur;

    return (
        <div>
            <h3 className="text-[14px] font-semibold mb-3 text-epo-slate-800">
                Informations du courrier
            </h3>

            <FormField
                label="Objet"
                required
                modified={champModifie(objet, original.objet)}
            >
                <input
                    type="text"
                    value={objet}
                    onChange={(e) => setObjet(e.target.value)}
                    className={inputCls}
                />
            </FormField>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <FormField
                    label="Expéditeur"
                    required
                    modified={champModifie(expediteur, original.expediteur)}
                >
                    <input
                        type="text"
                        value={expediteur}
                        onChange={(e) => setExpediteur(e.target.value)}
                        className={inputCls}
                    />
                </FormField>

                <FormField
                    label="Destinataire apparent"
                    modified={champModifie(destinataireApparent, original.destinataireApparent)}
                >
                    <input
                        type="text"
                        value={destinataireApparent}
                        onChange={(e) => setDestinataireApparent(e.target.value)}
                        className={inputCls}
                    />
                </FormField>

                <FormField
                    label="Date du document"
                    modified={champModifie(dateDocument, (original.dateDocument || '').slice(0, 10))}
                >
                    <input
                        type="date"
                        value={dateDocument}
                        onChange={(e) => setDateDocument(e.target.value)}
                        className={inputCls}
                    />
                </FormField>

                <FormField
                    label="Nature"
                    required
                    modified={champModifie(nature, original.nature)}
                >
                    <select
                        value={nature}
                        onChange={(e) => setNature(e.target.value)}
                        className={inputCls}
                    >
                        {Object.values(NATURES_ENTRANTS).map((n) => (
                            <option key={n.key} value={n.key}>{n.label}</option>
                        ))}
                    </select>
                </FormField>
            </div>

            <FormField
                label="Classification"
                required
                modified={champModifie(classification, original.classification)}
            >
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {Object.values(CLASSIFICATIONS).map((c) => {
                        const selected = classification === c.key;
                        return (
                            <button
                                key={c.key}
                                type="button"
                                onClick={() => setClassification(c.key)}
                                className={`
                                    text-left p-3 rounded-lg border-2 transition
                                    ${selected
                                        ? 'border-epo-green-500 bg-epo-green-50'
                                        : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'}
                                `}
                            >
                                <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-semibold mb-1.5 ${c.chip}`}>
                                    <i className={`fas ${c.icon} text-[9px]`} />
                                    {c.shortLabel}
                                </div>
                                <div className="text-[11.5px] text-epo-slate-500 leading-tight">
                                    {c.key === 'ordinaire' && 'Traitement standard via SCC'}
                                    {c.key === 'urgent' && 'Circuit prioritaire WF-URG'}
                                    {c.key === 'confidentiel' && 'Liste blanche · accès restreint'}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </FormField>

            {/* Alerte si changement de classification */}
            {champModifie(classification, original.classification) && (
                <div className="flex items-start gap-2 p-3 mt-3 border rounded-lg bg-epo-yellow-50 border-epo-yellow-200">
                    <i className="fas fa-exclamation-triangle text-epo-yellow-600 mt-0.5" />
                    <div className="text-[12px] text-epo-yellow-900">
                        <strong>Changement de classification.</strong> Cela impacte la série de numérotation et le circuit applicable (RG-34 à 36).
                    </div>
                </div>
            )}

            {/* Rappel du numéro d'ordre */}
            <div className="flex items-start gap-2 p-3 mt-3 rounded-lg bg-epo-slate-50">
                <i className="fas fa-hashtag text-epo-slate-400 mt-0.5" />
                <div className="text-[12px] text-epo-slate-600">
                    Numéro d'ordre <strong className="font-mono text-epo-slate-800">{original.id}</strong> conservé
                    (la numérotation ne change pas après enregistrement - RG-02).
                </div>
            </div>
        </div>
    );
}

/* ============================================================
   ÉTAPE 2 - PIÈCES
   ============================================================ */

function EtapePieces({ pieces, setPieces, classification }) {
    return (
        <div>
            <h3 className="text-[14px] font-semibold mb-3 text-epo-slate-800">
                Pièces associées
            </h3>

            {classification === 'confidentiel' && (
                <div className="flex items-start gap-2 p-3 mb-4 border rounded-lg bg-epo-yellow-50 border-epo-yellow-200">
                    <i className="fas fa-lock text-epo-yellow-600 mt-0.5" />
                    <div className="text-[12px] text-epo-yellow-800">
                        <strong>Dossier confidentiel.</strong> Toute modification des pièces est journalisée (RG-13).
                    </div>
                </div>
            )}

            <PieceUploader pieces={pieces} onChange={setPieces} />

            <div className="flex items-start gap-2 p-3 mt-4 rounded-lg bg-epo-slate-50">
                <i className="fas fa-shield-alt text-epo-slate-400 mt-0.5" />
                <div className="text-[12px] text-epo-slate-600">
                    Les pièces existantes sont conservées. Le hash d'intégrité est recalculé pour toute nouvelle pièce (§12.4).
                </div>
            </div>
        </div>
    );
}

/* ============================================================
   ÉTAPE 3 - VALIDATION
   ============================================================ */

function EtapeValidation({ changements, raison, setRaison, numero }) {
    return (
        <div>
            <h3 className="text-[14px] font-semibold mb-3 text-epo-slate-800">
                Récapitulatif des modifications
            </h3>

            {changements.length === 0 ? (
                <div className="flex items-start gap-2 p-3 mb-4 border rounded-lg bg-epo-slate-50 border-epo-slate-200">
                    <i className="fas fa-info-circle text-epo-slate-400 mt-0.5" />
                    <div className="text-[12.5px] text-epo-slate-700">
                        Aucune modification détectée. Modifiez au moins un champ pour pouvoir enregistrer.
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-2 p-3 mb-4 border rounded-lg bg-epo-green-50 border-epo-green-200">
                        <i className="fas fa-edit text-epo-green-600" />
                        <div className="text-[13px] text-epo-green-900">
                            <strong>{changements.length} champ{changements.length > 1 ? 's' : ''}</strong> modifié{changements.length > 1 ? 's' : ''}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mb-5">
                        {changements.map((c, i) => (
                            <div
                                key={i}
                                className="p-3 bg-white border rounded-lg border-epo-slate-200"
                            >
                                <div className="text-[11px] font-semibold tracking-wider uppercase text-epo-slate-400 mb-2">
                                    {c.label}
                                </div>
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    <div className="flex items-start gap-2">
                                        <span className="text-[10.5px] font-bold text-epo-red-500 flex-shrink-0 mt-0.5">
                                            AVANT
                                        </span>
                                        <span className="text-[12.5px] line-through text-epo-slate-500">
                                            {c.avant || '-'}
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-[10.5px] font-bold text-epo-green-600 flex-shrink-0 mt-0.5">
                                            APRÈS
                                        </span>
                                        <span className="text-[12.5px] font-medium text-epo-slate-800">
                                            {c.apres || '-'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <FormField label="Raison de la modification" required>
                <textarea
                    rows={3}
                    value={raison}
                    onChange={(e) => setRaison(e.target.value)}
                    placeholder="Ex: Correction d'une erreur de saisie sur l'objet du courrier"
                    className={`${inputCls} resize-y`}
                />
                <div className="mt-1 text-[11px] text-epo-slate-500">
                    Minimum 5 caractères · Sera visible dans l'historique du dossier (RG-03)
                </div>
            </FormField>

            <div className="flex items-start gap-2 p-3 mt-3 rounded-lg bg-epo-slate-50">
                <i className="fas fa-history text-epo-slate-400 mt-0.5" />
                <div className="text-[12px] text-epo-slate-600">
                    Une entrée sera ajoutée à l'historique du courrier <strong className="font-mono">{numero}</strong> avec
                    votre nom, la date, l'heure et la raison de la modification.
                </div>
            </div>
        </div>
    );
}

/* ============================================================
   HELPERS
   ============================================================ */

const inputCls = `
    w-full px-3 py-2.5 border border-epo-slate-300 rounded-lg
    text-[13.5px] text-epo-slate-800 bg-white
    focus:outline-none focus:border-epo-green-500
    focus:ring-2 focus:ring-epo-green-500/10
`;

function FormField({ label, required, modified, children }) {
    return (
        <div className="mb-3">
            <label className="flex items-center gap-2 mb-1.5">
                <span className="text-[12.5px] font-medium text-epo-slate-700">
                    {label}
                    {required && <span className="ml-1 text-epo-red-500">*</span>}
                </span>
                {modified && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-epo-yellow-50 text-epo-yellow-700 text-[10px] font-semibold">
                        <i className="fas fa-pen text-[8px]" />
                        Modifié
                    </span>
                )}
            </label>
            {children}
        </div>
    );
}