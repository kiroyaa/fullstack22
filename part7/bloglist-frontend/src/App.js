import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logout, updateUser } from './reducers/userReducer'

import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  console.log(user)
  useEffect(() => {
    dispatch(initializeBlogs())
    // get user from localStorage
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const olduser = JSON.parse(loggedUserJSON)
      dispatch(updateUser(olduser))
    }
  }, [dispatch])

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in <button id='mainLogout' onClick={() => dispatch(logout())}>logout</button></p>
      <Togglable buttonLabel='new blog'>
        <BlogForm />
      </Togglable>
      <BlogList username={user.name} />
    </div>
  )
}

export default App
