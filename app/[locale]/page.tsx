import { Pagination } from '@/components/Pagination'
import { PostList } from '@/components/PostList'
import i18nConfig from '@/i18nConfig'
import { getAllPosts, getNumPages } from '@/libs/api'
import { BASE_URL, defaultAppIcons } from '@/libs/consts'
import { getIntl, LocaleType } from '@/libs/i18n'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: { locale: LocaleType; page?: string }
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const intl = await getIntl(locale)
  const siteName = 'Web Dev Drops'
  const siteSlogan = intl.formatMessage({ id: 'siteSlogan' })
  const title = `${siteName} | ${siteSlogan}`
  const description = siteSlogan
  const image = `${BASE_URL}/images/webdevdrops-logo-500.png`

  return {
    title,
    description,
    openGraph: {
      locale,
      title,
      description,
      siteName,
      images: [{ url: image, alt: siteName, width: 500, height: 150 }],
    },
    twitter: {
      card: 'summary',
    },
    icons: defaultAppIcons,
  }
}

export default function Home({ params: { locale, page } }: Props) {
  const numPages = getNumPages({ language: locale as LocaleType })
  const pageNumber = page ? parseInt(page, 10) : 1
  const posts = getAllPosts({
    page: pageNumber,
    fields: ['title', 'modified', 'date', 'slug', 'coverImage', 'categories'],
    language: locale as LocaleType,
  })

  if (posts.length === 0) {
    return notFound()
  }

  return (
    <>
      <PostList posts={posts} page={pageNumber} />
      <Pagination page={pageNumber} total={numPages} locale={locale} />
    </>
  )
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({
    locale,
  }))
}
