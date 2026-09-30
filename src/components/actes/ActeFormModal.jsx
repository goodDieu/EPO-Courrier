// src/components/actes/ActeFormModal.jsx
import { useState, useMemo } from 'react';
import { Modal, Button } from '../ui';
import {
    NATURES_ACTES,
    AGENTS,
    REGLES_RH,
    MAQUETTES,
    computeDureeJours,
} from '../../data/actes.js';
import MaquettePreview from './MaquettePreview';
import RegleRHAlert from './RegleRHAlert';

/* ============================================================
   ÉTAPES
   ============================================================ */

const ETAPES = [
    { key: 'nature', label: 'Nature', icon: 'fa-file-signature' },
    { key: 'details', label: 'Détails', icon: 'fa-edit' },
    { key: 'apercu', label: 'Aperçu', icon: 'fa-eye' },
];

export default function ActeFormModal({ open, onClose }) {
    const [etape, setEtape] = useState(0);

    // Formulaire
    const [nature, setNature] = useState(null);
    const [beneficiaireId, setBeneficiaireId] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [motif, setMotif] = useState('');
    const [timbreFiscal, setTimbreFiscal] = useState(false);
    const [attestationSHI, setAttestationSHI] = useState(false);

    // Reset à la fermeture
    const handleClose = () => {
        setEtape(0);
        setNature(null);
        setBeneficiaireId('');
        setDateDebut('');
        setDateFin('');
        setMotif('');
        setTimbreFiscal(false);
        setAttestationSHI(false);
        onClose();
    };

    const beneficiaire = useMemo(
        () => AGENTS.find((a) => a.id === beneficiaireId),
        [beneficiaireId]
    );

    const duree = useMemo(
        () => computeDureeJours(dateDebut, dateFin),
        [dateDebut, dateFin]
    );

    // Données consolidées pour les règles et l'aperçu
    const data = useMemo(() => ({
        numero: '2026-XXXX', // à générer côté serveur
        nom: beneficiaire?.nom,
        matricule: beneficiaire?.matricule,
        structure: beneficiaire?.structure,
        fonction: beneficiaire?.fonction,
        dateService: beneficiaire?.dateService,
        dateDebut,
        dateFin,
        duree,
        motif,
        timbreFiscal,
        attestationSHI,
        consomme: 0, // à brancher : jours d'absence déjà consommés cette année
    }), [beneficiaire, dateDebut, dateFin, duree, motif, timbreFiscal, attestationSHI]);

    // Vérification des règles métier
    const reglesActives = useMemo(() => {
        if (!nature) return [];
        const n = NATURES_ACTES[nature];
        return n.regles.map((code) => {
            const regle = REGLES_RH[code];
            return { regle, resultat: regle.verifier(data) };
        });
    }, [nature, data]);

    const bloque = reglesActives.some((r) => r.resultat.bloque);

    const canNext = () => {
        if (etape === 0) return !!nature;
        if (etape === 1) {
            if (!beneficiaireId) return false;
            // Dates obligatoires pour absence / congé / mission
            const besoinDates = ['autorisation-absence', 'decision-conge', 'ordre-mission'].includes(nature);
            if (besoinDates && (!dateDebut || !dateFin)) return false;
            return !bloque;
        }
        return true;
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            title="Nouvel acte administratif"
            titleIcon="fa-file-signature"
            size="xl"
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
                        <Button variant="primary" icon="fa-paper-plane" disabled={bloque}>
                            Envoyer au circuit
                        </Button>
                    )}
                </>
            }
        >
            <Stepper etape={etape} setEtape={setEtape} />

            <div className="mt-6">
                {etape === 0 && (
                    <EtapeNature nature={nature} setNature={setNature} />
                )}
                {etape === 1 && (
                    <EtapeDetails
                        nature={nature}
                        beneficiaireId={beneficiaireId}
                        setBeneficiaireId={setBeneficiaireId}
                        dateDebut={dateDebut}
                        setDateDebut={setDateDebut}
                        dateFin={dateFin}
                        setDateFin={setDateFin}
                        motif={motif}
                        setMotif={setMotif}
                        timbreFiscal={timbreFiscal}
                        setTimbreFiscal={setTimbreFiscal}
                        attestationSHI={attestationSHI}
                        setAttestationSHI={setAttestationSHI}
                        regles={reglesActives}
                    />
                )}
                {etape === 2 && (
                    <EtapeApercu nature={nature} data={data} bloque={bloque} regles={reglesActives} />
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
   ÉTAPE 1 - NATURE
   ============================================================ */

function EtapeNature({ nature, setNature }) {
    return (
        <div>
            <h3 className="text-[14px] font-semibold text-epo-slate-800 mb-3">
                Quelle est la nature de l'acte à produire ?
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {Object.values(NATURES_ACTES).map((n) => {
                    const selected = nature === n.key;
                    return (
                        <button
                            key={n.key}
                            onClick={() => setNature(n.key)}
                            className={`
                                text-left p-4 rounded-xl border-2 transition
                                ${selected
                                    ? 'border-epo-green-500 bg-epo-green-50 shadow-card'
                                    : 'border-epo-slate-200 bg-white hover:border-epo-slate-300 hover:shadow-soft'}
                            `}
                        >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${n.color}`}>
                                <i className={`fas ${n.icon}`} />
                            </div>
                            <div className="text-[12.5px] font-semibold text-epo-slate-800 leading-tight">
                                {n.label}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

/* ============================================================
   ÉTAPE 2 - DÉTAILS
   ============================================================ */

function EtapeDetails({
    nature,
    beneficiaireId,
    setBeneficiaireId,
    dateDebut,
    setDateDebut,
    dateFin,
    setDateFin,
    motif,
    setMotif,
    timbreFiscal,
    setTimbreFiscal,
    attestationSHI,
    setAttestationSHI,
    regles,
}) {
    const n = NATURES_ACTES[nature];
    const besoinDates = ['autorisation-absence', 'decision-conge', 'ordre-mission'].includes(nature);
    const besoinMotif = ['autorisation-absence'].includes(nature);
    const besoinTimbre = nature === 'decision-conge';
    const besoinSHI = nature === 'certificat-prise';

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Colonne formulaire */}
            <div>
                <h3 className="text-[14px] font-semibold text-epo-slate-800 mb-3">
                    Informations de l'acte
                </h3>

                <FormGroup label="Bénéficiaire" required>
                    <select
                        value={beneficiaireId}
                        onChange={(e) => setBeneficiaireId(e.target.value)}
                        className={inputCls}
                    >
                        <option value="">Sélectionner un agent…</option>
                        {AGENTS.map((a) => (
                            <option key={a.id} value={a.id}>
                                {a.nom} - {a.matricule} - {a.structure}
                            </option>
                        ))}
                    </select>
                </FormGroup>

                {besoinDates && (
                    <div className="grid grid-cols-2 gap-3">
                        <FormGroup label="Date de début" required>
                            <input
                                type="date"
                                value={dateDebut}
                                onChange={(e) => setDateDebut(e.target.value)}
                                className={inputCls}
                            />
                        </FormGroup>
                        <FormGroup label="Date de fin" required>
                            <input
                                type="date"
                                value={dateFin}
                                onChange={(e) => setDateFin(e.target.value)}
                                className={inputCls}
                            />
                        </FormGroup>
                    </div>
                )}

                {besoinMotif && (
                    <FormGroup label="Motif">
                        <textarea
                            rows={2}
                            value={motif}
                            onChange={(e) => setMotif(e.target.value)}
                            placeholder="Motif de l'absence…"
                            className={`${inputCls} resize-y`}
                        />
                    </FormGroup>
                )}

                {besoinTimbre && (
                    <CheckboxField
                        checked={timbreFiscal}
                        onChange={setTimbreFiscal}
                        label="Timbre fiscal 200 FCFA joint (RG-31)"
                    />
                )}

                {besoinSHI && (
                    <CheckboxField
                        checked={attestationSHI}
                        onChange={setAttestationSHI}
                        label="Attestation SHI associée (RG-32)"
                    />
                )}
            </div>

            {/* Colonne vérifications */}
            <div>
                <h3 className="text-[14px] font-semibold text-epo-slate-800 mb-3">
                    Vérifications réglementaires
                </h3>
                <div className="flex flex-col gap-2">
                    {regles.length === 0 ? (
                        <div className="text-[12.5px] text-epo-slate-500 italic p-3 bg-epo-slate-50 rounded-lg">
                            Aucune règle spécifique pour cette nature.
                        </div>
                    ) : (
                        regles.map((r, i) => (
                            <RegleRHAlert key={i} regle={r.regle} resultat={r.resultat} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

/* ============================================================
   ÉTAPE 3 - APERÇU
   ============================================================ */

function EtapeApercu({ nature, data, bloque, regles }) {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
                <h3 className="text-[14px] font-semibold text-epo-slate-800 mb-3">
                    Aperçu du document
                </h3>
                <MaquettePreview nature={nature} data={data} />
            </div>

            <div className="lg:col-span-2">
                <h3 className="text-[14px] font-semibold text-epo-slate-800 mb-3">
                    Contrôles avant envoi
                </h3>
                <div className="flex flex-col gap-2 mb-4">
                    {regles.map((r, i) => (
                        <RegleRHAlert key={i} regle={r.regle} resultat={r.resultat} />
                    ))}
                </div>

                {bloque && (
                    <div className="bg-epo-red-50 border border-epo-red-200 rounded-lg p-3 text-[12.5px] text-epo-red-800">
                        <i className="mr-2 fas fa-lock" />
                        <strong>Envoi bloqué.</strong> Corrigez les points ci-dessus avant de continuer.
                    </div>
                )}

                <div className="pt-4 mt-4 border-t border-epo-slate-100">
                    <div className="text-[11.5px] font-semibold uppercase tracking-wider text-epo-slate-400 mb-2">
                        Circuit de traitement
                    </div>
                    <div className="text-[12.5px] text-epo-slate-700 space-y-1">
                        <div>→ Rédaction (DRH)</div>
                        <div>→ Visa SG</div>
                        <div>→ Signature DG <span className="text-epo-slate-400">(ou SG par délégation)</span></div>
                        <div>→ Enregistrement</div>
                        <div>→ Diffusion au bénéficiaire</div>
                        <div>→ Archivage</div>
                    </div>
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

function FormGroup({ label, required, children }) {
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

function CheckboxField({ checked, onChange, label }) {
    return (
        <label className="flex items-center gap-2.5 py-2.5 cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="w-4 h-4 cursor-pointer accent-epo-green-500"
            />
            <span className="text-[13px] text-epo-slate-700">{label}</span>
        </label>
    );
}