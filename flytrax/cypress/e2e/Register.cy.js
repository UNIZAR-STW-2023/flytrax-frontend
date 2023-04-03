describe("Register", () => {
  beforeEach("Carga la página de registro", () => {
    cy.visit("/register");
  });

  it("Redirige a inicio de sesión", () => {
    cy.get("a").should("exist").contains("Inicia sesión").click();
    cy.url().should("include", "/login");
  });

  it("Introducir campos vacíos en el formulario", () => {
    cy.get("button").contains("Registrar").click();
    cy.window("Snackbar").contains("No puedes dejar campos vacíos");
  });

  it("Introducir nombre incorrecto en el formulario: menos de 8 caracteres", () => {
    cy.get('input[name="firstName"]').type("Paul");
    cy.get('input[name="lastName"]').type("Huszak");
    cy.get('input[name="nickName"]').type("paul");
    cy.get('input[name="email"]').type("paulhuszak@gmail.com");
    cy.get('input[name="birthday"]')
      .type("{leftArrow}")
      .type("{leftArrow}")
      .type("15");
    cy.get('input[name="birthday"]').type("01");
    cy.get('input[name="birthday"]').type("1999");
    cy.get('div[name="gender"]').click();
    cy.get("div").should("exist").contains("Hombre").click();
    cy.get('input[name="phone"]').type("665310304");
    cy.get('div[name="country"]').type("esp");
    cy.get("div").should("exist").contains("España").click();
    cy.get('input[name="password"]').type("timer.100AB!");
    cy.get('input[name="cpassword"]').type("timer.100AB!");
    cy.get("button").contains("Registrar").click();
    cy.window("Snackbar").contains(
      "el nombre debe tener al menos 8 caracteres"
    );
  });

  it("Introducir nombre incorrecto en el formulario: más de 20 caracteres", () => {
    cy.get('input[name="firstName"]').type("Paul");
    cy.get('input[name="lastName"]').type("Huszak");
    cy.get('input[name="nickName"]').type("paulhuszakhuszakhuszak");
    cy.get('input[name="email"]').type("paulhuszak@gmail.com");
    cy.get('input[name="birthday"]')
      .type("{leftArrow}")
      .type("{leftArrow}")
      .type("15");
    cy.get('input[name="birthday"]').type("01");
    cy.get('input[name="birthday"]').type("1999");
    cy.get('div[name="gender"]').click();
    cy.get("div").should("exist").contains("Hombre").click();
    cy.get('input[name="phone"]').type("665310304");
    cy.get('div[name="country"]').type("esp");
    cy.get("div").should("exist").contains("España").click();
    cy.get('input[name="password"]').type("timer.100AB!");
    cy.get('input[name="cpassword"]').type("timer.100AB!");
    cy.get("button").contains("Registrar").click();
    cy.window("Snackbar").contains(
      "el nombre debe tener como máximo 20 caracteres"
    );
  });

  it("Introducir nombre incorrecto en el formulario: caracteres no alfanuméricos", () => {
    cy.get('input[name="firstName"]').type("Paul");
    cy.get('input[name="lastName"]').type("Huszak");
    cy.get('input[name="nickName"]').type(".paulhuszak.");
    cy.get('input[name="email"]').type("paulhuszak@gmail.com");
    cy.get('input[name="birthday"]')
      .type("{leftArrow}")
      .type("{leftArrow}")
      .type("15");
    cy.get('input[name="birthday"]').type("01");
    cy.get('input[name="birthday"]').type("1999");
    cy.get('div[name="gender"]').click();
    cy.get("div").should("exist").contains("Hombre").click();
    cy.get('input[name="phone"]').type("665310304");
    cy.get('div[name="country"]').type("esp");
    cy.get("div").should("exist").contains("España").click();
    cy.get('input[name="password"]').type("timer.100AB!");
    cy.get('input[name="cpassword"]').type("timer.100AB!");
    cy.get("button").contains("Registrar").click();
    cy.window("Snackbar").contains(
      "únicamente permitidos caracteres alfanuméricos"
    );
  });

  it("Introducir email incorrecto en el formulario", () => {
    cy.get('input[name="firstName"]').type("Paul");
    cy.get('input[name="lastName"]').type("Huszak");
    cy.get('input[name="nickName"]').type("paulhuszak");
    cy.get('input[name="email"]').type("paulhuszak@");
    cy.get('input[name="birthday"]')
      .type("{leftArrow}")
      .type("{leftArrow}")
      .type("15");
    cy.get('input[name="birthday"]').type("01");
    cy.get('input[name="birthday"]').type("1999");
    cy.get('div[name="gender"]').click();
    cy.get("div").should("exist").contains("Hombre").click();
    cy.get('input[name="phone"]').type("665310304");
    cy.get('div[name="country"]').type("esp");
    cy.get("div").should("exist").contains("España").click();
    cy.get('input[name="password"]').type("timer.100AB!");
    cy.get('input[name="cpassword"]').type("timer.100AB!");
    cy.get("button").contains("Registrar").click();
    cy.window("Snackbar").contains("Correo electrónico no válido");
  });

  it("Introducir contraseña débil en el formulario", () => {
    cy.get('input[name="firstName"]').type("Paul");
    cy.get('input[name="lastName"]').type("Huszak");
    cy.get('input[name="nickName"]').type("paulhuszak");
    cy.get('input[name="email"]').type("paulhuszak@gmail.com");
    cy.get('input[name="birthday"]')
      .type("{leftArrow}")
      .type("{leftArrow}")
      .type("15");
    cy.get('input[name="birthday"]').type("01");
    cy.get('input[name="birthday"]').type("1999");
    cy.get('div[name="gender"]').click();
    cy.get("div").should("exist").contains("Hombre").click();
    cy.get('input[name="phone"]').type("665310304");
    cy.get('div[name="country"]').type("esp");
    cy.get("div").should("exist").contains("España").click();
    cy.get('input[name="password"]').type("12345678");
    cy.get('input[name="cpassword"]').type("12345678");
    cy.get("button").contains("Registrar").click();
    cy.window("Snackbar").contains("La contraseña es demasiado débil");
  });

  it("Introducir contraseñas diferentes en el formulario", () => {
    cy.get('input[name="firstName"]').type("Paul");
    cy.get('input[name="lastName"]').type("Huszak");
    cy.get('input[name="nickName"]').type("paulhuszak");
    cy.get('input[name="email"]').type("paulhuszak@gmail.com");
    cy.get('input[name="birthday"]')
      .type("{leftArrow}")
      .type("{leftArrow}")
      .type("15");
    cy.get('input[name="birthday"]').type("01");
    cy.get('input[name="birthday"]').type("1999");
    cy.get('div[name="gender"]').click();
    cy.get("div").should("exist").contains("Hombre").click();
    cy.get('input[name="phone"]').type("665310304");
    cy.get('div[name="country"]').type("esp");
    cy.get("div").should("exist").contains("España").click();
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
    cy.get("button").contains("Registrar").click();
    cy.window("Snackbar").contains("Las contraseñas no coinciden");
  });
});
