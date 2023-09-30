/// <reference types="Cypress" />>

describe("Test Contact Us form via WebdriverUni", () => {
  it("Should be able to submit a successful submission via contact us form", () => {
    // cy.visit("https://www.webdriveruniversity.com/Contact-Us/contactus.html");
    cy.visit("https://www.webdriveruniversity.com/");
    cy.get("#contact-us").invoke("removeAttr", "target").click({ force: true });
    cy.document().should("have.property", "charset").and("eq", "UTF-8");
    cy.title().should("include", "WebDriver | Contact Us");
    cy.url().should("include", "contactus");
    cy.get('[name="first_name"]').type("Istvan");
    cy.get('[name="last_name"]').type("Danko");
    cy.get('[name="email"]').type("test@email.com");
    cy.get("textarea.feedback-input").type("comment");
    cy.get('[type="submit"]').click();
    cy.get("#contact_reply > h1").should(
      "have.text",
      "Thank You for your Message!"
    );
  });

  it("Should not be able to submit a successful submission via contact us form as all fields are mandatory", () => {
    // cy.visit("https://www.webdriveruniversity.com/Contact-Us/contactus.html");
    cy.visit("https://www.webdriveruniversity.com/");
    cy.get("#contact-us").invoke("removeAttr", "target").click({ force: true });
    cy.get('[name="first_name"]').type("Istvan");
    cy.get('[name="last_name"]').type("Danko");
    cy.get("textarea.feedback-input").type("comment");
    cy.get('[type="submit"]').click();
    cy.get("body").contains("Error: all fields are required");
  });
});
