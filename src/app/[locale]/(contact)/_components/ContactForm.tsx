'use client'

import { ContactFormState } from '@/types/contact'
import {
  ComponentProps,
  ComponentType,
  PropsWithChildren,
  useActionState,
  useEffect,
  useRef,
} from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa'
import { sendContactMessage } from '../_actions/sendContactMessage'
import { ContactFormSubmitButton } from './ContactFormSubmitButton'

const initialState: ContactFormState = { status: 'INITIAL' }

interface Props {
  successMessage: string
  failureMessage: string
  sendingMessage: string
  sendMessage: string
  SubmitButton: ComponentType<ComponentProps<typeof ContactFormSubmitButton>>
}

export function ContactForm({
  children,
  successMessage,
  failureMessage,
  sendingMessage,
  sendMessage,
  SubmitButton,
}: PropsWithChildren<Props>) {
  const { executeRecaptcha } = useGoogleReCaptcha()

  const [formState, formAction] = useActionState(
    async (prevState: ContactFormState, formData: FormData) => {
      let reCaptchaToken = ''

      if (executeRecaptcha) {
        reCaptchaToken = await executeRecaptcha('reCaptchaAction')
      }

      return sendContactMessage(prevState, formData, reCaptchaToken)
    },
    initialState
  )
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (formState.status === 'SUCCESS') {
      formRef.current?.reset()
    }
  }, [formState.status])

  return (
    <>
      <form ref={formRef} action={formAction}>
        {children}

        <SubmitButton
          sendingMessage={sendingMessage}
          sendMessage={sendMessage}
        />
      </form>

      {formState.status === 'SUCCESS' ? (
        <p className="mt-4 flex items-center text-green-700 dark:text-green-300">
          <FaCheck className="mr-2" />
          <span>{successMessage}</span>
        </p>
      ) : null}

      {formState.status === 'ERROR' ? (
        <p className="mt-4 flex items-center text-red-700 dark:text-red-300">
          <FaExclamationTriangle className="mr-2" />
          <span>{failureMessage}</span>
        </p>
      ) : null}
    </>
  )
}
