const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

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
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(response.body).toContainEqual(savedResponse.body)
})

test('likes is set to 0 if no value', async () => {
  const blog = { title: 'test', author: 'tester', url: 'test.com' }

  const savedResponse = await api.post('/api/blogs')
    .send(blog)
    .expect(200)

  const blogs = await helper.blogsInDb()
  expect(blogs).toContainEqual(savedResponse.body)
  expect(savedResponse.body.likes).toBe(0)
})

test('blog contains no title and url', async () => {
  const blog = { author: 'tester' }
  const savedResponse = await api.post('/api/blogs')
    .send(blog)
    .expect(400)

  const blogs = await helper.blogsInDb()

  expect(blogs).not.toContainEqual(savedResponse.body)
  expect(blogs).toHaveLength(helper.initialBlogs.length)
})

test('delete a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToRemove = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToRemove.id}`)
  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
  const ids = blogsAtEnd.map(blog => blog.id)

  expect(ids).not.toContain(blogToRemove.id)
})

test('update a blog', async () => {
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

afterAll(() => {
  mongoose.connection.close()
})
