export const MATRIX_EISENHOWER = [
    {
        id: 'important-urgent',
        title: 'Important et urgent',
        count: 7,
        sub: 'À traiter en priorité absolue',
        variant: 'important-urgent',
    },
    {
        id: 'important-not-urgent',
        title: 'Important et non urgent',
        count: 12,
        sub: 'À planifier',
        variant: 'important-not-urgent',
    },
    {
        id: 'not-important-urgent',
        title: 'Non important et urgent',
        count: 4,
        sub: 'Déléguer si possible',
        variant: 'not-important-urgent',
    },
    {
        id: 'not-important-not-urgent',
        title: 'Non important et non urgent',
        count: 3,
        sub: 'À reporter / archiver',
        variant: 'not-important-not-urgent',
    },
];

export const MATRIX_EISENHOWER_RSC = [
    { id: 'iu', variant: 'important-urgent', title: 'Important · Urgent', count: 4, sub: 'À traiter immédiatement' },
    { id: 'inu', variant: 'important-not-urgent', title: 'Important · Non urgent', count: 9, sub: 'À planifier' },
    { id: 'niu', variant: 'not-important-urgent', title: 'Non important · Urgent', count: 3, sub: 'À déléguer' },
    { id: 'ninu', variant: 'not-important-not-urgent', title: 'Non important · Non urgent', count: 2, sub: 'À archiver' },
];