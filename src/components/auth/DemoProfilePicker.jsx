import { useEffect, useRef, useState } from 'react';

/**
 * Maquette uniquement : liste déroulante qui pré-remplit les identifiants
 * d'un compte de démonstration. Pour la retirer, supprimer ce fichier et
 * son utilisation dans LoginForm.jsx.
 */
const DEMO_ACCOUNTS = [
    { label: 'Chef du Service Courrier', name: 'TRAORÉ Ibrahim', email: 'i.traore@epo.bf' },
    { label: 'Secrétaire particulière du SG', name: 'KABORÉ Fatimata', email: 'f.kabore@epo.bf' },
    { label: 'Secrétaire Général', name: 'OUÉDRAOGO Salif', email: 's.ouedraogo@epo.bf' },
    { label: 'Secrétaire particulière du DG', name: 'OUATTARA Rasmata', email: 'r.ouattara@epo.bf' },
    { label: 'Directeur Général', name: 'NIKIÉMA Adama', email: 'a.nikiema@epo.bf' },
    { label: 'Agent de liaison', name: 'SAWADOGO Bakary', email: 'b.sawadogo@epo.bf' },
];

const DEMO_PASSWORD = 'Demo2026#';

export default function DemoProfilePicker({ onSelect }) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
        };
        const handleEscape = (e) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [open]);

    return (
        <div ref={wrapperRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className="flex items-center justify-between w-full gap-3 px-3.5 h-10 text-sm border border-dashed rounded-lg border-epo-slate-300 text-epo-slate-600 hover:border-epo-slate-400 hover:text-epo-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-epo-green-700"
            >
                <span>Utiliser un profil de démonstration</span>
                <i
                    className={`text-xs fas fa-chevron-down transition-transform ${open ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                />
            </button>

            {open && (
                <ul
                    role="listbox"
                    aria-label="Profils de démonstration"
                    className="absolute left-0 right-0 z-20 py-1 overflow-y-auto bg-white border rounded-lg bottom-full mb-2 max-h-80 border-epo-slate-200 shadow-elevated"
                >
                    {DEMO_ACCOUNTS.map((account) => (
                        <li key={account.email} role="option" aria-selected="false">
                            <button
                                type="button"
                                onClick={() => {
                                    onSelect({ email: account.email, password: DEMO_PASSWORD });
                                    setOpen(false);
                                }}
                                className="w-full px-3.5 py-2.5 text-left hover:bg-epo-slate-50 focus-visible:outline-none focus-visible:bg-epo-slate-100"
                            >
                                <span className="block text-sm font-medium text-epo-slate-900">
                                    {account.label}
                                </span>
                                <span className="block text-xs text-epo-slate-500">
                                    {account.name} · {account.email}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
