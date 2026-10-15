// src/components/parametrage/ToggleSwitch.jsx

export default function ToggleSwitch({ checked, onChange, disabled, size = 'md' }) {
    const width = size === 'sm' ? 'w-9 h-5' : 'w-11 h-6';
    const dot = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    const translate = size === 'sm' ? 'translate-x-4' : 'translate-x-5';

    return (
        <button
            type="button"
            onClick={() => !disabled && onChange(!checked)}
            disabled={disabled}
            className={`
                relative inline-flex items-center flex-shrink-0 rounded-full
                transition-colors focus:outline-none
                ${width}
                ${checked ? 'bg-epo-green-500' : 'bg-epo-slate-300'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
        >
            <span className={`
                inline-block bg-white rounded-full shadow transform transition
                ${dot}
                ${checked ? translate : 'translate-x-0.5'}
            `} />
        </button>
    );
}