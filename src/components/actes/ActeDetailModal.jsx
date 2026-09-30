// src/components/actes/ActeDetailModal.jsx
import { Modal, Button, StatusBadge, Timeline } from '../ui';
import NatureBadge from './NatureBadge';
import {
    SIGNATURES,
    formatDate,
    formatDateTime,
} from '../../data/actes.js';

export default function ActeDetailModal({ acte, onClose }) {
    if (!acte) return null;

    const sig = SIGNATURES[acte.signature];

    // Timeline reconstituée à partir des dates disponibles
    const timeline = buildTimeline(acte);

    return (
        <Modal
            open={!!acte}
            onClose={onClose}
            title={`${acte.id} - ${acte.objet}`}
            titleIcon="fa-file-signature"
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    <Button variant="outline" icon="fa-print">
                        Imprimer
                    </Button>
                    <Button variant="outline" icon="fa-download">
                        Télécharger PDF
                    </Button>
                    {acte.etat === 'chez-sg' && (
                        <Button variant="primary" icon="fa-signature">
                            Viser
                        </Button>
                    )}
                    {acte.etat === 'chez-dg' && (
                        <Button variant="primary" icon="fa-signature">
                            Signer
                        </Button>
                    )}
                    {['soumis-shi', 'vu-bon-a-signer'].includes(acte.etat) && (
                        <Button variant="redOutline" icon="fa-times">
                            Rejeter
                        </Button>
                    )}
                </>
            }
        >
            {/* ============ En-tête visuel ============ */}
            <div className="flex items-start justify-between gap-4 pb-5 mb-5 border-b border-epo-slate-100">
                <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-epo-slate-100 flex items-center justify-center text-[13px] font-bold text-epo-slate-600 flex-shrink-0">
                        {acte.beneficiaireNom.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                        <div className="text-[15px] font-bold text-epo-slate-900">
                            {acte.beneficiaireNom}
                        </div>
                        <div className="text-[12px] text-epo-slate-500 font-mono mt-0.5">
                            {acte.beneficiaireMatricule}
                        </div>
                        <div className="text-[12px] text-epo-slate-500 mt-0.5">
                            {acte.beneficiaireStructure}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <NatureBadge nature={acte.nature} />
                    <StatusBadge status={acte.etat} />
                </div>
            </div>

            {/* ============ Métadonnées ============ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                <DetailRow label="Numéro" value={<strong>{acte.id}</strong>} />
                <DetailRow label="Objet" value={acte.objet} />
                <DetailRow label="Produit par" value={acte.produitPar} />
                <DetailRow label="Créé le" value={formatDateTime(acte.dateCreation)} />
                <DetailRow
                    label="Signature"
                    value={
                        <span className={`inline-flex items-center gap-1.5 text-[13px] font-medium ${sig.color}`}>
                            <i className={`fas ${sig.icon} text-[12px]`} />
                            {sig.label}
                        </span>
                    }
                />
                <DetailRow
                    label="Signé le"
                    value={acte.dateSignature ? formatDateTime(acte.dateSignature) : '-'}
                />
                <DetailRow
                    label="Échéance"
                    value={
                        <span>
                            {formatDate(acte.echeance)}
                            {acte.tempsRestant < 0 && (
                                <span className="ml-2 text-epo-red-600 font-semibold text-[12px]">
                                    (dépassée)
                                </span>
                            )}
                        </span>
                    }
                />
                {acte.motifRejet && (
                    <DetailRow
                        label="Motif de rejet"
                        value={
                            <span className="font-medium text-epo-red-700">
                                {acte.motifRejet}
                            </span>
                        }
                    />
                )}
            </div>

            {/* ============ Pièces jointes ============ */}
            {['decision-conge', 'certificat-prise'].includes(acte.nature) && (
                <div className="pt-5 mt-5 border-t border-epo-slate-100">
                    <h4 className="text-[13px] font-semibold text-epo-slate-800 mb-2 flex items-center gap-2">
                        <i className="fas fa-paperclip text-epo-slate-400" />
                        Pièces justificatives
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {acte.nature === 'decision-conge' && (
                            <Piece
                                label="Timbre fiscal 200 FCFA"
                                icon="fa-stamp"
                                present
                            />
                        )}
                        {acte.nature === 'certificat-prise' && (
                            <Piece
                                label="Attestation SHI"
                                icon="fa-file-alt"
                                present
                            />
                        )}
                        <Piece label="Demande de l'agent" icon="fa-file" present />
                    </div>
                </div>
            )}

            {/* ============ Timeline ============ */}
            <div className="pt-5 mt-6 border-t border-epo-slate-200">
                <h4 className="text-[14px] font-semibold text-epo-slate-800 mb-3 flex items-center gap-2">
                    <i className="fas fa-stream text-epo-green-600" />
                    Historique du traitement
                </h4>
                <Timeline items={timeline} />
            </div>
        </Modal>
    );
}

