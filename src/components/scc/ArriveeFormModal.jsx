// src/components/scc/ArriveeFormModal.jsx
import { useState, useMemo } from 'react';
import { Modal, Button } from '../ui';
import ClassificationBadge from './ClassificationBadge';
import PieceUploader from './PieceUploader';
import {
    CLASSIFICATIONS,
    NATURES_ENTRANTS,
    SERIES_NUMEROTATION,
} from '../../data/arriveesSCC.js';

/* ============================================================
   ÉTAPES
   ============================================================ */

const ETAPES = [
    { key: 'infos', label: 'Informations', icon: 'fa-edit' },
    { key: 'pieces', label: 'Pièces & scan', icon: 'fa-camera' },
    { key: 'recap', label: 'Récapitulatif', icon: 'fa-check-circle' },
];

export default function ArriveeFormModal({ open, onClose }) {
    const [etape, setEtape] = useState(0);

    // Formulaire
    const [objet, setObjet] = useState('');
    const [expediteur, setExpediteur] = useState('');
    const [destinataireApparent, setDestinataireApparent] = useState('');
    const [dateDocument, setDateDocument] = useState('');
    const [classification, setClassification] = useState('ordinaire');
    const [nature, setNature] = useState('lettre');
    const [pieces, setPieces] = useState([]);
    const [observation, setObservation] = useState('');

    const reset = () => {
        setEtape(0);
        setObjet('');
        setExpediteur('');
        setDestinataireApparent('');
        setDateDocument('');
        setClassification('ordinaire');
        setNature('lettre');
        setPieces([]);
        setObservation('');
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    // Numéro prévisionnel selon la série
    const numeroPrevisionnel = useMemo(() => {
        if (classification === 'confidentiel') return SERIES_NUMEROTATION.confidentiel.prochain;
        if (classification === 'urgent') return SERIES_NUMEROTATION.urgent.prochain;
        return SERIES_NUMEROTATION.ordinaire.prochain;
    }, [classification]);

    // Validation de l'étape 1
    const canNext1 = objet.trim().length > 3 && expediteur.trim().length > 2;

    const canNext = () => {
        if (etape === 0) return canNext1;
        if (etape === 1) return pieces.length > 0;
        return true;
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            title="Enregistrer un courrier entrant"
            titleIcon="fa-inbox"
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
                        <Button variant="primary" icon="fa-save">
                            Enregistrer le courrier
                        </Button>
                    )}
                </>
            }
        >
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
                    />
                )}

                {etape === 1 && (
                    <EtapePieces
                        pieces={pieces} setPieces={setPieces}
                        classification={classification}
                    />
                )}

                {etape === 2 && (
                    <EtapeRecap
                        numero={numeroPrevisionnel}
                        objet={objet}
                        expediteur={expediteur}
                        destinataireApparent={destinataireApparent}
                        dateDocument={dateDocument}
                        classification={classification}
                        nature={nature}
                        pieces={pieces}
                        observation={observation}
                        setObservation={setObservation}
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
}) {
    return (
        <div>
            <h3 className="text-[14px] font-semibold mb-3 text-epo-slate-800">
                Informations du courrier
            </h3>

            <FormField label="Objet" required>
                <input
                    type="text"
                    value={objet}
                    onChange={(e) => setObjet(e.target.value)}
                    placeholder="Objet du courrier"
                    className={inputCls}
                />
            </FormField>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <FormField label="Expéditeur" required>
                    <input
                        type="text"
                        value={expediteur}
                        onChange={(e) => setExpediteur(e.target.value)}
                        placeholder="Nom ou structure"
                        className={inputCls}
                    />
                </FormField>
                <FormField label="Destinataire apparent">
                    <input
                        type="text"
                        value={destinataireApparent}
                        onChange={(e) => setDestinataireApparent(e.target.value)}
                        placeholder="Ex: Secrétariat Général"
                        className={inputCls}
                    />
                </FormField>
                <FormField label="Date du document">
                    <input
                        type="date"
                        value={dateDocument}
                        onChange={(e) => setDateDocument(e.target.value)}
                        className={inputCls}
                    />
                </FormField>
                <FormField label="Nature" required>
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

            {/* Classification */}
            <FormField label="Classification" required>
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

            {/* Info numérotation */}
            <div className="flex items-start gap-2 p-3 mt-3 rounded-lg bg-epo-slate-50">
                <i className="fas fa-hashtag text-epo-slate-400 mt-0.5" />
                <div className="text-[12px] text-epo-slate-600">
                    Numéro d'ordre prévisionnel : <strong className="font-mono text-epo-slate-800">
                        {classification === 'confidentiel'
                            ? SERIES_NUMEROTATION.confidentiel.prochain
                            : classification === 'urgent'
                                ? SERIES_NUMEROTATION.urgent.prochain
                                : SERIES_NUMEROTATION.ordinaire.prochain}
                    </strong>
                    {' '}({classification === 'confidentiel' ? 'série SP-DG' : 'série SCC'} · RG-34 à 36)
                </div>
            </div>
        </div>
    );
}

