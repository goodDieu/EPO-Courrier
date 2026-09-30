import Badge from './Badge.jsx';

/**
 * Badge d'intégrité documentaire (PDF/A + hash SHA-256).
 * Utilisé sur les actes et courriers archivés.
 */
export default function IntegrityBadge({ className = '' }) {
    return (
        <Badge
            variant="green"
            icon="fa-shield-alt"
            className={`border-epo-green-300 ${className}`}
            size="sm"
        >
            PDF/A
        </Badge>
    );
}