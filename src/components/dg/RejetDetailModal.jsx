// src/components/dg/RejetDetailModal.jsx
import { Modal, Button, StatusBadge } from '../ui';
import {
    NATURES_MOTIF,
    ETATS_REJET,
    formatDateHeure,
} from '../../data/rejetesDG.js';

export default function RejetDetailModal({ document, onClose }) {
    if (!document) return null;

    const d = document;
    const motif = NATURES_MOTIF[d.natureMotif];
    const etat = ETATS_REJET[d.etat];
    const canTraiter = d.etat === 're-soumis';

    return (
        <Modal
            open={!!d}
            onClose={onClose}
            title={`${d.etat === 're-soumis' ? 'Re-soumis' : 'Rejeté'} -${d.objet}`}
            titleIcon={canTraiter ? 'fa-redo' : 'fa-times-circle'}
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    <Button variant="outline" icon="fa-print">
                        Imprimer
                    </Button>
                    {canTraiter && (
                        <Button variant="primary" icon="fa-check">
                            Traiter
                        </Button>
                    )}
                </>
            }
        >
            {/* En-tête */}
            <div className="flex flex-wrap items-center gap-2 pb-5 mb-5 border-b border-epo-slate-100">
                <span className="font-mono text-[12.5px] font-bold text-epo-slate-800 bg-epo-slate-100 px-2.5 py-1 rounded-full">
                    {d.id}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${etat.chip}`}>
                    <i className={`fas ${etat.icon} text-[10px]`} />
                    {etat.label}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${motif.chip}`}>
                    <i className={`fas ${motif.icon} text-[10px]`} />
                    Motif {motif.label}
                </span>
            </div>

            {/* Bloc motif de rejet */}
            <div className="flex items-start gap-3 p-4 mb-5 border rounded-lg bg-epo-red-50 border-epo-red-200">
                <i className="fas fa-times-circle text-epo-red-600 mt-0.5 text-[16px]" />
                <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold uppercase tracking-wider text-epo-red-700 mb-1">
                        Motif du rejet ({motif.label})
                    </div>
                    <div className="text-[13.5px] text-epo-red-900 leading-relaxed">
                        {d.motifRejet}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[11.5px] text-epo-red-800">
                        <span>
                            <i className="fas fa-user text-[10px] mr-1" />
                            Rejeté par {d.rejetePar}
                        </span>
                        <span>
                            <i className="fas fa-clock text-[10px] mr-1" />
                            {formatDateHeure(d.dateRejet)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Bloc correction (si applicable) */}
            {(d.correctionPar || d.dateCorrection || d.dateReSoumission) && (
                <div className="flex items-start gap-3 p-4 mb-5 border rounded-lg bg-epo-green-50 border-epo-green-200">
                    <i className="fas fa-redo text-epo-green-600 mt-0.5 text-[16px]" />
                    <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-semibold uppercase tracking-wider text-epo-green-700 mb-1">
                            Correction
                        </div>
                        {d.correctionPar && (
                            <div className="text-[13px] text-epo-green-900">
                                Corrigé par <strong>{d.correctionPar}</strong>
                                {d.dateCorrection && ` le ${formatDateHeure(d.dateCorrection)}`}
                            </div>
                        )}
                        {d.dateReSoumission && (
                            <div className="text-[13px] text-epo-green-900 mt-1">
                                <i className="fas fa-check-circle text-[11px] mr-1.5" />
                                Re-soumis au DG le <strong>{formatDateHeure(d.dateReSoumission)}</strong>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Métadonnées */}
            <div className="space-y-0">
                <DetailRow label="Objet" value={<strong>{d.objet}</strong>} />
                <DetailRow label="Type" value={d.type === 'acte' ? 'Acte administratif' : 'Courrier'} />
                <DetailRow label="Expéditeur" value={d.expediteur} />
                <DetailRow label="Produit par" value={d.produitPar} />
                <DetailRow label="Description" value={d.description} />
                <DetailRow
                    label="Fonds de dossier"
                    value={
                        <div className="flex flex-wrap gap-2">
                            {(d.pieces || []).map((p, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-epo-slate-100 text-[12px] text-epo-slate-700"
                                >
                                    <i className="fas fa-paperclip text-epo-slate-400 text-[10px]" />
                                    {p}
                                </span>
                            ))}
                        </div>
                    }
                    last
                />
            </div>

            {/* Contenu actuel */}
            <div className="p-4 my-4 rounded-lg bg-epo-slate-50">
                <strong className="text-[13px] text-epo-slate-500 uppercase tracking-wider block mb-2">
                    Contenu actuel
                </strong>
                <p className="text-[14px] text-epo-slate-700 leading-relaxed">
                    {d.contenu}
                </p>
            </div>

            {/* Historique des corrections */}
            {d.historiqueCorrections && d.historiqueCorrections.length > 0 && (
                <div className="pt-4 mt-4 border-t border-epo-slate-100">
                    <h4 className="text-[12px] font-semibold uppercase tracking-wider text-epo-slate-500 mb-2.5">
                        Historique des corrections
                    </h4>
                    <div className="flex flex-col gap-2">
                        {d.historiqueCorrections.map((c, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 p-3 bg-white border rounded-lg border-epo-slate-200"
                            >
                                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-epo-green-50 text-epo-green-600">
                                    <i className="fas fa-pen text-[11px]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[12.5px] text-epo-slate-800">
                                        {c.description}
                                    </div>
                                    <div className="text-[11px] text-epo-slate-500 mt-0.5">
                                        {c.auteur} · {formatDateHeure(c.date)}
                                    </div>
                                </div>
                            </div>
                        ))}
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