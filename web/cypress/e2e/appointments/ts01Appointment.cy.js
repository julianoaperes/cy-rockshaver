// cy.dropCollection('nonexistentCollection', {
//   failSilently: 'true',
// }).then((result) => {
//   cy.log(result); // Will return 'Collection dropped' or the error object if collection doesn’t exist. Will not fail the test
// });

describe('Appointment: Validation of its scenarios', () => {
  it('Should create an appointment successfully', () => {
    const user = {
      fullname: 'Juliano Peres',
      email: 'jp.teste@qa.com',
    };
    cy.preCadastroComecar(user);
    cy.verifyDataHeader(user);
    cy.contains('a', 'Agendar um horário').click();
  });
});
