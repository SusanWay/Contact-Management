import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    future: {
        hoverOnlyWhenSupported: true,
    },
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            white: '#FFFFFF',
            black: '#000000',
            red: {
                DEFAULT: '#db3647',
                dark: '#952023',
            },
            gray: {
                DEFAULT: '#5c7673',
            },
            green: {
                light: '#cce9e4',
                DEFAULT: '#9ed1be',
                dark: '#188754'
            },
            yellow: '#ffbf0b'
        },
        fontFamily: {
            sans: ['Source Sans Pro', 'sans-serif'],
        },
        fontSize: {
            'xxs': ['0.875rem', '1rem'],
            'xs': ['0.75rem', '1.125rem'],
            'sm': ['0.8rem', '1rem'],
            'base': ['1rem', '1.5rem'],
            'lg': ['1.125rem', '1.75rem'],
            'xl': ['1.25rem', '2.125rem'],
            '2xl': ['1.5rem', '2rem'],
            '3xl': ['1.75rem', '2.25rem'],
            'title': ['3rem', '3.75rem'],
            'title-2xl': ['5.25rem', '6.5rem'],
            'title-xl': ['4rem', '5rem'],
            'title-md': ['2.25rem', '2.75rem'],
            'title-sm': ['1.5rem', '1.875rem'],
        },
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1140px',
            '2xl': '1408px',
            '3xl': '1536px',
            '4xl': '1664px',
            '5xl': '1792px',
            '6xl': '1920px',
            '7xl': '2048px',
            '8xl': '2176px',
            '9xl': '2304px',
            '10xl': '2432px',
            '11xl': '2560px',
        },
        extend: {
            gridTemplateColumns: {
                header: '1fr auto 1fr',
            },
        },
        container: {
            screens: {
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1116px',
                '2xl': '1116px',
            }
        },
    },
}
