import { Layout } from '@/components/Layout'
import { ProgressBarProvider } from '@/components/ProgressBarProvider'
import { BASE_URL } from '@/consts/urls'
import { LocaleType } from '@/libs/i18n/types'
import '@/styles/globals.css'
import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import {
  getLocale,
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'

const interFont = Inter({
  subsets: ['latin'],
  display: 'swap',
})

interface Props {
  params: Promise<{ locale: LocaleType; page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const t = await getTranslations({ locale })
  const siteName = 'Web Dev Drops'
  const siteSlogan = t('siteSlogan')
  const description = siteSlogan

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: `${siteName} | ${siteSlogan}`,
      template: `%s | ${siteName}`,
    },
    description,
    openGraph: {
      locale,
      description,
      siteName,
      images: [
        {
          url: '/images/webdevdrops-logo-500.png',
          alt: siteName,
          width: 500,
          height: 150,
        },
      ],
    },
    twitter: {
      card: 'summary',
    },
    icons: [
      {
        url: '/images/cropped-logo-wdd-transp-32x32.png',
        sizes: '32x32',
      },
      {
        url: '/images/cropped-logo-wdd-transp-192x192.png',
        sizes: '192x192',
      },
      {
        url: '/images/cropped-logo-wdd-transp-180x180.png',
        rel: 'apple-touch-icon',
      },
      {
        url: '/images/cropped-logo-wdd-transp-270x270.png',
        rel: 'msapplication-TileImage',
      },
    ],
  }
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = (await getLocale()) as LocaleType
  setRequestLocale(locale)
  // provides messages to client side
  const messages = await getMessages()

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
