/* eslint-disable no-undef */


describe('add profile to favorites', function () {

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

  it('add profile to favorites', function () {
    cy.contains('Search')
      .click()

    cy.get('#search-input')
      .type('hanna')

    cy.get('#search2')
      .click()

    cy.contains('Favorite')
      .click()

    cy.contains('Search')
      .click()

    cy.contains('Your Favorites')

    cy.contains('hanna')
      .click()

    cy.contains('Favorited')
      .click()

    cy.contains('Favorite')

  })

  after(function () {
    cy.get('#logout')
      .click()
  })

})