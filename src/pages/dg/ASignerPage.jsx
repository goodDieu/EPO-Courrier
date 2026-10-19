// src/pages/dg/ASignerPage.jsx
import { useState } from 'react';
import { KpiCard, PageHeader, FilterBar, RowAction, notify } from '../../components/ui';
import ItemsTable from '../../components/dg/ItemsTable';
import SignatureModal from '../../components/dg/SignatureModal';
import { useCircuit } from '../../data/circuitContext.js';
import { aSigner, statsDg } from '../../data/dgStats.js';

const SORTES = [
    { value: '', label: 'Actes et courriers' },
    { value: 'acte', label: 'Actes' },
    { value: 'sortant', label: 'Courriers' },
];

export default function ASignerPage() {
    const circuit = useCircuit();
    const [recherche, setRecherche] = useState('');
    const [sorte, setSorte] = useState('');
    const [aSignerId, setASignerId] = useState(null);

    const s = statsDg(circuit);
    const tous = aSigner(circuit);
    const q = recherche.trim().toLowerCase();
    const liste = tous.filter((x) => (!sorte || x.sorte === sorte) && (!q || [x.id, x.objet, x.de].some((c) => c?.toLowerCase().includes(q))));
    const item = tous.find((x) => x.id === aSignerId);

    const handleSigner = (x) => {
        circuit.signer(x.sorte, x.source);
        setASignerId(null);
        notify.success(`${x.id} signé`, { items: ['Votre secrétariat va cocher la signature', 'Le document partira ensuite au Service Courrier'] });
    };
    const handleRejeter = (x, motif) => {
        circuit.rejeter(x.sorte, x.source, motif);
        setASignerId(null);
        notify.success(`${x.id} rejeté`, { items: [motif.motif, 'Le SG sera prévenu après la coche de votre secrétariat'] });
    };

    return (
        <div className="w-full min-w-0">
            <PageHeader title="À signer" description="Actes et courriers visés par le SG, présentés par votre secrétariat." />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard
                    label="À signer"
                    value={s.aSigner}
                    variant={s.aSignerEnRetard ? 'urgent' : 'default'}
                    hint={s.aSignerEnRetard ? `dont ${s.aSignerEnRetard} en retard` : 'Aucun retard'}
                    icon="fa-pen-nib"
                />
                <KpiCard label="Actes" value={tous.filter((x) => x.sorte === 'acte').length} hint="Congés, missions, certificats" icon="fa-file-signature" onClick={() => setSorte('acte')} />
                <KpiCard label="Courriers" value={tous.filter((x) => x.sorte === 'sortant').length} hint="Réponses et notes" icon="fa-paper-plane" onClick={() => setSorte('sortant')} />
                <KpiCard label="Signés aujourd'hui" value={s.signesAujourdhui} icon="fa-check" />
            </div>

            <FilterBar
                search={{ value: recherche, onChange: setRecherche, placeholder: 'Rechercher un numéro, un objet, un nom…' }}
                filters={[{ id: 'sorte', label: 'Type', value: sorte, onChange: setSorte, options: SORTES }]}
                onReset={() => {
                    setRecherche('');
                    setSorte('');
                }}
            />

            <ItemsTable
                items={liste}
                vide={{ title: 'Le parapheur est vide', message: 'Les documents visés par le SG apparaîtront ici.' }}
                alert={s.aSignerEnRetard ? `${s.aSignerEnRetard} document${s.aSignerEnRetard > 1 ? 's ont' : ' a'} dépassé leur délai de signature` : null}
                footer="Le plus pressé en premier"
                action={(x) => (
                    <RowAction primary icon="fa-pen-nib" onClick={() => setASignerId(x.id)}>
                        Signer
                    </RowAction>
                )}
            />

            <SignatureModal key={aSignerId ?? 'aucun'} item={item} onClose={() => setASignerId(null)} onSigner={handleSigner} onRejeter={handleRejeter} />
        </div>
    );
}
