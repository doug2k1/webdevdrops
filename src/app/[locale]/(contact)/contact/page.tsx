import { FormInput } from '@/components/FormInput'
import { FormLabel } from '@/components/FormLabel'
import { ReCaptchaProvider } from '@/components/ReCaptchaProvider'
import { defaultAppIcons } from '@/consts/icons'
import { i18nConfig } from '@/libs/i18n/config'
import { LocaleType } from '@/libs/i18n/types'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { use } from 'react'
import { FaEnvelope } from 'react-icons/fa'
import { ContactForm } from '../_components/ContactForm'
import { ContactFormSubmitButton } from '../_components/ContactFormSubmitButton'

interface Props {
  params: Promise<{ locale: LocaleType }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params

  const t = await getTranslations({ locale })
  const title = `${t('contact')} | Web Dev Drops`

  return {
    title,
    icons: defaultAppIcons,
  }
}

export default function ContactPage({ params }: Props) {
  const { locale } = use(params)

  setRequestLocale(locale)
  const t = useTranslations()

  return (
    <div className="dark:text-gray-300">
      <h1 className="mb-8 text-4xl font-extrabold">
        <FaEnvelope className="inline text-2xl text-gray-500" /> {t('contact')}
      </h1>

      <p className="mb-4">{t('contactIntro')}</p>

      <ReCaptchaProvider>
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
      </ReCaptchaProvider>
    </div>
  )
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({
    locale,
  }))
}
