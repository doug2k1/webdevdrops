'server-only'

import { createIntl } from 'react-intl'
import { messages } from './messages'
import { LocaleType } from './types'

export async function getIntl(locale: LocaleType) {
  return createIntl({
    locale: locale,
    messages: messages[locale],
  })
}
