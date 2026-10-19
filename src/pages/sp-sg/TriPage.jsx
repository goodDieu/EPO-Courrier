// src/pages/sp-sg/TriPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KpiCard, PageHeader, FilterBar, TableCard, RowAction, RefCell, TitleCell, EmptyTable, Echeance, TD, ROW, notify } from '../../components/ui';
import ClassificationBadge from '../../components/scc/ClassificationBadge';
import QuadrantTag from '../../components/circuit/QuadrantTag';
import TriModal from '../../components/sp-sg/TriModal';
import { FILTRES_TYPE, QUADRANTS } from '../../data/circuit.js';
import { formatJourHeure, isSameDay, DEMO_NOW } from '../../data/demoClock.js';
import { formatDuree } from '../../data/arriveesSCC.js';
import { useCircuit } from '../../data/circuitContext.js';
import { aTrier, aIntroduire } from '../../data/spSgStats.js';

const contient = (q, ...champs) => champs.some((c) => c?.toLowerCase().includes(q));

export default function TriPage() {
    const navigate = useNavigate();
    const { dossiers, classer } = useCircuit();
    const [recherche, setRecherche] = useState('');
    const [filtreType, setFiltreType] = useState('');
    const [aClasserId, setAClasserId] = useState(null);

    const q = recherche.trim().toLowerCase();
    const filtrer = (liste) => liste.filter((d) => (!filtreType || d.type === filtreType) && (!q || contient(q, d.id, d.objet, d.expediteur)));

    const nonTries = filtrer(aTrier(dossiers)).sort(
        (a, b) => (a.classificationScc === 'urgent' ? -1 : 0) - (b.classificationScc === 'urgent' ? -1 : 0) || new Date(a.recuLe) - new Date(b.recuLe)
    );
    const tries = filtrer(aIntroduire(dossiers));

    const tousTries = aIntroduire(dossiers);
    const triesAujourdhui = dossiers.filter((d) => isSameDay(d.trieLe)).length;
    const aClasser = dossiers.find((d) => d.id === aClasserId);

    const handleClasser = (dossier, quadrant, motif) => {
        classer(dossier, quadrant, motif);
        setAClasserId(null);
        notify.success(`Dossier ${dossier.id} trié`, {
            items: [QUADRANTS[quadrant].label, QUADRANTS[quadrant].consigne],
        });
    };

    return (
        <div className="w-full min-w-0">
            <PageHeader title="Tri des dossiers" description="Classez chaque dossier reçu selon son importance et son urgence avant de l'introduire au SG." />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard label="À trier" value={aTrier(dossiers).length} icon="fa-table-cells-large" />
                <KpiCard
                    label="Importants et urgents"
                    value={tousTries.filter((d) => d.quadrant === 'important-urgent').length}
                    variant={tousTries.some((d) => d.quadrant === 'important-urgent') ? 'urgent' : 'default'}
                    hint="Triés, à introduire en premier"
                    icon="fa-circle-exclamation"
                    onClick={() => navigate('/sp_sg/introduction')}
                />
                <KpiCard label="Triés, à introduire" value={tousTries.length} hint="Voir l'introduction au SG" icon="fa-user-tie" onClick={() => navigate('/sp_sg/introduction')} />
                <KpiCard label="Triés aujourd'hui" value={triesAujourdhui} icon="fa-check" />
            </div>

            <FilterBar
                search={{ value: recherche, onChange: setRecherche, placeholder: 'Rechercher un numéro, un objet, un expéditeur…' }}
                filters={[{ id: 'type', label: 'Type', value: filtreType, onChange: setFiltreType, options: FILTRES_TYPE }]}
                onReset={() => {
                    setRecherche('');
                    setFiltreType('');
                }}
            />

            <h2 className="mb-3 text-base font-semibold text-epo-slate-900">À trier</h2>
            <div className="mb-8">
                {nonTries.length === 0 ? (
                    <EmptyTable icon="fa-check" title="Tout est trié" message="Les dossiers réceptionnés apparaîtront ici." />
                ) : (
                    <TableCard columns={[{ label: 'N° · Reçu' }, { label: 'Objet · Expéditeur' }, { label: 'Classification SCC' }, { label: 'En attente depuis' }, { label: '' }]}>
                        {nonTries.map((d) => (
                            <tr key={d.id} className={ROW}>
                                <td className={TD}>
                                    <RefCell sub={formatJourHeure(d.recuLe)}>{d.id}</RefCell>
                                </td>
                                <td className={TD}>
                                    <TitleCell title={d.objet} sub={`${d.expediteur} · ${d.type === 'acte' ? 'Acte' : 'Courrier'} · ${d.pieces} pièce${d.pieces > 1 ? 's' : ''}`} />
                                </td>
                                <td className={TD}>
                                    <ClassificationBadge classification={d.classificationScc} />
                                </td>
                                <td className={`${TD} text-sm text-epo-slate-700 whitespace-nowrap`}>{formatDuree(Math.round((DEMO_NOW - new Date(d.recuLe)) / 60000))}</td>
                                <td className={`${TD} text-right`}>
                                    <RowAction primary icon="fa-table-cells-large" onClick={() => setAClasserId(d.id)}>
                                        Trier
                                    </RowAction>
                                </td>
                            </tr>
                        ))}
                    </TableCard>
                )}
            </div>

            <h2 className="mb-3 text-base font-semibold text-epo-slate-900">Triés, en attente d'introduction</h2>
            {tries.length === 0 ? (
                <EmptyTable title="Aucun dossier trié en attente" message="Les dossiers triés passent ensuite à l'introduction au SG." />
            ) : (
                <TableCard
                    columns={[{ label: 'N°' }, { label: 'Objet · Expéditeur' }, { label: 'Tri' }, { label: 'À introduire' }, { label: '' }]}
                    footer="Ordre de passage chez le SG : du plus important au moins important"
                >
                    {tries.map((d) => (
                        <tr key={d.id} className={ROW}>
                            <td className={TD}>
                                <RefCell>{d.id}</RefCell>
                            </td>
                            <td className={TD}>
                                <TitleCell title={d.objet} sub={d.expediteur} />
                            </td>
                            <td className={TD}>
                                <QuadrantTag quadrant={d.quadrant} />
                            </td>
                            <td className={TD}>
                                <Echeance iso={d.echeance} />
                            </td>
                            <td className={`${TD} text-right`}>
                                <RowAction icon="fa-pen" onClick={() => setAClasserId(d.id)}>
                                    Changer le tri
                                </RowAction>
                            </td>
                        </tr>
                    ))}
                </TableCard>
            )}

            <TriModal key={aClasserId ?? 'aucun'} dossier={aClasser} onClose={() => setAClasserId(null)} onClasser={handleClasser} />
        </div>
    );
}
