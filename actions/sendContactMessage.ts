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
  formData: FormData
): Promise<ContactFormState> => {
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
  } catch {
    return {
      status: 'ERROR',
    }
  }
}
