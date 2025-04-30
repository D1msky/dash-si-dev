/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      textStyles: {
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
        label: ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('tailwindcss-animate')],
};
