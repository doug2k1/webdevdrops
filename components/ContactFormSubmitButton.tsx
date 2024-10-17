import { useFormStatus } from 'react-dom'
import { FaPaperPlane } from 'react-icons/fa'
import { FormattedMessage } from 'react-intl'

export const ContactFormSubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <button
      className="inline-flex items-center rounded-sm bg-main px-4 py-2 text-white disabled:opacity-50"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <FormattedMessage id="contactSending" />
      ) : (
        <>
          <FormattedMessage id="contactSend" />{' '}
          <FaPaperPlane className="ml-2" />
        </>
      )}
    </button>
  )
}
