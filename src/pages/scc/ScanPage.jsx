// src/pages/scc/ScanPage.jsx
import { useMemo, useState } from 'react';
import { Button, KpiCard, PageHeader, FilterBar } from '../../components/ui';
import ScanTable from '../../components/scc/ScanTable.jsx';
import ScanModal from '../../components/scc/ScanModal.jsx';
import ScanDetailModal from '../../components/scc/ScanDetailModal.jsx';
import { FILTRES_ETAT, FILTRES_TYPE_PIECE, FILTRES_SOURCE } from '../../data/scanSCC.js';
import { useScc } from '../../data/sccContext.js';
import { statsScan } from '../../data/sccStats.js';

const ORDRE = { erreur: 0, 'en-cours': 1, 'a-scanner': 2, scanne: 3 };

export default function ScanPage() {
    const { documents, marquerScanne } = useScc();
    const [filtreEtat, setFiltreEtat] = useState('');
    const [filtreTypePiece, setFiltreTypePiece] = useState('');
    const [filtreSource, setFiltreSource] = useState('');
    const [recherche, setRecherche] = useState('');
    const [scanDocument, setScanDocument] = useState(null);
    const [detailDocument, setDetailDocument] = useState(null);

    const stats = statsScan(documents);

    const listeFiltree = useMemo(() => {
        let result = documents;
        if (filtreEtat) result = result.filter((d) => d.etat === filtreEtat);
        if (filtreTypePiece) result = result.filter((d) => d.typePiece === filtreTypePiece);
        if (filtreSource) result = result.filter((d) => d.source === filtreSource);
        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (d) => d.documentSource.toLowerCase().includes(q) || d.id.toLowerCase().includes(q) || d.objet.toLowerCase().includes(q)
            );
        }
        // Erreurs d'abord, puis en cours, à scanner, scannés
        return [...result].sort((a, b) => ORDRE[a.etat] - ORDRE[b.etat] || new Date(b.dateArrivee) - new Date(a.dateArrivee));
    }, [documents, filtreEtat, filtreTypePiece, filtreSource, recherche]);

    const resetFiltres = () => {
        setFiltreEtat('');
        setFiltreTypePiece('');
        setFiltreSource('');
        setRecherche('');
    };

    const handleScanned = (document, resultat) => marquerScanne(document.id, resultat);

    return (
        <div className="w-full min-w-0">
            <PageHeader
                title="À scanner"
                description="Numérisation des pièces reçues ou à expédier."
                actions={
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                }
            />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard label="À scanner" value={stats.aScanner} icon="fa-camera" onClick={() => setFiltreEtat('a-scanner')} />
                <KpiCard
                    label="En erreur"
                    value={stats.erreurs}
                    variant={stats.erreurs ? 'urgent' : 'default'}
                    hint="À relancer"
                    icon="fa-triangle-exclamation"
                    onClick={() => setFiltreEtat('erreur')}
                />
                <KpiCard label="En cours" value={stats.enCours} icon="fa-spinner" onClick={() => setFiltreEtat('en-cours')} />
                <KpiCard label="Scannés aujourd'hui" value={stats.scannesAujourdhui} icon="fa-check" onClick={() => setFiltreEtat('scanne')} />
            </div>

            <FilterBar
                search={{ value: recherche, onChange: setRecherche, placeholder: 'Rechercher un numéro ou un objet…' }}
                filters={[
                    { id: 'etat', label: 'État', value: filtreEtat, onChange: setFiltreEtat, options: FILTRES_ETAT },
                    { id: 'type', label: 'Type de pièce', value: filtreTypePiece, onChange: setFiltreTypePiece, options: FILTRES_TYPE_PIECE },
                    { id: 'source', label: 'Provenance', value: filtreSource, onChange: setFiltreSource, options: FILTRES_SOURCE },
                ]}
                onReset={resetFiltres}
            />

            <ScanTable documents={listeFiltree} onVoir={setDetailDocument} onScanner={setScanDocument} />

            <ScanDetailModal document={detailDocument} onClose={() => setDetailDocument(null)} onScanner={setScanDocument} />
            <ScanModal key={scanDocument?.id ?? 'aucun'} document={scanDocument} onClose={() => setScanDocument(null)} onScanned={handleScanned} />
        </div>
    );
}
