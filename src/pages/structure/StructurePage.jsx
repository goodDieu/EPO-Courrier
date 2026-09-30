// src/pages/structure/StructurePage.jsx
import { useState, useMemo } from 'react';
import { Button, SectionTitle } from '../../components/ui';
import {
    STRUCTURE_GLOBALE,
    STRUCTURE_LOCALE_SG,
    STRUCTURE_LOCALE_SCC,
    STRUCTURE_LOCALE_DG,
} from '../../data/structures.js';

/* ============================================================
   MÉTADONNÉES VISUELLES
   ============================================================ */

const TYPE_STYLES = {
    direction: {
        bg: 'bg-epo-slate-700',
        text: 'text-white',
        border: 'border-epo-slate-700',
        icon: 'fa-building',
        label: 'Direction',
    },
    secretariat: {
        bg: 'bg-epo-green-500',
        text: 'text-white',
        border: 'border-epo-green-500',
        icon: 'fa-user-tie',
        label: 'Secrétariat',
    },
    pole: {
        bg: 'bg-epo-yellow-500',
        text: 'text-epo-slate-900',
        border: 'border-epo-yellow-500',
        icon: 'fa-layer-group',
        label: 'Pôle',
    },
    service: {
        bg: 'bg-epo-slate-100',
        text: 'text-epo-slate-700',
        border: 'border-epo-slate-300',
        icon: 'fa-cog',
        label: 'Service',
    },
    poste: {
        bg: 'bg-white',
        text: 'text-epo-slate-700',
        border: 'border-epo-slate-300',
        icon: 'fa-user',
        label: 'Poste',
    },
};

const STATUT_POSTE = {
    titulaire: {
        dot: 'bg-epo-green-500',
        label: 'Titulaire',
        text: 'text-epo-green-700',
        bg: 'bg-epo-green-50',
    },
    interim: {
        dot: 'bg-epo-yellow-500',
        label: 'Par intérim',
        text: 'text-epo-yellow-700',
        bg: 'bg-epo-yellow-50',
    },
    delegation: {
        dot: 'bg-epo-slate-500',
        label: 'Par délégation',
        text: 'text-epo-slate-700',
        bg: 'bg-epo-slate-100',
    },
    vacant: {
        dot: 'bg-epo-slate-300',
        label: 'Vacant',
        text: 'text-epo-slate-500',
        bg: 'bg-epo-slate-50',
    },
};

const HABILITATIONS = {
    visa: { label: 'Visa', icon: 'fa-eye', color: 'bg-epo-slate-100 text-epo-slate-700' },
    imputation: { label: 'Imputation', icon: 'fa-share', color: 'bg-epo-green-50 text-epo-green-700' },
    signature: { label: 'Signature délégation', icon: 'fa-signature', color: 'bg-epo-slate-100 text-epo-slate-700' },
    rejet: { label: 'Rejet', icon: 'fa-times-circle', color: 'bg-epo-red-50 text-epo-red-700' },
    dispatch: { label: 'Dispatch', icon: 'fa-exchange-alt', color: 'bg-epo-yellow-50 text-epo-yellow-700' },
};

const CIRCUIT_STYLES = {
    'WF-ORD': 'bg-epo-slate-100 text-epo-slate-700',
    'WF-URG': 'bg-epo-red-50 text-epo-red-700',
    'WF-CONF': 'bg-epo-slate-700 text-white',
    'WF-PRMP': 'bg-epo-yellow-50 text-epo-yellow-700',
    'WF-FIN': 'bg-epo-green-50 text-epo-green-700',
    'WF-RH-A': 'bg-epo-slate-100 text-epo-slate-700',
    'WF-INT': 'bg-epo-green-50 text-epo-green-700',
};

/* ============================================================
   PAGE
   ============================================================ */

