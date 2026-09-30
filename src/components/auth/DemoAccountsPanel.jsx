import { useState } from 'react';

const DEMO_ACCOUNTS = [
    {
        email: 'a.kabore@epo.bf',
        password: 'Demo2026#',
        name: 'KABORÉ Aminata',
        role: 'Secrétaire Général',
        initials: 'SG',
        color: '#3C4653',
    },
    {
        email: 'i.ouedraogo@epo.bf',
        password: 'Demo2026#',
        name: 'OUÉDRAOGO Issa',
        role: 'Directeur Général',
        initials: 'DG',
        color: '#007a34',
    },
    {
        email: 'm.traore@epo.bf',
        password: 'Demo2026#',
        name: 'TRAORÉ Moussa',
        role: 'Chef SCC',
        initials: 'SC',
        color: '#b39200',
    },
    {
        email: 'a.sawadogo@epo.bf',
        password: 'Demo2026#',
        name: 'SAWADOGO Adama',
        role: 'Agent de liaison',
        initials: 'AL',
        color: '#008a3d',
    },
    {
        email: 'm.diakite@epo.bf',
        password: 'Demo2026#',
        name: 'DIAKITÉ Mariam',
        role: 'Administrateur',
        initials: 'AD',
        color: '#E30613',
    },
];

export default function DemoAccountsPanel({ onSelect }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Bouton flottant */}
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="
                    fixed bottom-4 left-4 z-50
                    flex items-center gap-2
                    px-4 py-2.5
                    bg-epo-slate-700 hover:bg-epo-slate-800
                    text-white
                    text-xs font-semibold
                    rounded-full
                    shadow-elevated
                    transition
                    hover:-translate-y-0.5
                "
            >
                <i className="fas fa-users" />
                Comptes de démo
            </button>

            {/* Panneau */}
            {open && (
                <div
                    className="
                        fixed bottom-[70px] left-4 z-40
                        w-80 max-h-[440px] overflow-y-auto
                        bg-white
                        border border-epo-slate-200
                        rounded-xl
                        shadow-elevated
                        animate-fade-in-up
                    "
                >
                    {/* En-tête */}
                    <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-4 py-3 border-b border-epo-slate-200">
                        <span className="flex items-center gap-2 text-sm font-semibold text-epo-slate-800">
                            <i className="fas fa-key text-epo-green-500" />
                            Comptes de démonstration
                        </span>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="w-6 h-6 flex items-center justify-center text-epo-slate-400 hover:text-epo-slate-700 hover:bg-epo-slate-100 rounded transition"
                        >
                            <i className="fas fa-times text-sm" />
                        </button>
                    </div>

                    {/* Liste */}
                    <div className="p-2">
                        {DEMO_ACCOUNTS.map((acc) => (
                            <button
                                key={acc.email}
                                type="button"
                                onClick={() => {
                                    onSelect(acc);
                                    setOpen(false);
                                }}
                                className="
                                    w-full flex items-center gap-3
                                    px-3 py-2.5 mb-1
                                    text-left
                                    rounded-lg
                                    transition
                                    hover:bg-epo-slate-50
                                "
                            >
                                <div
                                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                                    style={{ backgroundColor: acc.color }}
                                >
                                    {acc.initials}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-semibold text-epo-slate-800">
                                        {acc.name}
                                    </div>
                                    <div className="text-[11px] text-epo-slate-500">
                                        {acc.role}
                                    </div>
                                    <div className="text-[10.5px] text-epo-slate-400 font-mono truncate">
                                        {acc.email}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}