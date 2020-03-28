/// <reference types="cypress" />

context('Home Page', () => {
    beforeEach(() => {
        cy.server();
        cy.route('GET', '/', 'fixture:books').as('books');
        cy.visit('/')
    });

    it('should list book shelf titles', () => {
        const shelves = ["Currently Reading", "Want To Read", "Read"];
        cy.get('.list-books-title').then ($list => {
            expect($list.length).to.equal(3);
            for (let i = 0; i < $list.length; i++) {
                expect($list.eq(i).text()).to.equal(shelves[i])
            }
        });
    });

    it('should find the search button and link', () => {
        cy.get('.open-search').contains('Add a book');
        cy.get('a').eq(0).should('have.attr', 'href').and('eq', '/search');
    });

    it('should find the dropdown for changing the bookshelf', () => {
        cy.get('select').eq(0).should('contain', 'Currently Reading');
    })
});