describe('Home page', () => {
  it('renders the list of posts', () => {
    cy.visit('/')
    cy.findByTestId('main-layout').should('exist')
    cy.findByTestId('featured-posts').should('exist')
    cy.findByTestId('older-posts').should('exist')
  })
})
