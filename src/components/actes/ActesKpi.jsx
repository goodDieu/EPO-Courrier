// src/components/actes/ActesKpi.jsx
import KpiCard from '../ui/KpiCard';

export default function ActesKpi({ actes }) {
    const total = actes.length;
    const enAttente = actes.filter((a) =>
        ['soumis-shi', 'chez-sg', 'vu-bon-a-signer', 'chez-dg'].includes(a.etat)
    ).length;
    const signesSemaine = actes.filter(
        (a) => a.etat === 'signe' && a.dateSignature && isThisWeek(a.dateSignature)
    ).length;
    const rejetes = actes.filter((a) => a.etat === 'rejete').length;

    const kpis = [
        {
            id: 'total',
            label: 'Actes ce mois',
            value: total,
            icon: 'fa-file-signature',
            variant: 'default',
            change: '+12%',
            trend: 'up',
        },
        {
            id: 'attente',
            label: 'En attente signature',
            value: enAttente,
            icon: 'fa-hourglass-half',
            variant: 'warning',
            change: 'stable',
            trend: 'flat',
        },
        {
            id: 'signes',
            label: 'Signés cette semaine',
            value: signesSemaine,
            icon: 'fa-check-circle',
            variant: 'success',
            change: '+3',
            trend: 'up',
        },
        {
            id: 'rejetes',
            label: 'Rejetés à corriger',
            value: rejetes,
            icon: 'fa-times-circle',
            variant: 'urgent',
            change: '-1',
            trend: 'down',
        },
        {
            id: 'delai',
            label: 'Délai visa → signature',
            value: '1j 6h',
            icon: 'fa-clock',
            variant: 'info',
            change: '-8%',
            trend: 'down',
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 xl:grid-cols-5">
            {kpis.map((k) => (
                <KpiCard key={k.id} {...k} />
            ))}
        </div>
    );
}

function isThisWeek(iso) {
    const d = new Date(iso);
    const now = new Date();
    const diff = (now - d) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
}