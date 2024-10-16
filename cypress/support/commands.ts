/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import '@testing-library/cypress/add-commands'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      assertMeta(property: string, content: string): Chainable<void>
      assertHeadLink(rel: string, href: string, sizes?: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('assertMeta', (property: string, content: string) => {
  cy.get(`head meta[property="${property}"]`).should(
    'have.attr',
    'content',
    content
  )
})

Cypress.Commands.add(
  'assertHeadLink',
  (rel: string, href: string, sizes?: string) => {
    const selector = sizes
      ? `head link[rel="${rel}"][sizes="${sizes}"]`
      : `head link[rel="${rel}"]`
    cy.get(selector).should('have.attr', 'href', href)
  }
)
