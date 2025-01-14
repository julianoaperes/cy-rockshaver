class preCadastroPage {
  goPreCadastroAgendar() {
    cy.get('form h2').should('have.text', 'Seus dados'); // Then the user should see the "Seus dados" form
  }
  fillForm(fullName, email) {
    cy.get('#fullname').type(fullName); // And fill out the "name" and "email" fields
    cy.get('#email').type(email); // And fill out the "name" and "email" fields
  }
  submitForm() {
    cy.get('button[type="submit"]').should('have.text', 'Continuar').click(); // And click on the "Continuar" button
  }
  clearFields() {
    cy.get('#fullname').clear(); // And clear the fields
    cy.get('#email').clear(); // And clear the fields
  }
  NameEmailAlertMsg(field, text) {
    cy.contains('label', field) // Then the user should see the alert-msg .
      .parent() // Then the user should see the alert-msg "O campo nome é obrigatório."
      .find('.alert-msg') // Then the user should see the alert-msg "O campo nome é obrigatório."
      .should('be.visible') // Then the user should see the alert-msg "O campo nome é obrigatório."
      .and('have.text', text); // Then the user should see the alert-msg .
  }

  cancelSubmit() {
    cy.get('button[type="button"]').should('have.text', 'Cancelar').click(); // And click on the "Cancelar" button
    cy.get('h1').should('have.text', 'O LendárioBarbershop'); // Then the user should return to the home page.
  }
}
export default new preCadastroPage();
