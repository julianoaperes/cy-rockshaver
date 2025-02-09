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

import './actions/preregister';
import './actions/appointments.action';

//! ******  CUSTOM COMMANDS ******

Cypress.commands.add('appointmentApi', (agenda) => {
  cy.api({
    method: 'POST',
    url: 'http://localhost:3333/api/agendamentos',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer 3a8a9b8fae87baf503e7c5fe5b97fd72',
    },
    body: {
      codigoServico: agenda.service.id,
      data: agenda.date,
      emailCliente: agenda.user.email,
      hora: agenda.time,
      matricula: agenda.professional.id,
      nomeCliente: agenda.user.fullName,
    },
  }).then((response) => {
    expect(response.status).to.eq(201);
  });
});

// -------------------------------------------------------------
//! ***** ALLOW CYPRESS RUN THE TESTS EVEN WITH ERROR *****
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
