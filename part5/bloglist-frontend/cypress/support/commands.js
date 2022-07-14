// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (user, pass) => {
  cy.contains('log in to application')
  cy.get('#username').type(user)
  cy.get('#password').type(pass)
  cy.get('#login-button').click()
})

// @brief   create blog & check its in list
// @note    expects form to be open at start
Cypress.Commands.add('addBlog', (title, author, url) => {
  // set info
  cy.get('#formTitle').type(title)
  cy.get('#formAuthor').type(author)
  cy.get('#formUrl').type(url)

  cy.get('#formAddButton').click()

  cy.contains(`a new blog ${title} by ${author} added`)

  cy.get('.bloglist')
    .should('contain', title)
    .and('contain', author)
})

// @brief   like a blog & check like count increased
// @note    expects the blog info to be open
Cypress.Commands.add('likeBlog', (title, likes) => {
  cy.get('.blogTitle').contains(title).parent().find('.likesInfo').contains(`likes ${likes}`)
  cy.get('.blogTitle').contains(title).parent().find('.likeButton').click()
  cy.get('.blogTitle').contains(title).parent().find('.likesInfo').contains(`likes ${likes + 1}`)
})

// @brief   remove a blog from the list
// @note    expects only one blog to be in list
Cypress.Commands.add('removeBlog', (title, author) => {
  cy.get('.bloglist')
    .should('contain', title)
    .and('contain', author)

  cy.get('.viewButton').click()
  cy.get('.removeButton').click()
  cy.get('.info')
    .should('contain', 'Blog was succesfully deleted')
})

Cypress.Commands.add('cantRemoveBlog', (title, author) => {
  cy.get('.bloglist')
    .should('contain', title)
    .and('contain', author)

  cy.get('.viewButton').click()
  cy.contains('.removeButton').should('not.exist')
})

// @brief   logs the current user out and waits for login page
// @note    expects user to be logged in
Cypress.Commands.add('logout', () => {
  cy.get('#mainLogout').click()
  cy.contains('log in to application')
})
