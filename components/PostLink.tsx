import Link from 'next/link'
import { PropsWithChildren } from 'react'

export function PostLink({
  href,
  children,
  ...rest
}: PropsWithChildren<{ href?: string }>) {
  if (!href) {
    return null
  }

  const isLocal = !href.startsWith('http')
  const target = isLocal ? undefined : '_blank'
  const rel = isLocal ? undefined : 'nofollow noopener'

  return (
    <Link href={href} {...rest} target={target} rel={rel}>
      {children}
    </Link>
  )
}
