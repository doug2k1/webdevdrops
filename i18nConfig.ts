import { i18nRouter } from 'next-i18n-router'

type I18nConfig = Parameters<typeof i18nRouter>['1']

const i18nConfig: I18nConfig = {
  locales: ['pt-BR', 'en'],
  defaultLocale: 'pt-BR',
  serverSetCookie: 'never',
}

export default i18nConfig
