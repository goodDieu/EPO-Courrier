// src/components/dg/ItemsTable.jsx
// Liste commune aux pages du DG : un document par ligne, une action au bout.
import { TableCard, RefCell, TitleCell, EmptyTable, Echeance, TD, ROW } from '../ui';
import ClassificationBadge from '../scc/ClassificationBadge';

/**
 * Props :
 *   - items     : documents normalisés (voir spDgStats.normaliser)
 *   - colonne   : { label, render(item) } - avant-dernière colonne (par défaut : délai)
 *   - sousRef   : (item) => texte sous le numéro
 *   - action    : (item) => bouton de fin de ligne
 *   - vide      : { title, message, icon }
 *   - footer, alert
 */
export default function ItemsTable({ items, colonne, sousRef, action, vide, footer, alert }) {
    if (items.length === 0) return <EmptyTable icon={vide.icon || 'fa-check'} title={vide.title} message={vide.message} />;
    const col = colonne || { label: 'Délai', render: (x) => (x.echeance ? <Echeance iso={x.echeance} /> : <span className="text-sm text-epo-slate-500">Sans délai</span>) };

    return (
        <TableCard columns={[{ label: 'N°' }, { label: 'Objet · Provenance' }, { label: 'Type' }, { label: col.label }, ...(action ? [{ label: '' }] : [])]} footer={footer} alert={alert}>
            {items.map((x) => (
                <tr key={`${x.sorte}-${x.id}`} className={ROW}>
                    <td className={TD}>
                        <RefCell sub={sousRef?.(x)}>{x.id}</RefCell>
                    </td>
                    <td className={TD}>
                        <TitleCell title={x.objet} sub={x.de} width="max-w-[380px]" />
                    </td>
                    <td className={TD}>
                        <span className="text-sm whitespace-nowrap text-epo-slate-800">{x.quoi}</span>
                        {x.classification !== 'ordinaire' && (
                            <div className="mt-0.5">
                                <ClassificationBadge classification={x.classification} />
                            </div>
                        )}
                    </td>
                    <td className={TD}>{col.render(x)}</td>
                    {action && <td className={`${TD} text-right`}>{action(x)}</td>}
                </tr>
            ))}
        </TableCard>
    );
}
