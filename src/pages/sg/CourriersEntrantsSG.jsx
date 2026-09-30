import { useState, useMemo } from 'react';
import {
    KpiCard,
    StatusBadge,
    PriorityTag,
    SectionTitle,
    Button,
    Modal,
    ChipCheckGrid,
    CircuitVertical,
    IntegrityBadge,
} from '../../components/ui';
import {
    KPIS_ENTRANTS,
    COURRIERS_ENTRANTS,
    ETATS_ENTRANT,
    IMPUTATION_CODES,
    TYPES_TRAITEMENT,
} from '../../data/courriersEntrants.js';

/* ============================================================
   COULEURS D'ÉCHÉANCE
   ============================================================ */
const ECHEANCE_COLORS = {
    red: 'text-epo-red-600',
    amber: 'text-epo-yellow-700',
    green: 'text-epo-green-600',
    slate: 'text-epo-slate-500',
};

/* ============================================================
   PAGE
   ============================================================ */
export default function CourriersEntrantsSG() {
    const [selected, setSelected] = useState(null);

    return (
        <div>
            {/* En-tête */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Courriers entrants
                    </h1>
                    <p className="mt-1 text-sm text-epo-slate-500">
                        Instruction, imputation et suivi - circuit{' '}
                        <span className="font-mono text-epo-slate-600">
                            SCC → SP-SG → SG → SP-DG → DG → SG → SCC
                        </span>
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter le registre
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-7">
                {KPIS_ENTRANTS.map((kpi) => (
                    <KpiCard key={kpi.id} {...kpi} />
                ))}
            </div>

            {/* Table */}
            <SectionTitle icon="fa-list" title="Registre des arrivées" />

            <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft mb-7">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-epo-slate-50">
                                {[
                                    "N° arrivée",
                                    "Objet",
                                    "Origine",
                                    "Classification",
                                    "État",
                                    "Échéance",
                                    "",
                                ].map((h, i) => (
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
                            {COURRIERS_ENTRANTS.map((d) => (
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
                                        {d.origine}
                                    </td>
                                    <td className="px-4 py-3">
                                        <PriorityTag priority={d.classification} />
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <StatusBadge status={d.etat} />
                                            {d.archive && <IntegrityBadge />}
                                        </div>
                                    </td>
                                    <td
                                        className={`px-4 py-3 font-semibold ${
                                            ECHEANCE_COLORS[d.echeanceColor]
                                        }`}
                                    >
                                        {d.echeance}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => setSelected(d)}
                                            className="text-[13px] font-medium text-epo-green-600 hover:underline"
                                        >
                                            Traiter
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-3 border-t border-epo-slate-200 text-[13px] text-epo-slate-500">
                    <span>Affichage de 8 dossiers sur 12</span>
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

            {/* Modale fiche d'accompagnement */}
            <FicheAccompagnementModal
                courrier={selected}
                onClose={() => setSelected(null)}
            />
        </div>
    );
}

/* ============================================================
   MODALE - Fiche d'accompagnement
   ============================================================ */
function FicheAccompagnementModal({ courrier, onClose }) {
    const [imputation, setImputation] = useState([]);
    const [traitement, setTraitement] = useState([]);
    const [ras, setRas] = useState(false);
    const [observations, setObservations] = useState('');

    // Réinitialiser quand on change de courrier
    useMemo(() => {
        setImputation([]);
        setTraitement([]);
        setRas(false);
        setObservations('');
    }, [courrier?.id]);

    if (!courrier) return null;

    const handleTransmettreDG = () => {
        alert(
            'Dossier transmis au SP-DG puis au DG pour décision (section 9.1, étapes 5-6).'
        );
        onClose();
    };

    const handleImputer = () => {
        if (!imputation.length) {
            alert(
                "Sélectionnez au moins une structure d'imputation (ou cochez RAS)."
            );
            return;
        }
        alert(
            `Dossier imputé à : ${imputation.join(', ')}.\n\n` +
                `Le SCC va assurer le dispatch (RG-16).`
        );
        onClose();
    };

    const handleSatisfait = () => {
        alert(
            "Dossier marqué « Objet satisfait » - l'action attendue a été transmise."
        );
        onClose();
    };

    const handleRasChange = (checked) => {
        setRas(checked);
        if (checked) {
            setImputation([]);
            setTraitement([]);
        }
    };

    return (
        <Modal
            open={!!courrier}
            onClose={onClose}
            title="Fiche d'accompagnement du courrier arrivée"
            titleIcon="fa-file-alt"
            size="xl"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button variant="outline" icon="fa-check-double" onClick={handleSatisfait}>
                        Objet satisfait
                    </Button>
                    <Button
                        variant="greenOutline"
                        icon="fa-route"
                        onClick={handleImputer}
                        disabled={ras && !imputation.length ? false : false}
                    >
                        Imputer directement
                    </Button>
                    <Button variant="primary" icon="fa-paper-plane" onClick={handleTransmettreDG}>
                        Transmettre au DG
                    </Button>
                </>
            }
        >
            {/* Bandeau d'en-tête du courrier */}
            <div className="bg-epo-slate-50 border border-epo-slate-200 rounded-lg px-4 py-3.5 mb-5">
                <div className="flex gap-6 flex-wrap mb-1.5 text-[12.5px]">
                    <div>
                        <span className="mr-1 font-medium text-epo-slate-400">
                            Arrivée et enregistré S/N°
                        </span>
                        <span className="font-semibold text-epo-slate-800">
                            {courrier.id}
                        </span>
                    </div>
                    <div>
                        <span className="mr-1 font-medium text-epo-slate-400">
                            Origine
                        </span>
                        <span className="font-semibold text-epo-slate-800">
                            {courrier.origine}
                        </span>
                    </div>
                </div>
                <div className="flex gap-6 flex-wrap mb-1.5 text-[12.5px]">
                    <div>
                        <span className="mr-1 font-medium text-epo-slate-400">
                            Classification
                        </span>
                        <span className="font-semibold text-epo-slate-800">
                            {courrier.classification}
                        </span>
                    </div>
                    <div>
                        <span className="mr-1 font-medium text-epo-slate-400">
                            Échéance
                        </span>
                        <span className="font-semibold text-epo-slate-800">
                            {courrier.echeance}
                        </span>
                    </div>
                </div>
                <div className="text-[12.5px]">
                    <span className="mr-1 font-medium text-epo-slate-400">Objet</span>
                    <span className="font-semibold text-epo-slate-800">
                        {courrier.objet}
                    </span>
                </div>
            </div>

            {/* Layout deux colonnes */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5">
                {/* Colonne gauche : instructions */}
                <div>
                    <div className="p-4 mb-4 border border-blue-100 rounded-lg bg-blue-50">
                        <h4 className="text-[13px] font-bold text-blue-700 mb-2.5 flex items-center gap-2">
                            <i className="fas fa-user-shield" />
                            Instructions du Secrétaire Général
                        </h4>

                        {/* Imputation */}
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-epo-slate-500 mb-2">
                            Imputation
                        </div>
                        <ChipCheckGrid
                            options={IMPUTATION_CODES}
                            selected={imputation}
                            onChange={setImputation}
                            columns={4}
                            disabled={ras}
                        />

                        {/* Type de traitement */}
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-epo-slate-500 mt-3 mb-2">
                            Type de traitement
                        </div>
                        <ChipCheckGrid
                            options={TYPES_TRAITEMENT}
                            selected={traitement}
                            onChange={setTraitement}
                            columns={2}
                            disabled={ras}
                        />

                        {/* RAS */}
                        <label className="flex items-center gap-2 mt-3 px-3 py-2 bg-epo-yellow-50 border border-epo-yellow-200 rounded-md text-[12.5px] text-epo-yellow-800 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={ras}
                                onChange={(e) => handleRasChange(e.target.checked)}
                                className="accent-epo-yellow-500"
                            />
                            <span>
                                <strong>RAS</strong> - Rien à signaler (RG-16 : classe
                                directement le dossier sans imputation)
                            </span>
                        </label>

                        {/* Observations */}
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-epo-slate-500 mt-3 mb-1.5">
                            Observations
                        </div>
                        <textarea
                            value={observations}
                            onChange={(e) => setObservations(e.target.value)}
                            rows={3}
                            placeholder="Observations finales du SG…"
                            className="w-full border border-epo-slate-300 rounded-lg px-3 py-2.5 text-[13px] text-epo-slate-800 resize-y outline-none transition focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/20"
                        />
                    </div>

                    {/* Fonds de dossier */}
                    <div className="mb-3.5">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-epo-slate-500 mb-2">
                            Fonds de dossier
                        </div>
                        {courrier.pieces.length ? (
                            <div className="flex flex-wrap gap-2">
                                {courrier.pieces.map((p, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-epo-slate-100 text-[12px] text-epo-slate-700"
                                    >
                                        <i className="fas fa-paperclip text-epo-slate-400" />
                                        {p}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <span className="text-[12px] text-epo-slate-400 italic">
                                Aucune pièce jointe.
                            </span>
                        )}
                    </div>
                </div>

                {/* Colonne droite : circuit vertical */}
                <div>
                    <h4 className="text-[12px] font-semibold uppercase tracking-wider text-epo-slate-500 mb-2.5">
                        Circuit du dossier
                    </h4>
                    <CircuitVertical
                        etats={ETATS_ENTRANT}
                        current={courrier.etat}
                    />
                </div>
            </div>
        </Modal>
    );
}