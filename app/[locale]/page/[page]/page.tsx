import { getNumPages } from '@/libs/api'
import { i18nConfig } from '@/libs/i18n/config'
import { LocaleType } from '@/libs/i18n/types'
import HomePage, { generateMetadata as generateMetadataHome } from '../../page'

export const generateMetadata = generateMetadataHome

export default HomePage

export async function generateStaticParams() {
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
