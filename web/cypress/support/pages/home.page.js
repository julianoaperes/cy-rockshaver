class homePage {
  goToHomePage() {
    cy.visit('/'); // Given the user accesses this link
  }
  goPreCadastroAgendar() {
    cy.get('a[href = "/agendamento"]').click(); // When the user clicks on the "Agendar" button
  }
}
export default new homePage();
