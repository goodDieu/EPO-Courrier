// src/pages/sp-dg/DashboardSPDG.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, KpiCard, SectionTitle } from '../../components/ui';
import {
    KPIS_SP_DG,
    DOSSIERS_A_INTRODUIRE,
    ACTIVITES_RECENTES_SP_DG,
    ACTIVITE_COLORS,
    TYPES_DOSSIERS,
    formatDateHeure,
    formatDuree,
} from '../../data/dashboardSPDG.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function DashboardSPDG() {
    const navigate = useNavigate();
    const [dossierSelectionne, setDossierSelectionne] = useState(null);

    // Post-visa à cocher (depuis les données mockées)
    const postVisaACocher = KPIS_SP_DG.find((k) => k.id === 'a-cocher')?.value || 0;

    return (
        <div className="w-full min-w-0">
            {/* ============================================
                EN-TÊTE
                ============================================ */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-epo-slate-900">
                        Secrétariat Particulier du DG
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-epo-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-epo-green-500" />
                            En service
                        </span>
                        <span className="text-epo-slate-300">·</span>
                        <span>Introduction · Coche post-visa · Confidentiels</span>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                </div>
            </div>

            {/* ============================================
                KPI
                ============================================ */}
            <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 xl:grid-cols-4">
                {KPIS_SP_DG.map((kpi) => (
                    <KpiCard key={kpi.id} {...kpi} />
                ))}
            </div>

            {/* ============================================
                SECTION CRITIQUE : POST-VISA À TRAITER
                ============================================ */}
            {postVisaACocher > 0 && (
                <div className="flex items-start gap-4 p-5 mb-6 border-2 rounded-xl bg-epo-red-50 border-epo-red-300 shadow-soft">
                    <div className="flex items-center justify-center flex-shrink-0 text-white w-14 h-14 rounded-xl bg-epo-red-500">
                        <i className="fas fa-exclamation-triangle text-[22px]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-[16px] font-bold text-epo-red-900">
                                Action critique requise
                            </h3>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-epo-red-500 text-white text-[10.5px] font-bold uppercase tracking-wider">
                                Anti-black-out
                            </span>
                        </div>
                        <div className="text-[13px] text-epo-red-800 mb-2">
                            <strong>{postVisaACocher} dossier{postVisaACocher > 1 ? 's' : ''}</strong> attend{postVisaACocher > 1 ? 'ent' : ''} votre coche post-visa.
                            Sans cette action, le SG reste <strong>sans visibilité</strong> sur les décisions du DG (§9.2).
                        </div>
                        <button
                            onClick={() => navigate('/sp_dg/post-visa')}
                            className="
                                inline-flex items-center gap-2
                                px-4 py-2.5 rounded-lg
                                bg-epo-red-500 text-white text-[13px] font-bold
                                hover:bg-epo-red-600 active:scale-[0.98] transition
                            "
                        >
                            <i className="fas fa-check-square text-[12px]" />
                            Traiter les coches maintenant
                            <i className="fas fa-arrow-right text-[11px]" />
                        </button>
                    </div>
                </div>
            )}

            {/* ============================================
                DOSSIERS À INTRODUIRE AU DG
                ============================================ */}
            <SectionTitle
                icon="fa-pen"
                title="Dossiers à introduire au DG"
                action={{
                    label: 'Voir tous',
                    onClick: () => navigate('/sp_dg/introduction'),
                }}
            />

            <div className="grid grid-cols-1 gap-3 mb-7 lg:grid-cols-2">
                {DOSSIERS_A_INTRODUIRE.map((d) => (
                    <IntroductionCarte
                        key={d.id}
                        dossier={d}
                        onVoir={() => setDossierSelectionne(d)}
                    />
                ))}
            </div>

            {/* ============================================
                ACTIVITÉ RÉCENTE
                ============================================ */}
            <SectionTitle
                icon="fa-history"
                title="Activité récente"
                action={{ label: 'Voir tout', onClick: () => {} }}
            />

            <div className="p-5 bg-white border rounded-xl shadow-soft border-epo-slate-200">
                <div className="flex flex-col gap-3">
                    {ACTIVITES_RECENTES_SP_DG.map((a, i) => (
                        <div
                            key={a.id}
                            className={`
                                flex gap-3 items-start
                                ${i < ACTIVITES_RECENTES_SP_DG.length - 1 ? 'pb-3 border-b border-epo-slate-100' : ''}
                            `}
                        >
                            <div
                                className={`
                                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                                    ${ACTIVITE_COLORS[a.color]}
                                `}
                            >
                                <i className={`fas ${a.icon} text-[13px]`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div
                                    className="text-[13.5px] text-epo-slate-700"
                                    dangerouslySetInnerHTML={{ __html: a.html }}
                                />
                                <div className="text-[12px] text-epo-slate-400 mt-0.5">
                                    {a.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ============================================================
   SOUS-COMPOSANT : CARTE DOSSIER À INTRODUIRE
   ============================================================ */

function IntroductionCarte({ dossier, onVoir }) {
    const d = dossier;
    const type = TYPES_DOSSIERS[d.type];
    const isUrgent = d.priorite === 'urgent';
    const isConfidentiel = d.priorite === 'confidentiel';

    const borderColor = isUrgent ? 'border-l-epo-red-500'
        : isConfidentiel ? 'border-l-epo-slate-800'
        : 'border-l-epo-slate-300';

    return (
        <div className={`
            bg-white border border-epo-slate-200 border-l-4
            ${borderColor} rounded-xl p-4 shadow-soft hover:shadow-card transition
        `}>
            {/* En-tête */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-[11.5px] font-bold text-epo-slate-700 bg-epo-slate-100 px-2 py-0.5 rounded-full">
                    {d.id}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${type.color}`}>
                    <i className={`fas ${type.icon} text-[9px]`} />
                    {type.label}
                </span>
                {isUrgent && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-epo-red-50 text-epo-red-700 text-[9.5px] font-bold">
                        <i className="fas fa-exclamation-circle text-[8px]" />
                        URGENT
                    </span>
                )}
                {isConfidentiel && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-epo-slate-800 text-white text-[9.5px] font-bold">
                        <i className="fas fa-lock text-[8px]" />
                        CONFID.
                    </span>
                )}
            </div>

            {/* Objet */}
            <div className="text-[13.5px] font-semibold text-epo-slate-900 leading-snug mb-2">
                {d.objet}
            </div>

            {/* Infos */}
            <div className="flex flex-col gap-1 mb-3 text-[11.5px] text-epo-slate-500">
                <div className="flex items-center gap-1.5">
                    <i className="fas fa-check text-epo-green-600 text-[10px]" />
                    <span>Vu bon à signer par <strong className="text-epo-slate-700">{d.vuBonASigner.par}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                    <i className="fas fa-clock text-[10px] text-epo-slate-400" />
                    <span>En attente d'introduction depuis {formatDuree(d.tempsAttente)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <i className="fas fa-paperclip text-[10px] text-epo-slate-400" />
                    <span>{d.pieces} pièce{d.pieces > 1 ? 's' : ''} jointe{d.pieces > 1 ? 's' : ''}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-epo-slate-100">
                <button
                    onClick={() => onVoir()}
                    className="
                        flex-1 flex items-center justify-center gap-2
                        py-2.5 px-4 rounded-lg
                        bg-epo-green-500 text-white text-[13px] font-bold
                        hover:bg-epo-green-600 active:scale-[0.98] transition
                    "
                >
                    <i className="fas fa-pen text-[11px]" />
                    Introduire
                </button>
                <button
                    onClick={() => onVoir()}
                    className="
                        flex items-center justify-center gap-2
                        py-2.5 px-4 rounded-lg
                        bg-epo-slate-100 text-epo-slate-700 text-[13px] font-semibold
                        hover:bg-epo-slate-200 transition
                    "
                >
                    <i className="fas fa-eye text-[11px]" />
                    Détail
                </button>
            </div>
        </div>
    );
}