'use client'
import { sendContactMessage } from '@/actions/sendContactMessage'
import { ContactFormState } from '@/types/contact'
import { useEffect, useRef } from 'react'
import { useFormState } from 'react-dom'
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa'
import { FormattedMessage, useIntl } from 'react-intl'
import { ContactFormSubmitButton } from './ContactFormSubmitButton'
import { FormInput } from './FormInput'
import { FormLabel } from './FormLabel'

const initialState: ContactFormState = { status: 'INITIAL' }

export function ContactForm() {
  const intl = useIntl()

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
        <FormLabel
          id="inputName"
          label={`${intl.formatMessage({ id: 'contactName' })}:`}
        />
        <FormInput id="inputName" name="name" type="text" />

        <FormLabel
          id="inputEmail"
          label={`${intl.formatMessage({ id: 'contactEmail' })}:`}
        />
        <FormInput id="inputEmail" name="email" type="email" />

        <FormLabel
          id="inputMessage"
          label={`${intl.formatMessage({ id: 'contactMessage' })}:`}
        />
        <FormInput id="inputMessage" name="message" type="textarea" />

        <ContactFormSubmitButton />
      </form>

      {formState.status === 'SUCCESS' ? (
        <p className="mt-4 flex items-center text-green-700 dark:text-green-300">
          <FaCheck className="mr-2" />
          <span>
            <FormattedMessage id="contactSuccess" />
          </span>
        </p>
      ) : null}

      {formState.status === 'ERROR' ? (
        <p className="mt-4 flex items-center text-red-700 dark:text-red-300">
          <FaExclamationTriangle className="mr-2" />
          <span>
            <FormattedMessage id="contactError" />
          </span>
        </p>
      ) : null}
    </>
  )
}
