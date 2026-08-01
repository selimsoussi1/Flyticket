/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0B1220',
          900: '#111A2E',
          800: '#182238',
          700: '#202C48',
          600: '#2B3A5C',
          500: '#425277'
        },
        paper: {
          50: '#F6F7FB',
          100: '#ECEFF6',
          200: '#DDE2ED'
        },
        beacon: {
          DEFAULT: '#FFB648',
          dim: '#C98A2E'
        },
        contrail: {
          DEFAULT: '#4FC3F7',
          dim: '#2E93BF'
        },
        signal: {
          red: '#FF5C5C',
          green: '#35D399'
        }
      },
      fontFamily: {
        display: ['"Archivo"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace']
      },
      boxShadow: {
        card: '0 1px 0 rgba(255,255,255,0.04) inset, 0 12px 30px -14px rgba(0,0,0,0.55)',
        cardLight: '0 1px 0 rgba(255,255,255,0.7) inset, 0 12px 28px -16px rgba(20,25,40,0.2)',
        glow: '0 0 0 1px rgba(255,182,72,0.35), 0 0 28px -6px rgba(255,182,72,0.45)',
        glowBlue: '0 0 0 1px rgba(79,195,247,0.4), 0 0 24px -6px rgba(79,195,247,0.5)'
      },
      borderRadius: {
        xl2: '1.25rem'
      },
      keyframes: {
        flap: {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(-90deg)' },
          '100%': { transform: 'rotateX(0deg)' }
        }
      }
    }
  },
  plugins: []
}
