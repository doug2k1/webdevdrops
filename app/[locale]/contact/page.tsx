import { ContactForm } from '@/components/ContactForm'
import i18nConfig from '@/i18nConfig'
import { defaultAppIcons } from '@/libs/consts'
import { getIntl, LocaleType } from '@/libs/i18n'
import { FaEnvelope } from 'react-icons/fa'

interface Props {
  params: { locale: LocaleType }
}

export async function generateMetadata({ params: { locale } }: Props) {
  const intl = await getIntl(locale)
  const title = `${intl.formatMessage({ id: 'contact' })} | Web Dev Drops`

  return {
    title,
    icons: defaultAppIcons,
  }
}

export default async function ContactPage({ params: { locale } }: Props) {
  const intl = await getIntl(locale)

  return (
    <div className="dark:text-gray-300">
      <h1 className="mb-8 text-4xl font-extrabold">
        <FaEnvelope className="inline text-2xl text-gray-500" />{' '}
        {intl.formatMessage({ id: 'contact' })}
      </h1>

      <p className="mb-4">{intl.formatMessage({ id: 'contactIntro' })}</p>

      <ContactForm />
    </div>
  )
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({
    locale,
  }))
}
