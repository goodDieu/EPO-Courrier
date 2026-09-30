// src/components/stats/TauxJauge.jsx

/**
 * Jauge circulaire SVG.
 */
export default function TauxJauge({ valeur = 0, cible = 90, label, size = 140 }) {
    const radius = (size - 16) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (valeur / 100) * circumference;

    const color =
        valeur >= cible ? '#009A44' : valeur >= cible * 0.8 ? '#FFD100' : '#E30613';

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} className="-rotate-90">
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="#e8ecf1"
                        strokeWidth="10"
                    />
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        className="transition-all duration-700"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold tabular-nums" style={{ color }}>
                        {valeur}%
                    </div>
                    <div className="text-[10.5px] text-epo-slate-400 uppercase tracking-wider mt-0.5">
                        cible {cible}%
                    </div>
                </div>
            </div>
            {label && (
                <div className="text-[12px] text-epo-slate-500 mt-2 text-center">
                    {label}
                </div>
            )}
        </div>
    );
}