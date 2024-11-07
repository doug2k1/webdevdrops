import { Link } from '@/libs/i18n/routing'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { PropsWithChildren } from 'react'
import { FaCoffee, FaFacebook, FaHeart, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Container } from './Container'
import { LanguageSelector } from './LanguageSelector'
import { Nav } from './Nav'
import { NavContents } from './NavContents'
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
    Icon: FaXTwitter,
    href: 'https://x.com/webdevdrops',
    title: 'X @webdevdrops',
  },
  {
    Icon: FaFacebook,
    href: 'https://www.facebook.com/webdevdrops',
    title: 'Facebook webdevdrops',
  },
]

export function Layout({ children }: PropsWithChildren) {
  const t = useTranslations()

  return (
    <>
      <TrackingScripts />

      <div className="flex min-h-screen flex-col">
        <header
          className="mb-8 bg-main dark:bg-blue-900"
          data-testid="main-layout"
        >
          <Container className="flex items-center justify-between">
            <Link href="/" className="inline-block" data-testid="logo-link">
              <Image
                className="m-0"
                width="250"
                height="75"
                src={`/images/webdevdrops-logo-500.svg`}
                alt="Web Dev Drops"
                priority
              />
            </Link>
          </Container>

          <Nav
            contents={<NavContents className="hidden sm:flex" />}
            mobileContents={<NavContents />}
          />
        </header>

        <Container>
          <main className="mb-8 flex-1">{children}</main>
        </Container>

        <footer className="border-t-4 border-solid border-main bg-gray-700 pb-8 text-sm text-gray-300">
          <Container className="py-8 text-center">
            <Image
              src={`/images/webdevdrops-logo-500.svg`}
              alt="Web Dev Drops"
              width="120"
              height="36"
              className="mb-4 inline-block"
            />

            <LanguageSelector />

            <div className="mb-4">
              {footerLinks.map(({ href, label }) => (
                <Link
                  href={href}
                  key={href}
                  className="p-2 text-white hover:text-opacity-80"
                  data-testid={`footer-${label}`}
                >
                  {t(label)}
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
              {t.rich('footerMessage', {
                icon1: () => <FaHeart className="inline-block text-lg" />,
                icon2: () => <FaCoffee className="inline-block text-lg" />,
                a: (chunk) => (
                  <Link
                    href="https://www.linkedin.com/in/douglasmatoso/"
                    target="_blank"
                    className="text-white hover:text-opacity-80"
                  >
                    {chunk}
                  </Link>
                ),
              })}
            </p>
          </Container>
        </footer>
      </div>
    </>
  )
}
