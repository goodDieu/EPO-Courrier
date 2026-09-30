// src/pages/dg/EcheancesDgPage.jsx
import { useMemo, useState } from 'react';
import { Button, SectionTitle } from '../../components/ui';
import EcheancesDgCompteurs from '../../components/dg/EcheancesDgCompteurs';
import EcheanceDgLigne from '../../components/dg/EcheanceDgLigne';
import DgSignatureModal from '../../components/dg/DgSignatureModal';
import DgValidationModal from '../../components/dg/DgValidationModal';
import {
    ECHEANCES_DG,
    TYPES_ACTIONS,
    FILTRES_TYPE_ACTION,
    FILTRES_BLOC,
    computeBloc,
} from '../../data/echeancesDG.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function EcheancesDgPage() {
    const [filtreTypeAction, setFiltreTypeAction] = useState('');
    const [filtreBloc, setFiltreBloc] = useState('');
    const [selectedEcheance, setSelectedEcheance] = useState(null);

    /* Compteurs par type d'action (sur l'ensemble, non filtré) */
    const counts = useMemo(() => {
        const c = { signer: 0, valider: 0, instruire: 0, confidentiel: 0 };
        ECHEANCES_DG.forEach((e) => {
            c[e.typeAction] = (c[e.typeAction] || 0) + 1;
        });
        return c;
    }, []);

    /* Total urgences (dépassés + jour J) */
    const urgences = ECHEANCES_DG.filter((e) => e.tempsRestantMin < 24 * 60).length;

    /* Liste filtrée */
    const listeFiltree = useMemo(() => {
        let result = ECHEANCES_DG;

        if (filtreTypeAction) result = result.filter((e) => e.typeAction === filtreTypeAction);
        if (filtreBloc) result = result.filter((e) => computeBloc(e.tempsRestantMin) === filtreBloc);

        // Tri : par urgence
        return [...result].sort((a, b) => a.tempsRestantMin - b.tempsRestantMin);
    }, [filtreTypeAction, filtreBloc]);

    /* Regroupement par bloc temporel */
    const blocs = useMemo(() => {
        const b = { aujourdhui: [], semaine: [], avenir: [] };
        listeFiltree.forEach((e) => {
            const bloc = computeBloc(e.tempsRestantMin);
            b[bloc].push(e);
        });
        return b;
    }, [listeFiltree]);

    const hasFiltreActif = filtreTypeAction || filtreBloc;

    const resetFiltres = () => {
        setFiltreTypeAction('');
        setFiltreBloc('');
    };

    /* Traitement : ouvrir la bonne modale selon le type d'action */
    const handleTraiter = (echeance) => {
        setSelectedEcheance(echeance);
    };

    return (
        <div className="w-full min-w-0">
            {/* EN-TÊTE */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Mes échéances
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-epo-slate-500">
                        <span>Documents et dossiers qui attendent votre action</span>
                        {urgences > 0 && (
                            <>
                                <span className="text-epo-slate-300">·</span>
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-epo-red-50 text-epo-red-700 text-[11px] font-semibold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-epo-red-500 animate-pulse" />
                                    {urgences} à traiter en priorité
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                </div>
            </div>

            {/* COMPTEURS PAR TYPE D'ACTION */}
            <EcheancesDgCompteurs
                counts={counts}
                actif={filtreTypeAction}
                onChange={setFiltreTypeAction}
            />

            {/* FILTRES */}
            <div className="flex flex-wrap items-center gap-3 p-4 mb-6 bg-white border rounded-xl border-epo-slate-200 shadow-soft">
                <select
                    value={filtreTypeAction}
                    onChange={(e) => setFiltreTypeAction(e.target.value)}
                    className="px-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] text-epo-slate-800 bg-white focus:outline-none focus:border-epo-green-500"
                >
                    {FILTRES_TYPE_ACTION.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>

                <select
                    value={filtreBloc}
                    onChange={(e) => setFiltreBloc(e.target.value)}
                    className="px-3 py-2 border rounded-lg border-epo-slate-300 text-[13px] text-epo-slate-800 bg-white focus:outline-none focus:border-epo-green-500"
                >
                    {FILTRES_BLOC.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>

                {hasFiltreActif && (
                    <button
                        onClick={resetFiltres}
                        className="text-[12.5px] font-medium text-epo-red-600 hover:underline ml-auto"
                    >
                        <i className="mr-1 fas fa-times" />
                        Réinitialiser
                    </button>
                )}
            </div>

            {/* BLOCS */}
            {listeFiltree.length === 0 ? (
                <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-green-50">
                        <i className="text-2xl fas fa-check-circle text-epo-green-500" />
                    </div>
                    <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                        Aucune échéance trouvée
                    </div>
                    <div className="text-[13px] text-epo-slate-500">
                        Essayez d'élargir vos filtres.
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-7">
                    {/* Bloc Aujourd'hui */}
                    {blocs.aujourdhui.length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-fire"
                                title="Aujourd'hui"
                                count={blocs.aujourdhui.length}
                                variant="urgent"
                                subtitle="À traiter en priorité absolue"
                            />
                            <div className="flex flex-col gap-2.5">
                                {blocs.aujourdhui.map((e) => (
                                    <EcheanceDgLigne
                                        key={e.id}
                                        echeance={e}
                                        onTraiter={handleTraiter}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bloc Cette semaine */}
                    {blocs.semaine.length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-calendar-week"
                                title="Cette semaine"
                                count={blocs.semaine.length}
                                variant="warning"
                                subtitle="À planifier dans les 3 prochains jours"
                            />
                            <div className="flex flex-col gap-2.5">
                                {blocs.semaine.map((e) => (
                                    <EcheanceDgLigne
                                        key={e.id}
                                        echeance={e}
                                        onTraiter={handleTraiter}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bloc À venir */}
                    {blocs.avenir.length > 0 && (
                        <div>
                            <BlocHeader
                                icon="fa-calendar-alt"
                                title="À venir"
                                count={blocs.avenir.length}
                                variant="default"
                                subtitle="Vision long terme"
                            />
                            <div className="flex flex-col gap-2.5">
                                {blocs.avenir.map((e) => (
                                    <EcheanceDgLigne
                                        key={e.id}
                                        echeance={e}
                                        onTraiter={handleTraiter}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* MODALES */}
            <DgSignatureModal
                document={
                    selectedEcheance && ['signer', 'confidentiel'].includes(selectedEcheance.typeAction)
                        ? {
                              id: selectedEcheance.id,
                              objet: selectedEcheance.objet,
                              provenence: selectedEcheance.source,
                              priorite: selectedEcheance.typeAction === 'confidentiel' ? 'confidentiel' : 'urgent',
                              etat: selectedEcheance.etat,
                              description: 'Document à signer depuis la vue Échéances.',
                              contenu: 'Ouvrez le détail complet depuis la page dédiée pour voir toutes les informations.',
                              expediteur: selectedEcheance.expediteur,
                              dateDocument: selectedEcheance.dateReception,
                              pieces: [],
                          }
                        : null
                }
                onClose={() => setSelectedEcheance(null)}
            />

            <DgValidationModal
                document={
                    selectedEcheance && selectedEcheance.typeAction === 'valider'
                        ? {
                              id: selectedEcheance.id,
                              type: 'note-orientation',
                              objet: selectedEcheance.objet,
                              provenence: selectedEcheance.source,
                              priorite: 'normal',
                              etat: selectedEcheance.etat,
                              description: 'Document à valider depuis la vue Échéances.',
                              contenu: 'Ouvrez le détail complet depuis la page dédiée pour voir toutes les informations.',
                              expediteur: selectedEcheance.expediteur,
                              dateDocument: selectedEcheance.dateReception,
                              pieces: [],
                          }
                        : null
                }
                onClose={() => setSelectedEcheance(null)}
            />
        </div>
    );
}

/* ============================================================
   SOUS-COMPOSANT : EN-TÊTE DE BLOC
   ============================================================ */

function BlocHeader({ icon, title, count, variant = 'default', subtitle }) {
    const variants = {
        urgent: {
            icon: 'text-epo-red-600',
            bg: 'bg-epo-red-50',
            text: 'text-epo-red-700',
            chip: 'bg-epo-red-100 text-epo-red-800',
        },
        warning: {
            icon: 'text-epo-yellow-600',
            bg: 'bg-epo-yellow-50',
            text: 'text-epo-yellow-700',
            chip: 'bg-epo-yellow-100 text-epo-yellow-800',
        },
        default: {
            icon: 'text-epo-slate-500',
            bg: 'bg-epo-slate-100',
            text: 'text-epo-slate-700',
            chip: 'bg-epo-slate-100 text-epo-slate-700',
        },
    };

    const v = variants[variant];

    return (
        <div className="flex items-center gap-2.5 mb-3">
            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${v.bg} ${v.icon}`}>
                <i className={`fas ${icon} text-[13px]`} />
            </span>
            <div>
                <div className="flex items-center gap-2">
                    <h3 className={`text-[15px] font-bold ${v.text}`}>
                        {title}
                    </h3>
                    <span className={`text-[11.5px] font-semibold px-2 py-0.5 rounded-full ${v.chip}`}>
                        {count}
                    </span>
                </div>
                {subtitle && (
                    <div className="text-[11.5px] text-epo-slate-400">
                        {subtitle}
                    </div>
                )}
            </div>
        </div>
    );
}