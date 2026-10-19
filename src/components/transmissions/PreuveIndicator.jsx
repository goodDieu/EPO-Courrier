// src/components/transmissions/PreuveIndicator.jsx
import InlineTag from '../ui/InlineTag.jsx';

export default function PreuveIndicator({ preuve }) {
    if (preuve) {
        return (
            <InlineTag
                icon={preuve.type === 'signature' ? 'fa-signature' : 'fa-camera'}
                title={`Preuve ${preuve.type} enregistrée le ${new Date(preuve.date).toLocaleString('fr-FR')}`}
            >
                Preuve jointe
            </InlineTag>
        );
    }

    return (
        <InlineTag icon="fa-triangle-exclamation" tone="warning" title="Preuve de transmission requise">
            Preuve requise
        </InlineTag>
    );
}
