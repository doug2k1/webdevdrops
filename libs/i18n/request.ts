import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from './routing'
import { LocaleType } from './types'

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as LocaleType)) notFound()

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
