import { Pagination } from '@/components/Pagination'
import { PostList } from '@/components/PostList'
import i18nConfig from '@/i18nConfig'
import { getAllPostsForTag, getAllTags, getNumPagesForTag } from '@/libs/api'
import { LocaleType } from '@/libs/i18n'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FaTag } from 'react-icons/fa'
import { generateMetadata as generateMetadataHome } from '../../page'

interface Props {
  params: { locale: LocaleType; tag: string; page?: string }
}

export async function generateMetadata({
  params: { locale, tag },
}: Props): Promise<Metadata> {
  const metadata = await generateMetadataHome({ params: { locale } })

  metadata.title = `Tag: ${tag} | Web Dev Drops`

  return metadata
}

export default function TagPage({ params: { locale, tag, page } }: Props) {
  const numPages = getNumPagesForTag({
    tag,
    language: locale,
  })
  const pageNumber = page ? parseInt(page, 10) : 1
  const posts = getAllPostsForTag({
    tag,
    fields: ['title', 'date', 'slug', 'modified', 'coverImage', 'categories'],
    language: locale,
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
        locale={locale}
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
