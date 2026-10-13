// src/pages/sp-dg/PostVisaPage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui';
import PostVisaKpi from '../../components/sp-dg/PostVisaKpi';
import PostVisaCarte from '../../components/sp-dg/PostVisaCarte';
import CochePostVisaModal from '../../components/sp-dg/CochePostVisaModal';
import {
    DOSSIERS_POST_VISA,
    FILTRES_ETAT,
    FILTRES_PRIORITE,
    FILTRES_TYPE
} from '../../data/postVisaSPDG.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function PostVisaPage() {
    const [filtreEtat, setFiltreEtat] = useState('a-cocher'); // par défaut : ce qui est à traiter
    const [filtrePriorite, setFiltrePriorite] = useState('');
    const [filtreType, setFiltreType] = useState('');
    const [recherche, setRecherche] = useState('');

    const [dossierACocher, setDossierACocher] = useState(null);

    /* Filtrage */
    const listeFiltree = useMemo(() => {
        let result = DOSSIERS_POST_VISA;

        if (filtreEtat) result = result.filter((d) => d.etat === filtreEtat);
        if (filtrePriorite) result = result.filter((d) => d.priorite === filtrePriorite);
        if (filtreType) result = result.filter((d) => d.type === filtreType);

        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (d) =>
                    d.id.toLowerCase().includes(q) ||
                    d.objet.toLowerCase().includes(q) ||
                    d.produitPar.toLowerCase().includes(q)
            );
        }

        // Tri : dépassés → urgents → confidentiels → normaux
        return [...result].sort((a, b) => {
            const aLate = a.etat === 'a-cocher' && a.tempsRestantMin < 0;
            const bLate = b.etat === 'a-cocher' && b.tempsRestantMin < 0;
            if (aLate !== bLate) return aLate ? -1 : 1;

            const ordrePrio = { urgent: 0, confidentiel: 1, normal: 2 };
            const oa = ordrePrio[a.priorite] ?? 9;
            const ob = ordrePrio[b.priorite] ?? 9;
            if (oa !== ob) return oa - ob;

            return a.tempsRestantMin - b.tempsRestantMin;
        });
    }, [filtreEtat, filtrePriorite, filtreType, recherche]);

    const hasFiltreActif = filtrePriorite || filtreType || recherche || filtreEtat !== 'a-cocher';

    const resetFiltres = () => {
        setFiltreEtat('a-cocher');
        setFiltrePriorite('');
        setFiltreType('');
        setRecherche('');
    };

    /* Actions */
    const handleCocher = (dossier) => setDossierACocher(dossier);
    const handleVoir = (dossier) => alert(`Détail du dossier ${dossier.id}`);

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-epo-slate-900">
                        Coche post-visa
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Enregistrement des décisions du DG- Mécanisme anti-black-out (§9.2)
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                </div>
            </div>

            {/* BANDEAU D'ALERTE */}
            <div className="flex items-start gap-3 p-4 mb-6 text-white border rounded-xl bg-epo-slate-800 border-epo-slate-700">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-epo-slate-700">
                    <i className="fas fa-shield-halved text-[16px]" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-semibold">
                        Responsabilité critique- Anti-black-out
                    </div>
                    <div className="text-[12px] text-epo-slate-300 mt-0.5">
                        Chaque coche notifie automatiquement le SG du résultat (signé / rejeté). Sans cette action, le SG reste aveugle sur le dossier après son vu bon à signer (§9.2, RG-18).
                    </div>
                </div>
            </div>

            {/* KPI */}
            <PostVisaKpi dossiers={DOSSIERS_POST_VISA} />

            {/* FILTRES */}
            <div className="flex flex-wrap items-center gap-3 p-4 mb-4 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                <div className="relative flex-1 min-w-[200px]">
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-epo-slate-400 text-[12px]" />
                    <input
                        type="text"
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                        placeholder="Rechercher par N°, objet, producteur…"
                        className="w-full pl-9 pr-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>

                <SelectFilter value={filtreEtat} onChange={setFiltreEtat} options={FILTRES_ETAT} />
                <SelectFilter value={filtrePriorite} onChange={setFiltrePriorite} options={FILTRES_PRIORITE} />
                <SelectFilter value={filtreType} onChange={setFiltreType} options={FILTRES_TYPE} />

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

            {/* LISTE */}
            {listeFiltree.length === 0 ? (
                <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-green-50">
                        <i className="text-2xl fas fa-check-circle text-epo-green-500" />
                    </div>
                    <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                        Aucun dossier {filtreEtat === 'a-cocher' ? 'à cocher' : ''}
                    </div>
                    <div className="text-[13px] text-epo-slate-500">
                        {filtreEtat === 'a-cocher'
                            ? 'Toutes les décisions du DG ont été enregistrées. 🎉'
                            : 'Essayez d\'élargir vos filtres.'}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                    {listeFiltree.map((d) => (
                        <PostVisaCarte
                            key={d.id}
                            dossier={d}
                            onCocher={handleCocher}
                            onVoir={handleVoir}
                        />
                    ))}
                </div>
            )}

            {/* MODALE DE COCHE */}
            <CochePostVisaModal
                dossier={dossierACocher}
                onClose={() => setDossierACocher(null)}
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