// src/pages/sg/CourriersSortantsSG.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, KpiCard, PageHeader, FilterBar, TableCard, RowAction, RefCell, TitleCell, EmptyTable, Echeance, Modal, TD, ROW_CLICKABLE, notify } from '../../components/ui';
import DocumentEtatTag from '../../components/circuit/DocumentEtatTag';
import DocumentModal from '../../components/circuit/DocumentModal';
import VisaModal from '../../components/circuit/VisaModal';
import { FILTRES_ETAT_DOCUMENT } from '../../data/circuit.js';
import { formatJourHeure } from '../../data/demoClock.js';
import { useCircuit } from '../../data/circuitContext.js';
import { statsSg } from '../../data/sgStats.js';
import { CLASSIFICATIONS } from '../../data/arriveesSCC.js';

const SG = 'M. OUÉDRAOGO Salif';
const ORDRE = { 'chez-sg': 0, brouillon: 1, 'renvoye-correction': 2, rejete: 3, 'vu-bon-a-signer': 4, 'chez-dg': 5, signe: 6, diffuse: 7, archive: 8 };
const contient = (q, ...champs) => champs.some((c) => c?.toLowerCase().includes(q));
const INPUT_CLASS =
    'w-full h-11 px-3 text-sm bg-white border rounded-lg outline-none border-epo-slate-300 text-epo-slate-900 focus:border-epo-green-600 focus:ring-2 focus:ring-epo-green-600/20';

