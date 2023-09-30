/// <reference types="Cypress" />>

describe("Verifying variables, cypress commands and JQuery commands", () => {
  it("Navigating to specific product pages", () => {
    cy.visit("https://www.automationteststore.com/");

    // // The following will fail
    // const makeUpLink = cy
    //   .get('a[href*="product/category&path="]')
    //   .contains("Makeup");
    // const skincareLink = cy
    //   .get('a[href*="product/category&path="]')
    //   .contains("Skincare");

    // makeUpLink.click();
    // skincareLink.click();

    // // The following will pass
    // const makeUpLink = cy
    //   .get('a[href*="product/category&path="]')
    //   .contains("Makeup");
    // makeUpLink.click();

    // const skincareLink = cy
    //   .get('a[href*="product/category&path="]')
    //   .contains("Skincare");
    // skincareLink.click();

    // Recommended Approach
    cy.get('a[href*="product/category&path="]').contains("Makeup").click();
    cy.get('a[href*="product/category&path="]').contains("Skincare").click();
  });

  it("Navigating to specific product pages", () => {
    cy.visit("https://www.automationteststore.com/");
    cy.get('a[href*="product/category&path="]').contains("Makeup").click();

    // // Following code will fail
    // const header = cy.get("h1 .maintext");
    // cy.log(header);

    cy.get("h1 .maintext").then(($headerText) => {
      const headerText = $headerText.text();
      cy.log("Found the header text: " + headerText);
      expect(headerText).is.eq("Makeup");
    });
  });

  it("Validate properties of the Contact Us Page", () => {
    cy.visit("https://automationteststore.com/index.php?rt=content/contact");

    //Uses cypress commands and chaining
    cy.contains("#ContactUsFrm", "Contact Us Form")
      .find("#field_11")
      .should("contain", "First name");
    //JQuery approach
    cy.contains("#ContactUsFrm", "Contact Us Form").then((text) => {
      const firstNameText = text.find("#field_11").text();
      expect(firstNameText).should("contains", "First name");
      //Embeded commands (Closure)
      cy.get("#field_11").then((fnText) => {
        cy.log(fnText.text());
      });
    });
    //Embeded commands (Closure)
  });
});
