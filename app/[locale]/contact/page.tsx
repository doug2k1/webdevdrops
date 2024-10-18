import { ContactForm } from '@/components/ContactForm'
import { ContactFormSubmitButton } from '@/components/ContactFormSubmitButton'
import { FormInput } from '@/components/FormInput'
import { FormLabel } from '@/components/FormLabel'
import { defaultAppIcons } from '@/libs/consts'
import { i18nConfig } from '@/libs/i18n/config'
import { LocaleType } from '@/libs/i18n/types'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { FaEnvelope } from 'react-icons/fa'

interface Props {
  params: { locale: LocaleType }
}

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale })
  const title = `${t('contact')} | Web Dev Drops`

  return {
    title,
    icons: defaultAppIcons,
  }
}

export default function ContactPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)
  const t = useTranslations()

  return (
    <div className="dark:text-gray-300">
      <h1 className="mb-8 text-4xl font-extrabold">
        <FaEnvelope className="inline text-2xl text-gray-500" /> {t('contact')}
      </h1>

      <p className="mb-4">{t('contactIntro')}</p>

      <ContactForm
        successMessage={t('contactSuccess')}
        failureMessage={t('contactError')}
        sendingMessage={t('contactSending')}
        sendMessage={t('contactSend')}
        SubmitButton={ContactFormSubmitButton}
      >
        <FormLabel id="inputName" label={`${t('contactName')}:`} />
        <FormInput id="inputName" name="name" type="text" />

        <FormLabel id="inputEmail" label={`${t('contactEmail')}:`} />
        <FormInput id="inputEmail" name="email" type="email" />

        <FormLabel id="inputMessage" label={`${t('contactMessage')}:`} />
        <FormInput id="inputMessage" name="message" type="textarea" />
      </ContactForm>
    </div>
  )
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({
    locale,
  }))
}
