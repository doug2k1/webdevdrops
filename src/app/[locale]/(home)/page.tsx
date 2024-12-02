import { Pagination } from '@/components/Pagination'
import { PostList } from '@/components/PostList'
import { defaultAppIcons } from '@/consts/icons'
import { BASE_URL } from '@/consts/urls'
import { i18nConfig } from '@/libs/i18n/config'
import { LocaleType } from '@/libs/i18n/types'
import { getAllPosts, getNumPages } from '@/libs/posts/api'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { use } from 'react'

interface Props {
  params: Promise<{ locale: LocaleType; page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const t = await getTranslations({ locale })
  const siteName = 'Web Dev Drops'
  const siteSlogan = t('siteSlogan')
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

export default function HomePage({ params }: Props) {
  const { locale, page } = use(params)
  setRequestLocale(locale)

  const pageNumber = parseInt(page || '1', 10)

  if (!pageNumber) {
    return notFound()
  }

  const numPages = getNumPages({ language: locale as LocaleType })
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
      <Pagination page={pageNumber} total={numPages} />
    </>
  )
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({
    locale,
  }))
}
