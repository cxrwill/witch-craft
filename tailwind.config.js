/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Base dark theme
        void: '#0D0618',
        abyss: '#1A0A2E',
        midnight: '#2D1B4E',
        shadow: '#3D2560',
        twilight: '#6B5B7B',
        mist: '#9B8BAB',

        // Gold accents
        gold: '#C9A84C',
        'gold-light': '#E4CA6D',
        'gold-dark': '#9A7B2E',

        // 12 Witch type accent colors
        'green-witch': '#2D5A27',
        'sea-witch': '#1B3A5C',
        'kitchen-witch': '#8B4513',
        'cosmic-witch': '#3B1B54',
        'crystal-witch': '#C88EA7',
        'lunar-witch': '#A099B8',
        'divination-witch': '#C9A84C',
        'hedge-witch': '#5C4033',
        'hereditary-witch': '#722F37',
        'storm-witch': '#4A4A5A',
        'gray-witch': '#6B5B7B',
        'eclectic-witch': '#5B2C6E',

        // Element colors
        'fire': '#D4522A',
        'water': '#3B7CBF',
        'earth': '#5D8C4A',
        'air': '#B8A9C9',
        'spirit': '#C9A84C',

        // Semantic
        'surface': '#1E1138',
        'surface-elevated': '#261544',
        'border': '#3D2560',
        'text-primary': '#EBE4F5',
        'text-secondary': '#9B8BAB',
        'text-muted': '#6B5B7B',
        'danger': '#D4522A',
        'success': '#5D8C4A',
        'info': '#3B7CBF',
      },
      fontFamily: {
        serif: ['PlayfairDisplay', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        magical: ['PlayfairDisplay', 'Georgia', 'serif'],
      },
      borderRadius: {
        card: '16px',
        altar: '12px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(201, 168, 76, 0.15)',
        'glow-strong': '0 0 40px rgba(201, 168, 76, 0.3)',
        'glow-purple': '0 0 20px rgba(107, 91, 123, 0.2)',
        inner: 'inset 0 2px 8px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
