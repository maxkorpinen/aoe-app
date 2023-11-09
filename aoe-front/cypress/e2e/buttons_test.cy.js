describe('backend test tests', () => {
  it('mainpage buttons exist', () => {
    cy.visit('http://localhost:3001')
    cy.contains('Start over')
    cy.contains('Analyse with chosen specs')
    cy.contains('Login or create new user')
    //cy.task('log', 'LOKIHOMMA: '+process.env.NODE_ENV)
    //cy.task('log', 'REACT_APP_BACKEND_URL_DEV: '+process.env.REACT_APP_BACKEND_URL_DEV)
  })
})

describe('unlogged tests', () => {

  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.wait(200)
  })

  it('mainpage buttons exist', () => {
    cy.contains('Start over')
    cy.contains('Analyse with chosen specs')
    cy.contains('Login or create new user')
  })

  it('mainpage civ clicks & start over', () =>{
    cy.get('[alt="britons.webp"]').click()
    cy.wait(400)
    cy.contains('Analyse with chosen specs').click()
    cy.wait(400)
    cy.contains('Coreunit: archer')
    cy.contains('Counters to your powerunit')
    cy.wait(400)
    cy.contains('Start over').click()
    cy.wait(250)
    cy.get('[alt="britons.webp"]')
  })

  it('civclicks both', () => {
    cy.get('[alt="britons.webp"]').click()
    cy.wait(200)
    cy.get('[alt="franks.webp"]').click()
    cy.contains('Winpct')
    cy.contains('Your core unit')
    cy.contains('Opp core unit')
  })
})

describe('logged in tests', () => {

  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.contains('Login or create new user').click()
    cy.wait(200)
    cy.get('input:first').type('reub')
    cy.get('[name="Password"]').first().type('123123')
    cy.contains('login').click()
    cy.wait(300)
  })

  it('one civ analysis', () => {
    cy.get('[alt="britons.webp"]').click()
    cy.wait(100)
    cy.contains('Analyse with chosen specs').click()
    cy.contains('Coreunit')
    cy.contains('Counters to your powerunit')
  })

  it('two civ analysis', () => {
    cy.get('[alt="britons.webp"]').click()
    cy.wait(150)
    cy.get('[alt="mayans.webp"]').click()
    cy.wait(150)
    cy.contains('Your core unit')
    cy.contains('Opp core unit')
  })
})

describe('login & logout & userinfo', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })
  it('Logintest', () => {
    //cy.visit('http://localhost:3000')
    //cy.get('[data-cy="goths.webp"]').click()
    cy.contains('Login or create new user').click()
    cy.get('input:first').type('reub')
    cy.get('[name="Password"]').first().type('123123')
    cy.contains('login').click()
    cy.wait(100)
    cy.contains('Userinfo').click()
    cy.contains('Favourite civilization') 
    cy.contains('Currently logged in as: reub')
    cy.contains('Logout').click()
    cy.wait(100)
    cy.contains('Login or create new user')
  })
})