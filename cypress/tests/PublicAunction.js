describe("Test public aunction", () => {
  const filterName = "Truck";
  let filterQuantity;

  beforeEach("Access public aunction", () => {
    cy.visit("https://publicauction.manheim.com/locations/KEYA#/results");
    cy.location("href", { timeout: 20000 }).should("contain", "results/");
    cy.get('[data-test-id="matching-number"]');

    //get SUV filterQuantity
    cy.get(`[data-test-id=${filterName}]`)
      .siblings(".facet-value")
      .invoke("text")
      .then((facetValue) => {
        filterQuantity = facetValue.slice(1, -1);
      });
  });

  it("should filter only SUV type", () => {
    cy.get(`[data-test-id=${filterName}]`).click();

    // Compare by contain
    cy.get('[data-test-id="matching-number"]', { timeout: 20000 }).should(
      "contain",
      filterQuantity
    );

    // Compare by function
    cy.get('[data-test-id="matching-number"]')
      .invoke("text")
      .then((currentVehicleMatching) =>
        expect(currentVehicleMatching).to.equal(filterQuantity)
      );

    //comnpare direct by invoke should
    cy.get('[data-test-id="matching-number"]')
      .invoke("text")
      .should("equal", filterQuantity);
  });

  it("should clear all filter", () => {
    cy.get('[data-test-id="clear-all]').click;
  });
});
