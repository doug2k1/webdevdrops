import { getIntl, LocaleType } from '@/libs/i18n'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { PropsWithChildren } from 'react'
import {
  FaCoffee,
  FaFacebook,
  FaHeart,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'
import { Container } from './Container'
import { LanguageSelector } from './LanguageSelector'
import { Nav } from './Nav'

const footerLinks = [
  { href: '/contact', label: 'contact' },
  { href: '/privacy', label: 'privacyPolicy' },
]

const socialLinks = [
  {
    Icon: FaYoutube,
    href: 'https://www.youtube.com/channel/UCwNjCshn5kG4OYpOOhpCHWg',
    title: 'YouTube Web Dev Drops',
  },
  {
    Icon: FaTwitter,
    href: 'https://twitter.com/webdevdrops',
    title: 'Twitter @webdevdrops',
  },
  {
    Icon: FaFacebook,
    href: 'https://www.facebook.com/webdevdrops',
    title: 'Facebook webdevdrops',
  },
]

interface Props {
  locale: LocaleType
}

export async function Layout({ locale, children }: PropsWithChildren<Props>) {
  const intl = await getIntl(locale)

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="icon"
          href="/images/cropped-logo-wdd-transp-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/images/cropped-logo-wdd-transp-192x192.png"
          sizes="192x192"
        />
        <link
          rel="apple-touch-icon"
          href="/images/cropped-logo-wdd-transp-180x180.png"
        />
        <meta
          name="msapplication-TileImage"
          content="/images/cropped-logo-wdd-transp-270x270.png"
        />
      </Head>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7263844920704645"
        crossOrigin="anonymous"
      />
      <Script src="/js/gtm.js" />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KQPDQCS"
          height="0"
          width="0"
          className="invisible hidden"
        ></iframe>
      </noscript>

      <div className="flex min-h-screen flex-col">
        <header className="mb-8 bg-main dark:bg-blue-900">
          <Container className="flex items-center justify-between">
            <Link href="/" className="inline-block">
              <Image
                className="m-0"
                width="250"
                height="75"
                src={`/images/webdevdrops-logo-500.png`}
                alt="Web Dev Drops"
              />
            </Link>
          </Container>

          <Nav />
        </header>

        <Container>
          <main className="mb-8 flex-1">{children}</main>
        </Container>

        <footer className="border-t-4 border-solid border-main bg-gray-700 text-sm text-gray-300">
          <Container className="py-8 text-center">
            <Image
              src={`/images/webdevdrops-logo-500.png`}
              alt="Web Dev Drops"
              width="125"
              height="37"
              className="mb-4 inline-block"
            />

            <LanguageSelector />

            <div className="mb-4">
              {footerLinks.map(({ href, label }) => (
                <Link
                  href={href}
                  key={href}
                  className="p-2 text-white hover:text-opacity-80"
                >
                  {intl.formatMessage({ id: label })}
                </Link>
              ))}
            </div>
            <div className="mb-6 flex items-center justify-center">
              {socialLinks.map(({ Icon, href, title }) => (
                <a
                  className="mx-2 p-2 text-2xl text-white text-opacity-100 hover:text-opacity-80"
                  href={href}
                  title={title}
                  target="_blank"
                  key={href}
                  rel="noreferrer"
                >
                  <Icon />
                </a>
              ))}
            </div>

            <p className="align-middle text-gray-400">
              © {new Date().getFullYear()} -{' '}
              {intl.formatMessage(
                { id: 'footerMessage' },
                {
                  icon1: <FaHeart className="inline-block text-lg" />,
                  icon2: <FaCoffee className="inline-block text-lg" />,
                }
              )}
            </p>
          </Container>
        </footer>
      </div>
    </>
  )
}
