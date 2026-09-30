// src/components/stats/AlerteCard.jsx

const NIVEAUX = {
    rouge: {
        bg: 'bg-epo-red-50',
        border: 'border-epo-red-200',
        icon: 'text-epo-red-600',
        dot: 'bg-epo-red-500',
    },
    jaune: {
        bg: 'bg-epo-yellow-50',
        border: 'border-epo-yellow-200',
        icon: 'text-epo-yellow-700',
        dot: 'bg-epo-yellow-500',
    },
    vert: {
        bg: 'bg-epo-green-50',
        border: 'border-epo-green-200',
        icon: 'text-epo-green-600',
        dot: 'bg-epo-green-500',
    },
};

export default function AlerteCard({ alerte }) {
    const style = NIVEAUX[alerte.niveau] || NIVEAUX.jaune;

    return (
        <div className={`
            flex items-start gap-3 p-4 rounded-xl border
            ${style.bg} ${style.border}
        `}>
            <div className={`w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 ${style.icon}`}>
                <i className={`fas ${alerte.icon}`} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                    <div className="text-[13.5px] font-semibold text-epo-slate-800">
                        {alerte.titre}
                    </div>
                </div>
                <div className="text-[12.5px] text-epo-slate-600 mt-1 leading-relaxed">
                    {alerte.description}
                </div>
                {alerte.action && (
                    <button className="mt-2 text-[12.5px] font-semibold text-epo-slate-800 hover:underline inline-flex items-center gap-1.5">
                        {alerte.action.label}
                        <i className="fas fa-arrow-right text-[10px]" />
                    </button>
                )}
            </div>
        </div>
    );
}