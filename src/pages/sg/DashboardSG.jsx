import { useState } from 'react';
import {
    KpiCard,
    StatusBadge,
    PriorityTag,
    CriticiteBadge,
    IntegrityBadge,
    SectionTitle,
    Button,
    Modal,
    Timeline,
} from '../../components/ui';
import { KPIS_SG } from '../../data/kpi.js';
import { MATRIX_EISENHOWER } from '../../data/matrix.js';
import { DOSSIERS_SG } from '../../data/dossiers.js';
import { ACTIVITES_RECENTES_SG } from '../../data/activites.js';

/* ============================================================
   STYLES DE LA MATRICE
   ============================================================ */

const MATRIX_STYLES = {
    'important-urgent': {
        border: 'border-l-epo-red-500',
        count: 'text-epo-red-600',
    },
    'important-not-urgent': {
        border: 'border-l-epo-yellow-500',
        count: 'text-epo-yellow-700',
    },
    'not-important-urgent': {
        border: 'border-l-epo-green-500',
        count: 'text-epo-green-600',
    },
    'not-important-not-urgent': {
        border: 'border-l-epo-slate-300',
        count: 'text-epo-slate-500',
    },
};

const ECHEANCE_COLORS = {
    red: 'text-epo-red-600',
    amber: 'text-epo-yellow-700',
    green: 'text-epo-green-600',
};

const ACTIVITE_COLORS = {
    blue: 'bg-epo-green-50 text-epo-green-500',
    red: 'bg-epo-red-50 text-epo-red-500',
    green: 'bg-epo-green-50 text-epo-green-500',
    amber: 'bg-epo-yellow-50 text-epo-yellow-600',
};

/* ============================================================
   PAGE
   ============================================================ */

