import { LocaleType } from './types'

export async function setLocaleCookie(locale: LocaleType) {
  document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`
}
