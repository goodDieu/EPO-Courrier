// src/components/liaison/PlanningCalendrier.jsx
import { useState, useMemo } from 'react';
import {
    ETATS_TOURNEE,
    JOURS_FR,
    MOIS_FR,
    toKey,
    sameDay,
    buildMonthGrid,
    buildWeekGrid,
} from '../../data/planningLiaison.js';

export default function PlanningCalendrier({
    tournees,
    vue = 'mois', // 'mois' | 'semaine'
    selectedJour = null,
    onSelectJour,
    onChangeVue,
}) {
    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    const [annee, setAnnee] = useState(today.getFullYear());
    const [mois, setMois] = useState(today.getMonth());

    const cells = useMemo(() => {
        if (vue === 'semaine') {
            return buildWeekGrid(selectedJour ? new Date(selectedJour) : today);
        }
        return buildMonthGrid(annee, mois);
    }, [vue, annee, mois, selectedJour, today]);

    // Groupement par jour pour un accès rapide
    const tourneesParJour = useMemo(() => {
        const map = {};
        tournees.forEach((t) => {
            if (!map[t.date]) map[t.date] = [];
            map[t.date].push(t);
        });
        return map;
    }, [tournees]);

    const prevPeriode = () => {
        if (vue === 'semaine') {
            const d = new Date(selectedJour || today);
            d.setDate(d.getDate() - 7);
            onSelectJour?.(toKey(d));
        } else {
            const d = new Date(annee, mois - 1, 1);
            setAnnee(d.getFullYear());
            setMois(d.getMonth());
        }
    };

    const nextPeriode = () => {
        if (vue === 'semaine') {
            const d = new Date(selectedJour || today);
            d.setDate(d.getDate() + 7);
            onSelectJour?.(toKey(d));
        } else {
            const d = new Date(annee, mois + 1, 1);
            setAnnee(d.getFullYear());
            setMois(d.getMonth());
        }
    };

    const goToday = () => {
        if (vue === 'semaine') {
            onSelectJour?.(toKey(today));
        } else {
            setAnnee(today.getFullYear());
            setMois(today.getMonth());
        }
        onSelectJour?.(toKey(today));
    };

    const titrePeriode = vue === 'semaine'
        ? (() => {
              const ref = new Date(selectedJour || today);
              const jour = (ref.getDay() + 6) % 7;
              const lundi = new Date(ref);
              lundi.setDate(ref.getDate() - jour);
              const dimanche = new Date(lundi);
              dimanche.setDate(lundi.getDate() + 6);
              return `${lundi.getDate()} - ${dimanche.getDate()} ${MOIS_FR[dimanche.getMonth()]} ${dimanche.getFullYear()}`;
          })()
        : `${MOIS_FR[mois]} ${annee}`;

    return (
        <div className="overflow-hidden bg-white border border-epo-slate-200 rounded-xl shadow-soft">
            {/* En-tête navigation */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-epo-slate-100">
                <div className="flex items-center gap-2">
                    <button
                        onClick={prevPeriode}
                        className="flex items-center justify-center transition rounded-lg w-9 h-9 hover:bg-epo-slate-100 text-epo-slate-600"
                        title="Précédent"
                    >
                        <i className="fas fa-chevron-left text-[12px]" />
                    </button>
                    <div className="text-[15px] font-semibold text-epo-slate-800 min-w-[180px] text-center">
                        {titrePeriode}
                    </div>
                    <button
                        onClick={nextPeriode}
                        className="flex items-center justify-center transition rounded-lg w-9 h-9 hover:bg-epo-slate-100 text-epo-slate-600"
                        title="Suivant"
                    >
                        <i className="fas fa-chevron-right text-[12px]" />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    {/* Bascule Mois / Semaine */}
                    <div className="inline-flex p-1 rounded-lg bg-epo-slate-100">
                        <button
                            onClick={() => onChangeVue?.('mois')}
                            className={`
                                px-3 py-1.5 rounded-md text-[12px] font-semibold transition
                                ${vue === 'mois'
                                    ? 'bg-white text-epo-slate-900 shadow-soft'
                                    : 'text-epo-slate-500 hover:text-epo-slate-700'}
                            `}
                        >
                            Mois
                        </button>
                        <button
                            onClick={() => onChangeVue?.('semaine')}
                            className={`
                                px-3 py-1.5 rounded-md text-[12px] font-semibold transition
                                ${vue === 'semaine'
                                    ? 'bg-white text-epo-slate-900 shadow-soft'
                                    : 'text-epo-slate-500 hover:text-epo-slate-700'}
                            `}
                        >
                            Semaine
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
            </div>

            {/* Jours de la semaine */}
            <div className="grid grid-cols-7 gap-1 px-3 pt-3">
                {JOURS_FR.map((j) => (
                    <div
                        key={j}
                        className="text-center text-[11px] font-semibold uppercase tracking-wider text-epo-slate-400 py-1.5"
                    >
                        {j}
                    </div>
                ))}
            </div>

            {/* Grille */}
            <div className={`grid grid-cols-7 gap-1 p-3 ${vue === 'semaine' ? '' : ''}`}>
                {cells.map((cell) => (
                    <CalendrierCase
                        key={cell.key}
                        cell={cell}
                        tournees={tourneesParJour[cell.key] || []}
                        today={today}
                        selected={selectedJour === cell.key}
                        onClick={onSelectJour}
                        vue={vue}
                    />
                ))}
            </div>

            {/* Légende */}
            <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-t border-epo-slate-100 text-[11px] text-epo-slate-500">
                <span className="font-semibold uppercase tracking-wider text-epo-slate-400 text-[10px]">
                    Légende :
                </span>
                {Object.values(ETATS_TOURNEE).map((e) => (
                    <span key={e.key} className="inline-flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${e.dot}`} />
                        {e.label}
                    </span>
                ))}
            </div>
        </div>
    );
}

/* ============================================================
   CASE DU CALENDRIER
   ============================================================ */

function CalendrierCase({ cell, tournees, today, selected, onClick, vue }) {
    const { date, key, inMonth } = cell;

    const isToday = sameDay(date, today);
    const isPast = date < today && !isToday;
    const isWeekend = [5, 6].includes((date.getDay() + 6) % 7);

    const totalRemises = tournees.reduce((sum, t) => sum + t.nbEtapes, 0);
    const hasTournees = tournees.length > 0;

    // Niveau "dominant" : en-cours > planifiee > partielle > terminee
    const dominant = (() => {
        if (tournees.some((t) => t.etat === 'en-cours')) return 'en-cours';
        if (tournees.some((t) => t.etat === 'planifiee')) return 'planifiee';
        if (tournees.some((t) => t.etat === 'partielle')) return 'partielle';
        if (tournees.some((t) => t.etat === 'terminee')) return 'terminee';
        return null;
    })();

    const dominantEtat = dominant ? ETATS_TOURNEE[dominant] : null;

    // Classes dynamiques
    let containerCls = `
        relative rounded-lg p-2 min-h-[72px] text-left
        flex flex-col justify-between
        transition cursor-pointer border
    `;

    if (vue === 'semaine') {
        containerCls = containerCls.replace('min-h-[72px]', 'min-h-[120px]');
    }

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
        >
            {/* Numéro du jour */}
            <div className="flex items-start justify-between">
                <span className={`
                    text-[12.5px] font-semibold tabular-nums
                    ${isToday ? 'text-epo-green-700' : ''}
                    ${!inMonth ? 'text-epo-slate-300' : isPast ? 'text-epo-slate-400' : 'text-epo-slate-700'}
                `}>
                    {date.getDate()}
                </span>

                {hasTournees && (
                    <span className={`
                        inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold tabular-nums
                        ${dominantEtat.chip}
                    `}>
                        {tournees.length}
                    </span>
                )}
            </div>

            {/* Barres de tournée */}
            {hasTournees && (
                <div className="flex flex-col gap-0.5 mt-auto">
                    {tournees.slice(0, 3).map((t) => (
                        <div
                            key={t.id}
                            className={`
                                h-1 rounded-full ${ETATS_TOURNEE[t.etat].bar}
                            `}
                            title={`${t.libelle} - ${t.nbFaites}/${t.nbEtapes} remises`}
                        />
                    ))}
                    {tournees.length > 3 && (
                        <div className="text-[9px] text-epo-slate-400 text-center font-semibold">
                            +{tournees.length - 3}
                        </div>
                    )}
                </div>
            )}
        </button>
    );
}