import { Layout } from '@/components/Layout'
import { ProgressBarProvider } from '@/components/ProgressBarProvider'
import { LocaleType } from '@/libs/i18n/types'
import '@/styles/globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, setRequestLocale } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import { PropsWithChildren, use } from 'react'

const interFont = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: PropsWithChildren) {
  const locale = use(getLocale()) as LocaleType
  setRequestLocale(locale)
  // provides messages to client side
  const messages = use(getMessages())

  return (
    <html
      suppressHydrationWarning
      lang={locale}
      className={interFont.className}
    >
      <body className="bg-white antialiased dark:bg-gray-900">
        <ThemeProvider attribute="class">
          <NextIntlClientProvider messages={messages}>
            <ProgressBarProvider>
              <Layout>{children}</Layout>
            </ProgressBarProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
