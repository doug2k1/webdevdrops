import { localePath, LocaleType } from '@/libs/i18n'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa'
import { FormattedMessage } from 'react-intl'
import { Container } from './Container'
import { DarkModeToggle } from './DarkModeToggle'
import { NavLanguageToggle } from './NavLanguageToggle'

const navLinks = [
  { href: '/', label: 'home' },
  {
    href: 'https://www.freedevcourses.com/',
    label: 'courses',
    target: '_blank',
  },
  { href: '/contact', label: 'contact' },
]

interface Props {
  className?: string
  locale: LocaleType
}

export function NavContents({ className, locale }: Props) {
  return (
    <Container
      className={`${className} flex flex-col bg-black/20 sm:flex-row sm:justify-between sm:bg-transparent`}
    >
      <nav className="flex flex-col text-sm sm:flex-row">
        {navLinks.map(({ href, label, target }) => (
          <Link
            href={href.startsWith('http') ? href : localePath(locale, href)}
            key={href}
            className="flex items-center justify-between border-b border-solid border-white/25 px-2 py-4 uppercase text-white text-opacity-80 hover:text-opacity-100 sm:mr-2 sm:border-none sm:py-2"
            target={target}
            data-testid={`nav-${label}`}
          >
            <span>
              <FormattedMessage id={label} />
            </span>
            <FaChevronRight className="sm:hidden" />
          </Link>
        ))}

        <NavLanguageToggle locale={locale} />
      </nav>

      <div className="flex items-center justify-center">
        <DarkModeToggle />
      </div>
    </Container>
  )
}
