export default {
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {}, // vazio se estiver usando lazy loading (langDir)
  datetimeFormats: {
    en: {
      short: { day: 'numeric', month: 'short', year: 'numeric' },
      long: { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
    },
    pt: {
      short: { day: 'numeric', month: 'short', year: 'numeric' },
      long: { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
    }
  }
}
