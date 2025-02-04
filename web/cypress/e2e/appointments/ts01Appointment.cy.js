import calendar from '../../fixtures/calendar.json';
import dataClient from '../../fixtures/data-client.json';
describe('Appointment: Validation of its scenarios', () => {
  it('Should create an appointment successfully', () => {
    const agenda = dataClient.success;
    // It Cleans the database before start the test
    cy.dropCollection('agendamentos', {
      failSilently: 'true',
    }).then((result) => {
      cy.log(result); // Will return 'Collection dropped' or the error object if collection doesn’t exist. Will not fail the test
    });
    cy.intercept('GET', 'http://localhost:3333/api/calendario', {
      statusCode: 200,
      body: calendar,
    }).as('getCalendar');
    // Datas for the test
    cy.preCadastroComecar(agenda.user);
    cy.verifyDataHeader(agenda.user);
    cy.contains('a', 'Agendar um horário').click();
    cy.get('h1').should('have.text', 'Agendamento de Serviços');
    cy.contains('span', 'Membros da Equipe').should('be.visible');
    cy.contains('div', 'Courtney').parent().click();
    cy.contains('span', 'Serviços').should('be.visible');
    cy.contains('div', agenda.servico.descricao).parent().click();
    cy.contains('div', 'Dias Disponíveis').should('be.visible');
    cy.contains('.dia-semana', agenda.dia).click();
    cy.contains('.hora-opcao', agenda.hora).click();
    cy.contains('button', 'Confirmar e reservar').click();
    cy.get('h3')
      .should('be.visible')
      .and('have.text', 'Tudo certo por aqui! Seu horário está confirmado.');
  });
});
