import { i18nConfig } from '@/libs/i18n/config'
import { LocaleType } from '@/libs/i18n/types'
import { getAllTags, getNumPagesForTag } from '@/libs/posts/api'
import TagPage, { generateMetadata as generateMetadataTag } from '../../page'

export const generateMetadata = generateMetadataTag

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
