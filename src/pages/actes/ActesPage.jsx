// src/pages/actes/ActesPage.jsx
import { useState } from 'react';
import { Button, KpiCard, PageHeader, FilterBar, TableCard, RowAction, RefCell, TitleCell, EmptyTable, Echeance, TD, ROW_CLICKABLE, notify } from '../../components/ui';
import NatureBadge from '../../components/actes/NatureBadge';
import ActeFormModal from '../../components/actes/ActeFormModal';
import ActeDetailModal from '../../components/actes/ActeDetailModal';
import DocumentEtatTag from '../../components/circuit/DocumentEtatTag';
import VisaModal from '../../components/circuit/VisaModal';
import { NATURES_ACTES, FILTRES_NATURE } from '../../data/actes.js';
import { FILTRES_ETAT_DOCUMENT } from '../../data/circuit.js';
import { DEMO_NOW, formatJourHeure, isSameDay } from '../../data/demoClock.js';
import { useCircuit } from '../../data/circuitContext.js';
import { enRetard } from '../../data/spSgStats.js';

const ORDRE = { 'chez-sg': 0, 'renvoye-correction': 1, 'chez-sp-sg': 2, 'soumis-shi': 3, brouillon: 4, rejete: 5, 'vu-bon-a-signer': 6, 'chez-dg': 7, signe: 8, diffuse: 9, archive: 10 };
const FERMES = ['signe', 'diffuse', 'archive', 'rejete'];

