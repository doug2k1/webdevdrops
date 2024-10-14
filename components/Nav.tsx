'use client'

import i18nConfig from '@/i18nConfig'
import { useCurrentLocale } from 'next-i18n-router/client'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import AnimateHeight from 'react-animate-height'
import { FaBars, FaChevronRight, FaLanguage, FaTimes } from 'react-icons/fa'
import { FormattedMessage } from 'react-intl'
import { Container } from './Container'
import { DarkModeToggle } from './DarkModeToggle'

const navLinks = [
  { href: '/', label: 'home' },
  {
    href: 'https://www.freedevcourses.com/',
    label: 'courses',
    target: '_blank',
  },
  { href: '/contact', label: 'contact' },
]

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuClick = useCallback(() => {
    setMenuOpen(!menuOpen)
  }, [menuOpen])

  const height = menuOpen ? 'auto' : 0

  return (
    <>
      <a
        className="absolute right-0 top-0 mr-[18px] mt-[18px] rounded border border-solid border-white p-2 text-xl text-white opacity-80 sm:hidden"
        onClick={handleMenuClick}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </a>

      <NavContents className="hidden sm:flex" />
      <AnimateHeight height={height} className="sm:hidden">
        <NavContents />
      </AnimateHeight>
    </>
  )
}

function NavContents({ className }: { className?: string }) {
  const locale = useCurrentLocale(i18nConfig)

  return (
    <Container
      className={`${className} flex flex-col bg-black/20 sm:flex-row sm:justify-between sm:bg-transparent`}
    >
      <nav className="flex flex-col text-sm sm:flex-row">
        {navLinks.map(({ href, label, target }) => (
          <Link
            href={href}
            key={href}
            className="flex items-center justify-between border-b border-solid border-white/25 px-2 py-4 uppercase text-white text-opacity-80 hover:text-opacity-100 sm:mr-2 sm:border-none sm:py-2"
            target={target}
          >
            <span>
              <FormattedMessage id={label} />
            </span>
            <FaChevronRight className="sm:hidden" />
          </Link>
        ))}

        {!locale || locale === 'pt-BR' ? (
          <Link
            href="/en/"
            className="flex items-center justify-between border-b border-solid border-white/25 px-2 py-4 uppercase text-white text-opacity-80 hover:text-opacity-100 sm:border-none sm:py-2"
          >
            <span className="flex items-center">
              <FaLanguage className="mr-2 text-2xl text-white text-opacity-50" />
              <span>Posts in English</span>
            </span>
            <FaChevronRight className="sm:hidden" />
          </Link>
        ) : null}

        {locale === 'en' ? (
          <Link
            href="/pt-BR/"
            className="flex items-center justify-between border-b border-solid border-white/25 px-2 py-4 uppercase text-white text-opacity-80 hover:text-opacity-100 sm:border-none sm:py-2"
          >
            <span className="flex items-center">
              <FaLanguage className="mr-2 text-2xl text-white text-opacity-50" />
              <span>Posts em Português</span>
            </span>
            <FaChevronRight className="sm:hidden" />
          </Link>
        ) : null}
      </nav>

      <div className="flex items-center justify-center">
        <DarkModeToggle />
      </div>
    </Container>
  )
}
