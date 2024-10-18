'use client'

import { defaultAppIcons } from '@/libs/consts'
import { getIntl, LocaleType } from '@/libs/i18n'
import { Metadata } from 'next'
import { useParams } from 'next/navigation'
import { ReactNode } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { useIntl } from 'react-intl'

interface Props {
  params: { locale: LocaleType }
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const intl = await getIntl(locale)
  const title = `${intl.formatMessage({ id: 'pageNotFound' })} | Web Dev Drops`

  return {
    title,
    icons: defaultAppIcons,
  }
}

export default function NotFound() {
  const { locale } = useParams()
  const text = content[(locale as LocaleType) || 'pt-BR']
  const intl = useIntl()

  return (
    <div className="prose dark:prose-dark">
      <h1>
        <FaExclamationTriangle className="inline text-2xl text-gray-500" />{' '}
        {intl.formatMessage({ id: 'pageNotFound' })}
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
