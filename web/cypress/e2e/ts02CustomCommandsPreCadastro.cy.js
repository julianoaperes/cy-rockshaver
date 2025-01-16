import { customDescribeNumbered } from '../support/commands.mjs'; // Import the custom function to create numbered `describe` blocks from the commands.js file in the support folder of the project.
import preCadastro from '../support/actions/pre-cadastro'; // Import the preCadastro class from the pre-cadastro.js file in the support folder of the project.
//! ********** TEST SUIT: Pre-Cadastro (Pre-registration) ***********
customDescribeNumbered('Validation of "Pré-cadastro" scenarios', (it) => {
  it("Should do the pré-cadastro successfully when the user fills out the form with valid credentials by clicking on the 'Entrar' button", () => {
    cy.startComecar('JP QA', 'jp.qa@test.com');
    /** 
      Given the user accesses the home page
      When the user clicks on the "Começar" button
      hen the user should see the "Seus dados" form
      And fill out the "name" and "email" fields
      And click on the "Continuar" button
    */
    cy.verifyDataHeader('JP', 'jp.qa@test.com');
    /**
     Then the user should see the "Olá, 'firstName'" and "  " text  in the header of the page
     */
  });
  it("Should pré-cadastro successfully when the user fills out the form with valid credentials by clicking on the 'Agendar um horário' button", () => {
    preCadastro.startAgendar('JP QA', 'jp.qa@test.com');
    /** 
      Given the user accesses the home page
      When the user clicks on the "Agendar" button
      hen the user should see the "Seus dados" form
      And fill out the "name" and "email" fields
      And click on the "Continuar" button
    */
    cy.verifyDataHeader('JP', 'jp.qa@test.com');
    /**
     Then the user should see the "Olá, 'firstName'" and "  " text  in the header of the page
     */
  });
  it('The fields "name" and "email" should displays alert messages after submit, when the fields were empty', () => {
    cy.startComecar();
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
    preCadastro.startCancelForm('JP QA', 'jp.qa@test.com');
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
  it('"Name" field: Should display a validation message when typed only the first name', () => {
    cy.startComecar('JP', 'jp.qa@test.com');
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
    cy.startComecar('JP QA', 'jp.qa.com');
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
