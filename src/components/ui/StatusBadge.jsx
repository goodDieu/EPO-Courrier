import Badge from './Badge.jsx';

/**
 * Mapping des états métier vers les variants de couleur.
 * Modifiez ici pour ajuster les couleurs globalement.
 */
const STATUS_MAP = {
    // États des courriers entrants
    'Enregistré':       { variant: 'green', dot: true },
    'Chez SP-SG':       { variant: 'blue',  dot: true },
    'Chez SG':          { variant: 'yellow', dot: true },
    'Chez SP-DG':       { variant: 'purple', dot: true },
    'Chez DG':          { variant: 'purple', dot: true },
    'Retour SG':        { variant: 'yellow', dot: true },
    'Chez SCC':         { variant: 'blue',  dot: true },
    'Remis direction':  { variant: 'green', dot: true },
    'En traitement':    { variant: 'blue',  dot: true },
    'Objet satisfait':  { variant: 'green', dot: true },
    'Archivé':          { variant: 'slate', dot: true },
    'Incomplet':        { variant: 'yellow', dot: true },
    'Réorienté':        { variant: 'purple', dot: true },

    // États des courriers sortants / actes
    'Brouillon':        { variant: 'slate', dot: true },
    'Soumis SHI':       { variant: 'blue',  dot: true },
    'Renvoyé correction': { variant: 'yellow', dot: true },
    'Vu bon à signer':  { variant: 'yellow', dot: true },
    'En attente':       { variant: 'yellow', dot: true },
    'En attente DG':    { variant: 'yellow', dot: true },
    'En attente signature': { variant: 'yellow', dot: true },
    'Signé':            { variant: 'green', dot: true },
    'Rejeté':           { variant: 'red',   dot: true },
    'Rejeté DG':        { variant: 'red',   dot: true },
    'À re-signer':      { variant: 'red',   dot: true },
    'Traité SCC':       { variant: 'blue',  dot: true },
    'Remis liaison':    { variant: 'blue',  dot: true },
    'Transmis':         { variant: 'green', dot: true },
    'Déchargé':         { variant: 'green', dot: true },
    'Diffusé':          { variant: 'green', dot: true },
    'Post-visa':        { variant: 'green', dot: true },
    'Visé':             { variant: 'green', dot: true },
    'Urgent':           { variant: 'red',   dot: true },
    'En cours':         { variant: 'blue',  dot: true },
    'Validé':           { variant: 'green', dot: true },
};

/**
 * Badge de statut.
 *
 * Props :
 *   - status : string (ex: "Chez SG")
 *   - size   : 'sm' | 'md'
 */
export default function StatusBadge({ status, size = 'sm', className = '' }) {
    const config = STATUS_MAP[status] || { variant: 'slate', dot: true };

    return (
        <Badge
            variant={config.variant}
            size={size}
            dot={config.dot}
            className={className}
        >
            {status}
        </Badge>
    );
}