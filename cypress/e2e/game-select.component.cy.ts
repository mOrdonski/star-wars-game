describe('Mat Tab Group Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display Peoples tab content when active', () => {
    cy.get('#mat-tab-label-0-0 > span.mdc-tab__content > span').click();
    cy.get('app-people').should('be.visible');
  });

  it('should display Starships tab content when active', () => {
    cy.get('#mat-tab-label-0-1 > span.mdc-tab__content > span').click();
    cy.get('app-starship').should('be.visible');
  });

  it('should display Species tab content when active', () => {
    cy.get('#mat-tab-label-0-2 > span.mdc-tab__content > span').click();
    cy.get('app-species').should('be.visible');
  });

  it('should display Planets tab content when active', () => {
    cy.get('#mat-tab-label-0-3 > span.mdc-tab__content > span').click();
    cy.get('app-planet').should('be.visible');
  });
});
