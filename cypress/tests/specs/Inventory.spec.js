const { loginWithValidUser } = require("../Pages/LoginPage");
const PROD_SORT_SEL = "[data-test='product_sort_container']";

describe("When go to the inventory page", () => {
  beforeEach("Login to inventory page", () => {
    loginWithValidUser();
  });

  context("The sort function", () => {
    const SORT_OPTIONS_TEXT = [
      "Name (A to Z)",
      "Name (Z to A)",
      "Price (low to high)",
      "Price (high to low)",
    ];

    const SORT_OPTIONS_VALUE = ["az", "za", "lohi", "hilo"];

    it("should include 4 sort options", () => {
      cy.get(PROD_SORT_SEL)
        .find("option")
        .each((option, index) => {
          expect(option.text()).to.equal(SORT_OPTIONS_TEXT[index]);
          expect(option.val()).to.equal(SORT_OPTIONS_VALUE[index]);
        });
    });

    it('should default as "Name (A to Z)"', () => {
      cy.get(PROD_SORT_SEL)
        .siblings(".active_option")
        .invoke("text")
        .should("equal", SORT_OPTIONS_TEXT[0]);

      cy.get(PROD_SORT_SEL).invoke("val").should("equal", "az");
      cy.get(PROD_SORT_SEL)
        .children("option:selected")
        .invoke("text")
        .should("equal", SORT_OPTIONS_TEXT[0]);

      cy.get("select option:selected")
        .invoke("text")
        .should("equal", SORT_OPTIONS_TEXT[0]);
      cy.get(PROD_SORT_SEL).select(2);
      cy.get(PROD_SORT_SEL).select(SORT_OPTIONS_TEXT[2]);
      cy.get(PROD_SORT_SEL).select(SORT_OPTIONS_TEXT[1]);
    });
  });
});
