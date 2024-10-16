import { Pagination } from '@/components/Pagination'
import { PostList } from '@/components/PostList'
import i18nConfig from '@/i18nConfig'
import { getAllPosts, getNumPages } from '@/libs/api'
import { BASE_URL } from '@/libs/consts'
import { getIntl, LocaleType } from '@/libs/i18n'
import { Metadata } from 'next'

interface Props {
  params: { locale: LocaleType }
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
    icons: [
      {
        url: '/images/cropped-logo-wdd-transp-32x32.png',
        sizes: '32x32',
      },
      {
        url: '/images/cropped-logo-wdd-transp-192x192.png',
        sizes: '192x192',
      },
      {
        url: '/images/cropped-logo-wdd-transp-180x180.png',
        rel: 'apple-touch-icon',
      },
      {
        url: '/images/cropped-logo-wdd-transp-270x270.png',
        rel: 'msapplication-TileImage',
      },
    ],
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
