// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//! ******  CUSTOM COMMANDS ******
Cypress.Commands.add('startComecar', (fullName = '', email = '') => {
  cy.visit('/'); // Given the user accesses this link
  cy.get('a[href = "pre-cadastro"]').click(); // When the user clicks on the "Começar" button
  cy.get('form h2').should('have.text', 'Seus dados'); // Then the user should see the "Seus dados" form
  cy.get('#fullname').as('fullName'); // And fill out the "name" and "email" fields
  cy.get('#email').as('email'); // And fill out the "name" and "email" fields
  if (fullName) {
    cy.get('@fullName').type(fullName);
  }
  if (email) {
    cy.get('@email').type(email);
  }
  cy.get('button[type="submit"]').should('have.text', 'Continuar').click(); // And click on the "Continuar" button
});
// ---------------------------------------
Cypress.Commands.add('verifyDataHeader', (firstName, email) => {
  cy.get('.user-name') // Then the user should see the "Olá, 'firstName'" text in the header of the page
    .should('be.visible') // And the "Olá, 'firstName'" text should be visible
    .and('have.text', 'Olá, ' + firstName); // And the 'Olá, 'firstName'', should be visible
  cy.get('.user-email').should('be.visible').and('have.text', email); // And the "e-mail" should be visible')
});
// ------------------------------------------------------------
Cypress.Commands.add('NameEmailAlertMsg', (field, text) => {
  cy.contains('label', field) // Then the user should see the alert-msg .
    .parent() // Then the user should see the alert-msg "O campo nome é obrigatório."
    .find('.alert-msg') // Then the user should see the alert-msg "O campo nome é obrigatório."
    .should('be.visible') // Then the user should see the alert-msg "O campo nome é obrigatório."
    .and('have.text', text); // Then the user should see the alert-msg .
});
// -------------------------------------------------------------
//! ***** ALLOW CYPRESS RUN THE TESTS EVEN WITH ERROR *****
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

//! ***** TEST COUNTER *****
// Initialize a global counter for describe blocks
let globalDescribeCounter = 0;
/**
 * Custom function to create a numbered `describe` block.
 * Automatically enumerates `describe` and nested `it` blocks.
 * @param {string} description - The description for the `describe` block.
 * @param {function} callback - A callback function containing the `it` blocks.
 */
const customDescribeNumbered = (description, callback) => {
  // Increment the global describe counter for each new block
  const currentDescribeCounter = ++globalDescribeCounter;
  // Initialize an it-block counter specific to this describe block
  let localItCounter = 0;
  /**
   * Custom function to create a numbered `it` block within the describe block.
   * @param {string} itDescription - The description for the `it` block.
   * @param {function} itCallback - The callback function for the test.
   */
  const itWithNumbering = (itDescription, itCallback) => {
    // Increment the it-block counter for each new `it`
    localItCounter++;
    const numberedItDescription = `${currentDescribeCounter}.${localItCounter} ${itDescription}`;
    it(numberedItDescription, itCallback);
  };
  // Add numbering to the `describe` block
  const numberedDescription = `${currentDescribeCounter}. ${description}`;
  // Execute the `describe` block with the numbered description
  describe(numberedDescription, () => {
    callback(itWithNumbering);
  });
};
// Export the custom describeNumbering function for use in tests
export { customDescribeNumbered };
// ! ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
