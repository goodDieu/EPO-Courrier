/**
 * Historique d'un dossier, du plus récent au plus ancien.
 *
 * Props :
 *   - items : [{ date (ISO), action, par }]
 */
import { formatJourHeure } from '../../data/demoClock.js';

export default function Historique({ items = [] }) {
    if (items.length === 0) return <p className="text-sm text-epo-slate-600">Aucun mouvement enregistré.</p>;
    const liste = [...items].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <ol className="relative">
            {liste.map((h, i) => (
                <li key={`${h.date}-${i}`} className="relative pb-4 pl-6 last:pb-0">
                    {i < liste.length - 1 && <span className="absolute left-[5px] top-3 bottom-0 w-px bg-epo-slate-200" aria-hidden="true" />}
                    <span
                        className={`absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full border-2 ${i === 0 ? 'bg-epo-green-600 border-epo-green-600' : 'bg-white border-epo-slate-300'}`}
                        aria-hidden="true"
                    />
                    <p className="text-sm font-medium text-epo-slate-900">{h.action}</p>
                    <p className="text-sm text-epo-slate-600">
                        {formatJourHeure(h.date)}
                        {h.par ? ` · ${h.par}` : ''}
                    </p>
                </li>
            ))}
        </ol>
    );
}
