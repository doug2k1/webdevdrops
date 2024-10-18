import { Link } from '@/libs/i18n/routing'
import { clsx } from 'clsx/lite'
import { useTranslations } from 'next-intl'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

interface Props {
  page: number
  total: number
  basePath?: string
}

export function Pagination({ page = 1, total, basePath = '' }: Props) {
  const t = useTranslations()
  const wrapperBaseClasses = 'flex items-center mt-8'
  const wrapperClasses = twMerge(
    clsx(
      wrapperBaseClasses,
      page > 1 && page < total && 'justify-between',
      page === 1 && 'justify-end'
    )
  )

  const linkClasses =
    'flex items-center bg-main px-4 py-4 rounded text-white hover:opacity-80 sm:py-2'

  return (
    <div className={wrapperClasses}>
      {page > 1 ? (
        <Link
          href={basePath + (page > 2 ? `/page/${page - 1}` : '/')}
          className={linkClasses}
          aria-label={t('prevPage')}
        >
          <FaChevronLeft className="sm:mr-2" />{' '}
          <span className="hidden sm:block">{t('prevPage')}</span>
        </Link>
      ) : null}

      {page < total ? (
        <Link
          href={`${basePath}/page/${page + 1}`}
          className={linkClasses}
          aria-label={t('nextPage')}
        >
          <span className="hidden sm:block">{t('nextPage')}</span>{' '}
          <FaChevronRight className="sm:ml-2" />
        </Link>
      ) : null}
    </div>
  )
}
