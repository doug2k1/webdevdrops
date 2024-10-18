describe('Tag page', () => {
  it('renders a tag page in pt-BR', () => {
    cy.visit('/tags/nodejs')

    cy.get('h1').contains('Tag: nodejs')
    cy.findByTestId('main-layout').should('exist')
    cy.findByTestId('featured-posts').should('exist')
    cy.findByTestId('older-posts').should('exist')
  })

  it('renders a tag page in en', () => {
    cy.visit('/en/tags/nodejs')

    cy.get('h1').contains('Tag: nodejs')
    cy.findByTestId('main-layout').should('exist')
    cy.findByTestId('featured-posts').should('exist')
    cy.findByTestId('older-posts').should('exist')
  })

  it('renders a tag page with pagination', () => {
    cy.visit('/tags/nodejs')
    cy.findByText(/próxima página/i).click()

    cy.url().should('equal', `${Cypress.config('baseUrl')}/tags/nodejs/page/2`)
    cy.findByTestId('main-layout').should('exist')
    cy.findByTestId('older-posts').should('exist')

    cy.findByText(/página anterior/i).click()

    cy.url().should('equal', `${Cypress.config('baseUrl')}/tags/nodejs`)
  })
})
