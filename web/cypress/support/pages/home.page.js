import header from './components/header'; // Importing the header component to use in the test case below (goToHomePage) to validate if the user is on the home page or not.
class homePage {
  constructor() {
    this.header = header; // Instantiating the header component to be used in the test cases below.
  }
  goToHomePage() {
    cy.visit('/'); // Given the user accesses this link
  }
  goPreCadastroAgendar() {
    cy.get('a[href = "/agendamento"]').click(); // When the user clicks on the "Agendar" button
  }
}
export default new homePage();
