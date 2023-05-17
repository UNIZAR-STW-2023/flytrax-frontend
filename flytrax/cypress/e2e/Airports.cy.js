/*
  File's name: Airports.cy.js
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

describe("AirportsList", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('input[type="email"]').type("sergio@unizar.es");
    cy.get('input[type="password"]').type("123456");
    cy.get("button").contains("Entrar").click();
    cy.wait(5000);
    cy.url().should("include", "/map");
  });

  it("Renderiza la lista de aeropuertos", () => {
    cy.visit("/airports-list"); // Cambia la ruta si es necesario
    cy.get("#list-top").should("exist");
    cy.get('[id="combo-box-demo"]').should("exist"); // Asserts that Autocomplete exists
    cy.get("input[type='search']").should("exist");
    cy.get("div").should("contain", "ORD");
    cy.get("button").should("exist").contains("Ver más");
  });

  it("Filtrado por país", () => {
    cy.visit("/airports-list");
    cy.get("Autocomplete").click().type("United States{enter}");
    cy.get("button").contains("FilterAltOffIcon").should("exist");
    cy.get("AirportCard").should("have.length", 10); // Cambia el número si es necesario

    cy.get("Autocomplete").click().type("{backspace}{backspace}{enter}");
    cy.get("button").contains("FilterAltIcon").should("exist");
    cy.get("AirportCard").should("have.length", 20); // Cambia el número si es necesario
  });

  it("Permite la búsqueda de aeropuertos", () => {
    cy.visit("/airports-list");
    cy.get("input[type='search']").type("London");
    cy.get("AirportCard").should("have.length", 1);
    cy.get("input[type='search']").clear().type("New York");
    cy.get("AirportCard").should("have.length", 2); // Cambia el número si es necesario
  });

  it("Muestra la alerta de información", () => {
    cy.visit("/airports-list");
    cy.get("InfoOutlined").click();
    cy.get(".MuiSnackbar-root")
      .contains("Filtra por país")
      .should("be.visible");
  });

  it("Muestra los aeropuertos favoritos", () => {
    cy.visit("/fav-airports");
    cy.wait(6000);
    cy.get("div").contains("AMS").click();
    cy.get(".MuiSnackbar-root")
      .contains("Ver más información")
      .should("be.visible");
  });
});
