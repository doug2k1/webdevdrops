import { FaComments, FaTwitter } from 'react-icons/fa'
import { FormattedMessage } from 'react-intl'

interface Props {
  twitterId?: string | null
}

export function PostComments({ twitterId }: Props) {
  return (
    <section className="mt-12 border-t border-gray-300 p-4 text-center dark:border-gray-600 dark:text-gray-300">
      <h4 className="mb-4 flex items-center justify-center">
        <FaComments className="mr-2 text-2xl text-gray-500" />
        <span className="font-bold text-gray-500 dark:text-gray-400">
          <FormattedMessage id="comments" />
        </span>
      </h4>

      {twitterId ? (
        <a
          className="inline-flex items-center rounded-sm bg-main px-4 py-2 text-white hover:opacity-80"
          href={`https://twitter.com/webdevdrops/status/${twitterId}`}
          target="_blank"
          rel="noreferrer"
        >
          <span>
            <FormattedMessage id="commentOnTwitter" />
          </span>
          <FaTwitter className="ml-2" />
        </a>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          <FormattedMessage id="disabledComments" />
        </p>
      )}
    </section>
  )
}
