/* eslint-disable no-undef */

describe('signup', function() {

  beforeEach(function() {
    cy.request('DELETE','http://localhost:3000/developer')
  })

  it('should manage to signup and login a new user', function() {

    cy.visit('http://localhost:3000')
    cy.contains('Register here')
    .click()

    cy.get('#username')
    .type('tomi')

    cy.get('#select-gender')
    .click()

    cy.contains('Male')
    .click()

    cy.get('#birthday')
    .type('1968-04-04')

    cy.get('#password')
    .type('123456')

    cy.get('#confirm')
    .type('123456')

    cy.contains('Submit')
    .click()

    cy.get('#login-username')
    .type('tomi')

    cy.get('#password')
    .type('123456')

    cy.get('#login')
    .click()

  })

  after(function () {

    cy.get('#logout')
      .click()

  })

})