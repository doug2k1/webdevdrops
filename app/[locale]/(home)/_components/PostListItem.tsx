import { Link } from '@/libs/i18n/routing'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Post } from '../types/post'
import { PostCategory } from './PostCategory'

interface Props {
  post: Post
  featured?: boolean
}

export function PostListItem({ post, featured }: Props) {
  const t = useTranslations()
  const image = post.coverImage

  return (
    <div className="mb-8">
      <Link href={`/${post.slug}`} passHref>
        <div
          className="relative mb-1 overflow-hidden border border-solid border-gray-300 dark:border-gray-600"
          style={{ paddingTop: '56.25%' }}
        >
          {image ? (
            <Image
              src={image}
              alt={t('postListItemAlt')}
              className="object-cover transition-transform hover:scale-105"
              fill
              sizes={`(max-width: 768px) 100vw, ${featured ? '50vw' : '33vw'}`}
              priority={featured}
            />
          ) : null}
        </div>

        {post.categories?.map((cat) => (
          <PostCategory category={cat} key={cat} />
        ))}

        <h2 className="mt-2 text-xl font-bold leading-tight hover:text-main dark:text-gray-300 dark:hover:text-blue-300 lg:text-2xl">
          {post.title}
        </h2>
      </Link>
    </div>
  )
}
