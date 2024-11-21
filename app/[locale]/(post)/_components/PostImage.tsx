import Image from 'next/image'
import { ComponentProps } from 'react'

interface Props {
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
  caption?: string
}

export function PostImage({
  caption = '',
  src,
  alt,
  width,
  height,
  ...rest
}: Props &
  Omit<ComponentProps<typeof Image>, 'src' | 'alt' | 'width' | 'height'>) {
  if (!src) {
    return null
  }

  return (
    <figure>
      <Image
        src={src}
        alt={alt || ''}
        width={parseDimension(width)}
        height={parseDimension(height)}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
        sizes={`(max-width: 768px) 100vw, 620px`}
        {...rest}
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}

function parseDimension(value: string | number | undefined) {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'string') {
    const parsed = parseInt(value, 10)

    if (!isNaN(parsed)) {
      return parsed
    }
  }

  return undefined
}
