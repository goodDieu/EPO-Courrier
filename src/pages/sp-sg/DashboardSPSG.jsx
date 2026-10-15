// src/pages/sp-sg/DashboardSPSG.jsx
import { useNavigate } from 'react-router-dom';
import { Button, KpiCard, SectionTitle } from '../../components/ui';
import {
    KPIS_SP_SG,
    A_INTRODUIRE_AU_SG,
    FILE_TRAITEMENT,
    ACTIVITES_RECENTES_SP_SG,
    ACTIVITE_COLORS,
    TYPES_DOSSIERS,
    formatHeure,
    formatDuree,
} from '../../data/dashboardSPSG.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function DashboardSPSG() {
    const navigate = useNavigate();

    const aTrier = FILE_TRAITEMENT.filter((f) => f.actionRequise === 'trier').length;
    const aScanner = FILE_TRAITEMENT.filter((f) => f.actionRequise === 'scanner').length;

    return (
        <div className="w-full min-w-0">
            {/* ============================================
                EN-TÊTE
                ============================================ */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-epo-slate-900">
                        Secrétariat Particulier du SG
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-epo-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-epo-green-500" />
                            En service
                        </span>
                        <span className="text-epo-slate-300">·</span>
                        <span>Réception · Tri · Numérisation · Introduction</span>
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
                {KPIS_SP_SG.map((kpi) => (
                    <KpiCard key={kpi.id} {...kpi} />
                ))}
            </div>

            {/* ============================================
                BANDEAU WORKFLOW- position dans le circuit
                ============================================ */}
            <div className="flex items-start gap-3 p-4 mb-6 border rounded-xl bg-epo-slate-50 border-epo-slate-200">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-lg bg-epo-slate-700">
                    <i className="fas fa-route text-[15px]" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-epo-slate-800">
                        Votre rôle dans le circuit
                    </div>
                    <div className="text-xs text-epo-slate-600 mt-0.5">
                        Réception des courriers du SCC → <strong>tri</strong> selon importance/urgence → <strong>numérisation</strong> des pièces → <strong>introduction</strong> au SG pour avis et instruction.
                    </div>
                </div>
            </div>

            {/* ============================================
                SECTION 1 : À INTRODUIRE AU SG
                ============================================ */}
            <SectionTitle
                icon="fa-user-tie"
                title="Courriers à introduire au SG"
                action={{
                    label: 'Voir tous',
                    onClick: () => navigate('/sp-sg/introduction'),
                }}
            />

            <div className="grid grid-cols-1 gap-3 mb-7 lg:grid-cols-2 xl:grid-cols-3">
                {A_INTRODUIRE_AU_SG.map((d) => (
                    <CarteIntroduction
                        key={d.id}
                        dossier={d}
                        onIntroduire={() => navigate('/sp-sg/introduction')}
                    />
                ))}
            </div>

            {/* ============================================
                SECTION 2 : FILE DE TRAITEMENT (TRI + SCAN)
                ============================================ */}
            <SectionTitle
                icon="fa-tasks"
                title="File d'attente de traitement"
                action={{
                    label: 'Voir tout',
                    onClick: () => navigate('/sp-sg/tri'),
                }}
            />

            <div className="grid grid-cols-1 gap-4 mb-7 lg:grid-cols-2">
                {/* Sous-section Tri */}
                <div className="p-4 bg-white border rounded-xl shadow-soft border-epo-slate-200">
                    <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-epo-slate-100 text-epo-slate-600">
                                <i className="fas fa-th text-[13px]" />
                            </span>
                            <div>
                                <div className="text-sm font-bold text-epo-slate-800">
                                    À trier
                                </div>
                                <div className="text-xs text-epo-slate-400">
                                    {aTrier} en attente
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/sp-sg/tri')}
                            className="text-xs font-semibold text-epo-green-600 hover:underline"
                        >
                            Ouvrir <i className="fas fa-arrow-right text-[9px] ml-1" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        {FILE_TRAITEMENT.filter((f) => f.actionRequise === 'trier').map((f) => (
                            <LigneTraitement key={f.id} item={f} />
                        ))}
                        {aTrier === 0 && (
                            <div className="p-4 text-center rounded-lg bg-epo-slate-50">
                                <div className="text-sm text-epo-slate-500">
                                    Aucun dossier à trier
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sous-section Scan */}
                <div className="p-4 bg-white border rounded-xl shadow-soft border-epo-slate-200">
                    <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-epo-slate-100 text-epo-slate-600">
                                <i className="fas fa-camera text-[13px]" />
                            </span>
                            <div>
                                <div className="text-sm font-bold text-epo-slate-800">
                                    À numériser
                                </div>
                                <div className="text-xs text-epo-slate-400">
                                    {aScanner} en attente
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/sp-sg/scan')}
                            className="text-xs font-semibold text-epo-green-600 hover:underline"
                        >
                            Ouvrir <i className="fas fa-arrow-right text-[9px] ml-1" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        {FILE_TRAITEMENT.filter((f) => f.actionRequise === 'scanner').map((f) => (
                            <LigneTraitement key={f.id} item={f} />
                        ))}
                        {aScanner === 0 && (
                            <div className="p-4 text-center rounded-lg bg-epo-slate-50">
                                <div className="text-sm text-epo-slate-500">
                                    Aucun dossier à scanner
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ============================================
                SECTION 3 : ACTIVITÉ RÉCENTE
                ============================================ */}
            <SectionTitle
                icon="fa-history"
                title="Activité récente"
                action={{ label: 'Voir tout', onClick: () => {} }}
            />

            <div className="p-5 bg-white border rounded-xl shadow-soft border-epo-slate-200">
                <div className="flex flex-col gap-3">
                    {ACTIVITES_RECENTES_SP_SG.map((a, i) => (
                        <div
                            key={a.id}
                            className={`
                                flex gap-3 items-start
                                ${i < ACTIVITES_RECENTES_SP_SG.length - 1 ? 'pb-3 border-b border-epo-slate-100' : ''}
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
                                    className="text-sm text-epo-slate-700"
                                    dangerouslySetInnerHTML={{ __html: a.html }}
                                />
                                <div className="text-xs text-epo-slate-400 mt-0.5">
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
   SOUS-COMPOSANTS
   ============================================================ */

function CarteIntroduction({ dossier, onIntroduire }) {
    const d = dossier;
    const type = TYPES_DOSSIERS[d.type];
    const isUrgent = d.priorite === 'urgent';

    const borderColor = isUrgent ? '' : '';

    return (
        <div className={`
            bg-white border border-epo-slate-200
            ${borderColor} rounded-xl p-4 shadow-soft hover:shadow-card transition
        `}>
            {/* En-tête */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-epo-slate-700 bg-epo-slate-100 px-2 py-0.5 rounded">
                    {d.id}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${type.color}`}>
                    <i className={`fas ${type.icon} text-[9px]`} />
                    {type.label}
                </span>
                {isUrgent && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-epo-slate-50 text-epo-slate-900 text-xs font-bold">
                        <i className="fas fa-exclamation-circle text-[8px]" />
                        URGENT
                    </span>
                )}
                {d.scanne && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-epo-slate-100 text-epo-slate-700 text-xs font-bold">
                        <i className="fas fa-camera text-[8px]" />
                        SCANNÉ
                    </span>
                )}
            </div>

            {/* Objet */}
            <div className="text-sm font-semibold text-epo-slate-900 leading-snug mb-2 line-clamp-2">
                {d.objet}
            </div>

            {/* Expéditeur */}
            <div className="text-xs text-epo-slate-500 mb-2 truncate">
                <i className="fas fa-user text-[10px] text-epo-slate-400 mr-1" />
                {d.expediteurNom}
            </div>

            {/* Meta ligne */}
            <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-epo-slate-100 text-epo-slate-600 font-medium">
                    <i className="fas fa-clock text-[9.5px]" />
                    Reçu {formatHeure(d.recuAuSPSG)}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold ${d.tempsAttente >= 120 ? 'bg-epo-slate-50 text-epo-slate-900' : 'bg-epo-slate-100 text-epo-slate-600'}`}>
                    <i className="fas fa-hourglass-half text-[9.5px]" />
                    {formatDuree(d.tempsAttente)}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-epo-slate-100 text-epo-slate-600 font-medium">
                    <i className="fas fa-paperclip text-[9.5px]" />
                    {d.pieces}
                </span>
            </div>

            {/* Points d'attention */}
            {d.pointsAttention.length > 0 && (
                <div className="p-2.5 mb-3 rounded-lg bg-epo-yellow-50 border border-epo-yellow-200">
                    <div className="flex items-start gap-1.5 text-xs text-epo-yellow-900">
                        <i className="fas fa-info-circle text-epo-yellow-600 text-[10px] mt-0.5 flex-shrink-0" />
                        <span>{d.pointsAttention[0]}</span>
                    </div>
                </div>
            )}

            {/* Action */}
            <button
                onClick={onIntroduire}
                className="
                    w-full flex items-center justify-center gap-2
                    py-2.5 px-4 rounded-lg
                    bg-epo-green-700 text-white text-sm font-bold
                    hover:bg-epo-green-800 active:scale-[0.98] transition
                "
            >
                <i className="fas fa-user-tie text-[11px]" />
                Introduire au SG
            </button>
        </div>
    );
}

function LigneTraitement({ item }) {
    const type = TYPES_DOSSIERS[item.type];

    return (
        <div className="flex items-center gap-3 p-2.5 rounded-lg bg-epo-slate-50 hover:bg-epo-slate-100 transition">
            <span className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-white border rounded-lg border-epo-slate-200 text-epo-slate-600">
                <i className={`fas ${type.icon} text-[11px]`} />
            </span>
            <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-epo-slate-800 truncate">
                    {item.objet}
                </div>
                <div className="text-xs text-epo-slate-500 mt-0.5 truncate">
                    <span className="font-mono">{item.id}</span> · {item.expediteurNom}
                </div>
            </div>
            {item.priorite === 'urgent' && (
                <span className="flex-shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-epo-slate-50 text-epo-slate-900 text-xs font-bold">
                    URGENT
                </span>
            )}
        </div>
    );
}