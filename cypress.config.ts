import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'src/cypress/support/e2e.ts',
    specPattern: 'src/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
  screenshotOnRunFailure: false,
})
