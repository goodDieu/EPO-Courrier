// Classes partagées par les formulaires d'authentification.

export const LABEL_CLASS = 'block mb-1.5 text-sm font-medium text-epo-slate-800';

export const INPUT_CLASS = `
    w-full h-11 px-3.5
    bg-white
    border border-epo-slate-300 rounded-lg
    text-base text-epo-slate-900
    placeholder:text-epo-slate-400
    outline-none transition-colors
    hover:border-epo-slate-400
    focus:border-epo-green-600 focus:ring-2 focus:ring-epo-green-600/20
`;

export const PRIMARY_BUTTON_CLASS = `
    w-full h-11
    inline-flex items-center justify-center gap-2
    rounded-lg
    bg-epo-green-700 hover:bg-epo-green-800
    text-sm font-semibold text-white
    transition-colors
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-epo-green-700
    disabled:bg-epo-green-700/70 disabled:cursor-not-allowed
`;

export const SECONDARY_BUTTON_CLASS = `
    w-full h-11
    inline-flex items-center justify-center gap-2
    rounded-lg
    border border-epo-slate-300 bg-white hover:bg-epo-slate-50
    text-sm font-semibold text-epo-slate-800
    transition-colors
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-epo-green-700
    disabled:text-epo-slate-400 disabled:cursor-not-allowed disabled:hover:bg-white
`;

export const LINK_CLASS =
    'font-medium text-epo-green-700 hover:text-epo-green-800 hover:underline underline-offset-2 focus-visible:outline-none focus-visible:underline';
