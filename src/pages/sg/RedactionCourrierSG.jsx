// src/pages/sg/RedactionCourrierSG.jsx
import { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, CircuitEtapes, EmptyTable, Echeance, TEXTAREA_CLASS, notify } from '../../components/ui';
import DocumentEtatTag from '../../components/circuit/DocumentEtatTag';
import { ETAPES_DOCUMENT, INDEX_DOCUMENT } from '../../data/circuit.js';
import { DEMO_NOW, formatJourHeure } from '../../data/demoClock.js';
import { useCircuit } from '../../data/circuitContext.js';

const SG = 'M. OUÉDRAOGO Salif';
const TYPES_COMMENTAIRE = { fond: 'Sur le fond', forme: 'Sur la forme' };
const FICHIERS = {
    pdf: 'fa-file-pdf',
    word: 'fa-file-word',
    img: 'fa-file-image',
};
const OUTILS = [
    { cmd: 'bold', icon: 'fa-bold', label: 'Gras' },
    { cmd: 'italic', icon: 'fa-italic', label: 'Italique' },
    { cmd: 'underline', icon: 'fa-underline', label: 'Souligné' },
    { sep: true },
    { cmd: 'insertUnorderedList', icon: 'fa-list-ul', label: 'Liste à puces' },
    { cmd: 'insertOrderedList', icon: 'fa-list-ol', label: 'Liste numérotée' },
    { sep: true },
    { cmd: 'justifyLeft', icon: 'fa-align-left', label: 'Aligner à gauche' },
    { cmd: 'justifyCenter', icon: 'fa-align-center', label: 'Centrer' },
    { cmd: 'justifyRight', icon: 'fa-align-right', label: 'Aligner à droite' },
    { cmd: 'justifyFull', icon: 'fa-align-justify', label: 'Justifier' },
];
const INPUT_CLASS =
    'flex-1 h-10 px-3 text-sm bg-white border rounded-lg outline-none border-epo-slate-300 text-epo-slate-900 focus:border-epo-green-600 focus:ring-2 focus:ring-epo-green-600/20 disabled:bg-epo-slate-50 disabled:text-epo-slate-700';

export default function RedactionCourrierSG() {
    const { id } = useParams();
    const doc = useCircuit().sortants.find((d) => d.id === id);

    if (!doc) {
        return (
            <div className="w-full min-w-0">
                <EmptyTable icon="fa-file-circle-question" title={`Le courrier ${id} est introuvable`} message="Il a peut-être été supprimé." />
                <Link to="/sg/courriers-sortants" className="inline-block mt-4 text-sm font-medium text-epo-green-700 hover:underline">
                    Revenir aux courriers sortants
                </Link>
            </div>
        );
    }
    // Remonte l'éditeur si l'on passe d'un courrier à un autre
    return <Editeur key={doc.id} doc={doc} />;
}

