/*
  File's name: Community.cy.js
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

describe("Community", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('input[type="email"]').type("sergio@unizar.es");
    cy.get('input[type="password"]').type("123456");
    cy.get("button").contains("Entrar").click();
    cy.wait(5000);
    cy.url().should("include", "/map");
  });

  it("Debería mostrar un aeropuerto, ir a su página, ir al foro y comentar", () => {
    // Esperar a que se cargue el mapa
    cy.get("#map").should("exist");

    // Verificar la presencia de marcadores
    cy.get(".leaflet-marker-icon").should("exist");

    // Hacer clic en el primer marcador
    cy.get(".leaflet-marker-icon").first().click();

    // Verificar que se muestre el popup con la ubicación del aeropuerto
    cy.get(".leaflet-popup-content").should("contain", "MAD").click();

    cy.wait(6000);

    cy.url().should("include", "/airport/MAD");
    cy.get("div").contains("Adolfo Suarez Madrid");
    cy.get("button").contains("Ir al foro").click();

    cy.wait(6000);
    cy.url().should("include", "/community/MAD");
    cy.get("div").contains("Todavía no hay discusiones en este foro");
    cy.get("textarea").type("Hola, soy un mensaje de prueba");
    cy.get("button").contains("Enviar").click();

    cy.wait(6000);
    cy.get("div").contains("Hola, soy un mensaje de prueba");
  });
});
