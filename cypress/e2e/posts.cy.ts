describe('Post page', () => {
  it('renders the post content', () => {
    cy.visit('/node-js-enviando-emails-amazon-ses/')

    cy.get('h1').contains('Node.js: Enviando E-mails com Amazon SES')
    cy.findByTestId('post-info').contains('Douglas Matoso')
    cy.findByTestId('post-info').contains('Atualizado em 14/01/2021')
    cy.findByTestId('post-info').contains('Leitura: 5 min.')
    cy.findByText(/Como enviar e-mails/).should('exist')
    cy.findByTestId('post-tags').contains('Tags: aws|nodejs')
  })

  it('renders post metadata', () => {
    cy.visit('/node-js-enviando-emails-amazon-ses/')

    cy.title().should(
      'eq',
      'Node.js: Enviando E-mails com Amazon SES | Web Dev Drops'
    )
    cy.assertMeta('og:type', 'article')
    cy.assertMeta(
      'og:url',
      'https://www.webdevdrops.com/node-js-enviando-emails-amazon-ses/'
    )
    cy.assertMeta(
      'og:image',
      'https://www.webdevdrops.com/node-js-enviando-emails-amazon-ses/images/nodejs-email-amazon-ses.jpg'
    )
    cy.assertMeta('og:image:width', '1280')
    cy.assertMeta('og:image:height', '720')
  })

  it('renders multi-language posts', () => {
    cy.visit('/como-acessar-camera-com-javascript/')
    cy.findByText(/Read in English/).click()

    cy.url().should(
      'eq',
      `${Cypress.config(
        'baseUrl'
      )}/en/how-to-access-device-cameras-with-javascript`
    )
    cy.title().should(
      'eq',
      'How to Access Device Cameras with JavaScript (Front and Rear) | Web Dev Drops'
    )
    cy.findByTestId('post-info').contains('Updated at 5/30/2020')
    cy.findByTestId('post-info').contains('Reading time: 4 min.')

    cy.findByText(/Leia em Português/).click()

    cy.url().should(
      'eq',
      `${Cypress.config('baseUrl')}/como-acessar-camera-com-javascript`
    )
  })
})
