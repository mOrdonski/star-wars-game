describe('PeopleComponent', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('span').contains('Species').click();
  });

  it('should display two random people cards when Play button is clicked', () => {
    cy.get('button').contains('Play').click();
    cy.get('.cards-container').should('be.visible');
  });

  it('should update scores when Play button is clicked', () => {
    cy.get('button').contains('Play').click();
    cy.get('.score').should('be.visible');
  });

  it('should reset scores when Reset score button is clicked', () => {
    cy.get('button').contains('Play').click();
    cy.get('.score').should('be.visible');
    cy.get('button').contains('Reset score').click();
    cy.get('.score > p').should('not.exist');
  });
});
