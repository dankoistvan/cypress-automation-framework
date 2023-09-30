/// <reference types="Cypress" />>

describe("Test mouse actions via webdriveruni", () => {
  it("Scroll element into view", () => {
    cy.visit("https://www.webdriveruniversity.com/");
    cy.get("#actions")
      .scrollIntoView()
      .invoke("removeAttr", "target")
      .click({ force: true });
  });

  it("I should be able to drag and drop a draggable item", () => {
    cy.visit("https://www.webdriveruniversity.com/");
    cy.get("#actions")
      .scrollIntoView()
      .invoke("removeAttr", "target")
      .click({ force: true });

    cy.get("#draggable").trigger("mousedown", { which: 1 });

    cy.get("#droppable")
      .trigger("mousemove", { which: 1 })
      .trigger("mouseup", { force: true });
  });

  it("I should be able to double click", () => {
    cy.visit("https://www.webdriveruniversity.com/");
    cy.get("#actions")
      .scrollIntoView()
      .invoke("removeAttr", "target")
      .click({ force: true });
    cy.get("#double-click").dblclick();
  });

  it("I should be able to hold down the left mouse click button on a given element", () => {
    cy.visit("https://www.webdriveruniversity.com/");
    cy.get("#actions")
      .scrollIntoView()
      .invoke("removeAttr", "target")
      .click({ force: true });
    cy.get("#click-box")
      .trigger("mousedown", { which: 1 })
      .then(($element) => {
        expect($element).to.have.css("background-color", "rgb(0, 255, 0)");
      });
  });
});
