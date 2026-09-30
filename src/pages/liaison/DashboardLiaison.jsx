// src/pages/liaison/DashboardLiaison.jsx
import { useMemo, useState } from 'react';
import { Button, SectionTitle } from '../../components/ui';
import SyncStatusBadge from '../../components/liaison/SyncStatusBadge';
import TourneeHero from '../../components/liaison/TourneeHero';
import TourneeCompteurs from '../../components/liaison/TourneeCompteurs';
import TourneeTimeline from '../../components/liaison/TourneeTimeline';
import DocumentCarte from '../../components/liaison/DocumentCarte';
import RemiseLiaisonModal from '../../components/liaison/RemiseLiaisonModal';
import {
    AGENT,
    TOURNEE_DU_JOUR,
    DOCUMENTS_HORS_TOURNEE,
} from '../../data/dashboardLiaison.js';

/* ============================================================
   PAGE
   ============================================================ */

export default function DashboardLiaison() {
    const [online] = useState(true); // Simulation : à brancher sur navigator.onLine
    const [pendingSync] = useState(0);
    const [remiseEnCours, setRemiseEnCours] = useState(null);

    /* Stats tournée */
    const stats = useMemo(() => {
        const etapes = TOURNEE_DU_JOUR.etapes;
        const faites = etapes.filter((e) => e.etat === 'faite').length;
        const retards = etapes.filter((e) => e.etat === 'retard').length;
        const total = etapes.length;
        const prochaine = etapes.find((e) => e.etat === 'en-cours');
        return { faites, retards, total, prochaine };
    }, []);

    const handleRemettre = (etape) => setRemiseEnCours(etape);

    const handleSignaler = (etape) => {
        alert(
            `Signalement\n\n` +
            `→ Document : ${etape.documentNumero}\n` +
            `→ Destinataire : ${etape.destinataire.personne}\n\n` +
            `Motifs possibles : destinataire absent, adresse erronée, autre`
        );
    };

    return (
        <div className="w-full min-w-0">
            {/* ============================================
                EN-TÊTE
                ============================================ */}
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-epo-slate-900">
                        Ma tournée
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-epo-slate-500">
                        <span>{AGENT.zone}</span>
                        <span className="text-epo-slate-300">·</span>
                        <SyncStatusBadge online={online} pendingCount={pendingSync} />
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" icon="fa-print">
                        Imprimer
                    </Button>
                </div>
            </div>

            {/* ============================================
                HERO : PROCHAINE REMISE
                ============================================ */}
            <TourneeHero
                etape={stats.prochaine}
                onRemettre={handleRemettre}
                onSignaler={handleSignaler}
            />

            {/* ============================================
                COMPTEURS TACTILES
                ============================================ */}
            <TourneeCompteurs
                faites={stats.faites}
                total={stats.total}
                retards={stats.retards}
            />

            {/* ============================================
                TIMELINE DE LA TOURNÉE
                ============================================ */}
            <TourneeTimeline
                etapes={TOURNEE_DU_JOUR.etapes}
                onRemettre={handleRemettre}
                onVoir={(etape) => alert(`Détail de ${etape.documentNumero}`)}
            />

            {/* ============================================
                DOCUMENTS HORS TOURNÉE
                ============================================ */}
            <SectionTitle
                icon="fa-inbox"
                title={`Hors tournée (${DOCUMENTS_HORS_TOURNEE.length})`}
                action={{ label: 'Voir tous', onClick: () => {} }}
            />

            <div className="flex flex-col gap-3">
                {DOCUMENTS_HORS_TOURNEE.map((doc) => (
                    <DocumentCarte
                        key={doc.id}
                        doc={doc}
                        onRemettre={handleRemettre}
                    />
                ))}
            </div>

            {/* ============================================
                MODALE DE REMISE
                ============================================ */}
            <RemiseLiaisonModal
                remise={remiseEnCours}
                onClose={() => setRemiseEnCours(null)}
            />
        </div>
    );
}