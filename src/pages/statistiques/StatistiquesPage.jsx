// src/pages/statistiques/StatistiquesPage.jsx
import { useState } from 'react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
} from 'recharts';
import { Button, SectionTitle } from '../../components/ui/index.js';
import KpiCardSpark from '../../components/stats/KpiCardSpark.jsx';
import DelaiBar from '../../components/stats/DelaiBar.jsx';
import TauxJauge from '../../components/stats/TauxJauge.jsx';
import AlerteCard from '../../components/stats/AlerteCard.jsx';
import {
    KPIS_STATS,
    VOLUMES_TEMPORELS,
    REPARTITION_TYPES,
    DELAIS_ETAPES,
    TAUX_PAR_CIRCUIT,
    ACTIVITE_STRUCTURES,
    HEATMAP_DATA,
    ALERTES_STATS,
    PERIODES,
    GRANULARITES,
    STRUCTURES,
    TYPES,
} from '../../data/statistiques.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function StatistiquesPage() {
    const [periode, setPeriode] = useState('30j');
    const [granularite, setGranularite] = useState('jour');
    const [structure, setStructure] = useState('');
    const [type, setType] = useState('');

    return (
        <div>
            {/* ============================================
                EN-TÊTE
                ============================================ */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Statistiques & Pilotage
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Volumes, délais, performance et activité des structures
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" icon="fa-exchange-alt">
                        Comparer
                    </Button>
                    <Button variant="primary" icon="fa-file-export">
                        Exporter
                    </Button>
                </div>
            </div>

            {/* ============================================
                BARRE DE FILTRES
                ============================================ */}
            <div className="flex flex-wrap items-center gap-3 p-4 mb-6 bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                <FilterSelect label="Période" value={periode} onChange={setPeriode} options={PERIODES} />
                <FilterSelect label="Granularité" value={granularite} onChange={setGranularite} options={GRANULARITES} />
                <FilterSelect label="Structure" value={structure} onChange={setStructure} options={STRUCTURES} />
                <FilterSelect label="Type" value={type} onChange={setType} options={TYPES} />
            </div>

            {/* ============================================
                SECTION 2 - KPI SYNTHÈSE
                ============================================ */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5 mb-7">
                {KPIS_STATS.map((kpi) => (
                    <KpiCardSpark key={kpi.id} {...kpi} />
                ))}
            </div>

            {/* ============================================
                SECTION 3 - VOLUMES
                ============================================ */}
            <SectionTitle icon="fa-chart-bar" title="Volumes de traitement" />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 mb-7">
                {/* Évolution temporelle */}
                <div className="p-5 bg-white border lg:col-span-2 border-epo-slate-200 rounded-xl shadow-soft">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[14px] font-semibold text-epo-slate-800">
                            Évolution par {granularite}
                        </h3>
                        <span className="text-[11.5px] text-epo-slate-400">
                            12 derniers points
                        </span>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={VOLUMES_TEMPORELS} barSize={16}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e8ecf1" vertical={false} />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 11, fill: '#5d6b7e' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: '#5d6b7e' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f5f7fa' }} />
                            <Legend
                                iconType="circle"
                                wrapperStyle={{ fontSize: 11.5, paddingTop: 8 }}
                            />
                            <Bar dataKey="entrants" stackId="a" fill="#009A44" name="Entrants" radius={[0, 0, 0, 0]} />
                            <Bar dataKey="sortants" stackId="a" fill="#FFD100" name="Sortants" />
                            <Bar dataKey="internes" stackId="a" fill="#E30613" name="Internes" />
                            <Bar dataKey="actes" stackId="a" fill="#3C4653" name="Actes" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Répartition par type */}
                <div className="p-5 bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                    <h3 className="text-[14px] font-semibold text-epo-slate-800 mb-3">
                        Répartition par type
                    </h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie
                                data={REPARTITION_TYPES}
                                dataKey="value"
                                nameKey="type"
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={85}
                                paddingAngle={3}
                            >
                                {REPARTITION_TYPES.map((entry, i) => (
                                    <Cell key={i} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-col gap-1.5 mt-3">
                        {REPARTITION_TYPES.map((t) => (
                            <div key={t.type} className="flex items-center gap-2 text-[12.5px]">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.color }} />
                                <span className="flex-1 text-epo-slate-600">{t.type}</span>
                                <span className="font-semibold text-epo-slate-800 tabular-nums">
                                    {t.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ============================================
                SECTION 4 - DÉLAIS & PERFORMANCE
                ============================================ */}
            <SectionTitle icon="fa-clock" title="Délais & performance" />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 mb-7">
                {/* Barres délais */}
                <div className="p-5 bg-white border lg:col-span-2 border-epo-slate-200 rounded-xl shadow-soft">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[14px] font-semibold text-epo-slate-800">
                            Délai réel par étape
                        </h3>
                        <span className="text-[11.5px] text-epo-slate-400">
                            vs cible du Manuel de procédures
                        </span>
                    </div>
                    <div className="divide-y divide-epo-slate-100">
                        {DELAIS_ETAPES.map((d, i) => (
                            <DelaiBar key={i} {...d} />
                        ))}
                    </div>
                </div>

                {/* Taux global + par circuit */}
                <div className="flex flex-col items-center p-5 bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                    <h3 className="text-[14px] font-semibold text-epo-slate-800 mb-3 self-start">
                        Respect global
                    </h3>
                    <TauxJauge valeur={78} cible={90} label="Toutes structures confondues" />
                    <div className="w-full pt-4 mt-5 border-t border-epo-slate-100">
                        <div className="text-[11.5px] font-semibold uppercase tracking-wider text-epo-slate-400 mb-2">
                            Par circuit
                        </div>
                        <div className="flex flex-col gap-1.5">
                            {TAUX_PAR_CIRCUIT.map((c) => (
                                <div key={c.circuit} className="flex items-center gap-2 text-[12.5px]">
                                    <span className="font-mono text-[11px] text-epo-slate-600 w-16">
                                        {c.circuit}
                                    </span>
                                    <div className="flex-1 h-1.5 bg-epo-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`
                                                h-full rounded-full
                                                ${c.taux >= 90 ? 'bg-epo-green-500' :
                                                  c.taux >= 75 ? 'bg-epo-yellow-500' : 'bg-epo-red-500'}
                                            `}
                                            style={{ width: `${c.taux}%` }}
                                        />
                                    </div>
                                    <span className="font-semibold text-right w-9 text-epo-slate-800 tabular-nums">
                                        {c.taux}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================
                SECTION 5 - ACTIVITÉ PAR STRUCTURE
                ============================================ */}
            <SectionTitle
                icon="fa-building"
                title="Activité par structure"
                action={{ label: 'Voir toutes les structures', onClick: () => {} }}
            />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 mb-7">
                {/* Heatmap */}
                <div className="p-5 bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                    <h3 className="text-[14px] font-semibold text-epo-slate-800 mb-3">
                        Volumes par semaine
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-[12px]">
                            <thead>
                                <tr>
                                    <th className="pb-2 pr-2 font-medium text-left text-epo-slate-400">
                                        Structure
                                    </th>
                                    {HEATMAP_DATA.semaines.map((s) => (
                                        <th key={s} className="px-1 pb-2 font-medium text-center text-epo-slate-400">
                                            {s}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {HEATMAP_DATA.structures.map((row) => {
                                    const max = Math.max(...row.valeurs);
                                    return (
                                        <tr key={row.sigle}>
                                            <td className="py-1 pr-2 font-semibold text-epo-slate-700">
                                                {row.sigle}
                                            </td>
                                            {row.valeurs.map((v, i) => {
                                                const intensity = v / max;
                                                return (
                                                    <td key={i} className="py-1 px-0.5">
                                                        <div
                                                            className="w-full h-8 rounded flex items-center justify-center text-[11px] font-semibold"
                                                            style={{
                                                                background: `rgba(0, 154, 68, ${0.08 + intensity * 0.72})`,
                                                                color: intensity > 0.55 ? '#fff' : '#3C4653',
                                                            }}
                                                        >
                                                            {v}
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tableau des structures */}
                <div className="overflow-hidden bg-white border lg:col-span-2 border-epo-slate-200 rounded-xl shadow-soft">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-epo-slate-50">
                                    {['Structure', 'Traités', 'En cours', 'Retards', 'Délai moyen', 'Respect'].map((h, i) => (
                                        <th
                                            key={i}
                                            className={`
                                                px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-epo-slate-500
                                                ${i === 0 ? 'text-left' : 'text-right'}
                                            `}
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {ACTIVITE_STRUCTURES.map((s) => (
                                    <tr
                                        key={s.id}
                                        className="transition border-t border-epo-slate-100 hover:bg-epo-slate-50"
                                    >
                                        <td className="px-4 py-2.5">
                                            <div className="font-semibold text-epo-slate-800 text-[13px]">
                                                {s.sigle}
                                            </div>
                                            <div className="text-[11px] text-epo-slate-500 truncate max-w-[180px]">
                                                {s.nom}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2.5 text-right tabular-nums font-semibold text-epo-slate-800">
                                            {s.traites}
                                        </td>
                                        <td className="px-4 py-2.5 text-right tabular-nums text-epo-slate-600">
                                            {s.enCours}
                                        </td>
                                        <td className={`px-4 py-2.5 text-right tabular-nums font-semibold ${s.retards > 0 ? 'text-epo-red-600' : 'text-epo-slate-400'}`}>
                                            {s.retards || '-'}
                                        </td>
                                        <td className="px-4 py-2.5 text-right text-[12.5px] text-epo-slate-600 tabular-nums">
                                            {s.delaiMoyen}
                                        </td>
                                        <td className="px-4 py-2.5 text-right">
                                            <span className={`
                                                inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11.5px] font-semibold tabular-nums
                                                ${s.tauxRespect >= 85 ? 'bg-epo-green-50 text-epo-green-700' :
                                                  s.tauxRespect >= 70 ? 'bg-epo-yellow-50 text-epo-yellow-700' :
                                                  'bg-epo-red-50 text-epo-red-700'}
                                            `}>
                                                {s.tauxRespect}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ============================================
                SECTION 6 - ALERTES
                ============================================ */}
            <SectionTitle
                icon="fa-bell"
                title="Alertes & points d'attention"
                action={{ label: 'Voir toutes les alertes', onClick: () => {} }}
            />

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                {ALERTES_STATS.map((a) => (
                    <AlerteCard key={a.id} alerte={a} />
                ))}
            </div>
        </div>
    );
}

/* ============================================================
   SOUS-COMPOSANTS INTERNES
   ============================================================ */

function FilterSelect({ label, value, onChange, options }) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-[12px] font-medium text-epo-slate-500 hidden sm:inline">
                {label}
            </span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="
                    px-3 py-2 border border-epo-slate-300 rounded-lg
                    text-[13px] text-epo-slate-800 bg-white
                    focus:outline-none focus:border-epo-green-500
                    focus:ring-2 focus:ring-epo-green-500/10
                "
            >
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload || !payload.length) return null;

    const total = payload.reduce((sum, p) => sum + (p.value || 0), 0);

    return (
        <div className="bg-white border border-epo-slate-200 rounded-lg shadow-card p-3 text-[12px]">
            <div className="font-semibold text-epo-slate-800 mb-1.5">{label}</div>
            {payload.map((p) => (
                <div key={p.dataKey} className="flex items-center gap-2 py-0.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                    <span className="flex-1 text-epo-slate-600">{p.name}</span>
                    <span className="font-semibold text-epo-slate-800 tabular-nums">
                        {p.value}
                    </span>
                </div>
            ))}
            <div className="flex items-center gap-2 mt-1.5 pt-1.5 border-t border-epo-slate-100">
                <span className="flex-1 font-medium text-epo-slate-500">Total</span>
                <span className="font-bold text-epo-slate-900 tabular-nums">{total}</span>
            </div>
        </div>
    );
}