// src/pages/dg/DashboardDG.jsx
import { useState } from 'react';
import { Button, KpiCard, StatusBadge, PriorityTag, SectionTitle } from '../../components/ui';
import DgSignatureModal from '../../components/dg/DgSignatureModal';
import {
    KPIS_DG,
    DOCUMENTS_A_SIGNER,
    ACTIVITES_RECENTES_DG,
    PRIORITES,
    ECHEANCE_COLORS,
} from '../../data/dashboardDG.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function DashboardDG() {
    const [selectedDoc, setSelectedDoc] = useState(null);

    return (
        <div>
            {/* ============================================
                EN-TÊTE
                ============================================ */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Tableau de bord du Directeur Général
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-epo-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-epo-green-500" />
                            En service
                        </span>
                        <span className="text-epo-slate-300">·</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-epo-green-50 text-epo-green-600 text-[11px] font-semibold">
                            <i className="fas fa-circle text-[7px]" />
                            Système opérationnel
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                </div>
            </div>

            {/* ============================================
                KPI
                ============================================ */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-7">
                {KPIS_DG.map((kpi) => (
                    <KpiCard key={kpi.id} {...kpi} />
                ))}
            </div>

            {/* ============================================
                DOCUMENTS À SIGNER
                ============================================ */}
            <SectionTitle
                icon="fa-pen"
                title="Documents à signer"
                action={{ label: 'Voir tous', onClick: () => {} }}
            />

            <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft mb-7">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-epo-slate-50">
                                {['N°', 'Objet', 'Provenance', 'Priorité', 'Statut', 'Échéance', ''].map((h, i) => (
                                    <th
                                        key={i}
                                        className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-epo-slate-500"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {DOCUMENTS_A_SIGNER.map((d) => (
                                <tr
                                    key={d.id}
                                    className="transition border-t border-epo-slate-100 hover:bg-epo-slate-50"
                                >
                                    <td className="px-4 py-3 font-semibold text-epo-slate-800">
                                        {d.id}
                                    </td>
                                    <td className="max-w-xs px-4 py-3 truncate text-epo-slate-700">
                                        {d.objet}
                                    </td>
                                    <td className="px-4 py-3 text-epo-slate-600">
                                        {d.provenence}
                                    </td>
                                    <td className="px-4 py-3">
                                        <PriorityTag priority={d.priorite} />
                                    </td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={d.etat} />
                                    </td>
                                    <td className={`px-4 py-3 font-semibold ${ECHEANCE_COLORS[d.echeanceColor]}`}>
                                        {d.echeanceLabel}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => setSelectedDoc(d)}
                                            className="text-[13px] font-medium text-epo-green-600 hover:underline"
                                        >
                                            {d.etat === 'a-re-signer' ? 'Revoir' : 'Signer'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-3 border-t border-epo-slate-200 text-[13px] text-epo-slate-500">
                    <span>4 documents à signer sur 7</span>
                    <div className="flex gap-1">
                        <button className="px-2.5 py-1 rounded-md border border-epo-slate-200 text-[13px] hover:bg-epo-slate-100 transition">
                            ‹
                        </button>
                        <button className="px-2.5 py-1 rounded-md bg-epo-slate-700 text-white border border-epo-slate-700 text-[13px]">
                            1
                        </button>
                        <button className="px-2.5 py-1 rounded-md border border-epo-slate-200 text-[13px] hover:bg-epo-slate-100 transition">
                            2
                        </button>
                        <button className="px-2.5 py-1 rounded-md border border-epo-slate-200 text-[13px] hover:bg-epo-slate-100 transition">
                            ›
                        </button>
                    </div>
                </div>
            </div>

            {/* ============================================
                ACTIVITÉ RÉCENTE
                ============================================ */}
            <SectionTitle
                icon="fa-history"
                title="Activité récente"
                action={{ label: 'Voir tout', onClick: () => {} }}
            />

            <div className="p-5 bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                <div className="flex flex-col gap-3">
                    {ACTIVITES_RECENTES_DG.map((a, i) => (
                        <div
                            key={a.id}
                            className={`
                                flex gap-3 items-start
                                ${i < ACTIVITES_RECENTES_DG.length - 1 ? 'pb-3 border-b border-epo-slate-100' : ''}
                            `}
                        >
                            <div
                                className={`
                                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                                    ${ACTIVITE_COLORS[a.color]}
                                `}
                            >
                                <i className={`fas ${a.icon} text-sm`} />
                            </div>
                            <div className="flex-1">
                                <div
                                    className="text-sm text-epo-slate-700"
                                    dangerouslySetInnerHTML={{ __html: a.html }}
                                />
                                <div className="text-[13px] text-epo-slate-400 mt-0.5">
                                    {a.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ============================================
                MODALE DE SIGNATURE
                ============================================ */}
            <DgSignatureModal
                document={selectedDoc}
                onClose={() => setSelectedDoc(null)}
            />
        </div>
    );
}

/* ============================================================
   HELPERS
   ============================================================ */

const ACTIVITE_COLORS = {
    blue: 'bg-epo-green-50 text-epo-green-500',
    red: 'bg-epo-red-50 text-epo-red-500',
    green: 'bg-epo-green-50 text-epo-green-500',
    amber: 'bg-epo-yellow-50 text-epo-yellow-600',
    purple: 'bg-epo-slate-100 text-epo-slate-600',
};