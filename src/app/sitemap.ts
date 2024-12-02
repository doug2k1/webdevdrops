import { BASE_URL } from '@/consts/urls'
import { i18nConfig } from '@/libs/i18n/config'
import { LocaleType } from '@/libs/i18n/types'
import { getAllPosts, getAllTags, getNumPages } from '@/libs/posts/api'
import { MetadataRoute } from 'next'

const STATIC_PAGES = ['', '/contact', '/privacy']

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts({ fields: ['slug'] })

  return [
    // static pages
    ...STATIC_PAGES.map(
      (page) =>
        ({
          url: `${BASE_URL}${page}`,
          lastModified: new Date(),
          alternates: {
            languages: {
              en: `${BASE_URL}/en${page}`,
            },
          },
        } as const)
    ),
    // posts
    ...posts.map(
      (post) =>
        ({
          url: `${BASE_URL}/${
            post.language && post.language !== 'pt-BR' ? 'en/' : ''
          }${post.slug}`,
          lastModified: new Date(
            post.modified || post.date || '2011-05-30T09:00:00.000Z'
          ).toISOString(),
          alternates: post.translations && {
            languages: {
              ...Object.entries(post.translations).reduce(
                (acc, [locale, slug]) => {
                  return {
                    ...acc,
                    [locale]: `${BASE_URL}/${
                      locale === 'pt-BR' ? '' : `${locale}/`
                    }${slug}`,
                  }
                },
                {}
              ),
            },
          },
        } as const)
    ),
    // pagination
    ...generatePaginationPages(),
    // tags
    ...generateTagPages(),
  ]
}

const generatePaginationPages = () => {
  const entries: MetadataRoute.Sitemap = []

  const pagesPerLocale: Record<LocaleType, string[]> = {} as Record<
    LocaleType,
    string[]
  >

  i18nConfig.locales.forEach((locale) => {
    const numPages = getNumPages({ language: locale as LocaleType })

    const pages = []

    for (let i = 2; i <= numPages; i++) {
      pages.push(i.toString())
    }

    pagesPerLocale[locale] = pages
  })

  i18nConfig.locales.forEach((locale) => {
    const pages = pagesPerLocale[locale]
    const otherPagesPerLocale = { ...pagesPerLocale }
    delete otherPagesPerLocale[locale]

    pages.forEach((page) => {
      entries.push({
        url: `${BASE_URL}/${
          locale === 'pt-BR' ? '' : `${locale}/`
        }page/${page}`,
        lastModified: new Date(),
        alternates: {
          languages: Object.entries(otherPagesPerLocale).reduce(
            (acc, [locale, pages]) => {
              if (pages.includes(page)) {
                return {
                  ...acc,
                  [locale]: `${BASE_URL}/${
                    locale === 'pt-BR' ? '' : `${locale}/`
                  }page/${page}`,
                }
              }

              return acc
            },
            {}
          ),
        },
      })
    })
  })

  return entries
}

const generateTagPages = () => {
  const entries: MetadataRoute.Sitemap = []

  i18nConfig.locales.forEach((locale) => {
    const tags = getAllTags({ language: locale as LocaleType })

    tags.forEach((tag) => {
      entries.push({
        url: `${BASE_URL}/${locale === 'pt-BR' ? '' : `${locale}/`}tags/${tag}`,
        lastModified: new Date(),
        // TODO: add alternates
        // alternates: {
        //   languages: {
        //     en: `${BASE_URL}/en/tags/${tag}/`,
        //   },
        // },
      })
    })
  })

  return entries
}
