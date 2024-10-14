import { PostAd } from '@/components/PostAd'
import { PostComments } from '@/components/PostComments'
import { PostI18nLinks } from '@/components/PostI18nLinks'
import { PostImage } from '@/components/PostImage'
import { PostInfo } from '@/components/PostInfo'
import { PostLink } from '@/components/PostLink'
import { ShareButtons } from '@/components/ShareButtons'
import { getAllPosts, getPostBySlug } from '@/libs/api'
import { LocaleType } from '@/libs/i18n'
import '@/styles/highlight-js/atom-one-dark.css'
import { compile, run, RunOptions } from '@mdx-js/mdx'
import Link from 'next/link'
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

export async function generateMetadata({ params: { slug } }: Props) {
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
  const title = `${post.title} | Web Dev Drops`

  return {
    title,
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
      'slug',
      'link',
      'content',
      'tags',
      'coverImage',
      'twitterPost',
    ],
  })
  const { minutes } = readingTime(post.content || '')
  const code = String(
    await compile(post.content || '', {
      outputFormat: 'function-body',
      rehypePlugins: [rehypeHighlight],
    })
  )

  const { default: MDXContent } = await run(code, { ...runtime } as RunOptions)

  return (
    <>
      <div>
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
            <div>
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
    slug: post.slug,
  }))
}
