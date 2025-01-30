import { customDescribeNumbered } from '../../support/commands.mjs'; // Import the custom function to create numbered `describe` blocks from the commands.js file in the support folder of the project.
import header from '../../support/pages/components/header'; // Import the header object from the header.js file in the support/pages/components folder of the project.
import homePage from '../../support/pages/home.page'; // Import the homePage object from the home.page.js file in the support/pages folder of the project.
import preCadastroPage from '../../support/pages/pre-cadastro.page'; // Import the preCadastroPage object from the pre-cadastro.page.js file in the support/pages folder of the project.
// ***************************************************************
// ! * TEST CASES: Pre-Cadastro (Pre-registration) *
customDescribeNumbered('Validation of "Pré-cadastro" scenarios', (it) => {
  it("Should do the pré-cadastro successfully when the user fills out the form with valid credentials by clicking on the 'Entrar' button", () => {
    homePage.goToHomePage(); // Given the user accesses the home page
    header.goPreCadastroComeçar(); // Then the user should see the "Seus dados" form
    preCadastroPage.fillForm('Test Qa', 'teste@teste.com'); // And fill out the "name" and "email" fields
    preCadastroPage.submitForm(); // And click on the "Continuar" button
    header.verifyNameEmail('Test', 'teste@teste.com'); // Then the user should see the "Olá, 'firstName'" and "  " text  in the header of the page});
  });

  it("Should pré-cadastro successfully when the user fills out the form with valid credentials by clicking on the 'Agendar um horário' button", () => {
    homePage.goToHomePage(); // Given the user accesses the home page
    homePage.goPreCadastroAgendar(); // Then the user should see the "Seus dados" form
    preCadastroPage.fillForm('Test Qa', 'teste@teste.com'); // And fill out the "name" and "email" fields
    preCadastroPage.submitForm(); // And click on the "Continuar" button
    cy.get('h1').should('have.text', 'Agendamento de Serviços'); // Then the user should see the "Agendamento de Serviços" title
  });

  it('The fields: Should displays validation messages after submit, when the fields were empty', () => {
    homePage.goToHomePage(); // Given the user accesses the home page
    header.goPreCadastroComeçar(); // Then the user should see the "Seus dados" form
    preCadastroPage.clearFields(); // And clear the fields
    preCadastroPage.submitForm(); // And click on the "Continuar" button
    preCadastroPage.NameEmailAlertMsg(
      'Nome Completo',
      'O campo nome é obrigatório.'
    ); // Then the user should see the alert-msg "O campo nome é obrigatório."
    preCadastroPage.NameEmailAlertMsg(
      'E-mail',
      'O campo e-mail é obrigatório.'
    ); // And the alert-msg "O campo e-mail é obrigatório."
  });
  it('"Cancel" button: Should cancel the pré-cadastro an return to the homepage', () => {
    homePage.goToHomePage(); // Given the user accesses the home page
    header.goPreCadastroComeçar(); // Then the user should see the "Seus dados" form
    preCadastroPage.fillForm('Test Qa', 'teste@teste.com'); // And fill out the "name" and "email" fields
    preCadastroPage.cancelSubmit(); // And click on the "Cancelar" button
    // Then the user should return to the home page.
  });
  it('"Name" field: Should accept only letters', () => {
    homePage.goToHomePage(); // Given the user accesses the home page
    header.goPreCadastroComeçar(); // Then the user should see the "Seus dados" form
    preCadastroPage.fillForm('123456 34524', 'test@qa.com'); // And fill out the "name" with numbers  and "email" properly.
    preCadastroPage.submitForm(); // And click on the "Continuar" button
    preCadastroPage.NameEmailAlertMsg('Nome Completo', 'Insira apenas letras.'); // Then the user should see the alert-msg "Insira apenas letras."
    preCadastroPage.fillForm('@#$ &*%', 'test@qa.com'); // And fill out the "name" with especial characters  and "email" properly.
    preCadastroPage.submitForm(); // And click on the "Continuar" button
    preCadastroPage.NameEmailAlertMsg('Nome Completo', 'Insira apenas letras.'); // Then the user should see the alert-msg "Insira apenas letras."
  });
  it('"Name" field: Should display a validation message when typed only the first name', () => {
    homePage.goToHomePage(); // Given the user accesses the home page
    header.goPreCadastroComeçar(); // Then the user should see the "Seus dados" form
    preCadastroPage.fillForm('Test', 'teste@teste.com'); // And fill out the "name" with only the first name and "email" properly.
    preCadastroPage.submitForm(); // And click on the "Continuar" button
    preCadastroPage.NameEmailAlertMsg(
      'Nome Completo',
      'Informe seu nome completo.'
    ); // Then the user should see the alert-msg "Informe seu nome completo."
  });
  it('"E-mail" field: Should display a validation message when typed invalid data', () => {
    homePage.goToHomePage(); // Given the user accesses the home page
    header.goPreCadastroComeçar(); // Then the user should see the "Seus dados" form
    preCadastroPage.fillForm('Test QA', 'www.testeteste.com'); // And fill out the "name" and "email" with invalid data
    preCadastroPage.submitForm(); // And click on the "Continuar" button
    preCadastroPage.NameEmailAlertMsg(
      'E-mail',
      'O e-mail inserido é inválido.'
    ); // Then the user should see the alert-msg "O e-mail inserido é inválido."
  });
});
