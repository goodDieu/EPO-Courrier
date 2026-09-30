// src/components/actes/MaquettePreview.jsx
import { MAQUETTES, formatDate } from '../../data/actes.js';

/**
 * Aperçu du document généré à partir d'une maquette et des données saisies.
 */
export default function MaquettePreview({ nature, data }) {
    const maquette = MAQUETTES[nature];
    if (!maquette) {
        return (
            <div className="bg-epo-slate-50 border border-epo-slate-200 rounded-lg p-6 text-center text-epo-slate-500 text-[13px]">
                <i className="mr-2 fas fa-info-circle" />
                Maquette non disponible pour cette nature. Un modèle générique sera utilisé.
            </div>
        );
    }

    // Remplace les placeholders {{xxx}} par les valeurs saisies
    const remplacer = (texte) => {
        return texte.replace(/\{\{(\w+)\}\}/g, (match, cle) => {
            const valeur = data[cle];
            if (valeur === undefined || valeur === null || valeur === '') return '…………';
            if (cle.startsWith('date')) return formatDate(valeur);
            return valeur;
        });
    };

    return (
        <div className="bg-white border rounded-lg border-epo-slate-300 shadow-soft">
            {/* En-tête administratif */}
            <div className="px-6 py-4 text-center border-b border-epo-slate-200">
                <div className="text-[10.5px] uppercase tracking-widest text-epo-slate-400 mb-1">
                    École Polytechnique de Ouagadougou
                </div>
                <div className="text-[10.5px] uppercase tracking-widest text-epo-slate-400">
                    Burkina Faso - Unité · Progrès · Justice
                </div>
            </div>

            {/* Corps */}
            <div className="px-8 py-6">
                {/* Titre + référence */}
                <div className="mb-6 text-center">
                    <h2 className="text-[16px] font-bold text-epo-slate-900 tracking-wide mb-1">
                        {maquette.titre}
                    </h2>
                    <div className="text-[12px] text-epo-slate-500 italic">
                        {remplacer(maquette.reference)}
                    </div>
                </div>

                {/* Corps du texte */}
                <div className="text-[13px] leading-relaxed text-epo-slate-800 space-y-1">
                    {maquette.corps.map((ligne, i) => (
                        <p
                            key={i}
                            className={`
                                ${ligne === '' ? 'h-3' : ''}
                                ${ligne.match(/^[A-ZÉÈÀÊÎÔÛ\s]+$/) && ligne.length > 3 ? 'font-bold tracking-wide' : ''}
                                ${ligne.startsWith('   ') ? 'font-mono text-[12.5px] pl-6' : ''}
                            `}
                        >
                            {ligne ? remplacer(ligne) : '\u00A0'}
                        </p>
                    ))}
                </div>

                {/* Timbre fiscal */}
                {maquette.timbre && (
                    <div className="flex justify-end mt-6">
                        <div className="border-2 border-dashed border-epo-yellow-500 rounded p-2 text-[10.5px] text-epo-yellow-700 font-semibold text-center">
                            <i className="mr-1 fas fa-stamp" />
                            Timbre fiscal 200 FCFA
                            <div className="text-[9px] font-normal text-epo-slate-400 mt-0.5">
                                {data.timbreFiscal ? '✓ Joint' : '⚠ À joindre'}
                            </div>
                        </div>
                    </div>
                )}

                {/* Signature */}
                <div className="flex justify-end mt-10">
                    <div className="text-center">
                        <div className="text-[12.5px] text-epo-slate-700 font-medium mb-12">
                            {maquette.signature}
                        </div>
                        <div className="border-t border-epo-slate-300 pt-1 text-[10.5px] text-epo-slate-400">
                            Nom, qualité et signature
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}