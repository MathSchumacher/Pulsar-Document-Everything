// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  compatibilityDate: '2025-10-01',

  // Módulos do Nuxt
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/image',
  ],

  // Configuração do @nuxt/image para evitar uso de bindings nativos (sharp)
  image: {
    provider: 'static', // Usa imagens estáticas, evitando compilação do sharp
  },

  // Plugins personalizados
  plugins: [
    './plugins/fontawesome.ts',
    './plugins/primevue.ts',
    './plugins/directives.ts',
  ],

  // Configuração do Nitro para otimização
  nitro: {
    compressPublicAssets: true,
    minify: true,
  },
  experimental: {
  oxc: false // Desativa o OXC para evitar problemas com oxc-transform
},

  // Regras de roteamento
  routeRules: {
    '/**': { prerender: true },
  },

  // Configuração de build
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      'primevue',
    ],
  },

  // Configuração do i18n
  i18n: {
    vueI18n: './i18n.config.ts',
    defaultLocale: 'en',
    legacy: false, // Usa Composition API do Vue 3
    runtimeOnly: false, // Permite pré-compilar arquivos JSON
    compilation: { jit: false },
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'locales/en.json' },
      { code: 'pt', iso: 'pt-BR', name: 'Português', file: 'locales/pt.json' },
    ],
  },

  // Habilita devtools
  devtools: { enabled: true },

  // Diretório de origem
  srcDir: 'src',

  // Configuração do PostCSS
  postcss: {
    plugins: {
      autoprefixer: {},
      tailwindcss: {},
    },
  },

  // Arquivos CSS globais
  css: [
    '~/shared/assets/globals.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],

  // Configuração do Vite
  vite: {
    resolve: {
      alias: {
        fs: 'browserify-fs',
        path: 'path-browserify',
        '~': resolve(__dirname, './src'),
      },
    },
    build: {
      chunkSizeWarningLimit: 2000,
    },
  },
});