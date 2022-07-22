import { useSelector, useDispatch } from 'react-redux'
import { increaseLikes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(increaseLikes(id))
  }

  return (
    <div>
      {
        anecdotes.sort((a, b) => { return a.votes < b.votes })
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )
      }
    </div>
  )
}

export default AnecdoteList
