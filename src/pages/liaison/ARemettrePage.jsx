// src/pages/liaison/ARemettrePage.jsx
import { useMemo, useState } from 'react';
import { Button } from '../../components/ui';
import ARemettreKpi from '../../components/liaison/ARemettreKpi';
import DocumentRemettreCarte from '../../components/liaison/DocumentRemettreCarte';
import RemiseLiaisonModal from '../../components/liaison/RemiseLiaisonModal';
import {
    DOCUMENTS_A_REMETTRE,
    TYPES_DOCUMENTS,
    FILTRES_TYPE,
    FILTRES_PRIORITE,
    FILTRES_TOURNEE,
    FILTRES_STRUCTURE,
    OPTIONS_TRI,
    formatDuree,
    getAnciennete,
} from '../../data/aRemettreLiaison.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function ARemettrePage() {
    const [filtreType, setFiltreType] = useState('');
    const [filtrePriorite, setFiltrePriorite] = useState('');
    const [filtreTournee, setFiltreTournee] = useState('');
    const [filtreStructure, setFiltreStructure] = useState('');
    const [recherche, setRecherche] = useState('');
    const [tri, setTri] = useState('urgence');
    const [vue, setVue] = useState('cartes'); // 'cartes' | 'tableau'

    const [remiseEnCours, setRemiseEnCours] = useState(null);

    /* Filtrage + tri */
    const listeFiltree = useMemo(() => {
        let result = DOCUMENTS_A_REMETTRE;

        if (filtreType) result = result.filter((d) => d.documentType === filtreType);
        if (filtrePriorite) result = result.filter((d) => d.priorite === filtrePriorite);
        if (filtreStructure) result = result.filter((d) => d.destinataire.structure === filtreStructure);

        if (filtreTournee === 'tournee') result = result.filter((d) => d.dansTournee);
        if (filtreTournee === 'hors-tournee') result = result.filter((d) => !d.dansTournee);

        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (d) =>
                    d.documentNumero.toLowerCase().includes(q) ||
                    d.documentObjet.toLowerCase().includes(q) ||
                    d.destinataire.personne.toLowerCase().includes(q) ||
                    d.destinataire.structure.toLowerCase().includes(q)
            );
        }

        return [...result].sort((a, b) => {
            switch (tri) {
                case 'anciennete':
                    return b.tempsAttente - a.tempsAttente;
                case 'recent':
                    return a.tempsAttente - b.tempsAttente;
                case 'structure':
                    return a.destinataire.structure.localeCompare(b.destinataire.structure);
                case 'urgence':
                default: {
                    const ordre = { urgent: 0, confidentiel: 1, normal: 2 };
                    const oa = ordre[a.priorite] ?? 9;
                    const ob = ordre[b.priorite] ?? 9;
                    if (oa !== ob) return oa - ob;
                    // À priorité égale : plus ancien d'abord
                    return b.tempsAttente - a.tempsAttente;
                }
            }
        });
    }, [filtreType, filtrePriorite, filtreTournee, filtreStructure, recherche, tri]);

    /* Groupement par priorité */
    const groupes = useMemo(() => {
        const g = { urgent: [], confidentiel: [], normal: [] };
        listeFiltree.forEach((d) => {
            g[d.priorite].push(d);
        });
        return g;
    }, [listeFiltree]);

    const hasFiltreActif =
        filtreType || filtrePriorite || filtreTournee || filtreStructure || recherche;

    const resetFiltres = () => {
        setFiltreType('');
        setFiltrePriorite('');
        setFiltreTournee('');
        setFiltreStructure('');
        setRecherche('');
    };

    /* Actions */
    const handleRemettre = (doc) => setRemiseEnCours(doc);
    const handleVoir = (doc) => alert(`Détail de ${doc.documentNumero}`);

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-epo-slate-900">
                        Documents à remettre
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Tous vos documents en attente de remise - dans et hors tournée
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-route">
                        Voir ma tournée
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <ARemettreKpi documents={DOCUMENTS_A_REMETTRE} />

            {/* BANDEAU INFO */}
            <div className="flex items-start gap-3 p-4 mb-6 border rounded-xl bg-epo-green-50 border-epo-green-200">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-lg bg-epo-green-500">
                    <i className="fas fa-info-circle" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-epo-green-900">
                        Conseil terrain
                    </div>
                    <div className="text-[12px] text-epo-green-800 mt-0.5">
                        Les documents <strong>hors tournée</strong> peuvent être remis lors de votre prochain passage à proximité du destinataire.
                    </div>
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
                        placeholder="Rechercher un document…"
                        className="w-full pl-9 pr-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </div>

                <SelectFilter value={filtreType} onChange={setFiltreType} options={FILTRES_TYPE} />
                <SelectFilter value={filtrePriorite} onChange={setFiltrePriorite} options={FILTRES_PRIORITE} />
                <SelectFilter value={filtreTournee} onChange={setFiltreTournee} options={FILTRES_TOURNEE} />
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
                    <i className="fas fa-inbox text-epo-green-600" />
                    {listeFiltree.length} document{listeFiltree.length > 1 ? 's' : ''}
                </div>

                <div className="flex items-center gap-3">
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

                    <div className="inline-flex p-1 rounded-lg bg-epo-slate-100">
                        <button
                            onClick={() => setVue('cartes')}
                            className={`
                                px-3 py-1.5 rounded-md text-[12.5px] font-semibold transition inline-flex items-center gap-1.5
                                ${vue === 'cartes'
                                    ? 'bg-white text-epo-slate-900 shadow-soft'
                                    : 'text-epo-slate-500 hover:text-epo-slate-700'}
                            `}
                        >
                            <i className="fas fa-th-large" />
                            Cartes
                        </button>
                        <button
                            onClick={() => setVue('tableau')}
                            className={`
                                px-3 py-1.5 rounded-md text-[12.5px] font-semibold transition inline-flex items-center gap-1.5
                                ${vue === 'tableau'
                                    ? 'bg-white text-epo-slate-900 shadow-soft'
                                    : 'text-epo-slate-500 hover:text-epo-slate-700'}
                            `}
                        >
                            <i className="fas fa-table" />
                            Tableau
                        </button>
                    </div>
                </div>
            </div>

            {/* CONTENU */}
            {listeFiltree.length === 0 ? (
                <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-green-50">
                        <i className="text-2xl fas fa-check-circle text-epo-green-500" />
                    </div>
                    <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                        Aucun document à remettre
                    </div>
                    <div className="text-[13px] text-epo-slate-500">
                        Tout est à jour. 🎉
                    </div>
                </div>
            ) : vue === 'cartes' ? (
                <div className="flex flex-col gap-7">
                    {/* Bloc : Urgents */}
                    {groupes.urgent.length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-exclamation-circle"
                                title="Urgents"
                                count={groupes.urgent.length}
                                variant="urgent"
                                subtitle="À remettre en priorité absolue"
                            />
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {groupes.urgent.map((d) => (
                                    <DocumentRemettreCarte
                                        key={d.id}
                                        doc={d}
                                        onRemettre={handleRemettre}
                                        onVoir={handleVoir}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bloc : Confidentiels */}
                    {groupes.confidentiel.length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-lock"
                                title="Confidentiels"
                                count={groupes.confidentiel.length}
                                variant="dark"
                                subtitle="Remise strictement personnelle"
                            />
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {groupes.confidentiel.map((d) => (
                                    <DocumentRemettreCarte
                                        key={d.id}
                                        doc={d}
                                        onRemettre={handleRemettre}
                                        onVoir={handleVoir}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bloc : Normaux */}
                    {groupes.normal.length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-inbox"
                                title="Normaux"
                                count={groupes.normal.length}
                                variant="default"
                                subtitle="Traitement standard"
                            />
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                {groupes.normal.map((d) => (
                                    <DocumentRemettreCarte
                                        key={d.id}
                                        doc={d}
                                        onRemettre={handleRemettre}
                                        onVoir={handleVoir}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <ARemettreTable
                    documents={listeFiltree}
                    onRemettre={handleRemettre}
                    onVoir={handleVoir}
                />
            )}

            {/* MODALE */}
            <RemiseLiaisonModal
                remise={remiseEnCours}
                onClose={() => setRemiseEnCours(null)}
            />
        </div>
    );
}

/* ============================================================
   SOUS-COMPOSANTS
   ============================================================ */

function ARemettreTable({ documents, onRemettre, onVoir }) {
    return (
        <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-epo-slate-50">
                            {['N°', 'Type', 'Objet', 'Destinataire', 'Priorité', 'Âge', 'Tournée', ''].map((h, i) => (
                                <th
                                    key={i}
                                    className="px-3 py-2.5 text-[11px] font-semibold tracking-wider text-left uppercase text-epo-slate-500 whitespace-nowrap"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((d) => {
                            const type = TYPES_DOCUMENTS[d.documentType];
                            const anciennete = getAnciennete(d.tempsAttente);

                            return (
                                <tr
                                    key={d.id}
                                    className="transition border-t cursor-pointer border-epo-slate-100 hover:bg-epo-slate-50"
                                    onClick={() => onVoir(d)}
                                >
                                    <td className="px-3 py-2.5">
                                        <span className="font-mono text-[12px] font-semibold text-epo-slate-800">
                                            {d.documentNumero}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${type.color}`}>
                                            <i className={`fas ${type.icon} text-[9.5px]`} />
                                            {type.label}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <div className="min-w-0">
                                            <div className="text-[12.5px] font-medium text-epo-slate-800 truncate max-w-[260px]">
                                                {d.documentObjet}
                                            </div>
                                            <div className="flex items-center gap-1 mt-0.5 text-[11px] text-epo-slate-500">
                                                <i className="fas fa-user text-[9.5px] text-epo-slate-400" />
                                                {d.destinataire.personne}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5 text-[12px] text-epo-slate-600">
                                        {d.destinataire.structure}
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <span className={`
                                            inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold
                                            ${d.priorite === 'urgent' ? 'bg-epo-red-50 text-epo-red-700' :
                                              d.priorite === 'confidentiel' ? 'bg-epo-slate-800 text-white' :
                                              'bg-epo-slate-100 text-epo-slate-600'}
                                        `}>
                                            {d.priorite === 'urgent' && <i className="fas fa-exclamation-circle text-[9px]" />}
                                            {d.priorite === 'confidentiel' && <i className="fas fa-lock text-[9px]" />}
                                            {d.priorite === 'urgent' ? 'Urgent' : d.priorite === 'confidentiel' ? 'Confid.' : 'Normal'}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${anciennete.chip}`}>
                                            <i className="fas fa-hourglass-half text-[9px]" />
                                            {formatDuree(d.tempsAttente)}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        {d.dansTournee ? (
                                            <span className="inline-flex items-center gap-1 text-[11px] text-epo-green-600 font-medium">
                                                <i className="fas fa-route text-[10px]" />
                                                Oui
                                            </span>
                                        ) : (
                                            <span className="text-[11px] text-epo-slate-400 italic">
                                                Hors tournée
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onRemettre(d);
                                            }}
                                            className="text-[12px] font-semibold text-epo-green-600 hover:underline whitespace-nowrap"
                                        >
                                            <i className="mr-1 fas fa-check" />
                                            Remettre
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-[12.5px] border-t border-epo-slate-200 text-epo-slate-500">
                <span>{documents.length} document{documents.length > 1 ? 's' : ''}</span>
                <span className="text-epo-slate-400">
                    <i className="mr-1 fas fa-info-circle" />
                    Cliquez sur une ligne pour ouvrir le détail
                </span>
            </div>
        </div>
    );
}

function BlocHeader({ icon, title, count, variant = 'default', subtitle }) {
    const variants = {
        urgent: {
            icon: 'text-epo-red-600',
            bg: 'bg-epo-red-50',
            text: 'text-epo-red-700',
            chip: 'bg-epo-red-100 text-epo-red-800',
        },
        dark: {
            icon: 'text-white',
            bg: 'bg-epo-slate-800',
            text: 'text-epo-slate-800',
            chip: 'bg-epo-slate-800 text-white',
        },
        default: {
            icon: 'text-epo-slate-500',
            bg: 'bg-epo-slate-100',
            text: 'text-epo-slate-700',
            chip: 'bg-epo-slate-100 text-epo-slate-700',
        },
    };

    const v = variants[variant];

    return (
        <div className="flex items-center gap-2.5 mb-3">
            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${v.bg} ${v.icon}`}>
                <i className={`fas ${icon} text-[13px]`} />
            </span>
            <div>
                <div className="flex items-center gap-2">
                    <h3 className={`text-[15px] font-bold ${v.text}`}>
                        {title}
                    </h3>
                    <span className={`text-[11.5px] font-semibold px-2 py-0.5 rounded-full ${v.chip}`}>
                        {count}
                    </span>
                </div>
                {subtitle && (
                    <div className="text-[11.5px] text-epo-slate-400">
                        {subtitle}
                    </div>
                )}
            </div>
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