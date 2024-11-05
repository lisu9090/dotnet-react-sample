const typescriptTransform = require('i18next-scanner-typescript')

module.exports = {
  input: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
    '!src/settings.ts',
  ],
  output: './',
  options: {
    debug: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.jsx'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx'],
      fallbackKey: function (_, value) { return value },
      acorn: {
        ecmaVersion: 2022,
        sourceType: 'module',
      }
    },
    lngs: ['en', 'de', 'pl'],
    ns: ['resource'],
    defaultLng: 'en',
    defaultNs: 'resource',
    defaultValue: function (lng, _, key) { return `[${lng}] ${key}` },
    resource: {
      loadPath: 'public/locales/{{lng}}/{{ns}}.json',
      savePath: 'public/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: false,
    keySeparator: false,
  },
  transform: typescriptTransform({
    extensions: ['.ts', '.tsx'],
    tsOptions: {
      module: "esnext",
      target: "2022",
      jsx: "preserve",
    }
  })
}