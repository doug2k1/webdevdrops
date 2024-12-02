import { i18nConfig } from '@/libs/i18n/config'
import { LocaleType } from '@/libs/i18n/types'
import { getNumPages } from '@/libs/posts/api'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HomePage from '../../page'

interface Props {
  params: Promise<{ locale: LocaleType; page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, page } = await params
  const pageNumber = parseInt(page || '1', 10)

  const t = await getTranslations({ locale })

  return {
    title: t('paginationTitle', { page: pageNumber }),
  }
}

export default HomePage

export function generateStaticParams() {
  const params: { locale: string; page: string }[] = []

  i18nConfig.locales.forEach((locale) => {
    const numPages = getNumPages({ language: locale as LocaleType })

    const pages = []

    for (let i = 2; i <= numPages; i++) {
      pages.push(i.toString())
    }

    pages.forEach((page) => {
      params.push({
        locale,
        page,
      })
    })
  })

  return params
}
