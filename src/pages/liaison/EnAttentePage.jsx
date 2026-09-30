// src/pages/liaison/EnAttentePage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui';
import EnAttenteKpi from '../../components/liaison/EnAttenteKpi';
import BlocageCarte from '../../components/liaison/BlocageCarte';
import ResolutionBlocageModal from '../../components/liaison/ResolutionBlocageModal';
import {
    DOCUMENTS_EN_ATTENTE,
    MOTIFS_BLOCAGE,
    FILTRES_MOTIF,
    FILTRES_PRIORITE,
    FILTRES_STRUCTURE,
    OPTIONS_TRI,
} from '../../data/enAttenteLiaison.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function EnAttentePage() {
    const [filtreMotif, setFiltreMotif] = useState('');
    const [filtrePriorite, setFiltrePriorite] = useState('');
    const [filtreStructure, setFiltreStructure] = useState('');
    const [recherche, setRecherche] = useState('');
    const [tri, setTri] = useState('anciennete');

    const [docAResoudre, setDocAResoudre] = useState(null);

    /* Filtrage + tri */
    const listeFiltree = useMemo(() => {
        let result = DOCUMENTS_EN_ATTENTE;

        if (filtreMotif) result = result.filter((d) => d.motifBlocage === filtreMotif);
        if (filtrePriorite) result = result.filter((d) => d.priorite === filtrePriorite);
        if (filtreStructure) result = result.filter((d) => d.destinataire.structure === filtreStructure);

        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (d) =>
                    d.documentNumero.toLowerCase().includes(q) ||
                    d.documentObjet.toLowerCase().includes(q) ||
                    d.destinataire.personne.toLowerCase().includes(q) ||
                    d.motifDetails.toLowerCase().includes(q)
            );
        }

        return [...result].sort((a, b) => {
            switch (tri) {
                case 'recent':
                    return new Date(b.dateSignalement) - new Date(a.dateSignalement);
                case 'priorite': {
                    const ordre = { urgent: 0, confidentiel: 1, normal: 2 };
                    return (ordre[a.priorite] ?? 9) - (ordre[b.priorite] ?? 9);
                }
                case 'structure':
                    return a.destinataire.structure.localeCompare(b.destinataire.structure);
                case 'anciennete':
                default:
                    return b.tempsBlocage - a.tempsBlocage;
            }
        });
    }, [filtreMotif, filtrePriorite, filtreStructure, recherche, tri]);

    /* Groupement par motif */
    const groupes = useMemo(() => {
        const g = {};
        listeFiltree.forEach((d) => {
            if (!g[d.motifBlocage]) g[d.motifBlocage] = [];
            g[d.motifBlocage].push(d);
        });
        return g;
    }, [listeFiltree]);

    const hasFiltreActif = filtreMotif || filtrePriorite || filtreStructure || recherche;

    const resetFiltres = () => {
        setFiltreMotif('');
        setFiltrePriorite('');
        setFiltreStructure('');
        setRecherche('');
    };

    const handleResoudre = (doc) => setDocAResoudre(doc);

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-epo-slate-900">
                        Remises en attente
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Documents bloqués - résolvez chaque situation
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-phone">
                        Contacter le chef SCC
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <EnAttenteKpi documents={DOCUMENTS_EN_ATTENTE} />

            {/* BANDEAU INFO */}
            <div className="flex items-start gap-3 p-4 mb-6 border rounded-xl bg-epo-slate-50 border-epo-slate-200">
                <i className="fas fa-info-circle text-epo-slate-500 mt-0.5" />
                <div className="text-[12.5px] text-epo-slate-700">
                    <strong>Comment signaler un blocage ?</strong> Depuis la page <em>À remettre</em> ou <em>Ma tournée</em>, ouvrez le détail d'un document puis cliquez sur <strong>"Signaler"</strong>. Vous pourrez y préciser le motif et le document apparaîtra ici.
                </div>
            </div>

            {/* FILTRES */}
            <div className="flex flex-wrap items-center gap-3 p-4 mb-4 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                <div className="relative flex-1 min-w-[200px]">
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-epo-slate-400 text-[12px]" />
                    <input
                        type="text"
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                        placeholder="Rechercher par N°, objet, destinataire…"
                        className="w-full pl-9 pr-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>

                <SelectFilter value={filtreMotif} onChange={setFiltreMotif} options={FILTRES_MOTIF} />
                <SelectFilter value={filtrePriorite} onChange={setFiltrePriorite} options={FILTRES_PRIORITE} />
                <SelectFilter value={filtreStructure} onChange={setFiltreStructure} options={FILTRES_STRUCTURE} />

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

            {/* BASCULE + TRI */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="text-[14px] font-semibold text-epo-slate-800 flex items-center gap-2">
                    <i className="fas fa-clock text-epo-yellow-600" />
                    {listeFiltree.length} blocage{listeFiltree.length > 1 ? 's' : ''}
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
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-green-50">
                        <i className="text-2xl fas fa-check-circle text-epo-green-500" />
                    </div>
                    <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                        Aucun blocage
                    </div>
                    <div className="text-[13px] text-epo-slate-500">
                        Tous vos documents ont été traités ou débloqués. 🎉
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-7">
                    {Object.entries(groupes).map(([motifKey, docs]) => {
                        const motif = MOTIFS_BLOCAGE[motifKey];
                        return (
                            <div key={motifKey}>
                                <div className="flex items-center gap-2.5 mb-3">
                                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${motif.chip}`}>
                                        <i className={`fas ${motif.icon} text-[13px]`} />
                                    </span>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-[15px] font-bold text-epo-slate-800">
                                                {motif.label}
                                            </h3>
                                            <span className={`text-[11.5px] font-semibold px-2 py-0.5 rounded-full ${motif.chip}`}>
                                                {docs.length}
                                            </span>
                                        </div>
                                        <div className="text-[11.5px] text-epo-slate-400">
                                            {motif.description}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                    {docs.map((doc) => (
                                        <BlocageCarte
                                            key={doc.id}
                                            doc={doc}
                                            onResoudre={handleResoudre}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* MODALE DE RÉSOLUTION */}
            <ResolutionBlocageModal
                doc={docAResoudre}
                onClose={() => setDocAResoudre(null)}
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