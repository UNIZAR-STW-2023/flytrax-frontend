describe("Login", () => {
  beforeEach("Carga la página de inicio de sesión", () => {
    cy.visit("/login");
  });

  it("Redirige a registro", () => {
    cy.get("a").should("exist").contains("Regístrate").click();
    cy.url().should("include", "/register");
  });

  it("Redirige a recuperación de contraseña", () => {
    cy.get("a")
      .should("exist")
      .contains("¿Has olvidado tu contraseña?")
      .click();
    cy.url().should("include", "/forgot-passwd");
  });

  it("Introducir campos vacíos en el formulario", () => {
    cy.get("button").contains("Entrar").click();
    cy.window("Snackbar").contains("No puedes dejar campos vacíos");
  });
});
