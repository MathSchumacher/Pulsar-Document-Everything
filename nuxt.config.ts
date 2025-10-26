import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n', '@nuxt/image'],

  i18n: {
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts', // <-- aqui você referencia o arquivo
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: resolve(__dirname, 'src/locales/en.json') },
      { code: 'pt', iso: 'pt-BR', name: 'Português', file: resolve(__dirname, 'src/locales/pt.json') }
    ]
  },

  image: { provider: 'static', dir: 'public/images' },

  plugins: ['./plugins/i18n.ts', './plugins/fontawesome.ts', './plugins/primevue.ts', './plugins/directives.ts'],

  nitro: { compressPublicAssets: true, minify: true },

  routeRules: { '/**': { prerender: true } },

  build: {
    transpile: ['@fortawesome/vue-fontawesome', '@fortawesome/fontawesome-svg-core', '@fortawesome/free-solid-svg-icons', 'primevue']
  },

  devtools: { enabled: true },

  srcDir: 'src',
  publicDir: 'public',

  css: ['~/shared/assets/globals.css', '@fortawesome/fontawesome-svg-core/styles.css'],

  postcss: { plugins: { autoprefixer: {}, '@tailwindcss/postcss': {} } },

  vite: {
    resolve: { alias: { '~': resolve(__dirname, './src'), '/images': resolve(__dirname, 'public/images') } },
    build: { chunkSizeWarningLimit: 2000 }
  }
})
