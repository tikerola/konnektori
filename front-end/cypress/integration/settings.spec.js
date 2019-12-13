/* eslint-disable no-undef */


describe('can hide and erase profile', function () {

  before(function () {
    
    cy.visit('http://localhost:3000')

    cy.get('#login-username')
      .type('timo')

    cy.get('#password')
      .type('123456')

    cy.get('#login')
      .click()

  })

  it('can hide profile', function () {
    cy.contains('Search')
      .click()

    cy.wait(2000)

    cy.get('#search1')
      .click()

    cy.contains('hanna')

    cy.get('#logout')
      .click()

    cy.get('#login-username')
      .type('hanna')

    cy.get('#password')
      .type('123456')

    cy.get('#login')
      .click()

    cy.contains('Settings')
      .click()

    cy.get('#settings-hide')
      .click()

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

    cy.get('#search1')
      .click()

    cy.contains('hanna').should('not.exist')

    cy.get('#logout')
      .click()

  })

  it('can erase profile', function () {
    cy.get('#login-username')
      .type('hanna')

    cy.get('#password')
      .type('123456')

    cy.get('#login')
      .click()

    cy.contains('Settings')
      .click()

    cy.contains('Erase Profile')
      .click()

    cy.get('#erase-button')
      .click()

    cy.get('#login-username')
      .type('hanna')

    cy.get('#password')
      .type('123456')

    cy.get('#login')
      .click()

    cy.contains('Wrong username')
  })

  after(function () {
    
    cy.request('POST', 'http://localhost:3000/api/user/signup', { username: 'hanna', gender: 'female', age: 51, birthday: '04041968', password: '123456'})
    
  })

})