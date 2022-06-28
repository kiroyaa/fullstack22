import { useState } from 'react'
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Count = (props) => {
  const x = props.array[props.index]
  return (
    <div>
      <p>
        Has {x} points
      </p>
    </div>
  )
}

const MostVotes = (props) => {
  let mostPointsIndex = 0

  for (var index in props.pointsArray) {
    var point = props.pointsArray[index]
    if (point > props.pointsArray[mostPointsIndex]) mostPointsIndex = index
  }

  return (
    <div>
      <h2>Most votes of the day</h2>
      <p> {props.anecdotes[mostPointsIndex]}</p>
      <p>has {props.pointsArray[mostPointsIndex]} points</p>
    </div>
  )
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const pointsArray = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0)
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(pointsArray)

  const index = (lastIndex) => {
    let newIndex = lastIndex
    while (newIndex === lastIndex) {
      newIndex = Math.floor(Math.random() * 6)
    }
    setSelected(newIndex)
  }

  const setVote = (num) => {
    const copy = { ...points }
    copy[num] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Count array={points} index={selected} />
      <Button handleClick={() => setVote(selected)} text="vote" />
      <Button handleClick={() => index(selected)} text="next anecdote" />
      <MostVotes anecdotes={anecdotes} pointsArray={points} />
    </div>
  )
}

export default App;
