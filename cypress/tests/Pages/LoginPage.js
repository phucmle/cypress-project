export const loginPageConstants = {
  VALID_USER: "standard_user",
  VALID_PASSWORD: "secret_sauce",
  LOCKED_USER: "locked_out_user",
  PROBLEM_USER: "problem_user",
  PERFORMANCE_GLITCH_USER: "performance_glitch_user",
  ERROR_LOCKED_USER_MSG: "Epic sadface: Sorry, this user has been locked out.",
  ERROR_INVALID_USER_MSG:
    "Epic sadface: Username and password do not match any user in this service",
};

export function loginWithCredentials(user, password) {
  cy.get("#user-name").type(user);
  cy.get("[data-test='password']").type(password);
  cy.get("input").contains("Login").click();
}

export function verifyNoLoginError() {
  cy.get('[data-test="error"]').should("not.exist");
  cy.get("#user-name").siblings("[class*='error_icon']").should("not.exist");
  cy.get("[data-test='password']")
    .siblings("[class*='error_icon']")
    .should("not.exist");
}

export function verifyLoginError(errorMsg) {
  cy.get('[data-test="error"]').invoke("text").should("equal", errorMsg);
  cy.get("#user-name").siblings("[class*='error_icon']").should("exist");
  cy.get("[data-test='password']")
    .siblings("[class*='error_icon']")
    .should("exist");
}

export function loginWithValidUser() {
  cy.visit("/");
  cy.get("#user-name").type(loginPageConstants.VALID_USER);
  cy.get("[data-test='password']").type(loginPageConstants.VALID_PASSWORD);
  cy.get("input").contains("Login").click();
}
