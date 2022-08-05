import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      return state.map(anec => anec.id !== action.payload.id ? anec : action.payload)
    }
  }
})

// redux-thunk async functions
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const newAnecdote = content => {
  return async dispatch => {
    const response = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(response))
  }
}

export const increaseVotes = id => {
  return async (dispatch, getState) => {
    const state = getState()
    const anecdoteToChange = state.anecdotes.find(anec => anec.id === id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }

    const response = await anecdoteService.update(changedAnecdote)
    dispatch(updateAnecdote(response.data))
  }
}

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