export default function ActesPage() {
    const { actes, viserActe, renvoyerActe, ajouterActe } = useCircuit();
    const [recherche, setRecherche] = useState('');
    const [filtreEtat, setFiltreEtat] = useState('');
    const [filtreNature, setFiltreNature] = useState('');
    const [ouvertId, setOuvertId] = useState(null);
    const [visaId, setVisaId] = useState(null);
    const [nouveau, setNouveau] = useState(false);

    const q = recherche.trim().toLowerCase();
    const liste = actes
        .filter((a) => (!filtreEtat || a.etat === filtreEtat) && (!filtreNature || a.nature === filtreNature))
        .filter((a) => !q || [a.id, a.objet, a.beneficiaireNom, a.beneficiaireMatricule].some((c) => c?.toLowerCase().includes(q)))
        .sort((a, b) => ORDRE[a.etat] - ORDRE[b.etat] || new Date(a.echeance) - new Date(b.echeance));

    const aViser = actes.filter((a) => a.etat === 'chez-sg');
    const visa = actes.find((a) => a.id === visaId);
    const ouvert = actes.find((a) => a.id === ouvertId);

    const handleViser = (acte, observation) => {
        viserActe(acte, observation);
        setVisaId(null);
        notify.success(`Acte ${acte.id} visé`, { items: [`${acte.beneficiaireNom} · ${NATURES_ACTES[acte.nature].label}`, 'Envoyé au secrétariat du DG pour signature'] });
    };
    const handleRenvoyer = (acte, motif) => {
        renvoyerActe(acte, motif);
        setVisaId(null);
        notify.success(`Acte ${acte.id} renvoyé à la ${acte.produitPar}`, { items: [motif] });
    };
    const handleCreer = ({ nature, beneficiaire, motif }) => {
        const id = `ACT-2026-${String(Math.max(...actes.map((a) => Number(a.id.slice(-4)))) + 1).padStart(4, '0')}`;
        ajouterActe({
            id,
            nature,
            beneficiaireId: beneficiaire.id,
            beneficiaireNom: beneficiaire.nom,
            beneficiaireMatricule: beneficiaire.matricule,
            beneficiaireStructure: beneficiaire.structure,
            objet: motif ? `${NATURES_ACTES[nature].label} - ${motif}` : NATURES_ACTES[nature].label,
            etat: 'vu-bon-a-signer',
            signature: 'attente',
            dateSignature: null,
            echeance: new Date(DEMO_NOW.getTime() + 3 * 24 * 3600000).toISOString(),
            tempsRestant: 3 * 24 * 60,
            produitPar: 'SG',
        });
        notify.success(`Acte ${id} créé`, { items: [`${beneficiaire.nom} · ${NATURES_ACTES[nature].label}`, 'Visé et envoyé au secrétariat du DG'] });
    };

    return (
        <div className="w-full min-w-0">
            <PageHeader
                title="Actes administratifs"
                description="Certificats, autorisations d'absence, congés et ordres de mission à viser avant la signature du DG."
                actions={
                    <Button icon="fa-plus" onClick={() => setNouveau(true)}>
                        Nouvel acte
                    </Button>
                }
            />

            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <KpiCard
                    label="À viser"
                    value={aViser.length}
                    variant={aViser.some((a) => enRetard(a.echeance)) ? 'urgent' : 'default'}
                    hint={aViser.some((a) => enRetard(a.echeance)) ? 'Délai dépassé pour certains' : 'Préparés par la DRH'}
                    icon="fa-stamp"
                    onClick={() => setFiltreEtat('chez-sg')}
                />
                <KpiCard label="Renvoyés pour correction" value={actes.filter((a) => a.etat === 'renvoye-correction').length} hint="Chez la DRH" icon="fa-rotate-left" onClick={() => setFiltreEtat('renvoye-correction')} />
                <KpiCard label="Au DG pour signature" value={actes.filter((a) => ['vu-bon-a-signer', 'chez-dg'].includes(a.etat)).length} icon="fa-user-tie" />
                <KpiCard
                    label="Signés"
                    value={actes.filter((a) => ['signe', 'diffuse', 'archive'].includes(a.etat)).length}
                    hint={`dont ${actes.filter((a) => isSameDay(a.dateSignature)).length} aujourd'hui`}
                    icon="fa-check"
                    onClick={() => setFiltreEtat('signe')}
                />
            </div>

            <FilterBar
                search={{ value: recherche, onChange: setRecherche, placeholder: 'Rechercher un numéro, un agent, un matricule…' }}
                filters={[
                    { id: 'etat', label: 'État', value: filtreEtat, onChange: setFiltreEtat, options: FILTRES_ETAT_DOCUMENT },
                    { id: 'nature', label: 'Nature', value: filtreNature, onChange: setFiltreNature, options: FILTRES_NATURE },
                ]}
                onReset={() => {
                    setRecherche('');
                    setFiltreEtat('');
                    setFiltreNature('');
                }}
            />

            {liste.length === 0 ? (
                <EmptyTable icon="fa-file-signature" title="Aucun acte ne correspond" message="Modifiez la recherche ou effacez les filtres." />
            ) : (
                <TableCard
                    columns={[{ label: 'N° · Créé' }, { label: 'Agent concerné' }, { label: 'Nature · Objet' }, { label: 'État · Délai' }, { label: '' }]}
                    footer={`${liste.length} acte${liste.length > 1 ? 's' : ''} · cliquez sur une ligne pour ouvrir la fiche`}
                >
                    {liste.map((a) => (
                        <tr key={a.id} className={ROW_CLICKABLE} onClick={() => setOuvertId(a.id)}>
                            <td className={TD}>
                                <RefCell sub={formatJourHeure(a.dateCreation)}>{a.id}</RefCell>
                            </td>
                            <td className={TD}>
                                <TitleCell title={a.beneficiaireNom} sub={`${a.beneficiaireStructure} · ${a.beneficiaireMatricule}`} width="max-w-[200px]" />
                            </td>
                            <td className={TD}>
                                <NatureBadge nature={a.nature} />
                                <div className="mt-0.5 text-xs truncate max-w-[260px] text-epo-slate-500" title={a.objet}>
                                    {a.objet}
                                </div>
                            </td>
                            <td className={TD}>
                                <DocumentEtatTag etat={a.etat} />
                                {!FERMES.includes(a.etat) && (
                                    <div className="mt-0.5">
                                        <Echeance iso={a.echeance} className="!text-xs" />
                                    </div>
                                )}
                            </td>
                            <td className={`${TD} text-right`}>
                                {a.etat === 'chez-sg' ? (
                                    <RowAction primary icon="fa-stamp" onClick={() => setVisaId(a.id)}>
                                        Viser
                                    </RowAction>
                                ) : (
                                    <RowAction onClick={() => setOuvertId(a.id)}>Ouvrir</RowAction>
                                )}
                            </td>
                        </tr>
                    ))}
                </TableCard>
            )}

            <ActeDetailModal
                acte={ouvert}
                onClose={() => setOuvertId(null)}
                actions={
                    ouvert?.etat === 'chez-sg' && (
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
                document={visa}
                lignes={visa ? [['Agent', `${visa.beneficiaireNom} (${visa.beneficiaireStructure})`], ['Nature', NATURES_ACTES[visa.nature].label], ['Préparé par', visa.produitPar]] : []}
                onClose={() => setVisaId(null)}
                onViser={handleViser}
                onRenvoyer={handleRenvoyer}
            />
            <ActeFormModal open={nouveau} onClose={() => setNouveau(false)} onCreer={handleCreer} />
        </div>
    );
}
