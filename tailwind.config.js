/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Couleurs extraites du logo EPO
                epo: {
                    // Vert principal (identité institutionnelle)
                    green: {
                        50: '#e6f5ec',
                        100: '#c2e5cf',
                        200: '#9bd4b0',
                        300: '#6fc48f',
                        400: '#4db574',
                        500: '#009A44', // Vert principal du logo
                        600: '#008a3d',
                        700: '#007a34',
                        800: '#006b2c',
                        900: '#005922',
                    },
                    // Rouge accent
                    red: {
                        50: '#fde8e9',
                        100: '#fbc5c9',
                        200: '#f89fa6',
                        300: '#f47882',
                        400: '#ef5a66',
                        500: '#E30613', // Rouge principal du logo
                        600: '#d10511',
                        700: '#b8040f',
                        800: '#a0030d',
                        900: '#85020a',
                    },
                    // Jaune accent
                    yellow: {
                        50: '#fffbe6',
                        100: '#fff4b8',
                        200: '#ffed8a',
                        300: '#ffe55c',
                        400: '#ffde3d',
                        500: '#FFD100', // Jaune principal du logo
                        600: '#e6bc00',
                        700: '#cca700',
                        800: '#b39200',
                        900: '#997d00',
                    },
                    // Gris ardoise (remplace le navy)
                    slate: {
                        50: '#f5f7fa',
                        100: '#e8ecf1',
                        200: '#d3dae3',
                        300: '#aeb9c8',
                        400: '#8492a6',
                        500: '#5d6b7e',
                        600: '#475264',
                        700: '#3C4653', // Gris principal du logo
                        800: '#2c3440',
                        900: '#1e242c',
                    },
                },
                // Aliases sémantiques pour compatibilité
                primary: {
                    50: '#e6f5ec',
                    100: '#c2e5cf',
                    500: '#009A44',
                    600: '#008a3d',
                    700: '#007a34',
                },
                accent: {
                    500: '#FFD100',
                    600: '#e6bc00',
                },
                danger: {
                    500: '#E30613',
                    600: '#d10511',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 2px 12px rgba(60, 70, 83, 0.08)',
                'card': '0 4px 24px rgba(60, 70, 83, 0.10)',
                'elevated': '0 12px 40px rgba(60, 70, 83, 0.15)',
            },
            borderRadius: {
                'xl': '14px',
                '2xl': '18px',
            },
        },
    },
    plugins: [],
};