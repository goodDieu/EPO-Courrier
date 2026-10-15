/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Couleurs extraites du logo EPO.
                // Les nuances 600+ servent au texte : elles respectent un contraste
                // d'au moins 4,5:1 sur fond blanc (lisibilité, y compris projeté).
                epo: {
                    // Vert institutionnel - couleur d'action principale
                    green: {
                        50: '#e6f5ec',
                        100: '#c2e5cf',
                        200: '#9bd4b0',
                        300: '#6fc48f',
                        400: '#4db574',
                        500: '#009A44',
                        600: '#007a34',
                        700: '#006b2c',
                        800: '#005922',
                        900: '#00471b',
                    },
                    // Rouge - danger, rejet, retard
                    red: {
                        50: '#fde8e9',
                        100: '#fbc5c9',
                        200: '#f89fa6',
                        300: '#f47882',
                        400: '#ef5a66',
                        500: '#E30613',
                        600: '#c8050f',
                        700: '#a8040d',
                        800: '#8a030b',
                        900: '#6e0209',
                    },
                    // Jaune - échéance proche, attente. 500 = jaune du logo (fonds, pastilles),
                    // 700+ = texte lisible (le jaune vif est illisible sur blanc).
                    yellow: {
                        50: '#fffbe6',
                        100: '#fff4b8',
                        200: '#ffed8a',
                        300: '#ffe55c',
                        400: '#ffde3d',
                        500: '#FFD100',
                        600: '#b38600',
                        700: '#8a6800',
                        800: '#6f5300',
                        900: '#574100',
                    },
                    // Gris ardoise - textes et structure
                    slate: {
                        50: '#f5f7fa',
                        100: '#e8ecf1',
                        200: '#d3dae3',
                        300: '#aeb9c8',
                        400: '#66758a',
                        500: '#536175',
                        600: '#434e5f',
                        700: '#3C4653',
                        800: '#2c3440',
                        900: '#1e242c',
                    },
                },
                // Cadre de l'application : menu vert sapin et fond de travail
                shell: {
                    DEFAULT: '#006B2C',   // même vert que le bouton « Se connecter » (epo-green-700)
                    hover: '#005922',     // survol, un cran plus foncé
                    text: '#FFFFFF',      // libellés
                    muted: '#D9EEDF',     // titres de section, icônes (4,9:1)
                    line: 'rgba(255, 255, 255, 0.18)',
                },
                ground: {
                    DEFAULT: '#e4eae6',   // fond de travail gris-vert
                    line: '#d3dcd6',      // filets des surfaces blanches
                },
                // Alias sémantiques
                primary: {
                    50: '#e6f5ec',
                    100: '#c2e5cf',
                    500: '#009A44',
                    600: '#007a34',
                    700: '#006b2c',
                    800: '#005922',
                },
                accent: {
                    500: '#FFD100',
                    600: '#b38600',
                },
                danger: {
                    500: '#E30613',
                    600: '#c8050f',
                },
            },
            fontFamily: {
                sans: ['Atkinson Hyperlegible Next Variable', 'system-ui', '-apple-system', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 1px 2px rgba(30, 36, 44, 0.06)',
                'card': '0 2px 8px rgba(30, 36, 44, 0.08)',
                'elevated': '0 12px 32px rgba(30, 36, 44, 0.16)',
            },
            borderRadius: {
                'xl': '12px',
                '2xl': '16px',
            },
            keyframes: {
                'fade-in': {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                'fade-in-up': {
                    from: { opacity: '0', transform: 'translateY(8px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                shrink: {
                    from: { width: '100%' },
                    to: { width: '0%' },
                },
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '20%': { transform: 'translateX(-6px)' },
                    '40%': { transform: 'translateX(6px)' },
                    '60%': { transform: 'translateX(-4px)' },
                    '80%': { transform: 'translateX(4px)' },
                },
                'status-pulse': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.4' },
                },
            },
            animation: {
                'fade-in': 'fade-in 150ms ease-out',
                'fade-in-up': 'fade-in-up 200ms ease-out',
                shrink: 'shrink linear forwards',
                shake: 'shake 0.4s ease',
                'status-pulse': 'status-pulse 2s ease-in-out infinite',
            },
        },
    },
    plugins: [],
};
