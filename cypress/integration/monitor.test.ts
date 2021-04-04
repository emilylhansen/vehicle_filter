/// <reference types="cypress" />

describe("vehicle filter app is running", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Visit the app and reload it correctly", () => {
    cy.get("[data-cy=filter-list-header]")
      .contains("Filter")
      .get("[data-cy=filter-list]")
      .children()
      .should("have.length", 5);

    cy.get("[data-cy=search-filter").contains("Search");

    cy.get("[data-cy=reset-filter").contains("Reset");

    cy.get("[data-cy=results-found-count").contains("23 Results Found");
  });

  it("Reset the filter to show all results", () => {
    cy.openCustomerList().toggleFirstListItem(0).clickReset();
  });

  it("Search and filter customers list", () => {
    cy.openCustomerList()
      .get("[data-cy=search-input]")
      .type("Grustransporter")
      .get(".collapsible-list")
      .first()
      .children()
      .should("have.length", 1);
  });

  it("Select and deselect Customer list items", () => {
    cy.openCustomerList().toggleFirstListItem(0);
  });

  it("Select and deselect Status list items", () => {
    cy.openStatusList().toggleFirstListItem(1);
  });

  it("Filter vehicles results based on filter selections", () => {
    cy.openCustomerList()
      .toggleFirstListItem(0)
      .clickSearch()
      .checkResultsFound(22);
  });
});