/* ============================================================
   ÉTAPE 2 - PIÈCES & SCAN
   ============================================================ */

function EtapePieces({ pieces, setPieces, classification }) {
    return (
        <div>
            <h3 className="text-[14px] font-semibold mb-3 text-epo-slate-800">
                Pièces associées & scan
            </h3>

            {classification === 'confidentiel' && (
                <div className="flex items-start gap-2 p-3 mb-4 border rounded-lg bg-epo-yellow-50 border-epo-yellow-200">
                    <i className="fas fa-lock text-epo-yellow-600 mt-0.5" />
                    <div className="text-[12px] text-epo-yellow-800">
                        <strong>Dossier confidentiel.</strong> Les pièces resteront soumises à la liste blanche d'accès (RG-11). Numérotation confiée au SP-DG.
                    </div>
                </div>
            )}

            <PieceUploader pieces={pieces} onChange={setPieces} />

            <div className="flex items-start gap-2 p-3 mt-4 rounded-lg bg-epo-slate-50">
                <i className="fas fa-shield-alt text-epo-slate-400 mt-0.5" />
                <div className="text-[12px] text-epo-slate-600">
                    Un hash d'intégrité est calculé automatiquement pour chaque pièce (§12.4).
                </div>
            </div>
        </div>
    );
}

/* ============================================================
   ÉTAPE 3 - RÉCAPITULATIF
   ============================================================ */

function EtapeRecap({
    numero, objet, expediteur, destinataireApparent,
    dateDocument, classification, nature, pieces,
    observation, setObservation,
}) {
    const c = CLASSIFICATIONS[classification];
    const n = NATURES_ENTRANTS[nature];

    return (
        <div>
            <h3 className="text-[14px] font-semibold mb-3 text-epo-slate-800">
                Récapitulatif avant enregistrement
            </h3>

            {/* Numéro */}
            <div className="p-4 mb-4 border rounded-lg bg-epo-green-50 border-epo-green-200">
                <div className="text-[10.5px] font-semibold tracking-wider uppercase text-epo-green-700 mb-1">
                    Numéro d'ordre qui sera attribué
                </div>
                <div className="text-[20px] font-bold font-mono text-epo-green-800">
                    {numero}
                </div>
            </div>

            {/* Détails */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <RecapField label="Objet" value={objet} />
                <RecapField label="Expéditeur" value={expediteur} />
                <RecapField label="Destinataire apparent" value={destinataireApparent || '-'} />
                <RecapField label="Date du document" value={dateDocument || '-'} />
                <RecapField
                    label="Classification"
                    value={<ClassificationBadge classification={classification} size="sm" />}
                />
                <RecapField
                    label="Nature"
                    value={
                        <span className="inline-flex items-center gap-1.5 text-[12.5px] text-epo-slate-800">
                            <i className={`fas ${n?.icon} text-[11px] text-epo-slate-400`} />
                            {n?.label}
                        </span>
                    }
                />
                <RecapField
                    label="Pièces"
                    value={
                        <span className="text-[12.5px] text-epo-slate-800">
                            {pieces.length} pièce{pieces.length > 1 ? 's' : ''} jointe{pieces.length > 1 ? 's' : ''}
                        </span>
                    }
                />
            </div>

            <FormField label="Observation (optionnel)">
                <textarea
                    rows={2}
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                    placeholder="Note interne sur cet enregistrement…"
                    className={`${inputCls} resize-y`}
                />
            </FormField>

            <div className="flex items-start gap-2 p-3 mt-3 rounded-lg bg-epo-slate-50">
                <i className="fas fa-arrow-right text-epo-slate-400 mt-0.5" />
                <div className="text-[12px] text-epo-slate-600">
                    Le courrier sera automatiquement <strong>transmis au SP-SG</strong> après enregistrement (délai de référence : 30 min - §9.1).
                </div>
            </div>
        </div>
    );
}

function RecapField({ label, value }) {
    return (
        <div className="p-3 bg-white border rounded-lg border-epo-slate-200">
            <div className="text-[10.5px] font-semibold tracking-wider uppercase text-epo-slate-400 mb-1">
                {label}
            </div>
            <div className="text-[13px] text-epo-slate-800">
                {value}
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

function FormField({ label, required, children }) {
    return (
        <div className="mb-3">
            <label className="block text-[12.5px] font-medium text-epo-slate-700 mb-1.5">
                {label}
                {required && <span className="ml-1 text-epo-red-500">*</span>}
            </label>
            {children}
        </div>
    );
}