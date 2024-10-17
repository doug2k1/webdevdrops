import { Layout } from '@/components/Layout'
import { LocaleType, ServerIntlProvider } from '@/libs/i18n'
import { ThemeProvider } from 'next-themes'
import { PropsWithChildren } from 'react'
import '../../styles/globals.css'

interface Props {
  params: { locale: LocaleType }
}

export default async function RootLayout({
  params: { locale },
  children,
}: PropsWithChildren<Props>) {
  return (
    <html suppressHydrationWarning>
      <body className="bg-white antialiased dark:bg-gray-900">
        <ThemeProvider attribute="class">
          <ServerIntlProvider locale={locale}>
            <Layout locale={locale}>{children}</Layout>
          </ServerIntlProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
