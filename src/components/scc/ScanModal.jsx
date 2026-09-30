// src/components/scc/ScanModal.jsx
import { useState, useEffect, useMemo } from 'react';
import { Modal, Button } from '../ui';
import TypePieceBadge from './TypePieceBadge';
import ClassificationBadge from './ClassificationBadge';
import {
    ETATS_SCAN,
    formatDateHeure,
    generatePseudoHash,
} from '../../data/scanSCC.js';

/* ============================================================
   MODALE
   ============================================================ */

export default function ScanModal({ document, onClose }) {
    const [phase, setPhase] = useState('preparation'); // 'preparation' | 'en-cours' | 'termine'
    const [progression, setProgression] = useState(0);
    const [hash, setHash] = useState(null);
    const [tailleGeneree, setTailleGeneree] = useState(null);

    // Détection Tauri (pour conditionner le bouton "Ouvrir dans Tauri")
    const isTauri = useMemo(() => {
        return typeof window !== 'undefined' && '__TAURI__' in window;
    }, []);

    // Reset au changement de document
    useEffect(() => {
        if (!document) return;
        setPhase('preparation');
        setProgression(0);
        setHash(null);
        setTailleGeneree(null);
    }, [document]);

    // Simulation de la progression
    useEffect(() => {
        if (phase !== 'en-cours') return;

        const interval = setInterval(() => {
            setProgression((p) => {
                if (p >= 100) {
                    clearInterval(interval);
                    setPhase('termine');
                    setHash(generatePseudoHash());
                    setTailleGeneree(Math.floor(Math.random() * 800) + 200);
                    return 100;
                }
                return Math.min(p + Math.random() * 12 + 3, 100);
            });
        }, 400);

        return () => clearInterval(interval);
    }, [phase]);

    if (!document) return null;

    const d = document;
    const etat = ETATS_SCAN[d.etat];

    const handleLancerScan = () => {
        setPhase('en-cours');
        setProgression(0);
    };

    const handleOuvrirTauri = () => {
        // En V1 Tauri : window.location = `tauri://scan/${d.id}`
        alert(
            `Ouverture du client Tauri\n\n` +
            `Document : ${d.documentSource}\n` +
            `Type : ${d.typePiece}\n` +
            `Pages : ${d.nbPages}\n\n` +
            `→ Le client Tauri communiquera avec le scanner.\n` +
            `→ Le résultat sera envoyé à l'API (MinIO + PostgreSQL).`
        );
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Modal
            open={!!d}
            onClose={handleClose}
            title={
                phase === 'preparation' ? `Scanner le document ${d.documentSource}` :
                phase === 'en-cours' ? 'Numérisation en cours…' :
                'Numérisation terminée'
            }
            titleIcon={phase === 'termine' ? 'fa-check-circle' : 'fa-camera'}
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={handleClose}>
                        {phase === 'termine' ? 'Fermer' : 'Annuler'}
                    </Button>

                    {phase === 'preparation' && (
                        <>
                            <Button
                                variant="outline"
                                icon="fa-external-link-alt"
                                onClick={handleOuvrirTauri}
                                disabled={!isTauri}
                                title={!isTauri ? 'Disponible uniquement dans le client desktop Tauri' : ''}
                            >
                                Ouvrir dans Tauri
                            </Button>
                            <Button
                                variant="primary"
                                icon="fa-play"
                                onClick={handleLancerScan}
                            >
                                Simuler le scan
                            </Button>
                        </>
                    )}

                    {phase === 'termine' && (
                        <Button
                            variant="primary"
                            icon="fa-check"
                            onClick={handleClose}
                        >
                            Enregistrer
                        </Button>
                    )}
                </>
            }
        >
            {/* ============ En-tête dossier ============ */}
            <div className="p-4 mb-5 rounded-lg bg-epo-slate-50">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[12.5px] font-bold text-epo-slate-800">
                        {d.documentSource}
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                        <TypePieceBadge type={d.typePiece} size="sm" />
                        <ClassificationBadge classification={d.classification} size="sm" />
                        {d.priorite === 'urgente' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-epo-red-50 text-epo-red-700 text-[10.5px] font-semibold">
                                <i className="fas fa-exclamation-circle text-[9px]" />
                                Urgente
                            </span>
                        )}
                    </div>
                </div>

                <div className="text-[13.5px] font-semibold text-epo-slate-900">
                    {d.objet}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[12px] text-epo-slate-500">
                    <span>
                        <i className="fas fa-file text-[10.5px] text-epo-slate-400 mr-1" />
                        {d.nbPages} page{d.nbPages > 1 ? 's' : ''}
                    </span>
                    <span>
                        <i className="fas fa-inbox text-[10.5px] text-epo-slate-400 mr-1" />
                        {d.source}
                    </span>
                    <span>
                        <i className="fas fa-clock text-[10.5px] text-epo-slate-400 mr-1" />
                        Arrivé le {formatDateHeure(d.dateArrivee)}
                    </span>
                </div>
            </div>

            {/* ============ Phase 1 : Préparation ============ */}
            {phase === 'preparation' && (
                <div>
                    <div className="flex items-start gap-3 p-4 mb-4 border rounded-lg bg-epo-slate-50 border-epo-slate-200">
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-white rounded-lg bg-epo-green-500">
                            <i className="fas fa-print text-[18px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[13.5px] font-semibold text-epo-slate-800">
                                Prêt à numériser
                            </div>
                            <div className="text-[12px] text-epo-slate-600 mt-0.5">
                                Placez le document dans le scanner, puis cliquez sur "Simuler le scan" (mode démo) ou "Ouvrir dans Tauri" (production).
                            </div>
                        </div>
                    </div>

                    {/* Info Tauri */}
                    <div className="flex items-start gap-2.5 p-3 mb-4 rounded-lg bg-epo-yellow-50 border border-epo-yellow-200">
                        <i className="fas fa-info-circle text-epo-yellow-600 mt-0.5" />
                        <div className="text-[12px] text-epo-yellow-900">
                            <strong>Mode démo web.</strong> La numérisation réelle est réalisée via le client desktop Tauri (§17 du CDC). Le bouton "Simuler le scan" reproduit la progression et génère un hash d'intégrité fictif.
                        </div>
                    </div>

                    {/* Aperçu des métadonnées qui seront enregistrées */}
                    <h4 className="text-[11.5px] font-semibold uppercase tracking-wider text-epo-slate-400 mb-2">
                        Métadonnées à associer
                    </h4>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <InfoField label="N° document" value={d.documentSource} mono />
                        <InfoField label="Type de pièce" value={<TypePieceBadge type={d.typePiece} size="sm" />} />
                        <InfoField label="Pages" value={`${d.nbPages}`} />
                        <InfoField label="Source" value={d.source} />
                        <InfoField label="Classification" value={<ClassificationBadge classification={d.classification} size="sm" />} />
                        <InfoField label="Format d'archivage" value="PDF/A" mono />
                    </div>
                </div>
            )}

            {/* ============ Phase 2 : En cours ============ */}
            {phase === 'en-cours' && (
                <div>
                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-epo-slate-100 text-epo-slate-600">
                            <i className="fas fa-spinner fa-spin text-[18px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[13.5px] font-semibold text-epo-slate-800">
                                Numérisation en cours…
                            </div>
                            <div className="text-[12px] text-epo-slate-600 mt-0.5">
                                Le client Tauri communique avec le scanner (mode démo simulé)
                            </div>
                        </div>
                    </div>

                    {/* Barre de progression */}
                    <div className="mb-5">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[12px] font-medium text-epo-slate-600">
                                Progression
                            </span>
                            <span className="text-[13px] font-bold tabular-nums text-epo-slate-800">
                                {Math.round(progression)}%
                            </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-epo-slate-100">
                            <div
                                className="h-full transition-all duration-300 bg-epo-green-500"
                                style={{ width: `${progression}%` }}
                            />
                        </div>
                    </div>

                    {/* Étapes simulées */}
                    <div className="flex flex-col gap-2">
                        <Etape
                            label="Préparation du scanner"
                            done={progression > 5}
                            active={progression <= 5}
                        />
                        <Etape
                            label="Numérisation des pages"
                            done={progression > 60}
                            active={progression > 5 && progression <= 60}
                            detail={progression > 5 && progression <= 60 ? `${Math.round((progression - 5) / 55 * d.nbPages)} / ${d.nbPages} pages` : null}
                        />
                        <Etape
                            label="Conversion en PDF/A"
                            done={progression > 85}
                            active={progression > 60 && progression <= 85}
                        />
                        <Etape
                            label="Calcul du hash d'intégrité"
                            done={progression >= 100}
                            active={progression > 85 && progression < 100}
                        />
                    </div>
                </div>
            )}

            {/* ============ Phase 3 : Terminé ============ */}
            {phase === 'termine' && (
                <div>
                    <div className="flex items-start gap-3 p-4 mb-5 border rounded-lg bg-epo-green-50 border-epo-green-200">
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-white rounded-full bg-epo-green-500">
                            <i className="fas fa-check text-[20px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[14px] font-semibold text-epo-green-900">
                                Numérisation réussie
                            </div>
                            <div className="text-[12px] text-epo-green-800 mt-0.5">
                                Le document a été converti en PDF/A et envoyé vers le stockage documentaire.
                            </div>
                        </div>
                    </div>

                    <h4 className="text-[11.5px] font-semibold uppercase tracking-wider text-epo-slate-400 mb-2">
                        Résultat
                    </h4>
                    <div className="grid grid-cols-1 gap-2 mb-4 sm:grid-cols-2">
                        <InfoField label="Format" value="PDF/A-1b" mono />
                        <InfoField label="Taille" value={tailleGeneree ? `${tailleGeneree} Ko` : '-'} />
                        <InfoField label="Pages" value={d.nbPages} />
                        <InfoField label="Horodatage" value={new Date().toLocaleString('fr-FR')} />
                    </div>

                    {/* Hash */}
                    <div className="p-3 mb-4 border rounded-lg bg-epo-slate-50 border-epo-slate-200">
                        <div className="flex items-center gap-2 mb-1.5">
                            <i className="fas fa-shield-alt text-epo-green-600" />
                            <span className="text-[11.5px] font-semibold uppercase tracking-wider text-epo-slate-500">
                                Hash d'intégrité (SHA-256)
                            </span>
                        </div>
                        <div className="font-mono text-[10.5px] text-epo-slate-700 break-all leading-relaxed">
                            {hash}
                        </div>
                        <div className="text-[11px] text-epo-slate-500 mt-2">
                            <i className="fas fa-info-circle text-[9.5px] mr-1" />
                            En production, ce hash est calculé côté backend et stocké dans MinIO (§12.4).
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-epo-slate-50">
                        <i className="fas fa-stream text-epo-slate-400 mt-0.5" />
                        <div className="text-[12px] text-epo-slate-600">
                            Le dossier <strong className="font-mono">{d.documentSource}</strong> passera automatiquement à l'état
                            <strong> « Scanné »</strong> et sera disponible pour le circuit de traitement.
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
}

/* ============================================================
   SOUS-COMPOSANTS
   ============================================================ */

function Etape({ label, done, active, detail }) {
    return (
        <div className="flex items-center gap-3">
            <div className={`
                flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-full text-[10px]
                ${done
                    ? 'bg-epo-green-500 text-white'
                    : active
                        ? 'bg-epo-slate-200 text-epo-slate-600 animate-pulse'
                        : 'bg-epo-slate-100 text-epo-slate-400'}
            `}>
                {done ? <i className="fas fa-check" /> : <span className="w-1.5 h-1.5 rounded-full bg-current" />}
            </div>
            <div className="flex-1 min-w-0">
                <div className={`
                    text-[12.5px]
                    ${done ? 'text-epo-slate-400 line-through' : active ? 'text-epo-slate-800 font-medium' : 'text-epo-slate-400'}
                `}>
                    {label}
                </div>
                {detail && (
                    <div className="text-[10.5px] text-epo-slate-500 mt-0.5">
                        {detail}
                    </div>
                )}
            </div>
        </div>
    );
}

function InfoField({ label, value, mono = false }) {
    return (
        <div className="p-3 bg-white border rounded-lg border-epo-slate-200">
            <div className="text-[10.5px] font-semibold tracking-wider uppercase text-epo-slate-400 mb-1">
                {label}
            </div>
            <div className={`text-[13px] text-epo-slate-800 ${mono ? 'font-mono' : ''}`}>
                {value}
            </div>
        </div>
    );
}