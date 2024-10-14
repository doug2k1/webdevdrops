import { LocaleType } from './types'

export const defaultLocale: LocaleType = 'pt-BR'

export const localePath = (locale: string) =>
  locale === defaultLocale ? '' : `${locale}/`
