class header {
  goPreCadastroComeçar() {
    cy.get('a[href = "pre-cadastro"]').click(); // When the user clicks on the "Começar" button
  }
  verifyNameEmail(firstName, email) {
    cy.get('.user-name') // Then the user should see the "Olá, 'firstName'" text in the header of the page
      .should('be.visible') // And the "Olá, 'firstName'" text should be visible
      .and('have.text', 'Olá, ' + firstName); // And the 'Olá, 'firstName'', should be visible
    cy.get('.user-email').should('be.visible').and('have.text', email); // And the "e-mail" should be visible
  }
}

export default new header();
