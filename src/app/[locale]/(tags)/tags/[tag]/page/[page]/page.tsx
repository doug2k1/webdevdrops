import { i18nConfig } from '@/libs/i18n/config'
import { LocaleType } from '@/libs/i18n/types'
import { getAllTags, getNumPagesForTag } from '@/libs/posts/api'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import TagPage from '../../page'

interface Props {
  params: Promise<{ locale: LocaleType; tag: string; page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tag, page } = await params
  const pageNumber = parseInt(page || '1', 10)
  const t = await getTranslations({ locale })

  return {
    title: `Tag: ${tag}${
      pageNumber > 1 ? ` - ${t('paginationTitle', { page: pageNumber })}` : ''
    }`,
  }
}

export default TagPage

export function generateStaticParams() {
  const params: { locale: string; tag: string; page: string }[] = []

  i18nConfig.locales.forEach((locale) => {
    const tags = getAllTags({ language: locale as LocaleType })

    tags.forEach((tag) => {
      const numPages = getNumPagesForTag({
        tag,
        language: locale as LocaleType,
      })

      for (let i = 2; i <= numPages; i++) {
        params.push({
          locale,
          tag,
          page: i.toString(),
        })
      }
    })
  })

  return params
}
