import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    KpiCard,
    StatusBadge,
    PriorityTag,
    SectionTitle,
    Button,
    Modal,
    EmptyState,
} from '../../components/ui';
import { KPIS_SORTANTS, COURRIERS_SORTANTS } from '../../data/courriersSortants.js';

/* ============================================================
   COULEURS DE CRITICITÉ
   ============================================================ */
const CRITICITE_COLORS = {
    red: 'text-epo-red-600',
    amber: 'text-epo-yellow-700',
    green: 'text-epo-green-600',
    slate: 'text-epo-slate-500',
};

/* ============================================================
   PAGE
   ============================================================ */
export default function CourriersSortantsSG() {
    const [selectedSuivi, setSelectedSuivi] = useState(null);
    const [nouveauOpen, setNouveauOpen] = useState(false);

    return (
        <div>
            {/* En-tête */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Courriers sortants
                    </h1>
                    <p className="mt-1 text-sm text-epo-slate-500">
                        Rédaction, amendement et circuit de signature -{' '}
                        <span className="font-mono text-epo-slate-600">
                            Direction → SG → « Vu bon à signer » → DG → SCC → Liaison
                        </span>
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                    <Button variant="primary" icon="fa-plus" onClick={() => setNouveauOpen(true)}>
                        Nouveau
                    </Button>
                </div>
            </div>

            {/* KPI */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-7">
                {KPIS_SORTANTS.map((kpi) => (
                    <KpiCard key={kpi.id} {...kpi} />
                ))}
            </div>

            {/* Bandeau anti-blackout */}
            <div className="px-4 py-3 mb-5 border rounded-lg bg-epo-green-50 border-epo-green-200">
                <h4 className="text-[12.5px] font-semibold text-epo-green-700 mb-1 flex items-center gap-2">
                    <i className="fas fa-shield-alt" />
                    Blocage du black-out post-visa actif
                </h4>
                <p className="text-[11.5px] text-epo-slate-700">
                    Chaque dossier « Vu bon à signer » ou « Chez DG » est suivi ici jusqu'à la coche SP-DG (signé / rejeté) - vous ne pouvez plus perdre la visibilité d'un dossier après votre validation.
                </p>
            </div>

            {/* Tableau */}
            <SectionTitle icon="fa-list" title="Registre des départs" />

            <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft mb-7">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-epo-slate-50">
                                {['N°', 'Objet', 'Destinataire', 'Classification', 'État', 'Criticité', ''].map((h, i) => (
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
                            {COURRIERS_SORTANTS.map((d) => (
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
                                        {d.destinataire}
                                    </td>
                                    <td className="px-4 py-3">
                                        <PriorityTag priority={d.classification} />
                                    </td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={d.etat} />
                                    </td>
                                    <td
                                        className={`px-4 py-3 text-[12px] ${CRITICITE_COLORS[d.criticiteColor]}`}
                                    >
                                        {d.criticite}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => setSelectedSuivi(d)}
                                            className="text-[13px] font-medium text-epo-green-600 hover:underline"
                                        >
                                            Suivre
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-3 border-t border-epo-slate-200 text-[13px] text-epo-slate-500">
                    <span>Affichage de 8 dossiers sur 19</span>
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

            {/* Modal suivi rapide */}
            <SuiviModal
                courrier={selectedSuivi}
                onClose={() => setSelectedSuivi(null)}
            />

            {/* Modal nouveau - redirige vers l'éditeur complet */}
            <NouveauModal
                open={nouveauOpen}
                onClose={() => setNouveauOpen(false)}
            />
        </div>
    );
}

/* ============================================================
   MODALE - Suivi rapide (aperçu circuit + fonds de dossier)
   ============================================================ */
function SuiviModal({ courrier, onClose }) {
    const navigate = useNavigate();
    if (!courrier) return null;

    const d = courrier;

    return (
        <Modal
            open={!!courrier}
            onClose={onClose}
            title={`Suivi - ${d.id}`}
            titleIcon="fa-paper-plane"
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    <Button
                        variant="primary"
                        icon="fa-pen"
                        onClick={() => navigate(`/sg/courriers-sortants/${d.id}`)}
                    >
                        Ouvrir la rédaction complète
                    </Button>
                </>
            }
        >
            {/* En-tête */}
            <div className="bg-epo-slate-50 border border-epo-slate-200 rounded-lg px-4 py-3.5 mb-5">
                <div className="flex gap-6 flex-wrap mb-1.5 text-[12.5px]">
                    <div>
                        <span className="mr-1 font-medium text-epo-slate-400">N°</span>
                        <span className="font-semibold text-epo-slate-800">{d.id}</span>
                    </div>
                    <div>
                        <span className="mr-1 font-medium text-epo-slate-400">Destinataire</span>
                        <span className="font-semibold text-epo-slate-800">{d.destinataire}</span>
                    </div>
                </div>
                <div className="flex gap-6 flex-wrap mb-1.5 text-[12.5px]">
                    <div>
                        <span className="mr-1 font-medium text-epo-slate-400">Classification</span>
                        <span className="font-semibold text-epo-slate-800">{d.classification}</span>
                    </div>
                    <div>
                        <span className="mr-1 font-medium text-epo-slate-400">Criticité</span>
                        <span className="font-semibold text-epo-slate-800">{d.criticite}</span>
                    </div>
                </div>
                <div className="text-[12.5px]">
                    <span className="mr-1 font-medium text-epo-slate-400">Objet</span>
                    <span className="font-semibold text-epo-slate-800">{d.objet}</span>
                </div>
            </div>

            {/* Motif de rejet si applicable */}
            {d.motif && (
                <div className="bg-epo-red-50 border border-epo-red-200 text-epo-red-700 rounded-lg px-4 py-3 text-[12.5px] mb-4">
                    <i className="fas fa-exclamation-triangle mr-1.5" />
                    <strong>Motif du rejet (RG-19) :</strong> {d.motif}
                </div>
            )}

            {/* Fonds de dossier */}
            <div className="mb-5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-epo-slate-500 mb-2">
                    Fonds de dossier
                    {d.reponse && (
                        <span className="ml-2 font-medium normal-case text-epo-yellow-700">
                            (RG-15 - obligatoire, réponse à un entrant)
                        </span>
                    )}
                </div>
                {d.pieces.length ? (
                    <div className="flex flex-wrap gap-2">
                        {d.pieces.map((p, i) => (
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
        </Modal>
    );
}

/* ============================================================
   MODALE - Nouveau courrier sortant (formulaire simplifié)
   ============================================================ */
function NouveauModal({ open, onClose }) {
    const navigate = useNavigate();
    const [objet, setObjet] = useState('');
    const [destinataire, setDestinataire] = useState('');
    const [classification, setClassification] = useState('Ordinaire');
    const [criticite, setCriticite] = useState('Dans les délais');
    const [isReponse, setIsReponse] = useState(false);
    const [entrantRef, setEntrantRef] = useState('2026-0452');

    const handleCreate = () => {
        if (!objet.trim() || !destinataire.trim()) {
            alert("L'objet et le destinataire sont obligatoires.");
            return;
        }

        // Dans une vraie app : appel API + redirection avec l'ID créé
        // Ici, on simule la redirection vers l'éditeur complet
        onClose();

        // Reset
        setObjet('');
        setDestinataire('');
        setClassification('Ordinaire');
        setCriticite('Dans les délais');
        setIsReponse(false);
        setEntrantRef('2026-0452');

        // Redirection vers la page de rédaction
        navigate('/sg/courriers-sortants/DEP-2026-0410');
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Nouveau courrier sortant"
            titleIcon="fa-plus"
            size="md"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button
                        variant="primary"
                        icon="fa-arrow-right"
                        onClick={handleCreate}
                    >
                        Créer et ouvrir l'éditeur
                    </Button>
                </>
            }
        >
            <div className="space-y-4">
                {/* Objet */}
                <div>
                    <label className="block text-[13px] font-medium text-epo-slate-700 mb-1.5">
                        Objet <span className="text-epo-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={objet}
                        onChange={(e) => setObjet(e.target.value)}
                        placeholder="Objet du courrier sortant"
                        className="w-full px-3 py-2.5 border border-epo-slate-300 rounded-lg text-sm outline-none transition focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/20"
                    />
                </div>

                {/* Destinataire + Classification */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-[13px] font-medium text-epo-slate-700 mb-1.5">
                            Destinataire <span className="text-epo-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={destinataire}
                            onChange={(e) => setDestinataire(e.target.value)}
                            placeholder="Nom ou structure destinataire"
                            className="w-full px-3 py-2.5 border border-epo-slate-300 rounded-lg text-sm outline-none transition focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/20"
                        />
                    </div>
                    <div>
                        <label className="block text-[13px] font-medium text-epo-slate-700 mb-1.5">
                            Classification <span className="text-epo-red-500">*</span>
                        </label>
                        <select
                            value={classification}
                            onChange={(e) => setClassification(e.target.value)}
                            className="w-full px-3 py-2.5 border border-epo-slate-300 rounded-lg text-sm outline-none transition focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/20"
                        >
                            <option>Ordinaire</option>
                            <option>Urgent</option>
                            <option>Confidentiel / réservé</option>
                        </select>
                    </div>
                </div>

                {/* Initiateur + Criticité */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-[13px] font-medium text-epo-slate-700 mb-1.5">
                            Initiateur
                        </label>
                        <input
                            type="text"
                            value="Secrétaire Général"
                            disabled
                            className="w-full px-3 py-2.5 border border-epo-slate-200 rounded-lg text-sm bg-epo-slate-50 text-epo-slate-500"
                        />
                    </div>
                    <div>
                        <label className="block text-[13px] font-medium text-epo-slate-700 mb-1.5">
                            Criticité temporelle
                        </label>
                        <select
                            value={criticite}
                            onChange={(e) => setCriticite(e.target.value)}
                            className="w-full px-3 py-2.5 border border-epo-slate-300 rounded-lg text-sm outline-none transition focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/20"
                        >
                            <option>Dans les délais</option>
                            <option>Échéance proche</option>
                            <option>Échéance critique</option>
                        </select>
                    </div>
                </div>

                {/* Case réponse */}
                <label className="flex items-start gap-2.5 px-3.5 py-2.5 bg-blue-50 border border-blue-100 rounded-lg text-[12.5px] text-blue-700 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isReponse}
                        onChange={(e) => setIsReponse(e.target.checked)}
                        className="mt-0.5 accent-blue-500"
                    />
                    <span>
                        Ce courrier est une <strong>réponse à un courrier entrant</strong>{' '}
                        (RG-15 - le fonds de dossier sera obligatoire)
                    </span>
                </label>

                {/* Référence courrier entrant */}
                {isReponse && (
                    <div>
                        <label className="block text-[13px] font-medium text-epo-slate-700 mb-1.5">
                            Courrier d'origine
                        </label>
                        <select
                            value={entrantRef}
                            onChange={(e) => setEntrantRef(e.target.value)}
                            className="w-full px-3 py-2.5 border border-epo-slate-300 rounded-lg text-sm outline-none transition focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/20"
                        >
                            <option value="2026-0452">
                                2026-0452 - Demande de subvention exceptionnelle
                            </option>
                            <option value="2026-0431">
                                2026-0431 - Convocation - comité de direction
                            </option>
                            <option value="2026-0410">
                                2026-0410 - Demande de stage - étudiant IGIT
                            </option>
                        </select>
                    </div>
                )}

                <p className="text-[11.5px] text-epo-slate-400 italic">
                    Le brouillon sera créé à l'état « Brouillon ». Vous serez ensuite redirigé vers l'éditeur complet pour rédiger le contenu, joindre les pièces et soumettre au SHI.
                </p>
            </div>
        </Modal>
    );
}