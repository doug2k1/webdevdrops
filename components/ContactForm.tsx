'use client'

import { sendContactMessage } from '@/actions/sendContactMessage'
import { ContactFormState } from '@/types/contact'
import {
  ComponentProps,
  ComponentType,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react'
import { useFormState } from 'react-dom'
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa'
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
  const [formState, formAction] = useFormState(sendContactMessage, initialState)
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
