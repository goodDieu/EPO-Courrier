// src/components/scc/ArriveesTable.jsx
import { StatusBadge, TableCard, RowAction, RefCell, TitleCell, EmptyTable, TD, ROW_CLICKABLE } from '../ui';
import ClassificationBadge from './ClassificationBadge';
import { NATURES_ENTRANTS, ETATS_ENTRANTS, formatDuree } from '../../data/arriveesSCC.js';
import { formatJourHeure } from '../../data/demoClock.js';
import { isEntrantActif } from '../../data/sccStats.js';

const COLUMNS = [
    { label: 'N° · Reçu' },
    { label: 'Objet · Expéditeur' },
    { label: 'Classification' },
    { label: 'État · Échéance' },
    { label: '' },
];

export default function ArriveesTable({ arrivees, onVoir, onTransmettre }) {
    if (arrivees.length === 0) {
        return <EmptyTable icon="fa-inbox" title="Aucun courrier ne correspond" message="Modifiez la recherche ou effacez les filtres." />;
    }

    return (
        <TableCard
            columns={COLUMNS}
            footer={`${arrivees.length} courrier${arrivees.length > 1 ? 's' : ''} · cliquez sur une ligne pour ouvrir la fiche`}
        >
            {arrivees.map((a) => {
                const nature = NATURES_ENTRANTS[a.nature];
                return (
                    <tr key={a.id} onClick={() => onVoir(a)} className={ROW_CLICKABLE}>
                        <td className={TD}>
                            <RefCell sub={formatJourHeure(a.dateReception)}>{a.id}</RefCell>
                        </td>
                        <td className={TD}>
                            <TitleCell
                                title={a.objet}
                                sub={`${a.expediteur} · ${nature?.label || ''} · ${a.pieces} pièce${a.pieces > 1 ? 's' : ''}`}
                            />
                        </td>
                        <td className={TD}>
                            <ClassificationBadge classification={a.classification} />
                        </td>
                        <td className={TD}>
                            <StatusBadge status={a.etat} label={ETATS_ENTRANTS[a.etat]?.label} />
                            {isEntrantActif(a) && (
                                <div className="mt-0.5 text-xs">
                                    {a.tempsRestant < 0 ? (
                                        <span className="font-medium text-epo-slate-900"><i className="mr-1 fas fa-circle-exclamation text-epo-red-600" aria-hidden="true" />Dépassé de {formatDuree(a.tempsRestant)}</span>
                                    ) : (
                                        <span className={a.tempsRestant < 60 ? 'font-medium text-epo-slate-900' : 'text-epo-slate-500'}>
                                            À traiter sous {formatDuree(a.tempsRestant)}
                                        </span>
                                    )}
                                </div>
                            )}
                        </td>
                        <td className={`${TD} text-right`}>
                            {a.etat === 'enregistre' ? (
                                <RowAction primary icon="fa-paper-plane" onClick={() => onTransmettre(a)}>
                                    Transmettre
                                </RowAction>
                            ) : (
                                <RowAction onClick={() => onVoir(a)}>Ouvrir</RowAction>
                            )}
                        </td>
                    </tr>
                );
            })}
        </TableCard>
    );
}
