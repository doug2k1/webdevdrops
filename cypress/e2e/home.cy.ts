describe('Home page', () => {
  it('renders the list of posts', () => {
    cy.visit('/')

    cy.findByTestId('main-layout').should('exist')
    cy.findByTestId('featured-posts').should('exist')
    cy.findByTestId('older-posts').should('exist')
  })

  it('renders second page of posts', () => {
    cy.visit('/')
    cy.findByText(/próxima página/i).click()

    cy.url().should('equal', `${Cypress.config('baseUrl')}/page/2`)
    cy.findByTestId('main-layout').should('exist')
    cy.findByTestId('older-posts').should('exist')

    cy.findByText(/página anterior/i).click()

    cy.url().should('equal', `${Cypress.config('baseUrl')}/`)
  })

  it('renders page metadata in pt-BR', () => {
    cy.visit('/')
    cy.title().should(
      'eq',
      'Web Dev Drops | Desenvolvimento Web - Artigos, Tutoriais, Dicas'
    )
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Desenvolvimento Web - Artigos, Tutoriais, Dicas'
    )
    cy.assertMeta('og:locale', 'pt-BR')
    cy.assertMeta(
      'og:title',
      'Web Dev Drops | Desenvolvimento Web - Artigos, Tutoriais, Dicas'
    )
    cy.assertMeta(
      'og:description',
      'Desenvolvimento Web - Artigos, Tutoriais, Dicas'
    )
    cy.assertMeta('og:site_name', 'Web Dev Drops')
    cy.assertMeta(
      'og:image',
      'https://www.webdevdrops.com/images/webdevdrops-logo-500.png'
    )
    cy.get('head meta[name="twitter:card"]').should(
      'have.attr',
      'content',
      'summary'
    )
    cy.assertHeadLink(
      'icon',
      '/images/cropped-logo-wdd-transp-32x32.png',
      '32x32'
    )
    cy.assertHeadLink(
      'icon',
      '/images/cropped-logo-wdd-transp-192x192.png',
      '192x192'
    )
    cy.assertHeadLink(
      'apple-touch-icon',
      '/images/cropped-logo-wdd-transp-180x180.png'
    )
    cy.assertHeadLink(
      'msapplication-TileImage',
      '/images/cropped-logo-wdd-transp-270x270.png'
    )
  })

  it('renders page metadata in en', () => {
    cy.visit('/en')
    cy.title().should(
      'eq',
      'Web Dev Drops | Web Development - Articles, Tutorials, Tips'
    )
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Web Development - Articles, Tutorials, Tips'
    )
    cy.assertMeta('og:locale', 'en')
    cy.assertMeta(
      'og:title',
      'Web Dev Drops | Web Development - Articles, Tutorials, Tips'
    )
    cy.assertMeta(
      'og:description',
      'Web Development - Articles, Tutorials, Tips'
    )
  })

  it('renders correct links in pt-BR', () => {
    cy.visit('/')

    cy.findByTestId('logo-link').should('have.attr', 'href', '/')
    cy.findAllByTestId('nav-home').first().should('have.attr', 'href', '/')
    cy.findAllByTestId('nav-contact')
      .first()
      .should('have.attr', 'href', '/contact')
    cy.findByTestId('footer-contact').should('have.attr', 'href', '/contact')
    cy.findByTestId('footer-privacyPolicy').should(
      'have.attr',
      'href',
      '/privacy'
    )
    cy.findByTestId('lang-selector-ptbr').should('have.attr', 'href', '/')
    cy.findByTestId('lang-selector-en').should('have.attr', 'href', '/en')
  })

  it('renders correct links in en', () => {
    cy.visit('/en')

    cy.findByTestId('logo-link').should('have.attr', 'href', '/en')
    cy.findAllByTestId('nav-home').first().should('have.attr', 'href', '/en')
    cy.findAllByTestId('nav-contact')
      .first()
      .should('have.attr', 'href', '/en/contact')
    cy.findByTestId('footer-contact').should('have.attr', 'href', '/en/contact')
    cy.findByTestId('footer-privacyPolicy').should(
      'have.attr',
      'href',
      '/en/privacy'
    )
    cy.findByTestId('lang-selector-ptbr').should('have.attr', 'href', '/')
    cy.findByTestId('lang-selector-en').should('have.attr', 'href', '/en')
  })
})