export default function CourriersSortantsSG() {
    const navigate = useNavigate();
    const { dossiers, sortants, viserSortant, renvoyerSortant, creerSortant } = useCircuit();
    const [recherche, setRecherche] = useState('');
    const [filtreEtat, setFiltreEtat] = useState('');
    const [ouvertId, setOuvertId] = useState(null);
    const [visaId, setVisaId] = useState(null);
    const [nouveau, setNouveau] = useState(false);

    const s = statsSg({ dossiers, actes: [], sortants });
    const q = recherche.trim().toLowerCase();
    const liste = sortants
        .filter((d) => !filtreEtat || d.etat === filtreEtat)
        .filter((d) => !q || contient(q, d.id, d.objet, d.destinataire, d.redacteur))
        .sort((a, b) => ORDRE[a.etat] - ORDRE[b.etat] || new Date(a.echeance || 0) - new Date(b.echeance || 0));

    const ouvrir = (d) => (d.etat === 'brouillon' && d.redacteur === SG ? navigate(`/sg/courriers-sortants/${d.id}`) : setOuvertId(d.id));

    const handleViser = (doc, observation) => {
        viserSortant(doc, observation);
        setVisaId(null);
        notify.success(`Courrier ${doc.id} visé`, { items: ['Envoyé au secrétariat du DG pour signature'] });
    };
    const handleRenvoyer = (doc, motif) => {
        renvoyerSortant(doc, motif);
        setVisaId(null);
        notify.success(`Courrier ${doc.id} renvoyé pour correction`, { items: [`Rédacteur prévenu : ${doc.redacteur}`, motif] });
    };

    const prochainId = `DEP-2026-${String(Math.max(...sortants.map((d) => Number(d.id.slice(-4)))) + 1).padStart(4, '0')}`;

    return (
        <div className="w-full min-w-0">
            <PageHeader
                title="Courriers sortants"
                description="Réponses et courriers de l'École : rédaction, visa du SG, signature du DG."
                actions={
                    <Button icon="fa-pen" onClick={() => setNouveau(true)}>
                        Rédiger un courrier
                    </Button>
                }
            />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard
                    label="À viser"
                    value={s.sortantsAViser}
                    variant={sortants.some((d) => d.etat === 'chez-sg' && d.classification === 'urgent') ? 'urgent' : 'default'}
                    hint="Projets rédigés par les structures"
                    icon="fa-stamp"
                    onClick={() => setFiltreEtat('chez-sg')}
                />
                <KpiCard label="En rédaction" value={s.enRedaction} hint="Vos brouillons" icon="fa-pen" onClick={() => setFiltreEtat('brouillon')} />
                <KpiCard label="Au DG pour signature" value={sortants.filter((d) => ['vu-bon-a-signer', 'chez-dg'].includes(d.etat)).length} icon="fa-user-tie" />
                <KpiCard label="Signés" value={sortants.filter((d) => d.etat === 'signe').length} hint="Remis au Service Courrier" icon="fa-check" onClick={() => setFiltreEtat('signe')} />
            </div>

            <FilterBar
                search={{ value: recherche, onChange: setRecherche, placeholder: 'Rechercher un numéro, un objet, un destinataire…' }}
                filters={[{ id: 'etat', label: 'État', value: filtreEtat, onChange: setFiltreEtat, options: FILTRES_ETAT_DOCUMENT }]}
                onReset={() => {
                    setRecherche('');
                    setFiltreEtat('');
                }}
            />

            {liste.length === 0 ? (
                <EmptyTable icon="fa-paper-plane" title="Aucun courrier ne correspond" message="Modifiez la recherche ou effacez les filtres." />
            ) : (
                <TableCard
                    columns={[{ label: 'N° · Créé' }, { label: 'Objet · Destinataire' }, { label: 'Rédigé par' }, { label: 'État · Délai' }, { label: '' }]}
                    footer={`${liste.length} courrier${liste.length > 1 ? 's' : ''} · cliquez sur une ligne pour l'ouvrir`}
                >
                    {liste.map((d) => {
                        const ouvert = !['signe', 'diffuse', 'archive', 'rejete'].includes(d.etat);
                        return (
                            <tr key={d.id} className={ROW_CLICKABLE} onClick={() => ouvrir(d)}>
                                <td className={TD}>
                                    <RefCell sub={formatJourHeure(d.creeLe)}>{d.id}</RefCell>
                                </td>
                                <td className={TD}>
                                    <TitleCell title={d.objet} sub={d.reponseA ? `${d.destinataire} · réponse au ${d.reponseA}` : d.destinataire} width="max-w-[340px]" />
                                </td>
                                <td className={`${TD} text-sm text-epo-slate-800 whitespace-nowrap`}>{d.redacteur}</td>
                                <td className={TD}>
                                    <DocumentEtatTag etat={d.etat} />
                                    {ouvert && d.echeance && (
                                        <div className="mt-0.5">
                                            <Echeance iso={d.echeance} className="!text-xs" />
                                        </div>
                                    )}
                                </td>
                                <td className={`${TD} text-right`}>
                                    {d.etat === 'chez-sg' ? (
                                        <RowAction primary icon="fa-stamp" onClick={() => setVisaId(d.id)}>
                                            Viser
                                        </RowAction>
                                    ) : d.etat === 'brouillon' && d.redacteur === SG ? (
                                        <RowAction primary icon="fa-pen" onClick={() => navigate(`/sg/courriers-sortants/${d.id}`)}>
                                            Rédiger
                                        </RowAction>
                                    ) : (
                                        <RowAction onClick={() => setOuvertId(d.id)}>Ouvrir</RowAction>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </TableCard>
            )}

            <DocumentModal
                document={sortants.find((d) => d.id === ouvertId)}
                onClose={() => setOuvertId(null)}
                actions={
                    sortants.find((d) => d.id === ouvertId)?.etat === 'chez-sg' && (
                        <Button
                            icon="fa-stamp"
                            onClick={() => {
                                setVisaId(ouvertId);
                                setOuvertId(null);
                            }}
                        >
                            Viser
                        </Button>
                    )
                }
            />
            <VisaModal
                key={visaId ?? 'aucun'}
                document={sortants.find((d) => d.id === visaId)}
                lignes={(() => {
                    const d = sortants.find((x) => x.id === visaId);
                    return d ? [['Destinataire', d.destinataire], ['Rédigé par', d.redacteur], d.reponseA && ['En réponse à', d.reponseA]] : [];
                })()}
                onClose={() => setVisaId(null)}
                onViser={handleViser}
                onRenvoyer={handleRenvoyer}
            />
            <NouveauSortantModal
                open={nouveau}
                dossiers={dossiers}
                onClose={() => setNouveau(false)}
                onCreer={(champs) => {
                    creerSortant({ id: prochainId, ...champs });
                    setNouveau(false);
                    navigate(`/sg/courriers-sortants/${prochainId}`);
                }}
            />
        </div>
    );
}

function NouveauSortantModal({ open, dossiers, onClose, onCreer }) {
    const [objet, setObjet] = useState('');
    const [destinataire, setDestinataire] = useState('');
    const [classification, setClassification] = useState('ordinaire');
    const [reponseA, setReponseA] = useState('');

    if (!open) return null;
    const canValider = objet.trim().length > 3 && destinataire.trim().length > 1;
    const enCours = dossiers.filter((d) => d.type === 'courrier' && !['remis-direction', 'objet-satisfait'].includes(d.localisation));

    return (
        <Modal
            open
            onClose={onClose}
            title="Rédiger un courrier"
            titleIcon="fa-pen"
            size="md"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button
                        icon="fa-arrow-right"
                        iconPosition="right"
                        disabled={!canValider}
                        onClick={() =>
                            onCreer({
                                objet: objet.trim(),
                                destinataire: destinataire.trim(),
                                classification,
                                reponseA: reponseA || null,
                                echeance: new Date('2026-10-02T12:00:00').toISOString(),
                            })
                        }
                    >
                        Ouvrir l'éditeur
                    </Button>
                </>
            }
        >
            <div className="space-y-4">
                <div>
                    <label htmlFor="ns-objet" className="block mb-1.5 text-sm font-semibold text-epo-slate-900">
                        Objet
                    </label>
                    <input id="ns-objet" value={objet} onChange={(e) => setObjet(e.target.value)} placeholder="Exemple : Réponse à la demande de stage" className={INPUT_CLASS} />
                </div>
                <div>
                    <label htmlFor="ns-dest" className="block mb-1.5 text-sm font-semibold text-epo-slate-900">
                        Destinataire
                    </label>
                    <input id="ns-dest" value={destinataire} onChange={(e) => setDestinataire(e.target.value)} placeholder="Nom ou structure" className={INPUT_CLASS} />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="ns-classif" className="block mb-1.5 text-sm font-semibold text-epo-slate-900">
                            Classification
                        </label>
                        <select id="ns-classif" value={classification} onChange={(e) => setClassification(e.target.value)} className={INPUT_CLASS}>
                            {Object.values(CLASSIFICATIONS).map((c) => (
                                <option key={c.key} value={c.key}>
                                    {c.shortLabel}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="ns-reponse" className="block mb-1.5 text-sm font-semibold text-epo-slate-900">
                            En réponse à <span className="font-normal text-epo-slate-500">(facultatif)</span>
                        </label>
                        <select id="ns-reponse" value={reponseA} onChange={(e) => setReponseA(e.target.value)} className={INPUT_CLASS}>
                            <option value="">Aucun courrier</option>
                            {enCours.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.id} - {d.objet}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
