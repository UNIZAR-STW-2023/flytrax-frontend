describe("Home page", () => {
  context("Desktop", () => {
    beforeEach(() => {
      // Cambia el tamaño de la ventana del navegador
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
      // Comprueba que existe el footer y sus elementos
      cy.get("[data-test='footer']").should("exist");
      // Primera columna
      cy.get("[data-test='logo-footer']").should("exist");
      cy.get("a").should("exist").contains("Acerca de");
      cy.get("a").should("exist").contains("Blog");
      cy.get("a").should("exist").contains("Prensa & Logos");
      cy.get("a").should("exist").contains("Términos & Privacidad");
      cy.get("a").should("exist").contains("Status");
      cy.get("h3").should("exist").contains("2023 Flytrax");
      // Segunda columna
      cy.get("h2").should("exist").contains("Producto");
      cy.get("a").should("exist").contains("Dispositivos soportados");
      cy.get("a").should("exist").contains("Integraciones");
      cy.get("a").should("exist").contains("Marcador");
      cy.get("a").should("exist").contains("Objetivos");
      cy.get("a").should("exist").contains("Equipos");
      cy.get("a").should("exist").contains("Educación");
      // Tercera columna
      cy.get("h2").should("exist").contains("Aprende");
      cy.get("a").should("exist").contains("API Docs");
      cy.get("a").should("exist").contains("FAQ");
      cy.get("a").should("exist").contains("Precios");
      cy.get("a").should("exist").contains("Valores");
      cy.get("a").should("exist").contains("Resolución de problemas");
      // Cuarta columna
      cy.get("h2").should("exist").contains("Comunidad");
      cy.get("a").should("exist").contains("GitHub");
      cy.get("a").should("exist").contains("Twitter");
      cy.get("a").should("exist").contains("reddit");
      cy.get("a").should("exist").contains("Facebook");
      cy.get("a").should("exist").contains("LinkedIn");
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
      // Comprueba que existe el footer y sus elementos
      cy.get("[data-test='footer']").should("exist");
      // Primera columna
      cy.get("[data-test='logo-footer']").should("exist");
      cy.get("a").should("exist").contains("Acerca de");
      cy.get("a").should("exist").contains("Blog");
      cy.get("a").should("exist").contains("Prensa & Logos");
      cy.get("a").should("exist").contains("Términos & Privacidad");
      cy.get("a").should("exist").contains("Status");
      cy.get("h3").should("exist").contains("2023 Flytrax");
      // Segunda columna
      cy.get("h2").should("exist").contains("Producto");
      cy.get("a").should("exist").contains("Dispositivos soportados");
      cy.get("a").should("exist").contains("Integraciones");
      cy.get("a").should("exist").contains("Marcador");
      cy.get("a").should("exist").contains("Objetivos");
      cy.get("a").should("exist").contains("Equipos");
      cy.get("a").should("exist").contains("Educación");
      // Tercera columna
      cy.get("h2").should("exist").contains("Aprende");
      cy.get("a").should("exist").contains("API Docs");
      cy.get("a").should("exist").contains("FAQ");
      cy.get("a").should("exist").contains("Precios");
      cy.get("a").should("exist").contains("Valores");
      cy.get("a").should("exist").contains("Resolución de problemas");
      // Cuarta columna
      cy.get("h2").should("exist").contains("Comunidad");
      cy.get("a").should("exist").contains("GitHub");
      cy.get("a").should("exist").contains("Twitter");
      cy.get("a").should("exist").contains("reddit");
      cy.get("a").should("exist").contains("Facebook");
      cy.get("a").should("exist").contains("LinkedIn");
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
