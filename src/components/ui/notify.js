/**
 * Notifications de l'application (remplacent les alert() du navigateur).
 *
 * Utilisable depuis n'importe quel composant ou gestionnaire, sans hook :
 *   notify.success('Courrier enregistré', { message: 'N° 2026-0452' })
 *   notify.warning('Veuillez saisir un motif.')
 *   notify.fromText(`Titre\n\n→ Détail 1\n→ Détail 2`)
 *
 * L'affichage est assuré par <ToastViewport /> (monté une seule fois dans App).
 */

const listeners = new Set();
let counter = 0;

export function subscribeToasts(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function push(toast) {
    const id = ++counter;
    listeners.forEach((listener) => listener({ id, ...toast }));
    return id;
}

// Retire emojis et références internes au cahier des charges (RG-xx, §x.x)
function clean(text) {
    return text
        .replace(/(?:[\u{1F300}-\u{1FAFF}]|[\u{2600}-\u{27BF}]|\u{FE0F})/gu, '')
        .replace(/\s*\((RG-\d+|§[\d.]+)\)/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

const WARNING_PATTERN = /veuillez|obligatoire|impossible|attention|requis|manquant|sélectionnez|saisissez/i;
const ERROR_PATTERN = /erreur|échec|échoué/i;

/**
 * Convertit un message multi-lignes (ancien format des alert()) en notification :
 * première ligne = titre, lignes suivantes = détails.
 */
function fromText(text, options = {}) {
    const raw = String(text);
    const lines = raw.split('\n').map(clean).filter(Boolean);
    const [title = '', ...rest] = lines;
    const details = rest.map((line) => line.replace(/^→\s*/, ''));

    let variant = 'info';
    if (ERROR_PATTERN.test(raw)) variant = 'error';
    else if (WARNING_PATTERN.test(title)) variant = 'warning';
    else if (raw.includes('✅') || details.length > 0) variant = 'success';

    return push({
        variant,
        title,
        items: details,
        duration: details.length > 2 ? 8000 : 5000,
        ...options,
    });
}

export const notify = {
    success: (title, options = {}) => push({ variant: 'success', title, ...options }),
    error: (title, options = {}) => push({ variant: 'error', title, ...options }),
    warning: (title, options = {}) => push({ variant: 'warning', title, ...options }),
    info: (title, options = {}) => push({ variant: 'info', title, ...options }),
    fromText,
};
