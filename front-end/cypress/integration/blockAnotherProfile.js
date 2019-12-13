/* eslint-disable no-undef */


describe('block profile', function () {

  before(function () {
    cy.request('DELETE', 'http://localhost:3000/developer')
    cy.visit('http://localhost:3000')

    cy.get('#login-username')
      .type('timo')

    cy.get('#password')
      .type('123456')

    cy.get('#login')
      .click()

  })

  it('block profile', function () {
    cy.contains('Search')
      .click()

    cy.get('#search-input')
      .type('hanna')

    cy.get('#search2')
      .click()

    cy.contains('Block')
      .click()

    cy.contains('Blocked')

    cy.get('#logout')
      .click()

    cy.get('#login-username')
      .type('hanna')

    cy.get('#password')
      .type('123456')

    cy.get('#login')
      .click()

    cy.contains('Search')
      .click()

    cy.get('#search-input')
      .type('timo')

    cy.get('#search2')
      .click()

    cy.contains('No such username')

  })

  after(function () {

    cy.get('#logout')
      .click()

    cy.get('#login-username')
      .type('timo')

    cy.get('#password')
      .type('123456')

    cy.get('#login')
      .click()

    cy.contains('Search')
      .click()

    cy.get('#search-input')
      .type('hanna')

    cy.get('#search2')
      .click()

    cy.contains('Blocked')
      .click()

    cy.get('#logout')
      .click()
  })

})