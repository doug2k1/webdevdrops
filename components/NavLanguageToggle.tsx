'use client'

import { LocaleType, setLocaleCookie } from '@/libs/i18n'
import Link from 'next/link'
import { FaChevronRight, FaLanguage } from 'react-icons/fa'

interface Props {
  locale: LocaleType
}

export function NavLanguageToggle({ locale }: Props) {
  return (
    <>
      {!locale || locale === 'pt-BR' ? (
        <Link
          href="/en/"
          className="flex items-center justify-between border-b border-solid border-white/25 px-2 py-4 uppercase text-white text-opacity-80 hover:text-opacity-100 sm:border-none sm:py-2"
          onClick={() => setLocaleCookie('en')}
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
          href="/"
          className="flex items-center justify-between border-b border-solid border-white/25 px-2 py-4 uppercase text-white text-opacity-80 hover:text-opacity-100 sm:border-none sm:py-2"
          onClick={() => setLocaleCookie('pt-BR')}
        >
          <span className="flex items-center">
            <FaLanguage className="mr-2 text-2xl text-white text-opacity-50" />
            <span>Posts em Português</span>
          </span>
          <FaChevronRight className="sm:hidden" />
        </Link>
      ) : null}
    </>
  )
}
