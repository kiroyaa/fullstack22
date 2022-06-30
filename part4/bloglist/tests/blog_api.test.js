const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { watch } = require('../models/blog')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Im back',
    author: 'Arnold Schwarzenegger',
    url: 'www.arksaonaija.com',
    likes: 1000
  },
  {
    title: 'Im back again',
    author: 'Arnold Schwarzenegger',
    url: 'www.arksaonaija.com',
    likes: 1030
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(contents).toContain(
    'Im back'
  )
})

test('blogs contains a parameter id instead', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]
  expect(blog.id).toBeDefined()
})

test('blog can be added to database', async () => {
  const newBlog = {
    title: 'test',
    author: 'tester',
    url: 'test.com',
    likes: 3
  }

  const savedResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(response.body).toContainEqual(savedResponse.body)
})

test('likes is set to 0 if no value', async () => {
  const blog = { title: 'test', author: 'tester', url: 'test.com' }

  const savedResponse = await api.post('/api/blogs')
    .send(blog)
    .expect(200)

  const response = await api.get('/api/blogs')
  expect(response.body).toContainEqual(savedResponse.body)
  expect(savedResponse.body.likes).toBe(0)
})

test('blog contains no title and url', async () => {
  const blog = { author: 'tester' }
  const savedResponse = await api.post('/api/blogs')
    .send(blog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).not.toContainEqual(savedResponse.body)
  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
