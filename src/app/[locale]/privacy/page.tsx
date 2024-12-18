import { i18nConfig } from '@/libs/i18n/config'
import { LocaleType } from '@/libs/i18n/types'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ReactNode } from 'react'

interface Props {
  params: Promise<{ locale: LocaleType }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params

  const t = await getTranslations({ locale })

  return {
    title: t('privacyPolicy'),
  }
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params

  setRequestLocale(locale)
  const t = await getTranslations({ locale })

  const text = content[locale || 'pt-BR']

  return (
    <article className="prose dark:prose-dark">
      <h1>{t('privacyPolicy')}</h1>

      {text}
    </article>
  )
}

const content: Record<string, ReactNode> = {}

content['pt-BR'] = (
  <>
    <p>Web Dev Drops é comprometido em proteger sua privacidade.</p>
    <p>
      Esta Política de Privacidade descreve as práticas adotadas pelo site Web
      Dev Drops (“Site”), localizado em www.webdevdrops.com.
    </p>
    <p>
      Todas as suas informações pessoais recolhidas, serão usadas para o ajudar
      a tornar a sua visita no nosso site o mais produtiva e agradável possível.
    </p>
    <p>
      A garantia da confidencialidade dos dados pessoais dos utilizadores do
      nosso site é importante para o Web Dev Drops.
    </p>
    <p>
      Todas as informações pessoais relativas a membros, assinantes, clientes ou
      visitantes que usem o Web Dev Drops serão tratadas em concordância com a
      Lei da Proteção de Dados Pessoais de 26 de outubro de 1998 (Lei n.º
      67/98).
    </p>
    <p>
      O uso do Web Dev Drops pressupõe a aceitação deste Acordo de Privacidade.
      A equipa do Web Dev Drops reserva-se ao direito de alterar este acordo sem
      aviso prévio. Deste modo, recomendamos que consulte a nossa política de
      privacidade com regularidade de forma a estar sempre atualizado.
    </p>
    <h2>Informações Coletadas</h2>
    <p>
      Nós podemos coletar as seguintes informações quando você se registra como
      usuário deste Site:
    </p>
    <p>
      Nome e sobrenome Endereço de e-mail Uso das Informações Coletadas Qualquer
      informação fornecida pelo usuário é usada para prover um serviço melhor.
      Nenhuma informação é vendida ou fornecida a terceiros. Nós podemos usar
      suas informações da seguinte maneira:
    </p>
    <p>
      Enviar e-mails informativos sobre os serviços do Web Dev Drops (em média 1
      e-mail por semana) Personalizar seu acesso ao Site, através de área
      exclusiva para usuários registrados
    </p>
    <h2>Segurança da Informação Coletada</h2>
    <p>
      Visando proteger todas as informações pessoas que coletamos, dispomos de
      medidas de segurança eletrônicas e gerenciais.
    </p>
    <h2>Uso de Cookies</h2>
    <p>
      Um cookie é um arquivo armazenado em seu computador, com sua permissão,
      usado para identificar você como usuário do Site. O cookie não revela
      nenhuma informação pessoal nem compromete seu computador.
    </p>
    <p>
      Você pode escolher desabilitar o uso de cookies nas preferências de seu
      navegador. Advertimos que com esta opção desabilitada, sua correta
      utilização do Site pode ficar comprometida.
    </p>
    <h2>Os Anúncios</h2>
    <p>
      Tal como outros websites, coletamos e utilizamos informação contida nos
      anúncios. A informação contida nos anúncios, inclui o seu endereço IP
      (Internet Protocol), o seu ISP (Internet Service Provider, como o Sapo,
      Clix, ou outro), o browser que utilizou ao visitar o nosso website (como o
      Internet Explorer ou o Firefox), o tempo da sua visita e que páginas
      visitou dentro do nosso website.
    </p>
    <h3>Cookie DoubleClick do Google</h3>
    <p>
      Terceiros, incluindo o Google, usam cookies para veicular anúncios com
      base em visitas anteriores do usuário a seu website.
    </p>
    <p>
      O uso do cookie da DoubleClick pelo Google permite que ele e seus
      parceiros veiculem anúncios para seus usuários com base na visita dos
      usuários a seus sites e/ou a outros sites na Internet.
    </p>
    <p>
      Os usuários podem desativar o uso do cookie do DoubleClick para
      publicidade com base em interesses acessando o&nbsp;
      <a
        href="https://www.google.com/ads/preferences/"
        target="_blank"
        rel="noreferrer noopener"
      >
        Gerenciador de preferências de anúncios
      </a>
      . Opcionalmente, você pode desativar o uso de cookies de terceiros para
      publicidade com base em interesses acessando&nbsp;
      <a
        href="http://www.aboutads.info/"
        target="_blank"
        rel="noreferrer noopener"
      >
        aboutads.info
      </a>
      .
    </p>
    <h3>Os Cookies e Web Beacons</h3>
    <p>
      Utilizamos cookies para armazenar informação, tais como as suas
      preferências pessoas quando visita o nosso website. Isto poderá incluir um
      simples popup, ou uma ligação em vários serviços que providenciamos, tais
      como fóruns.
    </p>
    <p>
      Em adição também utilizamos publicidade de terceiros no nosso website para
      suportar os custos de manutenção. Alguns destes publicitários, poderão
      utilizar tecnologias como os cookies e/ou web beacons quando publicitam no
      nosso website, o que fará com que esses publicitários (como o Google
      através do Google AdSense) também recebam a sua informação pessoal, como o
      endereço IP, o seu ISP, o seu browser, etc. Esta função é geralmente
      utilizada para geotargeting (mostrar publicidade de Lisboa apenas aos
      leitores oriundos de Lisboa por ex.) ou apresentar publicidade direcionada
      a um tipo de utilizador (como mostrar publicidade de restaurante a um
      utilizador que visita sites de culinária regularmente, por ex.).
    </p>
    <p>
      Você detém o poder de desligar os seus cookies, nas opções do seu browser,
      ou efetuando alterações nas ferramentas de programas Anti-Virus, como o
      Norton Internet Security. No entanto, isso poderá alterar a forma como
      interage com o nosso website, ou outros websites. Isso poderá afetar ou
      não permitir que faça logins em programas, sites ou fóruns da nossa e de
      outras redes.
    </p>
    <h2>Ligações a Sites de terceiros</h2>
    <p>
      O Web Dev Drops possui ligações para outros sites, os quais, a nosso ver,
      podem conter informações / ferramentas úteis para os nossos visitantes. A
      nossa política de privacidade não é aplicada a sites de terceiros, pelo
      que, caso visite outro site a partir do nosso deverá ler a politica de
      privacidade do mesmo.
    </p>
    <p>
      Não nos responsabilizamos pela política de privacidade ou conteúdo
      presente nesses mesmos sites.
    </p>
    <p>
      Última Atualização: Este documento foi atualizado em 02 de Agosto de 2019.
    </p>
  </>
)

