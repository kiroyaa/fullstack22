import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    deleteUser(state, action) {
      return null
    }
  }
})

export const login = (user) => {
  return async dispatch => {
    const loggedUser = await loginService.login(user)
    blogService.setToken(loggedUser.token)
    window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
    dispatch(setUser(loggedUser))
  }
}

export const logout = () => {
  return async dispatch => {
    blogService.setToken('')
    window.localStorage.removeItem('loggedUser')
    dispatch(deleteUser())
  }
}

export const updateUser = (user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const { setUser, deleteUser } = userSlice.actions
export default userSlice.reducer
