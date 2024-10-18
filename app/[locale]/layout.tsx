import { Layout } from '@/components/Layout'
import { LocaleType } from '@/libs/i18n/types'
import '@/styles/globals.css'
import { NextIntlClientProvider } from 'next-intl'
import {
  getLocale,
  getMessages,
  unstable_setRequestLocale,
} from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import { PropsWithChildren } from 'react'

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = (await getLocale()) as LocaleType
  unstable_setRequestLocale(locale)
  // provides messages to client side
  const messages = await getMessages()

  return (
    <html suppressHydrationWarning lang={locale}>
      <body className="bg-white antialiased dark:bg-gray-900">
        <ThemeProvider attribute="class">
          <NextIntlClientProvider messages={messages}>
            <Layout>{children}</Layout>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
