import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  // ❌ 'compatibilityDate' foi removido do Nuxt 4
  // ❌ 'experimental.oxc' não existe mais
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/image'
  ],

  image: {
    provider: 'static',
    dir: 'public/images', // não precisa array
  },

  plugins: [
    './plugins/fontawesome.ts',
    './plugins/primevue.ts',
    './plugins/directives.ts'
  ],

  nitro: {
    compressPublicAssets: true,
    minify: true
  },

  routeRules: {
    '/**': { prerender: true }
  },

  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      'primevue'
    ]
  },

  i18n: {
  vueI18n: './i18n.config.ts',
  defaultLocale: 'en',
  legacy: false,
  runtimeOnly: false,
  locales: [
    { code: 'en', iso: 'en-US', name: 'English', file: resolve(__dirname, 'src/locales/en.json') },
    { code: 'pt', iso: 'pt-BR', name: 'Português', file: resolve(__dirname, 'src/locales/pt.json') }, // <--- ajuste
  ],
},


  devtools: { enabled: true },

  srcDir: 'src',
  publicDir: 'public',

  css: [
    '~/shared/assets/globals.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  postcss: {
  plugins: {
    autoprefixer: {},
    '@tailwindcss/postcss': {},
  },
},


  vite: {
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'),
        '/images': resolve(__dirname, 'public/images')
      }
    },
    build: {
      chunkSizeWarningLimit: 2000
    }
  }
})
