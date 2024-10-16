import { Link } from '@/libs/i18n/routing'
import { FaLanguage } from 'react-icons/fa'

export function LanguageSelector() {
  return (
    <div className="mb-6 flex items-center justify-center">
      <FaLanguage className="mr-4 text-2xl text-white text-opacity-30" />
      <Link
        href="/"
        locale="en"
        className="p-2 text-white text-opacity-100 hover:text-opacity-80"
        data-testid="lang-selector-en"
        // onClick={() => setLocaleCookie('en')}
      >
        English
      </Link>
      <Link
        href="/"
        locale="pt-BR"
        className="p-2 text-white text-opacity-100 hover:text-opacity-80"
        data-testid="lang-selector-ptbr"
        // onClick={() => setLocaleCookie('pt-BR')}
      >
        Português
      </Link>
    </div>
  )
}
