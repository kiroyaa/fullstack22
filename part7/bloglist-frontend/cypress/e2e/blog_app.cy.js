describe('Blog app', function() {

  const user = {
    name: 'Joel Helkala',
    username: 'mehukatti',
    password: 'salainen'
  }

  const blog = {
    title: 'test title',
    author: 'Tester',
    url: 'test.com',
    likes: 0
  }

  const blog2 = {
    title: 'kulkeeko posti',
    author: 'martti',
    url: 'posti.com',
    likes: 0
  }

  const blog3 = {
    title: 'nouseeko rauta',
    author: 'arska',
    url: 'lightweight.com',
    likes: 0
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    // create user here
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.login(user.username, user.password)
      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function() {
      const invalid_user = {
        name: 'Invalid user',
        username: 'invalid',
        password: '1234'
      }

      cy.login(invalid_user.username, invalid_user.password)
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login(user.username, user.password)
      cy.contains(`${user.name} logged in`)
    })

    it('A blog can be created', function() {
      cy.get('.toggleShow').click()
      cy.addBlog(blog.title, blog.author, blog.url)
    })

    it('a blog can be liked', function() {
      cy.get('.toggleShow').click()
      cy.addBlog(blog.title, blog.author, blog.url)
      cy.contains(blog.title).parent().find('.viewButton').click()
      cy.likeBlog(blog.title, blog.likes)
    })

    it('creator can remove blog', function() {
      cy.get('.toggleShow').click()
      cy.addBlog(blog.title, blog.author, blog.url)
      cy.removeBlog(blog.title, blog.author)
    })

    it('cant remove blog if not creator', function() {
      const user2 = {
        name: 'Testi Tester',
        username: 'moukarisetä',
        password: 'salainen'
      }

      cy.request('POST', 'http://localhost:3003/api/users/', user2)
      cy.get('.toggleShow').click()
      cy.addBlog(blog.title, blog.author, blog.url)
      cy.logout()
      cy.login(user2.username, user2.password)
      cy.cantRemoveBlog(blog.title, blog.author)
    })

    it('blogs are ordered by most likes', function() {
      // open blog form
      cy.get('.toggleShow').click()

      cy.addBlog(blog.title, blog.author, blog.url)
      cy.addBlog(blog2.title, blog2.author, blog2.url)
      cy.addBlog(blog3.title, blog3.author, blog3.url)

      cy.get('.viewButton').click({ multiple: true })

      cy.likeBlog(blog.title, blog.likes)
      blog.likes += 1
      cy.get('.blog').eq(0).should('contain', blog.title)


      cy.likeBlog(blog2.title, blog2.likes)
      blog2.likes += 1
      cy.likeBlog(blog2.title, blog2.likes)
      blog2.likes += 1

      cy.get('.blog').eq(0).should('contain', blog2.title)
      cy.get('.blog').eq(1).should('contain', blog.title)


      cy.likeBlog(blog3.title, blog3.likes)
      blog3.likes += 1
      cy.likeBlog(blog3.title, blog3.likes)
      blog3.likes += 1
      cy.likeBlog(blog3.title, blog3.likes)
      blog3.likes += 1

      cy.get('.blog').eq(0).should('contain', blog3.title)
      cy.get('.blog').eq(1).should('contain', blog2.title)
      cy.get('.blog').eq(2).should('contain', blog.title)
    })
  })
})
