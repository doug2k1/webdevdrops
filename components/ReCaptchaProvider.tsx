'use client'

import { PropsWithChildren } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export function ReCaptchaProvider({ children }: PropsWithChildren) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}
