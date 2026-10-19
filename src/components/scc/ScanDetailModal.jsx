// src/components/scc/ScanDetailModal.jsx
import { Modal, Button, StatusBadge } from '../ui';
import ClassificationBadge from './ClassificationBadge';
import { ETATS_SCAN, TYPES_PIECES, formatDateHeure, formatTaille } from '../../data/scanSCC.js';

/**
 * Fiche d'un document de la file de numérisation.
 */
export default function ScanDetailModal({ document, onClose, onScanner }) {
    if (!document) return null;
    const d = document;
    const canScanner = d.etat === 'a-scanner' || d.etat === 'erreur';

    const rows = [
        ['Document', d.documentSource],
        ['Objet', d.objet],
        ['Provenance', d.source === 'Arrivée' ? 'Courrier entrant' : 'Courrier sortant'],
        ['Type de pièce', TYPES_PIECES[d.typePiece]?.label],
        ['Pages', d.nbPages],
        ['Classification', <ClassificationBadge key="c" classification={d.classification} />],
        ['Reçu le', formatDateHeure(d.dateArrivee)],
        ['Agent', d.agentAssigne || 'Non désigné'],
        ['État', <StatusBadge key="e" status={d.etat} label={ETATS_SCAN[d.etat]?.label} />],
    ];
    if (d.etat === 'erreur' && d.erreur) rows.push(['Erreur', <span key="r" className="text-epo-slate-900">{d.erreur}</span>]);
    if (d.etat === 'scanne') {
        rows.push(['Numérisé le', formatDateHeure(d.dateScan)]);
        if (d.taille) rows.push(['Taille', formatTaille(d.taille)]);
    }

    return (
        <Modal
            open
            onClose={onClose}
            title={`Document ${d.documentSource}`}
            titleIcon="fa-file-lines"
            size="md"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    {canScanner && (
                        <Button
                            icon={d.etat === 'erreur' ? 'fa-rotate-right' : 'fa-camera'}
                            onClick={() => {
                                onClose();
                                onScanner(d);
                            }}
                        >
                            {d.etat === 'erreur' ? 'Relancer la numérisation' : 'Numériser'}
                        </Button>
                    )}
                </>
            }
        >
            <dl className="divide-y divide-epo-slate-100">
                {rows.map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[160px_1fr] gap-4 py-2.5 text-sm">
                        <dt className="text-epo-slate-600">{label}</dt>
                        <dd className="text-epo-slate-900">{value}</dd>
                    </div>
                ))}
            </dl>
        </Modal>
    );
}
