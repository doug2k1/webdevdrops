import { getIntl, localePath, LocaleType } from '@/libs/i18n'
import Image from 'next/image'
import Link from 'next/link'
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
import { TrackingScripts } from './TrackingScripts'

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
      <TrackingScripts />

      <div className="flex min-h-screen flex-col">
        <header
          className="mb-8 bg-main dark:bg-blue-900"
          data-testid="main-layout"
        >
          <Container className="flex items-center justify-between">
            <Link
              href={localePath(locale, '/')}
              className="inline-block"
              data-testid="logo-link"
            >
              <Image
                className="m-0"
                width="250"
                height="75"
                src={`/images/webdevdrops-logo-500.png`}
                alt="Web Dev Drops"
              />
            </Link>
          </Container>

          <Nav locale={locale} />
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
                  href={localePath(locale, href)}
                  key={href}
                  className="p-2 text-white hover:text-opacity-80"
                  data-testid={`footer-${label}`}
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
