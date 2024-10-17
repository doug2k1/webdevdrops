import i18nConfig from '@/i18nConfig'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { Post, PostKey } from '../types/post'
import { BASE_URL } from './consts'
import { LocaleType } from './i18n'

const postsDirectory = path.resolve(process.cwd(), 'posts')

export const PAGE_SIZE = 15

function slicePage(posts: Post[], page = 1) {
  const start = page === 1 ? 0 : PAGE_SIZE - 1 + (page - 2) * PAGE_SIZE
  const count = page === 1 ? PAGE_SIZE - 1 : PAGE_SIZE
  return posts.slice(start, start + count)
}

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((slug) => !slug.startsWith('.'))
}

export function getPostBySlug({
  slug,
  fields = [],
}: {
  slug: string
  fields?: PostKey[]
}) {
  const fullPath = path.join(postsDirectory, `${slug}/index.mdx`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const post: Partial<Post> = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    switch (field) {
      case 'slug':
        post.slug = slug
        break
      case 'content':
        post.content = content
        break
      case 'tags':
        post.tags = data.tags || []
        break
      case 'link':
        const lang =
          data.language && data.language !== i18nConfig.defaultLocale
            ? `${data.language}/`
            : ''
        post.link = `${BASE_URL}/${lang}${slug}/`
        break
      case 'date':
        // adjust time zone
        post.date = data.date ? data.date + 'T06:00:00.000-0300' : undefined
        break
      case 'modified':
        // adjust time zone
        post.modified = data.modified
          ? data.modified + 'T06:00:00.000-0300'
          : undefined
        break
      default:
        post[field] = data[field]
    }

    if (post[field] === undefined) {
      delete post[field]
    }
  })

  // always return language and translations
  post.language = data.language || i18nConfig.defaultLocale
  post.translations = data.translations || {}

  return post as Post
}

export function getAllPosts({
  fields = [],
  page,
  language,
}: {
  fields?: PostKey[]
  page?: number
  language?: LocaleType
}) {
  const slugs = getPostSlugs()

  let posts = slugs
    .map((slug) =>
      getPostBySlug({ slug, fields: [...fields, 'date', 'modified'] })
    )
    .filter((post) => post !== null)
    .filter((post) => (language ? post.language === language : true))
    .sort((post1, post2) =>
      (post1.modified || post1.date!) > (post2.modified || post2.date!) ? -1 : 1
    )

  if (page) {
    posts = slicePage(posts, page)
  }

  return posts
}

export function getNumPages({
  language = i18nConfig.defaultLocale as LocaleType,
}: {
  language: LocaleType
}) {
  const slugs = getPostSlugs()

  const posts = slugs
    .map((slug) => getPostBySlug({ slug, fields: ['language'] }))
    .filter((post) => post !== null)
    .filter((post) => post.language === language)

  return Math.ceil((posts.length + 1) / PAGE_SIZE)
}

export function getAllTags({ language }: { language?: LocaleType } = {}) {
  const slugs = getPostSlugs()

  const posts: Post[] = slugs
    .map((slug) => getPostBySlug({ slug, fields: ['tags'] }))
    .filter((post) => post !== null)
    .filter((post) => (language ? post.language === language : true))

  const tags = posts.reduce<string[]>((allTags, post) => {
    return [...allTags, ...(post.tags || [])]
  }, [])

  // remove duplicates
  return Array.from(new Set(tags))
}

export function getNumPagesForTag({
  tag,
  language = i18nConfig.defaultLocale as LocaleType,
}: {
  tag: string
  language: LocaleType
}) {
  const slugs = getPostSlugs()

  const posts = slugs
    .map((slug) => getPostBySlug({ slug, fields: ['tags', 'language'] }))
    .filter((post) => post !== null)
    .filter(
      (post) => post.language === language && (post.tags || []).includes(tag)
    )

  return Math.ceil((posts.length + 1) / PAGE_SIZE)
}

export function getAllPostsForTag({
  tag,
  fields = [],
  page = 1,
  language,
}: {
  tag: string
  fields?: PostKey[]
  page?: number
  language?: LocaleType
}) {
  const allPosts = getAllPosts({ fields: [...fields, 'tags'], language })
  const tagPosts = allPosts.filter((post) => (post.tags || []).includes(tag))

  return slicePage(tagPosts, page)
}
