import { defaultAppIcons } from '@/consts/icons'
import { BASE_URL } from '@/consts/urls'
import { i18nConfig } from '@/libs/i18n/config'
import { Link } from '@/libs/i18n/routing'
import { LocaleType } from '@/libs/i18n/types'
import { getAllPosts, getPostBySlug } from '@/libs/posts/api'
import '@/styles/highlight-js/atom-one-dark.css'
import { compile, run, RunOptions } from '@mdx-js/mdx'
import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ClassAttributes, Fragment, ImgHTMLAttributes, use } from 'react'
import { FaTag } from 'react-icons/fa'
import * as runtime from 'react/jsx-runtime'
import readingTime from 'reading-time'
import rehypeHighlight from 'rehype-highlight'
import { PostAd } from '../_components/PostAd'
import { PostComments } from '../_components/PostComments'
import { PostI18nLinks } from '../_components/PostI18nLinks'
import { PostImage } from '../_components/PostImage'
import { PostInfo } from '../_components/PostInfo'
import { PostLink } from '../_components/PostLink'

const components = {
  PostImage,
  PostAd,
  img: ({
    src,
    alt,
    width,
    height,
  }: ClassAttributes<HTMLImageElement> &
    ImgHTMLAttributes<HTMLImageElement>) => (
    <PostImage src={src} alt={alt} width={width} height={height} />
  ),
  pre: (props: object) => <pre {...props} />,
  code: (props: object) => <code {...props} />,
  a: PostLink,
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const post = getPostBySlug({
    slug: slug,
    fields: [
      'title',
      'date',
      'slug',
      'link',
      'content',
      'tags',
      'coverImage',
      'twitterPost',
    ],
  })

  if (!post) {
    return {}
  }

  const title = `${post.title} | Web Dev Drops`
  const languages = Object.entries(post.translations || {}).reduce(
    (prev: Record<string, string>, [locale, path]) => {
      prev[locale] = `${BASE_URL}/${
        locale === i18nConfig.defaultLocale ? '' : `${locale}/`
      }${path}`

      return prev
    },
    {}
  )

  return {
    title,
    alternates: {
      canonical: post.link,
      languages,
    },
    openGraph: {
      type: 'article',
      url: post.link,
      title,
      images: post.coverImage
        ? [
            {
              url: `${BASE_URL}${post.coverImage}` || '',
              width: 1280,
              height: 720,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@webdevdrops',
      site: '@webdevdrops',
    },
    icons: defaultAppIcons,
  }
}

interface Props {
  params: Promise<{ locale: LocaleType; slug: string }>
}

export default function PostPage({ params }: Props) {
  const { locale, slug } = use(params)

  setRequestLocale(locale)
  const post = getPostBySlug({
    slug: slug,
    fields: [
      'title',
      'date',
      'modified',
      'slug',
      'link',
      'content',
      'tags',
      'coverImage',
      'twitterPost',
    ],
  })

  if (!post) {
    return notFound()
  }

  const { minutes } = readingTime(post.content || '')
  const code = String(
    use(
      compile(post.content || '', {
        outputFormat: 'function-body',
        rehypePlugins: [rehypeHighlight],
      })
    )
  )

  const { default: MDXContent } = use(run(code, { ...runtime } as RunOptions))
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    image: [`${BASE_URL}${post.coverImage}` || ''],
    datePublished: post.date,
    dateModified: post.modified,
  }

  return (
    <>
      <div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <article className="prose mx-auto max-w-2xl dark:prose-dark">
          <h1>{post.title}</h1>

          <PostInfo
            modifiedDate={post.modified || post.date!}
            readingMinutes={minutes}
          />

          <PostI18nLinks translations={post.translations} />

          <MDXContent components={components} />

          {post.tags!.length > 0 ? (
            <div data-testid="post-tags">
              <p>
                <FaTag className="inline text-gray-500" />{' '}
                <span className="font-bold text-gray-500">Tags:</span>{' '}
                {post.tags!.map((tag, index) => (
                  <Fragment key={tag}>
                    <Link href={`/tags/${tag}`} passHref>
                      {tag}
                    </Link>

                    {index < post.tags!.length - 1 ? (
                      <span className="mx-2 text-gray-500">|</span>
                    ) : null}
                  </Fragment>
                ))}
              </p>
            </div>
          ) : null}
        </article>
      </div>
      <PostComments twitterId={post.twitterPost} />
    </>
  )
}

export async function generateStaticParams() {
  const posts = getAllPosts({ fields: ['slug'] })

  return posts.map((post) => ({
    locale: post.language,
    slug: post.slug,
  }))
}
