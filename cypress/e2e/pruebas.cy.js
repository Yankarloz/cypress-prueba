describe('Pruebas a la App Web', () => {
  const url = 'http://localhost:8081/miapp/';

  it('Carga la página correctamente', () => {
    cy.visit(url);
    cy.contains('¡Bienvenido a mi aplicación web!');
  });

  it('Cambia el texto al hacer clic en botón', () => {
    cy.visit(url);
    cy.get('#cambiarTexto').click();
    cy.get('#mensaje').should('contain', 'Texto cambiado con éxito');
  });

  it('Muestra saludo al enviar nombre', () => {
    cy.visit(url);
    cy.get('#nombre').type('Yancarlos');
    cy.get('#formulario').submit();
    cy.get('#resultado').should('contain', '¡Hola, Yancarlos!');
  });
});
