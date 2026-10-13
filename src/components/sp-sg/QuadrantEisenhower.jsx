// src/components/sp-sg/QuadrantEisenhower.jsx
import {
    QUADRANTS,
    TYPES_DOSSIERS,
    formatDuree,
} from '../../data/triSPSG.js';

export default function QuadrantEisenhower({ quadrantKey, dossiers, onDragOver, onDrop, onClasser, onVoir }) {
    const quadrant = QUADRANTS[quadrantKey];
    const isEmpty = dossiers.length === 0;

    const handleDragOver = (e) => {
        e.preventDefault();
        onDragOver?.(quadrantKey);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const dossierId = e.dataTransfer.getData('text/dossier-id');
        if (dossierId) {
            onDrop?.(dossierId, quadrantKey);
        }
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`
                flex flex-col rounded-xl border-2 p-4 transition min-h-[280px]
                ${quadrant.bg} ${quadrant.border}
                hover:shadow-card
            `}
        >
            {/* En-tête du quadrant */}
            <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${quadrant.chip}`}>
                        <i className={`fas ${quadrant.icon} text-[16px]`} />
                    </span>
                    <div>
                        <div className="text-[14px] font-bold text-epo-slate-900">
                            {quadrant.label}
                        </div>
                        <div className="text-[11px] text-epo-slate-500">
                            {quadrant.subtitle}
                        </div>
                    </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-bold ${quadrant.chip}`}>
                    {dossiers.length}
                </span>
            </div>

            {/* Description action */}
            <div className="text-[10.5px] uppercase tracking-wider font-semibold text-epo-slate-400 mb-3">
                <i className="fas fa-arrow-right text-[9px] mr-1" />
                {quadrant.action}
            </div>

            {/* Liste des dossiers */}
            {isEmpty ? (
                <div className="flex items-center justify-center flex-1 py-8">
                    <div className="text-center">
                        <i className="block mb-2 text-2xl fas fa-inbox text-epo-slate-300" />
                        <div className="text-[12px] text-epo-slate-400 italic">
                            Glissez un dossier ici pour le classer
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col flex-1 gap-2">
                    {dossiers.map((d) => (
                        <CarteDossierTrie
                            key={d.id}
                            dossier={d}
                            onVoir={onVoir}
                            quadrantKey={quadrantKey}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

/* ============================================================
   CARTE DOSSIER
   ============================================================ */

function CarteDossierTrie({ dossier, onVoir, quadrantKey }) {
    const d = dossier;
    const type = TYPES_DOSSIERS[d.type];
    const isUrgent = d.priorite === 'urgent';

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/dossier-id', d.id);
        e.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onClick={() => onVoir(d)}
            className={`
                bg-white border border-epo-slate-200 rounded-lg p-3 cursor-move
                shadow-soft hover:shadow-card hover:-translate-y-0.5 transition
                ${isUrgent ? 'border-l-4 border-l-epo-red-500' : ''}
            `}
        >
            {/* En-tête */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-mono text-[10.5px] font-bold text-epo-slate-700 bg-epo-slate-100 px-2 py-0.5 rounded-full">
                    {d.id}
                </span>
                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${type.color}`}>
                    <i className={`fas ${type.icon} text-[8px]`} />
                    {type.label}
                </span>
            </div>

            {/* Objet */}
            <div className="text-[12px] font-semibold text-epo-slate-900 leading-snug mb-1.5 line-clamp-2">
                {d.objet}
            </div>

            {/* Méta */}
            <div className="flex items-center justify-between gap-2 text-[10.5px] text-epo-slate-500">
                <span className="truncate">
                    <i className="fas fa-building text-[9px] mr-1" />
                    {d.expediteurStructure}
                </span>
                <span className={`tabular-nums ${d.tempsAttente > 60 ? 'text-epo-red-600 font-semibold' : ''}`}>
                    {formatDuree(d.tempsAttente)}
                </span>
            </div>
        </div>
    );
}