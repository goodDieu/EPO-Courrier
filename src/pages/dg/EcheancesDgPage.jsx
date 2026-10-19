// src/pages/dg/EcheancesDgPage.jsx
import { useNavigate } from 'react-router-dom';
import { KpiCard, PageHeader, RowAction } from '../../components/ui';
import ItemsTable from '../../components/dg/ItemsTable';
import { DEMO_NOW, isSameDay } from '../../data/demoClock.js';
import { useCircuit } from '../../data/circuitContext.js';
import { enRetard } from '../../data/spSgStats.js';
import { aSigner, pourDecision } from '../../data/dgStats.js';

const DEMAIN = new Date(DEMO_NOW.getTime() + 24 * 3600000);

export default function EcheancesDgPage() {
    const navigate = useNavigate();
    const circuit = useCircuit();
    const tous = [...aSigner(circuit), ...pourDecision(circuit)].filter((x) => x.echeance).sort((a, b) => new Date(a.echeance) - new Date(b.echeance));

    const groupes = [
        { titre: 'Délai dépassé', items: tous.filter((x) => enRetard(x.echeance)) },
        { titre: "Aujourd'hui", items: tous.filter((x) => !enRetard(x.echeance) && isSameDay(x.echeance)) },
        { titre: 'Demain', items: tous.filter((x) => isSameDay(x.echeance, DEMAIN)) },
        { titre: 'Plus tard', items: tous.filter((x) => new Date(x.echeance) > DEMAIN && !isSameDay(x.echeance, DEMAIN)) },
    ];

    const ouvrir = (x) => navigate(x.sorte === 'acte' || x.sorte === 'sortant' ? '/dg/a-signer' : '/dg/a-valider');

    return (
        <div className="w-full min-w-0">
            <PageHeader title="Échéances" description="Vos documents en attente, rangés par date limite." />

            <div className="grid grid-cols-2 gap-4 mb-8 xl:grid-cols-4">
                {groupes.map((g, i) => (
                    <KpiCard key={g.titre} label={g.titre} value={g.items.length} variant={i === 0 && g.items.length ? 'urgent' : 'default'} icon={['fa-circle-exclamation', 'fa-calendar-day', 'fa-calendar', 'fa-calendar-week'][i]} />
                ))}
            </div>

            {groupes
                .filter((g) => g.items.length > 0)
                .map((g) => (
                    <section key={g.titre} className="mb-8">
                        <h2 className="mb-3 text-base font-semibold text-epo-slate-900">
                            {g.titre} ({g.items.length})
                        </h2>
                        <ItemsTable
                            items={g.items}
                            vide={{ title: '' }}
                            action={(x) => (
                                <RowAction primary={g.titre === 'Délai dépassé'} onClick={() => ouvrir(x)}>
                                    {x.sorte === 'acte' || x.sorte === 'sortant' ? 'Signer' : 'Décider'}
                                </RowAction>
                            )}
                        />
                    </section>
                ))}
        </div>
    );
}
