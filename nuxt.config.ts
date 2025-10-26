// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  compatibilityDate: '2025-10-01',
  experimental: {
    oxc: false // Desativa o OXC explicitamente
  },
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/image',
  ],
  image: {
    provider: 'static', // Evita uso do sharp
  },
  plugins: [
    './plugins/fontawesome.ts',
    './plugins/primevue.ts',
    './plugins/directives.ts',
  ],
  nitro: {
    compressPublicAssets: true,
    minify: true,
  },
  routeRules: {
    '/**': { prerender: true },
  },
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      'primevue',
    ],
  },
  i18n: {
    vueI18n: './i18n.config.ts',
    defaultLocale: 'en',
    legacy: false,
    runtimeOnly: false,
    compilation: { jit: false },
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'locales/en.json' },
      { code: 'pt', iso: 'pt-BR', name: 'Português', file: 'locales/pt.json' },
    ],
  },
  devtools: { enabled: true },
  srcDir: 'src',
  postcss: {
    plugins: {
      autoprefixer: {},
      tailwindcss: {},
    },
  },
  css: [
    '~/shared/assets/globals.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  vite: {
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'),
      },
    },
    build: {
      chunkSizeWarningLimit: 2000,
    },
  },
});