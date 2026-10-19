// src/components/ui/ChoixCarte.jsx
// Grand bouton de choix dans une fenêtre (un seul choix possible).
export default function ChoixCarte({ selected, onClick, icon, titre, texte }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            className={`flex items-start gap-3 p-4 text-left rounded-lg border-2 transition-colors ${
                selected ? 'border-epo-green-600 bg-epo-green-50' : 'border-epo-slate-200 bg-white hover:border-epo-slate-300'
            }`}
        >
            {icon && (
                <i
                    className={`fas ${icon} mt-0.5 w-4 text-center ${selected ? 'text-epo-green-700' : 'text-epo-slate-400'}`}
                    aria-hidden="true"
                />
            )}
            <span className="min-w-0">
                <span className="block text-sm font-semibold text-epo-slate-900">{titre}</span>
                {texte && <span className="block mt-0.5 text-sm text-epo-slate-600">{texte}</span>}
            </span>
        </button>
    );
}
