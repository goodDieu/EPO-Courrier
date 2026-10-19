// src/pages/sp-sg/IntroductionSgPage.jsx
import { useState } from 'react';
import { Button, KpiCard, PageHeader, FilterBar, TableCard, RowAction, RefCell, TitleCell, EmptyTable, Echeance, TD, ROW_CLICKABLE, notify } from '../../components/ui';
import QuadrantTag from '../../components/circuit/QuadrantTag';
import DossierCircuitModal from '../../components/circuit/DossierCircuitModal';
import IntroductionSgModal from '../../components/sp-sg/IntroductionSgModal';
import { FILTRES_TYPE, FILTRES_QUADRANT } from '../../data/circuit.js';
import { formatJourHeure } from '../../data/demoClock.js';
import { useScc } from '../../data/sccContext.js';
import { useCircuit } from '../../data/circuitContext.js';
import { aIntroduire, statsSpSg } from '../../data/spSgStats.js';

const contient = (q, ...champs) => champs.some((c) => c?.toLowerCase().includes(q));

export default function IntroductionSgPage() {
    const { arrivees } = useScc();
    const { dossiers, instructions, introduireAuSg } = useCircuit();
    const [recherche, setRecherche] = useState('');
    const [filtreType, setFiltreType] = useState('');
    const [filtreQuadrant, setFiltreQuadrant] = useState('');
    const [aIntroduireId, setAIntroduireId] = useState(null);
    const [ouvertId, setOuvertId] = useState(null);

    const stats = statsSpSg({ arrivees, dossiers, instructions });
    const q = recherche.trim().toLowerCase();
    const liste = aIntroduire(dossiers).filter(
        (d) => (!filtreType || d.type === filtreType) && (!filtreQuadrant || d.quadrant === filtreQuadrant) && (!q || contient(q, d.id, d.objet, d.expediteur))
    );
    const urgents = aIntroduire(dossiers).filter((d) => d.quadrant === 'important-urgent').length;

    const handleIntroduire = (dossier, commentaire) => {
        introduireAuSg(dossier, commentaire);
        setAIntroduireId(null);
        notify.success(`Dossier ${dossier.id} introduit au SG`, {
            items: ['Le SG est prévenu', 'Le dossier est maintenant « Chez le SG »'],
        });
    };

    return (
        <div className="w-full min-w-0">
            <PageHeader
                title="Introduction au SG"
                description="Dossiers triés à remettre au Secrétaire Général, dans l'ordre de priorité."
                actions={
                    <Button variant="outline" icon="fa-print" onClick={() => window.print()}>
                        Imprimer la liste
                    </Button>
                }
            />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard
                    label="À introduire"
                    value={stats.aIntroduire}
                    variant={stats.aIntroduireEnRetard ? 'urgent' : 'default'}
                    hint={stats.aIntroduireEnRetard ? `dont ${stats.aIntroduireEnRetard} en retard` : 'Aucun retard'}
                    icon="fa-user-tie"
                />
                <KpiCard label="Importants et urgents" value={urgents} hint="À introduire en premier" icon="fa-circle-exclamation" onClick={() => setFiltreQuadrant('important-urgent')} />
                <KpiCard label="Chez le SG" value={stats.chezSg} hint="En attente de son avis" icon="fa-hourglass-half" />
                <KpiCard label="Introduits aujourd'hui" value={stats.introduitsAujourdhui} icon="fa-check" />
            </div>

            <FilterBar
                search={{ value: recherche, onChange: setRecherche, placeholder: 'Rechercher un numéro, un objet, un expéditeur…' }}
                filters={[
                    { id: 'quadrant', label: 'Tri', value: filtreQuadrant, onChange: setFiltreQuadrant, options: FILTRES_QUADRANT },
                    { id: 'type', label: 'Type', value: filtreType, onChange: setFiltreType, options: FILTRES_TYPE },
                ]}
                onReset={() => {
                    setRecherche('');
                    setFiltreType('');
                    setFiltreQuadrant('');
                }}
            />

            {liste.length === 0 ? (
                <EmptyTable icon="fa-check" title="Aucun dossier à introduire" message="Les dossiers triés apparaîtront ici, du plus important au moins important." />
            ) : (
                <TableCard
                    columns={[{ label: 'N° · Reçu' }, { label: 'Objet · Expéditeur' }, { label: 'Tri' }, { label: 'Délai' }, { label: '' }]}
                    alert={
                        stats.aIntroduireEnRetard
                            ? `${stats.aIntroduireEnRetard} dossier${stats.aIntroduireEnRetard > 1 ? 's ont' : ' a'} dépassé le délai d'introduction`
                            : null
                    }
                    footer={`${liste.length} dossier${liste.length > 1 ? 's' : ''} · cliquez sur une ligne pour voir l'historique`}
                >
                    {liste.map((d) => (
                        <tr key={d.id} className={ROW_CLICKABLE} onClick={() => setOuvertId(d.id)}>
                            <td className={TD}>
                                <RefCell sub={formatJourHeure(d.recuLe)}>{d.id}</RefCell>
                            </td>
                            <td className={TD}>
                                <TitleCell title={d.objet} sub={d.pointAttention || d.expediteur} width="max-w-[340px]" />
                            </td>
                            <td className={TD}>
                                <QuadrantTag quadrant={d.quadrant} />
                            </td>
                            <td className={TD}>
                                <Echeance iso={d.echeance} />
                            </td>
                            <td className={`${TD} text-right`}>
                                <RowAction primary icon="fa-user-tie" onClick={() => setAIntroduireId(d.id)}>
                                    Introduire
                                </RowAction>
                            </td>
                        </tr>
                    ))}
                </TableCard>
            )}

            <IntroductionSgModal
                key={aIntroduireId ?? 'aucun'}
                dossier={dossiers.find((d) => d.id === aIntroduireId)}
                onClose={() => setAIntroduireId(null)}
                onIntroduire={handleIntroduire}
            />
            <DossierCircuitModal
                dossier={dossiers.find((d) => d.id === ouvertId)}
                instructions={instructions}
                onClose={() => setOuvertId(null)}
                actions={
                    <Button
                        icon="fa-user-tie"
                        onClick={() => {
                            setAIntroduireId(ouvertId);
                            setOuvertId(null);
                        }}
                    >
                        Introduire au SG
                    </Button>
                }
            />
        </div>
    );
}
