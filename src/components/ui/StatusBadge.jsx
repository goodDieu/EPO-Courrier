/**
 * Mapping des états métier vers un libellé lisible et une couleur.
 * Les données utilisent tantôt des libellés ("Chez SG"), tantôt des codes
 * ("chez-dg") : les deux formes sont acceptées, l'utilisateur voit toujours
 * le libellé.
 *
 * Affichage : un point de couleur suivi du libellé, sans pastille (comme les
 * statuts de GitHub ou Linear). Le texte porte le sens, le point le confirme.
 *   - green  : terminé / réussi
 *   - yellow : en attente d'une action
 *   - red    : rejet, retard, blocage
 *   - neutre : tout le reste (en cours, localisation, brouillon, archivé…)
 */
const STATUS_MAP = {
    // États des courriers entrants
    'Enregistré':           { variant: 'green' },
    'Chez SP-SG':           { variant: 'blue' },
    'Chez SG':              { variant: 'yellow' },
    'Chez SG (amendement)': { variant: 'yellow' },
    'Chez SP-DG':           { variant: 'purple' },
    'Chez DG':              { variant: 'purple' },
    'Retour SG':            { variant: 'yellow' },
    'Retour SG (imputation)': { variant: 'yellow' },
    'Chez SCC':             { variant: 'blue' },
    'Remis direction':      { variant: 'green' },
    'Remis à la direction': { variant: 'green' },
    'En traitement':        { variant: 'blue' },
    'Objet satisfait':      { variant: 'green' },
    'Archivé':              { variant: 'slate' },
    'Incomplet':            { variant: 'yellow' },
    'Réorienté':            { variant: 'purple' },
    'À dispatcher':         { variant: 'yellow' },
    'Traité':               { variant: 'green' },

    // États des courriers sortants / actes
    'Brouillon':            { variant: 'slate' },
    'Soumis SHI':           { variant: 'blue' },
    'Renvoyé correction':   { variant: 'red' },
    'Renvoyé pour correction': { variant: 'red' },
    'Vu bon à signer':      { variant: 'yellow' },
    'En attente':           { variant: 'yellow' },
    'En attente DG':        { variant: 'yellow' },
    'En attente signature': { variant: 'yellow' },
    'Signé':                { variant: 'green' },
    'Rejeté':               { variant: 'red' },
    'Rejeté DG':            { variant: 'red' },
    'À re-signer':          { variant: 'red' },
    'Traité SCC':           { variant: 'blue' },
    'Remis liaison':        { variant: 'blue' },
    'Transmis':             { variant: 'green' },
    'Déchargé':             { variant: 'green' },
    'Diffusé':              { variant: 'green' },
    'Post-visa':            { variant: 'green' },
    'Visé':                 { variant: 'green' },
    'Urgent':               { variant: 'red' },
    'En cours':             { variant: 'blue' },
    'Validé':               { variant: 'green' },
};

// Codes techniques → libellés affichés
const CODE_LABELS = {
    'a-cacheter': 'À cacheter',
    'a-cocher': 'À cocher',
    'a-dispatcher': 'À dispatcher',
    'a-numeroter': 'À numéroter',
    'a-re-signer': 'À re-signer',
    'a-remettre': 'À remettre',
    'a-scanner': 'À scanner',
    'a-traiter': 'À traiter',
    'a-trier': 'À trier',
    'a-venir': 'À venir',
    'archive': 'Archivé',
    'bloque': 'Bloqué',
    'brouillon': 'Brouillon',
    'chez-dg': 'Chez DG',
    'chez-scc': 'Chez SCC',
    'chez-sg': 'Chez SG',
    'cloture': 'Clôturé',
    'decharge': 'Déchargé',
    'diffuse': 'Diffusé',
    'en-attente-validation': 'En attente de validation',
    'en-circulation': 'En circulation',
    'en-correction': 'En correction',
    'en-cours': 'En cours',
    'en-retard': 'En retard',
    'en-tournee': 'En tournée',
    'en-traitement': 'En traitement',
    'enregistre': 'Enregistré',
    'erreur': 'Erreur',
    'faite': 'Faite',
    'introduit': 'Introduit',
    'nouveau': 'Nouveau',
    'objet-satisfait': 'Objet satisfait',
    'partielle': 'Partielle',
    'planifiee': 'Planifiée',
    'pret-expedition': 'Prêt pour expédition',
    'pret-introduire': 'Prêt à introduire',
    're-soumis': 'Resoumis',
    'rejete': 'Rejeté',
    'remis': 'Remis',
    'remis-direction': 'Remis à la direction',
    'renvoye-correction': 'Renvoyé pour correction',
    'retard': 'En retard',
    'retour-sg': 'Retour SG',
    'scanne': 'Scanné',
    'signe': 'Signé',
    'soumis-shi': 'Soumis SHI',
    'terminee': 'Terminée',
    'traite': 'Traité',
    'transmis': 'Transmis',
    'transmis-sp-sg': 'Transmis au SP-SG',
    'vu-bon-a-signer': 'Vu bon à signer',
};

// Couleurs des libellés issus de codes, absents de STATUS_MAP
const CODE_VARIANTS = {
    'À cacheter': 'yellow',
    'À cocher': 'yellow',
    'À numéroter': 'yellow',
    'À remettre': 'yellow',
    'À scanner': 'yellow',
    'À traiter': 'yellow',
    'À trier': 'yellow',
    'À venir': 'slate',
    'Bloqué': 'red',
    'Clôturé': 'slate',
    'En attente de validation': 'yellow',
    'En circulation': 'blue',
    'En correction': 'yellow',
    'En retard': 'red',
    'En tournée': 'blue',
    'Erreur': 'red',
    'Faite': 'green',
    'Introduit': 'blue',
    'Nouveau': 'blue',
    'Partielle': 'yellow',
    'Planifiée': 'slate',
    'Prêt pour expédition': 'blue',
    'Prêt à introduire': 'blue',
    'Resoumis': 'blue',
    'Remis': 'green',
    'Scanné': 'green',
    'Terminée': 'green',
    'Transmis au SP-SG': 'blue',
};

function getStatusLabel(status) {
    return CODE_LABELS[status] || status;
}

const DOTS = {
    green: 'bg-epo-green-600',
    yellow: 'bg-epo-yellow-500',
    red: 'bg-epo-red-600',
};

/**
 * Statut.
 *
 * Props :
 *   - status : string (libellé "Chez SG" ou code "chez-dg")
 *   - label  : libellé à afficher (facultatif, sinon déduit du code)
 *   - size   : 'sm' | 'md'
 */
export default function StatusBadge({ status, label: forcedLabel, size = 'sm', className = '' }) {
    const label = forcedLabel || getStatusLabel(status);
    const code = getStatusLabel(status);
    const variant = STATUS_MAP[label]?.variant || CODE_VARIANTS[label] || STATUS_MAP[code]?.variant || CODE_VARIANTS[code] || 'slate';
    const dot = DOTS[variant] || 'bg-epo-slate-400';

    return (
        <span
            className={`inline-flex items-center gap-2 whitespace-nowrap text-epo-slate-800 ${
                size === 'md' ? 'text-base' : 'text-sm'
            } ${variant === 'red' ? 'font-medium' : ''} ${className}`}
        >
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} aria-hidden="true" />
            {label}
        </span>
    );
}
