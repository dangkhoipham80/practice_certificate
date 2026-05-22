/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: '#172033',
        muted: '#657187',
        line: '#dfe4ee',
        canvas: '#f6f7fb',
        brand: {
          50: '#eaf8f1',
          100: '#c9efdc',
          500: '#1d9a64',
          600: '#137d50',
          700: '#0f6240'
        },
        coral: {
          50: '#fff0ed',
          500: '#ef6a4f',
          600: '#d64d34'
        },
        violet: {
          50: '#f2efff',
          500: '#7157d9',
          600: '#5a42bd'
        }
      },
      boxShadow: {
        soft: '0 16px 40px rgba(23, 32, 51, 0.08)'
      }
    }
  },
  plugins: []
};
