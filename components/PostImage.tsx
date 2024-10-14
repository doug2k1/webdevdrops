import Image from 'next/image'

interface Props {
  src: string | undefined
  alt?: string
  caption?: string
  width?: string | number
  height?: string | number
}

export function PostImage({
  src,
  alt = '',
  caption = '',
  width,
  height,
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
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}
