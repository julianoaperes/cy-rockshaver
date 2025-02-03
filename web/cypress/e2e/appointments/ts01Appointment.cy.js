describe('Appointment: Validation of its scenarios', () => {
  it('Should create an appointment successfully', () => {
    // It Cleans the database before start the test
    cy.dropCollection('agendamentos', {
      failSilently: 'true',
    }).then((result) => {
      cy.log(result); // Will return 'Collection dropped' or the error object if collection doesn’t exist. Will not fail the test
    });
    // Datas for the test
    const user = {
      fullname: 'Juliano Peres',
      email: 'jp.teste@qa.com',
    };
    cy.preCadastroComecar(user);
    cy.verifyDataHeader(user);
    cy.contains('a', 'Agendar um horário').click();
    cy.get('h1').should('have.text', 'Agendamento de Serviços');
    cy.contains('span', 'Membros da Equipe').should('be.visible');
    cy.contains('div', 'Courtney').parent().click();
    cy.contains('span', 'Serviços').should('be.visible');
    cy.contains('div', 'Corte').parent().click();
    cy.contains('div', 'Dias Disponíveis').should('be.visible');
    cy.contains('.dia-semana', '06').click();
    cy.contains('.hora-opcao', '17:00').click();
    cy.contains('button', 'Confirmar e reservar').click();
    cy.get('h3')
      .should('be.visible')
      .and('have.text', 'Tudo certo por aqui! Seu horário está confirmado.');
  });
});
