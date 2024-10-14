import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaCalendar, FaClock } from 'react-icons/fa'
import { FormattedMessage } from 'react-intl'

interface Props {
  modifiedDate: string
  readingMinutes?: number
}

export function PostInfo({ modifiedDate, readingMinutes }: Props) {
  const { locale } = useRouter()

  return (
    <div className="mb-8 flex items-center text-sm">
      <Image
        className="mr-2 rounded-full"
        style={{ marginTop: 0, marginBottom: 0 }}
        src={`/images/douglas.jpg`}
        width={50}
        height={50}
        alt="avatar"
      />

      <div>
        <span className="mr-4 text-gray-700 dark:text-gray-300">
          Douglas Matoso
        </span>

        <div>
          <div className="flex items-center">
            <FaCalendar className="mr-1 text-gray-700 dark:text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400">
              <FormattedMessage id="updatedAt" />{' '}
              {new Intl.DateTimeFormat(locale).format(new Date(modifiedDate))}
            </span>
          </div>

          {!readingMinutes ? null : (
            <div className="flex items-center">
              <FaClock className="mr-1 text-gray-700 dark:text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400">
                <FormattedMessage
                  id="readingTime"
                  values={{ min: Math.ceil(readingMinutes) }}
                />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
