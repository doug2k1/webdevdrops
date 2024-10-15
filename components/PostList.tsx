import { Post } from '../types/post'
import { PostListItem } from './PostListItem'

interface Props {
  posts: Post[]
  page: number
}

export function PostList({ posts, page }: Props) {
  const featuredPosts = page === 1 ? posts.slice(0, 2) : []
  const otherPosts = page === 1 ? posts.slice(2) : posts

  return (
    <>
      <div
        className="md:mb-8 md:grid md:grid-cols-2 md:gap-8"
        data-testid="featured-posts"
      >
        {featuredPosts.map((post) => (
          <PostListItem post={post} key={post.slug} />
        ))}
      </div>
      <div
        className="md:grid md:grid-cols-3 md:gap-8"
        data-testid="older-posts"
      >
        {otherPosts.map((post) => (
          <PostListItem post={post} key={post.slug} />
        ))}
      </div>
    </>
  )
}
