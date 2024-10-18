'use client'

import { useFormStatus } from 'react-dom'
import { FaPaperPlane } from 'react-icons/fa'

interface Props {
  sendingMessage: string
  sendMessage: string
}

export const ContactFormSubmitButton = ({
  sendingMessage,
  sendMessage,
}: Props) => {
  const { pending } = useFormStatus()

  return (
    <button
      className="inline-flex items-center rounded-sm bg-main px-4 py-2 text-white disabled:opacity-50"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        sendingMessage
      ) : (
        <>
          {sendMessage} <FaPaperPlane className="ml-2" />
        </>
      )}
    </button>
  )
}
