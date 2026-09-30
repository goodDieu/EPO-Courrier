// src/components/liaison/TourneeCompteurs.jsx

export default function TourneeCompteurs({ faites, total, retards }) {
    return (
        <div className="grid grid-cols-3 gap-3 mb-6">
            <Compteur
                icon="fa-check-circle"
                label="Faites"
                value={faites}
                variant="success"
            />
            <Compteur
                icon="fa-clock"
                label="Restantes"
                value={total - faites}
                variant="default"
            />
            <Compteur
                icon="fa-exclamation-triangle"
                label="En retard"
                value={retards}
                variant={retards > 0 ? 'urgent' : 'default'}
            />
        </div>
    );
}

function Compteur({ icon, label, value, variant = 'default' }) {
    const variants = {
        success: {
            icon: 'text-epo-green-600',
            value: 'text-epo-green-700',
            bg: 'bg-epo-green-50',
        },
        urgent: {
            icon: 'text-epo-red-600',
            value: 'text-epo-red-700',
            bg: 'bg-epo-red-50',
        },
        default: {
            icon: 'text-epo-slate-500',
            value: 'text-epo-slate-900',
            bg: 'bg-epo-slate-100',
        },
    };

    const v = variants[variant];

    return (
        <div className="p-4 text-center bg-white border shadow-soft rounded-xl border-epo-slate-200">
            <div className={`inline-flex items-center justify-center w-10 h-10 mb-2 rounded-lg ${v.bg}`}>
                <i className={`fas ${icon} text-[15px] ${v.icon}`} />
            </div>
            <div className={`text-3xl font-bold tabular-nums ${v.value}`}>
                {value}
            </div>
            <div className="text-[11.5px] font-semibold uppercase tracking-wider text-epo-slate-500 mt-0.5">
                {label}
            </div>
        </div>
    );
}