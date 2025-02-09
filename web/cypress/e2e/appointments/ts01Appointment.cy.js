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
    cy.appointmentApi(agenda); // Create the appointment
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
    cy.get(`[slot="${agenda.time} - ocupado"]`)
      .should('be.visible')
      .find('svg')
      .should('be.visible');
  });
});
