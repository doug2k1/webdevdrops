import i18nConfig from '@/i18nConfig'
import { getNumPages } from '@/libs/api'
import { LocaleType } from '@/libs/i18n'
import Home, { generateMetadata as generateMetadataHome } from '../../page'

export const generateMetadata = generateMetadataHome

export default Home

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
