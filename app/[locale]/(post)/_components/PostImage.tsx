import Image from 'next/image'

interface Props {
  src: string | undefined
  alt?: string
  caption?: string
  width?: string | number
  height?: string | number
  loading?: 'lazy' | 'eager'
}

export function PostImage({
  src,
  alt = '',
  caption = '',
  width,
  height,
  loading,
}: Props) {
  if (!src) {
    return null
  }

  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={width as number | `${number}`}
        height={height as number | `${number}`}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
        loading={loading}
        sizes={`(max-width: 768px) 100vw, 620px`}
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}
