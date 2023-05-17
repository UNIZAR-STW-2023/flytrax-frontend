/*
  File's name: ForgotPass.cy.js
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

describe("Forgot password", () => {
  beforeEach("Carga la página de recuperación de contraseña", () => {
    cy.visit("/forgot-passwd");
  });

  it("Introducir campos vacíos en el formulario", () => {
    cy.get("button").contains("Enviar").click();
    cy.get(".MuiSnackbar-root")
      .contains("No puedes dejar campos vacíos")
      .should("be.visible");
  });

  it("Volver al inicio", () => {
    cy.get("a").contains("Volver").click();
    cy.url().should("include", "/login");
  });
});
