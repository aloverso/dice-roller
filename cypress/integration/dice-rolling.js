describe("Dice Rolling", () => {
  it("rolls dice and sees results", () => {
    cy.visit("/");
    // cy.injectAxe();
    // cy.checkA11y();

    cy.get('button[title="increment"]').click();
    cy.get('button[title="increment"]').click();
    cy.get('button[title="increment"]').click();
    cy.get('img[alt="d6"]').click();

    cy.contains("1 + 2 + 3 + 4").should("exist");

    cy.contains("10").should("exist");

    cy.contains("roll history").click();
    // cy.injectAxe();
    // cy.checkA11y();

    cy.contains("4d6").should("exist");
    cy.contains("10").should("exist");
  });
});
