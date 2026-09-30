// src/components/scc/ArriveeDetailModal.jsx
import { Modal, Button, StatusBadge, Timeline } from '../ui';
import ClassificationBadge from './ClassificationBadge';
import CriticiteBadge from './CriticiteBadge';
import {
    NATURES_ENTRANTS,
    formatDate,
    formatDateHeure,
    formatDuree,
} from '../../data/arriveesSCC.js';

/* ============================================================
   MODALE
   ============================================================ */

export default function ArriveeDetailModal({
    arrivee,
    onClose,
    onTransmettre,
    onModifier,
    canTransmettre = true,
}) {
    if (!arrivee) return null;

    const a = arrivee;
    const nature = NATURES_ENTRANTS[a.nature];
    const canEdit = a.etat === 'enregistre' && canTransmettre;

    // Timeline reconstituée
    const timeline = buildTimeline(a);

    // Pièces mock (à brancher sur le backend)
    const pieces = buildPieces(a);

    // Transmissions liées (mock)
    const transmissions = buildTransmissions(a);

    return (
        <Modal
            open={!!a}
            onClose={onClose}
            title={`Courrier ${a.id} - ${a.objet}`}
            titleIcon="fa-inbox"
            size="xl"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                    <Button variant="outline" icon="fa-print">
                        Imprimer la fiche
                    </Button>
                    {canEdit && (
                        <Button variant="outline" icon="fa-edit" onClick={() => onModifier?.(a)}>
                            Modifier
                        </Button>
                    )}
                    {a.etat === 'enregistre' && canTransmettre && (
                        <Button
                            variant="primary"
                            icon="fa-paper-plane"
                            onClick={() => onTransmettre?.(a)}
                        >
                            Transmettre au SP-SG
                        </Button>
                    )}
                </>
            }
        >
            {/* ============================================
                EN-TÊTE VISUEL
                ============================================ */}
            <div className="pb-5 mb-5 border-b border-epo-slate-100">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <ClassificationBadge classification={a.classification} />
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold bg-epo-slate-100 text-epo-slate-700">
                            <i className={`fas ${nature?.icon} text-[10px]`} />
                            {nature?.label}
                        </span>
                        <StatusBadge status={a.etat} />
                    </div>
                    <CriticiteBadge tempsRestant={a.tempsRestant} />
                </div>

                <h2 className="text-[18px] font-bold tracking-tight text-epo-slate-900">
                    {a.objet}
                </h2>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-2 text-[12.5px] text-epo-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                        <i className="fas fa-user text-[10.5px] text-epo-slate-400" />
                        {a.expediteur}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <i className="fas fa-user-tie text-[10.5px] text-epo-slate-400" />
                        {a.destinataireApparent}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <i className="fas fa-calendar text-[10.5px] text-epo-slate-400" />
                        Document du {formatDate(a.dateDocument)}
                    </span>
                </div>
            </div>

            {/* ============================================
                SECTION 1 - MÉTADONNÉES
                ============================================ */}
            <Section icon="fa-info-circle" title="Informations du dossier">
                <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                    <DetailRow label="Numéro d'ordre" value={<strong className="font-mono">{a.id}</strong>} />
                    <DetailRow
                        label="Série de numérotation"
                        value={a.serie === 'urgent' ? 'Urgente (SCC)' : 'Ordinaire (SCC)'}
                    />
                    <DetailRow label="Enregistré le" value={formatDateHeure(a.dateReception)} />
                    <DetailRow
                        label="Enregistré par"
                        value={
                            <span className="inline-flex items-center gap-1.5">
                                <i className="fas fa-user-circle text-[11px] text-epo-slate-400" />
                                {a.agentSCC}
                            </span>
                        }
                    />
                    <DetailRow label="Date du document" value={formatDate(a.dateDocument)} />
                    <DetailRow
                        label="Classification"
                        value={<ClassificationBadge classification={a.classification} size="sm" />}
                    />
                    <DetailRow
                        label="Criticité temporelle"
                        value={
                            <span className="inline-flex items-center gap-2">
                                <CriticiteBadge tempsRestant={a.tempsRestant} size="sm" />
                                <span className="text-[11.5px] text-epo-slate-400">
                                    Délai de référence : 30 min (SCC → SP-SG)
                                </span>
                            </span>
                        }
                    />
                    <DetailRow
                        label="Hash d'intégrité"
                        value={
                            <span className="inline-flex items-center gap-1.5 font-mono text-[11.5px] text-epo-slate-600 bg-epo-slate-50 px-2 py-0.5 rounded">
                                <i className="fas fa-shield-alt text-[10px] text-epo-green-500" />
                                {a.hash}
                            </span>
                        }
                    />
                </div>
            </Section>

            {/* ============================================
                SECTION 2 - PIÈCES
                ============================================ */}
            <Section icon="fa-paperclip" title={`Pièces associées (${pieces.length})`}>
                <div className="flex flex-col gap-1.5">
                    {pieces.map((p) => (
                        <div
                            key={p.id}
                            className="flex items-center gap-3 p-3 transition bg-white border rounded-lg border-epo-slate-200 hover:bg-epo-slate-50"
                        >
                            <span className={`flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-lg ${pieceIconStyle(p.type)}`}>
                                <i className={`fas ${pieceIcon(p.type)}`} />
                            </span>

                            <div className="flex-1 min-w-0">
                                <div className="text-[13px] font-medium truncate text-epo-slate-800">
                                    {p.nom}
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-epo-slate-500 mt-0.5">
                                    <span>{p.taille}</span>
                                    <span className="text-epo-slate-300">·</span>
                                    <span className="font-mono truncate max-w-[120px]" title={p.hash}>
                                        {p.hash}
                                    </span>
                                    {p.scanne && (
                                        <>
                                            <span className="text-epo-slate-300">·</span>
                                            <span className="inline-flex items-center gap-1 font-medium text-epo-green-600">
                                                <i className="fas fa-camera text-[9.5px]" />
                                                Scanné
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <button
                                className="flex-shrink-0 text-[12px] font-medium text-epo-green-600 hover:underline"
                                title="Consulter"
                            >
                                <i className="mr-1 fas fa-eye" />
                                Voir
                            </button>
                        </div>
                    ))}
                </div>

                {a.classification === 'confidentiel' && (
                    <div className="flex items-start gap-2 p-3 mt-3 border rounded-lg bg-epo-yellow-50 border-epo-yellow-200">
                        <i className="fas fa-lock text-epo-yellow-600 mt-0.5" />
                        <div className="text-[12px] text-epo-yellow-800">
                            <strong>Pièces confidentielles.</strong> L'accès est restreint à la liste blanche (RG-11).
                            Toute consultation est journalisée (RG-13).
                        </div>
                    </div>
                )}
            </Section>

            {/* ============================================
                SECTION 3 - TRANSMISSIONS
                ============================================ */}
            {transmissions.length > 0 && (
                <Section icon="fa-truck" title={`Transmissions (${transmissions.length})`}>
                    <div className="flex flex-col gap-1.5">
                        {transmissions.map((t) => (
                            <div
                                key={t.id}
                                className="flex items-center gap-3 p-3 bg-white border rounded-lg border-epo-slate-200"
                            >
                                <span className={`flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${modeIconStyle(t.mode)}`}>
                                    <i className={`fas ${modeIcon(t.mode)}`} />
                                </span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[12px] font-semibold text-epo-slate-800">
                                            {t.id}
                                        </span>
                                        <span className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full ${etatTransmissionStyle(t.etat).chip}`}>
                                            {etatTransmissionStyle(t.etat).label}
                                        </span>
                                    </div>
                                    <div className="text-[11.5px] text-epo-slate-500 truncate mt-0.5">
                                        {t.destinataire} · {t.agent || 'Retrait direct'} · {formatDateHeure(t.dateDepart)}
                                    </div>
                                </div>
                                {t.preuve && (
                                    <span
                                        className="flex-shrink-0 inline-flex items-center gap-1 text-[11px] text-epo-green-600 font-medium"
                                        title={`Preuve ${t.preuve.type} enregistrée`}
                                    >
                                        <i className={`fas ${t.preuve.type === 'signature' ? 'fa-signature' : 'fa-camera'} text-[10px]`} />
                                        Preuve
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {/* ============================================
                SECTION 4 - TIMELINE
                ============================================ */}
            <Section icon="fa-stream" title="Historique du traitement" last>
                <Timeline items={timeline} />
            </Section>
        </Modal>
    );
}

/* ============================================================
   SOUS-COMPOSANT : SECTION
   ============================================================ */

function Section({ icon, title, children, last = false }) {
    return (
        <div className={!last ? 'mb-5 pb-5 border-b border-epo-slate-100' : ''}>
            <h4 className="text-[13px] font-semibold text-epo-slate-800 mb-2.5 flex items-center gap-2">
                <i className={`fas ${icon} text-epo-green-600`} />
                {title}
            </h4>
            {children}
        </div>
    );
}

/* ============================================================
   SOUS-COMPOSANT : LIGNE DE DÉTAIL
   ============================================================ */

function DetailRow({ label, value }) {
    return (
        <div className="flex flex-col gap-1 py-2 border-b border-epo-slate-100 last:border-b-0 sm:flex-row sm:gap-4">
            <div className="flex-shrink-0 w-full text-[11.5px] font-semibold tracking-wider uppercase text-epo-slate-400 sm:w-36">
                {label}
            </div>
            <div className="flex-1 text-[13px] text-epo-slate-800">
                {value}
            </div>
        </div>
    );
}

/* ============================================================
   HELPERS VISUELS
   ============================================================ */

function pieceIcon(type) {
    switch (type) {
        case 'pdf': return 'fa-file-pdf';
        case 'img': return 'fa-file-image';
        case 'word': return 'fa-file-word';
        case 'excel': return 'fa-file-excel';
        default: return 'fa-file';
    }
}

function pieceIconStyle(type) {
    switch (type) {
        case 'pdf': return 'bg-epo-red-50 text-epo-red-600';
        case 'img': return 'bg-epo-green-50 text-epo-green-600';
        case 'word': return 'bg-epo-slate-100 text-epo-slate-700';
        case 'excel': return 'bg-epo-green-50 text-epo-green-700';
        default: return 'bg-epo-slate-100 text-epo-slate-500';
    }
}

function modeIcon(mode) {
    switch (mode) {
        case 'liaison': return 'fa-truck';
        case 'retrait': return 'fa-walking';
        case 'sp': return 'fa-envelope-open-text';
        default: return 'fa-paper-plane';
    }
}

function modeIconStyle(mode) {
    switch (mode) {
        case 'liaison': return 'bg-epo-green-50 text-epo-green-600';
        case 'retrait': return 'bg-epo-slate-100 text-epo-slate-700';
        case 'sp': return 'bg-epo-yellow-50 text-epo-yellow-700';
        default: return 'bg-epo-slate-100 text-epo-slate-500';
    }
}

function etatTransmissionStyle(etat) {
    switch (etat) {
        case 'a-remettre': return { label: 'À remettre', chip: 'bg-epo-slate-100 text-epo-slate-700' };
        case 'en-tournee': return { label: 'En tournée', chip: 'bg-epo-yellow-50 text-epo-yellow-700' };
        case 'remis': return { label: 'Remis', chip: 'bg-epo-green-50 text-epo-green-700' };
        case 'decharge': return { label: 'Déchargé', chip: 'bg-epo-green-50 text-epo-green-800' };
        case 'en-retard': return { label: 'En retard', chip: 'bg-epo-red-50 text-epo-red-700' };
        default: return { label: etat, chip: 'bg-epo-slate-100 text-epo-slate-600' };
    }
}

/* ============================================================
   BUILDERS MOCK (à remplacer par les vraies données backend)
   ============================================================ */

function buildPieces(a) {
    const base = [
        { id: `${a.id}-p1`, nom: `${a.id}_document_principal.pdf`, taille: '284 Ko', type: 'pdf', scanne: true, hash: a.hash },
    ];

    if (a.pieces >= 2) base.push({ id: `${a.id}-p2`, nom: `${a.id}_annexe_1.pdf`, taille: '156 Ko', type: 'pdf', scanne: true, hash: 'b7d2f4a8...' });
    if (a.pieces >= 3) base.push({ id: `${a.id}-p3`, nom: `${a.id}_annexe_2.xlsx`, taille: '88 Ko', type: 'excel', scanne: false, hash: 'c1e8a5b3...' });
    if (a.pieces >= 4) base.push({ id: `${a.id}-p4`, nom: `${a.id}_planche.jpg`, taille: '512 Ko', type: 'img', scanne: true, hash: 'd9a2c7f1...' });

    return base.slice(0, a.pieces);
}

function buildTransmissions(a) {
    const items = [];

    // Si le dossier est allé plus loin qu'« enregistré »
    if (['transmis-sp-sg', 'chez-sp-sg', 'chez-sg', 'chez-sp-dg', 'chez-dg', 'retour-sg', 'chez-scc', 'remis-direction', 'objet-satisfait', 'archive'].includes(a.etat)) {
        items.push({
            id: `TR-${a.id}-01`,
            mode: 'sp',
            destinataire: 'SP-SG',
            agent: 'Mme KABORÉ Fatimata',
            dateDepart: addMinutes(a.dateReception, 25),
            etat: 'decharge',
            preuve: { type: 'photo' },
        });
    }

    if (['remis-direction', 'objet-satisfait', 'archive'].includes(a.etat)) {
        items.push({
            id: `TR-${a.id}-02`,
            mode: 'liaison',
            destinataire: a.destinataireApparent,
            agent: 'M. SAWADOGO Bakary',
            dateDepart: addMinutes(a.dateReception, 45),
            etat: 'decharge',
            preuve: { type: 'signature' },
        });
    }

    if (a.etat === 'chez-scc') {
        items.push({
            id: `TR-${a.id}-03`,
            mode: 'sp',
            destinataire: 'SCC (dispatch)',
            agent: 'Mme OUATTARA Rasmata',
            dateDepart: addMinutes(a.dateReception, 30),
            etat: 'en-tournee',
            preuve: null,
        });
    }

    return items;
}

function addMinutes(iso, min) {
    const d = new Date(iso);
    d.setMinutes(d.getMinutes() + min);
    return d.toISOString();
}

/* ============================================================
   TIMELINE
   ============================================================ */

function buildTimeline(a) {
    const items = [];

    // 1. Enregistrement
    items.push({
        date: formatDateHeure(a.dateReception),
        user: a.agentSCC,
        action: 'Enregistrement au registre des arrivées',
    });

    // 2. Classification (toujours, juste après)
    items.push({
        date: formatDateHeure(addMinutes(a.dateReception, 2)),
        user: a.agentSCC,
        action: `Classé « ${a.classification === 'confidentiel' ? 'Confidentiel / Réservé' : a.classification === 'urgent' ? 'Urgent' : 'Ordinaire'} »`,
    });

    // 3. Numérotation
    items.push({
        date: formatDateHeure(addMinutes(a.dateReception, 3)),
        user: a.agentSCC,
        action: `Numérotation · série ${a.serie === 'urgent' ? 'urgente (SCC)' : 'ordinaire (SCC)'}`,
    });

    // 4. Scan
    if (a.scanne) {
        items.push({
            date: formatDateHeure(addMinutes(a.dateReception, 5)),
            user: a.agentSCC,
            action: `Numérisation des pièces (${a.pieces}) · hash ${a.hash}`,
        });
    }

    // 5. Transmission SP-SG
    if (['transmis-sp-sg', 'chez-sp-sg', 'chez-sg', 'chez-sp-dg', 'chez-dg', 'retour-sg', 'chez-scc', 'remis-direction', 'objet-satisfait', 'archive'].includes(a.etat)) {
        items.push({
            date: formatDateHeure(addMinutes(a.dateReception, 25)),
            user: 'M. TRAORÉ Ibrahim (SCC)',
            action: 'Transmission au SP-SG · preuve de transmission',
        });
    }

    // 6. Avis SG
    if (['chez-sg', 'chez-sp-dg', 'chez-dg', 'retour-sg', 'chez-scc', 'remis-direction', 'objet-satisfait', 'archive'].includes(a.etat)) {
        items.push({
            date: formatDateHeure(addMinutes(a.dateReception, 90)),
            user: 'M. OUÉDRAOGO Salif (SG)',
            action: 'Avis formulé · introduction au DG via SP-DG',
        });
    }

    // 7. Décision DG
    if (['chez-dg', 'retour-sg', 'chez-scc', 'remis-direction', 'objet-satisfait', 'archive'].includes(a.etat)) {
        items.push({
            date: formatDateHeure(addMinutes(a.dateReception, 180)),
            user: 'Pr. NIKIÉMA Adama (DG)',
            action: 'Décision rendue',
        });
    }

    // 8. Retour au SG pour imputation
    if (['retour-sg', 'chez-scc', 'remis-direction', 'objet-satisfait', 'archive'].includes(a.etat)) {
        items.push({
            date: formatDateHeure(addMinutes(a.dateReception, 240)),
            user: 'M. OUÉDRAOGO Salif (SG)',
            action: 'Imputation au SCC pour dispatch',
        });
    }

    // 9. Dispatch
    if (['remis-direction', 'objet-satisfait', 'archive'].includes(a.etat)) {
        items.push({
            date: formatDateHeure(addMinutes(a.dateReception, 300)),
            user: 'M. TRAORÉ Ibrahim (SCC)',
            action: `Dispatch vers ${a.destinataireApparent}`,
        });
    }

    // 10. Remise direction
    if (['objet-satisfait', 'archive'].includes(a.etat)) {
        items.push({
            date: formatDateHeure(addMinutes(a.dateReception, 360)),
            user: 'M. SAWADOGO Bakary (Liaison)',
            action: `Remis à ${a.destinataireApparent} · décharge signée`,
        });
    }

    // 11. Objet satisfait
    if (['objet-satisfait', 'archive'].includes(a.etat)) {
        items.push({
            date: formatDateHeure(addMinutes(a.dateReception, 2880)),
            user: 'Structure destinataire',
            action: 'Objet satisfait · réponse transmise',
        });
    }

    // 12. Archivage
    if (a.etat === 'archive') {
        items.push({
            date: formatDateHeure(addMinutes(a.dateReception, 7200)),
            user: 'SCC',
            action: 'Archivage · copie numérique conservée',
        });
    }

    return items;
}