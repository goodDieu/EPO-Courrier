// src/components/actes/ActeDetailModal.jsx
// Fiche d'un acte : bénéficiaire, où il en est, historique.
import { Modal, Button, CircuitEtapes, Historique, Echeance } from '../ui';
import NatureBadge from './NatureBadge';
import DocumentEtatTag from '../circuit/DocumentEtatTag';
import { SIGNATURES } from '../../data/actes.js';
import { ETAPES_DOCUMENT, INDEX_DOCUMENT } from '../../data/circuit.js';
import { formatJourHeure } from '../../data/demoClock.js';

const FERMES = ['signe', 'diffuse', 'archive', 'rejete'];

export default function ActeDetailModal({ acte, onClose, actions }) {
    if (!acte) return null;
    const sig = SIGNATURES[acte.signature];

    return (
        <Modal
            open
            onClose={onClose}
            title={`Acte ${acte.id}`}
            titleIcon="fa-file-signature"
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    {['signe', 'diffuse', 'archive'].includes(acte.etat) && (
                        <Button variant="outline" icon="fa-print" onClick={() => window.print()}>
                            Imprimer
                        </Button>
                    )}
                    {actions}
                </>
            }
        >
            <div className="p-4 mb-5 border rounded-lg border-epo-slate-200">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-sm font-semibold tabular-nums text-epo-slate-900">{acte.id}</span>
                    <NatureBadge nature={acte.nature} />
                </div>
                <p className="mt-1.5 text-base font-semibold text-epo-slate-900">{acte.objet}</p>
                <dl className="grid grid-cols-1 mt-3 text-sm gap-x-6 gap-y-1.5 sm:grid-cols-2">
                    <Ligne terme="Bénéficiaire" valeur={`${acte.beneficiaireNom} (${acte.beneficiaireStructure})`} />
                    <Ligne terme="Matricule" valeur={acte.beneficiaireMatricule} />
                    <Ligne terme="Préparé par" valeur={acte.produitPar} />
                    <Ligne terme="Créé" valeur={formatJourHeure(acte.dateCreation)} />
                    {!FERMES.includes(acte.etat) && <Ligne terme="Délai" valeur={<Echeance iso={acte.echeance} />} />}
                    {acte.dateSignature && <Ligne terme="Signé" valeur={`${formatJourHeure(acte.dateSignature)} · ${sig?.label}`} />}
                </dl>
            </div>

            <section className="mb-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                    <h3 className="text-sm font-semibold text-epo-slate-900">Où en est l'acte</h3>
                    <DocumentEtatTag etat={acte.etat} />
                </div>
                <CircuitEtapes etapes={ETAPES_DOCUMENT} current={INDEX_DOCUMENT[acte.etat] ?? 0} bloque={acte.etat === 'rejete'} />
                {acte.motifRejet && (
                    <p className="flex items-start gap-2 mt-4 text-sm text-epo-slate-900">
                        <i className="fas fa-circle-exclamation mt-0.5 text-epo-red-600" aria-hidden="true" />
                        {acte.motifRejet}
                    </p>
                )}
            </section>

            <section>
                <h3 className="mb-3 text-sm font-semibold text-epo-slate-900">Historique</h3>
                <Historique items={historiqueActe(acte)} />
            </section>
        </Modal>
    );
}

function Ligne({ terme, valeur }) {
    return (
        <div className="flex gap-2">
            <dt className="text-epo-slate-500">{terme} :</dt>
            <dd className="font-medium text-epo-slate-900">{valeur}</dd>
        </div>
    );
}

const ETAPES_PASSEES = {
    visa: ['chez-sg', 'renvoye-correction', 'vu-bon-a-signer', 'chez-dg', 'signe', 'rejete', 'diffuse', 'archive'],
    bonASigner: ['vu-bon-a-signer', 'chez-dg', 'signe', 'rejete', 'diffuse', 'archive'],
    signe: ['signe', 'diffuse', 'archive'],
    diffuse: ['diffuse', 'archive'],
};

const plusHeures = (iso, h) => new Date(new Date(iso).getTime() + h * 3600000).toISOString();

// Historique reconstitué à partir de l'état de départ de l'acte, puis
// mouvements faits pendant la démonstration
function historiqueActe(acte) {
    if (!acte.etatInitial) return acte.historique || [];
    const a = { ...acte, etat: acte.etatInitial };
    const items = [{ date: a.dateCreation, action: "Acte préparé", par: a.produitPar }];
    if (ETAPES_PASSEES.visa.includes(a.etat)) items.push({ date: plusHeures(a.dateCreation, 3), action: 'Transmis au SG pour visa', par: 'Mme KABORÉ Fatimata' });
    if (a.etat === 'renvoye-correction') items.push({ date: plusHeures(a.dateCreation, 6), action: `Renvoyé pour correction${a.motifRejet ? ` : ${a.motifRejet}` : ''}`, par: 'M. OUÉDRAOGO Salif' });
    if (ETAPES_PASSEES.bonASigner.includes(a.etat)) items.push({ date: plusHeures(a.dateCreation, 8), action: 'Vu bon à signer', par: 'M. OUÉDRAOGO Salif' });
    if (ETAPES_PASSEES.signe.includes(a.etat) && a.dateSignature)
        items.push({ date: a.dateSignature, action: a.signature === 'sg-delegation' ? 'Signé par délégation' : 'Signé par le DG', par: a.signature === 'dg' ? 'Pr. NIKIÉMA Adama' : 'M. OUÉDRAOGO Salif' });
    if (a.etat === 'rejete') items.push({ date: plusHeures(a.dateCreation, 12), action: `Rejeté par le DG${a.motifRejet ? ` : ${a.motifRejet}` : ''}`, par: 'Pr. NIKIÉMA Adama' });
    if (ETAPES_PASSEES.diffuse.includes(a.etat)) items.push({ date: plusHeures(a.dateSignature || a.dateCreation, 2), action: 'Remis au bénéficiaire', par: 'Service Courrier' });
    return [...items, ...(acte.historique || [])];
}
