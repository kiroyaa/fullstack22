const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  let error = blog.validateSync()
  if (error) response.status(400).end()

  const savedBlog = await blog.save()
  response.json(savedBlog)
})

module.exports = blogsRouter
