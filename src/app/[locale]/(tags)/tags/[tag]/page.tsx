import { Pagination } from '@/components/Pagination'
import { PostList } from '@/components/PostList'
import { i18nConfig } from '@/libs/i18n/config'
import { LocaleType } from '@/libs/i18n/types'
import { getAllTags, getNumPagesForTag, getPostsByTag } from '@/libs/posts/api'
import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { FaTag } from 'react-icons/fa'
import { generateMetadata as generateMetadataHome } from '../../../(home)/page'

interface Props {
  params: Promise<{ locale: LocaleType; tag: string; page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tag } = await params

  const metadata = await generateMetadataHome({
    params: Promise.resolve({ locale }),
  })

  metadata.title = `Tag: ${tag} | Web Dev Drops`

  return metadata
}

export default async function TagPage({ params }: Props) {
  const { locale, tag, page } = await params

  setRequestLocale(locale)
  const numPages = getNumPagesForTag({
    tag,
    language: locale,
  })

  const pageNumber = parseInt(page || '1', 10)

  if (!pageNumber) {
    return notFound()
  }

  const posts = getPostsByTag({
    tag,
    fields: ['title', 'date', 'slug', 'modified', 'coverImage', 'categories'],
    language: locale,
    page: pageNumber,
  })

  if (posts.length === 0) {
    return notFound()
  }

  return (
    <>
      <h1 className="mb-8 text-4xl font-extrabold dark:text-gray-300">
        <FaTag className="inline text-2xl text-gray-500 dark:text-gray-400" />{' '}
        Tag: {tag}
      </h1>
      <PostList posts={posts} page={pageNumber} />
      <Pagination
        page={pageNumber}
        total={numPages}
        basePath={`/tags/${tag}`}
      />
    </>
  )
}

export async function generateStaticParams() {
  const params: { locale: string; tag: string }[] = []

  i18nConfig.locales.forEach((locale) => {
    const tags = getAllTags({ language: locale as LocaleType })

    tags.forEach((tag) => {
      params.push({
        locale,
        tag,
      })
    })
  })

  return params
}
