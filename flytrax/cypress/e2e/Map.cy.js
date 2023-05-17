/*
  File's name: Map.cy.js
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

describe("MapRendered", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('input[type="email"]').type("sergio@unizar.es");
    cy.get('input[type="password"]').type("123456");
    cy.get("button").contains("Entrar").click();
    cy.wait(5000);
    cy.url().should("include", "/map");
  });

  it("Debería buscar un aeropuerto y clicarlo", () => {
    // Esperar a que se cargue el mapa
    cy.get("#map").should("exist");

    cy.get("button").contains("Buscar").click();
    cy.get('input[type="search"]').type("lax");
    cy.get("div").contains("Los Angeles").click();
  });

  it("Debería mostrar el mapa y mostrar un aeropuerto al clicarlo, y redirigir a los paneles", () => {
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
    cy.get("button").contains("Ver paneles").click();

    cy.wait(6000);
    cy.url().should("include", "/airport/MAD/flight-panel");
  });
});
