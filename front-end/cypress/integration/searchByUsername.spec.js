/* eslint-disable no-undef */


describe('search profile by username and by age and gender', function () {

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

  it('should find a profile by username', function () {
    cy.contains('Search')
      .click()

    cy.get('#search-input')
      .type('hanna')

    cy.get('#search2')
      .click()

    cy.contains('hanna')


  })

  it('should find a profile by age and gender', function () {
    cy.contains('Search')
      .click()

    // cy.get('input').first()
    // .click({ force: true })
    // .type('50, 60', { force: true })

    cy.get('#age-slider')
      .trigger('mousedown')
      .trigger('mousemove', { clientX: 120, clientY: 100 })
      .trigger('mouseup')

    cy.get('#search1')
      .click()

    cy.contains('hanna')
  })


})