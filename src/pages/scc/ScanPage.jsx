// src/pages/scc/ScanPage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui/index.js';
import ScanKpi from '../../components/scc/ScanKpi.jsx';
import ScanTable from '../../components/scc/ScanTable.jsx';
import ScanModal from '../../components/scc/ScanModal.jsx';
import {
    DOCUMENTS_A_SCANNER,
    FILTRES_ETAT,
    FILTRES_TYPE_PIECE,
    FILTRES_SOURCE,
} from '../../data/scanSCC.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function ScanPage() {
    const [filtreEtat, setFiltreEtat] = useState('');
    const [filtreTypePiece, setFiltreTypePiece] = useState('');
    const [filtreSource, setFiltreSource] = useState('');
    const [recherche, setRecherche] = useState('');

    const [scanDocument, setScanDocument] = useState(null);
    const [detailDocument, setDetailDocument] = useState(null);

    const listeFiltree = useMemo(() => {
        let result = DOCUMENTS_A_SCANNER;

        if (filtreEtat) result = result.filter((d) => d.etat === filtreEtat);
        if (filtreTypePiece) result = result.filter((d) => d.typePiece === filtreTypePiece);
        if (filtreSource) result = result.filter((d) => d.source === filtreSource);

        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (d) =>
                    d.documentSource.toLowerCase().includes(q) ||
                    d.id.toLowerCase().includes(q) ||
                    d.objet.toLowerCase().includes(q)
            );
        }

        // Tri : erreurs d'abord, puis en cours, puis à scanner, puis scannés
        const ordre = { 'erreur': 0, 'en-cours': 1, 'a-scanner': 2, 'scanne': 3 };
        return [...result].sort((a, b) => {
            if (ordre[a.etat] !== ordre[b.etat]) return ordre[a.etat] - ordre[b.etat];
            return new Date(b.dateArrivee) - new Date(a.dateArrivee);
        });
    }, [filtreEtat, filtreTypePiece, filtreSource, recherche]);

    const hasFiltreActif = filtreEtat || filtreTypePiece || filtreSource || recherche;

    const resetFiltres = () => {
        setFiltreEtat('');
        setFiltreTypePiece('');
        setFiltreSource('');
        setRecherche('');
    };

    return (
        <div className="w-full min-w-0">
            {/* ============================================
                EN-TÊTE
                ============================================ */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Numérisation des documents
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        File d'attente de scan · Association aux métadonnées · Hash d'intégrité
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                    <Button variant="outline" icon="fa-cog">
                        Paramètres du scanner
                    </Button>
                </div>
            </div>

            {/* ============================================
                INFO TAURI
                ============================================ */}
            <div className="flex items-start gap-3 p-4 mb-6 border rounded-xl bg-epo-slate-50 border-epo-slate-200">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-lg bg-epo-slate-700">
                    <i className="fas fa-desktop" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-epo-slate-800">
                        Numérisation via le client desktop Tauri
                    </div>
                    <div className="text-[12px] text-epo-slate-600 mt-0.5">
                        Les opérations de scan réelles sont réalisées depuis le client Tauri installé sur les postes du SCC.
                        Cette interface web assure le suivi de la file d'attente et permet une simulation pour la démonstration (§17 du CDC).
                    </div>
                </div>
            </div>

            {/* ============================================
                KPI
                ============================================ */}
            <ScanKpi documents={DOCUMENTS_A_SCANNER} />

            {/* ============================================
                FILTRES
                ============================================ */}
            <div className="flex flex-wrap items-center gap-3 p-4 mb-4 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                <div className="relative flex-1 min-w-[200px]">
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-epo-slate-400 text-[12px]" />
                    <input
                        type="text"
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                        placeholder="Rechercher par numéro, objet…"
                        className="w-full pl-9 pr-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>

                <SelectFilter value={filtreEtat} onChange={setFiltreEtat} options={FILTRES_ETAT} />
                <SelectFilter value={filtreTypePiece} onChange={setFiltreTypePiece} options={FILTRES_TYPE_PIECE} />
                <SelectFilter value={filtreSource} onChange={setFiltreSource} options={FILTRES_SOURCE} />

                {hasFiltreActif && (
                    <button
                        onClick={resetFiltres}
                        className="ml-auto text-[12.5px] font-medium text-epo-red-600 hover:underline"
                    >
                        <i className="mr-1 fas fa-times" />
                        Réinitialiser
                    </button>
                )}
            </div>

            {/* ============================================
                TABLEAU
                ============================================ */}
            <ScanTable
                documents={listeFiltree}
                onVoir={setDetailDocument}
                onScanner={setScanDocument}
            />

            {/* ============================================
                MODALE DE SCAN
                ============================================ */}
            <ScanModal
                document={scanDocument}
                onClose={() => setScanDocument(null)}
            />
        </div>
    );
}

function SelectFilter({ value, onChange, options }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="px-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] text-epo-slate-800 bg-white focus:outline-none focus:border-epo-green-500"
        >
            {options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
            ))}
        </select>
    );
}