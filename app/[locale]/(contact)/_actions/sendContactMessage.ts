'use server'

import { ContactFormState } from '@/types/contact'
import { SendEmailCommandInput, SES } from '@aws-sdk/client-ses'

const SESInstance = new SES({
  credentials: {
    accessKeyId: process.env.SES_ID || '',
    secretAccessKey: process.env.SES_KEY || '',
  },
  region: 'us-east-1',
})

export const sendContactMessage = async (
  prevState: ContactFormState,
  formData: FormData,
  reCaptchaToken: string
): Promise<ContactFormState> => {
  if (!validateCaptcha(reCaptchaToken)) {
    return {
      status: 'ERROR',
    }
  }

  const to = process.env.CONTACT_TO
  const from = process.env.CONTACT_FROM

  if (!to || !from) {
    throw new Error('Missing contact env values')
  }

  const params: SendEmailCommandInput = {
    Destination: {
      ToAddresses: [to!],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: formData.get('message') as string,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Contato Web Dev Drops',
      },
    },
    Source: from!,
    ReplyToAddresses: [`${formData.get('name')}<${formData.get('email')}>`],
  }

  try {
    await SESInstance.sendEmail(params)

    return {
      status: 'SUCCESS',
    }
  } catch (error) {
    console.error(error)

    return {
      status: 'ERROR',
    }
  }
}

const validateCaptcha = async (reCaptchaToken: string) => {
  if (!reCaptchaToken) {
    return false
  }

  try {
    if (!process.env.RECAPTCHA_SECRET_KEY) {
      throw new Error('Missing ReCaptcha secret key')
    }

    const captchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${encodeURIComponent(
          process.env.RECAPTCHA_SECRET_KEY
        )}&response=${encodeURIComponent(reCaptchaToken)}`,
      }
    )

    const captchaJson = await captchaResponse.json()

    if (!captchaJson.success || !captchaJson.score || captchaJson.score < 0.5) {
      return false
    }
  } catch (error) {
    console.error(error)

    return false
  }

  return true
}
