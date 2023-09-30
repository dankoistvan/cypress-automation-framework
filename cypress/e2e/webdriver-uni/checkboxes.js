/// <reference types="Cypress" />>

describe("Verify checkboxes via webdriveruni", () => {
  it("Check/uncheck and validate checkboxes", () => {
    cy.visit("https://www.webdriveruniversity.com/");
    cy.get("#dropdown-checkboxes-radiobuttons")
      .invoke("removeAttr", "target")
      .click({ force: true });
    cy.get('#checkboxes input[value="option-1"]').check().should("be.checked");
    cy.get('#checkboxes input[value="option-3"]')
      .uncheck()
      .should("not.be.checked");
  });

  it("Check multiple checkboxes", () => {
    cy.visit("https://www.webdriveruniversity.com/");
    cy.get("#dropdown-checkboxes-radiobuttons")
      .invoke("removeAttr", "target")
      .click({ force: true });
    cy.get("#checkboxes input").check().should("be.checked");
    cy.get("#checkboxes input")
      .check(["option-1", "option-2", "option-3", "option-4"])
      .should("be.checked");
  });
});
