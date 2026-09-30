// src/components/echeances/EcheanceCalendrier.jsx
import { useState, useMemo } from 'react';
import { NIVEAUX } from '../../data/echeances.js';

/* ============================================================
   HELPERS DE DATE
   ============================================================ */

const MOIS_FR = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

const JOURS_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

function toKey(date) {
    return date.toISOString().slice(0, 10);
}

function sameDay(a, b) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

/**
 * Génère les 42 cases (6 semaines × 7 jours) pour un mois donné.
 * Semaine commence lundi.
 */
function buildMonthGrid(annee, mois) {
    const premierJour = new Date(annee, mois, 1);
    const jourSemaine = (premierJour.getDay() + 6) % 7; // 0 = lundi

    const start = new Date(premierJour);
    start.setDate(start.getDate() - jourSemaine);

    const cells = [];
    for (let i = 0; i < 42; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        cells.push({
            date: d,
            key: toKey(d),
            inMonth: d.getMonth() === mois,
        });
    }
    return cells;
}

/* ============================================================
   COMPOSANT
   ============================================================ */

export default function EcheanceCalendrier({
    dataParJour = {},           // { 'YYYY-MM-DD': { total, depasse, jourJ, ... } }
    selectedJour = null,        // 'YYYY-MM-DD' | null
    onSelectJour = () => {},
}) {
    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    const [annee, setAnnee] = useState(today.getFullYear());
    const [mois, setMois] = useState(today.getMonth());

    const cells = useMemo(() => buildMonthGrid(annee, mois), [annee, mois]);

    const prevMonth = () => {
        const d = new Date(annee, mois - 1, 1);
        setAnnee(d.getFullYear());
        setMois(d.getMonth());
    };

    const nextMonth = () => {
        const d = new Date(annee, mois + 1, 1);
        setAnnee(d.getFullYear());
        setMois(d.getMonth());
    };

    const goToday = () => {
        setAnnee(today.getFullYear());
        setMois(today.getMonth());
    };

    return (
        <div className="p-5 mb-6 bg-white border border-epo-slate-200 rounded-xl shadow-soft">
            {/* ============ En-tête ============ */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={prevMonth}
                        className="flex items-center justify-center w-8 h-8 transition rounded-lg hover:bg-epo-slate-100 text-epo-slate-600"
                        title="Mois précédent"
                    >
                        <i className="fas fa-chevron-left text-[12px]" />
                    </button>
                    <div className="text-[15px] font-semibold text-epo-slate-800 min-w-[140px] text-center">
                        {MOIS_FR[mois]} {annee}
                    </div>
                    <button
                        onClick={nextMonth}
                        className="flex items-center justify-center w-8 h-8 transition rounded-lg hover:bg-epo-slate-100 text-epo-slate-600"
                        title="Mois suivant"
                    >
                        <i className="fas fa-chevron-right text-[12px]" />
                    </button>
                </div>

                <button
                    onClick={goToday}
                    className="text-[12.5px] font-medium text-epo-green-600 hover:bg-epo-green-50 px-3 py-1.5 rounded-lg transition"
                >
                    <i className="fas fa-calendar-day mr-1.5" />
                    Aujourd'hui
                </button>
            </div>

            {/* ============ Jours de la semaine ============ */}
            <div className="grid grid-cols-7 gap-1 mb-1.5">
                {JOURS_FR.map((j) => (
                    <div
                        key={j}
                        className="text-center text-[11px] font-semibold uppercase tracking-wider text-epo-slate-400 py-1.5"
                    >
                        {j}
                    </div>
                ))}
            </div>

            {/* ============ Grille ============ */}
            <div className="grid grid-cols-7 gap-1">
                {cells.map((cell) => (
                    <CalendrierCase
                        key={cell.key}
                        cell={cell}
                        today={today}
                        data={dataParJour[cell.key]}
                        selected={selectedJour === cell.key}
                        onClick={onSelectJour}
                    />
                ))}
            </div>

            {/* ============ Légende ============ */}
            <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-epo-slate-100 text-[11px] text-epo-slate-500">
                <span className="font-semibold uppercase tracking-wider text-epo-slate-400 text-[10px]">
                    Légende :
                </span>
                {['depasse', 'jourJ', 'urgent', 'surveiller', 'ok'].map((k) => (
                    <span key={k} className="inline-flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${NIVEAUX[k].dot}`} />
                        {NIVEAUX[k].label}
                    </span>
                ))}
            </div>
        </div>
    );
}

/* ============================================================
   CASE DU CALENDRIER
   ============================================================ */

function CalendrierCase({ cell, today, data, selected, onClick }) {
    const { date, key, inMonth } = cell;

    const isToday = sameDay(date, today);
    const isPast = date < today && !isToday;
    const isWeekend = [5, 6].includes((date.getDay() + 6) % 7);

    // Niveau dominant = le plus urgent présent
    const dominant = useMemo(() => {
        if (!data || data.total === 0) return null;
        if (data.depasse > 0) return 'depasse';
        if (data.jourJ > 0) return 'jourJ';
        if (data.urgent > 0) return 'urgent';
        if (data.surveiller > 0) return 'surveiller';
        return 'ok';
    }, [data]);

    const n = dominant ? NIVEAUX[dominant] : null;
    const hasData = data && data.total > 0;

    // Classes dynamiques
    let containerCls = `
        relative rounded-lg p-2 min-h-[72px] text-left
        flex flex-col justify-between
        transition cursor-pointer border
    `;

    if (selected) {
        containerCls += ' border-epo-green-500 bg-epo-green-50 ring-2 ring-epo-green-500/20';
    } else if (isToday) {
        containerCls += ' border-epo-green-500 bg-epo-green-50';
    } else if (!inMonth) {
        containerCls += ' border-transparent bg-epo-slate-50/50 hover:bg-epo-slate-50';
    } else if (isPast) {
        containerCls += ' border-epo-slate-200 bg-epo-slate-50 hover:bg-epo-slate-100';
    } else {
        containerCls += ' border-epo-slate-200 bg-white hover:bg-epo-slate-50 hover:border-epo-slate-300';
    }

    if (isWeekend && inMonth && !isToday && !selected) {
        containerCls += ' bg-epo-slate-50/60';
    }

    return (
        <button
            onClick={() => onClick?.(key)}
            className={containerCls}
            title={buildTooltip(date, data)}
        >
            {/* Numéro du jour */}
            <div className={`
                text-[12.5px] font-semibold tabular-nums
                ${isToday ? 'text-epo-green-700' : ''}
                ${!inMonth ? 'text-epo-slate-300' : isPast ? 'text-epo-slate-400' : 'text-epo-slate-700'}
            `}>
                {date.getDate()}
            </div>

            {/* Contenu : compteur + pastille */}
            {hasData && (
                <div className="flex items-center justify-between gap-1 mt-auto">
                    {/* Pastille de niveau dominant */}
                    <span className={`w-1.5 h-1.5 rounded-full ${n.dot}`} />

                    {/* Compteur */}
                    <span className={`
                        text-[11.5px] font-bold tabular-nums px-1.5 py-0.5 rounded-md
                        ${n.bg} ${n.text}
                    `}>
                        {data.total}
                    </span>
                </div>
            )}

            {/* Indicateur discret du nombre de dépassés si > 0 et non dominant */}
            {hasData && data.depasse > 0 && dominant !== 'depasse' && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-epo-red-500" />
            )}
        </button>
    );
}

function buildTooltip(date, data) {
    if (!data || data.total === 0) {
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        });
    }
    const parts = [
        date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        }),
        `${data.total} échéance${data.total > 1 ? 's' : ''}`,
    ];
    if (data.depasse) parts.push(`· ${data.depasse} dépassé${data.depasse > 1 ? 's' : ''}`);
    if (data.jourJ) parts.push(`· ${data.jourJ} jour J`);
    if (data.urgent) parts.push(`· ${data.urgent} urgent${data.urgent > 1 ? 's' : ''}`);
    if (data.surveiller) parts.push(`· ${data.surveiller} à surveiller`);
    if (data.ok) parts.push(`· ${data.ok} OK`);
    return parts.join(' ');
}