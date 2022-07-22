import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const getAll = () => {
    return store.getState().good +
      store.getState().ok +
      store.getState().bad
  }

  const getPositive = () => {
    const all = getAll()
    if (all === 0 || store.getState().good === 0) return 0
    return store.getState().good / all * 100
  }

  const showAverage = () => {
    let all = getAll()
    let amount = store.getState().good - store.getState().bad
    if (all === 0 || amount <= 0) return 0
    return amount / all
  }

  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <button onClick={good}>good</button>
        <button onClick={e => store.dispatch({ type: 'OK' })}>ok</button>
        <button onClick={bad}>bad</button>
        <button onClick={e => store.dispatch({ type: 'ZERO' })}>reset stats</button>
      </div>
      <div>
        <h2>statistics</h2>
        <p>good {store.getState().good}</p>
        <p>ok {store.getState().ok}</p>
        <p>bad {store.getState().bad}</p>
        <p>all {getAll()}</p>
        <p>average {showAverage().toFixed(2)}</p>
        <p>positive {getPositive().toFixed(2)}%</p>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
