// src/components/transmissions/TourneesDuJour.jsx
import TourneeCarte from './TourneeCarte';

export default function TourneesDuJour({ tournees, onVoir }) {
    if (tournees.length === 0) {
        return (
            <div className="p-12 text-center bg-white border border-epo-slate-200 rounded-xl shadow-soft">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-epo-slate-100">
                    <i className="text-2xl fas fa-truck text-epo-slate-400" />
                </div>
                <div className="text-[15px] font-semibold text-epo-slate-800 mb-1">
                    Aucune tournée aujourd'hui
                </div>
                <div className="text-[13px] text-epo-slate-500">
                    Les tournées du jour apparaîtront ici.
                </div>
            </div>
        );
    }

    return (
        <div className="grid w-full min-w-0 gap-4 grid-cols-[repeat(auto-fill,minmax(380px,1fr))]">
            {tournees.map((t) => (
                <TourneeCarte key={t.id} tournee={t} onVoir={onVoir} />
            ))}
        </div>
    );
}