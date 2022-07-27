import { useSelector, useDispatch } from 'react-redux'
import { increaseVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  const sortedArr = [...anecdotes]
  sortedArr.sort((a, b) => { return a.votes < b.votes })

  const vote = (id, content) => {
    dispatch(increaseVotes(id))
    dispatch(setNotification(`you voted '${content}'`))
  }

  return (
    <div>
      {
        sortedArr.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList
