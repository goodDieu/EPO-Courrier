// src/components/circuit/DossierCircuitModal.jsx
// Fiche d'un dossier en circulation : où il est, ce qui s'est passé, ce que le SG a demandé.
import { Modal, Button, CircuitEtapes, Historique } from '../ui';
import DossierResume from './DossierResume';
import LocalisationTag from './LocalisationTag';
import QuadrantTag from './QuadrantTag';
import { ETAPES_CIRCUIT, INDEX_ETAPE, TYPES_INSTRUCTION, STATUTS_INSTRUCTION } from '../../data/circuit.js';
import { formatJourHeure } from '../../data/demoClock.js';

export default function DossierCircuitModal({ dossier, instructions = [], onClose, actions }) {
    if (!dossier) return null;
    const d = dossier;
    const liees = instructions.filter((i) => i.dossierId === d.id);

    return (
        <Modal
            open
            onClose={onClose}
            title={`Dossier ${d.id}`}
            titleIcon="fa-folder-open"
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
            <DossierResume
                dossier={d}
                lignes={[
                    ['Expéditeur', d.expediteur],
                    ['Reçu au SP-SG', formatJourHeure(d.recuLe)],
                    ['Tri', <QuadrantTag key="q" quadrant={d.quadrant} />],
                    ['Pièces', d.pieces],
                ]}
            />

            <section className="mb-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                    <h3 className="text-sm font-semibold text-epo-slate-900">Où est le dossier</h3>
                    <LocalisationTag dossier={d} />
                </div>
                <CircuitEtapes etapes={ETAPES_CIRCUIT} current={INDEX_ETAPE[d.localisation] ?? 0} bloque={!!d.bloque} />
                {d.bloque && (
                    <p className="flex items-start gap-2 mt-4 text-sm text-epo-slate-900">
                        <i className="fas fa-circle-exclamation mt-0.5 text-epo-red-600" aria-hidden="true" />
                        {d.bloque}
                    </p>
                )}
            </section>

            {liees.length > 0 && (
                <section className="mb-6">
                    <h3 className="mb-2 text-sm font-semibold text-epo-slate-900">Instructions du SG</h3>
                    <ul className="border divide-y rounded-lg border-epo-slate-200 divide-epo-slate-100">
                        {liees.map((i) => (
                            <li key={i.id} className="px-4 py-3">
                                <p className="text-sm text-epo-slate-900">{i.contenu}</p>
                                <p className="mt-1 text-sm text-epo-slate-600">
                                    {TYPES_INSTRUCTION[i.type]?.label} · {formatJourHeure(i.emiseLe)} · {STATUTS_INSTRUCTION[i.statut]?.label}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <section>
                <h3 className="mb-3 text-sm font-semibold text-epo-slate-900">Historique</h3>
                <Historique items={d.historique} />
            </section>
        </Modal>
    );
}
