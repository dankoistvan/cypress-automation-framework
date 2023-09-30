/// <reference types="Cypress" />>

describe("Verify Autocomplete dropdown lists via webdriveruni", () => {
  it("Select specific product via autocomplete list", () => {
    cy.visit("https://www.webdriveruniversity.com/");
    cy.get("#autocomplete-textfield")
      .invoke("removeAttr", "target")
      .click({ force: true });
    cy.get("#myInput").as("inputField");
    cy.get("@inputField").type("A");
    cy.get("#myInputautocomplete-list > *").as("suggestionList");
    cy.get("#submit-button").as("submit-button");

    cy.get("@suggestionList")
      .each(($el, index, $list) => {
        const product = $el.text();
        const productToSelect = "Avacado";

        if (product === productToSelect) {
          //   $el.click(); ---- deprecated
          $el.trigger("click");

          cy.get("@submit-button").click();
          cy.url().should("include", productToSelect);
        }
      })
      .then(() => {
        cy.get("@inputField").type("G");
        cy.get("@suggestionList").each(($el, index, $list) => {
          const product = $el.text();
          const productToSelect = "Grapes";

          if (product === productToSelect) {
            //   $el.click(); ---- deprecated
            $el.trigger("click");

            cy.get("@submit-button").click();
            cy.url().should("include", productToSelect);
          }
        });
      });
  });
});
