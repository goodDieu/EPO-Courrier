// src/data/demoClock.js
// Les données de démonstration sont datées du 29/09/2026 en fin de matinée.
// Les calculs « aujourd'hui », « 7 derniers jours »… partent de cette date pour
// rester cohérents avec les données, quelle que soit la date réelle.
export const DEMO_NOW = new Date('2026-09-29T11:00:00');

export function isSameDay(iso, ref = DEMO_NOW) {
    if (!iso) return false;
    const d = new Date(iso);
    return (
        d.getDate() === ref.getDate() &&
        d.getMonth() === ref.getMonth() &&
        d.getFullYear() === ref.getFullYear()
    );
}

export function daysSince(iso, ref = DEMO_NOW) {
    return (ref - new Date(iso)) / (1000 * 60 * 60 * 24);
}

/** « 29/09 à 10:45 », ou « Aujourd'hui à 10:45 » pour la date de démonstration. */
export function formatJourHeure(iso) {
    if (!iso) return '-';
    const d = new Date(iso);
    const heure = d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    if (isSameDay(iso)) return `Aujourd'hui à ${heure}`;
    const jour = d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
    return `${jour} à ${heure}`;
}
