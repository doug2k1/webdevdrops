import Image from 'next/image'
import Link from 'next/link'
import { Post } from '../types/post'
import { PostCategory } from './PostCategory'

interface Props {
  post: Post
}

export function PostListItem({ post }: Props) {
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
              alt={post.title || ''}
              className="object-cover transition-transform hover:scale-105"
              fill
              sizes="100vw"
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
