import { Pagination } from '@/components/Pagination'
import { PostList } from '@/components/PostList'
import i18nConfig from '@/i18nConfig'
import { getAllPosts, getNumPages } from '@/libs/api'
import { getIntl, LocaleType } from '@/libs/i18n'

interface Props {
  params: { locale: LocaleType }
}

export async function generateMetadata({ params: { locale } }: Props) {
  const intl = await getIntl(locale)
  const siteSlogan = intl.formatMessage({ id: 'siteSlogan' })
  const title = `Web Dev Drops | ${siteSlogan}`

  return {
    title,
  }
}

export default function Home({ params: { locale } }: Props) {
  const numPages = getNumPages({ language: locale as LocaleType })
  const posts = getAllPosts({
    page: 1,
    fields: ['title', 'modified', 'date', 'slug', 'coverImage', 'categories'],
    language: locale as LocaleType,
  })

  return (
    <>
      <PostList posts={posts} page={1} />
      <Pagination page={1} total={numPages} locale={locale} />
    </>
  )
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({
    locale,
  }))
}
