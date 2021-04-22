/// <reference types="cypress" />

// describe("My First Test", () => {
//   it("Clicks the link 'type'", () => {
//     cy.visit("https://example.cypress.io");
//     cy.contains("type").click();

//     // Should be on a new URL which includes '/commands/actions'
//     cy.url().should("include", "/commands/actions");

//     // Get an input, type into it and verify that the value has been updated
//     cy.get(".action-email")
//       .type("fake@email.com")
//       .should("have.value", "fake@email.com");
//   });
// });

describe("Future Value", () => {
  it("simply calculates future value", () => {
    cy.visit("/");

    cy.get("input[name='initialAmount']").clear().type("10000");
    cy.get("input[name='interestRate']").clear().type("2");
    cy.get("input[name='periods']").clear().type("5");
    cy.get("button[type='submit']").click();

    cy.url().should(
      "include",
      "/result/future-value?initialAmount=10000&interestRate=2&periods=5"
    );
    cy.get("h1").contains("11040.81");

    cy.contains("Go Home").click();
    cy.url()
      .should(
        "not.include",
        "/result/future-value?initialAmount=10000&interestRate=2&periods=5"
      )
      .should("eq", "http://localhost:3000/");
  });

  it("shows form inputs required erros when empty", () => {
    cy.visit("/");

    cy.get("input[name='initialAmount']").clear();
    cy.get("input[name='interestRate']").clear();
    cy.get("input[name='periods']").clear();
    cy.get("button[type='submit']").click();

    cy.url()
      .should("not.include", "/result/future-value")
      .should("eq", "http://localhost:3000/");

    cy.contains("Initial amount is required");
    cy.contains("Interest rate is required");
    cy.contains("Periods is required");
  });

  it("shows form inputs erros for negative numbers", () => {
    cy.visit("/");

    cy.get("input[name='initialAmount']").clear().type("-1");
    cy.get("input[name='interestRate']").clear().type("-1");
    cy.get("input[name='periods']").clear().type("-1");
    cy.get("button[type='submit']").click();

    cy.contains("Initial amount should be positive");
    cy.contains("Interest rate should be positive");
    cy.contains("Periods should be positive");
  });
});
