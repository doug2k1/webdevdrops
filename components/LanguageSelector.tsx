import Link from 'next/link'
import { FaLanguage } from 'react-icons/fa'

export function LanguageSelector() {
  return (
    <div className="mb-6 flex items-center justify-center">
      <FaLanguage className="mr-4 text-2xl text-white text-opacity-30" />
      <Link
        href="/en/"
        className="p-2 text-white text-opacity-100 hover:text-opacity-80"
      >
        English
      </Link>
      <Link
        href="/pt-BR/"
        className="p-2 text-white text-opacity-100 hover:text-opacity-80"
      >
        Português
      </Link>
    </div>
  )
}
