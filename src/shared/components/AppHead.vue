<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '#imports';

const { t, locale } = useI18n();

useHead({
  htmlAttrs: {
    lang: () => locale.value
  },
  meta: () => [
    { name: 'msapplication-TileColor', content: '#1d2024' },
    { name: 'theme-color', content: '#1d2024' },
    { name: 'author', content: 'Matheus-Schumacher' },
    { name: 'description', content: t('metadata.description') },
    { name: 'robots', content: 'index,follow' },
    { property: 'og:title', content: t('metadata.title') },
    { property: 'og:description', content: t('metadata.description') },
    { name: 'twitter:title', content: t('metadata.title') },
    { name: 'twitter:description', content: t('metadata.description') },
    { name: 'twitter:card', content: 'summary' }
  ],
  link: [
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
    { rel: 'manifest', href: '/favicons/site.webmanifest' },
    { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#1d2024' },
    { rel: 'shortcut icon', href: '/favicons/favicon.ico' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    { href: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Roboto:wght@400;500;700&display=swap', rel: 'stylesheet' }
  ]
});
</script>

<template>
  <!-- Este componente gerencia apenas metadados - não renderiza nada -->
</template>