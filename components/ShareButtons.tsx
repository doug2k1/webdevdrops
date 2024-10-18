import { useTranslations } from 'next-intl'
import { ComponentType } from 'react'
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTelegramPlane,
  FaWhatsapp,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

interface Props {
  title: string
  url: string
}

export function ShareButtons({ title, url }: Props) {
  const t = useTranslations()
  const encodedTitle = encodeURIComponent(title)

  return (
    <section className="text-center" data-testid="post-share-buttons">
      <div className="flex flex-wrap items-center">
        <p className="mr-2 font-bold text-gray-500 dark:text-gray-400">
          {t('share')}
        </p>
        <ShareButton
          name="X"
          color="#1EA1F3"
          url={`https://x.com/share?text=${encodedTitle}%20%7C%20%40webdevdrops&url=${url}`}
          Icon={FaXTwitter}
        />
        <ShareButton
          name="Facebook"
          color="#3B5998"
          url={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          Icon={FaFacebookF}
        />
        <ShareButton
          name="LinkedIn"
          color="#0177B5"
          url={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodedTitle}`}
          Icon={FaLinkedinIn}
        />
        <ShareButton
          name="Telegram"
          color="#32afed"
          url={`https://t.me/share/url?url=${url}&text=${encodedTitle}`}
          Icon={FaTelegramPlane}
        />
        <ShareButton
          name="WhatsApp"
          color="#0DC143"
          url={`https://api.whatsapp.com/send?text=${url}`}
          Icon={FaWhatsapp}
        />
      </div>
    </section>
  )
}

interface ShareButtonProps {
  name: string
  color: string
  url: string
  Icon: ComponentType<{ className: string }>
}

function ShareButton({ name, color, url, Icon }: ShareButtonProps) {
  return (
    <a
      className="mx-2 rounded p-2 hover:opacity-80"
      style={{ backgroundColor: color }}
      href={url}
      title={name}
      target="_blank"
      rel="noreferrer"
    >
      <Icon className="text-2xl text-white" />
    </a>
  )
}
