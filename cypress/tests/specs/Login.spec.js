const {
  loginPageConstants,
  loginWithCredentials,
  verifyNoLoginError,
  verifyLoginError,
} = require("../Pages/LoginPage");

const uuid = () => Cypress._.random(0, 1e6);
const RANDOM_ID = uuid();

describe("Form Interaction", { defaultCommandTimeout: 5000 }, () => {
  beforeEach("Open the login page", () => {
    cy.visit("/", { timeout: 5000 });
  });

  after("wait", () => {
    cy.wait(100);
  });

  it("should show error when login by a locked user", () => {
    loginWithCredentials(
      loginPageConstants.LOCKED_USER,
      loginPageConstants.VALID_PASSWORD
    );
    verifyLoginError(loginPageConstants.ERROR_LOCKED_USER_MSG);

    cy.get(".error-button").click();
    verifyNoLoginError();
  });

  it("should show error when login by a incorrect user", () => {
    loginWithCredentials(RANDOM_ID, loginPageConstants.VALID_PASSWORD);
    verifyLoginError(loginPageConstants.ERROR_INVALID_USER_MSG);

    cy.get(".error-button").click();

    verifyNoLoginError();
  });

  it("should show error when login by a incorrect password", () => {
    loginWithCredentials(loginPageConstants.VALID_USER, RANDOM_ID);
    verifyLoginError(loginPageConstants.ERROR_INVALID_USER_MSG);

    cy.get(".error-button").click();

    verifyNoLoginError();
  });

  it("should transit to inventory page when login by a valid user/password", () => {
    loginWithCredentials(
      loginPageConstants.VALID_USER,
      loginPageConstants.VALID_PASSWORD
    );
    cy.location().should((loc) => {
      expect(loc.pathname).to.equal("/inventory.html");
    });
  });

  it("should transit to login page when logout", () => {
    loginWithCredentials(
      loginPageConstants.VALID_USER,
      loginPageConstants.VALID_PASSWORD
    );
    cy.get("#react-burger-menu-btn").click();
    cy.get("#logout_sidebar_link").click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.equal("/");
    });
  });
});
