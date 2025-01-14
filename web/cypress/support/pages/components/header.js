class header {
  goPreCadastroComeçar() {
    cy.get('a[href = "pre-cadastro"]').click(); // When the user clicks on the "Agendar" button
  }
  verifyNameEmail(firstName, email) {
    cy.get('.user-name')
      .should('be.visible')
      .and('have.text', 'Olá, ' + firstName);
    cy.get('.user-email').should('be.visible').and('have.text', email);
  }
}

export default new header();