/* ============================================================
   HELPERS
   ============================================================ */

function DetailRow({ label, value }) {
    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 py-2.5 border-b border-epo-slate-100 last:border-b-0">
            <div className="w-full sm:w-32 flex-shrink-0 text-[12px] font-medium text-epo-slate-500 uppercase tracking-wider">
                {label}
            </div>
            <div className="flex-1 text-[13.5px] text-epo-slate-800">
                {value}
            </div>
        </div>
    );
}

function Piece({ label, icon, present }) {
    return (
        <span className={`
            inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium
            ${present ? 'bg-epo-green-50 text-epo-green-700' : 'bg-epo-slate-100 text-epo-slate-500'}
        `}>
            <i className={`fas ${icon} text-[11px]`} />
            {label}
            {present && <i className="fas fa-check text-[9px] ml-0.5" />}
        </span>
    );
}

function buildTimeline(acte) {
    const items = [];

    // Création
    items.push({
        date: formatDateTime(acte.dateCreation),
        user: acte.produitPar,
        action: 'Création du projet',
    });

    // États intermédiaires (on simule en fonction de l'état actuel)
    if (['chez-sg', 'vu-bon-a-signer', 'chez-dg', 'signe', 'diffuse', 'archive', 'rejete'].includes(acte.etat)) {
        items.push({
            date: formatDateTime(addHours(acte.dateCreation, 3)),
            user: acte.produitPar,
            action: 'Soumission au SG pour amendement',
        });
    }

    if (['vu-bon-a-signer', 'chez-dg', 'signe', 'diffuse', 'archive', 'rejete'].includes(acte.etat)) {
        items.push({
            date: formatDateTime(addHours(acte.dateCreation, 8)),
            user: 'M. OUÉDRAOGO Salif',
            action: 'Vu bon à signer - Transmission au DG',
        });
    }

    if (['signe', 'diffuse', 'archive'].includes(acte.etat) && acte.dateSignature) {
        items.push({
            date: formatDateTime(acte.dateSignature),
            user: acte.signature === 'dg' ? 'Pr. NIKIÉMA Adama' : 'M. OUÉDRAOGO Salif',
            action: acte.signature === 'sg-delegation'
                ? 'Signature par délégation'
                : 'Signature du Directeur Général',
        });
    }

    if (acte.etat === 'rejete') {
        items.push({
            date: formatDateTime(addHours(acte.dateCreation, 12)),
            user: 'Pr. NIKIÉMA Adama',
            action: `Rejet - ${acte.motifRejet || 'Motif non précisé'}`,
        });
    }

    if (['diffuse', 'archive'].includes(acte.etat)) {
        items.push({
            date: formatDateTime(addHours(acte.dateSignature || acte.dateCreation, 2)),
            user: acte.produitPar,
            action: 'Diffusion au bénéficiaire',
        });
    }

    if (acte.etat === 'archive') {
        items.push({
            date: formatDateTime(addHours(acte.dateSignature || acte.dateCreation, 24)),
            user: 'SCC',
            action: 'Archivage',
        });
    }

    return items;
}

function addHours(iso, h) {
    const d = new Date(iso);
    d.setHours(d.getHours() + h);
    return d.toISOString();
}