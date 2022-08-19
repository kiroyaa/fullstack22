import { createSlice } from '@reduxjs/toolkit'

let timeoutId = undefined

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

export const setNotification = (msg, timer) => {
  return async dispatch => {
    dispatch(addNotification(msg))
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, timer * 1000)
  }
}

export const { addNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
