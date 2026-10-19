// src/pages/sp-dg/IntroductionPage.jsx
import { useState } from 'react';
import { Button, KpiCard, PageHeader, FilterBar, TableCard, RowAction, RefCell, TitleCell, EmptyTable, Echeance, TD, ROW, notify } from '../../components/ui';
import ClassificationBadge from '../../components/scc/ClassificationBadge';
import ConfirmationModal from '../../components/circuit/ConfirmationModal';
import { formatJourHeure } from '../../data/demoClock.js';
import { useCircuit } from '../../data/circuitContext.js';
import { arrivesSpDg, chezDg, statsSpDg } from '../../data/spDgStats.js';

const contient = (q, x) => !q || [x.id, x.objet, x.de].some((c) => c?.toLowerCase().includes(q));
const parDelai = (a, b) => new Date(a.echeance || '2100-01-01') - new Date(b.echeance || '2100-01-01');

export default function IntroductionPage() {
    const circuit = useCircuit();
    const [recherche, setRecherche] = useState('');
    const [aIntroduire, setAIntroduire] = useState(null);

    const s = statsSpDg(circuit);
    const q = recherche.trim().toLowerCase();
    const prets = arrivesSpDg(circuit).filter((x) => x.recu && contient(q, x)).sort(parDelai);
    const auDg = chezDg(circuit).filter((x) => contient(q, x)).sort(parDelai);

    const handleConfirmer = (item) => {
        circuit.introduireAuDg(item.sorte, item.source);
        setAIntroduire(null);
        notify.success(`${item.id} introduit au DG`, { items: [item.sorte === 'courrier' ? 'Le DG donnera son avis' : 'Le document est dans le parapheur du DG'] });
    };

    return (
        <div className="w-full min-w-0">
            <PageHeader
                title="Introduction au DG"
                description="Documents réceptionnés à présenter au Directeur Général, le plus pressé en premier."
                actions={
                    <Button variant="outline" icon="fa-print" onClick={() => window.print()}>
                        Imprimer le bordereau
                    </Button>
                }
            />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard
                    label="À introduire"
                    value={s.aIntroduire}
                    variant={s.aIntroduireEnRetard ? 'urgent' : 'default'}
                    hint={s.aIntroduireEnRetard ? `dont ${s.aIntroduireEnRetard} en retard` : 'Aucun retard'}
                    icon="fa-user-tie"
                />
                <KpiCard label="Chez le DG" value={s.chezDg} hint="En attente de sa décision" icon="fa-hourglass-half" />
                <KpiCard label="Dont à signer" value={auDg.filter((x) => x.sorte !== 'courrier').length} hint="Actes et courriers" icon="fa-pen-nib" />
                <KpiCard label="Dont pour décision" value={auDg.filter((x) => x.sorte === 'courrier').length} hint="Courriers reçus" icon="fa-envelope-open-text" />
            </div>

            <FilterBar search={{ value: recherche, onChange: setRecherche, placeholder: 'Rechercher un numéro, un objet…' }} onReset={() => setRecherche('')} />

            <h2 className="mb-3 text-base font-semibold text-epo-slate-900">À introduire</h2>
            <div className="mb-8">
                {prets.length === 0 ? (
                    <EmptyTable icon="fa-check" title="Aucun document à introduire" message="Réceptionnez d'abord les documents dans « Courriers reçus »." />
                ) : (
                    <TableCard columns={[{ label: 'N° · Reçu' }, { label: 'Objet · Envoyé par' }, { label: 'Type' }, { label: 'Délai' }, { label: '' }]}>
                        {prets.map((x) => (
                            <tr key={x.id} className={ROW}>
                                <td className={TD}>
                                    <RefCell sub={x.source.recuSpDgLe ? formatJourHeure(x.source.recuSpDgLe) : null}>{x.id}</RefCell>
                                </td>
                                <td className={TD}>
                                    <TitleCell title={x.objet} sub={x.de} width="max-w-[360px]" />
                                </td>
                                <td className={TD}>
                                    <span className="text-sm whitespace-nowrap text-epo-slate-800">{x.quoi}</span>
                                    {x.classification !== 'ordinaire' && (
                                        <div className="mt-0.5">
                                            <ClassificationBadge classification={x.classification} />
                                        </div>
                                    )}
                                </td>
                                <td className={TD}>{x.echeance ? <Echeance iso={x.echeance} /> : <span className="text-sm text-epo-slate-500">Sans délai</span>}</td>
                                <td className={`${TD} text-right`}>
                                    <RowAction primary icon="fa-user-tie" onClick={() => setAIntroduire(x)}>
                                        Introduire
                                    </RowAction>
                                </td>
                            </tr>
                        ))}
                    </TableCard>
                )}
            </div>

            <h2 className="mb-3 text-base font-semibold text-epo-slate-900">Chez le DG</h2>
            {auDg.length === 0 ? (
                <EmptyTable title="Rien chez le DG pour le moment" />
            ) : (
                <TableCard columns={[{ label: 'N°' }, { label: 'Objet' }, { label: 'Type' }, { label: 'Délai' }]}>
                    {auDg.map((x) => (
                        <tr key={x.id} className={ROW}>
                            <td className={TD}>
                                <RefCell>{x.id}</RefCell>
                            </td>
                            <td className={TD}>
                                <TitleCell title={x.objet} sub={x.de} width="max-w-[420px]" />
                            </td>
                            <td className={`${TD} text-sm whitespace-nowrap text-epo-slate-800`}>{x.quoi}</td>
                            <td className={TD}>{x.echeance ? <Echeance iso={x.echeance} /> : <span className="text-sm text-epo-slate-500">Sans délai</span>}</td>
                        </tr>
                    ))}
                </TableCard>
            )}

            <ConfirmationModal
                key={aIntroduire?.id ?? 'aucun'}
                item={aIntroduire}
                titre={`Introduire ${aIntroduire?.id} au DG`}
                caseACocher="J'ai remis ce document au DG"
                aide={aIntroduire?.sorte === 'courrier' ? 'Le DG donnera son avis sur ce courrier.' : 'Le document passe dans le parapheur du DG.'}
                bouton="Confirmer l'introduction"
                icon="fa-user-tie"
                onClose={() => setAIntroduire(null)}
                onConfirmer={handleConfirmer}
            />
        </div>
    );
}
