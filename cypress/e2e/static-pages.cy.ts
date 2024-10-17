describe('Static pages', () => {
  it('renders the Privacy Policy page', () => {
    cy.visit('/privacy')
    cy.get('h1').contains('Política de Privacidade')

    cy.visit('/en/privacy')
    cy.get('h1').contains('Privacy Policy')
  })
})
