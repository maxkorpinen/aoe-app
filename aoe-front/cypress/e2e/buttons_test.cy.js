/* describe('backend test tests', () => {
  it('mainpage buttons exist', () => {
    cy.visit('http://localhost:3001')
    cy.wait(500)
    cy.contains('Start over')
    cy.contains('Analyse with chosen specs')
    cy.contains('Login or create new user')
    //cy.task('log', 'LOKIHOMMA: '+process.env.NODE_ENV)
    //cy.task('log', 'REACT_APP_BACKEND_URL_DEV: '+process.env.REACT_APP_BACKEND_URL_DEV)
  })
}) */

describe('unlogged tests', () => {

  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.wait(200)
  })

  it('mainpage topbar buttons exist', () => {
    cy.contains('Start over')
  })

  it('civbuttons exist', () => {
    cy.get('[alt="Ethiopians"]')
    cy.get('[alt="Franks"]')
  })

})

/* describe('logged in tests', () => {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'reub',
      password: '123123'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.wait(500)
    cy.visit('http://localhost:3000')
    cy.wait(500)
    cy.contains('Login or create new user').click()
    cy.wait(200)
    cy.get('input:first').type('reub')
    cy.wait(500)
    cy.get('[name="Password"]').first().type('123123')
    cy.wait(500)
    cy.contains('login').click()
    cy.wait(300)
  })

  it('civbuttons exist after logging', () => {
    cy.get('[alt="Britons"]')
    cy.get('[alt="Franks"]')
  })

  it('one civ analysis, logged in', () => {
    cy.wait(500)
    cy.get('[alt="Britons"]').click()
    cy.wait(500)
    cy.contains('Analyse with chosen specs').click()
    cy.wait(1000)
    cy.contains('Coreunit')
    cy.contains('Counters to your powerunit')
  })
 
   it('favciv changes correctly', () => {
    cy.wait(500)
    cy.contains('Userinfo').click()
    cy.wait(500)
    cy.get('[alt="Britons"]').click()
    cy.contains('Favourite civilization: britons')
    cy.wait(500)
    cy.get('[alt="goths.webp"]').click()
    cy.wait(500)
    cy.contains('Favourite civilization: goths')
  })

}) */
/* 
  it('favciv changes correctly', () => {
    cy.wait(500)
    cy.contains('Userinfo').click()
    cy.wait(500)
    cy.get('[alt="Britons"]').click()
    cy.contains('Favourite civilization: britons')
    cy.wait(500)
    cy.get('[alt="goths.webp"]').click()
    cy.wait(500)
    cy.contains('Favourite civilization: goths')
  })

  it('one civ analysis', () => {
    cy.wait(500)
    cy.get('[alt="britons.webp"]').click()
    cy.wait(500)
    cy.contains('Analyse with chosen specs').click()
    cy.wait(1000)
    cy.contains('Coreunit')
    cy.contains('Counters to your powerunit')
  })

  it('two civ analysis', () => {
    cy.wait(500)
    cy.get('[alt="britons.webp"]').click()
    cy.wait(500)
    cy.get('[alt="mayans.webp"]').click()
    cy.wait(1000)
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

describe('unlogged, account exists', () => {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'reub',
      password: '123123'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.wait(500)
    cy.visit('http://localhost:3000')
  })

  it('attempt create existing username', () => {
    cy.wait(500)
    cy.contains('Login or create new user').click()
    cy.wait(500)
    cy.get('[name="Username"]').last().type('reub')
    cy.get('[name="Password"]').last().type('11111')
    cy.wait(200)
    cy.contains('create user').click()
    cy.wait(500)
    cy.contains('User validation failed')
  })

  it('login with non-existing account', () => {
    cy.wait(500)
    cy.contains('Login or create new user').click()
    cy.wait(500)
    cy.get('[name="Username"]').first().type('laioshdipsuahdiyuhsad')
    cy.get('[name="Password"]').first().type('not_a_password')
    cy.contains('login').click()
    cy.wait(500)
    cy.contains('wrong credentials')
  })
}) */