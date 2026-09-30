// src/pages/actes/ActesPage.jsx
import { useState, useMemo } from 'react';
import { Button, SectionTitle } from '../../components/ui';
import ActesKpi from '../../components/actes/ActesKpi';
import ActesFiltres from '../../components/actes/ActesFiltres';
import ActesTable from '../../components/actes/ActesTable';
import ActesGroupe from '../../components/actes/ActesGroupe';
import ActeFormModal from '../../components/actes/ActeFormModal';
import ActeDetailModal from '../../components/actes/ActeDetailModal';
import { ACTES } from '../../data/actes.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function ActesPage() {
    const [nature, setNature] = useState('');
    const [etat, setEtat] = useState('');
    const [periode, setPeriode] = useState('');
    const [recherche, setRecherche] = useState('');
    const [role, setRole] = useState('sg');
    const [vue, setVue] = useState('tableau'); // 'tableau' | 'groupe'

    const [modalFormOpen, setModalFormOpen] = useState(false);
    const [selectedActe, setSelectedActe] = useState(null);

    // Filtrage
    const listeFiltree = useMemo(() => {
        let result = ACTES;

        if (nature) result = result.filter((a) => a.nature === nature);
        if (etat) result = result.filter((a) => a.etat === etat);

        if (periode) {
            const now = new Date();
            const diffJours = { '7j': 7, '30j': 30, 'trimestre': 90, 'annee': 365 }[periode] || 999;
            result = result.filter((a) => {
                const diff = (now - new Date(a.dateCreation)) / (1000 * 60 * 60 * 24);
                return diff <= diffJours;
            });
        }

        if (recherche.trim()) {
            const q = recherche.toLowerCase();
            result = result.filter(
                (a) =>
                    a.beneficiaireNom.toLowerCase().includes(q) ||
                    a.beneficiaireMatricule.toLowerCase().includes(q) ||
                    a.objet.toLowerCase().includes(q) ||
                    a.id.toLowerCase().includes(q)
            );
        }

        return [...result].sort((a, b) => a.tempsRestant - b.tempsRestant);
    }, [nature, etat, periode, recherche]);

    const hasFiltreActif = nature || etat || periode || recherche;

    const resetFiltres = () => {
        setNature('');
        setEtat('');
        setPeriode('');
        setRecherche('');
    };

    return (
        <div>
            {/* ============================================
                EN-TÊTE
                ============================================ */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-epo-slate-900">
                        Actes administratifs
                    </h1>
                    <div className="mt-1 text-sm text-epo-slate-500">
                        Certificats · Attestations · Autorisations · Congés · Ordres de mission
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="px-3 py-2 border border-epo-slate-300 rounded-lg text-[13px] text-epo-slate-800 bg-white focus:outline-none focus:border-epo-green-500"
                    >
                        <option value="sg">Vue SG</option>
                        <option value="dg">Vue DG</option>
                        <option value="drh">Vue DRH</option>
                        <option value="admin">Vue Admin</option>
                    </select>

                    <Button variant="outline" icon="fa-file-export">
                        Exporter
                    </Button>
                    <Button
                        variant="primary"
                        icon="fa-plus"
                        onClick={() => setModalFormOpen(true)}
                    >
                        Nouvel acte
                    </Button>
                </div>
            </div>

            {/* ============================================
                KPI
                ============================================ */}
            <ActesKpi actes={ACTES} />

            {/* ============================================
                FILTRES
                ============================================ */}
            <ActesFiltres
                nature={nature}
                setNature={setNature}
                etat={etat}
                setEtat={setEtat}
                periode={periode}
                setPeriode={setPeriode}
                recherche={recherche}
                setRecherche={setRecherche}
                onReset={resetFiltres}
                hasFiltreActif={hasFiltreActif}
            />

            {/* ============================================
                BASCULE VUE + TITRE
                ============================================ */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                    <h2 className="text-[18px] font-semibold text-epo-slate-800 flex items-center gap-2">
                        <i className="fas fa-file-signature text-epo-green-600" />
                        Actes ({listeFiltree.length})
                    </h2>
                </div>

                <div className="inline-flex p-1 rounded-lg bg-epo-slate-100">
                    <button
                        onClick={() => setVue('tableau')}
                        className={`
                            px-3 py-1.5 rounded-md text-[12.5px] font-semibold transition inline-flex items-center gap-1.5
                            ${vue === 'tableau'
                                ? 'bg-white text-epo-slate-900 shadow-soft'
                                : 'text-epo-slate-500 hover:text-epo-slate-700'}
                        `}
                    >
                        <i className="fas fa-table" />
                        Tableau
                    </button>
                    <button
                        onClick={() => setVue('groupe')}
                        className={`
                            px-3 py-1.5 rounded-md text-[12.5px] font-semibold transition inline-flex items-center gap-1.5
                            ${vue === 'groupe'
                                ? 'bg-white text-epo-slate-900 shadow-soft'
                                : 'text-epo-slate-500 hover:text-epo-slate-700'}
                        `}
                    >
                        <i className="fas fa-layer-group" />
                        Par état
                    </button>
                </div>
            </div>

            {/* ============================================
                VUE ACTIVE
                ============================================ */}
            {vue === 'tableau' ? (
                <ActesTable actes={listeFiltree} onVoir={setSelectedActe} />
            ) : (
                <ActesGroupe actes={listeFiltree} onVoir={setSelectedActe} />
            )}

            {/* ============================================
                MODALES
                ============================================ */}
            <ActeFormModal
                open={modalFormOpen}
                onClose={() => setModalFormOpen(false)}
            />

            <ActeDetailModal
                acte={selectedActe}
                onClose={() => setSelectedActe(null)}
            />
        </div>
    );
}