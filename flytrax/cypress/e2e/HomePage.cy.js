describe("Home page web", () => {
  context("Desktop", () => {
    beforeEach(() => {
      // Cambia el tamaño de la ventana del navegador
      cy.viewport("macbook-15");
      cy.visit("/");
    });

    it("Carga correctamente", () => {
      // Comprueba que exista el elemento y que contenga el texto
      cy.get("div").should("exist").contains("Viaja con tranquilidad");
      cy.get("[data-test='join-button']")
        .should("exist")
        .contains("Únete ahora");
      // Comprueba que exista el navbar y sus elementos
      cy.get("nav").should("exist");
      cy.get("a").should("exist").contains("Quiénes somos");
      cy.get("a").should("exist").contains("Servicios");
      cy.get("a").should("exist").contains("Contacto");
      // Comprueba que el botón de menú no esté visible
      cy.get("[data-test='menu-button']").should("not.be.visible");
    });

    it("Carga el inicio de sesión", () => {
      // Comprueba que exista el botón para entrar
      cy.get("[data-test='join-web-button']").should("exist").click();
      // Redirecciona a la página de inicio de sesión
      cy.url().should("include", "/login");
    });
  });

  context("Mobile", () => {
    beforeEach(() => {
      // Cambia el tamaño de la ventana del navegador
      cy.viewport("iphone-x");
      cy.visit("/");
    });

    it("Carga correctamente", () => {
      // Comprueba que exista el elemento y que contenga el texto
      cy.get("div").should("exist").contains("Viaja con tranquilidad");
      cy.get("[data-test='join-button']")
        .should("exist")
        .contains("Únete ahora");
      // Comprueba que exista el navbar
      cy.get("nav").should("exist");
      // Comprueba que el botón de menú esté visible
      cy.get("[data-test='menu-button']").should("be.visible");
    });

    it("Carga el inicio de sesión", () => {
      // Abre el menú
      cy.get("[data-test='menu-button']").click();
      cy.get("[data-test='li-join-button']").should("exist").click();
      cy.url().should("include", "/login");
      // Cierra el menú
      cy.get("[data-test='menu-button']").click();
    });
  });
});
