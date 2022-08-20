const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('average', () => {
  test('dummy return one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {

  test('of a empty list is zero', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.oneBlog)
    expect(result).toBe(helper.oneBlog[0].likes)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = helper.multipleBlogs

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {

  test('of a empty list is null', () => {
    const blogs = []
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(null)
  })

  test('when list has only one returns that', () => {
    const blogs = helper.oneBlog
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[0])
  })

  test('when list has multiple, returns the one that has most likes', () => {
    const blogs = helper.multipleBlogs
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})

describe('most blogs from author', () => {

  test('empty list is null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual(null)
  })

  test('one item in list', () => {
    const result = listHelper.mostBlogs(helper.oneBlog)
    expect(result).toEqual({ author: 'Michael Chan', blogs: 1 })
  })

  test('multiple items in list', () => {
    const result = listHelper.mostBlogs(helper.multipleBlogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes in blogs from author', () => {
  test('empty list is null', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual(null)
  })

  test('one blog in list', () => {
    const result = listHelper.mostLikes(helper.oneBlog)
    expect(result).toEqual({ author: 'Michael Chan', likes: 7 })
  })

  test('multiple blogs in list', () => {
    const result = listHelper.mostLikes(helper.multipleBlogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})
