/// <reference types="Cypress" />>

describe("Alias and invoke", () => {
  it("Validate a specific hair care product", () => {
    cy.visit("https://www.automationteststore.com/");
    cy.get('a[href*="product/category&path="]').contains("Hair Care").click();

    cy.get(".fixed_wrapper .prdocutname")
      .eq(0)
      .invoke("text")
      .as("productThumbnail");

    cy.get("@productThumbnail").its("length").should("be.gt", 5);
    cy.get("@productThumbnail").should("include", "Seaweed Conditioner");
  });

  it("Validate number of thumbnails and add to cart title", () => {
    cy.visit("https://www.automationteststore.com/");
    cy.get(".thumbnail").its("length").should("eq", 16);

    cy.get(".thumbnail .productcart").invoke("attr", "title").as("addToBasket");
    cy.get("@addToBasket").should("eq", "Add to Cart");
  });

  it("Validate number of thumbnails and add to cart title SOLUTION", () => {
    cy.visit("https://www.automationteststore.com/");
    cy.get(".thumbnail").as("productThumbnail");
    cy.get("@productThumbnail").should("have.length", 16);

    cy.get("@productThumbnail")
      .find(".productcart")
      .invoke("attr", "title")
      .should("include", "Add to Cart");
  });

  it.only("Calculate total of normal and sale products", () => {
    cy.visit("https://www.automationteststore.com/");
    cy.get(".thumbnail").as("productThumbnail");
    // cy.get("@productThumbnail")
    //   .find(".oneprice")
    //   .each(($el, index, $list) => {
    //     $el.text();
    //   });
    cy.get("@productThumbnail")
      .find(".oneprice")
      .invoke("text")
      .as("itemPrice");
    cy.get("@productThumbnail")
      .find(".pricenew")
      .invoke("text")
      .as("saleItemPrice");

    var itemsTotal = 0;
    cy.get("@itemPrice").then(($linktext) => {
      var itemsPriceTotal = 0;
      var itemPrice = $linktext.split("$");
      var i;
      for (i = 0; i < itemPrice.length; i++) {
        cy.log(itemPrice[i]);
        itemsPriceTotal += Number(itemPrice[i]);
      }
      itemsTotal += itemsPriceTotal;
      cy.log("The total price of all non sale products: " + itemsPriceTotal);
    });

    cy.get("@saleItemPrice")
      .then(($newLinktext) => {
        var saleItemsPriceTotal = 0;
        var saleItemPrice = $newLinktext.split("$");
        var i;
        for (i = 0; i < saleItemPrice.length; i++) {
          cy.log(saleItemPrice[i]);
          saleItemsPriceTotal += Number(saleItemPrice[i]);
        }
        itemsTotal += saleItemsPriceTotal;
        cy.log("The total price of all sale products: " + saleItemsPriceTotal);
      })
      .then(() => {
        cy.log("The total price of all products: " + itemsTotal);
        expect(itemsTotal).to.equal(660.5);
      });
    cy.log("The total price of all products outside: " + itemsTotal); /// why??????? mar megvan az infoja nem? A logokba ultoljara van logolva ez is
  });
});
