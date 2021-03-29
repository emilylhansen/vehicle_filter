/// <reference types="cypress" />

Cypress.Commands.add("clickSearch", () => {
  cy.get("[data-cy=search-filter]").click();
});

Cypress.Commands.add("clickReset", () => {
  cy.get("[data-cy=reset-filter]")
    .click()
    .get("[data-cy=results-found-count")
    .contains("23 Results Found");
});

Cypress.Commands.add("openCustomerList", () => {
  cy.get("[data-cy=collapsible").first().contains("Customer").click();
});

Cypress.Commands.add("openStatusList", () => {
  cy.get("[data-cy=collapsible").eq(1).contains("Status").click();
});

Cypress.Commands.add("clickFirstListItem", (collapsibleIndex: number) => {
  cy.get("[data-cy=collapsible")
    .eq(collapsibleIndex)
    .within(() => {
      cy.get("[data-cy=collapsible-list-item]")
        .first()
        .within(() => {
          cy.get("input").click();
        });
    });
});

Cypress.Commands.add("toggleFirstListItem", (collapsibleIndex: number) => {
  cy.clickFirstListItem(collapsibleIndex)
    .clickFirstListItem(collapsibleIndex)
    .clickFirstListItem(collapsibleIndex);
});

Cypress.Commands.add("checkResultsFound", (resultsCount: number) => {
  cy.get("[data-cy=results-found-count").contains(
    `${resultsCount} Results Found`
  );
});
