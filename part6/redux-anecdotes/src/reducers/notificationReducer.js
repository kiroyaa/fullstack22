import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addNotification(state, action) {
      const content = action.payload
      return content
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

// redux thunk function
// TODO: timer now has a fixed clear triggering and will not update
// if new notification is set. Fix could be to use times and check if updated time has been
// n milliseconds ago
export const setNotification = (msg, timer) => {
  return async dispatch => {
    dispatch(addNotification(msg))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timer * 1000)
  }
}

export const { addNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
