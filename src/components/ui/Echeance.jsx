/**
 * Échéance d'un dossier, lisible d'un coup d'œil :
 *   « À faire avant 12:00 », « Avant demain 09:00 », « Dépassé de 1h 20min ».
 * Le texte reste foncé ; une icône rouge signale le dépassement.
 *
 * Props :
 *   - iso    : date limite (ISO). Sans date, rien n'est affiché.
 *   - prefix : texte avant l'heure (par défaut « Avant »)
 */
import { DEMO_NOW, isSameDay } from '../../data/demoClock.js';
import { formatDuree } from '../../data/arriveesSCC.js';

function libelleDate(d) {
    const heure = d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    if (isSameDay(d)) return heure;
    const demain = new Date(DEMO_NOW);
    demain.setDate(demain.getDate() + 1);
    if (isSameDay(d, demain)) return `demain ${heure}`;
    return `le ${d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })} à ${heure}`;
}

export default function Echeance({ iso, prefix = 'Avant', className = '' }) {
    if (!iso) return null;
    const d = new Date(iso);
    const ecart = Math.round((d - DEMO_NOW) / 60000);

    if (ecart < 0) {
        return (
            <span className={`inline-flex items-center gap-1.5 text-sm font-medium text-epo-slate-900 whitespace-nowrap ${className}`}>
                <i className="fas fa-circle-exclamation text-[0.85em] text-epo-red-600" aria-hidden="true" />
                Dépassé de {formatDuree(ecart)}
            </span>
        );
    }

    return (
        <span className={`text-sm whitespace-nowrap ${ecart < 60 ? 'font-medium text-epo-slate-900' : 'text-epo-slate-600'} ${className}`}>
            {prefix} {libelleDate(d)}
        </span>
    );
}
