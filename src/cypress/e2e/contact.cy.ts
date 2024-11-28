describe('Contact page', () => {
  it('allows sending a contact message', () => {
    cy.intercept('POST', '/contact', {
      headers: {
        'content-type': 'text/x-component',
      },
      body: `0:{"a":"$@1","f":"","b":"development"}\n1:{"status":"SUCCESS"}\n`,
    }).as('contact')

    cy.visit('/contact')
    cy.findByLabelText(/seu nome/i).type('Test Name')
    cy.findByLabelText(/seu e-mail/i).type('test@example.com')
    cy.findByLabelText(/mensagem/i).type('Test message')
    cy.findByRole('button', { name: /enviar/i }).click()

    cy.wait('@contact')
      .its('request.body')
      .should('contain', 'name="1_name"\r\n\r\nTest Name')
      .should('contain', 'name="1_email"\r\n\r\ntest@example.com')
      .should('contain', 'name="1_message"\r\n\r\nTest message')

    cy.findByText(/mensagem enviada com sucesso/i).should('exist')
  })
})
