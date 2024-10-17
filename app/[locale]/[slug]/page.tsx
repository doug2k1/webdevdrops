import { PostAd } from '@/components/PostAd'
import { PostComments } from '@/components/PostComments'
import { PostI18nLinks } from '@/components/PostI18nLinks'
import { PostImage } from '@/components/PostImage'
import { PostInfo } from '@/components/PostInfo'
import { PostLink } from '@/components/PostLink'
import { ShareButtons } from '@/components/ShareButtons'
import i18nConfig from '@/i18nConfig'
import { getAllPosts, getPostBySlug } from '@/libs/api'
import { BASE_URL, defaultAppIcons } from '@/libs/consts'
import { LocaleType } from '@/libs/i18n'
import '@/styles/highlight-js/atom-one-dark.css'
import { compile, run, RunOptions } from '@mdx-js/mdx'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ClassAttributes, Fragment, ImgHTMLAttributes } from 'react'
import { FaTag } from 'react-icons/fa'
import * as runtime from 'react/jsx-runtime'
import readingTime from 'reading-time'
import rehypeHighlight from 'rehype-highlight'

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

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
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
      }${path}/`

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
  params: { locale: LocaleType; slug: string }
}

export default async function PostPage({ params: { locale, slug } }: Props) {
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
    await compile(post.content || '', {
      outputFormat: 'function-body',
      rehypePlugins: [rehypeHighlight],
    })
  )

  const { default: MDXContent } = await run(code, { ...runtime } as RunOptions)
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
        <article className="prose mx-auto dark:prose-dark">
          <h1>{post.title}</h1>

          <PostInfo
            modifiedDate={post.modified || post.date!}
            readingMinutes={minutes}
            locale={locale}
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

          <ShareButtons title={post.title!} url={post.link!} locale={locale} />
        </article>
      </div>
      <PostComments twitterId={post.twitterPost} locale={locale} />
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
