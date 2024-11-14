import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend, { HttpBackendOptions } from 'i18next-http-backend'

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init<HttpBackendOptions>({
    supportedLngs: ['en', 'de', 'pl'],
    fallbackLng: 'en',
    detection: {
      order: ['cookie', 'path'],
      lookupCookie: 'NEXT_LOCALE',
    },
    interpolation: {
      escapeValue: false
    },
    load: 'languageOnly',
    backend: {
      loadPath: '/locales/{{lng}}/resource.json'
    }
  })

/**
 * Exports i18n configuration  
 */  
export default i18n