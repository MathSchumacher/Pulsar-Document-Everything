import { defineNuxtPlugin } from '#app'
import { useNavbar } from '~/shared/states/navbarState'

export default defineNuxtPlugin((nuxtApp) => {
  const navbar = useNavbar()

  const i18n = (nuxtApp as any).$i18n ?? (nuxtApp.vueApp && (nuxtApp.vueApp as any).config?.globalProperties?.$i18n)
  if (!i18n) return

  navbar.value.t = typeof i18n.t === 'function' ? i18n.t.bind(i18n) : (k: any) => k
  navbar.value.d = typeof i18n.d === 'function' ? i18n.d.bind(i18n) : () => ''
  navbar.value.setLocale = typeof i18n.setLocale === 'function' ? i18n.setLocale.bind(i18n) : undefined
  navbar.value.localeProperties = i18n.localeProperties ?? undefined
})