export default function StructurePage() {
    const [vue, setVue] = useState('local'); // 'local' | 'globale'
    const [structureLocale, setStructureLocale] = useState('sg'); // 'sg' | 'scc' | 'dg'
    const [selectedNoeud, setSelectedNoeud] = useState(null);

    const arbre = useMemo(() => {
        if (vue === 'globale') return STRUCTURE_GLOBALE;
        if (structureLocale === 'scc') return STRUCTURE_LOCALE_SCC;
        if (structureLocale === 'dg') return STRUCTURE_LOCALE_DG;
        return STRUCTURE_LOCALE_SG;
    }, [vue, structureLocale]);

    return (
        <div>
            {/* ============================================
                EN-TÊTE
                ============================================ */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-epo-slate-900 tracking-tight">
                        Structures & Organigramme
                    </h1>
                    <div className="text-sm text-epo-slate-500 mt-1">
                        Hiérarchie organisationnelle de l'EPO et composition des structures
                    </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                    <Button variant="primary" icon="fa-plus">
                        Nouvelle structure
                    </Button>
                </div>
            </div>

            {/* ============================================
                BARRE DE CONTRÔLE
                ============================================ */}
            <div className="bg-white border border-epo-slate-200 rounded-xl p-4 shadow-soft mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Bascule local / global */}
                <div className="inline-flex bg-epo-slate-100 rounded-lg p-1">
                    <button
                        onClick={() => setVue('local')}
                        className={`
                            px-4 py-2 rounded-md text-[13px] font-semibold transition
                            ${vue === 'local'
                                ? 'bg-white text-epo-slate-900 shadow-soft'
                                : 'text-epo-slate-500 hover:text-epo-slate-700'}
                        `}
                    >
                        <i className="fas fa-sitemap mr-1.5" />
                        Vue locale
                    </button>
                    <button
                        onClick={() => setVue('globale')}
                        className={`
                            px-4 py-2 rounded-md text-[13px] font-semibold transition
                            ${vue === 'globale'
                                ? 'bg-white text-epo-slate-900 shadow-soft'
                                : 'text-epo-slate-500 hover:text-epo-slate-700'}
                        `}
                    >
                        <i className="fas fa-network-wired mr-1.5" />
                        Vue globale
                    </button>
                </div>

                {/* Sélecteur de structure (uniquement en vue locale) */}
                {vue === 'local' && (
                    <div className="flex items-center gap-2 text-[13px] text-epo-slate-500">
                        Structure :
                        <select
                            value={structureLocale}
                            onChange={(e) => setStructureLocale(e.target.value)}
                            className="px-3 py-2 border border-epo-slate-300 rounded-lg text-[13px] text-epo-slate-800 bg-white focus:outline-none focus:border-epo-green-500"
                        >
                            <option value="sg">Secrétariat Général</option>
                            <option value="scc">Service Central du Courrier</option>
                            <option value="dg">Direction Générale</option>
                        </select>
                    </div>
                )}
            </div>

            {/* ============================================
                LÉGENDE
                ============================================ */}
            <Legend />

            {/* ============================================
                ARBRE
                ============================================ */}
            <div className="bg-white border border-epo-slate-200 rounded-xl p-6 sm:p-10 shadow-soft mb-6 overflow-x-auto">
                <div className="min-w-fit flex justify-center">
                    <OrganigrammeTree
                        node={arbre}
                        onSelect={setSelectedNoeud}
                    />
                </div>
            </div>

            {/* ============================================
                PANNEAU DE DÉTAIL
                ============================================ */}
            {selectedNoeud && (
                <DetailPanel
                    noeud={selectedNoeud}
                    onClose={() => setSelectedNoeud(null)}
                />
            )}
        </div>
    );
}

/* ============================================================
   LÉGENDE
   ============================================================ */

function Legend() {
    return (
        <div className="flex flex-wrap items-center gap-3 mb-4 text-[12px] text-epo-slate-600">
            <span className="font-semibold uppercase tracking-wider text-epo-slate-400 text-[10px]">
                Légende :
            </span>
            {Object.entries(TYPE_STYLES).map(([key, t]) => (
                <span key={key} className="inline-flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${t.bg}`} />
                    {t.label}
                </span>
            ))}
            <span className="text-epo-slate-300 mx-1">|</span>
            {Object.entries(STATUT_POSTE).map(([key, s]) => (
                <span key={key} className="inline-flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                    {s.label}
                </span>
            ))}
        </div>
    );
}

/* ============================================================
   ARBRE RÉCURSIF
   ============================================================ */

function OrganigrammeTree({ node, onSelect }) {
    if (!node) return null;

    return (
        <div className="flex flex-col items-center">
            <OrganigrammeNode node={node} onSelect={onSelect} />

            {node.children && node.children.length > 0 && (
                <>
                    {/* Trait vertical descendant */}
                    <div className="w-px h-6 bg-epo-slate-300" />

                    {/* Barre horizontale reliant les enfants */}
                    <div className="flex justify-center relative">
                        {node.children.length > 1 && (
                            <div
                                className="absolute top-0 h-px bg-epo-slate-300"
                                style={{
                                    left: `calc(50% / ${node.children.length})`,
                                    right: `calc(50% / ${node.children.length})`,
                                }}
                            />
                        )}

                        <div className="flex gap-6 sm:gap-10">
                            {node.children.map((child) => (
                                <div key={child.id} className="flex flex-col items-center">
                                    <div className="w-px h-6 bg-epo-slate-300" />
                                    <OrganigrammeTree
                                        node={child}
                                        onSelect={onSelect}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

/* ============================================================
   NŒUD
   ============================================================ */

function OrganigrammeNode({ node, onSelect }) {
    const type = TYPE_STYLES[node.type] || TYPE_STYLES.service;
    const statut = node.statut ? STATUT_POSTE[node.statut] : null;

    return (
        <button
            onClick={() => onSelect(node)}
            className={`
                group relative text-left
                bg-white border-2 ${type.border}
                rounded-xl px-4 py-3 min-w-[180px] max-w-[220px]
                shadow-soft hover:shadow-card hover:-translate-y-0.5
                transition cursor-pointer
            `}
        >
            {/* Bande colorée selon type */}
            <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl ${type.bg}`} />

            {/* En-tête */}
            <div className="flex items-start gap-2 mt-1">
                <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                    ${type.bg}
                `}>
                    <i className={`fas ${node.icon || type.icon} ${type.text} text-[13px]`} />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-bold text-epo-slate-900 truncate">
                        {node.sigle || node.nom}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-epo-slate-400">
                        {type.label}
                    </div>
                </div>
            </div>

            {/* Nom complet si sigle */}
            {node.sigle && node.nom && (
                <div className="text-[11px] text-epo-slate-500 mt-1.5 truncate">
                    {node.nom}
                </div>
            )}

            {/* Responsable / titulaire */}
            {node.titulaire && (
                <div className="mt-2 pt-2 border-t border-epo-slate-100 flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-epo-slate-100 flex items-center justify-center text-[9px] font-bold text-epo-slate-600 flex-shrink-0">
                        {node.titulaire.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <span className="text-[11px] text-epo-slate-700 truncate">
                        {node.titulaire}
                    </span>
                </div>
            )}

            {/* Statut (pour les postes) */}
            {statut && (
                <div className={`
                    inline-flex items-center gap-1.5 mt-1.5
                    px-2 py-0.5 rounded-full text-[10px] font-semibold
                    ${statut.bg} ${statut.text}
                `}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statut.dot}`} />
                    {statut.label}
                </div>
            )}

            {/* Habilitations (pour les postes) */}
            {node.habilitations && node.habilitations.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                    {node.habilitations.map((h) => {
                        const hab = HABILITATIONS[h];
                        if (!hab) return null;
                        return (
                            <span
                                key={h}
                                title={hab.label}
                                className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium ${hab.color}`}
                            >
                                <i className={`fas ${hab.icon}`} />
                            </span>
                        );
                    })}
                </div>
            )}

            {/* Charge / effectif */}
            {node.charge != null && (
                <div className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1.5 rounded-full bg-epo-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                    {node.charge}
                </div>
            )}

            {/* Circuits particuliers (déployé au survol pour la fiche globale) */}
            {node.circuits && node.circuits.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                    {node.circuits.map((c) => (
                        <span
                            key={c}
                            className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${CIRCUIT_STYLES[c] || 'bg-epo-slate-100'}`}
                        >
                            {c}
                        </span>
                    ))}
                </div>
            )}
        </button>
    );
}

/* ============================================================
   PANNEAU DÉTAIL
   ============================================================ */

function DetailPanel({ noeud, onClose }) {
    const type = TYPE_STYLES[noeud.type] || TYPE_STYLES.service;

    return (
        <div className="bg-white border border-epo-slate-200 rounded-xl p-5 shadow-soft">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type.bg}`}>
                        <i className={`fas ${noeud.icon || type.icon} ${type.text}`} />
                    </div>
                    <div>
                        <div className="text-lg font-bold text-epo-slate-900">
                            {noeud.nom}
                        </div>
                        <div className="text-[13px] text-epo-slate-500">
                            {noeud.sigle && `${noeud.sigle} · `}{type.label}
                        </div>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-epo-slate-100 hover:bg-epo-slate-200 text-epo-slate-500 flex items-center justify-center"
                >
                    <i className="fas fa-times" />
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {noeud.titulaire && (
                    <InfoField label="Titulaire" value={noeud.titulaire} />
                )}
                {noeud.statut && (
                    <InfoField
                        label="Statut"
                        value={
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${STATUT_POSTE[noeud.statut].bg} ${STATUT_POSTE[noeud.statut].text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${STATUT_POSTE[noeud.statut].dot}`} />
                                {STATUT_POSTE[noeud.statut].label}
                            </span>
                        }
                    />
                )}
                {noeud.rattachement && (
                    <InfoField label="Rattachement" value={noeud.rattachement} />
                )}
                {noeud.effectif != null && (
                    <InfoField label="Effectif" value={noeud.effectif} />
                )}
                {noeud.charge != null && (
                    <InfoField label="Dossiers en cours" value={noeud.charge} />
                )}
                {noeud.delaiMoyen && (
                    <InfoField label="Délai moyen de traitement" value={noeud.delaiMoyen} />
                )}
            </div>

            {noeud.habilitations && noeud.habilitations.length > 0 && (
                <div className="mt-4 pt-4 border-t border-epo-slate-100">
                    <div className="text-[12px] font-semibold uppercase tracking-wider text-epo-slate-500 mb-2">
                        Habilitations
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {noeud.habilitations.map((h) => {
                            const hab = HABILITATIONS[h];
                            if (!hab) return null;
                            return (
                                <span
                                    key={h}
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${hab.color}`}
                                >
                                    <i className={`fas ${hab.icon}`} />
                                    {hab.label}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}

            {noeud.circuits && noeud.circuits.length > 0 && (
                <div className="mt-4 pt-4 border-t border-epo-slate-100">
                    <div className="text-[12px] font-semibold uppercase tracking-wider text-epo-slate-500 mb-2">
                        Circuits particuliers
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {noeud.circuits.map((c) => (
                            <span
                                key={c}
                                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${CIRCUIT_STYLES[c] || 'bg-epo-slate-100'}`}
                            >
                                {c}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex gap-2 mt-5 pt-4 border-t border-epo-slate-100">
                <Button variant="outline" icon="fa-eye">
                    Voir les dossiers
                </Button>
                <Button variant="outline" icon="fa-edit">
                    Modifier
                </Button>
            </div>
        </div>
    );
}

function InfoField({ label, value }) {
    return (
        <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-epo-slate-400 mb-0.5">
                {label}
            </div>
            <div className="text-[13.5px] text-epo-slate-800">{value}</div>
        </div>
    );
}