function Editeur({ doc }) {
    const navigate = useNavigate();
    const { enregistrerSortant, envoyerSortantAuDg } = useCircuit();
    const editorRef = useRef(null);
    const modifiable = doc.etat === 'brouillon' && doc.redacteur === SG;

    const [objet, setObjet] = useState(doc.objet);
    const [destinataire, setDestinataire] = useState(doc.destinataire);
    const [commentaires, setCommentaires] = useState(doc.commentaires || []);
    const [typeCommentaire, setTypeCommentaire] = useState('fond');
    const [nouveauCommentaire, setNouveauCommentaire] = useState('');
    const [confirmer, setConfirmer] = useState(false);
    const [modifie, setModifie] = useState(false);

    const champs = () => ({ objet: objet.trim(), destinataire: destinataire.trim(), corps: editorRef.current?.innerHTML ?? doc.corps, commentaires });

    const handleEnregistrer = () => {
        enregistrerSortant(doc, champs());
        setModifie(false);
        notify.success('Brouillon enregistré', { items: [`${doc.id} · version ${doc.version}`] });
    };

    const handleEnvoyer = () => {
        envoyerSortantAuDg(doc, champs());
        setConfirmer(false);
        notify.success(`Courrier ${doc.id} envoyé au DG`, { items: ['Votre visa est enregistré', 'Le secrétariat du DG le présentera pour signature'] });
        navigate('/sg/courriers-sortants');
    };

    const ajouterCommentaire = () => {
        if (!nouveauCommentaire.trim()) return;
        setCommentaires((l) => [
            ...l,
            { id: `c${l.length + 1}-${doc.id}`, auteur: SG, role: 'SG', type: typeCommentaire, texte: nouveauCommentaire.trim(), date: DEMO_NOW.toISOString() },
        ]);
        setNouveauCommentaire('');
        setModifie(true);
    };

    return (
        <div className="w-full min-w-0">
            <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 mb-3 text-sm text-epo-slate-600">
                <Link to="/sg/courriers-sortants" className="font-medium text-epo-green-700 hover:underline">
                    Courriers sortants
                </Link>
                <i className="fas fa-chevron-right text-[10px] text-epo-slate-400" aria-hidden="true" />
                <span aria-current="page">{doc.id}</span>
            </nav>

            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">{objet || doc.objet}</h1>
                    <p className="flex flex-wrap items-center mt-1 text-sm gap-x-3 gap-y-1 text-epo-slate-600">
                        <span>
                            {doc.id} · Version {doc.version} · Rédigé par {doc.redacteur}
                        </span>
                        <DocumentEtatTag etat={doc.etat} />
                        {modifiable && doc.echeance && <Echeance iso={doc.echeance} prefix="À envoyer avant" />}
                    </p>
                </div>
                {modifiable && (
                    <div className="flex flex-wrap flex-shrink-0 gap-2">
                        <Button variant="outline" icon="fa-floppy-disk" onClick={handleEnregistrer}>
                            Enregistrer{modifie ? ' *' : ''}
                        </Button>
                        <Button icon="fa-paper-plane" onClick={() => setConfirmer(true)}>
                            Viser et envoyer au DG
                        </Button>
                    </div>
                )}
            </div>

            <div className="p-5 mb-6 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                <CircuitEtapes etapes={ETAPES_DOCUMENT} current={INDEX_DOCUMENT[doc.etat] ?? 0} bloque={doc.etat === 'rejete'} />
            </div>

            <div className="grid items-start grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
                <section className="overflow-hidden bg-white border rounded-xl border-epo-slate-200 shadow-soft" aria-label="Contenu du courrier">
                    <div className="px-5 py-4 space-y-3 border-b border-epo-slate-200">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                            <label htmlFor="ed-dest" className="flex-shrink-0 text-sm font-semibold w-28 text-epo-slate-900">
                                Destinataire
                            </label>
                            <input id="ed-dest" value={destinataire} disabled={!modifiable} onChange={(e) => {
                        setDestinataire(e.target.value);
                        setModifie(true);
                    }} className={INPUT_CLASS} />
                        </div>
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                            <label htmlFor="ed-objet" className="flex-shrink-0 text-sm font-semibold w-28 text-epo-slate-900">
                                Objet
                            </label>
                            <input id="ed-objet" value={objet} disabled={!modifiable} onChange={(e) => {
                        setObjet(e.target.value);
                        setModifie(true);
                    }} className={INPUT_CLASS} />
                        </div>
                        {doc.reponseA && (
                            <p className="text-sm text-epo-slate-700 sm:pl-[124px]">
                                <i className="mr-1.5 fas fa-reply text-epo-slate-400" aria-hidden="true" />
                                En réponse au courrier <span className="font-semibold tabular-nums">{doc.reponseA}</span>
                            </p>
                        )}
                    </div>

                    {modifiable && (
                        <div className="flex flex-wrap gap-1 px-4 py-2 border-b border-epo-slate-200 bg-epo-slate-50" role="toolbar" aria-label="Mise en forme">
                            {OUTILS.map((o, i) =>
                                o.sep ? (
                                    <span key={i} className="w-px mx-1.5 bg-epo-slate-200" aria-hidden="true" />
                                ) : (
                                    <button
                                        key={o.cmd}
                                        type="button"
                                        title={o.label}
                                        aria-label={o.label}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            document.execCommand(o.cmd);
                                            setModifie(true);
                                        }}
                                        className="flex items-center justify-center w-10 h-10 transition-colors rounded-lg text-epo-slate-700 hover:bg-white hover:text-epo-slate-900"
                                    >
                                        <i className={`fas ${o.icon}`} aria-hidden="true" />
                                    </button>
                                )
                            )}
                        </div>
                    )}

                    <div
                        ref={editorRef}
                        contentEditable={modifiable}
                        suppressContentEditableWarning
                        onInput={() => setModifie(true)}
                        aria-label="Texte du courrier"
                        className="px-10 py-8 min-h-[420px] text-base leading-relaxed text-epo-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-epo-green-600/30"
                        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                        dangerouslySetInnerHTML={{ __html: doc.corps || '<p>Le texte du courrier n\'est pas disponible dans la maquette.</p>' }}
                    />
                </section>

                <aside className="flex flex-col gap-6">
                    <section className="bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                        <h2 className="px-5 py-3.5 text-sm font-semibold border-b text-epo-slate-900 border-epo-slate-200">
                            Pièces jointes ({doc.pieces?.length || 0})
                        </h2>
                        {doc.pieces?.length ? (
                            <ul className="divide-y divide-epo-slate-100">
                                {doc.pieces.map((f) => (
                                    <li key={f.id} className="flex items-start gap-3 px-5 py-3">
                                        <i className={`fas ${FICHIERS[f.type] || 'fa-file'} mt-0.5 text-epo-slate-400`} aria-hidden="true" />
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium truncate text-epo-slate-900">{f.nom}</p>
                                            <p className="text-xs text-epo-slate-500">{f.meta}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="px-5 py-4 text-sm text-epo-slate-600">Aucune pièce jointe.</p>
                        )}
                    </section>

                    <section className="bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                        <h2 className="px-5 py-3.5 text-sm font-semibold border-b text-epo-slate-900 border-epo-slate-200">Remarques ({commentaires.length})</h2>
                        <ul className="divide-y divide-epo-slate-100">
                            {commentaires.map((c) => (
                                <li key={c.id} className="px-5 py-3">
                                    <p className="text-sm text-epo-slate-900">{c.texte}</p>
                                    <p className="mt-1 text-xs text-epo-slate-500">
                                        {c.auteur} ({c.role}) · {TYPES_COMMENTAIRE[c.type]} · {formatJourHeure(c.date)}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        {modifiable && (
                            <div className="px-5 py-4 border-t border-epo-slate-200">
                                <div className="inline-flex p-1 mb-2 rounded-lg bg-epo-slate-100" role="radiogroup" aria-label="Type de remarque">
                                    {Object.entries(TYPES_COMMENTAIRE).map(([k, label]) => (
                                        <button
                                            key={k}
                                            type="button"
                                            role="radio"
                                            aria-checked={typeCommentaire === k}
                                            onClick={() => setTypeCommentaire(k)}
                                            className={`h-8 px-3 text-sm rounded-md transition-colors ${
                                                typeCommentaire === k ? 'bg-white font-semibold text-epo-slate-900 shadow-soft' : 'text-epo-slate-700 hover:text-epo-slate-900'
                                            }`}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                                <label htmlFor="ed-remarque" className="sr-only">
                                    Nouvelle remarque
                                </label>
                                <textarea
                                    id="ed-remarque"
                                    rows={2}
                                    value={nouveauCommentaire}
                                    onChange={(e) => setNouveauCommentaire(e.target.value)}
                                    placeholder="Ajouter une remarque…"
                                    className={TEXTAREA_CLASS}
                                />
                                <Button size="sm" variant="outline" icon="fa-plus" className="mt-2" disabled={!nouveauCommentaire.trim()} onClick={ajouterCommentaire}>
                                    Ajouter la remarque
                                </Button>
                            </div>
                        )}
                    </section>
                </aside>
            </div>

            <Modal
                open={confirmer}
                onClose={() => setConfirmer(false)}
                title="Envoyer ce courrier au DG ?"
                titleIcon="fa-paper-plane"
                size="sm"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setConfirmer(false)}>
                            Continuer la rédaction
                        </Button>
                        <Button icon="fa-check" onClick={handleEnvoyer}>
                            Envoyer
                        </Button>
                    </>
                }
            >
                <p className="text-sm text-epo-slate-800">
                    Le courrier part au secrétariat du DG avec votre visa. Vous ne pourrez plus le modifier, sauf si le DG le renvoie.
                </p>
            </Modal>
        </div>
    );
}
