import { getIntl, LocaleType } from '@/libs/i18n'
import cx from 'classnames'
import Link from 'next/link'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface Props {
  page: number
  total: number
  basePath?: string
  locale: LocaleType
}

export async function Pagination({
  page = 1,
  total,
  basePath = '',
  locale,
}: Props) {
  const intl = await getIntl(locale)
  const wrapperBaseClasses = 'flex items-center mt-8'
  const wrapperClasses = cx(wrapperBaseClasses, {
    'justify-between': page > 1 && page < total,
    'justify-end': page === 1,
  })

  const linkClasses =
    'flex items-center bg-main px-4 py-4 rounded text-white hover:opacity-80 sm:py-2'

  return (
    <div className={wrapperClasses}>
      {page > 1 ? (
        <Link
          href={basePath + (page > 2 ? `/page/${page - 1}` : '/')}
          className={linkClasses}
        >
          <FaChevronLeft className="sm:mr-2" />{' '}
          <span className="hidden sm:block">
            {intl.formatMessage({ id: 'prevPage' })}
          </span>
        </Link>
      ) : null}

      {page < total ? (
        <Link href={`${basePath}/page/${page + 1}`} className={linkClasses}>
          <span className="hidden sm:block">
            {intl.formatMessage({ id: 'nextPage' })}
          </span>{' '}
          <FaChevronRight className="sm:ml-2" />
        </Link>
      ) : null}
    </div>
  )
}
