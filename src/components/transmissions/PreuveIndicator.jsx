// src/components/transmissions/PreuveIndicator.jsx

export default function PreuveIndicator({ preuve, size = 'md' }) {
    const padding = size === 'sm' ? 'px-2 py-0.5 text-[10.5px]' : 'px-2.5 py-1 text-[11.5px]';

    if (preuve) {
        return (
            <span
                className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${padding} bg-epo-green-50 text-epo-green-700`}
                title={`Preuve ${preuve.type} enregistrée le ${new Date(preuve.date).toLocaleString('fr-FR')}`}
            >
                <i className={`fas ${preuve.type === 'signature' ? 'fa-signature' : 'fa-camera'} text-[10px]`} />
                Preuve jointe
            </span>
        );
    }

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${padding} bg-epo-yellow-50 text-epo-yellow-700`}
            title="Preuve de transmission requise (RG-25)"
        >
            <i className="fas fa-exclamation-triangle text-[10px]" />
            Preuve requise
        </span>
    );
}