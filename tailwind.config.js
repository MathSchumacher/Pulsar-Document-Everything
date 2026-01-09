/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/**/*.{js,vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/shared/**/*.vue",
    "./src/shared/assets/**/*.css",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./src/app.vue",
    "./src/app/**/*.vue",
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f111b',
        primary: '#7665d7',
        secondary: '#1a1d2e',
        secondary_darken: '#131524',
        divider: '#2b304a',
        white: '#ffffff',
        black: '#000000',
        transparent: 'transparent'
      },
      textColor: {
        primary: '#f0f0f0',
        secondary: '#7665d7',
        darken: '#131524'
      },
      fontFamily: {
        sans: ['Roboto', 'Inter', 'Open Sans', 'sans-serif']
      },
      screens: {
        'sm': '320px',
        'md': '468px',
        'lg': '768px',
        'xl': '900px',
        '2xl': '1180px',
        '3xl': '1566px'
      }
    }
  },
  plugins: []
};
