import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { useDispatch } from 'react-redux'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, newBlog } from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    // get user from localStorage
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    dispatch(newBlog(blogObject))
    dispatch(setNotification(`new blog created: ${blogObject.url}, by ${blogObject.author}`, 10))
  }

  const updateUser = (user) => {
    setUser(user)
    blogService.setToken(user.token)
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm updateUser={updateUser} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in <button id='mainLogout' onClick={logout}>logout</button></p>
      <Togglable buttonLabel='new blog'>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <BlogList username={user.name} />
    </div>
  )
}

export default App
