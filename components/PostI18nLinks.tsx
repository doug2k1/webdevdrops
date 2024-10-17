'use client'

import { localePath, LocaleType, setLocaleCookie } from '@/libs/i18n'
import Link from 'next/link'
import { FaLanguage } from 'react-icons/fa'
import { PostTranslations } from '../types/post'

const labels: Record<LocaleType, string> = {
  'pt-BR': 'Leia em Português',
  en: 'Read in English',
}

interface Props {
  translations?: PostTranslations | null
}

export function PostI18nLinks({ translations }: Props) {
  if (!translations || Object.keys(translations).length === 0) {
    return null
  }

  return (
    <div className="mb-6 flex items-center rounded border border-gray-300 bg-gray-100 px-4 dark:border-gray-700 dark:bg-gray-800">
      <FaLanguage className="mr-4 text-4xl text-gray-500" />

      {Object.keys(translations).map((locale) => {
        const slug = translations[locale as LocaleType]

        return (
          <Link
            key={locale}
            href={localePath(locale, `/${slug}`)}
            className="italic"
            onClick={() => setLocaleCookie(locale as LocaleType)}
          >
            {labels[locale as LocaleType]}
          </Link>
        )
      })}
    </div>
  )
}
