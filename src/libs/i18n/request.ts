import { getRequestConfig } from 'next-intl/server'
import { i18nConfig } from './config'
import { LocaleType } from './types'

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that a valid locale is used
  if (!locale || !i18nConfig.locales.includes(locale as LocaleType)) {
    locale = i18nConfig.defaultLocale
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
