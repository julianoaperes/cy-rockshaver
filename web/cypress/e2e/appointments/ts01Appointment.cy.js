import calendar from '../../fixtures/calendar.json'; // Import the calendar data
import dataClient from '../../fixtures/data-client.json'; // Import the client data
describe('Appointment: Validation of its scenarios', () => {
  it('Should create an appointment successfully', () => {
    const agenda = dataClient.success; // Get the data from the client
    // It Cleans the database before start the test
    cy.dropCollection('agendamentos', {
      failSilently: 'true',
    }).then((result) => {
      cy.log(result); // Will return 'Collection dropped' or the error object if collection doesn’t exist. Will not fail the test
    });
    // Intercept the request to get the calendar
    cy.intercept('GET', 'http://localhost:3333/api/calendario', {
      statusCode: 200,
      body: calendar,
    }).as('getCalendar'); // And return the calendar data
    cy.preCadastroComecar(agenda.user); // Register the user by clicking on the "Começar" button.
    cy.verifyDataHeader(agenda.user);
    cy.startAppointment(agenda.professional.name);
    cy.selectServiceProvider('Courtney');
    cy.selectService(agenda.service.description);
    cy.selectDate(agenda.day);
    cy.selectTime(agenda.time);
    cy.confirmAppointment();
  });
  it.only('Should display the slot of the time is already scheduled', () => {
    cy.dropCollection('agendamentos', {
      failSilently: 'true',
    }).then((result) => {
      cy.log(result); // Will return 'Collection dropped' or the error object if collection doesn’t exist. Will not fail the test
    });
    const agenda = dataClient.slotScheduled; // Get the data from the client

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
    // Intercept the request to get the calendar
    cy.intercept('GET', 'http://localhost:3333/api/calendario', {
      statusCode: 200,
      body: calendar,
    }).as('getCalendar'); // And return the calendar data
    cy.preCadastroComecar(agenda.user); // Register the user by clicking on the "Começar" button.
    cy.verifyDataHeader(agenda.user);
    cy.startAppointment();
    cy.selectServiceProvider(agenda.professional.name);
    cy.selectService(agenda.service.description);
    cy.selectDay(agenda.day);
    cy.get('[slot="14:00 - ocupado"]')
      .should('be.visible')
      .find('svg')
      .should('be.visible');
  });
});
