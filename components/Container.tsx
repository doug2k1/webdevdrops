import { PropsWithChildren } from 'react'

export function Container({
  children,
  className = '',
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`mx-auto w-full max-w-full px-4 lg:px-8 xl:max-w-screen-xl ${className}`}
    >
      {children}
    </div>
  )
}
