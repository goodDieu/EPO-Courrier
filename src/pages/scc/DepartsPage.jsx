// src/pages/scc/DepartsPage.jsx
import { useMemo, useState } from 'react';
import { Button, KpiCard, PageHeader, FilterBar } from '../../components/ui';
import DepartsTable from '../../components/scc/DepartsTable.jsx';
import DepartDetailModal from '../../components/scc/DepartDetailModal.jsx';
import DepartTraitementModal from '../../components/scc/DepartTraitementModal.jsx';
import { FILTRES_ETAT, FILTRES_MODE, FILTRES_NATURE, FILTRES_PERIODE } from '../../data/departsSCC.js';
import { daysSince, isSameDay } from '../../data/demoClock.js';
import { statsDeparts } from '../../data/sccStats.js';
import { useScc } from '../../data/sccContext.js';

const PERIODES = { '7j': 7, '30j': 30, annee: 365 };
const dansPeriode = (iso, p) => (p === 'aujourdhui' ? isSameDay(iso) : daysSince(iso) < (PERIODES[p] ?? 9999));

export default function DepartsPage() {
    const { departs, avancerDepart } = useScc();
    const [filtreEtat, setFiltreEtat] = useState('');
    const [filtreMode, setFiltreMode] = useState('');
    const [filtreNature, setFiltreNature] = useState('');
    const [filtrePeriode, setFiltrePeriode] = useState('');
    const [recherche, setRecherche] = useState('');
    const [selectedDepart, setSelectedDepart] = useState(null);
    const [traitementDepart, setTraitementDepart] = useState(null);

    const stats = statsDeparts(departs);

    // Prochain numéro de la série sortante : le plus grand numéro attribué + 1
    const prochainNumero = useMemo(() => {
        const max = Math.max(...departs.map((d) => Number((d.numeroSortant || '0-0').split('-')[1]) || 0));
        return `2026-${String(max + 1).padStart(4, '0')}`;
    }, [departs]);

    const listeFiltree = useMemo(() => {
        let result = departs;
        if (filtreEtat) result = result.filter((d) => d.etat === filtreEtat);
        if (filtreMode) result = result.filter((d) => d.mode === filtreMode);
        if (filtreNature) result = result.filter((d) => d.nature === filtreNature);
        if (filtrePeriode) result = result.filter((d) => dansPeriode(d.dateReceptionSCC, filtrePeriode));
        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (d) =>
                    (d.numeroSortant || '').toLowerCase().includes(q) ||
                    d.objet.toLowerCase().includes(q) ||
                    d.beneficiaire.toLowerCase().includes(q) ||
                    d.documentSource.toLowerCase().includes(q)
            );
        }
        return [...result].sort((a, b) => new Date(b.dateReceptionSCC) - new Date(a.dateReceptionSCC));
    }, [departs, filtreEtat, filtreMode, filtreNature, filtrePeriode, recherche]);

    const resetFiltres = () => {
        setFiltreEtat('');
        setFiltreMode('');
        setFiltreNature('');
        setFiltrePeriode('');
        setRecherche('');
    };

    const handleTraiter = (depart) => {
        setSelectedDepart(null);
        setTraitementDepart(depart);
    };

    const handleValider = (depart, etape, valeurs) => avancerDepart(depart.id, etape, valeurs);

    return (
        <div className="w-full min-w-0">
            <PageHeader
                title="Registre des départs"
                description="Numérotation, cachet et expédition des courriers signés."
                actions={
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                }
            />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard label="À numéroter" value={stats.aNumeroter} icon="fa-hashtag" onClick={() => setFiltreEtat('a-numeroter')} />
                <KpiCard label="À cacheter" value={stats.aCacheter} icon="fa-stamp" onClick={() => setFiltreEtat('a-cacheter')} />
                <KpiCard label="Prêts à expédier" value={stats.pretsExpedition} icon="fa-paper-plane" onClick={() => setFiltreEtat('pret-expedition')} />
                <KpiCard label="Transmis" value={stats.transmis} hint="Remis à leur destinataire" icon="fa-check" onClick={() => setFiltreEtat('transmis')} />
            </div>

            <FilterBar
                search={{ value: recherche, onChange: setRecherche, placeholder: 'Rechercher un numéro, un objet, un bénéficiaire…' }}
                filters={[
                    { id: 'etat', label: 'État', value: filtreEtat, onChange: setFiltreEtat, options: FILTRES_ETAT },
                    { id: 'mode', label: 'Mode', value: filtreMode, onChange: setFiltreMode, options: FILTRES_MODE },
                    { id: 'nature', label: 'Nature', value: filtreNature, onChange: setFiltreNature, options: FILTRES_NATURE },
                    { id: 'periode', label: 'Période', value: filtrePeriode, onChange: setFiltrePeriode, options: FILTRES_PERIODE },
                ]}
                onReset={resetFiltres}
            />

            <DepartsTable departs={listeFiltree} onVoir={setSelectedDepart} onTraiter={handleTraiter} />

            <DepartDetailModal depart={selectedDepart} onClose={() => setSelectedDepart(null)} onTraiter={handleTraiter} />
            <DepartTraitementModal
                key={`${traitementDepart?.id ?? 'aucun'}-${traitementDepart?.etat ?? ''}`}
                depart={traitementDepart}
                onClose={() => setTraitementDepart(null)}
                onValider={handleValider}
                prochainNumero={prochainNumero}
            />
        </div>
    );
}
