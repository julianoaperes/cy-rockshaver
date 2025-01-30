//! ********** TEST SUIT: Pre-Cadastro (Pre-registration) ***********
describe('Validation of "Pré-cadastro" scenarios', () => {
  it("Should do the pré-cadastro successfully when the user fills out the form with valid credentials by clicking on the 'Entrar' button", () => {
    const user = {
      fullname: 'Juliano Peres',
      email: 'jp.qa@test.com',
    };
    cy.preCadastroComecar(user);
    /** 
      Given the user accesses the home page
      When the user clicks on the "Começar" button
      hen the user should see the "Seus dados" form
      And fill out the "name" and "email" fields
      And click on the "Continuar" button
    */
    cy.verifyDataHeader(user);
    /**
     Then the user should see the "Olá, 'firstName'" and "  " text  in the header of the page
     */
  });
  it("Should pré-cadastro successfully when the user fills out the form with valid credentials by clicking on the 'Agendar um horário' button", () => {
    const user = {
      fullname: 'Juliano Peres',
      email: 'jp.qa@test.com',
    };
    cy.startAgendar(user);
    /** 
      Given the user accesses the home page
      When the user clicks on the "Agendar" button
      hen the user should see the "Seus dados" form
      And fill out the "name" and "email" fields
      And click on the "Continuar" button
    */
    cy.verifyDataHeader(user);
    /**
     Then the user should see the "Olá, 'firstName'" and "  " text  in the header of the page
     */
  });
  it('The fields "name" and "email" should displays alert messages after submit, when the fields were empty', () => {
    cy.preCadastroComecar();
    /** 
      Given the user accesses the home page
      When the user clicks on the "Começar" button
      Then the user should see the "Seus dados" form
      And keep empty the "name" and "email" fields
      And click on the "Continuar" button
    */
    cy.NameEmailAlertMsg('Nome Completo', 'O campo nome é obrigatório.');
    // Then the user should see the alert-msg "O campo nome é obrigatório."
    cy.NameEmailAlertMsg('E-mail', 'O campo e-mail é obrigatório.');
    // Then the user should see the alert-msg "O campo e-mail é obrigatório."
  });
  it('"Cancel" button: Should cancel the pré-cadastro an return to the homepage', () => {
    const user = {
      fullname: 'Juliano Peres',
      email: 'jp.qa@test.com',
    };
    cy.startCancelar(user);
    /** 
      Given the user accesses the home page
      When the user clicks on the "Começar" button
      Then the user should see the "Seus dados" form
      And keep empty the "name" and "email" fields
      And click on the "Continuar" button
    */
  });
  it('"Name" field: Should not accept numbers', () => {
    cy.startComecar('123 123', 'jp.qa@test.com');
    /** 
      Given the user accesses the home page
      When the user clicks on the "Começar" button
      Then the user should see the "Seus dados" form
      And type numbers into the "name" 
      And valid "email"
      And click on the "Continuar" button
    */
    cy.NameEmailAlertMsg('Nome Completo', 'O campo nome é inválido.');
    // Then the user should see the alert-msg "O campo nome é inválido."
  });
  it('"Name" field: Should not accept special characters', () => {
    cy.startComecar('@#$ %&*', 'jp.qa@test.com');
    /** 
      Given the user accesses the home page
      When the user clicks on the "Começar" button
      Then the user should see the "Seus dados" form
      And type special characters into the "name" 
      And valid "email"
      And click on the "Continuar" button
    */
    cy.NameEmailAlertMsg('Nome Completo', 'O campo nome é inválido.');
    // Then the user should see the alert-msg "O campo nome é inválido."
  });
  it('"Name" field: Should display an alert message when typed only the first name', () => {
    const user = {
      fullname: 'Juliano',
      email: 'jp.qa@test.com',
    };
    cy.startComecar(user);
    /** 
      Given the user accesses the home page
      When the user clicks on the "Começar" button
      Then the user should see the "Seus dados" form
      And type only the first name into the "name" 
      And valid "email"
      And click on the "Continuar" button
    */
    cy.NameEmailAlertMsg('Nome Completo', 'Informe seu nome completo.');
    // Then the user should see the alert-msg "Informe seu nome completo."
  });
  it('"E-mail" field: Should display a validation message when typed invalid data', () => {
    const user = {
      fullname: 'Juliano Peres',
      email: 'www.test.com',
    };
    cy.startComecar(user);
    /** 
      Given the user accesses the home page
      When the user clicks on the "Começar" button
      Then the user should see the "Seus dados" form
      And type valid "name"
      And invalid "email"
      And click on the "Continuar" button
    */
    cy.NameEmailAlertMsg('E-mail', 'O e-mail inserido é inválido.');
    // Then the user should see the alert-msg "O e-mail inserido é inválido."
  });
});
