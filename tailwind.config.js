/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          milk: '#FFFCF7',        // Main page background
          white: '#FFFFFF',       // Pure white cards & modals
          plum: {
            DEFAULT: '#542744',   // Deep Plum - headings, primary buttons, brand
            secondary: '#754565', // Secondary Plum
            soft: '#A984A1',      // Soft Plum
            pale: '#F5EDF3',      // Pale Plum background for cards / sections
          },
          orange: {
            DEFAULT: '#F4A340',   // Golden Orange - accents, sparks, highlights
            amber: '#FFD49A',     // Soft Amber
            glow: '#FFE7C7',      // Warm Orange Glow
          },
          text: {
            primary: '#29232C',   // Primary Text
            secondary: '#77717A', // Secondary Text
          },
          border: {
            DEFAULT: '#EDE5E8',   // Subtle Border
            plum: '#DBCBD6',      // Plum accent border
            orange: '#FADCB3',    // Orange accent border
          },
          success: '#27845D',     // Success
          error: '#C54A4A',       // Error
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Manrope', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px -2px rgba(84, 39, 68, 0.04), 0 1px 4px -1px rgba(84, 39, 68, 0.02)',
        'elevated': '0 12px 32px -8px rgba(84, 39, 68, 0.08), 0 4px 12px -2px rgba(84, 39, 68, 0.03)',
        'floating': '0 20px 48px -12px rgba(84, 39, 68, 0.12), 0 8px 20px -4px rgba(84, 39, 68, 0.05)',
        'plum-glow': '0 0 30px -4px rgba(84, 39, 68, 0.18)',
        'orange-glow': '0 0 28px -4px rgba(244, 163, 64, 0.35)',
      },
      borderRadius: {
        'card': '20px',
        'button': '14px',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-gentle': 'pulseGentle 3.5s ease-in-out infinite',
        'sparkle-fade': 'sparkleFade 4s ease-in-out infinite',
        'mist-drift': 'mistDrift 28s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        sparkleFade: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        mistDrift: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(4%, -3%) scale(1.08)' },
          '100%': { transform: 'translate(-3%, 4%) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
