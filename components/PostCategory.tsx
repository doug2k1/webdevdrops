import { categoryMetadata } from '@/libs/categoryMetadata'

interface Props {
  category: string
}

export function PostCategory({ category }: Props) {
  const meta = categoryMetadata[category] || categoryMetadata.fallback

  return (
    <span
      className={`${meta.colors.bg} ${meta.colors.text} mr-1 rounded px-2 py-1 text-xs uppercase`}
    >
      {category}
    </span>
  )
}
