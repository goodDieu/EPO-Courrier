// src/components/scc/DepartsTable.jsx
import { StatusBadge, TableCard, RowAction, RefCell, TitleCell, EmptyTable, TD, ROW_CLICKABLE } from '../ui';
import ModeDepartBadge from './ModeDepartBadge';
import { ETATS_DEPART } from '../../data/departsSCC.js';
import { formatJourHeure } from '../../data/demoClock.js';

const COLUMNS = [
    { label: 'N° sortant · Reçu' },
    { label: 'Objet · Destinataire' },
    { label: 'Mode' },
    { label: 'Préparation' },
    { label: 'État' },
    { label: '' },
];

const ACTIONS = {
    'a-numeroter': { label: 'Numéroter', icon: 'fa-hashtag' },
    'a-cacheter': { label: 'Cacheter', icon: 'fa-stamp' },
    'pret-expedition': { label: 'Expédier', icon: 'fa-paper-plane' },
};

function Etape({ done, children }) {
    return (
        <span className={`inline-flex items-center gap-1.5 text-sm ${done ? 'text-epo-slate-800' : 'text-epo-slate-500'}`}>
            <i className={`fas ${done ? 'fa-check text-epo-green-700' : 'fa-minus text-epo-slate-400'} text-xs`} aria-hidden="true" />
            {children}
        </span>
    );
}

export default function DepartsTable({ departs, onVoir, onTraiter }) {
    if (departs.length === 0) {
        return <EmptyTable icon="fa-paper-plane" title="Aucun départ ne correspond" message="Modifiez la recherche ou effacez les filtres." />;
    }

    return (
        <TableCard columns={COLUMNS} footer={`${departs.length} départ${departs.length > 1 ? 's' : ''} · cliquez sur une ligne pour ouvrir la fiche`}>
            {departs.map((d) => {
                const action = ACTIONS[d.etat];
                return (
                    <tr key={d.id} onClick={() => onVoir(d)} className={ROW_CLICKABLE}>
                        <td className={TD}>
                            <RefCell sub={formatJourHeure(d.dateReceptionSCC)}>{d.numeroSortant || 'À attribuer'}</RefCell>
                        </td>
                        <td className={TD}>
                            <TitleCell title={d.objet} sub={`Pour ${d.destinataire?.structure || d.beneficiaire}${d.destinataire?.personne ? ` · ${d.destinataire.personne}` : ''}`} />
                        </td>
                        <td className={TD}>
                            <ModeDepartBadge mode={d.mode} />
                        </td>
                        <td className={TD}>
                            <div className="flex flex-col gap-0.5">
                                <Etape done={!!d.numeroSortant}>Numéroté</Etape>
                                <Etape done={!!d.cachet}>Cacheté</Etape>
                            </div>
                        </td>
                        <td className={TD}>
                            <StatusBadge status={d.etat} label={ETATS_DEPART[d.etat]?.label} />
                        </td>
                        <td className={`${TD} text-right`}>
                            {action ? (
                                <RowAction primary icon={action.icon} onClick={() => onTraiter(d)}>
                                    {action.label}
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
