const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')



describe('get blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const blogs = await helper.blogsInDb()
    const contents = blogs.map(r => r.title)

    expect(contents).toContain(
      'Im back'
    )
  })

  test('blogs contains a parameter id instead', async () => {
    const blogs = await helper.blogsInDb()
    const blog = blogs[0]
    expect(blog.id).toBeDefined()
  })
})

describe('blog modifications', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    await User.deleteMany({})
    // create user to db
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('blog can be added to database', async () => {
    // login with the user
    const payload = {
      username: 'root',
      password: 'sekret'
    }

    const loginResponse = await api
      .post('/api/login')
      .send(payload)
      .expect(200)

    const token = loginResponse.body.token
    const authorizationStyle = 'bearer '
    const authString = authorizationStyle.concat(token)

    const newBlog = {
      title: 'test',
      author: 'tester',
      url: 'test.com',
      likes: 3
    }

    const savedResponse = await api
      .post('/api/blogs')
      .set('Authorization', authString)
      .send(newBlog)
      .expect(200)

    const response = await api.get('/api/blogs')
    const expectedValue = {
      author: savedResponse.body.author,
      id: savedResponse.body.id,
      likes: savedResponse.body.likes,
      title: savedResponse.body.title,
      url: savedResponse.body.url,
      user: {
        id: savedResponse.body.user,
        username: payload.username
      }
    }
    expect(response.body).toHaveLength(2)
    expect(response.body).toContainEqual(expectedValue)
  })

  test('likes is set to 0 if no value', async () => {
    // login with the user
    const payload = {
      username: 'root',
      password: 'sekret'
    }

    const loginResponse = await api
      .post('/api/login')
      .send(payload)
      .expect(200)

    const token = loginResponse.body.token
    const authorizationStyle = 'bearer '
    const authString = authorizationStyle.concat(token)


    const blog = { title: 'test', author: 'tester', url: 'test.com' }

    const savedResponse = await api
      .post('/api/blogs')
      .set('Authorization', authString)
      .send(blog)
      .expect(200)

    // const blogs = await helper.blogsInDb()

    // expect(blogs).toContainEqual(savedResponse.body)
    expect(savedResponse.body.likes).toBe(0)
  })

  test('blog contains no title and url', async () => {
    // login with the user
    const payload = {
      username: 'root',
      password: 'sekret'
    }

    const loginResponse = await api
      .post('/api/login')
      .send(payload)
      .expect(200)

    const token = loginResponse.body.token
    const authorizationStyle = 'bearer '
    const authString = authorizationStyle.concat(token)


    const blog = { author: 'tester' }
    const savedResponse = await api
      .post('/api/blogs')
      .set('Authorization', authString)
      .send(blog)
      .expect(400)

    const blogs = await helper.blogsInDb()

    expect(blogs).not.toContainEqual(savedResponse.body)
    expect(blogs).toHaveLength(1)
  })

  test('delete a blog', async () => {
    // login with the user
    const payload = {
      username: 'root',
      password: 'sekret'
    }

    const loginResponse = await api
      .post('/api/login')
      .send(payload)
      .expect(200)

    const token = loginResponse.body.token
    const authorizationStyle = 'bearer '
    const authString = authorizationStyle.concat(token)

    const newBlog = {
      title: 'test',
      author: 'tester',
      url: 'test.com',
      likes: 3
    }

    const savedResponse = await api
      .post('/api/blogs')
      .set('Authorization', authString)
      .send(newBlog)
      .expect(200)

    const blogsAtStart = await helper.blogsInDb()
    expect(blogsAtStart).toHaveLength(2)

    await api
      .delete(`/api/blogs/${savedResponse.body.id}`)
      .set('Authorization', authString)
      .expect(200)
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(1)
    const ids = blogsAtEnd.map(blog => blog.id)

    expect(ids).not.toContain(savedResponse.body.id)
  })

  test('update a blog', async () => {
    // login with the user
    const payload = {
      username: 'root',
      password: 'sekret'
    }

    const loginResponse = await api
      .post('/api/login')
      .send(payload)
      .expect(200)

    const token = loginResponse.body.token
    const authorizationStyle = 'bearer '
    const authString = authorizationStyle.concat(token)

    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]

    const blogUpdate = { author: 'tester', title: 'testing', url: blogs[0].url, likes: 1337 }
    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogUpdate)
      .expect(200)

    const updatedBlog = await Blog.findById(blogToUpdate.id)
    expect(updatedBlog.author).toEqual('tester')
    expect(updatedBlog.likes).toBe(1337)
  })
})


afterAll(() => {
  mongoose.connection.close()
})
