'use client'

import { LocaleType, messages } from '@/libs/i18n'
import { PropsWithChildren } from 'react'
import { IntlProvider } from 'react-intl'

export function ServerIntlProvider({
  locale,
  children,
}: PropsWithChildren<{ locale: LocaleType }>) {
  return (
    <IntlProvider locale={locale} messages={messages[locale as LocaleType]}>
      {children}
    </IntlProvider>
  )
}
