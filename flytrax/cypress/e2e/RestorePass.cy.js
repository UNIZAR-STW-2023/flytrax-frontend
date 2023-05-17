describe("Restore password", () => {
  beforeEach("Carga la página de restauración de contraseña", () => {
    cy.visit("/restore-passwd");
  });

  it("Introducir campos vacíos en el formulario", () => {
    cy.get("button").contains("Enviar").click();
    cy.get(".MuiSnackbar-root")
      .contains("No puedes dejar campos vacíos")
      .should("be.visible");
  });

  it("Introducir contraseña débil en el formulario", () => {
    cy.get('input[name="password"]').type("12345678");
    cy.get('input[name="cpassword"]').type("12345678");
    cy.get("button").contains("Enviar").click();
    cy.get(".MuiSnackbar-root")
      .contains("La contraseña es demasiado débil")
      .should("be.visible");
  });

  it("Introducir contraseñas diferentes en el formulario", () => {
    // Introducir contraseñas en el formulario
    cy.get('input[name="password"]').type("timer.100AB!");
    cy.get('input[name="cpassword"]').type("timer.100AC!");
    // Contraseña 1 tipo password
    cy.get('input[name="password"]').should("have.value", "timer.100AB!");
    cy.get('input[name="password"]').should("have.attr", "type", "password");
    // Click en el botón de mostrar contraseña 1
    cy.get('[data-test="showpass-btn"]').click();
    cy.get('input[name="password"]').should("have.attr", "type", "text");
    // Contraseña 2 tipo password
    cy.get('input[name="cpassword"]').should("have.value", "timer.100AC!");
    cy.get('input[name="cpassword"]').should("have.attr", "type", "password");
    // Click en el botón de mostrar contraseña 2
    cy.get('[data-test="showcpass-btn"]').click();
    cy.get('input[name="cpassword"]').should("have.attr", "type", "text");
    // Click en el botón de enviar
    cy.get("button").contains("Enviar").click();
    cy.get(".MuiSnackbar-root")
      .contains("Las contraseñas no coinciden")
      .should("be.visible");
  });

  it("Volver al inicio", () => {
    cy.get("a").contains("Volver").click();
    cy.url().should("include", "/login");
  });
});
