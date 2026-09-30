// src/pages/liaison/DechargesPage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui';
import DechargesKpi from '../../components/liaison/DechargesKpi';
import DechargeLigne from '../../components/liaison/DechargeLigne';
import DechargeModal from '../../components/liaison/DechargeModal';
import {
    DECHARGES,
    FILTRES_PERIODE,
    FILTRES_STRUCTURE,
    FILTRES_TYPE,
    OPTIONS_TRI,
    formatDateJour,
} from '../../data/dechargesLiaison.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function DechargesPage() {
    const [filtrePeriode, setFiltrePeriode] = useState('');
    const [filtreStructure, setFiltreStructure] = useState('');
    const [filtreType, setFiltreType] = useState('');
    const [recherche, setRecherche] = useState('');
    const [tri, setTri] = useState('recent');

    const [dechargeSelectionnee, setDechargeSelectionnee] = useState(null);

    /* Filtrage + tri */
    const listeFiltree = useMemo(() => {
        let result = DECHARGES;

        if (filtreStructure) result = result.filter((d) => d.signataire.structure === filtreStructure);
        if (filtreType) result = result.filter((d) => d.typePreuve === filtreType);

        if (filtrePeriode) {
            const now = new Date();
            const diffJours = { aujourdhui: 0, semaine: 7, mois: 30 }[filtrePeriode] ?? 9999;
            result = result.filter((d) => {
                const diff = (now - new Date(d.dateSignature)) / (1000 * 60 * 60 * 24);
                return diff <= diffJours + 1;
            });
        }

        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (d) =>
                    d.id.toLowerCase().includes(q) ||
                    d.documentNumero.toLowerCase().includes(q) ||
                    d.documentObjet.toLowerCase().includes(q) ||
                    d.signataire.nom.toLowerCase().includes(q) ||
                    d.signataire.structure.toLowerCase().includes(q)
            );
        }

        return [...result].sort((a, b) => {
            switch (tri) {
                case 'ancien':
                    return new Date(a.dateSignature) - new Date(b.dateSignature);
                case 'reference':
                    return a.id.localeCompare(b.id);
                case 'destinataire':
                    return a.signataire.nom.localeCompare(b.signataire.nom);
                case 'recent':
                default:
                    return new Date(b.dateSignature) - new Date(a.dateSignature);
            }
        });
    }, [filtrePeriode, filtreStructure, filtreType, recherche, tri]);

    /* Groupement par jour */
    const groupes = useMemo(() => {
        const g = {};
        listeFiltree.forEach((d) => {
            const jour = formatDateJour(d.dateSignature);
            if (!g[jour]) g[jour] = [];
            g[jour].push(d);
        });
        return g;
    }, [listeFiltree]);

    const hasFiltreActif = filtrePeriode || filtreStructure || filtreType || recherche;

    const resetFiltres = () => {
        setFiltrePeriode('');
        setFiltreStructure('');
        setFiltreType('');
        setRecherche('');
    };

    const handleOuvrir = (decharge) => setDechargeSelectionnee(decharge);

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-epo-slate-900">
                        Registre des décharges
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Preuves signées de vos remises - recherche et archivage
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <DechargesKpi decharges={DECHARGES} />

            {/* BANDEAU INFO */}
            <div className="flex items-start gap-3 p-4 mb-6 border rounded-xl bg-epo-green-50 border-epo-green-200">
                <i className="fas fa-shield-halved text-epo-green-600 mt-0.5" />
                <div className="text-[12.5px] text-epo-green-900">
                    <strong>Registre probant.</strong> Chaque décharge contient la <strong>signature manuscrite</strong> ou <strong>photo</strong> du destinataire, ainsi qu'un <strong>hash d'intégrité</strong> permettant de vérifier qu'elle n'a pas été altérée (§12.4). En cas de contestation, utilisez la recherche pour retrouver la décharge exacte.
                </div>
            </div>

            {/* BARRE DE RECHERCHE */}
            <div className="p-4 mb-4 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                <div className="relative">
                    <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-epo-slate-400 text-[14px]" />
                    <input
                        type="text"
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                        placeholder="Rechercher par référence (PRV-…), N° de courrier, destinataire, structure…"
                        className="w-full pl-11 pr-3 py-3 border rounded-lg border-epo-slate-300 text-[14px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-epo-slate-500">
                    <span className="font-semibold">Exemples :</span>
                    <button
                        type="button"
                        onClick={() => setRecherche('PRV-2026-0892')}
                        className="px-2 py-0.5 rounded-full bg-epo-slate-100 hover:bg-epo-slate-200 font-mono text-[10.5px] transition"
                    >
                        PRV-2026-0892
                    </button>
                    <button
                        type="button"
                        onClick={() => setRecherche('2026-0448')}
                        className="px-2 py-0.5 rounded-full bg-epo-slate-100 hover:bg-slate-200 font-mono text-[10.5px] transition"
                    >
                        2026-0448
                    </button>
                    <button
                        type="button"
                        onClick={() => setRecherche('COMPAORÉ')}
                        className="px-2 py-0.5 rounded-full bg-epo-slate-100 hover:bg-epo-slate-200 text-[10.5px] transition"
                    >
                        COMPAORÉ
                    </button>
                </div>
            </div>

            {/* FILTRES */}
            <div className="flex flex-wrap items-center gap-3 p-4 mb-4 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                <SelectFilter value={filtrePeriode} onChange={setFiltrePeriode} options={FILTRES_PERIODE} />
                <SelectFilter value={filtreStructure} onChange={setFiltreStructure} options={FILTRES_STRUCTURE} />
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

            {/* TRI */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="text-[14px] font-semibold text-epo-slate-800 flex items-center gap-2">
                    <i className="fas fa-file-signature text-epo-green-600" />
                    {listeFiltree.length} décharge{listeFiltree.length > 1 ? 's' : ''}
                </div>

                <div className="flex items-center gap-2 text-[12.5px] text-epo-slate-500">
                    Trier par :
                    <select
                        value={tri}
                        onChange={(e) => setTri(e.target.value)}
                        className="px-2.5 py-1.5 border rounded-lg border-epo-slate-300 text-[12.5px] text-epo-slate-700 bg-white focus:outline-none focus:border-epo-green-500"
                    >
                        {OPTIONS_TRI.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* CONTENU */}
            {listeFiltree.length === 0 ? (
                <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-slate-100">
                        <i className="text-2xl fas fa-file-signature text-epo-slate-400" />
                    </div>
                    <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                        Aucune décharge trouvée
                    </div>
                    <div className="text-[13px] text-epo-slate-500">
                        Essayez d'élargir vos filtres ou de modifier votre recherche.
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-7">
                    {Object.entries(groupes).map(([jour, decharges]) => (
                        <div key={jour}>
                            <div className="flex items-center gap-2.5 mb-3">
                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-epo-slate-100 text-epo-slate-600">
                                    <i className="fas fa-calendar-day text-[13px]" />
                                </span>
                                <div>
                                    <h3 className="text-[15px] font-bold text-epo-slate-800 capitalize">
                                        {jour}
                                    </h3>
                                    <div className="text-[11.5px] text-epo-slate-400">
                                        {decharges.length} décharge{decharges.length > 1 ? 's' : ''}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {decharges.map((d) => (
                                    <DechargeLigne
                                        key={d.id}
                                        decharge={d}
                                        onOuvrir={handleOuvrir}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* MODALE */}
            <DechargeModal
                decharge={dechargeSelectionnee}
                onClose={() => setDechargeSelectionnee(null)}
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