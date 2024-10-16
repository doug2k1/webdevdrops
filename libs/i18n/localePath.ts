import i18nConfig from '@/i18nConfig'

export const localePath = (locale: string, path: string) =>
  locale === i18nConfig.defaultLocale ? path : `/${locale}${path}`
