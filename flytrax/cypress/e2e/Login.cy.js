/*
  File's name: Login.cy.js
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

describe("Página de inicio de sesión", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Debería mostrar el formulario de inicio de sesión", () => {
    cy.get("h1").contains("Iniciar sesión");
    cy.get('input[type="email"]').should("exist");
    cy.get('input[type="password"]').should("exist");
    cy.get("button").contains("Entrar").should("exist");
  });

  it("Debería permitir iniciar sesión con credenciales válidas", () => {
    cy.get('input[type="email"]').type("sergio@unizar.es");
    cy.get('input[type="password"]').type("123456");
    cy.get("button").contains("Entrar").click();
    cy.wait(5000);
    cy.url().should("include", "/map");
  });

  it("Debería mostrar un mensaje de error cuando se dejan campos vacíos", () => {
    cy.get("button").contains("Entrar").click();

    cy.get(".MuiSnackbar-root")
      .contains("No puedes dejar campos vacíos")
      .should("be.visible");
  });

  it("Debería mostrar un mensaje de error cuando se ingresan credenciales incorrectas", () => {
    cy.get('input[type="email"]').type("correo@example.com");
    cy.get('input[type="password"]').type("contraseñaIncorrecta", {
      force: true,
    });
    cy.get("button").contains("Entrar").click();

    cy.get(".MuiSnackbar-root")
      .contains("Correo electrónico o contraseña incorrecta")
      .should("be.visible");
  });
});
