import { getIntl, LocaleType } from '@/libs/i18n'
import Image from 'next/image'
import { FaCalendar, FaClock } from 'react-icons/fa'

interface Props {
  modifiedDate: string
  readingMinutes?: number
  locale: LocaleType
}

export async function PostInfo({
  modifiedDate,
  readingMinutes,
  locale,
}: Props) {
  const intl = await getIntl(locale)

  return (
    <div className="mb-8 flex items-center text-sm" data-testid="post-info">
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
              {intl.formatMessage({ id: 'updatedAt' })}{' '}
              {new Intl.DateTimeFormat(locale).format(new Date(modifiedDate))}
            </span>
          </div>

          {!readingMinutes ? null : (
            <div className="flex items-center">
              <FaClock className="mr-1 text-gray-700 dark:text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400">
                {intl.formatMessage(
                  { id: 'readingTime' },
                  { min: Math.ceil(readingMinutes) }
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
