const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0
  if (blogs.length === 1) return blogs[0].likes

  let totalLikes = 0
  blogs.map(blog => totalLikes += blog.likes)
  return totalLikes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  if (blogs.length === 1) return blogs[0]

  let blogIndex = 0
  blogs.forEach((blog, index) => {
    if (blog.likes > blogs[blogIndex].likes) blogIndex = index
  })

  return blogs[blogIndex]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  if (blogs.length === 1) return { author: blogs[0].author, blogs: 1 }

  let dict = {}
  blogs.forEach(blog => {
    dict[blog.author] = dict[blog.author] ? dict[blog.author] + 1 : 1
  })

  let obj = { author: '', blogs: 0 }
  for (var key in dict) {
    if (dict[key] > obj.blogs) {
      obj.author = key
      obj.blogs = dict[key]
    }
  }

  return obj
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  if (blogs.length === 1) return { author: blogs[0].author, likes: blogs[0].likes }

  let dict = {}
  blogs.forEach(blog => {
    dict[blog.author] = dict[blog.author] ? dict[blog.author] + blog.likes : blog.likes
  })

  let obj = { author: '', likes: 0 }
  for (var key in dict) {
    if (dict[key] > obj.likes) {
      obj.author = key
      obj.likes = dict[key]
    }
  }

  return obj
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
