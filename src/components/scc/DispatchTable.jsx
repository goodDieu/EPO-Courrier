// src/components/scc/DispatchTable.jsx
import { StatusBadge, TableCard, RowAction, RefCell, TitleCell, EmptyTable, TD, ROW_CLICKABLE } from '../ui';
import ModeRemiseBadge from './ModeRemiseBadge';
import ClassificationBadge from './ClassificationBadge';
import { formatDuree, ETATS_DISPATCH } from '../../data/dispatchSCC.js';
import { formatJourHeure } from '../../data/demoClock.js';

const COLUMNS = [
    { label: 'N° · Reçu' },
    { label: 'Objet · Destinataire' },
    { label: 'Classification' },
    { label: 'Remise' },
    { label: 'État · Délai' },
    { label: '' },
];

export default function DispatchTable({ dossiers, onVoir, onDispatcher }) {
    if (dossiers.length === 0) {
        return <EmptyTable icon="fa-check" title="Aucun courrier à dispatcher" message="Tous les courriers imputés ont été répartis." />;
    }

    const totalRetard = dossiers.filter((d) => d.etat === 'en-retard').length;

    return (
        <TableCard
            columns={COLUMNS}
            alert={totalRetard > 0 ? `${totalRetard} courrier${totalRetard > 1 ? 's' : ''} en retard de remise, à traiter en priorité` : null}
            footer={`${dossiers.length} courrier${dossiers.length > 1 ? 's' : ''} · cliquez sur une ligne pour ouvrir la fiche`}
        >
            {dossiers.map((d) => {
                const canDispatch = d.etat === 'a-dispatcher' || d.etat === 'en-retard';
                const termine = d.etat === 'remis' || d.etat === 'decharge';
                return (
                    <tr key={d.id} onClick={() => onVoir(d)} className={ROW_CLICKABLE}>
                        <td className={TD}>
                            <RefCell sub={formatJourHeure(d.dateReceptionSCC)}>{d.id}</RefCell>
                        </td>
                        <td className={TD}>
                            <TitleCell title={d.objet} sub={`Pour ${d.destinataire.structure} · ${d.destinataire.personne}`} />
                        </td>
                        <td className={TD}>
                            <ClassificationBadge classification={d.classification} />
                        </td>
                        <td className={TD}>
                            <div className="whitespace-nowrap">
                                <ModeRemiseBadge mode={d.modePrevu} />
                                <div className="mt-0.5 text-xs text-epo-slate-500">
                                    {d.agentAssigne ? d.agentAssigne : d.modePrevu === 'liaison' ? 'Agent à désigner' : ' '}
                                </div>
                            </div>
                        </td>
                        <td className={TD}>
                            <StatusBadge status={d.etat} label={ETATS_DISPATCH[d.etat]?.label} />
                            {!termine && (
                                <div className="mt-0.5 text-xs">
                                    {d.tempsRestantMin < 0 ? (
                                        <span className="font-medium text-epo-slate-900"><i className="mr-1 fas fa-circle-exclamation text-epo-red-600" aria-hidden="true" />Dépassé de {formatDuree(d.tempsRestantMin)}</span>
                                    ) : (
                                        <span className={d.tempsRestantMin < 60 ? 'font-medium text-epo-slate-900' : 'text-epo-slate-500'}>
                                            Reste {formatDuree(d.tempsRestantMin)}
                                        </span>
                                    )}
                                </div>
                            )}
                        </td>
                        <td className={`${TD} text-right`}>
                            {canDispatch ? (
                                <RowAction primary icon="fa-share" onClick={() => onDispatcher(d)}>
                                    {d.agentAssigne ? 'Réassigner' : 'Dispatcher'}
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
