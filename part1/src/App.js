const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, your age is {props.age}</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/mluukkai">mluukkai</a>
    </div>
  )
}

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20

  const name = "Peter"
  const age = 19

  return (
    <div>
      <h1>Greetings!</h1>
      <p>Hello World, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
      <Hello name="Joel" age={14 + 13} />
      <Hello name={name} age={age} />
      <Footer />
    </div>
  )
}

export default App
