'use client'

import { AppProgressBar } from 'next-nprogress-bar'
import { PropsWithChildren } from 'react'

export function ProgressBarProvider({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <AppProgressBar
        height="3px"
        color="#fbbf24"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  )
}
