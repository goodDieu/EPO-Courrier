// src/pages/dg/AValiderPage.jsx
import { useState } from 'react';
import { KpiCard, PageHeader, FilterBar, RowAction, notify } from '../../components/ui';
import ItemsTable from '../../components/dg/ItemsTable';
import DecisionModal from '../../components/dg/DecisionModal';
import { formatJourHeure, isSameDay } from '../../data/demoClock.js';
import { useCircuit } from '../../data/circuitContext.js';
import { pourDecision, statsDg } from '../../data/dgStats.js';

const SORTES = [
    { value: '', label: 'Tous les documents' },
    { value: 'courrier', label: 'Courriers reçus' },
    { value: 'validation', label: 'Documents à valider' },
];

export default function AValiderPage() {
    const circuit = useCircuit();
    const [recherche, setRecherche] = useState('');
    const [sorte, setSorte] = useState('');
    const [ouvertId, setOuvertId] = useState(null);

    const s = statsDg(circuit);
    const tous = pourDecision(circuit);
    const q = recherche.trim().toLowerCase();
    const liste = tous.filter((x) => (!sorte || x.sorte === sorte) && (!q || [x.id, x.objet, x.de].some((c) => c?.toLowerCase().includes(q))));
    const item = tous.find((x) => x.id === ouvertId);

    const handleAvis = (x, avis) => {
        circuit.deciderDg(x.source, avis);
        setOuvertId(null);
        notify.success(`Avis enregistré pour le courrier ${x.id}`, { items: [avis, 'Votre secrétariat le renverra au SG'] });
    };
    const handleValider = (x, decision) => {
        circuit.validerDocument(x.source, decision);
        setOuvertId(null);
        notify.success(decision.valide ? `${x.id} validé` : `${x.id} refusé`, { items: [decision.motif || `Auteur prévenu : ${x.de}`] });
    };

    return (
        <div className="w-full min-w-0">
            <PageHeader title="Pour décision" description="Courriers sur lesquels le SG demande votre avis, et documents à valider." />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard
                    label="Pour décision"
                    value={s.pourDecision}
                    variant={s.pourDecisionUrgents ? 'urgent' : 'default'}
                    hint={s.pourDecisionUrgents ? `dont ${s.pourDecisionUrgents} urgent${s.pourDecisionUrgents > 1 ? 's' : ''}` : 'Aucun urgent'}
                    icon="fa-scale-balanced"
                />
                <KpiCard label="Courriers reçus" value={tous.filter((x) => x.sorte === 'courrier').length} hint="Votre avis, puis retour au SG" icon="fa-envelope-open-text" onClick={() => setSorte('courrier')} />
                <KpiCard label="Documents à valider" value={tous.filter((x) => x.sorte === 'validation').length} hint="Notes, rapports, arbitrages" icon="fa-check-double" onClick={() => setSorte('validation')} />
                <KpiCard label="Décidés aujourd'hui" value={[...circuit.validations, ...circuit.dossiers].filter((d) => isSameDay(d.decideLe)).length} icon="fa-check" />
            </div>

            <FilterBar
                search={{ value: recherche, onChange: setRecherche, placeholder: 'Rechercher un numéro, un objet…' }}
                filters={[{ id: 'sorte', label: 'Type', value: sorte, onChange: setSorte, options: SORTES }]}
                onReset={() => {
                    setRecherche('');
                    setSorte('');
                }}
            />

            <ItemsTable
                items={liste}
                sousRef={(x) => (x.source.dateReceptionDG ? formatJourHeure(x.source.dateReceptionDG) : null)}
                vide={{ title: 'Aucune décision en attente', message: 'Les courriers et documents à décider apparaîtront ici.' }}
                action={(x) => (
                    <RowAction primary icon={x.sorte === 'courrier' ? 'fa-comment' : 'fa-check-double'} onClick={() => setOuvertId(x.id)}>
                        {x.sorte === 'courrier' ? 'Donner un avis' : 'Décider'}
                    </RowAction>
                )}
            />

            <DecisionModal key={ouvertId ?? 'aucun'} item={item} onClose={() => setOuvertId(null)} onAvis={handleAvis} onValider={handleValider} />
        </div>
    );
}
