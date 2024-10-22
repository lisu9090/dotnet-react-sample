import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  'en-US': {
    translation: {
      'Welcome to AwesomeApp': 'Welcome to AwesomeApp!'
    }
  },
  'de-DE': {
    translation: {
      'Welcome to AwesomeApp': 'Willkommen bei AwesomeApp!'
    }
  },
  'pl': {
    translation: {
      'Welcome to AwesomeApp': 'Witaj w AwesomeApp!'
    }
  }
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    supportedLngs: ['en-US', 'de-DE', 'pl'],
    detection: {
      order: ['cookie', 'path'],

      // order and from where user language should be detected
      // order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

      // // keys or params to lookup language from
      // lookupQuerystring: 'lng',
      // lookupCookie: 'i18next',
      // lookupLocalStorage: 'i18nextLng',
      // lookupSessionStorage: 'i18nextLng',
      // lookupFromPathIndex: 0,
      // lookupFromSubdomainIndex: 0,

      // // cache user language on
      // caches: ['localStorage', 'cookie'],
      // excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

      // // optional expiry and domain for set cookie
      // cookieMinutes: 10,
      // cookieDomain: 'myDomain',

      // // optional htmlTag with lang attribute, the default is:
      // htmlTag: document.documentElement,

      // // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
      // cookieOptions: { path: '/', sameSite: 'strict' },

      // // optional conversion function used to modify the detected language code
      // convertDetectedLanguage: 'Iso15897',
      // convertDetectedLanguage: (lng) => lng.replace('-', '_')
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;