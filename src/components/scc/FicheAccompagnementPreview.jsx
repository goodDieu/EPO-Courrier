// src/components/scc/FicheAccompagnementPreview.jsx

/**
 * Aperçu de la fiche d'accompagnement du courrier administratif EPO.
 * Structure basée sur le document physique officiel :
 *   - En-tête SCC (Arrivée / Origine / Réf / Objet)
 *   - Avis motivé du SG (vide — rempli plus tard)
 *   - Décision / instructions du DG (vide — rempli plus tard)
 *   - Exécution des instructions du DG (imputation + type)
 *   - Observations finales (vide — rempli en fin de circuit)
 */

export default function FicheAccompagnementPreview({ arrivee, numero }) {
    return (
        <div className="overflow-hidden bg-white border-2 rounded-lg border-epo-slate-300 shadow-soft">
            {/* ============ En-tête administratif ============ */}
            <div className="px-6 py-4 text-center border-b-2 border-epo-slate-300 bg-epo-slate-50">
                <div className="text-[10px] uppercase tracking-widest text-epo-slate-500">
                    Burkina Faso — Unité · Progrès · Justice
                </div>
                <div className="text-[11.5px] font-bold uppercase tracking-wider text-epo-slate-800 mt-1">
                    École Polytechnique de Ouagadougou
                </div>
                <div className="text-[10.5px] text-epo-slate-600 italic mt-0.5">
                    Fiche d'accompagnement du courrier administratif
                </div>
            </div>

            {/* ============ Bloc SCC ============ */}
            <div className="px-6 py-4 border-b border-epo-slate-200">
                <FicheLigne
                    label="Arrivée et enregistré S/N°"
                    value={numero || '—'}
                    bold
                />
                <FicheLigne
                    label="Du"
                    value={new Date().toLocaleDateString('fr-FR')}
                />
                <FicheLigne
                    label="Origine"
                    value={arrivee.expediteur || '—'}
                />
                <FicheLigne
                    label="Réf. S/N°"
                    value="—"
                />
                <FicheLigne
                    label="Objet"
                    value={arrivee.objet || '—'}
                    multiline
                />
            </div>

            {/* ============ Avis motivé du SG ============ */}
            <div className="px-6 py-4 border-b border-epo-slate-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-epo-slate-700 mb-2">
                    Avis motivé du secrétaire général
                </div>
                <div className="h-16 border border-dashed rounded border-epo-slate-300 bg-epo-slate-50/50" />
            </div>

            {/* ============ Décision / instructions du DG ============ */}
            <div className="px-6 py-4 border-b border-epo-slate-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-epo-slate-700 mb-2">
                    Décision / instructions du DG
                </div>
                <div className="h-16 border border-dashed rounded border-epo-slate-300 bg-epo-slate-50/50" />
            </div>

            {/* ============ Exécution des instructions du DG ============ */}
            <div className="px-6 py-4 border-b border-epo-slate-200 bg-epo-slate-50/50">
                <div className="text-[11px] font-bold uppercase tracking-wider text-epo-slate-700 mb-3">
                    Exécution des instructions du DG
                </div>

                {/* Imputation */}
                <div className="mb-3">
                    <div className="text-[10.5px] font-semibold text-epo-slate-600 mb-1.5 flex items-center gap-1.5">
                        <i className="fas fa-arrow-right text-[9px] text-epo-slate-400" />
                        Imputation
                    </div>
                    <div className="flex flex-wrap gap-1 text-[9.5px] text-epo-slate-500">
                        {['SG', 'DGA/AVE', 'DGA/RCP', 'DAF', 'DRH', 'DEPS', 'PRM', 'DSI', 'DCMEF', 'AC', 'PRM', 'CC', 'CE', 'CT', 'Proto.', 'CC', 'SP', 'CI', 'BCM'].map((s, i) => (
                            <span key={i} className="inline-flex items-center gap-1 px-1.5 py-0.5 border border-epo-slate-300 rounded bg-white">
                                <span className="w-2.5 h-2.5 border border-epo-slate-400 rounded-sm" />
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Type de traitement */}
                <div>
                    <div className="text-[10.5px] font-semibold text-epo-slate-600 mb-1.5 flex items-center gap-1.5">
                        <i className="fas fa-arrow-right text-[9px] text-epo-slate-400" />
                        Type de traitement
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 text-[9.5px] text-epo-slate-500">
                        {[
                            'Pour attribution',
                            'Pour disposition à prendre',
                            'Me voir avec le dossier',
                            'Pour projet de réponse',
                            'Pour nécessaire à faire',
                            'Pour exploitation',
                            'Pour étude et avis',
                            'Pour diffusion',
                            'Pour participation et CR',
                            'Pour synthèse',
                            'Me représenter',
                            'Mettre en instance',
                            'À toutes fins utiles',
                            'Pour suivi',
                            'Pour classement',
                            'Pour centralisation',
                            'Pour information',
                            'Pour suite à donner',
                            'Photocopie',
                            'Me retourner le dossier',
                        ].map((t, i) => (
                            <div key={i} className="flex items-center gap-1.5 py-0.5">
                                <span className="w-2.5 h-2.5 border border-epo-slate-400 rounded-sm bg-white flex-shrink-0" />
                                <span>{t}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ============ Observations finales ============ */}
            <div className="px-6 py-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-epo-slate-700 mb-2">
                    Observations finales
                </div>
                <div className="h-12 border border-dashed rounded border-epo-slate-300 bg-epo-slate-50/50" />
            </div>

            {/* ============ Pied ============ */}
            <div className="px-6 py-3 text-center border-t bg-epo-slate-100 border-epo-slate-200">
                <div className="text-[10px] text-epo-slate-500 italic">
                    Fiche générée automatiquement par la plateforme — à imprimer et joindre au courrier physique
                </div>
            </div>
        </div>
    );
}

function FicheLigne({ label, value, bold, multiline }) {
    return (
        <div className="flex items-start gap-3 py-1.5">
            <span className="w-48 flex-shrink-0 text-[11px] font-medium text-epo-slate-500">
                {label}
            </span>
            <span className={`
                flex-1 text-[11.5px] text-epo-slate-800
                ${bold ? 'font-bold' : ''}
                ${multiline ? 'whitespace-pre-wrap' : 'truncate'}
            `}>
                {value}
            </span>
        </div>
    );
}