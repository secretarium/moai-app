module.exports = {
    purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
    theme: {
        extend: {
            colors: {
                'accent-1': '#1ca8e1',
                'accent-2': '#e95c59'
            },
            spacing: {
                28: '4rem'
            },
            letterSpacing: {
                tighter: '0em'
            },
            lineHeight: {
                tight: 1.2
            },
            fontSize: {
                '5xl': '1.5rem',
                '6xl': '2.1rem',
                '7xl': '3.5rem',
                '8xl': '4.25rem'
            },
            fontFamily: {
                sans: 'Poppins, -apple-system, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
            },
            boxShadow: {
                small: '0 5px 10px rgba(0, 0, 0, 0.12)',
                medium: '0 8px 30px rgba(0, 0, 0, 0.12)'
            }
        }
    },
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true
    }
};
