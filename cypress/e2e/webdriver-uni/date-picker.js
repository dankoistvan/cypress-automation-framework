/// <reference types="Cypress" />
describe("Test datepicker via webdriveruni", () => {
  beforeEach(() => {
    cy.visit("http://webdriveruniversity.com/");
    cy.get("#datepicker").invoke("removeAttr", "target").click({ force: true });
  });
  it("Select date from datepicker", () => {
    //   let date = new Date();
    //   date.setDate(date.getDate()); // get current day
    //   cy.log(date.getDate());

    //   let date2 = new Date();
    //   date2.setDate(date2.getDate() + 5);
    //   cy.log(date2.getDate());
    cy.get("#datepicker").click();
    var date = new Date();
    date.setDate(date.getDate() + 13);

    var futureYear = date.getFullYear();
    var futureMonth = date.toLocaleString("default", { month: "long" });
    var futureDay = date.getDate();

    cy.log("year" + futureYear);
    cy.log("month" + futureMonth);
    cy.log("day" + futureDay);

    function selectMonthAndYear() {
      cy.get(".datepicker-dropdown")
        .find(".datepicker-switch")
        .first()
        .then((currentDate) => {
          if (!currentDate.text().includes(futureYear)) {
            cy.get(".next").first().click();
            selectMonthAndYear();
          }
        })
        .then(() => {
          cy.get(".datepicker-dropdown")
            .find(".datepicker-switch")
            .first()
            .then((currentDate) => {
              if (!currentDate.text().includes(futureMonth)) {
                cy.get(".next").first().click();
                selectMonthAndYear();
              }
            });
        });
    }

    function selectFutureDay() {
      cy.get('[class="day"]').contains(futureDay).click();
    }
    selectMonthAndYear();
    selectFutureDay();
  });
});
