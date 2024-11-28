import { Link } from '@/libs/i18n/routing'
import { useLocale } from 'next-intl'
import { FaChevronRight, FaLanguage } from 'react-icons/fa'

export function NavLanguageToggle() {
  const locale = useLocale()

  return (
    <>
      {!locale || locale === 'pt-BR' ? (
        <Link
          href="/"
          locale="en"
          className="flex items-center justify-between border-b border-solid border-white/25 px-2 py-4 uppercase text-white text-opacity-80 hover:text-opacity-100 sm:border-none sm:py-2"
          // onClick={() => setLocaleCookie('en')}
          data-testid="nav-lang-selector-en"
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
          locale="pt-BR"
          className="flex items-center justify-between border-b border-solid border-white/25 px-2 py-4 uppercase text-white text-opacity-80 hover:text-opacity-100 sm:border-none sm:py-2"
          // onClick={() => setLocaleCookie('pt-BR')}
          data-testid="nav-lang-selector-ptbr"
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
