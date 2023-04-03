describe("Forgot password", () => {
  beforeEach("Carga la página de recuperación de contraseña", () => {
    cy.visit("/forgot-passwd");
  });

  it("Introducir campos vacíos en el formulario", () => {
    cy.get("button").contains("Enviar").click();
    cy.window("Snackbar").contains("No puedes dejar campos vacíos");
  });

  it("Volver al inicio", () => {
    cy.get("a").contains("Volver").click();
    cy.url().should("include", "/login");
  });
});
