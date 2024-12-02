import { Pagination } from '@/components/Pagination'
import { PostList } from '@/components/PostList'
import { i18nConfig } from '@/libs/i18n/config'
import { LocaleType } from '@/libs/i18n/types'
import { getAllPosts, getNumPages } from '@/libs/posts/api'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ locale: LocaleType; page?: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale, page } = await params
  const pageNumber = parseInt(page || '1', 10)

  setRequestLocale(locale)

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
