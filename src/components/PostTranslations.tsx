import React from "react"
import { Link, useTranslation } from "gatsby-plugin-react-i18next"

interface Props {
  translations: {
    slug: string
    language: {
      slug: string
    }
  }[]
}

export default function PostTranslations({ translations }: Props) {
  const { t } = useTranslation()

  return (
    <div>
      {translations.map((translation) => {
        return (
          <Link
            to={`/${translation.slug}`}
            key={translation.language.slug}
            language={translation.language.slug}
          >
            {t(`readIn.${translation.language.slug}`)}
          </Link>
        )
      })}
    </div>
  )
}
