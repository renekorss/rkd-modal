/// <reference types="Cypress" />

context('Close', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:8080/src/example/index.html')
    })

    it('Can close modal with X', () => {
        cy.get('a.rkd-modal').click();
        cy.get('.modal-inner:last .modal-close').should('be.visible');
        cy.get('.modal-inner:last .modal-close').click();
        cy.get('.modal-inner:last').should('not.be.visible');
    })

    it('Can close modal with ESC key', () => {
        window.rkdModal = {};

        cy.window().then((win) => {
            win.rkdModal = {};
        })

        // By default
        cy.get('a.rkd-modal').click();
        cy.get('body').type('{esc}');
        cy.get('.modal-inner:last').should('not.be.visible');

        // Disable esc key and click it
        cy.window().then((win) => {
            win.rkdModal.escKey = false;
        })
        cy.get('a.rkd-modal').click();
        cy.get('body').type('{esc}');
        cy.get('.modal-inner:last').should('be.visible');

        // Close it to reset
        cy.get('.modal-inner:last .modal-close').click();

        // Enable esc key and click it
        cy.window().then((win) => {
            win.rkdModal.escKey = true;
        })
        cy.get('a.rkd-modal').click();
        cy.get('body').type('{esc}');
        cy.get('.modal-inner:last').should('not.be.visible');
    })

    it('Can close modal with background click', () => {
        cy.window().then((win) => {
            win.rkdModal = {};
        })

        cy.get('a.rkd-modal').click();

        // By default
        cy.get('.modal-fade-screen:visible').click('topRight');
        cy.get('.modal-inner:last').should('not.be.visible');

        cy.get('a.rkd-modal').click();

        // Disable background click closing and click it
        cy.window().then((win) => {
            win.rkdModal.backgroundClickClose = false;
        })
        cy.get('.modal-fade-screen:visible').click('topRight');
        cy.get('.modal-inner:last').should('be.visible');

        // Enable background click closing and click it
        cy.window().then((win) => {
            win.rkdModal.backgroundClickClose = true;
        })
        cy.get('.modal-fade-screen:visible').click('topRight');
        cy.get('.modal-inner:last').should('not.be.visible');
    })
})
