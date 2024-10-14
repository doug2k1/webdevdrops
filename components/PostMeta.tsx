import { BASE_URL } from '@/libs/consts'
import { localePath, LocaleType } from '@/libs/i18n'
import { Post } from '../types/post'

interface Props {
  post: Post
}

export function PostMeta({ post }: Props) {
  const title = post.title || ''
  const description = post.excerpt || ''
  const url = post.link
  const date = new Date(post.date || '').toISOString()
  const image = `${BASE_URL}${post.coverImage}`
  const modified = new Date(post.modified || post.date!).toISOString()
  const language = post.language
  const translations = post.translations || {}

  return (
    <>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang={language} href={url} />

      {Object.keys(translations).map((locale) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={`${BASE_URL}/${localePath('', locale)}${
            translations[locale as LocaleType]
          }/`}
        />
      ))}

      <meta property="og:locale" content={language} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Web Dev Drops" />
      <meta
        property="article:publisher"
        content="https://www.facebook.com/webdevdrops/"
      />
      <meta property="article:published_time" content={date} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="720" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@webdevdrops" />
      <meta name="twitter:site" content="@webdevdrops" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `
          {
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              "headline": "${title}",
              "image": [
                "${image}"
              ],
              "datePublished": "${date}",
              "dateModified": "${modified}"
            }
          `,
        }}
      />
    </>
  )
}
