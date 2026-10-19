// src/pages/dg/ActesSignesPage.jsx
import { useState } from 'react';
import { KpiCard, PageHeader, FilterBar, InlineTag } from '../../components/ui';
import ItemsTable from '../../components/dg/ItemsTable';
import { formatJourHeure, isSameDay } from '../../data/demoClock.js';
import { useCircuit } from '../../data/circuitContext.js';
import { signes } from '../../data/dgStats.js';

const SORTES = [
    { value: '', label: 'Actes et courriers' },
    { value: 'acte', label: 'Actes' },
    { value: 'sortant', label: 'Courriers' },
];

function suite(x) {
    const s = x.source;
    if (s.aCocher) return <InlineTag icon="fa-clock" tone="warning">À cocher par votre secrétariat</InlineTag>;
    if (s.etat === 'diffuse') return <InlineTag icon="fa-check">Remis au bénéficiaire</InlineTag>;
    if (s.etat === 'archive') return <InlineTag icon="fa-box-archive">Archivé</InlineTag>;
    return <InlineTag icon="fa-paper-plane">Au Service Courrier, pour envoi</InlineTag>;
}

export default function ActesSignesPage() {
    const circuit = useCircuit();
    const [recherche, setRecherche] = useState('');
    const [sorte, setSorte] = useState('');
    const tous = signes(circuit);
    const date = (x) => x.source.dateSignature || x.source.signeLe;
    const q = recherche.trim().toLowerCase();
    const liste = tous.filter((x) => (!sorte || x.sorte === sorte) && (!q || [x.id, x.objet].some((c) => c?.toLowerCase().includes(q))));

    return (
        <div className="w-full min-w-0">
            <PageHeader title="Documents signés" description="Actes et courriers signés, par vous ou par le SG sur délégation." />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard label="Signés" value={tous.length} icon="fa-pen-nib" />
                <KpiCard label="Aujourd'hui" value={tous.filter((x) => isSameDay(date(x))).length} icon="fa-calendar-day" />
                <KpiCard label="Par délégation du SG" value={tous.filter((x) => x.source.signature === 'sg-delegation' || x.source.signePar?.includes('délégation')).length} icon="fa-stamp" />
                <KpiCard label="À cocher" value={tous.filter((x) => x.source.aCocher).length} hint="Par votre secrétariat" icon="fa-square-check" />
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
                sousRef={(x) => `Signé ${formatJourHeure(date(x)).replace("Aujourd'hui", "aujourd'hui")}`}
                colonne={{ label: 'Suite', render: suite }}
                vide={{ title: 'Aucun document signé ne correspond', icon: 'fa-pen-nib' }}
            />
        </div>
    );
}
