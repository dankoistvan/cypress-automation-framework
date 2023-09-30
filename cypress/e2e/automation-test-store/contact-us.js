/// <reference types="Cypress" />>

describe("Test Contact Us form via Automation Test Store", () => {
  it("Should be able to submit a successful submission via contact us form", () => {
    cy.visit("https://www.automationteststore.com/");
    cy.get('a[href$="contact"]')
      .click()
      .then(function (linkDetails) {
        cy.log(
          "This is the text for the link of the section: " + linkDetails.text()
        );
      });
    // cy.xpath('//a[contains(@href, "contact")]').click();
    cy.get("#ContactUsFrm_first_name").type("Istvan");
    cy.get("#ContactUsFrm_email").type("test@email.com");
    cy.get("#ContactUsFrm_email").should("have.attr", "name", "email");
    cy.get("#ContactUsFrm_enquiry").type("This is a question written");
    cy.get('button[title="Submit"]').click();
    cy.get(".mb40 > p:not(p:empty)").should(
      "have.text",
      "Your enquiry has been successfully sent to the store owner!"
    );
    cy.log("Test has finished");
  });
});
