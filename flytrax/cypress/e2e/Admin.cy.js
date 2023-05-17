/*
  File's name: Admin.cy.js
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

  it("Debería permitir iniciar sesión con credenciales válidas y entrar a gestionar los usuarios", () => {
    cy.get('input[type="email"]').type("admin@flytrax.com");
    cy.get('input[type="password"]').type("adminadmin");
    cy.get("button").contains("Entrar").click();
    cy.wait(10000);
    cy.url().should("include", "/admin");
    cy.get("div").contains("Panel de administración");
    cy.get("div").contains("Usuarios por rango de edad");
    cy.get("div").contains("Nuevos usuarios");
    cy.get("div").contains("Ratio de bans");
    cy.get("div").contains("Top 3");
    cy.get("div").contains("Gestionar usuarios").click();
    cy.wait(4000);
    cy.url().should("include", "/admin/user-management");
    cy.get("div").contains("Panel de usuarios");
  });

  it("Debería mostrar un mensaje de error cuando se dejan campos vacíos", () => {
    cy.get("button").contains("Entrar").click();

    cy.get(".MuiSnackbar-root")
      .contains("No puedes dejar campos vacíos")
      .should("be.visible");
  });

  it("Debería mostrar un mensaje de error cuando se ingresan credenciales incorrectas", () => {
    cy.get('input[type="email"]').type("admin@flytrax.com");
    cy.get('input[type="password"]').type("contraseñaIncorrecta", {
      force: true,
    });
    cy.get("button").contains("Entrar").click();

    cy.get(".MuiSnackbar-root")
      .contains("Correo electrónico o contraseña incorrecta")
      .should("be.visible");
  });
});
