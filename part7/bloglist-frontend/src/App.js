import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { logout, updateUser } from './reducers/userReducer'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import {
  Routes, Route, useMatch
} from 'react-router-dom'
import { Link as ReactLink } from 'react-router-dom'
import { ChakraProvider, Button, Heading, Link } from '@chakra-ui/react'

const Home = () => {
  return (
    <div className='homeDiv'>
      <Heading as='h3' size='lg'>blog app</Heading>
      <Togglable buttonLabel='new blog'>
        <BlogForm />
      </Togglable>
      <BlogList />
    </div>
  )
}

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const padding = {
    paddingRight: 5
  }

  const margin = {
    margin: 20
  }

  return (
    <div style={margin}>
      <Heading as='h2' size='xl'>blogs</Heading>
      <Notification />
      <div className='menu'>
        <Link as={ReactLink} color='blue.200' style={padding} to='/'>blogs</Link>
        <Link as={ReactLink} color='blue.200' style={padding} to='/users'>users</Link>
        <span style={padding}>{user.name} logged in
          <Button id='mainLogout' size='xs' colorScheme='blue' onClick={() => dispatch(logout())}>logout</Button>
        </span>
      </div>
    </div>
  )
}

const User = ({ user }) => {
  if (!user) {
    return (
      <div></div>
    )
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul className='userBlogList'>
        {user.blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')

  useEffect(() => {
    dispatch(initializeBlogs())

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const olduser = JSON.parse(loggedUserJSON)
      dispatch(updateUser(olduser))
      dispatch(initializeUsers())
    }
  }, [dispatch])

  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const founduser = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const foundblog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

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
    <ChakraProvider>
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/users' element={<UserList />} />
          <Route path='/users/:id' element={<User user={founduser} />} />
          <Route path='/blogs/:id' element={<Blog blog={foundblog} />} />
        </Routes>
      </div>
    </ChakraProvider>
  )
}

export default App
