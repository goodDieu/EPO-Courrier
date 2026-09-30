// src/components/actes/ActesGroupe.jsx
import { StatusBadge } from '../ui';
import NatureBadge from './NatureBadge';
import { ETATS_ACTES, SIGNATURES, formatDate, NATURES_ACTES } from '../../data/actes.js';
import { computeNiveau } from '../../data/actesHelpers.js';

// Ordre d'affichage des groupes (du plus prioritaire au moins)
const ORDRE_ETATS = [
    'rejete',
    'chez-dg',
    'vu-bon-a-signer',
    'chez-sg',
    'soumis-shi',
    'brouillon',
    'signe',
    'diffuse',
    'archive',
];

export default function ActesGroupe({ actes, onVoir }) {
    if (actes.length === 0) {
        return (
            <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-slate-100">
                    <i className="text-2xl fas fa-file-signature text-epo-slate-400" />
                </div>
                <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                    Aucun acte trouvé
                </div>
                <div className="text-[13px] text-epo-slate-500">
                    Essayez d'élargir vos filtres.
                </div>
            </div>
        );
    }

    // Regroupement
    const groupes = {};
    actes.forEach((a) => {
        if (!groupes[a.etat]) groupes[a.etat] = [];
        groupes[a.etat].push(a);
    });

    return (
        <div className="flex flex-col gap-6">
            {ORDRE_ETATS.map((etatKey) => {
                const items = groupes[etatKey];
                if (!items || items.length === 0) return null;
                const etat = ETATS_ACTES[etatKey];

                return (
                    <div key={etatKey}>
                        {/* En-tête de groupe */}
                        <div className="flex items-center gap-2.5 mb-2.5">
                            <StatusBadge status={etatKey} />
                            <span className="text-[12.5px] font-semibold text-epo-slate-500">
                                {items.length} acte{items.length > 1 ? 's' : ''}
                            </span>
                        </div>

                        {/* Cartes compactes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {items.map((a) => (
                                <ActeCard key={a.id} acte={a} onVoir={onVoir} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function ActeCard({ acte, onVoir }) {
    const niveau = computeNiveau(acte.tempsRestant);
    const niveauInfo = getNiveauInfo(niveau);
    const sig = SIGNATURES[acte.signature];
    const nature = NATURES_ACTES[acte.nature];

    return (
        <button
            onClick={() => onVoir(acte)}
            className={`
                text-left bg-white border border-epo-slate-200 border-l-4
                ${niveauInfo.border}
                rounded-xl p-3.5 shadow-soft hover:shadow-card hover:-translate-y-0.5
                transition cursor-pointer
            `}
        >
            <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="font-mono text-[11.5px] font-bold text-epo-slate-700 bg-epo-slate-100 px-2 py-0.5 rounded-full">
                    {acte.id}
                </span>
                <NatureBadge nature={acte.nature} size="sm" />
            </div>

            <div className="text-[13px] font-semibold text-epo-slate-900 truncate mb-1.5">
                {acte.objet}
            </div>

            <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-epo-slate-100 flex items-center justify-center text-[9px] font-bold text-epo-slate-600 flex-shrink-0">
                    {acte.beneficiaireNom.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium text-epo-slate-700 truncate">
                        {acte.beneficiaireNom}
                    </div>
                    <div className="text-[10.5px] text-epo-slate-500 font-mono truncate">
                        {acte.beneficiaireMatricule}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-epo-slate-100">
                <div className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${sig.color}`}>
                    <i className={`fas ${sig.icon} text-[10px]`} />
                    <span className="truncate max-w-[110px]">{sig.label}</span>
                </div>
                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${niveauInfo.bg} ${niveauInfo.text}`}>
                    <i className={`fas ${niveauInfo.icon} text-[8px]`} />
                    {niveauInfo.label}
                </span>
            </div>
        </button>
    );
}

function getNiveauInfo(niveau) {
    switch (niveau) {
        case 'depasse':
            return { label: 'Dépassé', icon: 'fa-exclamation-circle', bg: 'bg-epo-red-50', text: 'text-epo-red-700', border: 'border-l-epo-red-500' };
        case 'jourJ':
            return { label: 'Jour J', icon: 'fa-clock', bg: 'bg-epo-yellow-50', text: 'text-epo-yellow-800', border: 'border-l-epo-yellow-500' };
        case 'urgent':
            return { label: 'Urgent', icon: 'fa-hourglass-half', bg: 'bg-epo-yellow-50', text: 'text-epo-yellow-700', border: 'border-l-epo-yellow-400' };
        case 'surveiller':
            return { label: 'À surveiller', icon: 'fa-hourglass-start', bg: 'bg-epo-slate-50', text: 'text-epo-slate-700', border: 'border-l-epo-slate-400' };
        default:
            return { label: 'OK', icon: 'fa-check-circle', bg: 'bg-epo-green-50', text: 'text-epo-green-700', border: 'border-l-epo-green-500' };
    }
}