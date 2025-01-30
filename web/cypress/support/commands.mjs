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
// * This command register the user by clicking on the "Começar" button.
Cypress.Commands.add('preCadastroComecar', (user) => {
  cy.visit('/'); // Given the user accesses this link
  cy.get('a[href = "pre-cadastro"]').click(); // When the user clicks on the "Começar" button
  cy.get('form h2').should('have.text', 'Seus dados'); // Then the user should see the "Seus dados" form
  cy.get('#fullname').as('fullname'); // And fill out the "name" and "email" fields
  cy.get('#email').as('email'); // And fill out the "email" field
  if (user?.fullname) {
    cy.get('@fullname').type(user.fullname);
  }
  if (user?.email) {
    cy.get('@email').type(user.email);
  }
  cy.get('button[type="submit"]').should('have.text', 'Continuar').click(); // And click on the "Continuar" button
});
// ---------------------------------------
// * This command register the user by clicking on the "Agendar um horário" button
Cypress.Commands.add('preCadastroAgendar', (user) => {
  cy.visit('/'); // Given the user accesses this link
  cy.get('a[href = "/agendamento"]').click(); // When the user clicks on the "Começar" button
  cy.get('form h2').should('have.text', 'Seus dados'); // Then the user should see the "Seus dados" form
  cy.get('#fullname').as('fullname'); // And fill out the "name" and "email" fields
  if (user.fullname) {
    cy.get('@fullname').type(user.fullname);
  }
  cy.get('#email').as('email'); // And fill out the "email" field
  if (user.email) {
    cy.get('@email').type(user.email);
  }
  cy.get('button[type="submit"]').should('have.text', 'Continuar').click(); // And click on the "Continuar" button
});
// ---------------------------------------
// * This command cancel the register.
Cypress.Commands.add('startCancelar', (user) => {
  cy.visit('/'); // Given the user accesses this link
  cy.get('a[href = "pre-cadastro"]').click(); // When the user clicks on the "Começar" button
  cy.get('form h2').should('have.text', 'Seus dados'); // Then the user should see the "Seus dados" form
  cy.get('#fullname').as('fullname'); // And fill out the "name" and "email" fields
  if (user.fullname) {
    cy.get('@fullname').type(user.fullname);
  }
  cy.get('#email').as('email'); // And fill out the "email" field
  if (user.email) {
    cy.get('@email').type(user.email);
  }
  cy.get('button[type="button"]').should('have.text', 'Cancelar').click(); // And click on the "Cancelar" button
});
// ---------------------------------------
// * This command checks the user name and email on header
Cypress.Commands.add('verifyDataHeader', (user) => {
  cy.get('.usuario-nome') // Then the user should see the "Olá, 'firstName'" text in the header of the page
    .should('be.visible') // And the "Olá, 'firstName'" text should be visible
    .and('have.text', 'Olá, ' + user.fullname.split(' ')[0]); // And the 'Olá, 'firstName'', should be visible
  cy.get('.usuario-email').should('be.visible').and('have.text', user.email); // And the "e-mail" should be visible')
});
// ------------------------------------------------------------
// * This command checks the alert messages.
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
