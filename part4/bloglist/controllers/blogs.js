const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  let error = blog.validateSync()
  if (error) response.status(400).end()

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  // check if token has creators id
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(200).end()
  }

  response.status(401).json({
    error: 'permission denied to delete this blog'
  })
})

blogsRouter.put('/:id', async (request, response) => {
  console.log(`user: ${request.user}`)
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    likes: body.likes
  }
  await Blog.findByIdAndUpdate(request.params.id, blog)
  const updatedBlog = await Blog.findById(request.params.id)
  response.json(updatedBlog)
})

module.exports = blogsRouter
