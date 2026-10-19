// src/pages/sp-dg/CourriersRecusPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KpiCard, PageHeader, FilterBar, TableCard, RowAction, RefCell, TitleCell, EmptyTable, Echeance, TD, ROW, notify } from '../../components/ui';
import ClassificationBadge from '../../components/scc/ClassificationBadge';
import ConfirmationModal from '../../components/circuit/ConfirmationModal';
import { useCircuit } from '../../data/circuitContext.js';
import { arrivesSpDg, statsSpDg } from '../../data/spDgStats.js';

const SORTES = [
    { value: '', label: 'Tous les documents' },
    { value: 'courrier', label: 'Courriers pour décision' },
    { value: 'sortant', label: 'Courriers à signer' },
    { value: 'acte', label: 'Actes à signer' },
];

export default function CourriersRecusPage() {
    const navigate = useNavigate();
    const circuit = useCircuit();
    const [recherche, setRecherche] = useState('');
    const [sorte, setSorte] = useState('');
    const [aRecevoir, setARecevoir] = useState(null);

    const s = statsSpDg(circuit);
    const q = recherche.trim().toLowerCase();
    const liste = arrivesSpDg(circuit)
        .filter((x) => !x.recu)
        .filter((x) => (!sorte || x.sorte === sorte) && (!q || [x.id, x.objet, x.de].some((c) => c?.toLowerCase().includes(q))))
        .sort((a, b) => new Date(a.echeance || '2100-01-01') - new Date(b.echeance || '2100-01-01'));

    const handleConfirmer = (item) => {
        circuit.receptionnerSpDg(item.sorte, item.source);
        setARecevoir(null);
        notify.success(`${item.id} réceptionné`, { items: ['Décharge signée pour le secrétariat du SG', 'Le document est prêt à être introduit au DG'] });
    };

    return (
        <div className="w-full min-w-0">
            <PageHeader title="Courriers reçus" description="Documents envoyés par le secrétariat du SG, à réceptionner avant de les présenter au DG." />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard label="À réceptionner" value={s.aReceptionner} icon="fa-inbox" />
                <KpiCard label="À introduire au DG" value={s.aIntroduire} hint="Déjà réceptionnés" icon="fa-user-tie" onClick={() => navigate('/sp_dg/introduction')} />
                <KpiCard label="Chez le DG" value={s.chezDg} hint="En attente de sa décision" icon="fa-hourglass-half" />
                <KpiCard label="Décisions à cocher" value={s.aCocher} hint="Retours du DG" icon="fa-square-check" onClick={() => navigate('/sp_dg/post-visa')} />
            </div>

            <FilterBar
                search={{ value: recherche, onChange: setRecherche, placeholder: 'Rechercher un numéro, un objet…' }}
                filters={[{ id: 'sorte', label: 'Type', value: sorte, onChange: setSorte, options: SORTES }]}
                onReset={() => {
                    setRecherche('');
                    setSorte('');
                }}
            />

            {liste.length === 0 ? (
                <EmptyTable icon="fa-check" title="Aucun document à réceptionner" message="Les documents envoyés par le secrétariat du SG apparaîtront ici." />
            ) : (
                <TableCard columns={[{ label: 'N°' }, { label: 'Objet · Envoyé par' }, { label: 'Type' }, { label: 'Délai' }, { label: '' }]}>
                    {liste.map((x) => (
                        <tr key={x.id} className={ROW}>
                            <td className={TD}>
                                <RefCell>{x.id}</RefCell>
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
                                <RowAction primary icon="fa-check" onClick={() => setARecevoir(x)}>
                                    Réceptionner
                                </RowAction>
                            </td>
                        </tr>
                    ))}
                </TableCard>
            )}

            <ConfirmationModal
                key={aRecevoir?.id ?? 'aucun'}
                item={aRecevoir}
                titre={`Réceptionner ${aRecevoir?.id}`}
                caseACocher="J'ai reçu ce document et ses pièces"
                aide="La décharge est signée pour le secrétariat du SG."
                bouton="Confirmer la réception"
                icon="fa-inbox"
                onClose={() => setARecevoir(null)}
                onConfirmer={handleConfirmer}
            />
        </div>
    );
}