export default function DashboardSG() {
    const [selectedDossier, setSelectedDossier] = useState(null);

    return (
        <div>
            {/* ============================================
                EN-TÊTE DE PAGE
                ============================================ */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Tableau de bord du Secrétaire Général
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-epo-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-epo-green-500" />
                            En service
                        </span>
                        <span className="text-epo-slate-300">·</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-epo-yellow-50 text-epo-yellow-700 text-[11px] font-semibold">
                            <i className="fas fa-user-clock" />
                            Mode intérim inactif
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                    <Button variant="primary" icon="fa-plus">
                        Nouveau
                    </Button>
                </div>
            </div>

            {/* ============================================
                KPI
                ============================================ */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-7">
                {KPIS_SG.map((kpi) => (
                    <KpiCard key={kpi.id} {...kpi} />
                ))}
            </div>

            {/* ============================================
                MATRICE EISENHOWER
                ============================================ */}
            <SectionTitle
                icon="fa-th"
                title="Matrice d'importance / urgence"
                action={{ label: 'Voir tous les dossiers classés', onClick: () => {} }}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-7">
                {MATRIX_EISENHOWER.map((m) => {
                    const style = MATRIX_STYLES[m.variant];
                    return (
                        <div
                            key={m.id}
                            className={`
                                bg-white border border-epo-slate-200 border-l-4
                                ${style.border}
                                rounded-xl p-5 shadow-soft
                                transition hover:shadow-card
                            `}
                        >
                            <div className="text-[12px] font-semibold uppercase tracking-wider text-epo-slate-500 mb-1">
                                {m.title}
                            </div>
                            <div className={`text-2xl font-bold ${style.count}`}>
                                {m.count}
                            </div>
                            <div className="text-[13px] text-epo-slate-500 mt-1">
                                {m.sub}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ============================================
                TABLEAU DES DOSSIERS
                ============================================ */}
            <SectionTitle
                icon="fa-list"
                title="Dossiers en attente d'action"
                action={{ label: 'Voir tous', onClick: () => {} }}
            />

            <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft mb-7">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-epo-slate-50">
                                {['N° courrier', 'Objet', 'Expéditeur', 'Priorité', 'État', 'Échéance', ''].map((h, i) => (
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
                            {DOSSIERS_SG.map((d) => (
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
                                        {d.expediteur}
                                    </td>
                                    <td className="px-4 py-3">
                                        <PriorityTag priority={d.priorite} />
                                    </td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={d.etat} />
                                    </td>
                                    <td className={`px-4 py-3 font-semibold ${ECHEANCE_COLORS[d.echeanceColor]}`}>
                                        {d.echeance}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => setSelectedDossier(d)}
                                            className="text-[13px] font-medium text-epo-green-600 hover:underline"
                                        >
                                            Consulter
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-3 border-t border-epo-slate-200 text-[13px] text-epo-slate-500">
                    <span>Affichage de 6 dossiers sur 28</span>
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
                            3
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
                    {ACTIVITES_RECENTES_SG.map((a, i) => (
                        <div
                            key={a.id}
                            className={`
                                flex gap-3 items-start
                                ${i < ACTIVITES_RECENTES_SG.length - 1 ? 'pb-3 border-b border-epo-slate-100' : ''}
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
                MODALE DE DÉTAIL
                ============================================ */}
            <DossierModal
                dossier={selectedDossier}
                onClose={() => setSelectedDossier(null)}
            />
        </div>
    );
}

/* ============================================================
   MODALE DE DÉTAIL D'UN DOSSIER
   ============================================================ */

function DossierModal({ dossier, onClose }) {
    if (!dossier) return null;

    const d = dossier;

    return (
        <Modal
            open={!!dossier}
            onClose={onClose}
            title={`Dossier ${d.id} - ${d.objet}`}
            titleIcon="fa-file-alt"
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    <Button variant="redOutline" icon="fa-times">
                        Rejeter
                    </Button>
                    <Button variant="primary" icon="fa-check">
                        Valider
                    </Button>
                </>
            }
        >
            {/* Métadonnées */}
            <div className="space-y-0">
                <DetailRow label="Numéro" value={<strong>{d.id}</strong>} />
                <DetailRow label="Objet" value={d.objet} />
                <DetailRow label="Expéditeur" value={d.expediteur} />
                <DetailRow label="Date de réception" value={d.date} />
                <DetailRow
                    label="Priorité / Criticité"
                    value={
                        <div className="flex flex-wrap items-center gap-2">
                            <PriorityTag priority={d.priorite} />
                            <CriticiteBadge criticite={d.criticite} />
                        </div>
                    }
                />
                <DetailRow
                    label="État"
                    value={
                        <div className="flex flex-wrap items-center gap-2">
                            <StatusBadge status={d.etat} />
                            {d.archive && <IntegrityBadge />}
                        </div>
                    }
                />
                <DetailRow label="Description" value={d.description} />
                <DetailRow
                    label="Localisation courante"
                    value={
                        <span className="inline-flex items-center gap-1.5">
                            <i className="fas fa-map-marker-alt text-epo-green-500" />
                            {d.timeline[d.timeline.length - 1].user}
                        </span>
                    }
                />
                <DetailRow
                    label="Fonds de dossier"
                    value={
                        <div className="flex flex-wrap gap-2">
                            {(d.pieces || []).map((p, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-epo-slate-100 text-[12px] text-epo-slate-700"
                                >
                                    <i className="fas fa-paperclip text-epo-slate-400" />
                                    {p}
                                </span>
                            ))}
                        </div>
                    }
                    last
                />
            </div>

            {/* Bloc anti-blackout */}
            <div className="p-4 mt-5 border rounded-lg bg-epo-green-50 border-epo-green-200">
                <h4 className="text-[12.5px] font-semibold text-epo-green-700 mb-2 flex items-center gap-2">
                    <i className="fas fa-shield-alt" />
                    Blocage du black-out post-visa - 3 mécanismes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11.5px] text-epo-slate-700">
                    <div>
                        <i className="fas fa-check-square text-epo-green-500 mr-1.5" />
                        Coche SP-DG :{' '}
                        {d.etat === 'Signé'
                            ? 'Signé'
                            : d.etat === 'Rejeté DG'
                            ? 'Rejeté'
                            : 'En attente'}
                    </div>
                    <div>
                        <i className="fas fa-bell text-epo-green-500 mr-1.5" />
                        Notification SG active
                    </div>
                    <div>
                        <i className="fas fa-stream text-epo-green-500 mr-1.5" />
                        Timeline complète ci-dessous
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="pt-5 mt-6 border-t border-epo-slate-200">
                <h4 className="text-[15px] font-semibold text-epo-slate-800 mb-3 flex items-center gap-2">
                    <i className="fas fa-stream text-epo-green-600" />
                    Historique du traitement
                </h4>
                <Timeline items={d.timeline} />
            </div>
        </Modal>
    );
}

/* ============================================================
   LIGNE DE DÉTAIL (helper interne)
   ============================================================ */

function DetailRow({ label, value, last = false }) {
    return (
        <div
            className={`
                flex flex-col sm:flex-row gap-1 sm:gap-4 py-3
                ${!last ? 'border-b border-epo-slate-100' : ''}
            `}
        >
            <div className="w-full sm:w-40 flex-shrink-0 text-[13px] font-medium text-epo-slate-500">
                {label}
            </div>
            <div className="flex-1 text-sm text-epo-slate-800">{value}</div>
        </div>
    );
}