// src/pages/dg/RejetesPage.jsx
import { useState } from 'react';
import { KpiCard, PageHeader, FilterBar, InlineTag } from '../../components/ui';
import ItemsTable from '../../components/dg/ItemsTable';
import { TYPES_MOTIF_REJET } from '../../data/circuit.js';
import { formatJourHeure } from '../../data/demoClock.js';
import { useCircuit } from '../../data/circuitContext.js';
import { rejetes } from '../../data/dgStats.js';

// Où en est un document après votre rejet
function suite(x) {
    const s = x.source;
    if (s.remplacePar) return <InlineTag icon="fa-rotate" tone="strong">Nouvelle version {s.remplacePar}</InlineTag>;
    if (s.aCocher) return <InlineTag icon="fa-clock" tone="warning">Pas encore coché par votre secrétariat</InlineTag>;
    if (x.sorte === 'validation') return <InlineTag icon="fa-check">Auteur prévenu</InlineTag>;
    return <InlineTag icon="fa-check">Le SG est prévenu</InlineTag>;
}

export default function RejetesPage() {
    const circuit = useCircuit();
    const [recherche, setRecherche] = useState('');
    const tous = rejetes(circuit);
    const q = recherche.trim().toLowerCase();
    const liste = tous
        .filter((x) => !q || [x.id, x.objet, x.de, x.source.motifRejet, x.source.motifRefus].some((c) => c?.toLowerCase().includes(q)))
        .map((x) => ({ ...x, de: `Motif : ${x.source.motifRejet || x.source.motifRefus || 'non précisé'}${x.source.typeMotif ? ` (${TYPES_MOTIF_REJET[x.source.typeMotif].toLowerCase()})` : ''}` }));

    return (
        <div className="w-full min-w-0">
            <PageHeader title="Rejetés" description="Documents que vous avez rejetés ou refusés, et ce qu'ils sont devenus." />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard label="Rejetés" value={tous.length} icon="fa-circle-xmark" />
                <KpiCard label="Pas encore cochés" value={tous.filter((x) => x.source.aCocher).length} hint="Le SG n'est pas prévenu" icon="fa-clock" />
                <KpiCard label="Repris par le SG" value={tous.filter((x) => x.source.remplacePar).length} hint="Nouvelle version en cours" icon="fa-rotate" />
                <KpiCard label="Documents refusés" value={tous.filter((x) => x.sorte === 'validation').length} hint="Notes et rapports" icon="fa-xmark" />
            </div>

            <FilterBar search={{ value: recherche, onChange: setRecherche, placeholder: 'Rechercher un numéro, un objet, un motif…' }} onReset={() => setRecherche('')} />

            <ItemsTable
                items={liste}
                sousRef={(x) => (x.source.decideLe ? formatJourHeure(x.source.decideLe) : null)}
                colonne={{ label: 'Suite', render: suite }}
                vide={{ title: 'Aucun document rejeté', icon: 'fa-check' }}
            />
        </div>
    );
}
