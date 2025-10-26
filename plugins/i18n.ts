import { defineNuxtPlugin } from '#app';
import { useI18n } from '#i18n';

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = useI18n();

  // Injeta as funções no contexto global do Vue
  nuxtApp.vueApp.config.globalProperties.$t = i18n.t;
  nuxtApp.vueApp.config.globalProperties.$d = i18n.d;
  nuxtApp.vueApp.config.globalProperties.$localeProperties = i18n.localeProperties;
  nuxtApp.vueApp.config.globalProperties.$setLocale = i18n.setLocale;

  // Retorna as funções para uso em <script setup>
  return {
    provide: {
      t: i18n.t,
      d: i18n.d,
      localeProperties: i18n.localeProperties,
      setLocale: i18n.setLocale,
    },
  };
});