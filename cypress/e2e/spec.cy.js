describe('Prueba automática en example.cypress.io', () => {
  it('Verifica navegación y elementos visibles', () => {
    cy.visit('https://example.cypress.io')

    // Abre el menú desplegable
    cy.get('.dropdown-toggle').contains('Commands').click()

    // Ahora el enlace "Querying" está visible y se puede hacer clic
    cy.contains('Querying').click()

    // Verifica que esté en la página correcta
    cy.url().should('include', '/commands/querying')

    // Verifica que el botón existe
    cy.get('#query-btn').should('exist').and('contain', 'Button')
  })
})