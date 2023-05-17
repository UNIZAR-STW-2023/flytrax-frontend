describe("Store", () => {
  beforeEach(() => {
    cy.visit("/store");
  });

  it("Compra un producto", () => {
    // Esperar a que se cargue el mapa
    cy.get('[data-test="product-card"]').first().click({ multiple: true });
    cy.wait(5000);
    cy.url().should("include", "/store/product/1");
    cy.get("div").should("exist").contains("Boeing");
    cy.get("button").contains("Añadir a la cesta").click();

    cy.get('button[data-test="shoppingcart-button"]').click();
    cy.get("button").contains("Realizar pedido").click();
  });
});
