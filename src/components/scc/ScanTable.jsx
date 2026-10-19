// src/components/scc/ScanTable.jsx
import { StatusBadge, TableCard, RowAction, RefCell, TitleCell, EmptyTable, TD, ROW_CLICKABLE } from '../ui';
import ClassificationBadge from './ClassificationBadge';
import { ETATS_SCAN, TYPES_PIECES, formatTaille } from '../../data/scanSCC.js';
import { formatJourHeure } from '../../data/demoClock.js';

const COLUMNS = [
    { label: 'Document · Reçu' },
    { label: 'Objet' },
    { label: 'Classification' },
    { label: 'État' },
    { label: '' },
];

export default function ScanTable({ documents, onVoir, onScanner }) {
    if (documents.length === 0) {
        return <EmptyTable icon="fa-check" title="Aucun document à numériser" message="La file d'attente est vide." />;
    }

    const totalErreur = documents.filter((d) => d.etat === 'erreur').length;

    return (
        <TableCard
            columns={COLUMNS}
            alert={totalErreur > 0 ? `${totalErreur} numérisation${totalErreur > 1 ? 's' : ''} en erreur à relancer` : null}
            footer={`${documents.length} document${documents.length > 1 ? 's' : ''} · cliquez sur une ligne pour ouvrir la fiche`}
        >
            {documents.map((d) => {
                const piece = TYPES_PIECES[d.typePiece];
                const sub = `${d.source === 'Arrivée' ? 'Courrier entrant' : 'Courrier sortant'} · ${piece?.label || ''} · ${d.nbPages} page${d.nbPages > 1 ? 's' : ''} · ${d.agentAssigne || 'agent non désigné'}`;
                return (
                    <tr key={d.id} onClick={() => onVoir(d)} className={ROW_CLICKABLE}>
                        <td className={TD}>
                            <RefCell sub={formatJourHeure(d.dateArrivee)}>{d.documentSource}</RefCell>
                        </td>
                        <td className={TD}>
                            <TitleCell title={d.objet} sub={sub} />
                        </td>
                        <td className={TD}>
                            <ClassificationBadge classification={d.classification} />
                        </td>
                        <td className={TD}>
                            <StatusBadge status={d.etat} label={ETATS_SCAN[d.etat]?.label} />
                            {d.etat === 'erreur' && d.erreur && (
                                <div className="mt-0.5 text-xs text-epo-slate-700 max-w-[220px]">{d.erreur}</div>
                            )}
                            {d.etat === 'en-cours' && d.progression != null && (
                                <div className="flex items-center gap-2 mt-1.5">
                                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-epo-slate-200">
                                        <div className="h-full bg-epo-green-600" style={{ width: `${d.progression}%` }} />
                                    </div>
                                    <span className="text-xs tabular-nums whitespace-nowrap text-epo-slate-600">{d.progression} %</span>
                                </div>
                            )}
                            {d.etat === 'scanne' && d.taille && (
                                <div className="mt-0.5 text-xs text-epo-slate-500">{formatTaille(d.taille)}</div>
                            )}
                        </td>
                        <td className={`${TD} text-right`}>
                            {d.etat === 'a-scanner' ? (
                                <RowAction primary icon="fa-camera" onClick={() => onScanner(d)}>
                                    Numériser
                                </RowAction>
                            ) : d.etat === 'erreur' ? (
                                <RowAction primary icon="fa-rotate-right" onClick={() => onScanner(d)}>
                                    Relancer
                                </RowAction>
                            ) : (
                                <RowAction onClick={() => onVoir(d)}>Ouvrir</RowAction>
                            )}
                        </td>
                    </tr>
                );
            })}
        </TableCard>
    );
}
