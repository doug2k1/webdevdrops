import { LocaleType } from '@/libs/i18n/types'

export type PostTranslations = Record<LocaleType, string>

export interface Post {
  slug?: string
  link?: string
  title?: string
  date?: string
  modified?: string
  coverImage?: string
  excerpt?: string
  content?: string
  tags?: string[]
  language: LocaleType
  translations?: PostTranslations
  twitterPost?: string
  categories?: string[]
}

export type PostKey = keyof Post
