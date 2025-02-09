// cypress/support/commands.js
// Step: Creating an appointment
Cypress.Commands.add('startAppointment', () => {
  cy.contains('a', 'Agendar um horário').click();
  cy.get('h1').should('have.text', 'Agendamento de Serviços');
  cy.contains('span', 'Membros da Equipe').should('be.visible');
});

// Step: Selecting the service provider
Cypress.Commands.add('selectServiceProvider', (providerName) => {
  cy.contains('div', providerName).parent().click();
  cy.contains('span', 'Serviços').should('be.visible');
});

// Step: Selecting the service
Cypress.Commands.add('selectService', (serviceDescription) => {
  cy.contains('div', serviceDescription).parent().click();
  cy.contains('span', 'Dias Disponíveis').should('be.visible');
});

// Step: Selecting the date
Cypress.Commands.add('selectDay', (day) => {
  cy.contains('.dia-semana', day).click();
  cy.contains('span', 'Horários Disponíveis').should('be.visible');
});

// Step: Selecting the time
Cypress.Commands.add('selectTime', (time) => {
  cy.contains('.hora-opcao', time).click();
});

// Step: Confirming the appointment
Cypress.Commands.add('confirmAppointment', () => {
  cy.contains('button', 'Confirmar e reservar').click();
  cy.get('h3')
    .should('be.visible')
    .and('have.text', 'Tudo certo por aqui! Seu horário está confirmado.');
});
