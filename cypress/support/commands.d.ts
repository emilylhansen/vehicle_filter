declare namespace Cypress {
  interface Chainable {
    clickReset(): Chainable;
    clickSearch(): Chainable;
    openCustomerList(): Chainable;
    openStatusList(): Chainable;
    clickFirstListItem(collapsibleIndex: number): Chainable;
    toggleFirstListItem(collapsibleIndex: number): Chainable;
    checkResultsFound(resultsCount: number): Chainable;
  }
}
