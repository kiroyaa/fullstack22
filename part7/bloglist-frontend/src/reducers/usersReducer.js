import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const initializeUsers = () => {
  return async dispatch => {
    const response = await usersService.getAll()
    if (response.status === 200) dispatch(setUsers(response.data))
  }
}

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer
