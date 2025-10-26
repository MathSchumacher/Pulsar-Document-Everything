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
    // cores, fontes e screens definidas diretamente, não em extend
    colors: {
      background: '#0f111b',
      primary: '#7665d7',
      secondary: '#1a1d2e',
      secondary_darken: '#131524',
      divider: '#2b304a',
      white: '#ffffff',
      black: '#000000'
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
      '3xl': '1566px',
      '2xl': '1180px',
      xl: '900px',
      lg: '768px',
      md: '468px',
      sm: '320px'
    }
  },
  plugins: []
};
