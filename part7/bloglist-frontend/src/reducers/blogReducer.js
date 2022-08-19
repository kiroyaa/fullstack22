import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      return state.map(blog => blog.id !== action.payload.id ? blog : { ...blog, likes: blog.likes + 1 })
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const newBlog = blog => {
  return async dispatch => {
    const response = await blogService.addBlog(blog)
    if (response.status === 200) {
      dispatch(appendBlog(response.data))
      dispatch(setNotification(`new blog created: ${blog.url}, by ${blog.author}`, 10))
    } else {
      dispatch(setNotification(`error: ${response.data.error}`, 10))
    }
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    const response = await blogService.remove(id)
    if (response.status === 200) dispatch(removeBlog(id))
    else dispatch(setNotification(`error: ${response.data.error}`))
  }
}

export const addVote = id => {
  return async (dispatch, getState) => {
    const state = getState()
    const blogToChange = state.blogs.find(blog => blog.id === id)
    const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 }

    const response = await blogService.updateBlog(changedBlog)
    dispatch(updateBlog(response.data))
  }
}
// TODO: when blog is returned from creation the user is just id and not object
export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions
export default blogSlice.reducer
