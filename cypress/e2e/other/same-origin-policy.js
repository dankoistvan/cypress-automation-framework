/// <reference types="Cypress" />>

describe("Cypress web security", () => {
  //   it("Validate visiting two different domains", () => {
  //     cy.visit("https://www.webdriveruniversity.com/");
  //     cy.visit("https://google.com/");
  //   });

  it.only("Validate visiting two different domains via user actions", () => {
    cy.visit("https://www.webdriveruniversity.com/");
    cy.get("#automation-test-store").invoke("removeAttr", "target").click();
  });

  it("Origin command", () => {
    cy.origin("automationteststore.com", () => {
      cy.visit("/");
    });
    cy.origin("https://google.com", () => {
      cy.visit("/");
    });
  });
});
