/// <reference types="Cypress" />

context('Open', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:8080/src/example/index.html')
    })

    it('Can open content modal', () => {
        cy.get('a.rkd-modal').click();
        cy.get('.modal-inner:last').should('be.visible');
    })

    it('Can open this modal', () => {
        cy.get('a.rkd-modal-this').click();
        cy.get('.modal-inner:last').should('be.visible');
    })

    it('Can open ajax modal', () => {
        cy.get('a.rkd-modal-ajax').click();
        cy.get('.modal-inner:last').should('be.visible');
    })
})
