// src/components/transmissions/TransmissionsKpi.jsx
import KpiCard from '../ui/KpiCard';

export default function TransmissionsKpi({ transmissions }) {
    const aRemettre = transmissions.filter((t) => t.etat === 'a-remettre').length;
    const enTournee = transmissions.filter((t) => t.etat === 'en-tournee').length;
    const enRetard = transmissions.filter((t) => t.etat === 'en-retard').length;
    const dechargees = transmissions.filter((t) => t.etat === 'decharge').length;

    const kpis = [
        {
            id: 'a-remettre',
            label: "À remettre aujourd'hui",
            value: aRemettre,
            icon: 'fa-box',
            variant: 'default',
            change: 'stable',
            trend: 'flat',
        },
        {
            id: 'en-tournee',
            label: 'En tournée',
            value: enTournee,
            icon: 'fa-truck',
            variant: 'warning',
            change: '+2',
            trend: 'up',
        },
        {
            id: 'en-retard',
            label: 'En retard',
            value: enRetard,
            icon: 'fa-exclamation-triangle',
            variant: 'urgent',
            change: '+1',
            trend: 'up',
        },
        {
            id: 'decharge',
            label: 'Remises cette semaine',
            value: dechargees,
            icon: 'fa-check-circle',
            variant: 'success',
            change: '+12%',
            trend: 'up',
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((k) => (
                <KpiCard key={k.id} {...k} />
            ))}
        </div>
    );
}