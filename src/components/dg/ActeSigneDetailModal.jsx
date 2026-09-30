// src/components/dg/ActeSigneDetailModal.jsx
import { Modal, Button, StatusBadge } from '../ui';
import {
    NATURES_ACTES,
    TYPES_SIGNATAIRE,
    formatDateHeure,
} from '../../data/actesSignesDG.js';

export default function ActeSigneDetailModal({ acte, onClose }) {
    if (!acte) return null;

    const a = acte;
    const nature = NATURES_ACTES[a.nature];
    const signataire = TYPES_SIGNATAIRE[a.signataire];

    return (
        <Modal
            open={!!a}
            onClose={onClose}
            title={`${a.id} -${a.objet}`}
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
                    {a.hash && (
                        <Button variant="primary" icon="fa-shield-halved">
                            Vérifier l'intégrité
                        </Button>
                    )}
                </>
            }
        >
            {/* En-tête */}
            <div className="flex flex-wrap items-center gap-2 pb-5 mb-5 border-b border-epo-slate-100">
                <span className="font-mono text-[12.5px] font-bold text-epo-slate-800 bg-epo-slate-100 px-2.5 py-1 rounded-full">
                    {a.id}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${nature.color}`}>
                    <i className={`fas ${nature.icon} text-[10px]`} />
                    {nature.label}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${signataire.chip}`}>
                    <i className={`fas ${signataire.icon} text-[10px]`} />
                    {signataire.label}
                </span>
                <StatusBadge status={a.etat} />
            </div>

            {/* ============ Section 1 -Mention réglementaire (RG-22) ============ */}
            {a.mentionDelegation && (
                <div className="p-4 mb-5 border rounded-lg bg-epo-slate-50 border-epo-slate-200">
                    <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center flex-shrink-0 text-white rounded-lg w-9 h-9 bg-epo-slate-700">
                            <i className="fas fa-stamp text-[13px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[11px] font-semibold uppercase tracking-wider text-epo-slate-500 mb-1">
                                Mention réglementaire (RG-22)
                            </div>
                            <div className="text-[14px] italic font-medium text-epo-slate-800">
                                « {a.mentionDelegation} »
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ============ Section 2 -Métadonnées ============ */}
            <div className="space-y-0">
                <DetailRow label="Objet" value={<strong>{a.objet}</strong>} />
                <DetailRow
                    label="Bénéficiaire"
                    value={
                        <div>
                            <div className="font-medium">{a.beneficiaire}</div>
                            {a.beneficiaireMatricule !== '—' && (
                                <div className="text-[11.5px] text-epo-slate-500 font-mono mt-0.5">
                                    {a.beneficiaireMatricule}
                                </div>
                            )}
                            <div className="text-[11.5px] text-epo-slate-500 mt-0.5">
                                {a.beneficiaireStructure}
                            </div>
                        </div>
                    }
                />
                <DetailRow label="Produit par" value={a.produitPar} />
                <DetailRow
                    label="Signataire"
                    value={
                        <span className={`inline-flex items-center gap-1.5 text-[13px] font-medium ${a.signataire === 'dg' ? 'text-epo-green-700' : 'text-epo-slate-700'}`}>
                            <i className={`fas ${signataire.icon} text-[11px]`} />
                            {signataire.label}
                        </span>
                    }
                />
                <DetailRow
                    label="Numéro sortant"
                    value={<span className="font-mono">{a.numeroSortant}</span>}
                />
                <DetailRow label="Signé le" value={formatDateHeure(a.dateSignature)} />
                <DetailRow
                    label="Diffusé le"
                    value={a.dateDiffusion ? formatDateHeure(a.dateDiffusion) : '—'}
                />
                <DetailRow
                    label="Archivé le"
                    value={a.dateArchivage ? formatDateHeure(a.dateArchivage) : 'En cours'}
                />
                <DetailRow label="Pièces" value={`${a.pieces} pièce${a.pieces > 1 ? 's' : ''}`} />
                <DetailRow
                    label="Localisation"
                    value={
                        <span className="inline-flex items-center gap-1.5">
                            <i className="fas fa-archive text-[11px] text-epo-slate-400" />
                            <span className="font-mono text-[12px]">{a.boitePhysique}</span>
                            <span className="text-[11.5px] text-epo-slate-500">· {a.emplacement}</span>
                        </span>
                    }
                    last
                />
            </div>

            {/* ============ Section 3 -Hash d'intégrité (§12.4) ============ */}
            {a.hash && (
                <div className="p-4 mt-5 border rounded-lg bg-epo-slate-50 border-epo-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                        <i className="fas fa-shield-halved text-epo-green-600" />
                        <span className="text-[11.5px] font-semibold uppercase tracking-wider text-epo-slate-500">
                            Hash d'intégrité (SHA-256)
                        </span>
                    </div>
                    <div className="font-mono text-[10.5px] text-epo-slate-700 break-all leading-relaxed">
                        {a.hash}
                    </div>
                    <div className="mt-2 text-[11px] text-epo-slate-500">
                        <i className="fas fa-info-circle text-[9.5px] mr-1" />
                        Permet de vérifier que le document n'a pas été altéré depuis sa signature (§12.4).
                    </div>
                </div>
            )}
        </Modal>
    );
}

function DetailRow({ label, value, last = false }) {
    return (
        <div
            className={`
                flex flex-col sm:flex-row gap-1 sm:gap-4 py-3
                ${!last ? 'border-b border-epo-slate-100' : ''}
            `}
        >
            <div className="w-full sm:w-40 flex-shrink-0 text-[12px] font-semibold uppercase tracking-wider text-epo-slate-500">
                {label}
            </div>
            <div className="flex-1 text-[13.5px] text-epo-slate-800">{value}</div>
        </div>
    );
}