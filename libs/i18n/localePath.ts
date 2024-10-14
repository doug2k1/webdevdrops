import { LocaleType } from './types'

export const defaultLocale: LocaleType = 'pt-BR'

export const localePath = (path: string, locale: string) =>
  locale === defaultLocale ? path : `${locale}${path}`