content['en'] = (
  <>
    <p>
      At Web Dev Drops, accessible from https://www.webdevdrops.com/, one of our
      main priorities is the privacy of our visitors. This Privacy Policy
      document contains types of information that is collected and recorded by
      Web Dev Drops and how we use it.
    </p>

    <p>
      If you have additional questions or require more information about our
      Privacy Policy, do not hesitate to contact us.
    </p>

    <p>
      This Privacy Policy applies only to our online activities and is valid for
      visitors to our website with regards to the information that they shared
      and/or collect in Web Dev Drops. This policy is not applicable to any
      information collected offline or via channels other than this website.
    </p>

    <h2>Consent</h2>

    <p>
      By using our website, you hereby consent to our Privacy Policy and agree
      to its terms.
    </p>

    <h2>Information we collect</h2>

    <p>
      The personal information that you are asked to provide, and the reasons
      why you are asked to provide it, will be made clear to you at the point we
      ask you to provide your personal information.
    </p>

    <p>
      If you contact us directly, we may receive additional information about
      you such as your name, email address, phone number, the contents of the
      message and/or attachments you may send us, and any other information you
      may choose to provide.
    </p>

    <p>
      When you register for an Account, we may ask for your contact information,
      including items such as name, company name, address, email address, and
      telephone number.
    </p>

    <h2>How we use your information</h2>

    <p>We use the information we collect in various ways, including to:</p>

    <ul>
      <li>Provide, operate, and maintain our website</li>
      <li>Improve, personalize, and expand our website</li>
      <li>Understand and analyze how you use our website</li>
      <li>Develop new products, services, features, and functionality</li>
      <li>
        Communicate with you, either directly or through one of our partners,
        including for customer service, to provide you with updates and other
        information relating to the website, and for marketing and promotional
        purposes
      </li>
      <li>Send you emails</li>
      <li>Find and prevent fraud</li>
    </ul>

    <h2>Log Files</h2>

    <p>
      Web Dev Drops follows a standard procedure of using log files. These files
      log visitors when they visit websites. All hosting companies do this and a
      part of hosting services&apos; analytics. The information collected by log
      files include internet protocol (IP) addresses, browser type, Internet
      Service Provider (ISP), date and time stamp, referring/exit pages, and
      possibly the number of clicks. These are not linked to any information
      that is personally identifiable. The purpose of the information is for
      analyzing trends, administering the site, tracking users&apos; movement on
      the website, and gathering demographic information. Our Privacy Policy was
      created with the help of the Privacy Policy Generator and the Privacy
      Policy Template.
    </p>

    <h2>Cookies and Web Beacons</h2>

    <p>
      Like any other website, Web Dev Drops uses &apos;cookies&apos;. These
      cookies are used to store information including visitors&apos;
      preferences, and the pages on the website that the visitor accessed or
      visited. The information is used to optimize the users&apos; experience by
      customizing our web page content based on visitors&apos; browser type
      and/or other information.
    </p>

    <p>
      For more general information on cookies, please read &quot;What Are
      Cookies&quot;.
    </p>

    <h2>Google DoubleClick DART Cookie</h2>

    <p>
      Google is one of a third-party vendor on our site. It also uses cookies,
      known as DART cookies, to serve ads to our site visitors based upon their
      visit to www.website.com and other sites on the internet. However,
      visitors may choose to decline the use of DART cookies by visiting the
      Google ad and content network Privacy Policy at the following URL –{' '}
      <a
        href="https://policies.google.com/technologies/ads"
        target="_blank"
        rel="noreferrer noopener"
      >
        https://policies.google.com/technologies/ads
      </a>
    </p>

    <h2>Our Advertising Partners</h2>

    <p>
      Some of advertisers on our site may use cookies and web beacons. Our
      advertising partners are listed below. Each of our advertising partners
      has their own Privacy Policy for their policies on user data. For easier
      access, we hyperlinked to their Privacy Policies below.
    </p>

    <p>Google</p>

    <p>
      <a
        href="https://policies.google.com/technologies/ads"
        target="_blank"
        rel="noreferrer noopener"
      >
        https://policies.google.com/technologies/ads
      </a>
    </p>

    <h2>Advertising Partners Privacy Policies</h2>

    <p>
      You may consult this list to find the Privacy Policy for each of the
      advertising partners of Web Dev Drops.
    </p>

    <p>
      Third-party ad servers or ad networks uses technologies like cookies,
      JavaScript, or Web Beacons that are used in their respective
      advertisements and links that appear on Web Dev Drops, which are sent
      directly to users&apos; browser. They automatically receive your IP
      address when this occurs. These technologies are used to measure the
      effectiveness of their advertising campaigns and/or to personalize the
      advertising content that you see on websites that you visit.
    </p>

    <p>
      Note that Web Dev Drops has no access to or control over these cookies
      that are used by third-party advertisers.
    </p>

    <h2>Third Party Privacy Policies</h2>

    <p>
      Web Dev Drops&apos;s Privacy Policy does not apply to other advertisers or
      websites. Thus, we are advising you to consult the respective Privacy
      Policies of these third-party ad servers for more detailed information. It
      may include their practices and instructions about how to opt-out of
      certain options. You may find a complete list of these Privacy Policies
      and their links here: Privacy Policy Links.
    </p>

    <p>
      You can choose to disable cookies through your individual browser options.
      To know more detailed information about cookie management with specific
      web browsers, it can be found at the browsers&apos; respective websites.
      What Are Cookies?
    </p>

    <h2>CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>

    <p>
      Under the CCPA, among other rights, California consumers have the right
      to:
    </p>

    <p>
      Request that a business that collects a consumer&apos;s personal data
      disclose the categories and specific pieces of personal data that a
      business has collected about consumers.
    </p>

    <p>
      Request that a business delete any personal data about the consumer that a
      business has collected.
    </p>

    <p>
      Request that a business that sells a consumer&apos;s personal data, not
      sell the consumer&apos;s personal data.
    </p>

    <p>
      If you make a request, we have one month to respond to you. If you would
      like to exercise any of these rights, please contact us.
    </p>

    <h2>GDPR Data Protection Rights</h2>

    <p>
      We would like to make sure you are fully aware of all of your data
      protection rights. Every user is entitled to the following:
    </p>

    <p>
      The right to access – You have the right to request copies of your
      personal data. We may charge you a small fee for this service.
    </p>

    <p>
      The right to rectification – You have the right to request that we correct
      any information you believe is inaccurate. You also have the right to
      request that we complete the information you believe is incomplete.
    </p>

    <p>
      The right to erasure – You have the right to request that we erase your
      personal data, under certain conditions.
    </p>

    <p>
      The right to restrict processing – You have the right to request that we
      restrict the processing of your personal data, under certain conditions.
    </p>

    <p>
      The right to object to processing – You have the right to object to our
      processing of your personal data, under certain conditions.
    </p>

    <p>
      The right to data portability – You have the right to request that we
      transfer the data that we have collected to another organization, or
      directly to you, under certain conditions.
    </p>

    <p>
      If you make a request, we have one month to respond to you. If you would
      like to exercise any of these rights, please contact us.
    </p>

    <h2>Children&apos;s Information</h2>

    <p>
      Another part of our priority is adding protection for children while using
      the internet. We encourage parents and guardians to observe, participate
      in, and/or monitor and guide their online activity.
    </p>

    <p>
      Web Dev Drops does not knowingly collect any Personal Identifiable
      Information from children under the age of 13. If you think that your
      child provided this kind of information on our website, we strongly
      encourage you to contact us immediately and we will do our best efforts to
      promptly remove such information from our records.
    </p>
  </>
)

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({
    locale,
  }))
}
