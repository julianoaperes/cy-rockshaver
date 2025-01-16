class preCadastro {
  startAgendar(fullName, email) {
    cy.visit('/'); // Given the user accesses this link
    cy.get('a[href = "/agendamento"]').click(); // When the user clicks on the "Começar" button
    cy.get('form h2').should('have.text', 'Seus dados'); // Then the user should see the "Seus dados" form
    cy.get('#fullname').type(fullName); // And fill out the "name" and "email" fields
    cy.get('#email').type(email); // And fill out the "name" and "email" fields
    cy.get('button[type="submit"]').should('have.text', 'Continuar').click(); // And click on the "Continuar" button
  }
  startCancelForm(fullName, email) {
    cy.visit('/'); // Given the user accesses this link
    cy.get('a[href = "pre-cadastro"]').click(); // When the user clicks on the "Começar" button
    cy.get('form h2').should('have.text', 'Seus dados'); // Then the user should see the "Seus dados" form
    cy.get('#fullname').type(fullName); // And fill out the "name" and "email" fields
    cy.get('#email').type(email); // And fill out the "name" and "email" fields
    cy.get('button[type="button"]').should('have.text', 'Cancelar').click(); // And click on the "Continuar" button
  }
}
export default new preCadastro();
