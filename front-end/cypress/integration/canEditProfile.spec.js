/* eslint-disable no-undef */


describe('can edit profile', function () {

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

  it('can edit profile text', function () {
    cy.contains('Edit Profile Text')
    .click()

    cy.get('#profile-text')
    .clear()
    .type('Voisin olla miesmalli halutessani')

    cy.contains('Send')
    .click()

    cy.contains('Voisin olla miesmalli halutessani')

  })

  it('can open and close add profile picture -modal', function () {
    cy.contains('Add Image')
    .click()

    cy.contains('Upload File')

    cy.get('#close-icon')
    .click()

    cy.contains('Upload File').should('not.exist')

  })

  after(function() {
    cy.get('#logout')
    .click()
  })

})