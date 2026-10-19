// src/components/circuit/DocumentModal.jsx
// Fiche d'un courrier sortant : où il en est, ce qui s'est passé.
import { Modal, Button, CircuitEtapes, Historique, Echeance } from '../ui';
import ClassificationBadge from '../scc/ClassificationBadge';
import DocumentEtatTag from './DocumentEtatTag';
import { ETAPES_DOCUMENT, INDEX_DOCUMENT } from '../../data/circuit.js';
import { formatJourHeure } from '../../data/demoClock.js';

export default function DocumentModal({ document: doc, onClose, actions }) {
    if (!doc) return null;
    const ouvert = !['signe', 'diffuse', 'archive', 'rejete'].includes(doc.etat);

    return (
        <Modal
            open
            onClose={onClose}
            title={`Courrier sortant ${doc.id}`}
            titleIcon="fa-paper-plane"
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    {actions}
                </>
            }
        >
            <div className="p-4 mb-5 border rounded-lg border-epo-slate-200">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-sm font-semibold tabular-nums text-epo-slate-900">{doc.id}</span>
                    <span className="text-sm text-epo-slate-600">Version {doc.version}</span>
                    {doc.classification !== 'ordinaire' && <ClassificationBadge classification={doc.classification} />}
                </div>
                <p className="mt-1.5 text-base font-semibold text-epo-slate-900">{doc.objet}</p>
                <dl className="grid grid-cols-1 mt-3 text-sm gap-x-6 gap-y-1.5 sm:grid-cols-2">
                    <div className="flex gap-2">
                        <dt className="text-epo-slate-500">Destinataire :</dt>
                        <dd className="font-medium text-epo-slate-900">{doc.destinataire}</dd>
                    </div>
                    <div className="flex gap-2">
                        <dt className="text-epo-slate-500">Rédigé par :</dt>
                        <dd className="font-medium text-epo-slate-900">{doc.redacteur}</dd>
                    </div>
                    {doc.reponseA && (
                        <div className="flex gap-2">
                            <dt className="text-epo-slate-500">En réponse à :</dt>
                            <dd className="font-medium tabular-nums text-epo-slate-900">courrier {doc.reponseA}</dd>
                        </div>
                    )}
                    {ouvert && doc.echeance && (
                        <div className="flex gap-2">
                            <dt className="text-epo-slate-500">Délai :</dt>
                            <dd>
                                <Echeance iso={doc.echeance} />
                            </dd>
                        </div>
                    )}
                    {doc.signeLe && (
                        <div className="flex gap-2">
                            <dt className="text-epo-slate-500">Signé :</dt>
                            <dd className="font-medium text-epo-slate-900">
                                {formatJourHeure(doc.signeLe)}
                                {doc.signePar ? ` · ${doc.signePar}` : ''}
                            </dd>
                        </div>
                    )}
                </dl>
            </div>

            <section className="mb-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                    <h3 className="text-sm font-semibold text-epo-slate-900">Où en est le document</h3>
                    <DocumentEtatTag etat={doc.etat} />
                </div>
                <CircuitEtapes etapes={ETAPES_DOCUMENT} current={INDEX_DOCUMENT[doc.etat] ?? 0} bloque={doc.etat === 'rejete'} />
                {doc.motifRejet && (
                    <p className="flex items-start gap-2 mt-4 text-sm text-epo-slate-900">
                        <i className="fas fa-circle-exclamation mt-0.5 text-epo-red-600" aria-hidden="true" />
                        {doc.motifRejet}
                        {doc.remplacePar && <span className="text-epo-slate-600"> Nouvelle version : {doc.remplacePar}.</span>}
                    </p>
                )}
            </section>

            <section>
                <h3 className="mb-3 text-sm font-semibold text-epo-slate-900">Historique</h3>
                <Historique items={doc.historique} />
            </section>
        </Modal>
    );
}
