const assertMeta = (property: string, content: string) => {
  cy.get(`head meta[property="${property}"]`).should(
    'have.attr',
    'content',
    content
  )
}

const assertHeadLink = (rel: string, href: string, sizes?: string) => {
  const selector = sizes
    ? `head link[rel="${rel}"][sizes="${sizes}"]`
    : `head link[rel="${rel}"]`
  cy.get(selector).should('have.attr', 'href', href)
}

describe('Home page', () => {
  it('renders the list of posts', () => {
    cy.visit('/')
    cy.findByTestId('main-layout').should('exist')
    cy.findByTestId('featured-posts').should('exist')
    cy.findByTestId('older-posts').should('exist')
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
    assertMeta('og:locale', 'pt-BR')
    assertMeta(
      'og:title',
      'Web Dev Drops | Desenvolvimento Web - Artigos, Tutoriais, Dicas'
    )
    assertMeta(
      'og:description',
      'Desenvolvimento Web - Artigos, Tutoriais, Dicas'
    )
    assertMeta('og:site_name', 'Web Dev Drops')
    assertMeta(
      'og:image',
      `${Cypress.config('baseUrl')}/images/webdevdrops-logo-500.png`
    )
    cy.get('head meta[name="twitter:card"]').should(
      'have.attr',
      'content',
      'summary'
    )
    assertHeadLink('icon', '/images/cropped-logo-wdd-transp-32x32.png', '32x32')
    assertHeadLink(
      'icon',
      '/images/cropped-logo-wdd-transp-192x192.png',
      '192x192'
    )
    assertHeadLink(
      'apple-touch-icon',
      '/images/cropped-logo-wdd-transp-180x180.png'
    )
    assertHeadLink(
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
    assertMeta('og:locale', 'en')
    assertMeta(
      'og:title',
      'Web Dev Drops | Web Development - Articles, Tutorials, Tips'
    )
    assertMeta('og:description', 'Web Development - Articles, Tutorials, Tips')
  })
})
