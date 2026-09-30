import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Button,
    Modal,
    CircuitHorizontal,
    IntegrityBadge,
} from '../../components/ui';
import { ETAPES_SORTANT, DEPART_DETAIL } from '../../data/courriersSortants.js';

/* ============================================================
   PAGE
   ============================================================ */
export default function RedactionCourrierSG() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Pour l'exemple, on utilise DEPART_DETAIL. En vrai : fetch(id)
    const dossier = { ...DEPART_DETAIL, id: id || DEPART_DETAIL.id };

    // État contrôlé du contenu de l'éditeur
    const editorRef = useRef(null);
    const [dirty, setDirty] = useState(false);

    // Commentaires
    const [commentaires, setCommentaires] = useState(dossier.commentaires);
    const [typeCommentaire, setTypeCommentaire] = useState('fond');
    const [nouveauCommentaire, setNouveauCommentaire] = useState('');

    // Modale de rejet
    const [rejetOpen, setRejetOpen] = useState(false);

    const handleSave = () => {
        setDirty(false);
        alert('Brouillon enregistré avec succès.\n\nVersion 3 - ' + new Date().toLocaleString('fr-FR'));
    };

    const handleSubmitSHI = () => {
        alert(
            'Document soumis au Supérieur Hiérarchique Immédiat (SHI).\n\nLe SHI sera notifié pour examen.'
        );
    };

    const handleSendCommentaire = () => {
        if (!nouveauCommentaire.trim()) return;

        const newComment = {
            id: 'c_' + Date.now(),
            auteur: 'KABORÉ Aminata',
            type: typeCommentaire,
            texte: nouveauCommentaire.trim(),
            date: new Date().toLocaleString('fr-FR'),
        };

        setCommentaires([...commentaires, newComment]);
        setNouveauCommentaire('');
    };

    const commentTypeLabel = {
        fond: 'Fond',
        forme: 'Forme',
        dg: 'DG',
    };

    return (
        <div>
            {/* Fil d'ariane */}
            <div className="flex items-center gap-2 text-[13px] text-epo-slate-500 mb-3">
                <a
                    onClick={() => navigate('/sg/courriers-sortants')}
                    className="cursor-pointer text-epo-green-600 hover:underline"
                >
                    Courriers sortants
                </a>
                <i className="fas fa-chevron-right text-[10px]" />
                <a
                    onClick={() => navigate('/sg/courriers-sortants')}
                    className="cursor-pointer text-epo-green-600 hover:underline"
                >
                    Brouillons
                </a>
                <i className="fas fa-chevron-right text-[10px]" />
                <span>{dossier.id}</span>
            </div>

            {/* En-tête */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        {dossier.objet}
                    </h1>
                    <p className="mt-1 text-sm text-epo-slate-500">
                        {dossier.id} · Version {dossier.version} · Initiateur : {dossier.initiateur}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" icon="fa-history">
                        Historique des versions
                    </Button>
                    <Button variant="outline" icon="fa-eye">
                        Aperçu
                    </Button>
                </div>
            </div>

            {/* Statut du document */}
            <div className="flex flex-wrap items-center gap-4 p-4 mb-5 bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                <div className="flex items-center justify-center flex-shrink-0 text-xl rounded-full w-11 h-11 bg-epo-yellow-50 text-epo-yellow-700">
                    <i className="fas fa-edit" />
                </div>
                <div className="flex-1 min-w-[200px]">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-epo-slate-400">
                        Statut actuel
                    </div>
                    <div className="text-base font-semibold text-epo-slate-900 mt-0.5">
                        {dossier.statutLabel}
                    </div>
                    <div className="text-[13px] text-epo-slate-500 mt-0.5">
                        {dossier.statutDesc}
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button variant="warning" icon="fa-save" onClick={handleSave}>
                        Enregistrer brouillon
                    </Button>
                    <Button variant="primary" icon="fa-arrow-right" onClick={handleSubmitSHI}>
                        Soumettre au SHI
                    </Button>
                </div>
            </div>

            {/* Circuit horizontal */}
            <div className="p-5 mb-5 bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider text-epo-slate-500 mb-4">
                    <i className="fas fa-route text-epo-green-600" />
                    Circuit de validation
                </div>
                <CircuitHorizontal
                    etapes={ETAPES_SORTANT}
                    current={dossier.etat}
                    dates={{
                        'Brouillon': '22/08 09:15',
                        'Soumis SHI': '22/08 14:30',
                    }}
                />
            </div>

            {/* Layout rédaction : éditeur + panneau latéral */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 items-start">
                {/* ============ ÉDITEUR ============ */}
                <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-epo-slate-200 bg-epo-slate-50">
                        <div className="flex items-center gap-2 text-sm font-semibold text-epo-slate-800">
                            <i className="fas fa-file-alt text-epo-green-600" />
                            Contenu du courrier
                        </div>
                        <span className="text-[11px] font-semibold bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full">
                            Version {dossier.version}
                        </span>
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-wrap gap-1 px-4 py-2 bg-white border-b border-epo-slate-200">
                        {[
                            { icon: 'fa-bold', title: 'Gras' },
                            { icon: 'fa-italic', title: 'Italique' },
                            { icon: 'fa-underline', title: 'Souligné' },
                            { divider: true },
                            { icon: 'fa-list-ul', title: 'Liste à puces' },
                            { icon: 'fa-list-ol', title: 'Liste numérotée' },
                            { divider: true },
                            { icon: 'fa-align-left', title: 'Aligner à gauche' },
                            { icon: 'fa-align-center', title: 'Centrer' },
                            { icon: 'fa-align-right', title: 'Aligner à droite' },
                            { icon: 'fa-align-justify', title: 'Justifier' },
                            { divider: true },
                            { icon: 'fa-link', title: 'Insérer un lien' },
                            { icon: 'fa-image', title: 'Insérer une image' },
                        ].map((item, i) =>
                            item.divider ? (
                                <span key={i} className="w-px bg-epo-slate-200 mx-1.5" />
                            ) : (
                                <button
                                    key={i}
                                    title={item.title}
                                    className="flex items-center justify-center w-8 h-8 text-sm transition rounded-md text-epo-slate-500 hover:bg-epo-slate-100 hover:text-epo-slate-800"
                                >
                                    <i className={`fas ${item.icon}`} />
                                </button>
                            )
                        )}
                    </div>

                    {/* Meta (destinataire, objet, référence) */}
                    <div className="px-6 py-4 border-b border-epo-slate-100 bg-epo-slate-50 space-y-2.5">
                        <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                            <div className="w-full sm:w-24 flex-shrink-0 text-[12px] font-semibold uppercase tracking-wider text-epo-slate-500 pt-2">
                                Destinataire
                            </div>
                            <input
                                type="text"
                                defaultValue={dossier.destinataire}
                                className="flex-1 px-3 py-1.5 border border-epo-slate-300 rounded-lg text-[13.5px] outline-none transition focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/20"
                            />
                        </div>
                        <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                            <div className="w-full sm:w-24 flex-shrink-0 text-[12px] font-semibold uppercase tracking-wider text-epo-slate-500 pt-2">
                                Objet
                            </div>
                            <input
                                type="text"
                                defaultValue="Réponse au courrier N°2026-0182 du 12 août 2026"
                                className="flex-1 px-3 py-1.5 border border-epo-slate-300 rounded-lg text-[13.5px] outline-none transition focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/20"
                            />
                        </div>
                        <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                            <div className="w-full sm:w-24 flex-shrink-0 text-[12px] font-semibold uppercase tracking-wider text-epo-slate-500 pt-2">
                                Référence
                            </div>
                            <div className="flex-1 pt-2 text-[13.5px]">
                                <span className="text-epo-green-600 font-medium inline-flex items-center gap-1.5">
                                    <i className="fas fa-link" />
                                    {dossier.reference}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Corps éditable */}
                    <div
                        ref={editorRef}
                        contentEditable
                        suppressContentEditableWarning
                        onInput={() => setDirty(true)}
                        className="px-10 py-8 min-h-[400px] text-[15px] leading-relaxed text-epo-slate-800 outline-none focus:bg-[#fffefb]"
                        style={{ fontFamily: '"Georgia", serif' }}
                        dangerouslySetInnerHTML={{ __html: dossier.corps }}
                    />

                    {/* Footer */}
                    <div className="px-5 py-3.5 border-t border-epo-slate-200 bg-epo-slate-50 flex justify-between items-center flex-wrap gap-2.5">
                        <div className="flex items-center gap-4 flex-wrap text-[12px] text-epo-slate-500">
                            <span className="inline-flex items-center gap-1.5">
                                <i className="fas fa-clock" />
                                Dernière modification : {dossier.dateModification}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <i className="fas fa-user" />
                                Par : {dossier.auteurModification}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <i className="fas fa-file-word" />
                                {dossier.caractères} caractères
                            </span>
                        </div>
                        <Button variant="outline" icon="fa-times" size="sm">
                            Annuler
                        </Button>
                    </div>
                </div>

                {/* ============ PANNEAU LATÉRAL ============ */}
                <aside className="flex flex-col gap-4">
                    {/* Fonds de dossier */}
                    <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                        <div className="px-4.5 py-3.5 border-b border-epo-slate-200 bg-epo-slate-50 flex justify-between items-center">
                            <span className="text-[13.5px] font-semibold text-epo-slate-800 flex items-center gap-2">
                                <i className="fas fa-folder-open text-epo-green-600" />
                                Fonds de dossier
                            </span>
                            <span className="text-[10.5px] font-semibold bg-epo-slate-200 text-epo-slate-600 px-2 py-0.5 rounded-full">
                                {dossier.fonds.length} pièces
                            </span>
                        </div>
                        <div className="px-4.5 py-4">
                            {dossier.fonds.map((f) => {
                                const iconMap = {
                                    pdf: { icon: 'fa-file-pdf', cls: 'bg-epo-red-50 text-epo-red-500' },
                                    word: { icon: 'fa-file-word', cls: 'bg-blue-50 text-blue-500' },
                                    img: { icon: 'fa-file-image', cls: 'bg-purple-50 text-purple-500' },
                                };
                                const cfg = iconMap[f.type] || iconMap.pdf;
                                return (
                                    <div
                                        key={f.id}
                                        className="flex items-start gap-2.5 py-2.5 border-b border-epo-slate-100 last:border-b-0 last:pb-0"
                                    >
                                        <div
                                            className={`
                                                w-8 h-8 rounded-lg
                                                flex items-center justify-center
                                                text-sm flex-shrink-0
                                                ${cfg.cls}
                                            `}
                                        >
                                            <i className={`fas ${cfg.icon}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[13px] font-medium text-epo-slate-800 truncate">
                                                {f.nom}
                                            </div>
                                            <div className="text-[11.5px] text-epo-slate-400">
                                                {f.meta}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Commentaires */}
                    <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                        <div className="px-4.5 py-3.5 border-b border-epo-slate-200 bg-epo-slate-50 flex justify-between items-center">
                            <span className="text-[13.5px] font-semibold text-epo-slate-800 flex items-center gap-2">
                                <i className="fas fa-comments text-epo-green-600" />
                                Commentaires
                            </span>
                            <span className="text-[10.5px] font-semibold bg-epo-slate-200 text-epo-slate-600 px-2 py-0.5 rounded-full">
                                {commentaires.length}
                            </span>
                        </div>

                        <div className="px-4.5 py-4 max-h-[280px] overflow-y-auto">
                            {commentaires.map((c) => (
                                <div
                                    key={c.id}
                                    className={`
                                        px-3 py-2.5 rounded-lg mb-2 last:mb-0
                                        border-l-[3px]
                                        ${
                                            c.type === 'fond'
                                                ? 'bg-blue-50 border-l-blue-500'
                                                : c.type === 'forme'
                                                ? 'bg-epo-yellow-50 border-l-epo-yellow-500'
                                                : 'bg-purple-50 border-l-purple-500'
                                        }
                                    `}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[12px] font-semibold text-epo-slate-800">
                                            {c.auteur}
                                        </span>
                                        <span
                                            className={`
                                                text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider
                                                ${
                                                    c.type === 'fond'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : c.type === 'forme'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-purple-100 text-purple-700'
                                                }
                                            `}
                                        >
                                            {commentTypeLabel[c.type] || c.type}
                                        </span>
                                    </div>
                                    <p className="text-[12.5px] text-epo-slate-700 leading-relaxed">
                                        {c.texte}
                                    </p>
                                    <div className="text-[11px] text-epo-slate-400 mt-1">
                                        {c.date}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Zone d'ajout */}
                        <div className="px-4.5 py-3.5 border-t border-epo-slate-200 bg-epo-slate-50">
                            <div className="flex gap-1.5 mb-2">
                                {['fond', 'forme'].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTypeCommentaire(t)}
                                        className={`
                                            text-[11px] font-semibold px-2.5 py-1 rounded-full border transition
                                            ${
                                                typeCommentaire === t
                                                    ? t === 'fond'
                                                        ? 'bg-blue-500 text-white border-blue-500'
                                                        : 'bg-epo-yellow-500 text-white border-epo-yellow-500'
                                                    : 'bg-white text-epo-slate-500 border-epo-slate-300 hover:border-epo-slate-400'
                                            }
                                        `}
                                    >
                                        {commentTypeLabel[t]}
                                    </button>
                                ))}
                            </div>
                            <textarea
                                value={nouveauCommentaire}
                                onChange={(e) => setNouveauCommentaire(e.target.value)}
                                placeholder="Ajouter un commentaire..."
                                rows={2}
                                className="w-full px-3 py-2.5 border border-epo-slate-300 rounded-lg text-[13px] outline-none transition resize-y focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/20"
                            />
                            <button
                                onClick={handleSendCommentaire}
                                className="mt-2 px-4 py-1.5 bg-epo-slate-700 text-white rounded-lg text-[12.5px] font-semibold inline-flex items-center gap-1.5 transition hover:bg-epo-slate-800"
                            >
                                <i className="fas fa-paper-plane" />
                                Envoyer
                            </button>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Modale de rejet */}
            <RejetModal
                open={rejetOpen}
                onClose={() => setRejetOpen(false)}
                onConfirm={(motif, commentaire) => {
                    alert(
                        `Document rejeté.\n\nMotif : ${motif}\n\nCommentaire : ${commentaire}\n\nL'initiateur sera notifié.`
                    );
                    setRejetOpen(false);
                }}
            />
        </div>
    );
}

/* ============================================================
   MODALE - Rejet avec motif obligatoire (RG-19)
   ============================================================ */
function RejetModal({ open, onClose, onConfirm }) {
    const [motif, setMotif] = useState('');
    const [commentaire, setCommentaire] = useState('');

    const handleConfirm = () => {
        if (!motif) {
            alert('Veuillez sélectionner un motif de rejet (RG-19).');
            return;
        }
        if (!commentaire.trim()) {
            alert('Veuillez saisir un commentaire détaillé.');
            return;
        }
        onConfirm(motif, commentaire.trim());
        setMotif('');
        setCommentaire('');
    };

    const handleClose = () => {
        setMotif('');
        setCommentaire('');
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            title="Rejeter le document"
            titleIcon="fa-times-circle"
            size="sm"
            footer={
                <>
                    <Button variant="outline" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="danger" icon="fa-times" onClick={handleConfirm}>
                        Confirmer le rejet
                    </Button>
                </>
            }
        >
            <div className="bg-epo-yellow-50 border-l-4 border-epo-yellow-500 px-4 py-3 rounded-lg mb-4 flex gap-3 text-[13px] text-epo-yellow-800">
                <i className="fas fa-exclamation-triangle mt-0.5 flex-shrink-0" />
                <div>
                    Le rejet d'un document est définitif pour la version courante.
                    L'initiateur sera notifié et devra créer une nouvelle version.
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-[13.5px] font-medium text-epo-slate-700 mb-1.5">
                    Motif du rejet <span className="text-epo-red-500">*</span>
                </label>
                <select
                    value={motif}
                    onChange={(e) => setMotif(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-epo-slate-300 rounded-lg text-[13.5px] outline-none transition focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/20"
                >
                    <option value="">Sélectionner un motif...</option>
                    <option value="Fond - contenu inexact ou incomplet">
                        Fond - contenu inexact ou incomplet
                    </option>
                    <option value="Forme - rédaction ou présentation à revoir">
                        Forme - rédaction ou présentation à revoir
                    </option>
                    <option value="Pièces - pièces justificatives manquantes">
                        Pièces - pièces justificatives manquantes
                    </option>
                    <option value="Autre motif">Autre motif</option>
                </select>
            </div>

            <div>
                <label className="block text-[13.5px] font-medium text-epo-slate-700 mb-1.5">
                    Commentaire détaillé <span className="text-epo-red-500">*</span>
                </label>
                <textarea
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                    rows={4}
                    placeholder="Précisez les éléments à corriger..."
                    className="w-full px-3.5 py-2.5 border border-epo-slate-300 rounded-lg text-[13.5px] outline-none transition resize-y focus:border-epo-green-500 focus:ring-2 focus:ring-epo-green-500/20"
                />
            </div>
        </Modal>
    );
}