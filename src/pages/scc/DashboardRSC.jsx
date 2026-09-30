// src/pages/rsc/DashboardRSC.jsx
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
import { KPIS_RSC } from '../../data/kpi.js';
import { MATRIX_EISENHOWER_RSC } from '../../data/matrix.js';
import { DOSSIERS_RSC } from '../../data/dossiers.js';
import { ACTIVITES_RECENTES_RSC } from '../../data/activites.js';
import { ARRIVEES_RSC } from '../../data/arrivees.js';

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
    teal: 'bg-epo-teal-50 text-epo-teal-500',
    purple: 'bg-epo-purple-50 text-epo-purple-500',
};

/* ============================================================
   PAGE
   ============================================================ */

export default function DashboardRSC() {
    const [selectedDossier, setSelectedDossier] = useState(null);
    const [selectedArrivee, setSelectedArrivee] = useState(null);
    const [modalEnregistrement, setModalEnregistrement] = useState(false);
    const [modalDispatch, setModalDispatch] = useState(null);

    return (
        <div>
            {/* ============================================
                EN-TÊTE DE PAGE
                ============================================ */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Tableau de bord du Responsable Service Courrier
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-epo-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-epo-green-500" />
                            12 agents en service
                        </span>
                        <span className="text-epo-slate-300">·</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-epo-teal-50 text-epo-teal-600 text-[11px] font-semibold">
                            <i className="fas fa-camera" />
                            Scan disponible
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                    <Button
                        variant="primary"
                        icon="fa-plus"
                        onClick={() => setModalEnregistrement(true)}
                    >
                        Enregistrer un courrier
                    </Button>
                </div>
            </div>

            {/* ============================================
                KPI
                ============================================ */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-7">
                {KPIS_RSC.map((kpi) => (
                    <KpiCard key={kpi.id} {...kpi} />
                ))}
            </div>

            {/* ============================================
                ACTIONS RAPIDES
                ============================================ */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 mb-7">
                <QuickAction
                    icon="fa-plus-circle"
                    label="Nouvelle arrivée"
                    badge="Enregistrement rapide"
                    onClick={() => setModalEnregistrement(true)}
                />
                <QuickAction
                    icon="fa-camera"
                    label="Numériser"
                    badge="3 documents en attente"
                    onClick={() => {}}
                />
                <QuickAction
                    icon="fa-arrows-alt-h"
                    label="Dispatcher"
                    badge="6 courriers à répartir"
                    onClick={() => setModalDispatch({ id: 'quick' })}
                />
                <QuickAction
                    icon="fa-people-arrows"
                    label="Gérer les tournées"
                    badge="3 agents disponibles"
                    onClick={() => {}}
                />
                <QuickAction
                    icon="fa-print"
                    label="Reproduction"
                    badge="Chrono en cours"
                    onClick={() => {}}
                />
            </div>

            {/* ============================================
                TABLEAU : COURRIERS À DISPATCHER
                ============================================ */}
            <SectionTitle
                icon="fa-exchange-alt"
                title="Courriers à dispatcher"
                action={{ label: 'Voir tous', onClick: () => {} }}
            />

            <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft mb-7">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-epo-slate-50">
                                {['N°', 'Objet', 'Expéditeur', 'Priorité', 'État', 'Attente', ''].map((h, i) => (
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
                            {DOSSIERS_RSC.map((d) => (
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
                                            onClick={() => setModalDispatch(d)}
                                            className="text-[13px] font-medium text-epo-green-600 hover:underline"
                                        >
                                            Dispatcher
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-3 border-t border-epo-slate-200 text-[13px] text-epo-slate-500">
                    <span>4 courriers à dispatcher sur 6</span>
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
                TABLEAU : DERNIÈRES ARRIVÉES
                ============================================ */}
            <SectionTitle
                icon="fa-inbox"
                title="Dernières arrivées"
                action={{ label: 'Voir toutes', onClick: () => {} }}
            />

            <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft mb-7">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-epo-slate-50">
                                {['N°', 'Objet', 'Expéditeur', 'Arrivée', 'Statut', ''].map((h, i) => (
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
                            {ARRIVEES_RSC.map((a) => (
                                <tr
                                    key={a.id}
                                    className="transition border-t border-epo-slate-100 hover:bg-epo-slate-50"
                                >
                                    <td className="px-4 py-3 font-semibold text-epo-slate-800">
                                        {a.id}
                                    </td>
                                    <td className="max-w-xs px-4 py-3 truncate text-epo-slate-700">
                                        {a.objet}
                                    </td>
                                    <td className="px-4 py-3 text-epo-slate-600">
                                        {a.expediteur}
                                    </td>
                                    <td className="px-4 py-3 text-epo-slate-600">
                                        {a.heure}
                                    </td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={a.statut} />
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => setSelectedArrivee(a)}
                                            className="text-[13px] font-medium text-epo-green-600 hover:underline"
                                        >
                                            Voir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-3 border-t border-epo-slate-200 text-[13px] text-epo-slate-500">
                    <span>Affichage des 4 dernières arrivées</span>
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
                title="Activité du Service Courrier"
                action={{ label: 'Voir tout', onClick: () => {} }}
            />

            <div className="p-5 bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                <div className="flex flex-col gap-3">
                    {ACTIVITES_RECENTES_RSC.map((a, i) => (
                        <div
                            key={a.id}
                            className={`
                                flex gap-3 items-start
                                ${i < ACTIVITES_RECENTES_RSC.length - 1 ? 'pb-3 border-b border-epo-slate-100' : ''}
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
                MODALES
                ============================================ */}
            <ModalEnregistrement
                open={modalEnregistrement}
                onClose={() => setModalEnregistrement(false)}
            />

            <ModalDispatch
                dossier={modalDispatch}
                onClose={() => setModalDispatch(null)}
            />

            <ArriveeModal
                arrivee={selectedArrivee}
                onClose={() => setSelectedArrivee(null)}
            />
        </div>
    );
}

/* ============================================================
   QUICK ACTION
   ============================================================ */

function QuickAction({ icon, label, badge, onClick }) {
    return (
        <button
            onClick={onClick}
            className="
                bg-white border border-epo-slate-200 rounded-lg p-4 text-center
                cursor-pointer transition hover:shadow-card hover:-translate-y-0.5
                hover:border-epo-green-500 shadow-soft
            "
        >
            <i className={`fas ${icon} text-2xl text-epo-green-500 mb-1.5 block`} />
            <div className="text-[13px] font-medium text-epo-slate-700">{label}</div>
            <div className="text-[10px] font-semibold text-epo-slate-400 mt-0.5">
                {badge}
            </div>
        </button>
    );
}

/* ============================================================
   MODALE : ENREGISTREMENT COURRIER
   ============================================================ */

function ModalEnregistrement({ open, onClose }) {
    if (!open) return null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Enregistrer un courrier entrant"
            titleIcon="fa-plus"
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button variant="primary" icon="fa-save">
                        Enregistrer
                    </Button>
                </>
            }
        >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormGroup label="Expéditeur" required>
                    <input
                        type="text"
                        placeholder="Nom ou structure"
                        className="w-full px-3.5 py-2.5 border border-epo-slate-300 rounded-lg text-sm focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </FormGroup>
                <FormGroup label="Date du document" required>
                    <input
                        type="date"
                        className="w-full px-3.5 py-2.5 border border-epo-slate-300 rounded-lg text-sm focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                    />
                </FormGroup>
            </div>

            <FormGroup label="Objet" required>
                <input
                    type="text"
                    placeholder="Objet du courrier"
                    className="w-full px-3.5 py-2.5 border border-epo-slate-300 rounded-lg text-sm focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10"
                />
            </FormGroup>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormGroup label="Classification" required>
                    <select className="w-full px-3.5 py-2.5 border border-epo-slate-300 rounded-lg text-sm focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10">
                        <option value="">Sélectionner...</option>
                        <option value="ordinaire">Ordinaire</option>
                        <option value="urgent">Urgent</option>
                        <option value="confidentiel">Confidentiel / Réservé</option>
                    </select>
                </FormGroup>
                <FormGroup label="Type" required>
                    <select className="w-full px-3.5 py-2.5 border border-epo-slate-300 rounded-lg text-sm focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10">
                        <option value="">Sélectionner...</option>
                        <option value="lettre">Lettre</option>
                        <option value="decision">Décision</option>
                        <option value="circulaire">Circulaire</option>
                        <option value="facture">Facture</option>
                        <option value="demande">Demande</option>
                        <option value="convention">Convention</option>
                    </select>
                </FormGroup>
            </div>

            <FormGroup label="Pièces jointes">
                <div className="p-8 text-center transition border-2 border-dashed rounded-lg cursor-pointer border-epo-slate-300 text-epo-slate-500 hover:border-epo-green-500 hover:bg-epo-green-50">
                    <i className="block mb-2 text-3xl fas fa-cloud-upload-alt text-epo-slate-400" />
                    <div className="text-sm">
                        Glissez-déposez les fichiers ici ou cliquez pour parcourir
                    </div>
                    <div className="text-[12px] text-epo-slate-400 mt-1">
                        PDF, Word, Excel, JPG - Max 10 Mo
                    </div>
                </div>
            </FormGroup>

            <FormGroup label="Observations">
                <textarea
                    rows={2}
                    placeholder="Informations complémentaires..."
                    className="w-full px-3.5 py-2.5 border border-epo-slate-300 rounded-lg text-sm focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10 resize-y"
                />
            </FormGroup>
        </Modal>
    );
}

/* ============================================================
   MODALE : DISPATCH
   ============================================================ */

function ModalDispatch({ dossier, onClose }) {
    if (!dossier) return null;

    return (
        <Modal
            open={!!dossier}
            onClose={onClose}
            title="Dispatcher un courrier"
            titleIcon="fa-exchange-alt"
            size="md"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button variant="primary" icon="fa-check">
                        Dispatcher
                    </Button>
                </>
            }
        >
            {dossier.id !== 'quick' && (
                <div className="p-4 mb-4 rounded-lg bg-epo-slate-50">
                    <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                        <span>
                            <strong className="font-medium text-epo-slate-500">N°</strong>{' '}
                            <span className="font-semibold text-epo-slate-800">{dossier.id}</span>
                        </span>
                        <span className="text-epo-slate-600">{dossier.objet}</span>
                        <PriorityTag priority={dossier.priorite} />
                    </div>
                </div>
            )}

            <FormGroup label="Service destinataire" required>
                <select className="w-full px-3.5 py-2.5 border border-epo-slate-300 rounded-lg text-sm focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10">
                    <option value="">Sélectionner...</option>
                    <option value="sg">Secrétariat Général</option>
                    <option value="dga-ave">DGA-AVE</option>
                    <option value="dga-rcp">DGA-RCP</option>
                    <option value="daf">DAF</option>
                    <option value="drh">DRH</option>
                    <option value="deps">DEPS</option>
                    <option value="dsi">DSI</option>
                    <option value="prmp">PRMP</option>
                </select>
            </FormGroup>

            <FormGroup label="Observations">
                <textarea
                    rows={2}
                    placeholder="Instructions particulières..."
                    className="w-full px-3.5 py-2.5 border border-epo-slate-300 rounded-lg text-sm focus:outline-none focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/10 resize-y"
                />
            </FormGroup>
        </Modal>
    );
}

/* ============================================================
   MODALE : DÉTAIL ARRIVÉE
   ============================================================ */

function ArriveeModal({ arrivee, onClose }) {
    if (!arrivee) return null;

    return (
        <Modal
            open={!!arrivee}
            onClose={onClose}
            title={`Courrier ${arrivee.id}`}
            titleIcon="fa-inbox"
            size="md"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" icon="fa-exchange-alt">
                        Dispatcher
                    </Button>
                </>
            }
        >
            <DetailRow label="Numéro" value={<strong>{arrivee.id}</strong>} />
            <DetailRow label="Objet" value={arrivee.objet} />
            <DetailRow label="Expéditeur" value={arrivee.expediteur} />
            <DetailRow label="Heure d'arrivée" value={arrivee.heure} />
            <DetailRow
                label="Statut"
                value={<StatusBadge status={arrivee.statut} />}
            />
            <DetailRow
                label="Priorité"
                value={<PriorityTag priority={arrivee.priorite} />}
                last
            />
        </Modal>
    );
}

/* ============================================================
   HELPERS
   ============================================================ */

function FormGroup({ label, required, children }) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-epo-slate-700 mb-1.5">
                {label}
                {required && <span className="ml-1 text-epo-red-500">*</span>}
            </label>
            {children}
        </div>
    );
}

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