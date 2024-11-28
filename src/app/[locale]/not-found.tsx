'use client'

import { defaultAppIcons } from '@/libs/consts'
import { LocaleType } from '@/libs/i18n/types'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { useParams } from 'next/navigation'
import { ReactNode } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

interface Props {
  params: { locale: LocaleType }
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale })
  const title = `${t('pageNotFound')} | Web Dev Drops`

  return {
    title,
    icons: defaultAppIcons,
  }
}

export default function NotFound() {
  const t = useTranslations()
  const { locale } = useParams()
  const text = content[(locale as LocaleType) || 'pt-BR']

  return (
    <div className="prose dark:prose-dark">
      <h1>
        <FaExclamationTriangle className="inline text-2xl text-gray-500" />{' '}
        {t('pageNotFound')}
      </h1>

      {text}
    </div>
  )
}

const content: Record<string, ReactNode> = {}

content['pt-BR'] = (
  <>
    <p className="font-bold">
      Desculpe, mas a página que você procura não foi encontrada.
    </p>

    <p>Talvez ...</p>
    <ul>
      <li>Você digitou o endereço errado.</li>
      <li>Esta página foi removida por algum motivo.</li>
      <li>Esta página nunca existiu.</li>
    </ul>
  </>
)

content['en'] = (
  <>
    <p className="font-bold">
      Sorry, but the page you are looking for could not be found.
    </p>

    <p>Perhaps ...</p>
    <ul>
      <li>You typed the wrong address.</li>
      <li>This page was removed.</li>
      <li>This page never existed.</li>
    </ul>
  </>
)
