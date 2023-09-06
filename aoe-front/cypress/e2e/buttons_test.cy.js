describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    //cy.get('[data-cy="goths.webp"]').click()
    cy.contains('Start over')
    cy.contains('Analyse with chosen specs')
  })
})