/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        border: '#d6d6d6',
        primary: {
          DEFAULT: '#0c74bc',
          foreground: '#eef8ff',
          shade: '#006398',
          dark: '#004b74'
        },
        secondary: {
          DEFAULT: '#009ec8',
          foreground: '#e8f6ff',
          dark: '#006686'
        },
        tertiary: {
          DEFAULT: '#d1303a',
          foreground: '#ffdad8',
          dark: '#b81c2b'
        },
        success: {
          light: '#96e28c',
          DEFAULT: '#3FA244'
        },
        info: {
          light: '#6de1f0',
          DEFAULT: '#299FD1'
        },
        warning: {
          light: '#fac664',
          DEFAULT: '#ef8801'
        },
        error: {
          light: '#ec8574',
          DEFAULT: '#c81a23'
        },
        neutral: {
          light: '#d0d5dd',
          DEFAULT: '#677084'
        },
        disabled: {
          DEFAULT: 'rgba(208, 213, 221, 1)'
        },
        base: {
          white: '#fff',
          black: '#111'
        }
      },
      fontSize: {
        h1: ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],
        h2: ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        h3: ['1.75rem', { lineHeight: '2.25rem', fontWeight: '600' }],
        h4: ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        h5: ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        h6: ['1.125rem', { lineHeight: '1.5rem', fontWeight: '600' }],

        small: ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
        body: ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }], // 16px
        large: ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }],

        caption: ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
        button: ['0.875rem', { lineHeight: '1rem', fontWeight: '500' }],
        label: ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }]
      }
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography')
  ],
  corePlugins: {
    preflight: false, // Disable preflight to avoid conflicts with Ant Design
  },
};
