/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0c74bc', // Your blue color
          50: '#eff8ff',
          100: '#dbeefe',
          200: '#bfe1fe',
          300: '#93cdfd',
          400: '#60b0fa',
          500: '#3b91f6',
          600: '#2574eb',
          700: '#1d5ed8',
          800: '#1e4baf',
          900: '#1e428a',
          950: '#172a54',
        },
        'primary-foreground': '#f8fafc', // Light background for info sections
      },
    },
  },
  plugins: [],
}