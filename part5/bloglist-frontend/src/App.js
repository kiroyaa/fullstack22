import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [style, setStyle] = useState('')

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    fetchBlogs()
      .catch(console.error)

    // get user from localStorage
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    const response = await blogService
      .addBlog(blogObject)

    if (response.status === 200) {
      // success
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      notifyUser(`a new blog ${response.data.title} by ${response.data.author} added`,
        'info')
    }
  }

  const likeBlog = async (blog) => {
    const updatedBlog = { ...blog }
    updatedBlog.likes += 1

    const response = await blogService
      .updateBlog(updatedBlog)

    if (response.status === 200) {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } else {
      notifyUser(response, 'error')
    }
  }

  const removeBlog = async (blogId) => {
    const response = await blogService
      .remove(blogId)

    if (response.status === 200) {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      notifyUser('Blog was succesfully deleted', 'info')
    } else {
      notifyUser(response, 'error')
    }
  }

  const notifyUser = (message, msgStyle) => {
    setErrorMessage(message)
    setStyle(msgStyle)

    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedUser',
        JSON.stringify(user)
      )

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      const error = exception.response.data.error
      notifyUser(error, 'error')
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={errorMessage} style={style} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} style={style} />
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>
      <Togglable buttonLabel='new blog'>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <ul>
        {blogs.sort(function(a, b) { return b.likes - a.likes }).map(blog =>
          <Blog key={blog.id}
            blog={blog}
            likeBlog={() => likeBlog(blog)}
            removeBlog={removeBlog}
            userName={user.name} />
        )}
      </ul>
    </div>
  )
}

export default App
