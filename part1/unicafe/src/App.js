import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <th>{props.text}</th>
      <td>{props.value} {props.symbol}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const calcAverage = (good, neutral, bad) => {
    let amount = good + neutral + bad
    let avg = good - bad
    if (avg === 0 || amount === 0) return 0
    return avg / amount
  }

  const calcPositive = (good, neutral, bad) => {
    let amount = good + neutral + bad
    if (amount === 0 || good === 0) return 0
    return good / amount * 100
  }

  if (good > 0 || neutral > 0 || bad > 0) {
    return (
      <div>
        <h2>statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} symbol="" />
            <StatisticLine text="neutral" value={neutral} symbol="" />
            <StatisticLine text="bad" value={bad} symbol="" />
            <StatisticLine text="all" value={good + neutral + bad} symbol="" />
            <StatisticLine text="average" value={calcAverage(good, neutral, bad)} symbol="%" />
            <StatisticLine text="positive" value={calcPositive(good, neutral, bad)} symbol="" />
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h2>statistics</h2>
      <p>No feedback given</p>
    </div>
  )
}

const VoteButton = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <h2>give feedback</h2>
      <VoteButton handleClick={() => setGood(good + 1)} text="good" />
      <VoteButton handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <VoteButton handleClick={() => setBad(bad + 1)} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
